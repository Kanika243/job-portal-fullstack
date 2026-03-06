import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const { status, error } = useSelector(store => store.job);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, [user, navigate]);
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      {status === 'loading' && <p className="text-center mt-6">Loading jobs...</p>}
      {error && <p className="text-center mt-6 text-red-500">Error: {error}</p>}
      <LatestJobs />
      <Footer />
    </div>
  )
}

export default Home