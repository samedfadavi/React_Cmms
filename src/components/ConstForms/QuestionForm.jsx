import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Slide from '@mui/material/Slide';
import { ShockTransition,styles } from '../Others/ShockTransition';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const QuestionForm = ({ open, onClose, onConfirm ,message}) => {
  return (
    <div>
    <style>{styles}</style> {/* Inject styles for shock animation */}
    <Dialog  style={{alignItems:'center'}} open={open} onClose={onClose}
    fullWidth
    // Use fullWidth to expand the dialog 
    // Set a maximum width (e.g., small)
    //hideBackdrop // Optional: this will hide the default backdrop
    disableScrollLock={true} 
    slots={{
      transition: ShockTransition,
    }}
    sx={{ backdropFilter: 'none', backgroundColor: 'transparent' }} // No gray background
    slotProps={{
     
        paper: {
          sx: {
            /* Border around the form box */
            borderRadius:'20px',
            padding: '15px',  /* Padding inside the form box */
            
            borderWidth:'50px',
          
           border: '2px solid #97210c',
            backgroundColor: '#ffff', /* Light gray background for the form box */
            boxShadow: '0 3px 10px white', /* Box shadow for some depth */
          },
        },
      }}
    >
            <DialogTitle sx={{ m: 0, p: 2 ,color: '#97210c'}} id="customized-dialog-title">
         
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            
            top: 8,
            color: theme.palette.error[500],
          })}
        >
          <CloseIcon />
        </IconButton>
      <DialogContent>
        <Typography   sx={{fontFamily:' IRANSans'}}>
          {message}
        </Typography>
      </DialogContent>
      <DialogActions style={{alignSelf:'center'                                           }}>
      <IconButton style={{alignSelf:'center',marginLeft:'40px'}} onClick={onConfirm}>
          <CheckCircleIcon sx={{ fontSize: 40,color: '#086d4f' }}></CheckCircleIcon>
        </IconButton>
        <IconButton style={{alignSelf:'center',marginLeft:'40px'}} onClick={onClose}>
          <CloseIcon sx={{ fontSize: 40 ,color: '#97210c'}}></CloseIcon>
        </IconButton>
       
       
      </DialogActions>
    </Dialog>
    </div>
  );
};

export default QuestionForm;