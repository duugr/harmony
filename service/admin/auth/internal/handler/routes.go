package handler

import (
	"net/http"

	"github.com/duugr/harmony/service/core/middlewares"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func Init() http.Handler {
	router := mux.NewRouter()

	// 中间插件
	router.Use(middlewares.LogMiddleware)
	router.Use(middlewares.AuthMiddleware)
	// 后端API
	authRest := router.PathPrefix("/admin").Subrouter()

	authRest.HandleFunc("/auth/login", AuthLogin).Methods("POST")

	authRest.HandleFunc("/admin/list", AdminUserList).Methods("POST")
	authRest.HandleFunc("/admin/create", AdminUserCreate).Methods("POST")

	authRest.HandleFunc("/role/list", AdminRoleList).Methods("POST")
	authRest.HandleFunc("/role/create", AdminRoleCreate).Methods("POST")
	authRest.HandleFunc("/role/rules", AdminRoleRuleList).Methods("GET")
	authRest.HandleFunc("/role/all", AdminRoleAll).Methods("GET")
	authRest.HandleFunc("/role/saveRule", AdminRoleSaveRule).Methods("POST")

	authRest.HandleFunc("/rule/all", AdminRuleAll).Methods("GET")
	authRest.HandleFunc("/rule/list", AdminRuleList).Methods("POST")
	authRest.HandleFunc("/rule/create", AdminRuleCreate).Methods("POST")

	return cors.Default().Handler(router)
}
