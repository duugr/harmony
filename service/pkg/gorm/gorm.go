package gorm

import (
	"sync"

	"github.com/duugr/harmony/service/core/config"
	"github.com/duugr/harmony/service/pkg/zaplog"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	dbOnce sync.Once
	gormDb *gorm.DB
)

func Init() {
	dbOnce.Do(initDbConnection)
}

func initDbConnection() {
	dsn := config.Configure.Db.GetString("dsn")
	gormDb, err := gorm.Open(mysql.New(mysql.Config{
		DSN:                       dsn,   // data source name
		DefaultStringSize:         256,   // default size for string fields
		DisableDatetimePrecision:  true,  // disable datetime precision, which not supported before MySQL 5.6
		DontSupportRenameIndex:    true,  // drop & create when rename index, rename index not supported before MySQL 5.7, MariaDB
		DontSupportRenameColumn:   true,  // `change` when rename column, rename column not supported before MySQL 8, MariaDB
		SkipInitializeWithVersion: false, // auto configure based on currently MySQL version
	}), &gorm.Config{})

	if err != nil {
		zaplog.Sugar.DPanic(err)
	}

	if gormDb.Error != nil {
		zaplog.Sugar.DPanic(gormDb.Error)
	}

	return
}
