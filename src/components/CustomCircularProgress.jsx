import React from 'react';

import {
    Box,
    Button,
    Dialog,
    CircularProgress,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
  } from '@mui/material';
import { styled } from '@mui/system';
import lightMini from "@/assets/image/dima.png";
// Custom styles for the Circular Progress wrapper
const ProgressWrapper = styled(Box)({
    position: 'relative',
    display: 'inline-flex',
    perspective: '1000px'
});

// Custom Icon component with animation effect
const CustomIcon = styled('div')({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // Centering the icon
    fontSize: '2rem', // Adjust for your icon size
    color: '#1976d2', // Custom color for the icon
    animation: 'rotate3D 2s linear infinite', // 3D rotation animation
    transformStyle: 'preserve-3d', // Preserve 3D transformations

    '@keyframes rotate3D': {
        '0%': {
            transform: 'translate(-50%, -50%) rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
        },
        '100%': {
            transform: 'translate(-50%, -50%) rotateX(360deg) rotateY(360deg) rotateZ(360deg)',
        },
    },
});
const StyledDialog = styled(Dialog)({
    background: 'transparent', // Make background transparent
    boxShadow: '100 30px 10px transparent', // Remove shadow
    backdropFilter: 'blur(5px)', // Optional: add a blur effect to the background
});
const handleCloseDialog = () => {
   // Clear the data when closing the dialog
};
// Circular progress with a custom icon
const CustomCircularProgress = ({open, size = 80, thickness = 1 }) => {
    return (
        <StyledDialog open={open} onClose={handleCloseDialog}
       
        maxWidth={false} // Disable maxWidth to allow full screen
        PaperProps={{ style: {boxShadow:'none',  backgroundColor: 'transparent', overflow: 'hidden' } }}>
       
      
           <ProgressWrapper>
           <CircularProgress size={size} thickness={thickness} />
          <CustomIcon>  <img data-logo="mini-logo" style={{width:'50px',height:'50px'}} src={lightMini} alt="logo" /></CustomIcon> {/* Replace with your custom icon or component */}
      </ProgressWrapper>
      
        
    </StyledDialog>

    );
};
export default CustomCircularProgress;