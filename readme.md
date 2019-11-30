<p align="center">
  <img src="https://hsto.org/webt/rf/x1/77/rfx177j6b8dxtjzfx97-rp7zzoe.png" alt="" style="width: 100%" />
</p>

---

This is an example of dockerized Laravel application, integrated with GitLab CI _(sources testing and images building)_.

## System requirements

For local application starting (for development) make sure that you have locally installed next applications:

- `docker >= 18.0` _(install: `curl -fsSL get.docker.com | sudo sh`)_
- `docker-compose >= 1.22` _([installing manual][install_compose])_
- `make >= 4.1` _(install: `apt-get install make`)_

## Used services

This application uses next services:

- Redis (cache, internal queue)
- PostgreSQL (data storage)
- PHP FPM
- nginx

Declaration of all services can be found into `./docker-compose.yml` file.

## Work with application

Most used commands declared in `./Makefile` file. For more information execute in your terminal `make help`.

Here are just a few of them:

Command signature | Description
----------------- | -----------
`make login` | Make login into remote Docker registry <sup>1</sup>
`make pull`  | Download all application Docker images from remote registry
`make build` | Build all Docker images from using own Docker files
`make clean` | Remove all application docker images from **local** Docker registry
`make up`    | Run all application containers into background mode
`make down`  | Stop all started application containers
`make restart` | Restart all application containers
`make shell` | Start shell into application container
`make install` | Make install all `composer` and `node` dependencies, make database migration and seeding
`make watch` | Run `npm watch` _(for frontend-development)_
`make init` | Make **full** application initialization _(install all dependencies, migrate database, seeding, compile assets)_
`make test` | Run unit-tests
`docker-compose down -v` | Stop all application containers and **remove all application data** (database, etc)

> **<sup>1</sup>** required for Docker images pulling/pushing. If you use Two-Factor Authentication (2FA) you should use auth token instead your password. Generate your token [here][personal_access_tokens].

After application starting you can open [127.0.0.1:9999](http://127.0.0.1:9999/) in your browser.

### Fast application starting

Just execute into your terminal next commands:

```bash
$ git clone https://gitlab.com/tarampampam/laravel-in-docker.git ./laravel-in-docker && cd $_
$ make init
```

## CI & CD

When you make `git push`, it:

- Build application Docker images and `push` it into Docker registry with tag, which equals branch name;
- Run unit-tests;
- Test assets building.

When you make `git push` into branch named `master`, CI uses `latest` and `master` images tags into Docker registry.

When you make `git push` **tag** like `vX.X.X` (where `X` - is numeric value), CI uses tags `vX.X.X` and `stable` into Docker registry.

[install_compose]:https://docs.docker.com/compose/install/#install-compose
[personal_access_tokens]:https://gitlab.com/profile/personal_access_tokens
