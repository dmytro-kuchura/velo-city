#!/usr/bin/make
# Makefile readme (ru): <http://linux.yaroslavl.ru/docs/prog/gnu_make_3-79_russian_manual.html>
# Makefile readme (en): <https://www.gnu.org/software/make/manual/html_node/index.html#SEC_Contents>

SHELL = /bin/sh

REGISTRY_HOST = registry.gitlab.com
REGISTRY_PATH = tarampampam/laravel-in-docker/
IMAGES_PREFIX := $(shell basename $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST)))))

PUBLISH_TAGS = latest
PULL_TAG = latest

# Important: Local images naming should be in docker-compose naming style

APP_IMAGE = $(REGISTRY_HOST)/$(REGISTRY_PATH)app
APP_IMAGE_LOCAL_TAG = $(IMAGES_PREFIX)_app
APP_IMAGE_DOCKERFILE = ./docker/app/Dockerfile
APP_IMAGE_CONTEXT = ./docker/app

SOURCES_IMAGE = $(REGISTRY_HOST)/$(REGISTRY_PATH)sources
SOURCES_IMAGE_LOCAL_TAG = $(IMAGES_PREFIX)_sources
SOURCES_IMAGE_DOCKERFILE = ./docker/sources/Dockerfile
SOURCES_IMAGE_CONTEXT = ./src

NGINX_IMAGE = $(REGISTRY_HOST)/$(REGISTRY_PATH)nginx
NGINX_IMAGE_LOCAL_TAG = $(IMAGES_PREFIX)_nginx
NGINX_IMAGE_DOCKERFILE = ./docker/nginx/Dockerfile
NGINX_IMAGE_CONTEXT = ./docker/nginx

APP_CONTAINER_NAME := app
NODE_CONTAINER_NAME := node

docker_bin := $(shell command -v docker 2> /dev/null)
docker_compose_bin := $(shell command -v docker-compose 2> /dev/null)

all_images = $(APP_IMAGE) \
             $(APP_IMAGE_LOCAL_TAG) \
             $(SOURCES_IMAGE) \
             $(SOURCES_IMAGE_LOCAL_TAG) \
             $(NGINX_IMAGE) \
             $(NGINX_IMAGE_LOCAL_TAG)

ifeq "$(REGISTRY_HOST)" "registry.gitlab.com"
	docker_login_hint ?= "\n\
	**************************************************************************************\n\
	* Make your own auth token here: <https://gitlab.com/profile/personal_access_tokens> *\n\
	**************************************************************************************\n"
endif

.PHONY : help pull build push login test clean \
         app-pull app app-push\
         sources-pull sources sources-push\
         nginx-pull nginx nginx-push\
         up down restart shell install
.DEFAULT_GOAL := help

# This will output the help for each task. thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
help: ## Show this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo "\n  Allowed for overriding next properties:\n\n\
	    PULL_TAG - Tag for pulling images before building own\n\
	              ('latest' by default)\n\
	    PUBLISH_TAGS - Tags list for building and pushing into remote registry\n\
	                   (delimiter - single space, 'latest' by default)\n\n\
	  Usage example:\n\
	    make PULL_TAG='v1.2.3' PUBLISH_TAGS='latest v1.2.3 test-tag' app-push"

# --- [ Application ] -------------------------------------------------------------------------------------------------

app-pull: ## Application - pull latest Docker image (from remote registry)
	-$(docker_bin) pull "$(APP_IMAGE):$(PULL_TAG)"

app: app-pull ## Application - build Docker image locally
	$(docker_bin) build \
	  --cache-from "$(APP_IMAGE):$(PULL_TAG)" \
	  --tag "$(APP_IMAGE_LOCAL_TAG)" \
	  -f $(APP_IMAGE_DOCKERFILE) $(APP_IMAGE_CONTEXT)

app-push: app-pull ## Application - tag and push Docker image into remote registry
	$(docker_bin) build \
	  --cache-from "$(APP_IMAGE):$(PULL_TAG)" \
	  $(foreach tag_name,$(PUBLISH_TAGS),--tag "$(APP_IMAGE):$(tag_name)") \
	  -f $(APP_IMAGE_DOCKERFILE) $(APP_IMAGE_CONTEXT);
	$(foreach tag_name,$(PUBLISH_TAGS),$(docker_bin) push "$(APP_IMAGE):$(tag_name)";)

