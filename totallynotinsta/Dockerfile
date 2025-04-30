# Use official PHP image with FPM
FROM php:8.2-fpm

# Set working directory
WORKDIR /var/www/html

# Install system dependencies & PHP extensions
RUN apt-get update && apt-get install -y \
    git curl unzip zip libpng-dev libonig-dev libxml2-dev \
    libzip-dev libcurl4-openssl-dev pkg-config libssl-dev libpq-dev \
    && docker-php-ext-install pdo pdo_mysql zip \
    && pecl install mongodb \
    && docker-php-ext-enable mongodb \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer globally
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy Laravel app
COPY . .

# Copy .env file
COPY .env /var/www/html/.env

# Set correct permissions
RUN chown -R www-data:www-data storage bootstrap/cache

# Install PHP dependencies (in production mode)
RUN composer install --no-dev --optimize-autoloader

# Expose port
EXPOSE 8080

# Run Laravel setup commands
CMD php artisan key:generate && \
    php artisan migrate --force --seed && \
    php artisan serve --host=0.0.0.0 --port=8080