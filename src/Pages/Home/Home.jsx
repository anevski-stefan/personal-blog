import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import "./Home.css";
import { Button, InputAdornment, TextField } from '@mui/material';
import { FaArrowRight, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import supabase from '../../config/supabaseClient';
import BlogCard from '../../components/BlogCard/BlogCard';
import Footer from '../../components/Footer/Footer';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [latestBlog, setLatestBlog] = useState(null);
  const [newsletterMail, setNewsletterMail] = useState('');

  const stripHtml = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  useEffect(() => {
    const fetchLatestBlog = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error(error);
      } else {
        setLatestBlog(data[0]);
      }
    };

    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error(error);
      } else {
        setBlogs(data);
      }
    };

    fetchLatestBlog();
    fetchBlogs();
  }, []);

  const plainDescription = latestBlog ? stripHtml(latestBlog.description) : '';
  const shortDescription = plainDescription.length > 100 
    ? plainDescription.substring(0, 100) + "..." 
    : plainDescription;

  return (
    <>
      <Navbar />
      <div className="home__wrapper">
        <div className="main-blog">
          <div className="main-blog__image">
            {latestBlog && <img src={latestBlog.imageSrc} alt="img" />}
          </div>
          <div className="main-blog__content">
            <h1>{latestBlog ? latestBlog.title : ''}</h1>
            <p dangerouslySetInnerHTML={{ __html: shortDescription ? shortDescription : '' }}></p>
            {latestBlog && (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className='keep-reading-btn'
                component={Link}
                to={`/blogs/${latestBlog.id}`}
              >
                Keep Reading
              </Button>
            )}
            <div className="social-icons">
              <a href="#" className='social-icon'><FaYoutube /></a>
              <a href="#" className='social-icon'><FaTwitter /></a>
              <a href="#" className='social-icon'><FaInstagram /></a>
              <a href="#" className='social-icon'><FaFacebook /></a>
            </div>
          </div>
        </div>
        <div className="recent-blogs">
          <h2>Recent Blogs</h2>
          <div className="recent-blogs__wrapper">
            {blogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} className="recent-blogs__card" />
            ))}
          </div>
        </div>
        <div className="newsletter">
          <h2>Don&apos;t miss new blogs</h2>
          <h4>Subscribe to my newsletter</h4>
          <div className='newsletter-form'> 
            <TextField
                label="Your Newsletter Mail"
                name="newsletterMail"
                value={newsletterMail}
                onChange={(e) => setNewsletterMail(e.target.value)}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <div className='submit-btn'><a href="#"><FaArrowRight /></a></div>
                    </InputAdornment>
                  ),
                  style: { paddingRight: 0 } 
                }}
                sx={{
                  maxWidth: '400px', 
                  width: '100%', 
                  '& .MuiOutlinedInput-root': { borderRadius: '200px' } 
                }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
