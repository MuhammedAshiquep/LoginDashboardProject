🔐 Login & Dashboard Mini Project
A full-stack web application built to demonstrate secure authentication and dynamic data visualization using modern development tools. This project includes a .NET 8 Web API backend and an Angular 17 standalone frontend, with proper JWT authentication and rate-limiting protections.

🌐 Live Demo
🧭 Frontend (Angular - Netlify):
👉 https://peaceful-bombolone-786a04.netlify.app

🚀 Backend (ASP.NET Core - Railway):
👉 https://enthusiastic-commitment-production.up.railway.app



🧩 Key Features
✅ Login Page with username/password and clear feedback

🔐 JWT Authentication with secure token handling

📊 Dashboard with a responsive, interactive pie chart

📈 Hardcoded Data Visualization (e.g., ticket status breakdown)

🛡️ Rate Limiting to prevent brute-force login attacks

🌐 Cross-Origin Resource Sharing (CORS) enabled

🧠 Modular Angular App using standalone components

🔄 HTTP Interceptor to auto-attach JWT to requests

🧪 Test Credentials
Use these to try out the app:

bash
Copy
Edit
Username: admin
Password: password
🛠️ Tech Stack
📌 Backend (ASP.NET Core)
.NET 8 Web API

JWT-based Authentication

AspNetCoreRateLimit for rate limiting

🌐 Frontend (Angular)
Angular 17 Standalone Components

TypeScript + ng2-charts (Chart.js)

Angular Router + Route Guards

LocalStorage for token management

🗂️ Project Structure
bash
Copy
Edit
LoginDashboardProject/
├── backend/       # ASP.NET Core Web API
└── frontend/      # Angular 17 App (standalone)
⚙️ Local Setup Guide
🔧 Prerequisites
.NET 8 SDK

Node.js & npm

Angular CLI

(Optional) Postman to test APIs directly

🖥️ Backend Setup
bash
Copy
Edit
cd backend
dotnet restore
dotnet run
This will run your API at http://localhost:5192 (or similar). Keep this terminal open.

💻 Frontend Setup
bash
Copy
Edit
cd frontend
npm install
ng serve --open
This will open the app at http://localhost:4200.

▶️ How to Use
Open http://localhost:4200 or visit the Netlify frontend

Login using:

admin / password

Upon success, you'll be redirected to the dashboard.

A pie chart will be shown with sample ticket data.

Logout option is available to test token expiration flow.

🔐 API Overview
POST /api/Auth/login
Authenticates user and returns JWT

Protected by rate limiting (5 requests/min)

GET /api/Auth/profile
Returns username from token

Requires Bearer <token> in Authorization header

GET /api/Dashboard
Returns hardcoded chart data

JWT protected

🧠 Behind the Scenes
✅ JWT Authentication
On login, a secure token is generated and sent to frontend

Stored in localStorage

Auto-injected using Angular's HTTP interceptor

Backend protects /profile and /dashboard using [Authorize] attribute

⚙️ Rate Limiting
Max 5 login attempts/minute/IP

Returns 429 Too Many Requests on breach

Implemented using AspNetCoreRateLimit

🚀 Future Enhancements
🔄 Refresh tokens for smoother auth experience

🧑‍🤝‍🧑 User registration flow

🧮 Store users in a real database

🧱 Add role-based access control

🌍 Use Redis for distributed rate limiting

🎨 Enhance UI with Angular Material

📊 Pull live data into the dashboard

✅ Add unit/integration tests

📬 Submission Checklist
✅ Project live on Netlify (Frontend)

✅ API hosted via Railway (Backend)

✅ JWT + Rate Limiting implemented
