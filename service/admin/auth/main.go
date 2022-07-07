package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/joho/godotenv"

	"iering.com/Harmony/service/admin/auth/internal/handler"
	"iering.com/Harmony/service/utils"
)

func init() {

	if err := godotenv.Load(); err != nil {
		log.Fatalln(err)
	}

}

func main() {
	defer func() {
		utils.DbClose()
	}()
	utils.LogInit()
	utils.DbInit()

	// 服务器
	listenAddr := os.Getenv("LISTEN_ADDR")
	//err = http.ListenAndServe(listenAddr, header)
	server := &http.Server{
		Addr:         listenAddr,
		ReadTimeout:  60 * time.Second,
		WriteTimeout: 60 * time.Second,
		Handler:      handler.Init(),
	}

	err := server.ListenAndServe()

	if err != nil {
		log.Fatalln(err)
	}
}
