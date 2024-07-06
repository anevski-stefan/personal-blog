import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import "./AdminLogin.css";
import supabase from '../../config/supabaseClient';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { toast } from 'react-toastify';
import Footer from '../../components/Footer/Footer';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);

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
                setError(error.message);
            } else {
                console.log('Logged in successfully:', data);
                setError(null);
                sessionStorage.setItem('token', JSON.stringify(data));
                toast.success("Logged in successfully");
                navigate('/blogs', { state: { successMessage: 'Logged in successfully!' } });
            }
        } catch (error) {
            console.error('Unhandled error:', error.message);
            setError(error);
        }
    };
    

    return (
        <>
        <Navbar />
        <div className="admin-panel__wrapper">
            <div style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
                <Typography variant="h5" gutterBottom>
                    Log in
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
                {error && (<p className="error-message">{error}</p>)}
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default AdminLogin;
