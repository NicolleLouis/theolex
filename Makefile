# Db
local-proxy:
	./cloud_sql_proxy -instances=amiable-dynamo-245709:europe-west1:theolex-database=tcp:5432

# Back
python:
	docker exec -it back_web_1 /bin/sh

python-up:
	docker-compose -f back/docker-compose.yml up --build -d

migrations:
	docker exec -it back_web_1 python manage.py migrate

create-user:
	docker exec -it back_web_1 python manage.py createsuperuser

# todo: parameter on this with command name
command-test:
	docker exec -it back_web_1 python manage.py test

# Front
front-up:
	docker-compose -f front/docker-compose.yml up --build -d

front-install:
	npm run build

front-dev:
	npm run postinstall