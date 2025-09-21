import { styled } from '@mui/system';
import { IconButton} from '@mui/material';
export const CustomButton = styled(IconButton)(({ theme }) => ({
    marginBottom:10,
  
   // borderRadius: '50%',          // Make it circular
    border: '2px solid white',  
    display: 'flex',              // Center the content
    alignItems: 'center',         // Center vertically
    justifyContent: 'center',      // Center horizontally
    background: `linear-gradient(145deg,white, var(--common-control-backcolor))`, // Gradient for 3D effect
    boxShadow: `10px 10px 20px  rgba(0, 0, 0, 0.3), -10px -10px 20px rgba(255, 255, 255, 0.8)`, // Enhanced shadow effect
    //boxShadow: `0 0 0 2px white, 0 4px 10px rgba(0, 0, 0, 0.9)`, // Outer white border + shadow
    color: 'white',               // Icon color
    transition: 'all 0.3s ease',  // Smooth transitions

    // Hover effect
    '&:hover': {
        transform: 'translateY(-5px)', // Simulate lift on hover
        boxShadow: `12px 12px 25px rgba(0, 0, 0, 0.4), -12px -12px 25px rgba(255, 255, 255, 1)`, // Deeper shadows on hover
    },
    '&:active': {
        transform: 'translateY(2px)', // Simulate pressing down
        boxShadow: `5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.7)`, // Lighter on active press
    },
}));