import React from 'react'
import Navbar from './Navbar'

const Home = () => {
    Navbar
  return (
    <div className='min-h-screen w-full'>
        <Navbar/>
        <h1 className='text-center text-4xl font-semibold mt-10'>Make your dream career a reality</h1>
        <h3 className='text-2xl text-center mt-5 font-semibold'>Trending on Internshala 🔥</h3>
        <div className='h-[60vh] w-full  flex items-center justify-center gap-10'>
           <div className='h-[35vh] w-[55vh] rounded-full'>
             <img className='h-full w-full object-cover' src="https://internshala.com/static/images/pgc_course_specific_banners/pgc_homepage_banner_new.png" alt="" />
           </div>
           <div className='h-[35vh] w-[55vh] rounded-full'>
           <img className='h-full w-full object-cover' src="https://internshala-uploads.internshala.com/banner-images/home_new/dual_ext_feb24-student.png.webp" alt="" />
           </div>
           <div className='h-[35vh] w-[55vh] rounded-full'>
           <img className='h-full w-full object-cover' src="https://internshala-uploads.internshala.com/banner-images/home_new/study_abroad_is-student.png.webp" alt="" />
           </div>
        </div>
    </div>
  )
}

export default Home