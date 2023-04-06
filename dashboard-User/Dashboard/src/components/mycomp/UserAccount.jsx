import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UserAccount = () => {
    const [user, setUser] = useState({ name: '', phone: '', email: '' });
    const [updating, setUpdating] = useState('');
    const [updating2, setUpdating2] = useState('');
    const [message, setMessage] = useState({ message: '', color: ''});
    const [open, setOpen] = React.useState(false);
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') { return }
      setOpen(false);
    };

    useEffect(() => {
        const email = localStorage.getItem('userEmail');

        axios.get(`http://localhost:5000/api/user/findByEmail?email=${email}`)
        .then(response => { 
            setUser(response.data)
            console.log(response.data);
        })
        .catch(error => console.log(error))
    },[])

    const handleInputs = ({currentTarget: input}) => {
        setUser({...user, [input.name]: input.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user.name) {
            setMessage({ message: 'Name is required', color: 'error'})
            return;
        } else if (!user.phone) {
            setMessage({ message: 'Phone is required', color: 'error'})
            return;
        } else if (!user.email) {
            setMessage({ message: 'Email is required', color: 'error'})
            return;
        } else {
            
            setUpdating('Birigukorwa ...');
            
            axios.put(`http://localhost:5000/api/user/update?id=${user._id}`, user)
            .then(response => {
                if (response.status === 201) {
                    setMessage({ message: response.data.message, color: 'success' });
                    setOpen(true);

                    localStorage.setItem('userName', user.name);
                    localStorage.setItem('userPhone', user.phone);
                    localStorage.setItem('userEmail', user.email);

                    setTimeout(() => {
                        setUpdating('');
                        setOpen(false);
                        window.location.reload();
                    }, 3000)
                }
            })
            .catch(error => console.log(error))
        }
    }

    const requestPasswordReset = (e) => {
        e.preventDefault();

        if (!user.email) {
            setMessage({ message: 'Email is required', color: 'error'})
            return;
        } else {
            setUpdating2('Birigusabwa ...');
            axios.post(`http://localhost:5000/api/user/requestPasswordReset`, {email: user.email, role: user.role})
            .then(response => {
                if (response.status === 201) {
                    setMessage({ message: response.data.message, color: 'success' });
                    setOpen(true);
                    setTimeout(() => {
                        setUpdating2('');
                        setOpen(false);
                        window.location.replace("/auth/signin");
                    }, 3000)
                }
            })
            .catch(error => console.log(error))
        }
    }

    return (
        <>
            {/* User information and update */}
            <form onSubmit={handleSubmit}>
                <p style={{ textAlign: 'center', padding: '0px' }}>Guhindura Umwirondoro</p>
                <hr style={{ marginBottom: '20px' }}/>
                <TextField size='small' sx={{ marginBottom: '15px'}} name="name" value={user.name} onChange={handleInputs} label="Name" />
                <TextField size='small' sx={{ marginBottom: '15px'}} name="phone" value={user.phone} onChange={handleInputs} label="Phone" />
                <TextField size='small' sx={{ marginBottom: '15px'}} name="email" value={user.email} onChange={handleInputs} label="Email address" />
                <Button type='submit' color='secondary' size='small' variant='contained'>{updating ? updating : "Update"}</Button>
            </form>

            {/* Password reset  */}
            <form onSubmit={requestPasswordReset}>    
                <p>Urashaka guhindura ijambo ry'ibanga?</p>
                <Button type='submit' color='success' sx={{color: 'white', marginTop: '5px'}} size='small' variant='contained'>{updating2 ? updating2 : "Saba guhindura"}</Button>
            </form>
            
            {/* Message display  */}
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={message.color} sx={{ width: '100%' }}>{message.message}</Alert>
                </Snackbar>
            </Stack>
        </>
    )
}

export default UserAccount
