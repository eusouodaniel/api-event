
# api-event

  

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1c0238ecdf164ed3a15dbcff419412b2)](https://app.codacy.com/manual/danielrodriguesdrs331/api-event?utm_source=github.com&utm_medium=referral&utm_content=eusouodaniel/api-event&utm_campaign=Badge_Grade_Dashboard)

  

api event

  

Environment:

- docker-compose up --build -d

  

 - List item

If you don't have the docker configured, you can run it directly on the machine with these commands

  

Install packages:

- yarn

  

Run application:

- yarn dev

  

Log error:

- Sentry already configured, just add the dsn in the .env file

  
  

Containerized application with Docker


I got to configure the redis, but don't use it, and the swagger is still having a problem loading the endpoint

Endpoints:
- /events: POST - Store event
- /events: GET - Get event
- /event-timeline: GET - Build timeline