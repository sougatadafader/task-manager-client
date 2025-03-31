# Task Manager Client (Frontend)

This is the frontend client for the **Task Manager Web Application**, built using **React** and **TypeScript**. It allows users to create, view, edit, and delete tasks in a clean, responsive interface.

> 🔧 Paired with the [TaskManagerServer](https://github.com/sougatadafader/TaskManagerServer) backend.

---

## ✨ Features

- View all tasks
- Create a task with title, description, and due date
- Edit existing tasks
- Delete tasks with confirmation
- Toast notifications for feedback
- Mobile and desktop responsive layout

---

## 🛠 Tech Stack

- React with TypeScript
- React Bootstrap
- ToastMessage component

---

## 🔗 Live Demo

- 🔗 [Live Frontend](https://task-manager-client-sooty.vercel.app/)
- 🔗 [Live API Backend](https://taskmanagerserver-63ij.onrender.com)

---

## 📦 Getting Started

### 1. Clone the frontend repository
```bash
git clone https://github.com/sougatadafader/task-manager-client.git
cd task-manager-client
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm start
```
The app will be running at `http://localhost:3000`

---

## 🔁 Configuring Backend URL

The API URL is controlled via environment variable:

```ts
// src/constants/Constants.ts
export const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/";
```

To use a hosted backend, create a `.env` file in the root of the project:
```env
REACT_APP_API_URL=https://taskmanagerserver-63ij.onrender.com/api/
```

Then restart the dev server.

---

Includes at least one test (e.g., TaskCard rendering).

---

## 📁 Folder Structure

```
task-manager-client/
├── src/
│   ├── components/
│   ├── pages/
│   ├── types/
│   ├── constants/
│   └── App.tsx
├── public/
├── .env
├── package.json
```

---

## ✍️ Author

**Sougata Dafader**  
GitHub: [@sougatadafader](https://github.com/sougatadafader)

---

## 📌 Notes

- This frontend is designed to work seamlessly with the Express + SQLite backend.
- Built as part of a technical evaluation.
