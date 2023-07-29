## TODO-LIST-API

# Overview

TODO-LIST-API is a simple REST API built using Node.js and Express.js that allows users to manage their to-do list.
Requirements

Before using the TODO-LIST-API, you need to have the following installed on your computer:

    Node.js
    npm

# Installation

    Clone the repository:
        git clone https://github.com/adityaoryza/TODO-LIST-API.git

    Install the dependencies:
        cd TODO-LIST-API
        npm install

    Start the server:
        npm start

The server should now be running on http://localhost:3030.

# Here's the API documentation:

    Get All Activity Groups:
        URL: GET https://todo-list-api-eta.vercel.app/activity-groups

    Get One Activity Group:
        URL: GET https://todo-list-api-eta.vercel.app/activity-groups/1
        Replace 1 with the ID of the specific activity group you want to retrieve.

    Create New Activity Group:
        URL: POST https://todo-list-api-eta.vercel.app/activity-groups
        Body (raw JSON):

        json

    {
      "title": "test",
      "email": "test@mail.com"
    }

Update Activity Group:

    URL: PATCH https://todo-list-api-eta.vercel.app/activity-groups/2
    Body (raw JSON):

    json

    {
      "title": "testing"
    }

    Replace 2 with the ID of the specific activity group you want to update.

Delete Activity Group:

    URL: DELETE https://todo-list-api-eta.vercel.app/activity-groups/2

Get All Todo Items for an Activity Group:

    URL: GET https://todo-list-api-eta.vercel.app/todo-items?activity_group_id=1
    Replace 1 with the ID of the activity group for which you want to retrieve todo items.

Get One Todo Item:

    URL: GET https://todo-list-api-eta.vercel.app/todo-items/2
    Replace 2 with the ID of the specific todo item you want to retrieve.

Create New Todo Item:

    URL: POST https://todo-list-api-eta.vercel.app/todo-items
    Body (raw JSON):

    json

    {
      "title": "ok",
      "activity_group_id": 3,
      "is_active": true
    }

    The activity_group_id specifies the ID of the activity group to which the todo item belongs.

Update Todo Item:

    URL: PATCH https://todo-list-api-eta.vercel.app/todo-items/21
    Body (raw JSON):

    json

    {
      "title": "testing",
      "priority": "very-high",
      "is_active": true,
      "status": "ok"
    }

    Replace 21 with the ID of the specific todo item you want to update.

Delete Todo Item:

    URL: DELETE https://todo-list-api-eta.vercel.app/todo-items/1
    Body (raw JSON):

    json

{
  "title": "testing"
}

Replace 1 with the ID of the specific todo item you want to delete.
