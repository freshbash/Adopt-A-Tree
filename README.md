# REST API for Adopt a Tree initiative

## Technology Stack
- Node.js
- Express.js
- Passport.js
- Postgres
- pg-promise

## Tables in Database
- users: Stores user data
    - Schema:
        - id: primary key
        - name
        - email
        - hashedPassword

- trees: Stores the owner of the each tree
    - Schema:
        - id: primary key
        - owner: foreign key references users.id

## File structure
- src: Contains all the functionality files
    - config: Contains all configuration files
        - databaseConfig.js - Configures pg-promise to connect to postgres
        - passportConfig.js - Creates a strategy for user auth
    - controller: Contains all the logic for the endpoints
        - apiControllers.js - Data retrieval and tree adoption
        - authControllers.js - User Authentication
    - models: Logic for storing, modifying and retrieving items from the database
        - index.js - defines tables
        - trees.js - functions for interacting with the trees table
        - users.js - functions for interaction with the users table
    - routes: Defines routes and the appropriate controller function to be invoked
        - apiRoutes.js - Defines all routes related to data retrieval and tree adoption
        - authRoutes.js - Defines all routes related to user authentication
        - index.js - Direct all incoming requests to either apiRoutes or authRoutes
    - app.js: Contains all the set up code including importing important dependencies and mounting middlewares
    - server.js: Entry point for this application. Starts the server
- package.json: contains all the necessary dependencies which can be installed by running `npm install`.

## API Endpoints

### /user/register

-request-type : POST,
-content-type: json
-json structure :

    {
        "name": "fresh",
        "email": "fresh@email.com",
        "password": "hello123
    }
-response-type : json

It takes this data and adds it to the database after hashing the password returning a success message in response where the frontend can
load the required page.

### /user/login

-request-type : POST,
-content-type : json,
-json structure :

    {
        "email": "fresh@email.com",
        "password": "hello123"
    }
-response-type : json

The json data is used to authenticate the user using Passport.js authentication and user data is then added into a session store to persist login status across requests, and a success message is sent back as a response

### /user/logout

-request-type : POST,
-content-type : none,
-response-type : json

Logs the user out and removes user data from the session store. Sends a success message as a response.

### /api/dashboard

-request-type : GET,
-content-type : none,
-response-type : json

Gets the user's name, the number of trees adopted by them and their current share in the farm based on the number of trees adopted. The user's share is calculated by dividing number of trees adopted by the user by the total number of trees.

### /api/adopt

-request-type : POST,
-content-type : json,
json structure : {
    "count" : 4
}
-response-type : json

Takes in the number of trees adopted by the user and creates that many entries in the "trees" table, all attributed to that particular user.
