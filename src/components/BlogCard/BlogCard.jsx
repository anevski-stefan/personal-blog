import React from 'react';
import { Button } from '@mui/material';
import "./BlogCard.css";
import { Link } from 'react-router-dom'; 

/* eslint-disable react/prop-types */
function BlogCard({ blog }) {
  const plainDescription = stripHtml(blog.description);
  const shortDescription = plainDescription.length > 100 
    ? plainDescription.substring(0, 100) + "..." 
    : plainDescription;

  return (
    <div className='blog-card__wrapper'>
      {blog.imageSrc && blog.imageSrc.startsWith("https://") 
        ? <div className="blog-card__image">
            <img src={blog.imageSrc} alt={blog.title} />
          </div> 
        : <div className='blog-card__no-image'>
            <p>No image available.</p>
          </div>
      }
      
      <div className="blog_card__info-wrapper">
        <div className="blog-card__title">
          <h2>{blog.title}</h2>
        </div>
        <p className="blog-card__description" dangerouslySetInnerHTML={{__html: shortDescription}}></p>
        
        <div className="btns">
          <Button component={Link} to={`/blogs/${blog.id}`} variant="contained" className='read-more'>Read More</Button>
        </div>
      </div>
    </div>
  );
}

const stripHtml = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

export default BlogCard;
