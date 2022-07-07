package utils

import (
	"database/sql/driver"
	"encoding/json"
	"fmt"
	"os"
	"strconv"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

var db *sqlx.DB = nil

func DbInit() *sqlx.DB {
	var err error

	dsn := os.Getenv("MYSQL_URI")
	maxOpen, _ := strconv.Atoi(os.Getenv("MYSQL_MAX_OPEN"))
	maxIdle, _ := strconv.Atoi(os.Getenv("MYSQL_MAX_IDLE"))

	// Connect to MongoDB
	db = sqlx.MustConnect(os.Getenv("DB_DRIVER"), dsn)
	db.SetMaxOpenConns(maxOpen)
	db.SetMaxIdleConns(maxIdle)

	// Check the connection
	err = db.Ping()

	if err != nil {
		Sugar.Panic(err)
	}
	return db
}

func DbClose() {
	if err := db.Close(); err != nil {
		Sugar.Fatal(err)
	}
}

func DbSql(filed, table, where, sortField, sort string, limit, offset int64) string {
	sql := `SELECT %s
		FROM %s
		WHERE %s
		ORDER BY %s %s
		LIMIT %d
		OFFSET %d`

	if where == "" {
		where = "1=1"
	}

	return fmt.Sprintf(sql, filed, table, where, sortField, sort, limit, offset)
}

func DbSqlDeleted(filed, table, where, sortField, sort string, limit, offset int64) string {
	where = "deleted_at IS NULL AND " + where
	return DbSql(filed, table, where, sortField, sort, limit, offset)
}

// BindNamed binds a query using the DB driver's bindvar type.
func DbBindNamed(query string, arg interface{}) (string, []interface{}, error) {
	return db.BindNamed(query, arg)
}

// NamedQuery using this DB.
// Any named placeholder parameters are replaced with fields from arg.
func DbNamedQuery(query string, arg interface{}) (*sqlx.Rows, error) {
	return db.NamedQuery(query, arg)
}

// NamedExec using this DB.
// Any named placeholder parameters are replaced with fields from arg.
func DbNamedInsert(query string, arg interface{}) int64 {
	result, err := db.NamedExec(query, arg)
	if err != nil {
		Sugar.Error(err)
		return 0
	}

	insertId, err := result.RowsAffected() // 操作影响的行数
	if err != nil {
		Sugar.Error(err)
	}

	return insertId
}
func DbNamedUpdate(query string, arg interface{}) int64 {
	result, err := db.NamedExec(query, arg)
	if err != nil {
		Sugar.Error(err)
		return 0
	}

	rows, err := result.RowsAffected() // 操作影响的行数
	if err != nil {
		Sugar.Error(err)
	}

	return rows
}

func DbSelect(dest interface{}, query string, args ...interface{}) error {
	return db.Select(dest, query, args...)
}
func DbGet(dest interface{}, query string, args ...interface{}) error {
	return db.Get(dest, query, args...)
}

// MustBegin starts a transaction, and panics on error.  Returns an *sqlx.Tx instead
// of an *sql.Tx.
func DbMustBegin() *sqlx.Tx {
	tx, err := db.Beginx()
	if err != nil {
		Sugar.Error(err)
	}
	return tx
}

// Queryx queries the database and returns an *sqlx.Rows.
// Any placeholder parameters are replaced with supplied args.
func DbQueryx(query string, args ...interface{}) (*sqlx.Rows, error) {
	return db.Queryx(query, args...)
}

// QueryRowx queries the database and returns an *sqlx.Row.
// Any placeholder parameters are replaced with supplied args.
func DbQueryRowx(query string, args ...interface{}) *sqlx.Row {
	return db.QueryRowx(query, args...)
}

// MustExec (panic) runs MustExec using this database.
// Any placeholder parameters are replaced with supplied args.
func DbMustExec(query string, args ...interface{}) int64 {
	result := db.MustExec(query, args...)

	rows, err := result.RowsAffected() // 操作影响的行数
	if err != nil {
		Sugar.Error(err)
	}

	return rows
}

// Preparex returns an sqlx.Stmt instead of a sql.Stmt
func DbPreparex(query string) (*sqlx.Stmt, error) {
	return db.Preparex(query)
}

// PrepareNamed returns an sqlx.NamedStmt
func DbPrepareNamed(query string) (*sqlx.NamedStmt, error) {
	return db.PrepareNamed(query)
}

type JsonString []string

func (c JsonString) Value() (driver.Value, error) {
	b, err := json.Marshal(c)
	return string(b), err
}

func (c *JsonString) Scan(input interface{}) error {
	return json.Unmarshal(input.([]byte), c)
}
