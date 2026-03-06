# Job Portal (Full‑Stack)

This repository contains a simple job portal application with a Node/Express/MongoDB backend and a React/Vite frontend using Tailwind CSS.

## 🧩 Structure

```
backend/   # API server
frontend/  # React client
```

## 🚀 Getting started

### Backend
1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and fill values (Mongo URI, JWT secret, Cloudinary keys, etc.)
4. `npm run dev` (or `node index.js`) to start server on `PORT` (default 3000)

> 🔐 **IMPORTANT:** you must set a JWT secret for authentication to work. Add one of the following to your `.env` file:
>
> ```
> JWT_SECRET=some_secure_random_string
> # or the legacy variable name
> SECRET_KEY=some_secure_random_string
> ```
>
> Without this, login/register requests will fail with a 500 error.


> **Note:** the API will attempt to upload user profile images and resumes to Cloudinary only if the following variables are set:
> ```
> CLOUDINARY_NAME
> CLOUDINARY_API_KEY
> CLOUDINARY_API_SECRET
> ```
> If these are missing the server will still run and registration will succeed without storing any images.

### Frontend
1. `cd frontend`
2. `npm install`
3. Create a `.env.development` file with entries as shown below.
4. `npm run dev` to start the Vite development server (defaults to port 5173)

### Environment variables (frontend)

```
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

Adjust values for production or staging.

## ✅ Features implemented
- User registration/login with JWT stored in an HTTP-only cookie
- File uploads (profile photo, resume) using Cloudinary
- Company registration and CRUD
- Job postings and applications
- Authentication middleware and input validation
- React components with Redux state and custom hooks

## 🛠 Enhancements
- Centralised error handling on backend
- Request validation with `express-validator`
- Configurable CORS origin and environment support
- Basic loading/error state handling in React hooks

## 💡 Additional ideas for a fresher project
- Add automated tests using Jest (backend) and React Testing Library (frontend)
- Implement role-based route protection on the frontend
- Add pagination and search filtering for job listings
- Include user profile editing and resume upload on frontend
- Improve the design with animations or a UI library like Chakra or Material UI
- Add Docker configuration for easy local development

## 📁 Getting it on GitHub
1. Initialise a repo in the project root if you haven't already: `git init`.
2. Add a `.gitignore` that excludes `.env` files and `node_modules`.
3. Commit your code and push to a new GitHub repository of your choice.

## 📸 Optional extras
A couple of screenshots (placed in a `screenshots/` folder) or a short demo video are nice to have but not required.

---

## 📝 Notes
- This project is meant as a learning exercise; it contains no automated tests.
- For production use you would add validation, security headers, rate-limiting, etc.

Happy coding!