import React from 'react'
import BlogCard from '../../components/BlogCard/BlogCard'
import Navbar from '../../components/Navbar/Navbar'
import "./Blogs.css"
import { Pagination } from '@mui/material'

function Blogs() {
  return (
    <div className='page'>
    <Navbar />
    <div className="blogs__wrapper">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
    </div>
    <Pagination count={10} variant="outlined" shape="rounded" sx={{display: 'flex', justifyContent: 'center'}}/>
    </div>
  )
}

export default Blogs