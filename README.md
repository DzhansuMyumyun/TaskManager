# 🧠 TaskManager – Full Stack Task Management App

A modern **kanban-style task management application** built with React and .NET, designed to manage tasks, subtasks, and workflows with a clean and interactive user experience.

---
## ✨ Features

- 📋 Create, update, and delete tasks
- ✅ Subtask management with progress tracking
- 📊 Real-time subtask completion (e.g. 2/5 completed)
- 🧲 Drag & drop task movement (Kanban board)
- 🔍 Filter tasks by project
- 🔔 Toast notifications for user feedback
- ⚡ Optimistic UI updates for smooth interactions
- 🎯 Status-based workflow (To Do → In Progress → Done)

---

## 🖥️ Demo

<video src="https://i.imgur.com/EO2X8nI.mp4" controls="controls" style="max-width: 100%;">
</video>

---

## 🏗️ Tech Stack

### Frontend
- **React (TypeScript)**
- **React Query** – data fetching & caching
- **Tailwind CSS** – styling
- **DnD Kit** – drag & drop functionality
- **Axios** – API communication
- **Storybook** – UI component development
- **Jest / Testing Library** *(planned / in progress)*

### Backend
- **.NET (ASP.NET Core Web API)**
- **Entity Framework Core**
- **SQL Server**
- **Layered Architecture (Controller → Service → DAL)**

---

## 🧩 Architecture Overview

The project follows a **feature-based frontend architecture** and a **layered backend architecture**.

### Frontend Structure
src/
features/
tasks/
hooks/
services/
components/
projects/
subTasks/
components/
ui/ (reusable UI components)
types/

- Separation of concerns between UI, logic, and API
- Custom hooks for data fetching and mutations
- Scalable structure for future features

---

### Backend Structure

Controllers/
Services/
DataAccess/
Entities/
DTOs/

- DTO-based communication between client and server
- Business logic isolated in service layer
- Clean separation of data access and logic

---

## 🔄 Key Implementation Details
🧲 Drag & Drop System
- Built using DnD Kit
- Tasks can be moved between status columns
- State updates instantly with backend synchronization


---

## 📊 Subtask Progress Tracking
Each task dynamically calculates progress:

completedSubtasks / totalSubtasks

- Automatically updates UI
- Improves task visibility and usability

---

## ⚡ Optimistic Updates
- UI updates immediately before server response
- Provides a smoother user experience
- Handles async state efficiently with React Query


---
## 🔗 Relational Data Handling
- Tasks and subtasks are managed separately
- Subtasks are linked via taskItemId
- Ensures data integrity and scalability

---
## ⚠️ Challenges & Solutions
❌ Issue: Subtasks failing due to foreign key constraint

Problem:
Subtasks were being created before the parent task ID existed.

Solution:
- First create the task
- Extract returned taskId
- Then create subtasks using that ID


❌ Issue: API response did not return created entity

Solution:
- Updated backend to return SuccessDataResult<TaskItem>
- Enabled frontend to correctly access taskId


❌ Issue: Update and Subtask Sync

Solution:
- Separated task update and subtask operations
- Implemented:
  - create
  - update
  - delete logic for subtasks
 
---
## 🧪 Testing & UI Development
- 📘 Storybook used for isolated UI development
- 🧪 Unit tests (in progress)
- Focus on reusable and testable components

---
## 🚀 Getting Started
1. Clone the repository
 ```bash
   git clone https://github.com/your-username/taskmaster.git
   cd taskmaster
```
   
2. Frontend Setup
 ```bash
cd taskmaster-frontend
npm install
npm run dev
```

3. Backend Setup
 ```bash
cd taskmaster-backend
dotnet restore
dotnet run
```
   
4. Environment Variables
Create .env file in frontend if needed:
 ```bash
VITE_API_URL=http://localhost:5000/api
```

---
## 📈 Future Improvements
- 🔄 Real-time updates (WebSockets / SignalR)
- 👥 User authentication & roles
- 📅 Calendar view for tasks
- 📱 Mobile responsiveness improvements
- ⚡ Advanced filtering & search
- 🧠 AI-assisted task suggestions (future idea)

---
## 💡 What I Learned
- Managing relational data between frontend and backend
- Handling async workflows and optimistic updates
- Structuring scalable React applications
- Improving UX with feedback systems (toasts, loading states)
- Debugging real-world API and database issues

---
### 👤 Author
Dzhansu Myumyun

---
### ⭐ If you like this project
Give it a star ⭐ — it helps a lot!
