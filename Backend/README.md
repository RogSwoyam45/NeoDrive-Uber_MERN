# User Registration API Documentation

## Endpoint: `/user/register`

This endpoint allows the creation of a new user account.
It validates user input and returns a JSON Web Token (JWT) upon successful registration.

---

## Request

### Method: `POST`

### URL: `/user/register`



### Body Parameters

The request body should contain the following fields:

| Field                | Type     | Required | Description                                 |
| -------------------- | -------- | -------- | ------------------------------------------- |
| `fullname.firstname` | `string` | Yes      | First name of the user (min. 3 characters). |
| `fullname.lastname`  | `string` | No       | Last name of the user (min. 3 characters).  |
| `email`              | `string` | Yes      | Valid email address (must be unique).       |
| `password`           | `string` | Yes      | User's password (min. 3 characters).        |

#### Example Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```


#### Response
Success (`201 Created`)
On successful registration, the API responds with the following:

Response Body
JSON

```
{
  "token": "your_jwt_token_here",
  "user": {
    "_id": "64b27b8dcd1234abcd5678ef",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```
#### Failure (400 Bad Request)
If the request validation fails, the API responds with an error detailing the issues with the input fields.

#### Response Body
JSON
```
{
  "errors": [
    {
      "type": "field",
      "msg": "First name must be at least 3 characters long",
      "path": "fullname.firstname",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "Password must be at least 3 characters long",
      "path": "password",
      "location": "body"
    }
  ]
}
```
#### Validation Rules
The following validation rules are applied to the request body:

| Field                 | Validation                                         | Required |
|------------------------|----------------------------------------------------|----------|
| `fullname.firstname`  | Must be at least 3 characters long.                   | Yes      |
| `fullname.lastname`   | No specific validation rule.                         | No       |
| `email`                 | Must be a valid email address (e.g., name@domain.com). | Yes      |
| `password`             | Must be at least 3 characters long.                   | Yes      |


#### Error Codes

| Status Code | Description                                                              |
|--------------|------------------------------------------------------------------------------|
| 400          | Validation failed due to missing or invalid parameters.                   |
| 500          | Internal server error occurred during processing.                         |



#### Implementation Details


##### Validation

The express-validator library is used for validating the input fields in the request body. 
Validation rules are defined in the `user.routes.js` file.

##### Password Handling

User passwords are hashed using the bcrypt library before being stored in the database for enhanced security.

##### Token Generation

Upon successful registration, a JSON Web Token (JWT) is generated using the `jsonwebtoken` library. 
The token contains the user's unique identifier (`_id`) and is returned in the response for authentication purposes.

