# Dayflow – Human Resource Management System (HRMS)

Dayflow is a full-stack Human Resource Management System designed to digitize and streamline core HR operations such as employee management, attendance tracking, leave management, and role-based access control.  
The system is built using **React** for the frontend and **Spring Boot** for the backend, following modern web application architecture.

---

## 🚀 Features

### 👤 Authentication & Authorization
- Secure login and registration
- Role-based access (Admin / HR Officer / Employee)
- Protected routes and APIs

### 🧑‍💼 Employee Management
- Employee list with profile cards
- View-only employee profile details
- Admin/HR access to all employees

### ⏱ Attendance Management
- Daily attendance list view
- Check-in and check-out records
- Work hours and extra hours calculation
- Admin/HR attendance dashboard

### 🏖 Leave & Time-Off Management
- Apply for leave (Paid / Sick / Unpaid)
- Leave approval or rejection by Admin/HR
- Real-time status updates

### 📊 Dashboard & UI
- Modern, responsive UI built with React
- Search and date filters
- Clean admin-friendly layouts

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- React Router
- Tailwind CSS / CSS
- Fetch API / Axios

### Backend
- Spring Boot
- Spring Security
- RESTful APIs
- JPA / Hibernate

### Database
- MySQL / PostgreSQL (configurable)

---

## 🏗 Project Architecture

Frontend (React)
|
| HTTP / JSON (REST APIs)
|
Backend (Spring Boot)
|
Database

yaml
Copy code

---

## 📁 Project Structure

### Frontend
frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── App.jsx
│ └── main.jsx
├── index.html
└── package.json

shell
Copy code

### Backend
backend/
├── src/main/java/
│ ├── controller/
│ ├── service/
│ ├── repository/
│ └── model/
├── application.properties
└── pom.xml

yaml
Copy code

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/dayflow-hrms.git
cd dayflow-hrms
2️⃣ Run Backend (Spring Boot)
bash
Copy code
cd backend
mvn spring-boot:run
Backend will start at:

arduino
Copy code
http://localhost:8080
3️⃣ Run Frontend (React)
bash
Copy code
cd frontend
npm install
npm run dev
Frontend will start at:

arduino
Copy code
http://localhost:5173
🔌 API Integration
Frontend communicates with backend via REST APIs

Authentication handled via sessions / JWT

CORS enabled for cross-origin communication

Example API:

bash
Copy code
GET /api/attendance
POST /api/login
POST /api/leave/apply
🔐 Security
Password encryption

Role-based authorization

Protected backend endpoints

Secure API communication

📌 Future Enhancements
Payroll & salary slip generation

Analytics and reporting dashboard

Biometric attendance integration

Email & notification service

Deployment using Docker & cloud platforms


👨‍💻 Contributors
Zenil Vadhani
Preet Patel
Parth Bhatt
Rahul Singh
