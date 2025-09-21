import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import MapComponent from '../../MapComponents/MapComponent';
import DarkhasteKar from '../../DarkhasteKar';
export default function Planning() {
    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box sx={{ p: 3 }}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }
      
      TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
      };
      
      function a11yProps(index) {
        return {
          id: `full-width-tab-${index}`,
          'aria-controls': `full-width-tabpanel-${index}`,
        };
      }
  
    
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className='form-box' sx={{ bgcolor: 'background.paper', width: '100%', height:'80vh' }}>
    <Tabs  value={value} onChange={handleChange} aria-label="icon tabs example"   >
      <Tab sx={{fontFamily:'IRANSans'}} label='اطلاعات توصیفی'  icon={<PhoneIcon />} aria-label="phone" />
      <Tab sx={{fontFamily:'IRANSans'}} icon={<FavoriteIcon />} aria-label="favorite" />
      <Tab sx={{fontFamily:'IRANSans'}} icon={<PersonPinIcon />} aria-label="person" />
    </Tabs>
          <TabPanel  value={value} index={0} >
          <DarkhasteKar></DarkhasteKar>
        
        </TabPanel>
        <TabPanel  value={value} index={1}>
        <MapComponent ></MapComponent>
        </TabPanel>
        <TabPanel value={value} index={2} >
        <MapComponent ></MapComponent>
        </TabPanel>
      </Box>
  );
}