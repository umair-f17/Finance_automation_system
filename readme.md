umair-f17
umair-f17
readme added
b8bd150
 · 
10 hours ago
Finance_automation_system
/README.md

Preview

Code

Blame
105 lines (41 loc) · 1.42 KB
Full-Stack MERN Project with MySQL
Project Setup
Follow the instructions below to get the project up and running on your local machine.
Clone the Repository
Clone the repository using the following command:
git clone https://github.com/umair-f17/Finance-Automation-System.git
Setup Frontend
Go to the frontend directory and install all dependencies:
cd frontend

npm install
Create a .env file in the backend directory at root level and add the following environment variables:
VITE_API_URL=backend-api

To run the frontend:

npm run dev
Setup Backend
Go to the backend directory and install all dependencies:
cd backend

npm install
Create a .env file in the backend directory at root level and add the following environment variables:
  

PORT=your-port

DB_HOST=your-database-host

DB_USER=your-database-username

DB_PASSWORD=your-database-password

DB_NAME=your-database-name
To run the backend:
npm run start

