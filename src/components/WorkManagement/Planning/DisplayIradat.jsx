import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Checkbox  from '@mui/material/Checkbox';
import { DataGridPro , GridColumnMenu ,useGridApiContext } from '@mui/x-data-grid-pro';
import MenuItem from '@mui/material/MenuItem';
import config from '@/config'; // Adjust the path as necessary
import SabteMoshtari from '@/components/Moshtari/SabteMoshtari';
import Moshtari from '@/models/moshtari';
import {  Button, CircularProgress, Grid, IconButton} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import QuestionForm from '@/components/ConstForms/QuestionForm';
import { commongridstyle } from '@/styles/GridStyle';
import '@/assets/scss/variable.scss'
import { findNodeById,findParentById } from '@/jeneralscripts';
import CustomCircularProgress from '@/components/CustomCircularProgress';
import Tooltip from '@mui/material/Tooltip';
import Icon from '@mui/material/Icon';
import Stack from '@mui/material/Stack';
import { CustomButton } from '@/CustomControls/CustomButton';
import Zoom from '@mui/material/Zoom';
import { CustomTooltip } from '../../../CustomControls/CustomTooltip';


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
const DisplayIradat = ({ nodesData, checkedNodes,getSelectedRows }) => {
    const idKey = 'ID'; // Specify the key for ID
  const parentIdKey = 'Parent_tajhiz'; // Specify the key for Parent ID
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false); // State to control dialog visibility
  const [opendelete, setOpenDelete] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [opensnack1, setOpenSnack1] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const [opensnack2, setOpenSnack2] = React.useState(false);
  const [selectedTajhiz,setSelectedTajhiz]=useState([]);
  const [openprogress, setOpenprogress] = useState(false);
  const [rows, setRows] = useState([]);
  const [childData, setChildData] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [moshtaridata, setMoshtaridata] = useState(new Moshtari());
