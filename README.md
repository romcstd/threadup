# 🧵 ThreadUp

ThreadUp is a modern MERN-stack web application that empowers users to create accounts, share posts, and engage in meaningful discussions through thread-based conversations. Whether it’s sharing ideas, starting debates, or building a community, ThreadUp provides a clean and intuitive platform for open dialogue.

## 🚀 Tech Stack
Frontend	Backend	Database	State Management	DevOps
React + Vite	Node.js + Express.js	MongoDB	Zustand	Docker
TypeScript	REST API	Mongoose	

## 🌟 Why ThreadUp?
ThreadUp is designed for communities, teams, and individuals who want a minimal yet powerful platform for sharing content and engaging with others. Whether it’s casual discussions, technical threads, or collaborative topics, ThreadUp brings the conversation up.

🧵 Thread-based conversations

👥 Account creation & authentication

✍️ Post, reply, and engage

⚡ Fast and responsive UI (Vite + Tailwind CSS)

🐻 Lightweight state management with Zustand

🐳 Fully Dockerized for easy local & production deployment


## 📂 Project Structure

/client    → React + Vite + Tailwind CSS (Frontend)
/server    → Node.js + Express.js API (Backend)
/db        → MongoDB setup
/docker    → Docker configurations

🛠️ Features

User Registration & Login

Thread-based Post Creation

Engage in Discussions via Replies

Responsive & Clean UI

RESTful API with Express.js

Global State with Zustand

Dockerized for Local & Production Environments

1. Clone the Repository

git clone https://github.com/your-username/threadup.git
cd threadup

2. Create .env Files
For Backend (/server/.env):
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key

3. Run Locally (Without Docker)

Backend:
cd server
npm install
npm run dev

Frontend:
cd client
npm install
npm run dev

4. Run with Docker (Dev)
docker-compose up --build

5. Open in Browser
Frontend: http://localhost:5173
Backend API: http://localhost:5000

🐳 Docker Deployment (Production Ready)
docker-compose -f docker-compose.prod.yml up --build
