# Build: docker build -f node.dockerfile -t mick/expresso .

# Option 1
# Start MongoDB and Node (link Node to MongoDB container with legacy linking)
 
# docker run -d --name es-mongodb mongo
# docker run -d -p 3000:3000 --link es-mongodb:mongodb --name expresso mick/expresso

# Option 2: Create a custom bridge network and add containers into it

# docker network create --driver bridge isolated_network
# docker run -d --net=isolated_network --name mongodb mongo
# docker run -d --net=isolated_network --name nodeapp -p 3000:3000 mick/expresso

# Seed the database with sample database
# Run: docker exec nodeapp node dbSeeder.js

FROM node:latest

MAINTAINER Mick Ollison

ENV NODE_ENV=development 
ENV PORT=2000

COPY      . /var/www
WORKDIR   /var/www

RUN       npm install

EXPOSE $PORT

ENTRYPOINT ["node", "server.js"]