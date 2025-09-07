# Task Manager API

A simple RESTful API for managing tasks, allowing users to create, read, update, and delete tasks with ease.

## Technologies

- `Node.js`
- `Express.js`
- `Supabase`

## Features

- ✅ Create new tasks with title and completion status
- 📋 Retrieve all tasks or a specific task by ID
- ✏️ Update task details (title and completion status)
- 🗑️ Delete tasks by ID

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account

## 🚦 Running the Project

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `node server.js`
4. Open `http://localhost:3000` in your browser

## Preview

### Get All Tasks
```http
GET /tasks
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Finish README",
    "completed": false,
    "created_at": "2024-01-01T10:00:00Z"
  }
]
```