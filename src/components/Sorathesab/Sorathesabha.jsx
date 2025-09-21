import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid , GridColumnMenu ,useGridApiContext } from '@mui/x-data-grid';
import MenuItem from '@mui/material/MenuItem';

  import  DatePicker,{ DateObject } from "react-multi-date-picker"
 
  import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import persian_en from "react-date-object/locales/persian_en"
import transition from "react-element-popper/animations/transition"
import config from '../../config'; // Adjust the path as necessary

import { CircularProgress, Grid } from '@mui/material';
import { commongridstyle } from '../../styles/GridStyle';
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
const Sorathesabha = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
       const [datevalues, setdateValues] = useState([
      new DateObject({ calendar: persian, locale: persian_fa }),
      new DateObject({ calendar: persian, locale: persian_fa })
    ])
    // Define columns for the DataGrid
    const columns = [
        { field: 'id', headerName: 'ردیف', width: 90 , headerClassName: 'custom-header', hide: true,},
        { field: 'datepardakht',  headerName: ' تاریخ صدور', width: 160 ,headerClassName: 'custom-header', cellClassName: 'custom-cell', headerAlign: 'center',        renderCell: (params) => {
          return convertToPersianNumerals(params.value);
      },},
        { field: 'malek', headerName: 'طرف حساب', width: 260 ,headerClassName: 'custom-header', cellClassName: 'custom-cell', headerAlign: 'center',        renderCell: (params) => {
          return convertToPersianNumerals(params.value);
      },},
        { field: 'codeitem', headerName: 'کد درامد', width: 90 ,headerClassName: 'custom-header', cellClassName: 'custom-cell'},
        { field: 'onvanitem', headerName: 'عنوان', width: 500 ,headerClassName: 'custom-header', cellClassName: 'custom-cell', headerAlign: 'center'},
        { field: 'shomarepeygiri', headerName: 'شماره منحصر به فردمالیاتی', width: 300 ,headerClassName: 'custom-header', cellClassName: 'custom-cell',},
        { field: 'pardakhti', headerName: 'مبلغ', width: 150 ,hide:true, headerAlign: 'center',headerClassName: 'custom-header', cellClassName: 'custom-cell',        renderCell: (params) => {
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
                var datefrom="";
                var dateto="";
                if(datevalues.length==1)
                {
                  datefrom=datevalues[0];
dateto=datefrom;
                }
                else
                {
                  datefrom=datevalues[0];
                  dateto=datevalues[1];
                }
                datefrom=  datefrom.convert(persian, persian_en)?.format?.("YYYY/MM/DD");
                dateto=  dateto.convert( persian, persian_en)?.format?.("YYYY/MM/DD");
 
                //const query="http://localhost:800/api/ViewPardakhtMNs/List_Sorathesab?datefrom="+datefrom+"&dateto="+dateto;
                const query=`${config.API_URL}/ViewPardakhtMNs/List_Sorathesab?datefrom=${datefrom}&dateto=${dateto}`;
                
                const response = await axios.get(query);
                const formattedData = response.data.map(user => ({
                   id:user.Idrow,
                   datepardakht:user.datepardakht,
                    malek: user.malek,
                    codeitem: user.codeitem,
                    onvanitem: user.onvanitem,
                    pardakhti: user.pardakhti,
                    shomarepeygiri:user.shomarepeygiri
                }));
                
                setRows(formattedData);
            } catch (err) {
                setError(query);
            } finally {
                setLoading(false);
            }
        };

        fetchData(); // Invoke fetchData function
    }, [datevalues]); // Empty dependency array means this effect runs once after the initial render

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
  <DatePicker
  locale={persian_fa}
  calendar={persian}
  onChange={setdateValues}
  range
  value={datevalues}
  inputClass='custom-input'
  dateSeparator=" الی " 
  rangeHover
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
  
            <DataGrid rowHeight={35}   rows={rows}  style={{fontFamily:'IRANSans', textAlign:'center'} }   initialState={{
    columns: {
      columnVisibilityModel: {
        // Hide columns id  the other columns will remain visible
        id: false,
        codeitem:false,
      },
    },
  }}

   sx={commongridstyle}
   getRowId={(row) => row.id} columns={columns} pageSize={50} rowsPerPageOptions={[100]} />
        </div>
    );
};

export default Sorathesabha;