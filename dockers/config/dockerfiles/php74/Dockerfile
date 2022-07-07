FROM php:7.4-fpm-alpine

RUN set -eux && sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories

RUN docker-php-ext-install mysqli pdo pdo_mysql bcmath

# RUN apk del gcc
RUN apk add autoconf gcc g++ make libffi-dev openssl-dev

RUN pecl install redis \
	&& docker-php-ext-enable redis

RUN apk del autoconf gcc g++ make libffi-dev openssl-dev ${PHPIZE_DEPS}

RUN wget https://github.com/symfony/cli/releases/download/v4.28.1/symfony_linux_amd64.gz && gunzip symfony_linux_amd64.gz && chmod +x symfony_linux_amd64 && mv symfony_linux_amd64 /usr/local/bin/symfony

RUN symfony server:ca:install

# 设置工作目录
WORKDIR /app

VOLUME ["/app"]

# 暴露container的端口
EXPOSE 80

# CMD ["symfony", "serve", "-d", "--port=80","--allow-http"]