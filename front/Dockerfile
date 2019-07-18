FROM node:10.16-alpine

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /app

ADD . /app/.

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install

# Building app
RUN npm run build

# Webpack dev server port
EXPOSE 3000

# Running the app
CMD [ "npm", "run", "start" ]