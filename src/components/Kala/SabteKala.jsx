import React, { useState,useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { commondialogstyle } from '../../styles/DialogStyle';
import axios from 'axios';
import config from '../../config';
import Kala from '../../models/Kala';
import '../../assets/scss/SabteSorathesab.scss';
import { makeStyles } from '@mui/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });
const useStyles = makeStyles((theme) => ({
  cancelButton: {
    backgroundColor: '#f44336',
 
    color: '#fff',
    '&:hover': {
      backgroundColor: '#d32f2f',
    },
  },
  submitButton: {
    backgroundColor: '#4caf50',
   alignContent:'center',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#388e3c',
    },
  },
}));
const SabteKala = ({ open, onClose,onSubmit ,kala}) => {
  const classes = useStyles();
  useEffect(() => {
    if (kala) {
      setKaladata(kala);
    }
  }, [kala]);

  const [kaladata, setKaladata] = useState(kala);

 
  const handleInputValidation = (e) => {
    const { alt, validity } = e.target;
    if (validity.valueMissing) {
        e.target.setCustomValidity(` ${alt} را وارد کنید `);
    } else {
        e.target.setCustomValidity(''); // Reset custom message
    }
};
const handleChangedata = (e) => {
    const { name, value } = e.target;
    setKaladata((prevPerson) => ({
        ...prevPerson,
        [name]: value, // Update the specific field based on input name
    }));
};
  const handleSubmit = (event) => {
    event.preventDefault();
    var result=0;
    event.preventDefault();
    var api;
    if(kaladata.Code_Kala==0)
      api=`${config.API_URL}/Tbl_Kala/Sabt`
    else
     api= `${config.API_URL}/Tbl_Kala/Edit`
    axios.post(api,kaladata, {
        
        headers: {
            'Content-Type': 'application/json' // Specify the content type
        },
       
    })
    .then(response => {
        if (!response.status==200) {
           result=0;
        }
       
        return response.data; // Parse the JSON response
    })
    .then(data => {
        result=data;
        onSubmit(result);
    })
    .catch(error => {
        result=-1;
        onSubmit(result);
    });
    // Create an object to send back to the parent with form data
   

     // Call the parent function with form data
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
          onClick={onClose}
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
              
        
            <div className="form-group" style={{ gridColumn: '1/span 2'}}>
                    <label htmlFor="age"> نام کالا :</label>
                    <input className='custom-input2'
                        type="text"
                        id="Onvan"
                        name="Onvan"
                        value={kaladata.Onvan}
                        alt='شناسه ملی'
                        onInvalid={handleInputValidation}
                        onInput={handleInputValidation} 
                        
                        onChange={handleChangedata}
                        required
                        
                    />
                </div>
      
                <div className="form-group" style={{ gridColumn: '1/span 2'}}>
                    <label htmlFor="name">شناسه کالا:</label>
                    <input className='custom-input2'
                        type="number"
                        id="Shenase_Kala"
                        name="Shenase_Kala"
                        value={kaladata.Shenase_Kala}
                        onChange={handleChangedata}
                        alt='کد پستی'
                      
                        onInvalid={handleInputValidation}
                        onInput={handleInputValidation} 
                        required
                    />
                </div>
      
       
              
                <button  type="submit"  className="submit-button">ثبت</button>           
            </form>
           
       
      </DialogContent>
 {/*      <DialogActions  style={{alignSelf:'center'}}>
    
        <Button onClick={handleSubmit} className={classes.submitButton} style={{fontFamily:'IRANSans',paddingRight:'100px',textAlign:'center'}}  type="submit">
          ثبت
        </Button>
        <Button className="submit-button" onClick={onClose}  style={{fontFamily:'IRANSans',paddingRight:'100px'}}>
          انصراف
        </Button>
      </DialogActions> */}
    </Dialog>
  );
};

export default SabteKala;