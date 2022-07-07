FROM node:lts-alpine

# 设置工作目录
WORKDIR /app

VOLUME ["/app"]

# 暴露container的端口
EXPOSE 80

RUN set -eux && sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories

RUN apk update

CMD ["yarn", "start"]