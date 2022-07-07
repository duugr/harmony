package utils

import (
	"net/http"
	"os"
	"time"

	"go.uber.org/zap"
)

func LogMiddleware(fn http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// 记录请求开始时间
		start := time.Now()

		// var body interface{}
		// json.NewDecoder(r.Body).Decode(&body)
		path := r.URL.Path
		fn.ServeHTTP(w, r)
		end := time.Since(start)

		Logger.Info(path,
			zap.String("request.Method", r.Method),
			zap.String("request.Host", r.Host),
			zap.String("request.Token", r.Header.Get(os.Getenv("APP_TOKEN_AUTH"))),
			// zap.Any("request.Body", body),
			zap.String("request.ip", WorkNew(w, r).GetIp()),
			zap.String("request.UserAgent", r.UserAgent()),
			//zap.String("response.Status", r.Response.Status),
			zap.Duration("end", end))
	})
}
