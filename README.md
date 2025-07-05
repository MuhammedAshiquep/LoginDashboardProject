# Login & Dashboard Mini Project

This project is a hands-on demonstration of full-stack web development, featuring a secure login system and an interactive dashboard. Built with a .NET 8.0 Web API backend and an Angular 17+ standalone frontend, it addresses all the core requirements of the specified hiring task.

## Table of Contents

- [Key Features](#key-features)
- [Technologies Under the Hood](#technologies-under-the-hood)
- [Project Layout](#project-layout)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [How to Use](#how-to-use)
- [API Overview](#api-overview)
- [Authentication Deep Dive](#authentication-deep-dive)
- [Rate Limiting Explained](#rate-limiting-explained)
- [Ideas for Future Growth](#ideas-for-future-growth)

## Key Features

-   **Robust User Login:** A dedicated, visually appealing login page with essential username and password fields.
-   **Seamless Dashboard Access:** Users are smoothly redirected to the dashboard immediately upon successful authentication.
-   **Clear Error Feedback:** Provides helpful error messages for various login issues, including incorrect credentials and rate limit breaches.
-   **Interactive Dashboard Visualization:** Showcases a dynamic and attractive pie chart, populated with hardcoded data (e.g., a breakdown of ticket statuses).
-   **Modern .NET Core Backend:** A powerful and efficient API layer built using .NET 8.0.
-   **Proactive Rate Limiting:** Implements a distributed rate-limiting mechanism on the login API to effectively counter brute-force attacks.
-   **Secure JWT Authentication:** Generates and validates JSON Web Tokens (JWTs) for protecting API endpoints, ensuring only authenticated users can access sensitive data.
-   **Sleek Angular Frontend:** Developed with Angular 17+ using the modern standalone components approach, promoting modularity and maintainability.

## Technologies Under the Hood

### Backend (.NET Core)
-   **Framework:** .NET 8.0
-   **Language:** C#
-   **Web API:** ASP.NET Core Web API
-   **Authentication:** JWT Bearer Authentication
-   **Rate Limiting:** `AspNetCoreRateLimit` (configured for in-memory storage for this demonstration, but easily extensible to distributed caching solutions like Redis for production scalability).

### Frontend (Angular)
-   **Framework:** Angular 17+ (leveraging Standalone Components)
-   **Language:** TypeScript
-   **Charting Library:** `ng2-charts` (a convenient wrapper for the versatile Chart.js library)
-   **HTTP Client:** Angular's built-in `HttpClient` for efficient API communication.
-   **Routing:** Angular Router, enhanced with `CanActivateFn` (our custom AuthGuard) to secure routes.

## Project Layout


LoginDashboardProject/
├── backend/                  # The .NET Core Web API project
│   ├── Controllers/
│   │   ├── AuthController.cs   # Manages user login and JWT token issuance.
│   │   └── DashboardController.cs # Delivers the hardcoded data for the dashboard chart.
│   ├── Models/
│   │   └── LoginModel.cs       # Defines the data structure for login requests.
│   ├── appsettings.json        # Centralized configuration for JWT settings and IP Rate Limiting rules.
│   └── Program.cs              # Handles backend startup, service registration, and middleware configuration.
├── frontend/                 # The Angular application project
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth.interceptor.ts   # An HTTP interceptor that automatically adds the JWT to outgoing requests.
│   │   │   ├── auth.service.ts       # Manages login/logout logic and handles JWT token storage.
│   │   │   ├── dashboard/            # The Dashboard component, responsible for displaying the pie chart.
│   │   │   │   ├── dashboard.component.html
│   │   │   │   ├── dashboard.component.scss
│   │   │   │   └── dashboard.component.ts
│   │   │   ├── dashboard.service.ts  # Fetches dashboard-specific data from the backend.
│   │   │   ├── login/                # The Login component, containing the user authentication form.
│   │   │   │   ├── login.component.html
│   │   │   │   ├── login.component.scss
│   │   │   │   └── login.component.ts
│   │   │   ├── app.component.ts      # The root standalone component, acting as the main entry point with router-outlet.
│   │   │   ├── app.config.ts         # Angular application's core configuration for the standalone setup.
│   │   │   └── app.routes.ts         # Defines the application's navigation routes and implements the authentication guard.
│   │   └── styles.css                # Global CSS styles (e.g., importing the Inter font).
│   └── (other standard Angular CLI generated files like package.json, angular.json)
└── README.md                 # This very document!


## Getting Started

To get this project up and running on your local machine, follow these simple steps:

### Prerequisites

Before you begin, please ensure you have the following software installed:

-   [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
-   [Node.js](https://nodejs.org/en/download/) (LTS version recommended for stability)
-   [npm](https://www.npmjs.com/get-npm) (comes bundled with Node.js)
-   [Angular CLI](https://angular.io/cli) (Install globally via npm: `npm install -g @angular/cli`)
-   [Postman](https://www.postman.com/downloads/) (or any similar API testing tool like Insomnia, for direct API interaction)

### Backend Setup

1.  **Navigate to the backend directory:**
    Open your preferred terminal or command prompt and change your current directory to the `backend` folder of the project:
    ```bash
    cd LoginDashboardProject/backend
    ```
2.  **Restore NuGet packages:**
    Install all necessary .NET dependencies for the backend:
    ```bash
    dotnet restore
    ```
3.  **Run the backend application:**
    Start the API server. Keep an eye on the terminal output for the URL it's listening on (e.g., `http://localhost:5192`). This terminal window should remain open and running while you interact with the frontend.
    ```bash
    dotnet run
    ```

### Frontend Setup

1.  **Navigate to the frontend directory:**
    Open a **new** terminal or command prompt (separate from your backend terminal) and move into the `frontend` folder:
    ```bash
    cd LoginDashboardProject/frontend
    ```
2.  **Install npm dependencies:**
    Install all Angular and charting library dependencies:
    ```bash
    npm install
    ```
3.  **Run the Angular development server:**
    This command will compile your Angular application and automatically open it in your default web browser (typically at `http://localhost:4200`).
    ```bash
    ng serve --open
    ```

## How to Use

1.  First, ensure both your .NET backend API and Angular frontend development servers are actively running.
2.  Open your web browser and navigate to the Angular application's URL (e.g., `http://localhost:4200`). You'll be automatically directed to the login page.
3.  **Log in using the following hardcoded credentials:**
    -   **Username:** `admin`
    -   **Password:** `password`
4.  Click the "Login" button.
5.  Upon successful authentication, you'll be seamlessly redirected to the dashboard page, where you'll find the interactive pie chart displaying the pre-defined data.
6.  To return to the login page, simply click the "Logout" button located on the dashboard.

## API Overview

All backend API endpoints are hosted on `http://localhost:5192/api/` (remember to adjust the port if your `dotnet run` output shows a different one).

-   **`POST /api/Auth/login`**
    -   **Purpose:** Authenticates a user and issues a JWT.
    -   **Request Body Example:**
        ```json
        {
          "username": "string",
          "password": "string"
        }
        ```
    -   **Success Response:** `{"token": "string"}` (the JSON Web Token).
    -   **Failure Responses:** `401 Unauthorized` (for invalid credentials) or `429 Too Many Requests` (if the rate limit is hit).
    -   **Protection:** This endpoint is rate-limited.

-   **`GET /api/Auth/profile`**
    -   **Purpose:** Retrieves basic profile information for the authenticated user.
    -   **Required Headers:** `Authorization: Bearer <YOUR_JWT_TOKEN>`
    -   **Success Response:** `{"username": "string", "message": "string"}`
    -   **Failure Response:** `401 Unauthorized` (if the token is missing, invalid, or expired).
    -   **Protection:** Requires a valid JWT token.

-   **`GET /api/Dashboard`**
    -   **Purpose:** Provides the hardcoded data used to populate the dashboard chart.
    -   **Required Headers:** `Authorization: Bearer <YOUR_JWT_TOKEN>`
    -   **Success Response:**
        ```json
        [
          {"status": "Open", "count": 10},
          {"status": "In Progress", "count": 5},
          {"status": "Closed", "count": 8}
        ]
        ```
    -   **Failure Response:** `401 Unauthorized` (if the token is missing, invalid, or expired).
    -   **Protection:** Requires a valid JWT token.

## Authentication Deep Dive

-   The backend implements a robust **JSON Web Token (JWT)** based authentication system.
-   Upon a successful login to the `/api/Auth/login` endpoint, a JWT is securely issued to the client. Its expiry time is configurable (defaulting to 60 minutes).
-   The Angular frontend intelligently stores this JWT within the browser's `localStorage`.
-   A custom **Angular HTTP Interceptor (`AuthInterceptor`)** plays a key role here; it automatically attaches the stored JWT as an `Authorization: Bearer <token>` header to every subsequent HTTP request targeting your backend.
-   Crucially, protected API endpoints on the backend (marked with the `[Authorize]` attribute) meticulously validate this token, ensuring only legitimate, authenticated users gain access.

## Rate Limiting Explained

-   To safeguard against brute-force attacks, the `POST /api/Auth/login` endpoint is fortified with an **IP-based rate-limiting mechanism**.
-   This is precisely configured to permit a maximum of **5 login attempts per minute** from any single IP address.
-   Should this limit be exceeded, the server will gracefully respond with a `429 Too Many Requests` HTTP status code.
-   The implementation leverages the `AspNetCoreRateLimit` NuGet package. While this demonstration uses an in-memory store for simplicity, the library is fully capable of integrating with distributed caches (like Redis) for true scalability in production environments.

## Ideas for Future Growth

This project provides a solid foundation, and there are many exciting avenues for expansion:

-   **Database Integration:** Transition from hardcoded credentials to a real user database (e.g., SQL Server with Entity Framework Core) for comprehensive user management and registration.
-   **User Registration:** Add a dedicated page and API endpoint for new user sign-ups.
-   **Role-Based Access Control:** Implement granular authorization by introducing user roles (e.g., Admin, Standard User) to control access to different features or data.
-   **Enhanced UI/UX:** Elevate the frontend's visual appeal and user experience by integrating a professional Angular component library (e.g., Angular Material, Bootstrap).
-   **Dynamic Chart Data:** Populate chart data dynamically from a database or a more complex backend service, making the dashboard truly reflective of real-time information.
-   **JWT Refresh Tokens:** Introduce a refresh token mechanism to improve user experience (less frequent logins) and enhance security.
-   **True Distributed Rate Limiting:** For production deployments with multiple server instances, integrate a distributed cache (like Redis) with `AspNetCoreRateLimit`.
-   **Comprehensive Testing:** Develop robust unit and integration tests for both the backend and frontend components to ensure reliability and maintainability.