const sabtdialog= useRef();
const [selectedRows, setSelectedRows] = useState([]);
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
  const setSearchExpression =(tajhiz) =>
  {
    let searchstr=`  where ${tajhiz.Field_Rabet} in ( `;
    let parentid=tajhiz[idKey];
    let where='';
    let endwhere=''
   // window.alert(searchstr);
   do{
      parentid=  findParentById(nodesData,String(parentid),0,idKey);
     const tajhiz2=findNodeById(nodesData,String(parentid),idKey);
      where=tajhiz2.where;
     if(tajhiz2.Code_No_DerakhtTajhizat>1 || tajhiz2.Name_Jadval_Pm=='tbl_Omoor')
     { 
     searchstr+= `select ${tajhiz2.Code_Pm} from ${tajhiz2.Name_Jadval_Pm}`;
     if(tajhiz2.where!='')
     {
        if(tajhiz2.where.includes('where'))
        searchstr+= ` ${where}`;
        else
       searchstr+= ` where ${tajhiz2.Code_Pm} in(${where})`;
     }
     else
       searchstr+= ` where ${tajhiz2.Field_Rabet} in (`;
     endwhere+=')';
     }
      
   } while(parentid>0 && where==='');
   searchstr+=endwhere;

    return searchstr;
   }
  const searchAndDisplay = () => {
     var error=false;
    //setMoshtaridata(new Moshtari());
    //setOpen(true); // Open the dialog
    let newSelectedTajhiz = [];
    if(checkedNodes==null || checkedNodes.length==0)
    {
        setErrorText('هیچ تجهیزی انتخاب نشده است');
        setOpenSnack2(true);
        return;
    }
    checkedNodes.forEach((row) => {
        const tajhiz= findNodeById(nodesData,row,idKey);
        if (tajhiz.Bazdid === 1) {
           
          if(tajhiz.where==='')
          {
           tajhiz.where=setSearchExpression(tajhiz);
        
          }
          newSelectedTajhiz.push(tajhiz);
/*           setSelectedTajhiz((prevItems) => {
            // Check if an item with the same id exists
            const existingItemIndex = prevItems.findIndex(item => item[idKey] === tajhiz[idKey]);
    
            // If it exists, replace the item
            if (existingItemIndex > -1) {
              // Create a new array with the item replaced
              return prevItems.map((object, index) =>
                index === existingItemIndex ? tajhiz : object
              );
            } else {
              // If it does not exist, add the new item to the array
              return [...prevItems, tajhiz];
            }
          }); */
        }
       
    });
    setSelectedTajhiz(newSelectedTajhiz);
   let result=0;
   setOpenprogress(true);
   const  api= `${config.API_URL}/Derakht_Tajhizat/List_Iradat`
    axios.post(api,newSelectedTajhiz, {
        
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
        const formattedData = data.map(moshtari => ({
            pk_id:moshtari.pk_id,
            name_tajhiz:moshtari.name_tajhiz,
            Tarikh:moshtari.Tarikh,
            onvane_irad:moshtari.onvane_irad
         }));
         
         setRows(formattedData);
    })
    .catch(error => {
      setRows([]);
        result=-1;
       
    })
    .finally(() => {
       
        setOpenprogress(false);
      });;
};
const fetchChildren = async (parentId) => {
  if (!childData[parentId]) {
    const res = await fetch(`/api/children?parentId=${parentId}`);
    const data = await res.json();
    setChildData((prev) => ({ ...prev, [parentId]: data }));
  }
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
const handleCheckboxChange = (row) => {
  setSelectedRows((prev) => {
      if (prev.find(selectedRow => selectedRow.pk_id === row.pk_id)) {
          // Remove the row if it's already selected
          return prev.filter((selectedRow) => selectedRow.pk_id !== row.pk_id);
      } else {
          // Add the row to the selected array
          return [...prev, row];
      }
  });
 
};

const handleSelectAll = (event) => {
  if (event.target.checked) {
      // If checked, select all rows
      setSelectedRows(rows);
  } else {
      // If unchecked, clear the selection
      setSelectedRows([]);
  }
};
const returnSelectedRows = () => {
  getSelectedRows(selectedRows)
  removeSelectedRows();
};
const removeSelectedRows = () => {
  setRows((prevRows) => prevRows.filter(row => !selectedRows.includes(row)));
  setSelectedRows([]); // Clear the selected rows after removal
};
const childColumns = [
  { field: "id", headerName: "Child ID", width: 100 },
  { field: "title", headerName: "Title", flex: 1 },
];
    const columns = [
        {
        field: 'checkbox',
        headerAlign: 'center',
      sortable:false,
      checked:true,
      filterable:false,
      disableColumnMenu:true,
        headerClassName: 'custom-header',
        headerName: '',
        width: 70,
        renderHeader: () => (
          <Checkbox
              color="primary"
              checked={selectedRows.length === rows.length && rows.length > 0}
              onChange={handleSelectAll}
          />
      ),
      renderCell: (params) => (
          <Checkbox
              color="primary"
              checked={selectedRows.find(selectedRow => selectedRow.pk_id === params.row.pk_id) !== undefined}
              onChange={() => handleCheckboxChange(params.row)}
          />
        ),
    },
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
        { field: 'pk_id', headerName: 'کد', width: 90 , headerClassName: 'custom-header', hide: true,},
     
        { field: 'name_tajhiz', headerName: ' تجهیز ', width: 260 ,headerClassName: 'custom-header', cellClassName: 'custom-cell', headerAlign: 'center',        renderCell: (params) => {
          return convertToPersianNumerals(params.value);
      },},
      { field: 'onvane_irad', headerName: 'ایراد', width: 390 ,headerClassName: 'custom-header', cellClassName: 'custom-cell',headerAlign: 'center',renderCell: (params) => {
        return convertToPersianNumerals(params.value);
    }},
      { field: 'Tarikh',  headerName: 'تاریخ', width: 160 ,headerClassName: 'custom-header', cellClassName: 'custom-cell', headerAlign: 'center',        renderCell: (params) => {
        return convertToPersianNumerals(params.value);
    },},

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
      if(number!=null)
      return number.toString().split('').map(digit => persianNumerals[digit] || digit).join('');
    else
      return '';
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
                
                //setRows(formattedData);
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
        <Box  style={{padding:'1px' }}   sx={{
            height: '65vh', // Use viewport height for the container
            width: '100%',
         
            
      
        }}>
                  <Stack style={{paddingBottom:'5px'}} direction="row"  spacing={2} >
                 
                
           
                  <CustomTooltip placement="top-end" title="نتیجه جستجو با توجه به آیتمهای انتخابی شما نمایش داده می شود."    >  
         
          <CustomButton style={{ marginLeft: '16px' }}>
                <Icon onClick={searchAndDisplay} className="fa-solid fa-rotate"></Icon>
            </CustomButton>
          
      </CustomTooltip> 
      <CustomTooltip placement="top-end" title="آیتمهای انتخاب شده را به لیست درخواستهای کار اضافه کنید"    >  
          <CustomButton >
          
                <Icon onClick={returnSelectedRows} className="fa-solid fa-check-double"></Icon>
            </CustomButton>
          
      </CustomTooltip> 
      <CustomTooltip placement="top-end" title="آیتمهای انتخاب شده را از نتیجه جستجو حذف کنید. این گزینه به شما کمک میکند نتیجه جستحو کوچکتر شده و انتخاب آیتمها راحت تر صورت گیرد."    >  
          <CustomButton>
                <Icon onClick={removeSelectedRows} className="fa-solid fa-trash-can"></Icon>
            </CustomButton>
          
      </CustomTooltip>  

    </Stack>
   
            <DataGridPro         showToolbar sx={{...commongridstyle ,height:'95%',   '& .MuiDataGrid-toolbarContainer': {
      alignContent:'flex-start',
       backgroundColor:'red',
       justifyContent: 'flex-end', // moves toolbar to right side
     },} }  rowHeight={35}   rows={rows}  style={{ textAlign:'center'} }   initialState={{
   
   columns: {
      columnVisibilityModel: {
        // Hide columns id  the other columns will remain visible
      
       
      },
    },
  }}

  getDetailPanelContent={({ row }) => {
    fetchChildren(row.id);
    return (
      <div style={{ padding: 16, width: "100%" }}>
        {childData[row.id] ? (
          <DataGridPro
            rows={childData[row.pk_id]}
            columns={childColumns}
            hideFooter
            density='compact'
          />
        ) : (
          <span>Loading...</span>
        )}
      </div>
    );
  }}
  getDetailPanelHeight={() => 250}
   
       getRowId={(row) => row.pk_id} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
  
      <CustomCircularProgress onClose={() => setOpenprogress(false)} open={openprogress} thickness={1} size={80}></CustomCircularProgress>             
             
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
        {errorText}
        </Alert>
      </Snackbar>
      </Box>
    );
};

export default DisplayIradat;