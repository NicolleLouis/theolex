local-proxy:
	./cloud_sql_proxy -instances=amiable-dynamo-245709:europe-west1:theolex-database=tcp:5432

python:
	docker exec -it back_web_1 /bin/sh

python-up:
	docker-compose -f back/docker-compose.yml up --build -d

migrations:
	docker exec -it back_web_1 python manage.py migrate

front-dev-up:
	docker-compose -f front/docker-compose.yml up --build -d

front-prod-up:
	docker-compose -f front/docker-compose.prod.yml up --build -d

