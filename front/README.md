
# Theolex front-end for Docker
=======
Use `theolex/front` as reference folder

# Installation
Create config file `.env` with following variables:

- NODE_ENV=dev
- PORT=3000
- BACKEND_HOST=http://localhost:8000

## Build Image
- Run  in `theolex/front/`
<br>`docker build -t theolex-front .`

## Run Image in Interactive mode
- Run  in `theolex/front/`
<br>`docker container run -it -p 3000:3000 theolex-front`

## Run Image in Production mode
- Run  in `theolex/front/`
<br>`docker container run --name theolex-front -p 3000:3000 -d theolex-front`

## Run with docker-compose
TODO
