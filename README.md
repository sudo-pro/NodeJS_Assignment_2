## NodeJS Assignment 2

This project is a Node.js application that allows users to register and manage their information. It includes features for user validation, duplicate checking, and displaying user data.

- User registration with validation
- Duplicate user checking
- Displaying a list of registered users
- Static file serving for HTML and CSS

### Repository Structure

```
$PROJECT_ROOT
├── public/                    # for static files
├── routes/                    # for route definitions
├── controllers/               # for route logic
├── middleware/                # for request validation
├── data/                      # for storing user data
├── views/                     # for storing html files
├── utils/                     # for development utilities
├── server.js                  # entry point for server
└── README.md                  # project readme
```

### Technologies Used
- Node.js
- Express
- Body-parser
- File System (fs)

### Project Setup & Usage

```sh
git clone https://github.com/sudo-pro/NodeJS_Assignment_2
cd NodeJS_Assignment_2
npm i
npm start

```

### Usage Instructions
- Navigate to `http://localhost:3000` to access the application.
- Use the `/create` endpoint to register new users.
- Access the `/users` endpoint to view the list of registered users.


