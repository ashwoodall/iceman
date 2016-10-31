# <img src="http://gdurl.com/kHPu" height="48" />

The api server for Oh-hi

## Prerequisites

- Node >= 4.2.0
- Npm >= 2.14.7
- MongoDB

## Technologies Used

- MongoDB
- Mongoose
- Express
- Passport

## Installation

```
  npm install
```

Setup [MongoDB](http://mongodb.github.io/node-mongodb-native/2.2/quick-start/?_ga=1.89799955.907223301.1471219050) as described in mongoDB documentation


## Starting the Application

#### Lets first boot up MongoDB

```
  mongod
```
#### Now start the app

```
  npm start
```

## Philosophies / Uses 

#### JavaScript

We use es6 / es7 syntax and options for our application. We are currently transpiling to es5 this using babel. 

#### MongoDB

The MongoDB code is also seperated in separete modules. This module hold all files needed for a specific endpoint. We are using [Mongoose](http://mongoosejs.com/) as our ODM for MongoDB

```
.
└── Module        # Module Folder
    ├── Module.js # Endpoint handler
    ├── routes.js # API routes
    └── schema.js # Data model
```
