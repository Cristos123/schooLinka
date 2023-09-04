# Blog Post Test for Backend Developer

This project is a backend API for a blog post system. It provides various endpoints for user authentication and post management.

## User Authentication

### Register

- **Endpoint**: `/api/user/sign-up`
- **Method**: POST
- **Description**: Register a new user.
- **Request Body**:
  - `email` (string): User's email address.
  - `firstName` (string): User's first name.
  - `lastName` (string): User's last name.
  - `password` (string): User's password.
- **Response**: Upon successful registration, a user is created.

### Login

- **Endpoint**: `api/user/login`
- **Method**: POST
- **Description**: Authenticate a user.
- **Request Body**:
  - `email` (string): User's email address.
  - `password` (string): User's password.
- **Response**: Upon successful login, an authorization token is provided.

## Post Management

### Create New Post

- **Endpoint**: `/api/posts/create`
- **Method**: POST
- **Description**: Create a new blog post.
- **Request Body**:
  - `title` (string): Title of the blog post.
  - `content` (string): Content of the blog post.
- **Authorization**: Headers must include a valid authorization token to identify the user creating the post.
- **Response**: The new blog post is created.

### Update Post

- **Endpoint**: `/api/posts/edit/{id}`
- **Method**: PUT
- **Description**: Edit an existing blog post.
- **Parameters**:
  - `id` (integer): ID of the post to edit.
- **Request Body**:
  - `title` (string): Updated title of the blog post.
  - `content` (string): Updated content of the blog post.
- **Authorization**: Headers must include a valid authorization token. Only the user who created the post can edit it.
- **Response**: The blog post is updated.

### Delete Post

- **Endpoint**: `/api/posts/delete/{id}`
- **Method**: DELETE
- **Description**: Delete an existing blog post.
- **Parameters**:
  - `id` (integer): ID of the post to delete.
- **Authorization**: Headers must include a valid authorization token. Only the user who created the post can delete it.
- **Response**: The blog post is deleted.

### Get All Posts

- **Endpoint**: `/api/posts`
- **Method**: GET
- **Description**: Retrieve all blog posts with pagination support.
- **Query Parameters**:
  - `page` (integer, optional): Page number for pagination (default is 1).
  - `limit` (integer, optional): Number of posts per page (default is 10).
- **Response**: List of blog posts with pagination details.

### Get Single Post

- **Endpoint**: `/api/posts/{id}`
- **Method**: GET
- **Description**: Retrieve a single blog post by its ID.
- **Parameters**:
  - `id` (integer): ID of the post to retrieve.
- **Response**: The requested blog post.

### Search Posts

- **Endpoint**: `/api/posts/search`
- **Method**: GET
- **Description**: Search for blog posts by title or content.
- **Query Parameters**:
  - `query` (string): Search query text.
- **Response**: List of matching blog posts.
