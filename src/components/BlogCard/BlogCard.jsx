import React from 'react'
import { Button } from '@mui/material'
import "./BlogCard.css"
import { FaRegEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom'; 

/* eslint-disable react/prop-types */
function BlogCard({ blog }) {
    const shortDescription = blog.description.length > 100 ?
    blog.description.substring(0, 100) + "..." :
    blog.description;
    
  return (
    <div className='blog-card__wrapper'>
        {blog.imageSrc && blog.imageSrc.startsWith("https://") ? <div className="blog-card__image">
            <img src={blog.imageSrc} alt={blog.title} /></div> : <div className='blog-card__no-image'><p>No image available.</p></div>}
        
        <div className="blog_card__info-wrapper">
            <div className="blog-card__title">
                <h2>{blog.title}</h2>
            </div>
            <p className="blog-card__description">
                {shortDescription}
            </p>
            
            <Button component={Link} to={`/blogs/${blog.id}`} variant="contained">Read More</Button>
                
        </div>
    </div>
  )
}

export default BlogCard
