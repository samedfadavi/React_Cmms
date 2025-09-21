import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import { useDashboardDataContext } from '../context/dashboardDataContext';
import { List, ListItem, ListItemText, CircularProgress, Container, Typography, Link } from '@mui/material';

const Inbox = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {user}=useDashboardDataContext();
  useEffect(() => {
    axios.get('http://localhost:8090/engine-rest/task?assignee=112&sortBy=created&priority=50&sortOrder=desc') // Replace with your REST API endpoint
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
      
      renderCell: (params) => (
        <Typography>{params.value}</Typography>
      ),
    },
    {
      field: 'name',
      headerName: 'Title',
      width: 150,
      renderCell: (params) => (
        <Typography variant="h6">{params.value}</Typography>
      ),
    },
    {
      field: 'created',
      headerName: 'Description',
      width: 300,
      renderCell: (params) => (
        <Typography variant="body2">{params.value}</Typography>
      ),
    },
  ];
  function ListViewCell(params) {
    return (
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          height: '100%',
          gap: 2,
        }}
      >
        
        <Stack sx={{ flexGrow: 1 }}>
          <Typography variant="body2" fontWeight={500}>
            {params.row.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {params.row.created}
          </Typography>
        </Stack>
        <MessageAction {...params} />
      </Stack>
    );
  }
  
  const listViewColDef = {
    field: 'listColumn',
    renderCell: ListViewCell,
  };
  
  const VISIBLE_FIELDS = ['id', 'name', 'created'];
  if (loading) {
    return (
      <Container style={{ textAlign: 'center', marginTop: '20px' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="body1" color="error">
          Error: {error.message}
        </Typography>
      </Container>
    );
  }

  return (
    <div className='unreadmessage-div'>
 
 <List 
        style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          fontFamily:'IRANSans',
          justifyContent: 'flex-start', // Adjust horizontal alignment
          padding: 0 
        }}
      >
        {data.map((item) => (
          <ListItem 
            key={item.id} 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              padding: '2px', 
              borderBottom: '2px solid #e0e0e0', 
              
             
              margin: '1px', // Space between items
              flex: '0 1 calc(100%)', // Adjust width to fit desired column count
              boxSizing: 'border-box' // Ensure padding is included in width
            }}
          >
            <ListItemText  
              primary={<Link  style={{fontFamily:'IRANSans'}} variant="h6">{item.name}</Link>}
              secondary={<Typography variant="body2">{item.name}</Typography>}
            />
          </ListItem>
        ))}
      </List>
   
    </div>
  );
};

export default Inbox;