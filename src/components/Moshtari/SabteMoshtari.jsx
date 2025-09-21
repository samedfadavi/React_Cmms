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
import Moshtari from '../../models/moshtari';
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
const SabteMoshtari = ({ open, onClose,onSubmit ,moshtari}) => {
  const classes = useStyles();
  useEffect(() => {
    if (moshtari) {
      setMoshtaridata(moshtari);
    }
  }, [moshtari]);

  const [moshtaridata, setMoshtaridata] = useState(moshtari);

 
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
    setMoshtaridata((prevPerson) => ({
        ...prevPerson,
        [name]: value, // Update the specific field based on input name
    }));
};
  const handleSubmit = (event) => {
    event.preventDefault();
    var result=0;
    event.preventDefault();
    var api;
    if(moshtaridata.Code_Moshtari==0)
      api=`${config.API_URL}/Tbl_Moshtari/Sabt`
    else
     api= `${config.API_URL}/Tbl_Moshtari/Edit`
    axios.post(api,moshtaridata, {
        
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
              
            <div className="form-group">
                    <label htmlFor="gender">نوع مشتری:</label>
                    <select className='custom-input2'
                        id="Noe_Moshtari"
                        name="Noe_Moshtari"
                        
                        defaultValue='1'
                        value={moshtaridata.Noe_Moshtari}
                        onChange={handleChangedata}
                    >
                        <option selected={true} value="1">حقیقی</option>
                        <option value="2">حقوقی</option>
                        <option value="3">سایر</option>
                    </select>
                </div>
            <div className="form-group">
                    <label htmlFor="age">شناسه/کد ملی:</label>
                    <input className='custom-input2'
                        type="number"
                        id="Shenase_Melli"
                        name="Shenase_Melli"
                        value={moshtaridata.Shenase_Melli}
                        alt='شناسه ملی'
                        onInvalid={handleInputValidation}
                        onInput={handleInputValidation} 
                        
                        onChange={handleChangedata}
                        required
                        
                    />
                </div>
      
                <div className="form-group">
                    <label htmlFor="name">کد پستی:</label>
                    <input className='custom-input2'
                        type="number"
                        id="Code_Posti"
                        name="Code_Posti"
                        value={moshtaridata.Code_Posti}
                        onChange={handleChangedata}
                        alt='کد پستی'
                      
                        onInvalid={handleInputValidation}
                        onInput={handleInputValidation} 
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">شماره ثبت:</label>
                    <input className='custom-input2'
                        type="number"
                        id="Shomare_Sabt"
                        name="Shomare_Sabt"
                          alt=' شماره ثبت'
                        onInvalid={handleInputValidation}
                        onInput={handleInputValidation} 
                        value={moshtaridata.Shomare_Sabt}
                        onChange={handleChangedata}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">نام:</label>
                    <input className='custom-input2'
                        type="text"
                        id="Name_Moshtari"
                        name="Name_Moshtari"
                        alt='نام مشتری'
                        onInvalid={handleInputValidation}
                        onInput={handleInputValidation} 
                        value={moshtaridata.Name_Moshtari}
                        onChange={handleChangedata}
                        required
                    />
                </div>
          
                <div className="form-group">
                    <label htmlFor="email">کد شعبه:</label>
                    <input className='custom-input2'
                        type="text"
                        id="Code_Shobe"
                        name="Code_Shobe"
                     
                        value={moshtaridata.Code_Shobe}
                        onChange={handleChangedata}
                        
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

export default SabteMoshtari;