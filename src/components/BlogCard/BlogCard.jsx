import React from 'react'
import { Button } from '@mui/material'
import "./BlogCard.css"

/* eslint-disable react/prop-types */
function BlogCard({ blog }) {
  return (
    <div className='blog-card__wrapper'>
        <div className="blog-card__image">
            <img src={blog.imageSrc} alt={blog.title} />
        </div>
        <div className="blog_card__info-wrapper">
            <div className="blog-card__title">
                <h2>{blog.title}</h2>
            </div>
            <p className="blog-card__description">
                {blog.description.substring(0, 100)}...
            </p>
            <Button variant="contained">Read More</Button>
        </div>
    </div>
  )
}

export default BlogCard
