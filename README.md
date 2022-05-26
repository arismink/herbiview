# Herbiview

Learn more about plants by taking a picture of it.

This React application interacts with the [Plant.id](https://plant.id/) API and identifies the plant uploaded by the user. In addition to the information provided by the API, our application will also inform you about whether or not the plant indentified may be toxic to household animals (i.e. Cats, dogs and horses).

This project was developed by [Kai Meikle](https://github.com/kai-commits), [Krismina La](https://github.com/arismink) and [Nathan Tsang](https://github.com/nathan-ts).

The live version of our project can be viewed [here](https://herbiview.herokuapp.com/).

## Final Product

### Upload an image of a plant
Select an image of a plant you wish to know more about and upload it for our API to identify.
![plant-upload](https://github.com/arismink/herbiview/blob/main/client/docs/uploads/plant-upload.gif)

### Search our database
Retrieve basic information about a plant and its toxicity towards animals by searching through our database,
![plant-search](https://github.com/arismink/herbiview/blob/main/client/docs/uploads/plant%20search.gif)

### User Login
Create an account and login in to create a search history for plants you've previously queried for.
![user-login](https://github.com/arismink/herbiview/blob/main/client/docs/uploads/user-login.gif)

### User Search History
If a user is logged in and performs a successful API plant search, their previous search is added to their user search history.
![search-history](https://github.com/arismink/herbiview/blob/main/client/docs/uploads/user-search%20history.gif)

### Mobile View
Responsive design gives user the ability to search for plants on the go.
![mobile-view](https://github.com/arismink/herbiview/blob/main/client/docs/uploads/mobile-view.gif)

## Initial Setup

To run the following project on your machine, please follow the steps outlined below:

### Backend Setup:

1. Locate the `.env.example` and make a copy of it. Rename it to `.env`.  You will provide the required API key here.

2. Obtain a trial API key from [Plant.id](https://web.plant.id/api-access-request/) and place it in the `.env` file.

### Getting Started:

1. From the root directory of the project, run the command below. This will install all the required dependencies for the front-end and the back-end.
```
npm run heroku-postbuild
```

2. Set up the database by creating a database in Postgres named Herbiview. Populate the tables by navigating to `src/db/schema` and run `00.sql` which will create the tables and seed it.


3. Start the project in the root directory with the command:
```
npm start
```

4. View project at:
```
https://localhost:4000
```


## Dependencies
    axios: ^0.27.2,
    body-parser: ^1.18.3,
    cookie-parser: ^1.4.6,
    cors: ^2.8.5,
    dotenv: ^16.0.1,
    express: ^4.16.4,
    morgan: ^1.10.0,
    nodemon: ^1.18.7,
    pg: ^8.7.3,
    babel-loader: ^8.2.5,
    node-sass: ^7.0.1,
    prop-types: ^15.8.1,
    react: ^18.1.0,
    react-axios: ^2.0.5,
    react-cookie: ^4.1.1,
    react-dom: ^18.1.0,
    react-hook-form: ^7.31.1,
    react-router-dom: ^6.3.0,
    react-scripts: 5.0.1,
    @mui/material: ^5.7.0