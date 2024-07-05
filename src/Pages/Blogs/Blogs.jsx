import React, { useEffect, useState } from 'react'
import BlogCard from '../../components/BlogCard/BlogCard'
import Navbar from '../../components/Navbar/Navbar'
import "./Blogs.css"
import { Pagination } from '@mui/material'
import supabase from '../../config/supabaseClient';


function Blogs() {
  const [blogs, setBlogs] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      
      const { data, error } = await supabase.from('blogs').select();
      if (error) {
        setError('Could not fetch the blogs');
        setBlogs(null);
        console.error(error);
      }

      if(data) {
        setBlogs(data);
        setError(null);
      }
    };
    fetchBlogs();
  }, [])

  return (
    <div className='page'>
    <Navbar />
    <div className="blogs__wrapper">
      {error && (<p>{error}</p>)}
      {blogs && blogs.length > 0 ? (
      blogs.map(blog => (
          <BlogCard key={blog.id} blog={blog} />
        ))
      ) : (
        <p>No blogs available!</p>
      )}
    </div>
    <Pagination className="pagination" count={10} variant="outlined" shape="rounded" sx={{display: 'flex', justifyContent: 'center'}}/>
    </div>
  )
}

export default Blogs