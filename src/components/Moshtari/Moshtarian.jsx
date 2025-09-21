import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import { DataGrid , GridColumnMenu ,useGridApiContext } from '@mui/x-data-grid';
import MenuItem from '@mui/material/MenuItem';
import config from '../../config'; // Adjust the path as necessary
import SabteMoshtari from './SabteMoshtari';
import Moshtari from '../../models/moshtari';
import { CircularProgress, Grid} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import QuestionForm from '../ConstForms/QuestionForm';
import { commongridstyle } from '../../styles/GridStyle';
import '@/assets/scss/variable.scss'
function CustomFilterItem(props) {
    const { onClick, colDef } = props;
    const apiRef = useGridApiContext();
 
    const handleClick = React.useCallback(
      (event) => {
        apiRef.current.showFilterPanel(colDef.field);
        onClick(event);
      },
      [apiRef, colDef.field, onClick],
    );
    return (
      <MenuItem onClick={handleClick}>
        <ListItemIcon>
          <IconFilter fontSize="small" />
        </ListItemIcon>
        <ListItemText>فیلتر </ListItemText>
      </MenuItem>
    );
  }

  function CustomColumnMenu(props) {
    return (
      <GridColumnMenu
        {...props}
        slots={{
          // Override slot for `columnMenuFilterItem`
          columnMenuFilterItem: CustomFilterItem,
        }}
      />
    );
  }
const Moshtarian = () => {
  
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false); // State to control dialog visibility
  const [opendelete, setOpenDelete] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [opensnack1, setOpenSnack1] = React.useState(false);
  const [opensnack2, setOpenSnack2] = React.useState(false);
  const handleCloseSnack2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack2(false);
  };

  const handleCloseSnack1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack1(false);
  };
  const handleFormSubmit = (formData) => {
    console.log('Data received from DialogForm:', formData); // Log received data
    // You can store the received data in state if necessary
   
    setSubmitted(!submitted); // Optional: setting submitted state
    handleClose(); // Close dialog after submission
    if(parseInt(formData)>=1)
    {
      setOpenSnack1(true);
    }
    else
    setOpenSnack2(true);
  };
  const handleOpen = () => {
    setMoshtaridata(new Moshtari());
    setOpen(true); // Open the dialog
  };

  const handleClose = () => {
    
    setOpen(false); // Close the dialog
  };
  const handleRowClick = (row) => {
    setMoshtaridata(row); // Set the selected row data to edit
    setOpen(true); // Open the dialog
  };
  const handleDeleteQuestion = () => {
   var result=0;
    axios.post(`${config.API_URL}/Tbl_Moshtari/Delete`,moshtaridata, {
        
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
        if(parseInt(data)>=1)
        {
           setSubmitted(!submitted);
           setOpenSnack1(true);
        }
        else
        setOpenSnack2(true);
       
    })
    .catch(error => {
        result=-1;
        setOpenSnack2(true);
    });
     // Optional: setting submitted state
    handleCloseDelete(); // Close dialog after submission
  };


  const handleCloseDelete = () => {
    
    setOpenDelete(false); // Close the dialog
  };
  const handleRowClickDelete = (row) => {
    setMoshtaridata(row); // Set the selected row data to edit
    setOpenDelete(true); // Open the dialog
  };
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
 
    const [moshtaridata, setMoshtaridata] = useState(new Moshtari());
    // Define columns for the DataGrid
