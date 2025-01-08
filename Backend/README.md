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
# **User Login API Documentation**

## **Endpoint: `/user/login`**

This endpoint allows registered users to log in to their accounts by providing valid credentials (email and password). Upon successful login, it returns a JSON Web Token (JWT) for authentication.

---

## **Request**

### **Method**: `POST`

### **URL**: `/user/login`

### **Headers**
- `Content-Type`: `application/json`

### **Body Parameters**
The request body should contain the following fields:

| **Field**    | **Type**   | **Required** | **Description**                                |
|--------------|------------|--------------|------------------------------------------------|
| `email`      | `string`   | Yes          | The user's registered email address.          |
| `password`   | `string`   | Yes          | The user's password.                          |

#### Example Request Body
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

