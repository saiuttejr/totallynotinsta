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

# Set working directory
WORKDIR /var/www/html

# Copy app files
COPY totallynotinsta /var/www/html

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Cache Laravel configs and routes for performance
RUN php artisan config:cache && php artisan route:cache

# Fix permissions
RUN chown -R www-data:www-data storage bootstrap/cache

# Start Laravel with production-safe flags
CMD php artisan migrate --seed --force && php artisan serve --host=0.0.0.0 --port=8080