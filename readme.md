<p align="center">
  <img src="https://hsto.org/webt/rf/x1/77/rfx177j6b8dxtjzfx97-rp7zzoe.png" alt="" style="width: 100%" />
</p>

---

## System requirements

For local application starting (for development) make sure that you have locally installed next applications:

- `docker >= 18.0` _(install: `curl -fsSL get.docker.com | sudo sh`)_
- `docker-compose >= 1.22` _([installing manual][install_compose])_

## Used services

This application uses next services:

- PostgreSQL
- PHP 7.4
- nginx

Declaration of all services can be found into `./docker-compose.yml` file.

## Work with application

Checkout the repository or download the sources.

Simply run `docker-compose up -d` and you are done.

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

If you want to change the db name, db user and db password simply edit the `.env` file at the project's root.

If you connect to PostgreSQL from localhost a password is not required however from another container you will have to supply it.

## Clear cache

```
docker-compose rm --all
docker-compose pull
docker-compose build --no-cache
docker-compose up -d --force-recreate
 ```
