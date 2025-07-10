# 🔐 **Login & Dashboard Mini Project**

A full-stack authentication and data visualization application built using **.NET 8 Web API** and **Angular 17 (standalone)**. It features **JWT authentication**, **rate-limiting** to prevent brute-force attacks, and a **responsive dashboard** with charts.

---

## 🌍 **Live Deployment**

- ⭐ **Frontend (Angular - Netlify)**:  
  👉 [https://peaceful-bombolone-786a04.netlify.app](https://peaceful-bombolone-786a04.netlify.app)

- ⭐ **Backend (ASP.NET Core - Railway)**:  
  👉 [https://enthusiastic-commitment-production.up.railway.app](https://enthusiastic-commitment-production.up.railway.app)

> ⚠️ The backend is API-only — accessing it directly will show a 404, but it works with the frontend.

---

## ✨ **Features**

- ⭐ **Secure Login** with JWT-based authentication  
- ⭐ **Rate Limiting** using `AspNetCoreRateLimit` (5 attempts/min)  
- ⭐ **Interactive Dashboard** using `ng2-charts` (Chart.js)  
- ⭐ **JWT Auto-injection** via Angular HTTP Interceptor  
- ⭐ **CORS Enabled** for smooth frontend-backend communication  
- ⭐ **Angular 17 Standalone Component Architecture**  
- ⭐ **Modular and Maintainable Code Structure**

---

🛠️ Installation Guide
🔧 Prerequisites
⭐ .NET 8 SDK

⭐ Node.js & npm

⭐ Angular CLI

## 🧪 **Test Credentials**

```bash
⭐ Username: admin
⭐ Password: password

⚙️ Tech Stack
⭐ Backend (ASP.NET Core)
.NET 8 Web API

JWT Authentication

Rate limiting with AspNetCoreRateLimit

⭐ Frontend (Angular)
Angular 17 Standalone Components

TypeScript

ng2-charts (Chart.js wrapper)

Angular Router & Route Guards

LocalStorage for token handling



🖥️ Backend Setup
cd backend
dotnet restore
dotnet run
Runs on: http://localhost:5192

💻 Frontend Setup
cd frontend
npm install
ng serve --open
Runs on: http://localhost:4200

▶️ How to Use
Open http://localhost:4200 or use the Netlify link

Login using:

Username: admin

Password: password

On success, you'll be redirected to the dashboard

View pie chart of ticket statuses

Logout to test token expiration

📡 API Endpoints
🔐 POST /api/Auth/login
⭐ Authenticates user and returns a JWT

⭐ Rate limited: 5 requests/minute

🔐 GET /api/Auth/profile
⭐ Requires token (Bearer header)

⭐ Returns username from token

📊 GET /api/Dashboard
⭐ Returns chart data

⭐ JWT-protected

🧠 How It Works
✅ JWT Authentication
Token generated on login

Stored in localStorage

Auto-attached to requests via HTTP interceptor

Backend uses [Authorize] to secure endpoints

🚫 Rate Limiting
Max 5 login attempts per minute/IP

Returns 429 Too Many Requests on limit breach

Uses AspNetCoreRateLimit package

🚀 Future Enhancements
🔁 Refresh token flow

👤 User registration page

🧮 Move to real DB for user data

🔐 Role-based access control

🌐 Redis-based distributed rate limiting

🎨 UI upgrade with Angular Material

📊 Dynamic/live dashboard data

✅ Unit and integration tests


