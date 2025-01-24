# Server
first express server :: VA01
# User Management API

This is a simple Express-based API for managing user data with MongoDB. The application provides basic CRUD functionality for user accounts, including creating, reading, updating, and deleting users. Additionally, it includes JWT-based authentication for securing user data.

---

## Features

- **User Creation (Signup):** Register a new user in the database.
- **Read User:** Fetch user details using a unique ID.
- **Update User:** Update username, email, or password individually using separate endpoints.
- **Delete User:** Remove a user from the database.
- **Middleware:** Validates if a user exists before processing updates or deletions.

---

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **JSON Web Tokens (JWT)**

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
