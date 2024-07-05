import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar';
import "./EditBlog.css";
import { useNavigate, useParams } from 'react-router-dom';
import supabase from '../../config/supabaseClient';
import { toast } from 'react-toastify';

const EditBlog = () => {
  const {id} = useParams()
  const navigate = useNavigate();

  const [imageSrc, setImageSrc] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const {data, error} = await supabase
      .from('blogs')
      .select()
      .eq('id', id)
      .single();
    

    if(error) {
      console.error('Error inserting data:', error.message);
      toast.error(error.message);
      navigate('/', {replace: true});
    }

    if(data) {  
      setImageSrc(data.imageSrc);
      setTitle(data.title);
      setDescription(data.description);
    }
  }
    fetchBlogs();
  }, [id, navigate])

  const handleSubmit = async (event) => {
  event.preventDefault();

  if (!imageSrc || !title || !description) {
    setError('Please fill in all fields correctly!');
    return;
  }

  try {
    const { data, error } = await supabase
      .from('blogs')
      .update({ imageSrc, title, description })
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating blog:', error.message);
      setError('Failed to update blog. Please try again.');
      toast.error(error.message);
      return;
    }

    if (data) {
      setError(null);
      toast.success('The blog was sucessfully updated!')
      navigate('/blogs');
    }
  } catch (error) {
    console.error('Unhandled error:', error.message);
    toast.error(error.message)
    setError('An unexpected error occurred. Please try again.');
  }
};


  return (
    <>
      <Navbar/>
      <div className='form__wrapper'>
        <Paper elevation={3} style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
        <Typography variant="h5" gutterBottom>
            Edit Blog: <b>{title}</b>
        </Typography>
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    fullWidth
                    label="Image Source"
                    name="imageSrc"
                    value={imageSrc}
                    onChange={(e) => setImageSrc(e.target.value)}
                    variant="outlined"
                    required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    variant="outlined"
                    required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    variant="outlined"
                    multiline
                    rows={4}
                    required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                    Edit Blog
                    </Button>
                </Grid>
            </Grid>
            {error && <p className='error'>{error}</p>}
            </form>
        </Paper>
        </div>
    </>
  );
};

export default EditBlog;
