import React from 'react'
import { Button } from '@mui/material'
import "./BlogCard.css"


function BlogCard() {
  return (
    <div className='blog-card__wrapper'>
        <div className="blog-card__image">
            <img src="https://placehold.co/600x400" alt="" />
        </div>
        <div className="blog_card__info-wrapper">
            <div className="blog-card__title">
                <h2>Blog title #1</h2>
            </div>
            <p className="blog-card__description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem sunt cum, exercitationem odio a veniam quidem ad expedita illo veritatis!
            </p>
            <Button variant="contained">Read More</Button>
        </div>
    </div>
  )
}

export default BlogCard