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

> Add a GIF or short video here (highly recommended)

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

```

Controllers/
Services/
DataAccess/
Entities/
DTOs/








