import React from 'react';
import { Fade } from '@mui/material';

const ShockTransition = React.forwardRef(function ShockTransition(props, ref) {
  return (
    <Fade
      
      ref={ref}
      {...props}
      onEntering={(node) => {
        node.style.transform = 'translateX(0)'; // Reset transform on entering
        node.classList.add('shock'); // Add shock class for animation
      }}
     /*  onExited={(node) => {
        node.classList.remove('shock'); // Remove shock class after exiting
      }} */
    />
  );
});

// CSS for the shock effect
const styles = `
@keyframes shock {
  0% { transform: translateX(0); }
  10% { transform: translateX(-10px); }
  15% { transform: translateX(10px); }
  20% { transform: translateY(-10px); }
  25% { transform: translateY(10px); }
  30% { transform: translateX(-10px); }
  35% { transform: translateX(10px); }
  40% { transform: translateY(-10px); }
  45% { transform: translateY(10px); }
  50% { transform: translateX(-10px); }
  55% { transform: translateX(10px); }
  60% { transform: translateY(-10px); }
  65% { transform: translateY(10px); }
  70% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
  80% { transform: translateY(-10px); }
  85% { transform: translateY(10px); }
  90% { transform: translateX(-10px); }
  95% { transform: translateX(10px); }
  100% { transform: translateX(0); }
}
.shock {
  animation: shock 0.6s ease-in-out;
}
`;

export { ShockTransition, styles };