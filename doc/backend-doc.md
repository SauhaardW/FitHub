# Backend Documentation

## Frameworks
- We use ExpressJS to route requests to the API
- We use NodeJS as the programming language for backend work

## server.js
The server.js file is the entry-point to the backend for the webapp. The file handles all the imports of subparts of the webapp, and initializes everything.  
  
Responsibilities:
- Configures the `dotenv` library to allow for access to the `.env` file, which stores our environment variables. These variables are constants that should not be embedded in the code, such as the `JWT_SECRET` used to generate our JWT hashes
- Initializes the MongoDB by importing the database handler (`db.js`). It gets the connection URI from the env vars.
- Initializes ExpressJS, creating an `app` variable at the port specificed in our env vars, or 3001 as backup. Also configures CORS, JSON, and cookie parsing. 
- Sets up routing for ExpressJS. Imports the routing handler `routes/handler`, and tells the express `app` to use that router for all endpoints. These routes are handled within the router.
- Initializes the listening to requests


## Routing
Routing is handled in the `routes` directory. This directory contains subdirectories which separate parts of the API, i.e. `user` subdirectory to handle requests that interact with the `user` collection in our MongoDB database. 

These routes for individual portions of our API are all imported in our routing handler, `routes/handler.js`. This file has the task of importing routes and routing the endpoints to their according handler functions. 

## Database Interactions
Our database of choice is MongoDB. We have a general database handler, `backend/db.js`, which handles creating the connection to the MongoDB database hosted on MongoDB Atlas. Additionally, it creates all the schemas and models to be used in the database handling parts of our API. It also contains an `init` function which is called by the `server.js` file which instantiates everything. The connection and models are exported so they can be imported by other files when writing APIs.

### API
#### User
- `POST /api/user`  
    Creates a new user based on the request body. Must match database schema.  
- `GET /api/user`    
    Gets a user's data based on a query specified in query parameters.  
- `GET /api/current-user`  
    Gets the currently authenticated user's data  
- `PATCH /api/current-user`  
    Updates the currently authenticated user's data  
- `POST /api/login`  
    Attempts to log into a user account using the username/password in request body.  
- `POST /api/like-status`
    Takes a likeStatus parameter and a workoutID and updates the user's like status on a workoutID
- `GET /api/get-like-ratio`
    Takes a workoutID and responds with the like ratio details for that workout
- `POST /api/stats`
    Adds a new body statistic for the user. Expects the statistic name and value in the body.

#### Exercise  
- `GET /api/exercise/filter`  
    Gets all exercises filtered by the query params  
- `GET /api/exercise/all`  
    Gets all exercises in the exercise collection  

#### Friends  
- `POST /api/send-friend-request`  
    Send a friend request to the username in the request body.  
- `POST /api/accept-friend-request`  
    Accepts an incoming friend request from the username in the request body.  
- `GET /api/get-friend-requests`  
    Gets all incoming friend requests for the currently authenticated user.  

#### Workouts  
- `POST /api/workouts`  
    Creates a new workout for the currently authenticated user, based on the request body.  
- `GET /api/workouts`  
    Gets all of the authenticated user's workouts.  
- `POST /api/schedule-workout`  
    Schedules a workout based on the request body, for the authenticated user.  
- `GET /api/scheduled-workouts`  
    Gets all scheduled workouts for the authenticated user.  
- `POST /api/workout-history`
    Logs a new workout in the workout history for a user, expects a workout object in body.
- `GET /api/workout-history`
    Gets a users workout history. Uses JWT token to gather data, no body needed.

### Others
#### utils.js
This file handles arbitrary functionality, general utilities that are used throughout our codebase that are useful to have centralized in one file. Some examples are the JWT verification, which takes a request and calls back if the verification succeeds. Another example is a simple utility function that parses the current path, for cleaner console logging on the backend.