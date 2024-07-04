import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar';
import "./AddBlog.css";
import supabase from '../../config/supabaseClient';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
      event.preventDefault();
    
      if (!imageSrc || !title || !description) {
        setError('Please fill in all fields correctly!');
        return;
      }
    
      try {
        const { data, error } = await supabase
          .from('blogs')
          .insert([{ imageSrc, title, description }])
          .select();
        
        if (error) {
          console.error('Error inserting data:', error.message);
          setError('Error inserting data. Please try again.');
        } else {
          console.log('Inserted data:', data);
          setError(null);
          navigate('/blogs');
        }
      } catch (error) {
        console.error('Unhandled error:', error.message);
        setError('An unexpected error occurred. Please try again later.');
      }
    };
    

  return (
    <>
      <Navbar/>
      <div className='form__wrapper'>
        <Paper elevation={3} style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
        <Typography variant="h5" gutterBottom>
            Create Blog
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
                    Create Blog
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

export default AddBlog;