import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
export const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: `rgb(255, 255, 190)`,
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
    },
    [`& .${tooltipClasses.tooltip}`]: {
        background: `linear-gradient(145deg, rgb(255, 255, 190), white)`,
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        fontFamily:'var(--common-font)',
        border: '1px solid #dadde9',
        borderRadius: 10,
        boxShadow: `10px 10px 20px rgba(0, 0, 0, 0.3), -10px -10px 20px rgba(255, 255, 255, 0.8)`,
        opacity: 0, // Start with opacity 0
        transform: 'translateY(100px)', // Start slightly below the button
        transition: 'opacity 0.3s ease, transform 0.3s ease', // Add transition for opacity and transform
        willChange: 'opacity, transform', // Enhance performance
    },
    // Add this rule for showing the tooltip
    [`&:hover .${tooltipClasses.tooltip}`]: {
        opacity: 1, // Fade in opacity
        transform: 'translateY(0)', // Move to original position
    },
}));