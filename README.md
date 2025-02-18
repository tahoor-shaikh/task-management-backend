# Task Management Backend App

A RESTful API backend for managing tasks with user authentication. Built with Node.js, Express, and MongoDB.

## Deployed Version

The API is deployed and accessible at: https://task-management-backend-app.vercel.app

## Table of Contents

- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Authentication](#authentication)
- [Task Management](#task-management)
- [Error Handling](#error-handling)
- [Project Structure](#project-structure)

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd task-management-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**
   Create a `.env` file in the root directory:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the server**
   ```bash
   npm start
   ```

## Authentication

All authentication endpoints are prefixed with `/auth`

### 1. Register New User

**POST** `/auth/signup`

Request:

```json
{
	"username": "string",
	"email": "string",
	"password": "string"
}
```

Response (200 OK):

```json
{
	"message": "User registered successfully"
}
```

### 2. Login

**POST** `/auth/login`

Request:

```json
{
	"email": "string",
	"password": "string"
}
```

Response (200 OK):

```json
{
	"token": "jwt_token_string"
}
```

### 3. Change Password

**POST** `/auth/change-password`

_Requires Authentication Header_

Request:

```json
{
	"oldPassword": "string",
	"newPassword": "string"
}
```

Response (200 OK):

```json
{
	"message": "Password changed successfully"
}
```

## Task Management

All task endpoints require authentication header:

```
Authorization: Bearer your_jwt_token
```

### 1. Create Task

**POST** `/tasks`

Request:

```json
{
	"title": "string",
	"description": "string",
	"completed": false
}
```

Response (200 OK):

```json
{
	"id": "task_id",
	"title": "string",
	"description": "string",
	"completed": false,
	"userId": "user_id",
	"createdAt": "timestamp"
}
```

### 2. Get All Tasks

**GET** `/tasks`

Response (200 OK):

```json
[
    {
        "id": "task_id",
        "title": "string",
        "description": "string",
        "completed": boolean,
        "userId": "user_id",
        "createdAt": "timestamp"
    }
]
```

### 3. Get Single Task

**GET** `/tasks/:id`

Response (200 OK):

```json
{
    "id": "task_id",
    "title": "string",
    "description": "string",
    "completed": boolean,
    "userId": "user_id",
    "createdAt": "timestamp"
}
```

### 4. Update Task

**PUT** `/tasks/:id`

Request:

```json
{
    "title": "string",
    "description": "string",
    "completed": boolean
}
```

Response (200 OK):

```json
{
    "id": "task_id",
    "title": "string",
    "description": "string",
    "completed": boolean,
    "userId": "user_id",
    "createdAt": "timestamp"
}
```

### 5. Delete Task

**DELETE** `/tasks/:id`

Response (200 OK):

```json
{
	"message": "Task deleted"
}
```

## Error Handling

The application includes comprehensive error logging for debugging and monitoring. Errors are logged in the following scenarios:

### Authentication Errors

- User registration failures
- Login authentication failures
- Invalid token verification
- Password change failures

### Task Operation Errors

- Task creation failures
- Task retrieval errors
- Task update failures
- Task deletion errors

### System Errors

- Database connection issues
- Environment configuration errors

All errors are logged with:

- Error context (function name/operation)
- Error message
- Timestamp

## Project Structure

```
project/
├── config/
│   └── database.js         # Database configuration
├── controllers/
│   ├── authController.js   # Authentication logic
│   └── taskController.js   # Task management logic
├── middleware/
│   └── auth.js            # JWT authentication middleware
├── models/
│   ├── Task.js            # Task database model
│   └── User.js            # User database model
├── routes/
│   ├── auth.js            # Authentication routes
│   └── tasks.js           # Task management routes
├── server.js              # Application entry point
└── .env                   # Environment variables
```
