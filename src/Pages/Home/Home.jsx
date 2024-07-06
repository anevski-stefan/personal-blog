import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import "./Home.css";
import { Button, InputAdornment, TextField } from '@mui/material';
import { FaArrowRight, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import supabase from '../../config/supabaseClient';
import BlogCard from '../../components/BlogCard/BlogCard';
import Footer from '../../components/Footer/Footer';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [newsletterMail, setNewsletterMail] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .limit(5);

      if (error) {
        console.error(error);
      } else {
        setBlogs(data);
      }
    };

    fetchBlogs();
  }, []);


  return (
    <>
        <Navbar />
          <div className="home__wrapper">
            <div className="main-blog">
              <div className="main-blog__image">
                <img src="https://placehold.co/600x400" alt="img" />
              </div>
              <div className="main-blog__content">
                <h1>Memories from last summer</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore pariatur ducimus consectetur quis expedita voluptate corrupti ipsa, fugit ea quo?</p>
                <Button type="submit" variant="contained" color="primary" className='keep-reading-btn'>
                  Keep Reading
                </Button>
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
        <Footer/>
    </>
  )
}

export default Home