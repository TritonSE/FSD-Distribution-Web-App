# Distribution Web App

[![TritonSE](https://circleci.com/gh/TritonSE/distribution-web-app.svg?style=svg)](https://app.circleci.com/pipelines/github/TritonSE/distribution-web-app)

Web app that stores and tracks information on food distribution and the agencies partnered with [Feeding San Diego](https://feedingsandiego.org/). 
This repository contains:
- frontend: React web app for Feeding San Diego to input, store, and view data on food distribution and agencies and to view a calendar of upcoming receivals, deliveries, and distributions
- backend: MongoDB database to store data on agencies and distribution schedules using Mongoose to model database schema between Node and MongoDB

## Setup

Dependencies required:
- Node.js + NPM
- MongoDB
- Mongoose
- Express

First, install the dependencies in both the frontend and the backend:
```
$ cd frontend
$ npm install
$ cd ../backend
$ npm install
```

Next, run the build script located in the backend:
```
$ npm run-script build
```
This build script builds the frontend of the project and moves the build directory created in the frontend to the backend. This is done so Express knows to serve the build directory's static pages.

Then, start the web app while still located in the backend directory:
```
$ npm start
```
The server is now live at localhost:8000
