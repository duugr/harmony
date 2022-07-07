FROM golang:alpine

# 设置工作目录
WORKDIR /app

VOLUME ["/app"]

# 暴露container的端口
EXPOSE 9983

# RUN export GOPROXY=https://proxy.golang.com.cn,direct
RUN export GO111MODULE=on
RUN export GOPROXY=https://goproxy.cn

# ENTRYPOINT ["go", "run", "."]