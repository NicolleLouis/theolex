local-proxy:
	./cloud_sql_proxy -instances=amiable-dynamo-245709:europe-west1:theolex-database=tcp:5432

python:
	docker exec -it back_web_1 /bin/sh