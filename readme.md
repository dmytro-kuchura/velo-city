<p align="center"><img src="https://laravel.com/assets/img/components/logo-laravel.svg"></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/d/total.svg" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/v/stable.svg" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/license.svg" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel attempts to take the pain out of development by easing common tasks used in the majority of web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

### Starting Docker Compose

Checkout the repository or download the sources.

Simply run `docker-compose up` and you are done.

Nginx will be available on `localhost:80` and PostgreSQL on `localhost:5432`.

### Using Composer

`docker-compose run composer <cmd>`

Where `cmd` is any of the available composer command.

### Using PostgreSQL

Default connection:

`docker-compose exec db psql -U postgres`

Using .env file default parameters:

`docker-compose exec db psql -U dbuser dbname`

If you want to connect to the DB from another container (from the `php` one for instance), the host will be the service name: `db`.

### Using PHP

You can execute any command on the `php` container as you would do on any docker-compose container:

`docker-compose exec php php -v`

## Change configuration

### Configuring PHP

To change PHP's configuration edit `.docker/conf/php/php.ini`.
Same goes for `.docker/conf/php/xdebug.ini`.

You can add any .ini file in this directory, don't forget to map them by adding a new line in the php's `volume` section of the `docker-compose.yml` file.

### Configuring PostgreSQL

Any .sh or .sql file you add in `./.docker/conf/postgres` will be automatically loaded at boot time.

If you want to change the db name, db user and db password simply edit the `.env` file at the project's root.

If you connect to PostgreSQL from localhost a password is not required however from another container you will have to supply it.

## Adding aliases

To avoid typing over and over again the same commands you can add two useful aliases in your shell's configuration (`.bashrc` or `.zshrc` for instance):

```
alias dcu="docker-compose up"
alias dcr="docker-compose run"
alias dce="docker-compose exec"
```

It then becomes way faster to execute a composer command for instance:

`dcr composer require --dev phpunit/phpunit`

## Clear cache

```
docker-compose rm --all
docker-compose pull
docker-compose build --no-cache
docker-compose up -d --force-recreate
 ```