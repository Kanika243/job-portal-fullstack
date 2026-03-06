import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/authSlice';
import { USER_API_END_POINT } from './utils/constant';
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'


// layout component that places Navbar above all child routes
const RootLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, // render navbar + outlet
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'jobs', element: <Jobs /> },
      { path: 'description/:id', element: <JobDescription /> },
      { path: 'browse', element: <Browse /> },
      { path: 'profile', element: <Profile /> },
      // admin routes
      {
        path: 'admin/companies',
        element: <ProtectedRoute><Companies/></ProtectedRoute>
      },
      {
        path: 'admin/companies/create',
        element: <ProtectedRoute><CompanyCreate/></ProtectedRoute>
      },
      {
        path: 'admin/companies/:id',
        element: <ProtectedRoute><CompanySetup/></ProtectedRoute>
      },
      {
        path: 'admin/jobs',
        element: <ProtectedRoute><AdminJobs/></ProtectedRoute>
      },
      {
        path: 'admin/jobs/create',
        element: <ProtectedRoute><PostJob/></ProtectedRoute>
      },
      {
        path: 'admin/jobs/:id/applicants',
        element: <ProtectedRoute><Applicants/></ProtectedRoute>
      }
    ]
  }
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // check backend for authenticated user; clears stale persisted state
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/me`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setUser(res.data.user));
        } else {
          dispatch(setUser(null));
        }
      } catch (err) {
        dispatch(setUser(null));
      }
    };
    fetchUser();
  }, [dispatch]);

  return (
    <div>
      {/* router provider will render Navbar via RootLayout */}
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
