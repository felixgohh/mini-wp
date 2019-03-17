# MiniWP

## URLs
Client URL : `http://localhost:8080`<br>
Server URL : `http://localhost:3000`

## Usage
Make sure you have Node.js and npm installed in your computer, and then run `npm install`.

In order to get access to all of the routes, you will need a `JWT(JSON Web Token) Token` which will be generated automatically after a sign in / sign up action on the client-side.

Run `npm run start` to start the server.

## Routes

| Route | HTTP | Headers(s) | Body | Description | Success Case | Error Case |
|-------|------|------------|------|-------------|--------------|---------|
|`/articles`| **GET** |An Authenticated JWT Token | none | Get all article list| Show all the article list | Status code: 500, Error info in JSON |
|`/articles`| **POST** |An Authenticated JWT Token | title: String(**Required**),<br>content: String(**Required**),<br>created_at: Date(**Default: Date.now()**),<br>file: File(**Required (image only)**),<br>user_id: ObjectId(**Required**) | Create an article | Show the created article | Status code: 500, Error info in JSON|
|`/articles/:id` | **GET** | An Authenticated JWT Token | none | Get a single article info | Show the article info | Status code: 500, Error info in JSON|
|`/articles/:id` | **PUT** |An Authenticated JWT Token,<br>An Authorized User Id | title: String(**Required**),<br>content: String(**Required**),<br>created_at: Date(**Default: Date.now()**),<br>file: File(**Required (image only)**),<br>user_id: ObjectId(**Required**) | Update an article information | Show the updated article's info |Status code: 500, Error info in JSON |
|`/articles/:id` | **DELETE** |An Authenticated JWT Token<br>An Authorized User Id | none | Delete an article | Show the deleted article | Status code: 500, Error info in JSON |