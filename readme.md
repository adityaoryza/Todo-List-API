## TODO-LIST-API Specification

# Overview

TODO-LIST-API is a simple REST API built using Node.js and Express.js that allows users to manage their to-do list.
Requirements

Before using the TODO-LIST-API, you need to have the following installed on your computer:

    Node.js
    npm
# Postman Documentation
      https://documenter.getpostman.com/view/24306967/2s9YeD8ssV
# Installation

    Clone the repository:
      git clone https://github.com/adityaoryza/TODO-LIST-API.git
    Install the dependencies:
      cd TODO-LIST-API

      npm install
    Start the server:
      npm start


## Todo List API Documentation

### Base URL

  ```
  https://api.adityaoryza.my.id/
  ```

### Activity Groups Endpoints

#### Get All Activity Groups

```
GET /activity-groups
```

Retrieve all activity groups.

#### Get One Activity Group

```
GET /activity-groups/:activity_id
```

Retrieve a specific activity group.

Parameters:

- `activity_id` (required): The ID of the activity group to retrieve.

#### Create New Activity Group

```
POST /activity-groups
```

Create a new activity group.

Request Body (JSON):

```json
{
  "title": "test",
  "email": "test@mail.com"
}
```

#### Update Activity Group

```
PATCH /activity-groups/:activity_id
```

Update an existing activity group.

Parameters:

- `activity_id` (required): The ID of the activity group to update.

Request Body (JSON):

```json
{
  "title": "testing"
}
```

#### Delete Activity Group

```
DELETE /activity-groups/:activity_id
```

Delete an existing activity group.

Parameters:

- `activity_id` (required): The ID of the activity group to delete.

### Todo Items Endpoints

#### Get All Todo Items for an Activity Group

```
GET /todo-items?activity_group_id=:activity_group_id
```

Retrieve all todo items for a specific activity group.

Parameters:

- `activity_group_id` (required): The ID of the activity group for which to retrieve todo items.

#### Get One Todo Item

```
GET /todo-items/:todo_id
```

Retrieve a specific todo item.

Parameters:

- `todo_id` (required): The ID of the todo item to retrieve.

#### Create New Todo Item

```
POST /todo-items
```

Create a new todo item.

Request Body (JSON):

```json
{
  "title": "ok",
  "activity_group_id": 3,
  "is_active": true
}
```

#### Update Todo Item

```
PATCH /todo-items/:todo_id
```

Update an existing todo item.

Parameters:

- `todo_id` (required): The ID of the todo item to update.

Request Body (JSON):

```json
{
  "title": "testing",
  "priority": "very-high",
  "is_active": true,
  "status": "ok"
}
```

#### Delete Todo Item

```
DELETE /todo-items/:todo_id
```

Delete an existing todo item.

Parameters:

- `todo_id` (required): The ID of the todo item to delete.

---

Please use the provided API endpoints with the base URL `https://api.adityaoryza.my.id/` to interact with the Todo List API. If you have any more questions or need further assistance, feel free to ask!
