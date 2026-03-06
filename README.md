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
4. `npm run dev` (or `node index.js`) to start server on `PORT` (default 8000)

### Frontend
1. `cd frontend`
2. `npm install`
3. Create a `.env.development` file with entries as shown below.
4. `npm run dev` to start the Vite development server (defaults to port 5173)

### Environment variables (frontend)

```
VITE_API_BASE_URL=http://localhost:8000/api/v1
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

## � Deployment & sharing
To make this project shine in your portfolio, follow these steps:

1. **Push code to GitHub** – create a new public repository and commit your project. Add a meaningful commit history if possible.
2. **Add screenshot or demo video** – capture key flows (register/login, company/job posting, application) and embed inside the README or link to a Loom/YouTube video. Use markdown:
   ```markdown
   ![Signup screen](./screenshots/signup.png)
   ```
3. **Deploy backend**
   - Choose a host (Heroku, Render, DigitalOcean, etc.).
   - Configure environment variables (see `.env.example`).
   - Set `CLIENT_URL` to your front‑end URL.
   - Deploy using GitHub integration or CLI. You’ll get a URL like `https://your-app.herokuapp.com`.
4. **Deploy frontend**
   - Build with `npm run build` and host on Netlify, Vercel or GitHub Pages.
   - Set the environment variable `VITE_API_BASE_URL` to the backend URL.
   - After deploy you’ll have a public front‑end link.

Include both live URLs in the repository’s README and on your résumé/linkedin.

## 📁 GitHub repository tips
- Use a clear repository name such as `job-portal-fullstack`.
- Keep the README up to date with setup instructions (adapt steps above).
- Include `.env.example` files and any necessary setup notes.
- Add a license (MIT is common) and a descriptive project summary.

## 📸 Screenshots & video
Screenshots are useful for quickly showing recruiters what the app looks like; a short video (30‑60s) walking through the main features adds extra polish. Upload images to a `screenshots/` folder or embed directly, and host videos on Loom/YouTube with links in the README.

## �📄 Notes
- No automated tests included; consider adding Jest/React Testing Library for production
- Database indexes and security hardening (rate‑limit, helmet) should be added for a real deployment.

Happy coding!