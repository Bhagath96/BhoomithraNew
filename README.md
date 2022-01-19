# Bhoomitra-Web

## Requirements

- [x] Node.js `14.15.1`
- [x] yarn

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### clean
```bash
yarn install:clean
```
### start
```bash
yarn start
```
Runs the app using webpack in the development mode.\
Open [http://localhost:9900](http://localhost:9900) to view it in the browser.

### build
```bash
yarn build
```
Builds the app using webpack for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### test

```bash
yarn test
```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Docker

### Install docker

https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository

### Install docker compose

https://docs.docker.com/compose/install/

## Start container
```bash
docker-compose -f docker-compose.yml up --build -d
```
## Stop container
```bash
docker-compose -f docker-compose.yml down -v --rmi local
```