# --- [ Sources ] -----------------------------------------------------------------------------------------------------

sources-pull: ## Sources - pull latest Docker image (from remote registry)
	-$(docker_bin) pull "$(SOURCES_IMAGE):$(PULL_TAG)"

sources: ## Sources - build Docker image locally
	$(docker_bin) build \
	  --tag "$(SOURCES_IMAGE_LOCAL_TAG)" \
	  -f $(SOURCES_IMAGE_DOCKERFILE) $(SOURCES_IMAGE_CONTEXT)

sources-push: ## Sources - tag and push Docker image into remote registry
	$(docker_bin) build \
	  $(foreach tag_name,$(PUBLISH_TAGS),--tag "$(SOURCES_IMAGE):$(tag_name)") \
	  -f $(SOURCES_IMAGE_DOCKERFILE) $(SOURCES_IMAGE_CONTEXT);
	$(foreach tag_name,$(PUBLISH_TAGS),$(docker_bin) push "$(SOURCES_IMAGE):$(tag_name)";)

# --- [ Nginx ] -------------------------------------------------------------------------------------------------------

nginx-pull: ## Nginx - pull latest Docker image (from remote registry)
	-$(docker_bin) pull "$(NGINX_IMAGE):$(PULL_TAG)"

nginx: nginx-pull ## Nginx - build Docker image locally
	$(docker_bin) build \
	  --cache-from "$(NGINX_IMAGE):$(PULL_TAG)" \
	  --tag "$(NGINX_IMAGE_LOCAL_TAG)" \
	  -f $(NGINX_IMAGE_DOCKERFILE) $(NGINX_IMAGE_CONTEXT)

nginx-push: nginx-pull ## Nginx - tag and push Docker image into remote registry
	$(docker_bin) build \
	  --cache-from "$(NGINX_IMAGE):$(PULL_TAG)" \
	  $(foreach tag_name,$(PUBLISH_TAGS),--tag "$(NGINX_IMAGE):$(tag_name)") \
	  -f $(NGINX_IMAGE_DOCKERFILE) $(NGINX_IMAGE_CONTEXT);
	$(foreach tag_name,$(PUBLISH_TAGS),$(docker_bin) push "$(NGINX_IMAGE):$(tag_name)";)

# ---------------------------------------------------------------------------------------------------------------------

pull: app-pull nginx-pull sources-pull ## Pull all Docker images (from remote registry)

build: app sources nginx ## Build all Docker images

push: app-push sources-push nginx-push ## Tag and push all Docker images into remote registry

login: ## Log in to a remote Docker registry
	@echo $(docker_login_hint)
	$(docker_bin) login $(REGISTRY_HOST)

clean: ## Remove images from local registry
	-$(docker_compose_bin) down -v
	$(foreach image,$(all_images),$(docker_bin) rmi -f $(image);)

# --- [ Development tasks ] -------------------------------------------------------------------------------------------

---------------: ## ---------------

up: ## Start all containers (in background) for development
	$(docker_compose_bin) up --no-recreate -d

down: ## Stop all started for development containers
	$(docker_compose_bin) down

restart: up ## Restart all started for development containers
	$(docker_compose_bin) restart

shell: up ## Start shell into application container
	$(docker_compose_bin) exec "$(APP_CONTAINER_NAME)" /bin/sh

install: up ## Install application dependencies into application container
	$(docker_compose_bin) exec "$(APP_CONTAINER_NAME)" composer install --no-interaction --ansi --no-suggest
	$(docker_compose_bin) run --rm "$(NODE_CONTAINER_NAME)" npm install

watch: up ## Start watching assets for changes (node)
	$(docker_compose_bin) run --rm "$(NODE_CONTAINER_NAME)" npm run watch

init: install ## Make full application initialization (install, seed, build assets, etc)
	$(docker_compose_bin) exec "$(APP_CONTAINER_NAME)" artisan migrate --force --no-interaction -vvv
	$(docker_compose_bin) exec "$(APP_CONTAINER_NAME)" artisan db:seed --force -vvv
	$(docker_compose_bin) run --rm "$(NODE_CONTAINER_NAME)" npm run dev

test: up ## Execute application tests
	$(docker_compose_bin) exec "$(APP_CONTAINER_NAME)" composer phpstan
	$(docker_compose_bin) exec "$(APP_CONTAINER_NAME)" composer test
