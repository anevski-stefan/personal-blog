import React, { useEffect, useState } from 'react';
import "./BlogCard.css";
import { Link } from 'react-router-dom';

/* eslint-disable react/prop-types */
function BlogCard({ blog }) {
  const [createdAt, setCreatedAt] = useState('');
  const plainDescription = stripHtml(blog.description);
  const shortDescription = plainDescription.length > 100 
    ? plainDescription.substring(0, 100) + "..." 
    : plainDescription;

    useEffect(() => {
      const formattedDate = new Date(blog.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      setCreatedAt(formattedDate); 
    }, [blog.created_at]);
  

  return (
    <Link to={`/blogs/${blog.id}`} className='link-wrapper'>
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
          <p className='createdAt'><b>Posted on: {createdAt}</b></p>
        </div>
      </div>
    </Link>
  );
}

const stripHtml = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

export default BlogCard;
