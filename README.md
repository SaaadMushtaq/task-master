# Task Master - Project Management Application

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Project Status](#project-status)

## Features

- User authentication (login/logout)
- Project creation and management
- Task organization with drag-and-drop functionality
- Task status tracking (To Do, In Progress, Done)
- Responsive design for all screen sizes
- Modern UI with smooth animations

## Technologies Used

### Frontend

- React.js with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- React Icons for vector icons
- React Toastify for notifications
- Axios for API calls

### Backend

- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication

### Development Tools

- Vite for build tooling
- ESLint and Prettier for code quality
- Git for version control

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB instance
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/task-master.git
   cd task-master
   cd frontend
   npm install
   npm run dev

   cd ../backend
   npm install
   npm start
   ```

### Create a .env file in the Backend folder and add the following variables:

- PORT=8080
- MONGODB_URI=mongodb+srv://saad:1234@cluster0.ijbu6pq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
- JWT_SECRET=secret-123

### API Documentation

#### Base URL

`https://your-api-domain.com/api`

#### Authentication

##### Register User

**Endpoint**: `POST /auth/register`  
**Description**: Create a new user account

##### Login User

**Endpoint**: `POST /auth/login`  
**Description**: Login with a registered user accoun

#### Projects

##### Create Project

**Endpoint**: `POST /auth/projects`  
**Description**: Create a new project

##### Get All Projects

**Endpoint**: `GET /auth/projects`  
**Description**: Get all projects

##### Get Project By Id

**Endpoint**: `GET /auth/projects/:id`  
**Description**: Get a project by its id

##### Update Project

**Endpoint**: `PUT /auth/projects/:id`  
**Description**: Update a project by its id

##### Delete Project

**Endpoint**: `DELETE /auth/projects/:id`  
**Description**: Delete a project by its id

#### Tasks

##### Create Task

**Endpoint**: `POST /auth/tasks`  
**Description**: Create a new task

##### Get All Tasks

**Endpoint**: `GET /auth/tasks/:projectId`  
**Description**: Get all tasks for a project

##### Get Task By Id

**Endpoint**: `GET /auth/tasks/get-by-id/:id`  
**Description**: Get a task by its id

##### Update Task

**Endpoint**: `PUT /auth/tasks/:id`  
**Description**: Update a task by its id

##### Delete Task

**Endpoint**: `DELETE /auth/tasks/:id`  
**Description**: Delete a task by its id

##### Reorder Task

**Endpoint**: `PUT /auth/tasks/reorder`  
**Description**: Reorder tasks

### Time Taken and which parts are complete

- A total of 6-7 hours(3 hours yesterday and 3+ hours today)
- All parts of the project are complete except for the bonus functionality to add project memebers(invite by email)

### Walkthrough

1. Register a new user:

- Go to http://localhost:3000/
- You will be redirected to the login page
- Click "Sign up"
- Enter your details and click "Create Account"
- After account creation you will be redirected to the login page

2. Login:

- Enter your email and password and click "Sign in"
- you will be redirected to the dashboard

3. Create a new project:

- Click "Create New Project"
- Enter the project details and click "Create Project"

4. Create a new task:

- Click on _Name_ of the project you want to add the task to
- Click "Create New Task"
- Enter the task details and click "Create Task"

5. Drag and drop tasks:

- Click on the task you want to move
- Drag and drop the task to the desired position