const sabtdialog= useRef();
    const columns = [
      {
        field: 'action',
        headerAlign: 'center',
        headerName: 'عملیات',
        headerClassName: 'custom-header',
        width: 100,
        renderCell: (params) => (
          <div >
            
            <i class="fa-solid fa-user-pen fa-lg " title='ویرایش' onClick={() => handleRowClick(params.row)} style={{color: 'var(--common-control-backcolor)',padding:'10px'}}></i>
            <i class="fa-solid fa-user-xmark fa-lg" title='حذف' onClick={() => handleRowClickDelete(params.row)} style={{color: '#97210c' ,padding:'10px'}}></i>
          </div>
          
        ),
      },
        { field: 'Code_Moshtari', headerName: 'کد', width: 90 , headerClassName: 'custom-header', hide: true,},
     
        { field: 'Name_Moshtari', headerName: ' نام مشتری', width: 260 ,headerClassName: 'custom-header', cellClassName: 'custom-cell', headerAlign: 'center',        renderCell: (params) => {
          return convertToPersianNumerals(params.value);
      },},
      { field: 'Code_Eghresadi',  headerName: ' کد اقتصادی', width: 160 ,headerClassName: 'custom-header', cellClassName: 'custom-cell', headerAlign: 'center',        renderCell: (params) => {
        return convertToPersianNumerals(params.value);
    },},
        { field: 'Shenase_Melli', headerName: ' شناسه ملی', width: 190 ,headerClassName: 'custom-header', cellClassName: 'custom-cell',headerAlign: 'center',renderCell: (params) => {
          return convertToPersianNumerals(params.value);
      }},
        { field: 'Shomare_Sabt', headerName: 'شماره ثبت', width: 120 ,headerClassName: 'custom-header', cellClassName: 'custom-cell', headerAlign: 'center',renderCell: (params) => {
          return convertToPersianNumerals(params.value);
      }},
        { field: 'Code_Posti', headerName: ' کد پستی ', width: 120 ,headerClassName: 'custom-header', cellClassName: 'custom-cell',renderCell: (params) => {
          return convertToPersianNumerals(params.value);
      }},
        { field: 'Address', headerName: 'آدرس', width: 250 ,hide:true, headerAlign: 'center',headerClassName: 'custom-header', cellClassName: 'custom-cell',        renderCell: (params) => {
          return convertToPersianNumerals(params.value);
      },},
      { field: 'Code_Shobe', headerName: 'کد شعبه', width: 150 ,hide:true, headerAlign: 'center',headerClassName: 'custom-header', cellClassName: 'custom-cell',        renderCell: (params) => {
        return convertToPersianNumerals(params.value);
    },},
    ];
    const convertToPersianNumerals = (number) => {
      const persianNumerals = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
      return number.toString().split('').map(digit => persianNumerals[digit] || digit).join('');
  };
 
    // Fetch data from server
    useEffect(() => {
        const fetchData = async () => {
            try {
     
                //const query="http://localhost:800/api/ViewPardakhtMNs/List_Sorathesab?datefrom="+datefrom+"&dateto="+dateto;
                const query=`${config.API_URL}/Tbl_Moshtari/List_Moshtari`;
                
                const response = await axios.get(query);
                
                
                const formattedData = response.data.map(moshtari => ({
                   Code_Moshtari:moshtari.Code_Moshtari,
                   Name_Moshtari:moshtari.Name_Moshtari,
                    Code_Eghresadi:moshtari.Code_Eghresadi,
                    Shenase_Melli: moshtari.Shenase_Melli,
                    Shomare_Sabt: moshtari.Shomare_Sabt,
                    Code_Posti: moshtari.Code_Posti,
                    Code_Shobe:moshtari.Code_Shobe,
                     Address:moshtari.Address
                }));
                
                setRows(formattedData);
            } catch (err) {
                setError(query);
            } finally {
                setLoading(false);
            }
        };

        fetchData(); // Invoke fetchData function
    },[submitted] ); // Empty dependency array means this effect runs once after the initial render

    if (loading) {
        return (
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <CircularProgress />
            </Grid>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div  style={{ height: '100%', width: '100%' }}>
<i   class={`${isHovered ? 'fa-solid fa-user-plus fa-fade fa-2xl' : 'fa-solid fa-user-plus  fa-2xl'}`}       onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}    title='ثبت مشتری' onClick={handleOpen} style={{color: 'var(--common-control-backcolor)' , paddingBottom:'30px'}}></i>
            <DataGrid rowHeight={35}   rows={rows}  style={{fontFamily:'IRANSans', textAlign:'center'} }   initialState={{
    columns: {
      columnVisibilityModel: {
        // Hide columns id  the other columns will remain visible
        Code_Moshtari: false,
       
      },
    },
  }}

  sx={commongridstyle}
       getRowId={(row) => row.Code_Moshtari} columns={columns} pageSize={50} rowsPerPageOptions={[100]} />
   <SabteMoshtari   open={open} onClose={handleClose} moshtari={moshtaridata} onSubmit={handleFormSubmit} />
        <QuestionForm open={opendelete} onClose={handleCloseDelete} onConfirm={handleDeleteQuestion} message={'اطلاعات مشتری  حذف شود؟'}></QuestionForm>
        <Snackbar sx={{direction:'ltr'}} open={opensnack1} autoHideDuration={4000} onClose={handleCloseSnack1}>
        <Alert
          onClose={handleCloseSnack1}
          severity="success"
          variant="filled"
          sx={{ width: '100%',fontFamily:' IRANSans' }}
        >
          تغییرات با موفقیت انجام شد
        </Alert>
      </Snackbar>
      <Snackbar sx={{direction:'ltr'}} open={opensnack2} autoHideDuration={4000} onClose={handleCloseSnack2}>
        <Alert
          onClose={handleCloseSnack2}
          severity="error"
          variant="filled"
          sx={{ width: '100%',fontFamily:' IRANSans' }}
        >
          انجام تغییرات با خطا مواجه شد
        </Alert>
      </Snackbar>
        </div>
    );
};

export default Moshtarian;