package sqlx

import (
	"sync"

	"github.com/duugr/harmony/service/core/config"
	"github.com/duugr/harmony/service/pkg/zaplog"
	"github.com/jmoiron/sqlx"
)

var (
	dbOnce sync.Once
	xdb    *sqlx.DB
)

func Init() {
	dbOnce.Do(initDbConnection)
}

func DbClose() {
	if err := xdb.Close(); err != nil {
		zaplog.Sugar.Fatal(err)
	}
}

func initDbConnection() {

	var err error

	driver := config.Configure.Db.GetString("driver")
	dsn := config.Configure.Db.GetString("dsn")
	maxOpen := config.Configure.Db.GetInt("max_open")
	maxIdle := config.Configure.Db.GetInt("max_idle")

	// Connect to MongoDB
	xdb = sqlx.MustConnect(driver, dsn)
	xdb.SetMaxOpenConns(maxOpen)
	xdb.SetMaxIdleConns(maxIdle)

	// Check the connection
	err = xdb.Ping()

	if err != nil {
		zaplog.Sugar.Panic(err)
	}
	return
}
