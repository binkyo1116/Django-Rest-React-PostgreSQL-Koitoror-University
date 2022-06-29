# Koitoror University. 
This repository contains a boilerplate project setup to Manage Learning of Languages.


## Link for this project
[Koitoror University](http://www.koitororuniversity.ml)


## Vision
Create a community of like minded language enthusiasts to foster learning, inspiration and expertise
by leveraging the modern web.


## Tech-Stacks
> **Python-Django** : The project contains backend user authentication with the Django Rest Framework and rest-auth.

> **React**: The frontend has react redux setup for user authentication in the frontend.

## Installation & Development workflow

### VIRTUALENV

#### BACKEND 
```json
virtualenv env
pip install -r requirements.txt
python backend/manage.py createsuperuser
python backend/manage.py runserver
```
#### FRONTEND
```json
npm i
npm start
```
##### For deploying
```json
npm run build
```

### DOCKER ( incl. VIRTUALENV )

#### FRONTEND + BACKEND
```json
 1. docker build . -t koitoror-university-frontend:2.0.0 -f frontend/Dockerfile.dev

 2.  docker build . -t koitoror-university-backend:2.0.0 -f backend/Dockerfile
 
 3. docker compose -f docker-compose.dev.yml up -d
 
 ( PROD: docker compose -f docker-compose.yml up -d )
```

## Prometheus 
### How to Run?
using Docker Compose. 

```
docker-compose -f docker-compose.yml up
```
### Description

A setup to run 6 Docker containers 

    1 React frontend app
    2 POSTGRESQL db services
    2 Django services and  - port 8000/1.
    1 Prometheus service - port 9090.

The Prometheus container is used to monitor the 2 Django apps mainly.

For Prometheus:

Go to ```status``` then ```targets``` to find the Django services.

## AWS Deployment

- Read the [requirements](aws/README.md) guide HERE and run AWS deploy.