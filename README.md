# Backend

# Potluck Event Planner - Backend

---

Deployed Backend: [https://potluck-planner-backend.herokuapp.com](https://potluck-planner-backend.herokuapp.com)

_Potluck Event Planner_ is a full-stack web application that was built during a "build week" by [Lambda School](https://lambdaschool.com/) students. Each student fulfills a role in the project to collectively build the application.

_Potluck Event Planner_ provides a web application that allows a user to create events in their profile as well as add various details about the potluck. Once a user adds a potluck, they are able to invite other users to attend their event and food items for the potluck. The application could be used for any type of event and is not limited to just potluck events.

## Built With

---

- [Node.js](https://en.wikipedia.org/wiki/Node.js) - JavaScript runtime for executing JavaScript at the server outside the browser
- [Express.js](https://expressjs.com/) - Lightweight web framework to bootstrap Node.js APIs
- [SQLite3](https://www.sqlite.org/index.html) - Super lightweight database to bootstrap development environments
- [PostgreSQL](https://www.postgresql.org/) - An advanced object-relational database for production environments
- [Knex.js](https://knexjs.org/) - A SQL query builder that helps abstracting migrations and DDLs for different database types into a single coherent structure
- [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) - A module to help make passwords more secure
- [CORS](https://www.npmjs.com/package/cors) - A Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options
- [Helmet](https://www.npmjs.com/package/helmet) - A collection of 14 smaller middleware functions that set HTTP response headers
- [JWT](https://jwt.io/) - JSON Web Token for authorization and client side tokens for security
- [Supertest](https://www.npmjs.com/package/supertest) - A test module for HTTP assertions
- [Jest](https://jestjs.io/) - A simple JavaScript testing framework
- [Dotenv](https://www.npmjs.com/package/dotenv) - a zero-dependency module that loads environment variables from a .env file into process.env

## Endpoints

---

### General

##### JWT protected (header) :heavy_check_mark:

A JWT protected endpoint means that a header object, which contains a key called Authorization with the value being a JSON web token, must be passed along with the API call in order to gain access to the endpoint.

```javascript
{
  headers: {
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpZCI6MTksImlhdCI6MTU3NDIwMDM0MiwiZXhwIjoxNTc0Mjg2NzQyfQ.mDNl24-TXWc9xmvWUbOo7CWs8otGTeJkOl9oHqCUUNU",
  }
}
```

###### GET [API RUNNING]

```
https://potluck-planner-backend.herokuapp.com/
```

- JWT protected (header) :x:
- payload (body) :x:

<span style="color: green">API Running Response (200 OK)</span>:

```javascript
{
  "message": "Server up and running!"
}
```

###### POST [REGISTER A USER]

```
https://potluck-planner-backend.herokuapp.com/api/register
```

- JWT protected (header) :x:
- payload (body) :heavy_check_mark:
- USER gets validated over requiresAuth middleware

Example Request Body:

```javascript
{
  "username": "user", // required
  "password": "password", // required
  "firstName": "test", // required
  "lastName": "test" // required
}
```

<span style="color: green">Register a User Response (201 CREATED)</span>:

```javascript
{
  "id": 19,
  "message": "Welcome user!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpZCI6MTksImlhdCI6MTU3NDIwMDM0MiwiZXhwIjoxNTc0Mjg2NzQyfQ.mDNl24-TXWc9xmvWUbOo7CWs8otGTeJkOl9oHqCUUNU"
}
```

<span style="color: red">Server Error Response (500 SERVER ERROR)</span>:

```javascript
{
  "message": "Error occurred while registering a user.",
  "error": error
}
```

###### POST [LOGIN A USER]

```
https://potluck-planner-backend.herokuapp.com/api/login
```

- JWT protected (header) :x:
- payload (body) :heavy_check_mark:

Example Request Body:

```javascript
{
  "username": "user", // required
  "password": "password", // required
}
```

<span style="color: green">Login a User Response (200 OK)</span>:

```javascript
{
  "id": 19,
  "message": "Welcome user!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpZCI6MTksImlhdCI6MTU3NDIwMDM0MiwiZXhwIjoxNTc0Mjg2NzQyfQ.mDNl24-TXWc9xmvWUbOo7CWs8otGTeJkOl9oHqCUUNU"
}
```

<span style="color: red">Unauthorized Response (401 UNAUTHORIZED)</span>:

```javascript
{
  "message": "Invalid credentials."
}
```

<span style="color: red">Server Error Response (500 SERVER ERROR)</span>:

```javascript
{
  "message": "Error occurred while logging in a user.",
  "error": error
}
```

### Potlucks

###### GET [POTLUCK BY ID]

```
https://potluck-planner-backend.herokuapp.com/potlucks/:id
```

- JWT protected (header) :heavy_check_mark:
- payload (body) :x:
- ID is defined over the used route at the end
- Authorization gets validated over restricted middleware
- POTLUCK ID gets validated over validatePotluckData middleware

<span style="color: green">Get Event By Id Response (200 OK)</span>:

```javascript

{
    "firstName": "Harry",
    "lastName": "Potter",
    "name": "potluck1",
    "location": "home",
    "time": "06:10:00",
    "date": "2019-11-25T00:00:00.000Z",
    "guests": [
        {
            "id": 3,
            "firstName": "Albus",
            "lastName": "Dumbledore",
            "accepted": true
        },
        {
            "id": 5,
            "firstName": "Ginny",
            "lastName": "Weasley",
            "accepted": false
        }
    ]
}
```

<span style="color: red">Server Error Response (500 SERVER ERROR)</span>:

```javascript
{
  "message": "DB error. Try again.",
  "err": err
}
```

<span style="color: red">Event Not Found Response (500 SERVER ERROR)</span>:

```javascript
{
  "message": `There was an error in getting data from the database.`,
  "err": err
}
```

###### GET [POTLUCKS BY USER ID(ORGANIZER)]

Get all the potlucks organized by a user

```
https://potluck-planner-backend.herokuapp.com/users/organized
```

Response - An array of all the potlucks organized by a particular user


###### GET [POTLUCKS BY USER ID(ORGANIZER)]

Get all the potlucks a user is attending as a guest - GET

```
https://potluck-planner-backend.herokuapp.com/users/attending?isAttending=true
```

Query string isAttending to be provided with a value true

Response - An array of all the putlucks a user is attending


###### GET [POTLUCKS BY USER ID(ORGANIZER)]

Get all potlucks for which the user has not yet responded to invitations

```
https://potluck-planner-backend.herokuapp.com/users/attending?isAttending=false
```

Query string isAttending to be provided with a value false

###### POST [ADD A POTLUCK]

```
https://potluck-planner-backend.herokuapp.com/potlucks
```

- JWT protected (header) :x:
- payload (body) :heavy_check_mark:

Example Request Body:

```javascript
{
  "name": "Friendsgiving", // required
  "location": "password", // required
  "date": "11/23/2019", // required (mm/dd/yy)
  "time": "5pm" // required
}
```

<span style="color: green">Add a Potluck Response (201 OK)</span>:

```javascript
{
  "id": 1,
  "user_id": "19",
  "name": "Friendsgiving",
  "location": "2121 Maple St, Cameron Park CA",
  "date": "11/23/2019",
  "time": "5pm"
}
```

<span style="color: red">Server Error Response (500 SERVER ERROR)</span>:

```javascript
{
  "message": "The potluck could not be created.",
  "error": error
}
```

###### PUT [UPDATE A POTLUCK]

```
https://potluck-planner-backend.herokuapp.com/potlucks/:id
```

- JWT protected (header) :heavy_check_mark:
- payload (body) :heavy_check_mark:
- ID is defined over the used route at the end
- Authorization gets validated over restricted middleware
- POTLUCK gets validated over validatePotluckData middleware

Example Request Body:

```javascript
{
  "name": "Friendsgiving", // required
  "location": "2121 Maple St, Cameron Park CA", // required
  "date": "11/23/2019", // required (mm/dd/yy)
  "time": "6pm" // required
}
```

<span style="color: green">Updating an Event Response (201 CREATED)</span>:

```javascript
{
  "id": 1,
  "user_id": "19",
  "name": "Friendsgiving",
  "location": "2121 Maple St, Cameron Park CA",
  "date": "11/23/2019",
  "time": "6pm"
}
```

<span style="color: red">Server Error Response (500 SERVER ERROR)</span>:

```javascript
{
  "message": "The potluck could not be updated",
  "err": err
}
```

###### DELETE [POTLUCK BY ID]

```
https://potluck-planner-backend.herokuapp.com/potlucks/:id
```

- JWT protected (header) :heavy_check_mark:
- payload (body) :x:
- ID is defined over the used route at the end
- Authorization gets validated over restricted middleware
- POTLUCK ID gets validated over validatePotluckData middleware

<span style="color: green">Delete Potluck By Id Response (200 OK)</span>:

```javascript
{
  message: `The potluck was deleted.`,
}
```

<span style="color: red">Server Error Response (500 SERVER ERROR)</span>:

```javascript
{
  "message": "The potluck could not be deleted'",
  "err": err
}
```

### Food

###### GET [ALL FOOD]

```
https://potluck-planner-backend.herokuapp.com/food
```

- JWT protected (header) :heavy_check_mark:
- payload (body) :x:
- Authorization gets validated over restricted middleware

<span style="color: green">Get All Food Items Response (200 OK)</span>:

```javascript
[
  {
    "food_id": 1,
    "name": "Apple Pie"
  },
  {
    "food_id": 2,
    "name": "Mashed Potatoes"
  },
  {
    "food_id": 3,
    "name": "Chicken"
  },
];
```

<span style="color: red">Server Error Response (500 SERVER ERROR)</span>:

```javascript
{
  "message": "'There was an error in getting food from the database.'",
  "err": err
}
```

###### GET [FOOD BY ID]

```
https://potluck-planner-backend.herokuapp.com/food/:id
```

- JWT protected (header) :heavy_check_mark:
- payload (body) :x:
- ID is defined over the used route at the end
- Authorization gets validated over restricted middleware

<span style="color: green">Get Food Item By Id Response (200 OK)</span>:

```javascript
{
    "id": 1,
    "name": "Mashed Potatoes"
},
```

<span style="color: red">Server Error Response (500 SERVER ERROR)</span>:

```javascript
{
  "message": "Error while retrieving food by id from database.",
  "err": err
}
```

###### POST [ADD A FOOD ITEM]

```
https://potluck-planner-backend.herokuapp.com/food
```

- JWT protected (header) :heavy_check_mark:
- payload (body) :heavy_check_mark:
- FOOD gets validated over validateFoodData middleware
- food name must be unique

Example Request Body:

```javascript
{
  "name": "Green Beans"
},
```

<span style="color: green">Adding a Food Item Response (201 CREATED)</span>:

```javascript
{
{
    "id": 10,
    "name": "Green Beans"
}
},
```

<span style="color: red">Server Error Response (500 SERVER ERROR)</span>:

```javascript
{
  "message": "Error occured while adding food item.",
  "err": err
}
```

### USER FOOD

###### GET [ALL FOOD ITEMS FOR LOGGED IN USER]

```
https://potluck-planner-backend.herokuapp.com/food/user/:id
```

- JWT protected (header) :heavy_check_mark:
- payload (body) :x:
- user ID is defined over the used route at the end
- Authorization gets validated over restricted middleware

<span style="color: green">Get All User Food Items Response (200 OK)</span>:

```javascript
[
  {
    "name": "Mashed Potatoes"
  },
  {
    "name": "Green Beans"
  },
  {
    "name": "Apple Pie"
  },
];
```

<span style="color: red">Server Error Response (500 SERVER ERROR)</span>:

```javascript
{
  "message": "Error while retrieving users food items from database.",
  "err": err
}
```

###### POST [ADD A USER FOOD ITEM]

```
https://potluck-planner-backend.herokuapp.com/food/user/1
```

- JWT protected (header) :heavy_check_mark:
- payload (body) :heavy_check_mark:

Example Request Body:

```javascript
{
  "food_id": 1,
  "potluck_id": 1
},
```

<span style="color: green">Adding a User Food Response (201 CREATED)</span>:

```javascript
{
    "id": 1,
    "user_id": 11,
    "potluck_id": 1,
    "food_id": 1
},
```

<span style="color: red">Server Error Response (500 SERVER ERROR)</span>:

```javascript
{
  "message": "Error while adding user food",
  "err": err
}
```

###### DELETE [USER FOOD BY ID]

```
https://corporate-event-planner-be.herokuapp.com/api/vendors/:id
```

- JWT protected (header) :heavy_check_mark:
- payload (body) :x:
- food ID is defined over the used route at the end
- Authorization gets validated over restricted middleware

<span style="color: green">Delete Vendor By Id Response (200 OK)</span>:

```javascript
{
  message: "This food item was deleted from user.",
}
```

<span style="color: red">Server Error Response (500 SERVER ERROR)</span>:

```javascript
{
  "message": "Error occurred while deleting user food item.",
  "err": err
}
```

## Project Requirements and Documentation

- [Initial Project Description](https://airtable.com/shrtA1m4LFJAnjvqS/tblI02wuarVEYWVSv/viw2L09271lKsRt5x/recb3Oth539iuXahs?blocks=hide)

- [Role Description](https://www.notion.so/0200d2f8b46345c48c1418fa1c33652c?v=995e7fc27b73425bbe0f8741a6ba2c15)

- [Grading/Rubric - Backend Node Students](https://www.notion.so/04382aff1e09483dac0e29446ec4ef6f?v=3c1f346ae7b04962919385e74176d883)

## Authors

**Role: Backend Developer**

- **[Rashmi Poddar](https://github.com/rashmipoddar)**
- **[Kenna Lawrie](https://github.com/kastair)**
