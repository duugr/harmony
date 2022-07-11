package main

import (
	"net/http"
	"time"

	"github.com/duugr/harmony/service/admin/auth/internal/handler"
	"github.com/duugr/harmony/service/core/config"
	"github.com/duugr/harmony/service/pkg/sqlx"
	"github.com/duugr/harmony/service/pkg/zaplog"
)

func main() {
	// defer func() {
	// 	utils.DbClose()
	// }()

	config.Init()
	// log.Println(config.Configure.Db.AllSettings())
	// log.Println(config.Configure.Log.AllSettings())
	// log.Println(config.Configure.App.AllSettings())

	zaplog.InitLogger()
	sqlx.Init()

	// utils.LogInit()
	// utils.DbInit()

	// 服务器
	listenAddr := config.Configure.App.GetString("app.server")
	//err = http.ListenAndServe(listenAddr, header)
	server := &http.Server{
		Addr:         listenAddr,
		ReadTimeout:  60 * time.Second,
		WriteTimeout: 60 * time.Second,
		Handler:      handler.Init(),
	}

	err := server.ListenAndServe()

	if err != nil {
		zaplog.Sugar.Fatal(err)
	}
}
