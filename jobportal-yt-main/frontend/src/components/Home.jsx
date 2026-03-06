import React, { useEffect } from 'react'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import JobSummarizer from './JobSummarizer' // This import will now be used

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);
  
  return (
    <div>
      <HeroSection />
      <CategoryCarousel />

      {/* ================================================== */}
      {/* START: THIS IS THE NEW SECTION I ADDED      */}
      {/* ================================================== */}
      <div className="max-w-7xl mx-auto my-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-4">AI-Powered Career Tools</h2>
        <p className="text-center text-gray-600 mb-8">Use our Gemini assistant to help with your job search!</p>
        <JobSummarizer />
      </div>
      {/* ================================================== */}
      {/* END: THIS IS THE NEW SECTION I ADDED       */}
      {/* ================================================== */}
      
      <LatestJobs />
      <Footer />
    </div>
  )
}

export default Home;




// import React, { useEffect } from 'react'
// import Navbar from './shared/Navbar'
// import HeroSection from './HeroSection'
// import CategoryCarousel from './CategoryCarousel'
// import LatestJobs from './LatestJobs'
// import Footer from './shared/Footer'
// import useGetAllJobs from '@/hooks/useGetAllJobs'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import JobSummarizer from './JobSummarizer'
// const Home = () => {
//   useGetAllJobs();
//   const { user } = useSelector(store => store.auth);
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (user?.role === 'recruiter') {
//       navigate("/admin/companies");
//     }
//   }, []);
//   return (
//     <div>
//       <Navbar />
//       <HeroSection />
//       <CategoryCarousel />
//       <LatestJobs />
//       <Footer />
//     </div>
//   )
// }

// export default Home