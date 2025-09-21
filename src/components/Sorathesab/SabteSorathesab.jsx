import React, { useState,useEffect } from 'react';
import '@/assets/scss/SabteSorathesab.scss'; // Ensure you have this CSS file for styling
import  DatePicker,{ DateObject } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import persian_en from "react-date-object/locales/persian_en"
import transition from "react-element-popper/animations/transition"
import Sorathesabkala from '../../models/Sorathesabkala';
import axios from 'axios';
import config from '../../config';
import Autocomplete from '@mui/material/Autocomplete';

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
import { commonaoutcompletestyle } from '../../styles/AoutCompleteStyle';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });
const SabteSorathesab = ({ open, onClose,onSubmit ,sorathesabkala}) => {
  const [error, setError] = useState([false,false]); 
  const handleError = (index, isError) => {
    setError(prevArray => {
        const newArray = [...prevArray];
        newArray[index] = isError;
        return newArray;
    });
};


    if(sorathesabkala==null)
      sorathesabkala=new Sorathesabkala();
      const [sorathesabdata, setSorathesabdata] = useState(sorathesabkala);
      const [datevalues, setdateValues] = useState(
      
        new DateObject({date:sorathesabkala.Tarikh, calendar: persian, locale: persian_en })
        //: new DateObject({ calendar: persian, locale: persian_fa })
    
       
       
      );
  
      useEffect(() => {
        if (sorathesabkala) {
          setSorathesabdata(sorathesabkala);
          setdateValues( new DateObject({date:sorathesabkala.Tarikh, calendar: persian, locale: persian_en }));
          handleError(0, false);
          handleError(1, false);
        }
      }, [sorathesabkala]);
   
    const [options, setOptions] = useState([]);
 
    const [optionskala, setOptionskala] = useState([]);
    const [moshtaridata, setMoshtaridata] = useState('');
    const [kaladata, setKaladata] = useState('');

    useEffect(() => {
      const fetchData = async (url, setData) => {
          try {
              const response = await axios.get(url);
              setData(response.data);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      fetchData(`${config.API_URL}/Tbl_Moshtari/List_Moshtari`, setOptions);
      fetchData(`${config.API_URL}/Tbl_Kala/List_Kala`, setOptionskala);
  }, []);
   

 
      const sabtedata = async (e) => {
        e.preventDefault();
        sorathesabdata.Tarikh = datevalues.convert(persian, persian_en)?.format?.("YYYY/MM/DD");

        if (!sorathesabdata.Code_Kala || !sorathesabdata.Code_Moshtari) {
            handleError(0, !sorathesabdata.Code_Kala);
            handleError(1, !sorathesabdata.Code_Moshtari);
            return;
        }

        const api = sorathesabdata.ID_Sorathesab === 0 
            ? `${config.API_URL}/Tbl_Sorathesab/Sabt` 
            : `${config.API_URL}/Tbl_Sorathesab/Edit`;

        try {
            const response = await axios.post(api, sorathesabdata, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 200) {
                onSubmit(response.data);
            }
        } catch (error) {
            console.error('Error saving data:', error);
            onSubmit(-1);
        }
    };

    const handleChangedata = (e) => {
        const { name, value } = e.target;
        setSorathesabdata((prevPerson) => ({
            ...prevPerson,
            [name]: value, // Update the specific field based on input name
        }));
    };
    const handleSelectionChange = (setter, index) => (event, newValue) => {
      setter(newValue);
      handleError(index, false);
  };


    const handleInputValidation = (e) => {
        const { alt, validity } = e.target;
        if (validity.valueMissing ) {
            e.target.setCustomValidity(` ${alt} را وارد کنید `);
        }
        else if(e.target.value==='0') {
          e.target.setCustomValidity(` ${alt} نمی تواند صفر باشد   `);
           }
        else {
            e.target.setCustomValidity(''); // Reset custom message
        }
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
      
           
            <form onSubmit={sabtedata} className="form-grid">
              
         
            <div className="form-group">
                    <label htmlFor="age">کالا:</label>
                    <Autocomplete  style={{borderWidth:'0px'}} 
                    
      options={optionskala}
      onChange={handleSelectionChange((newValue) => setSorathesabdata({ ...sorathesabdata, Code_Kala: newValue.Code_Kala }), 0)}
      defaultValue={optionskala.find(s=> s.Code_Kala===sorathesabkala.Code_Kala)}
      getOptionLabel={(option) => option.Onvan || option} // Assuming each option has a 'label' property
      onInputChange={(event, newInputValue) => {
        setKaladata(newInputValue);
      }}
      renderOption={(props, option) => (
        <li 
          {...props}
          style={{
            fontFamily: 'IRANSans', // Set your desired font family
       
          }}
        >
          {option.Onvan || option} {/* Render the option */}
        </li>
      )}
      renderInput={(params) => (
        <TextField   sx={commonaoutcompletestyle}  {...params}
        label="انتخاب کنید"
                    
        error={error[0]} // Set error state for the TextField
        helperText={error[0] ? " لطفا یک آیتم را انتخاب کنید." : ""}
        />
      )}
      // You can add more properties to customize the Autocomplete as needed
    />
                </div>
      
                <div className="form-group">
                    <label htmlFor="gender"> مشتری:</label>
                    <Autocomplete  style={{borderWidth:'0px'}} 
                    
                    options={options}
                   defaultValue={options.find(s=> s.Code_Moshtari===sorathesabkala.Code_Moshtari)}
                   onChange={handleSelectionChange((newValue) => setSorathesabdata({ ...sorathesabdata, Code_Moshtari: newValue.Code_Moshtari }), 1)}
                    getOptionLabel={(option) => option.Name_Moshtari || option} // Assuming each option has a 'label' property
                    onInputChange={(event, newInputValue) => {
                      setMoshtaridata(newInputValue);
                    }}
                    renderOption={(props, option) => (
                      <li 
                        {...props}
                        style={{
                          fontFamily: 'IRANSans', // Set your desired font family
                     
                        }}
                      >
                        {option.Name_Moshtari || option} {/* Render the option */}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField   sx={commonaoutcompletestyle}  {...params} 
                    
                      label="انتخاب کنید"
                    
                      error={error.at(1)} // Set error state for the TextField
                      helperText={error.at(1) ? " لطفا یک آیتم را انتخاب کنید." : ""}
                      />
                    )}
                    // You can add more properties to customize the Autocomplete as needed
                  />
                </div>
            
                <div className="form-group">
                    <label htmlFor="name"> تاریخ صورتحساب :</label>
                    <DatePicker style={{width:'100%'}}
  locale={persian_fa}
  calendar={persian}
  onChange={setdateValues}
 
  value={datevalues}
  inputClass='custom-input2'
 
  
  calendarPosition='bottom-right'
  // onChange={array => { //Array of Dateobjecs
  //   alert("selected dates :\n" + array.join(",\n"))
  // }}
  animations={[
    transition({
      from: 35,
      transition: "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)",
    }),
  ]}  
  ></DatePicker>
                </div>
                <div className="form-group" >
                    <label htmlFor="email">مبلغ به ریال:</label>
                    <input className='custom-input2'
                        type="number"
                        id="Mablagh"
                        name="Mablagh"
                        min='1'
                        alt='مبلغ'
                        onInvalid={handleInputValidation}
                        onInput={handleInputValidation} 
                        value={sorathesabdata.Mablagh}
                        onChange={handleChangedata}
                        required
                    />
                </div>
                <div className="form-group" style={{ gridColumn: '1/span 2'}}  >
                    <label htmlFor="email"> توضیحات :</label>
                    <input className='custom-input2' 
                        type="text"
                        id="Tozihat"
                        name="Tozihat"
                        alt='توضیحات'
                        onInvalid={handleInputValidation}
                        onInput={handleInputValidation} 
                        value={sorathesabdata.Tozihat}
                        onChange={handleChangedata}
                      
                    />
                </div>
                
                <button type="submit"  className="submit-button">ثبت</button>
            </form>
           
        
        </DialogContent>
    </Dialog>

    );
};

export default SabteSorathesab;