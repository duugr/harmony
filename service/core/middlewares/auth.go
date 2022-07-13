package middlewares

import (
	"net/http"

	"github.com/duugr/harmony/service/pkg/work"
)

func AuthMiddleware(fn http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		path := r.URL.Path

		notAuth := map[string]bool{
			"/admin/auth/login": true,
		}
		if !notAuth[path] {
			working := work.WorkNew(w, r)
			if working.CheckAuth() {
				return
			}
		}
		fn.ServeHTTP(w, r)
	})
}
