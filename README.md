# To-Do app

A simple ToDo CRUD REST API application

## Setup and installation

`git clone` this repository

## Server

1. server dependency installation

- `cd server` from project root

- `npm install`

2. in `server` folder, create `.env` file and paste environment variables in it

`.env` template: 

```
INFOBIP_BASE_URL=infobip_base_url

INFOBIP_API_KEY=infobip_api_key

SMS_SENDER=infobip_sender

SMS_RECEIVER=123456789
```

You can sign up for free Infobip Account [here](https://www.infobip.com/signup)

3. database migration

- `npx sequelize-cli db:migrate`

4. Start server with `npm run start:dev`

## Client

1. `cd client` from project root
2. in `client` folder, create `.env` file and paste environment variables in it

`.env` template: 

```
REACT_APP_SERVER_URL=http://localhost:3000/api
```
3. `npm install`
4. `npm run start`


## Run server tests:
1. `cd server`
2. `npm run test`