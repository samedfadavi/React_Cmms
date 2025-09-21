import React from 'react';
import { Step, StepLabel } from '@mui/material';

const CustomStep = ({ active, completed, label, icon }) => {
    return (
        <Step active={active} completed={completed}>
            <StepLabel
                icon={icon}
            >
                {label}
            </StepLabel>
        </Step>
    );
};

export default CustomStep;