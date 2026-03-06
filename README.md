# Job Portal (Full-Stack)

This repository contains a simple Job Portal web application built using a Node.js/Express/MongoDB backend and a React (Vite) frontend styled with Tailwind CSS. The platform allows users to register, browse jobs, apply for jobs, and manage company job postings.


## 🛠 Tech Stack

**Frontend**

- React (Vite)
- Tailwind CSS
- Redux Toolkit
- Axios

**Backend**

- Node.js
- Express.js
- MongoDB
- JWT Authentication

**Other Tools**

- Cloudinary (File uploads for profile images and resumes)
- REST API Architecture


## 🧩 Project Structure

```
backend/    # Node.js + Express API server
frontend/   # React client application
```


## 🚀 Getting Started

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add the required environment variables. Example:
   ```
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key

   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Start the backend server:
   ```bash
   npm run dev
   # or
   node index.js
   ```

The backend server will run on: `http://localhost:3000`


### 🔐 Important

Authentication requires a JWT secret key. Add one of the following to your `.env` file:

```bash
JWT_SECRET=some_secure_random_string
# or
SECRET_KEY=some_secure_random_string
```

Without this, login and registration will fail.


### ☁️ Cloudinary (Optional)

If the following variables are provided:

```
CLOUDINARY_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

the application will upload profile images and resumes to Cloudinary. If these variables are not set, the server will still run but file uploads will be disabled.


### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.development` file and add:
   ```bash
   VITE_API_BASE_URL=http://localhost:3000/api/v1
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

The frontend will run on: `http://localhost:5173`


## ✅ Features

- User registration and login using JWT authentication
- Secure authentication with HTTP-only cookies
- Upload profile photo and resume
- Company registration and management
- Job posting and job application system
- Protected routes using authentication middleware
- Redux state management
- Custom React hooks for data fetching
- Responsive UI using Tailwind CSS


## 🛠 Enhancements

- Centralized backend error handling
- Input validation using `express-validator`
- Configurable CORS support
- Loading and error states handled in React hooks
- Modular backend structure (controllers, routes, models)


## 💡 Future Improvements

Some ideas to further improve this project:

- Add automated tests using Jest and React Testing Library
- Implement role-based access control
- Add job search and filtering
- Implement pagination for job listings
- Improve UI with animations
- Add notifications for job applications
- Deploy using Docker


## 📁 Uploading the Project to GitHub

1. Initialize a repo in the project root if you haven't already:
   ```bash
   git init
   ```
2. Add a `.gitignore` that excludes:
   - `node_modules`
   - `.env`
3. Commit the changes:
   ```bash
   git add .
   git commit -m "Initial commit"
   ```
4. Connect GitHub repository:
   ```bash
   git remote add origin https://github.com/yourusername/job-portal
   git push -u origin main
   ```


## 📸 Optional Extras

You may also include:

- Screenshots of the application
- A demo video
- Live deployment link

Example:

```
Live Demo: https://yourproject.vercel.app
```


## 📝 Notes

- This project is built as a learning project for full-stack development.
- It demonstrates how to build a modern MERN stack application.
- For production use, additional security features like rate limiting, security headers, and advanced validation should be implemented.


Happy coding!
