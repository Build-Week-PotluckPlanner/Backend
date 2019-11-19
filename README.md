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
