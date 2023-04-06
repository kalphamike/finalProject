import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Message({message, colorType, setOpenSnackbar, openSnackbar}) {
  
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpenSnackbar(false);
    };

    return (
        <>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={colorType} sx={{ width: '100%' }}>{message}</Alert>
        </Snackbar>
        </>
    );
}