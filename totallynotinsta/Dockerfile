# Use official PHP image
FROM php:8.2-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    git curl libzip-dev unzip libpng-dev libonig-dev libxml2-dev \
    zip libcurl4-openssl-dev pkg-config libssl-dev libpq-dev \
    && docker-php-ext-install pdo pdo_mysql zip

# Install MongoDB extension
RUN pecl install mongodb && docker-php-ext-enable mongodb

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy app code
COPY . .

# Install dependencies (skip dev for prod)
RUN composer install --optimize-autoloader --no-dev

# Laravel Permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Serve Laravel
CMD php artisan key:generate && \
    php artisan migrate && \
    php artisan serve --host=0.0.0.0 --port=8080
