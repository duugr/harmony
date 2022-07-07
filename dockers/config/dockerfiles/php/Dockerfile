FROM php:fpm-alpine

#RUN docker-php-ext-configure --enable-pdo --with-pdo-mysql --enable-mysqlnd --with-mysqli

#RUN docker-php-ext-enable gd mysqli pdo pdo_mysql

RUN docker-php-ext-install mysqli pdo pdo_mysql bcmath

# RUN apk del gcc
RUN apk add autoconf gcc g++ make libffi-dev openssl-dev

RUN pecl install redis \
	&& docker-php-ext-enable redis

RUN apk del autoconf gcc g++ make libffi-dev openssl-dev ${PHPIZE_DEPS}

# 设置工作目录
WORKDIR /app

VOLUME ["/app"]

# 暴露container的端口
EXPOSE 80