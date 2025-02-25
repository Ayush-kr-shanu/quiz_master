# Quiz Master

Quiz Master is a RESTful API built for managing quizzes. The API includes features such as user authentication, category management, question management, and answer submission. It supports file uploads for questions in both CSV and XLSX formats.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [User Profile](#user-profile)
  - [Categories](#categories)
  - [Questions](#questions)
  - [Answers](#answers)
- [Postman Collection](#postman-collection)
- [File Upload](#file-upload)
- [License](#license)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Ayush-kr-shanu/quiz_master.git
   cd quiz_master
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the server:**

   ```bash
   npm run start
   ```

   The server will run on the port specified in your environment file (default is `8080`).

## Configuration

Create a `.env` file in the project root and add the following configuration variables:

```env
NODE_ENV=development
DB_URL=mongodb+srv://your_mongo_url/quizdb
PORT=8080

# Token secret key
JWT_SECRET=your secret key
JWT_EXPIRES_MINUTES=900
JWT_EXPIRES_DAYS=7

# Mail jet secrets
SMTP_HOST=your email host
SMTP_PORT=587
SMTP_USERNAME=your username
SMTP_PASSWORD=your password
EMAIL_FROM=from which you want to send email

BASE_URL=http://localhost:8080/api

ALLOW_URLS=http://localhost:3000,http://localhost:4500
```

> **Note:** Replace any placeholder values with your actual credentials.

## API Endpoints

The following is an overview of the available API endpoints. Detailed request and response examples are available in the [Postman collection](#postman-collection).

### Authentication

- **Signup**  
  - **Endpoint:** `POST /auth/register`  
  - **Description:** Create a new user account.  
  - **Example Request Body:**
    ```json
    {
      "name": "Jatan",
      "email": "jatantiwarijt@gmail.com",
      "password": "Jatan"
    }
    ```

- **Verify Email**  
  - **Endpoint:** `GET /auth/verify-email`  
  - **Query Parameter:** `token`  
  - **Description:** Verify the user's email address.

- **Login**  
  - **Endpoint:** `POST /auth/login`  
  - **Description:** Login an existing user.  
  - **Example Request Body:**
    ```json
    {
      "email": "jatantiwarijt@gmail.com",
      "password": "Jatan"
    }
    ```

- **Refresh Token**  
  - **Endpoint:** `POST /auth/refresh-token`  
  - **Description:** Get a new access token using a refresh token.  
  - **Example Request Body:**
    ```json
    {
      "refreshToken": "your_refresh_token_here"
    }
    ```

### User Profile

- **Get User Profile**  
  - **Endpoint:** `GET /user/profile/:id`  
  - **Description:** Retrieve the user profile information.  
  - **Authentication:** Bearer token required.

- **Update Profile**  
  - **Endpoint:** `PATCH /user/profile/:id`  
  - **Description:** Update user profile information.  
  - **Example Request Body:**
    ```json
    {
      "name": "Jatan",
      "profilePic": "profile_pic.png"
    }
    ```
  - **Authentication:** Bearer token required.

### Categories

- **Add Category**  
  - **Endpoint:** `POST /category`  
  - **Description:** Add a new category.  
  - **Example Request Body:**
    ```json
    {
      "name": "Biology"
    }
    ```
  - **Authentication:** Bearer token required.

- **Get Category**  
  - **Endpoint:** `GET /category`  
  - **Description:** Retrieve category information. You can use query parameters to filter by `id` or `name`.  
  - **Authentication:** Bearer token required.

- **Update Category**  
  - **Endpoint:** `PATCH /category/:id`  
  - **Description:** Update the category name.  
  - **Example Request Body:**
    ```json
    {
      "name": "Chemistry"
    }
    ```
  - **Authentication:** Bearer token required.

- **Delete Category**  
  - **Endpoint:** `DELETE /category/:id`  
  - **Description:** Delete a category.  
  - **Authentication:** Bearer token required.

### Questions

- **Add Question**  
  - **Endpoint:** `POST /question`  
  - **Description:** Add a new question with options, correct answer, and associated categories.  
  - **Example Request Body:**
    ```json
    {
      "question": "Which gas do plants use for photosynthesis?",
      "options": ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      "correctAnswer": "Carbon Dioxide",
      "categories": ["67bcafe7e0a40f83b980d051", "67bca5c8d256eeacc483bb28"]
    }
    ```
  - **Authentication:** Bearer token required.

- **Get Questions**  
  - **Endpoint:** `GET /question`  
  - **Description:** Retrieve questions. You can filter by `questionId` via query parameters.  
  - **Authentication:** Bearer token required.

- **Upload Questions (CSV/XLSX)**  
  - **Endpoint:** `POST /question/import`  
  - **Description:** Upload a file containing questions. The endpoint supports both CSV and XLSX file formats.  
  - **Form Data:**  
    - **Key:** `file` (type: file)  
  - **Authentication:** Bearer token required.

### Answers

- **Submit Answer**  
  - **Endpoint:** `POST /answer`  
  - **Description:** Submit an answer for a given question.  
  - **Example Request Body:**
    ```json
    {
      "questionId": "67bcabe90c48d7a3669285cb",
      "selectedAnswer": "Madrid"
    }
    ```
  - **Authentication:** Bearer token required.

- **Get Submitted Answers**  
  - **Endpoint:** `GET /answer`  
  - **Description:** Retrieve submitted answers for a specific question by passing `questionId` as a query parameter.  
  - **Authentication:** Bearer token required.

## Postman Collection

A Postman collection is provided to help you test the APIs. The collection includes endpoints for authentication, user management, category management, question handling, and answer submission. You can import the given JSON from code-base into Postman:
```

> **Note:** Replace the `{{url}}` variable in Postman with your base URL (e.g., `http://localhost:8080/api`).

## File Upload

The `/question/import` endpoint supports uploading question files in both CSV and XLSX formats. When making a request:

- Use `multipart/form-data` as the content type.
- Ensure the key for the file is named `file`.

Example using Postman:

1. Select **POST** method.
2. Set URL to `{{url}}/question/import`.
3. Under **Body**, choose **form-data**.
4. Add a key named `file` and set its type to **File**.
5. Select your CSV or XLSX file to upload.

## License

This project is licensed under the [MIT License](LICENSE).