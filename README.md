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
