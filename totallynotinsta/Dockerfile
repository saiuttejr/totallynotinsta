# Use official PHP image
FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git curl libzip-dev unzip libpng-dev libonig-dev libxml2-dev \
    zip libcurl4-openssl-dev pkg-config libssl-dev libpq-dev \
    && docker-php-ext-install pdo pdo_mysql zip

# Install MongoDB extension
RUN pecl install mongodb && docker-php-ext-enable mongodb

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory to your Laravel app
WORKDIR /var/www/html

# Copy app from subfolder
COPY totallynotinsta /var/www/html

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Set Laravel key and run migration
CMD php artisan key:generate && \
    php artisan migrate --seed && \
    php artisan serve --host=0.0.0.0 --port=8080
