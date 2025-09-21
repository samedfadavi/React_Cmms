import React, { useState,useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios'; // Import axios for HTTP requests
import config from '@/config';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { commondialogstyle } from '@/styles/DialogStyle';
import '@/assets/scss/SabteSorathesab.scss';
import { makeStyles } from '@mui/styles';
import { commonaoutcompletestyle } from '@/styles/AoutCompleteStyle';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

const SearchIradData = ({ open, onClose,onSubmit ,title,onvantajhiz,defaultitems,keyfiled,ID}) => {
  const [iraddata, setiradData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
     
        const response = axios.get(`${config.API_URL}/Derakht_Tajhizat/List_Iradat_Noe_Tajhiz?ID_Tajhiz=${ID}`)
        .then((response) => {
          setiradData(response.data);  // Set data from response
  
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      })
      .finally(() => {
   
      });
       
    };

    fetchData();
  }, [ID]); 
  const [selectedValue, setSelectedValue] = useState(null);

  const handleValueChange = (event, value) => {
      setSelectedValue(value); // Update the state with the selected value
  
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(selectedValue);
 
 
  };

  return (
    <Dialog className='form-box' style={{alignItems:'center'}}  open={open} onClose={onClose}
    fullWidth // Use fullWidth to expand the dialog 
    // Set a maximum width (e.g., small)
    //hideBackdrop // Optional: this will hide the default backdrop
    slotProps={commondialogstyle}
    sx={{ backdropFilter: 'none', backgroundColor: 'transparent' }} // No gray background
    slots={{
        transition: Transition,
      }}
  
    >
       
        <IconButton
          aria-label="close"
          onClick={handleSubmit}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.warning[500],
          })}
        >
          <CloseIcon />
        </IconButton>
      <DialogContent>
      
            
            <form onSubmit={handleSubmit} className="form-grid">
          
                    <label htmlFor="gender"></label>
     
                    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      onClose={handleSubmit}
      onChange={handleValueChange} 
      options={iraddata}
      defaultValue={iraddata.filter(item => { return defaultitems.split(',').includes(String(item[keyfiled]));})}
      disableCloseOnSelect
      getOptionLabel={(option) => option['onvan_irad']}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li style={{ fontFamily: 'IRANSans'}} key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option['onvan_irad']}
          </li>
        );
      }}
      style={{ width: 500 ,fontFamily: 'IRANSans'}}
      renderInput={(params) => (
        
        <TextField {...params}  sx={commonaoutcompletestyle} label={onvantajhiz} placeholder="انتخاب کنید" />
      )}
    />
                    
            </form>
           
       
      </DialogContent>

    </Dialog>
  );
};

export default SearchIradData;