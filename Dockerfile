FROM composer:2 AS vendor
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --ignore-platform-reqs --no-interaction

FROM node:22-slim AS assets
WORKDIR /app
COPY . .
COPY --from=vendor /app/vendor ./vendor
RUN npm install && npm run build

FROM php:8.3-apache
RUN apt-get update && apt-get install -y --no-install-recommends unzip libzip-dev libpq-dev \
    && docker-php-ext-install pdo_mysql pdo_pgsql zip \
    && a2enmod rewrite \
    && rm -rf /var/lib/apt/lists/*
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf \
    && sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf \
    && sed -ri -e 's/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf
WORKDIR /var/www/html
COPY . .
COPY --from=assets /app/public/build ./public/build
RUN composer install --no-dev --optimize-autoloader --no-interaction \
    && chown -R www-data:www-data storage bootstrap/cache
CMD sh -c 'sed -i "s/Listen 80/Listen ${PORT:-80}/" /etc/apache2/ports.conf && sed -i "s/:80>/:${PORT:-80}>/" /etc/apache2/sites-available/000-default.conf && php artisan migrate --force && php artisan db:seed --force && exec apache2-foreground'
