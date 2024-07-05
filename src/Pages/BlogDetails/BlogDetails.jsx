import React, { useEffect, useState } from 'react'
import supabase from '../../config/supabaseClient';
import { Link, useNavigate, useParams } from 'react-router-dom';
import "./BlogDetails.css";
import Navbar from '../../components/Navbar/Navbar';
import { Button } from '@mui/material';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const BlogDetails = () => {
    const {id} = useParams()
    const navigate = useNavigate();
    const [token, setToken] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [createdAt, setCreatedAt] = useState('');

    useEffect(() => {
      if(sessionStorage.getItem('token')){
        let data = JSON.parse(sessionStorage.getItem('token'))
        setToken(data)
      }
    }, [])
    
    useEffect(() => {
        const fetchBlog = async () => {
          const {data, error} = await supabase
          .from('blogs')
          .select()
          .eq('id', id)
          .single();
        
    
        if(error) {
            console.error('Error inserting data:', error.message);
            toast.error(error.message);
            navigate('/blogs', {replace: true});
        }
    
        if(data) {  
            setImageSrc(data.imageSrc);
            setTitle(data.title);
            setDescription(data.description);
            const formattedDate = new Date(data.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            });
            setCreatedAt(formattedDate);        
        }
      }
        fetchBlog();
      }, [id, navigate])


      const handleDelete = async() => {
        const {data, error} = await supabase 
        .from('blogs')
        .delete()
        .eq('id', id)
        .single()
        .select();

        if(error) {
          console.log(error);
          toast.error(error);
          return;
        }

        if(data) {
          toast.success('The blog was succesfully removed!');
          navigate('/blogs', { replace: true })
        }
      } 

  return (
    <>
    <Navbar />
        <div className='blog-details'>
            <img src={imageSrc} />
            <h1>{title}</h1>
            <p className='createdAt'>{createdAt}</p>
            <p>{description}</p>
            
            <div className='btns'>
              {token ? <Button component={Link} to={`/blogs/${id}/edit`} variant="outlined">
                <FaRegEdit /> Edit
              </Button> : ""}
              {token ? <Button component={Link} to={`/blogs/${id}`} variant="outlined" onClick={handleDelete} style={{ borderColor: 'red', color: 'red' }}>
              <FaRegTrashAlt /> Delete
              </Button> : ""}            
            </div>
        </div>
    </>
  )
}

export default BlogDetails