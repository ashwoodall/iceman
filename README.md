# <img src="http://gdurl.com/kHPu" height="48" />

The api server for Oh-hi

## Prerequisites

- Node >= 4.2.0
- Npm >= 2.14.7
- Postgres

## Technologies Used

- Postgres
- pg-promise
- Express
- Passport
- Bluebird
- Bcrypt
- Socket.io

## Installation

```
  make install
```

## Starting the Application

```
  make start
```

## Philosophies / Uses 

#### JavaScript

We use es6 / es7 syntax and options for our application. We are currently transpiling to es5 this using babel. 

#### Postgres

The Postgres code is also separated in separate modules. This module hold all files needed for a specific endpoint.

```
.
└── Module         # Module Folder
    ├── Module.js  # Endpoint handler
    ├── routes.js  # API routes
    └── schema.sql # Data model
```

Running the following queries will populate the activity and kids_age lookup tables:

`INSERT INTO ohhi_activity (activity_label) VALUES ('Go for a walk'), ('Grab lunch or dinner'), ('Go shopping together'), ('Playdate with the kids'), ('Volunteering'), ('Grab coffee or a drink'), ('Workout together'), ('Go to a party'), ('Attend a community event');`

`INSERT INTO ohhi_kids_age (kids_age_label) VALUES ('Infant'), ('Toddler'), ('Pre-K'), ('Elementary School'), ('Middle School'), ('High School'), ('College'), ('Adult');`