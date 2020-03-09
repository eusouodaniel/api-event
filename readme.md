
# api-event

  

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1c0238ecdf164ed3a15dbcff419412b2)](https://app.codacy.com/manual/danielrodriguesdrs331/api-event?utm_source=github.com&utm_medium=referral&utm_content=eusouodaniel/api-event&utm_campaign=Badge_Grade_Dashboard)

  

api event

  

## Environment - DB:

- docker-compose up --build -d

## Node application - A small problem with the docker-compose, for this reason can be separated

- docker image build -t api-event:1.0 .
- docker container run -p 3333:3333 --detach --name api-event api-event:1.0
- Configure the archive .env
- To access the container: docker exec -it <container_name> sh
- The container name is something like: api-event
  
* Container configured with alpine, as it is much lighter and consequently we have a performance gain

If you don't have the docker configured, you can run it directly on the machine with these commands

  

Install packages:

- yarn

  

Run application:

- yarn dev

  

Log error:

- Sentry already configured, just add the dsn in the .env file

  
  

Containerized application with Docker and endpoints configured with jwt authentication, but commented on momentarily


I got to configure the redis, but don't use it, and the swagger is still having a problem loading the endpoint

Endpoints:
- /events: POST - Store event
- /events: GET - Get event
- /event-timeline: GET - Build timeline

Branchs:
- master: Latest and updated code
- dev: Developing resources

Use of pullrequests