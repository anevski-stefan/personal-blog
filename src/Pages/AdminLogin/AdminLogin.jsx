import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import "./AdminLogin.css";
import supabase from '../../config/supabaseClient';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({setToken}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
     
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });
            if (error) {
                console.error('Error logging in:', error.message);
            } else {
                if (data) {
                    console.log('Logged in successfully:', data);
                    setToken(data);
                    navigate('/')
                } else {
                    console.error('User object is undefined.');
                }
            }
        } catch (error) {
            console.error('Unhandled error:', error.message);
        }
    };
    

    return (
        <div className="admin-panel__wrapper">
            <Paper elevation={3} style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
                <Typography variant="h5" gutterBottom>
                    Welcome to the admin panel
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                variant="outlined"
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type="password"
                                label="Password"
                                name="password"
                                variant="outlined"
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    );
};

export default AdminLogin;
