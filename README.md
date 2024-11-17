# User and Messages API  

**Description:**  
This project provides a RESTful API for managing users and messages. It is built using **Node.js**, **Express**, **JWT**, and **Mongoose**, ensuring secure and efficient handling of user authentication and message functionalities.

---

## Features  

- **User Management**:  
  Register new users, log in, and verify accounts via OTP.  

- **Authentication**:  
  Token-based authentication using **JSON Web Tokens (JWT)**.  

- **Message Management**:  
  Allows users to create, retrieve, and delete messages securely.  

- **Input Validation**:  
  Ensures clean and secure data using **Joi**.  

---

## API Endpoints  

### **Users**  

1. **Sign Up**  
   - **Endpoint:** `POST /users/signup`  
   - **Description:** Allows new users to register by providing a username, email, and password.  

2. **Login**  
   - **Endpoint:** `POST /users/login`  
   - **Description:** Authenticates users and provides a JWT for secure access.  

3. **Verify OTP**  
   - **Endpoint:** `POST /users/verify/:token`  
   - **Description:** Verifies user accounts using a one-time password (OTP) sent during registration.  

---

### **Messages**  

1. **Create Message**  
   - **Endpoint:** `POST /messages/create-message`  
   - **Description:** Enables authenticated users to send messages to other users.  

2. **Get All Messages**  
   - **Endpoint:** `GET /messages/get-all-messages`  
   - **Description:** Retrieves all messages for an authenticated user.  

3. **Delete Message**  
   - **Endpoint:** `DELETE /messages/delete-message/:messageId`  
   - **Description:** Allows users to delete specific messages by ID.  

---

## Authentication  

This API uses **JWT** for authentication. Include the token in the `Authorization` header for protected routes. Example:  
```text
Authorization: Bearer <your-token>
