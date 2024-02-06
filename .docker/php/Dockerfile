FROM php:8.1-fpm

# Arguments defined in docker-compose.yml
ARG user
ARG uid

# Installing dependencies
RUN apt-get update && apt-get install -y \
        zip \
        libpq-dev \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install the PHP iconv library
RUN docker-php-ext-install -j$(nproc) iconv
# Configure GD library
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
# Install the PHP GD library
RUN docker-php-ext-install -j$(nproc) gd

# Install the PHP redis extention
RUN pecl install redis -o -f redis \
        && rm -rf /tmp/pear

# Enable redis extention
RUN docker-php-ext-enable redis

# Install the PHP pdo_pgsql extention
RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
        && docker-php-ext-install -j$(nproc) \
        	pdo \
        	pdo_pgsql \
        	pgsql

# Copy command scheduler
COPY ./scheduler.sh /scheduler/scheduler.sh

# Permisson for scheduler
RUN chmod a+rx /scheduler/scheduler.sh

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Create system user to run Composer and Artisan Commands
RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user
