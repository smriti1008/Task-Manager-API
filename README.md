# Task Manager REST API

A backend application built using **Node.js, Express.js, and MongoDB** that provides secure task management through RESTful APIs. It supports user authentication, task CRUD operations, and status-based filtering.

## Features

- **User Authentication** – Register and login using email and password.
- **Password Hashing** – Secure password storage using bcrypt.
- **JWT Authentication** – Protect private routes using JSON Web Tokens.
- **Create Tasks** – Create tasks associated with the logged-in user.
- **Get Tasks** – Retrieve all tasks belonging to the authenticated user.
- **Get Individual Task** – Fetch a specific task by its ID.
- **Update Tasks** – Modify task details and status.
- **Delete Tasks** – Delete existing tasks.
- **Status Filtering** – Filter tasks by pending, in-progress, or completed.
- **Input Validation** – Validate incoming request data.
- **Error Handling** – Centralized error-handling middleware.

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB object modeling |
| JWT | Authentication |
| bcryptjs | Password hashing |
| dotenv | Environment variable management |

## Project Structure

```text
Task-Manager/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   └── taskController.js
│
├── middlewares/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   ├── user.js
│   └── task.js
│
├── routes/
│   ├── authRoutes.js
│   └── taskRoutes.js
│
├── app.js
├── server.js
├── .env
├── .gitignore
└── package.json
```

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd Task-Manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Replace the placeholder values with your own configuration.

### 4. Start the development server

```bash
npm run dev
```

The server will run at:

```text
http://localhost:3000
```

## API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login and receive JWT | Public |

### Tasks

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/tasks` | Create a task | Private |
| GET | `/api/tasks` | Get all user's tasks | Private |
| GET | `/api/tasks/:id` | Get a specific task | Private |
| PATCH | `/api/tasks/:id` | Update a task | Private |
| DELETE | `/api/tasks/:id` | Delete a task | Private |

### Task Filtering

Filter tasks using the `status` query parameter:

```http
GET /api/tasks?status=pending
```

Supported statuses:

- `pending`
- `in-progress`
- `completed`

## Authentication

Private endpoints require a valid JWT.

Include the token in the request header:

```http
Authorization: Bearer <your_jwt_token>
```

Users can only access and modify tasks associated with their own account.

## Testing

All API endpoints can be tested using **Postman**.

The testing workflow includes:

1. Register a user.
2. Login and obtain a JWT.
3. Access protected task endpoints.
4. Create, retrieve, update, and delete tasks.
5. Test status-based filtering.
6. Verify authentication and task ownership restrictions.

## Future Improvements

- React-based frontend dashboard.
- Pagination and search functionality.
- Task priority and categories.
- Due-date reminders.
- API documentation using Swagger.
- Automated testing.

---

**Author:** Smritiiie
