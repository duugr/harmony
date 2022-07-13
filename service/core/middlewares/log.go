package middlewares

import (
	"net"
	"net/http"
	"strings"
	"time"

	"github.com/duugr/harmony/service/pkg/zaplog"
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

		zaplog.Logger.Info(path,
			zap.String("request.Method", r.Method),
			zap.String("request.Host", r.Host),
			zap.String("request.Token", r.Header.Get("X-AUTH-TOKEN")),
			// zap.Any("request.Body", body),
			zap.String("request.ip", GetIp(r)),
			zap.String("request.UserAgent", r.UserAgent()),
			//zap.String("response.Status", r.Response.Status),
			zap.Duration("end", end))
	})
}

func GetIp(r *http.Request) string {
	clientIP := strings.TrimSpace(r.Header.Get("X-Forwarded-For"))
	clientIP = strings.TrimSpace(strings.Split(clientIP, ",")[0])
	if clientIP == "" {
		clientIP = strings.TrimSpace(r.Header.Get("XRemoteAddr"))
	}
	if clientIP == "" {
		clientIP = strings.TrimSpace(r.Header.Get("X-Real-Ip"))
	}
	if clientIP == "" {
		if ip, _, err := net.SplitHostPort(strings.TrimSpace(r.RemoteAddr)); err == nil {
			clientIP = ip
		}
	}
	return clientIP
}
