
import React, { useRef, useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import config from '@/config';
import TreeViewComponent from '@/components/TreeView/TreeViewComponent';
import axios from 'axios'; // Import axios for HTTP requests
import { buildTree,findNodeById,findParentById,getAllChildNodes } from '@/jeneralscripts';
import SearchTajhizData from './SearchTajhizData';
import CustomCircularProgress from '@/components/CustomCircularProgress';
import SearchIradData from './SearchIradData';
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
//mehdi2 1123

const SetFilters = ({ checkedNodes,nodesData }) => {
  const onckeckedNodesChange = (value) => {
    checkedNodes(value)
};
  const apiUrl = `${config.API_URL}/Derakht_Tajhizat/GetDerakht_Tajhizat`; // URL for fetching data
  const idKey = 'ID'; // Specify the key for ID
  const parentIdKey = 'Parent_tajhiz'; // Specify the key for Parent ID
   const fab =useRef();
  const mapRef = useRef();
  const [data, setData] = useState([]);
  const [tajhizdata, settajhizData] = useState([]);
  const [treeData, settreeData] = useState([]);
  const [noeTajhiz, setNoeTajhiz] = useState('');
  const [selectedtajhiz, setSelectedtajhiz] = useState('');
  const [dynamicObject, setDynamicObject] = useState({}); // Initial empty object
  const [open, setOpen] = useState(false); // State to control dialog visibility
  const [open2, setOpen2] = useState(false);
  const [openprogress, setOpenprogress] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl); // Use the passed URL
        const data = response.data;
        data.forEach((item) => {
          if (item[idKey] === 2) {
              item.where='88';
          } else {
            item.where='';
            item.whereirad='';
            item.whererizirad='';
            item.whereolaviat='';
          }
      });
        setData(data);
        settreeData(buildTree(data,idKey,parentIdKey))   
        nodesData(buildTree(data,idKey,parentIdKey));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 
 const setfilternameTajhiz =() =>
 {
  
   const tajhiz= findNodeById(treeData,noeTajhiz,idKey);
   setSelectedtajhiz(tajhiz);
   var searchstr=`  where ${tajhiz.Field_Rabet} in ( `;
   var parentid=noeTajhiz;
   var where='';
   var endwhere=''
  // window.alert(searchstr);
  do{
     parentid=  findParentById(treeData,String(parentid),0,idKey);
    const tajhiz2=findNodeById(treeData,String(parentid),idKey);
     where=tajhiz2.where;
    if(tajhiz2.Code_No_DerakhtTajhizat>1 || tajhiz2.Name_Jadval_Pm=='tbl_Omoor')
    { 
    searchstr+= `select ${tajhiz2.Code_Pm} from ${tajhiz2.Name_Jadval_Pm}`;
    if(tajhiz2.where!='')
      searchstr+= ` where ${tajhiz2.Code_Pm} in(${where})`;
    else
      searchstr+= ` where ${tajhiz2.Field_Rabet} in (`;
    endwhere+=')';
    }
     
  } while(parentid>0 && where==='');
  searchstr+=endwhere;
       setOpenprogress(true);
      const response = axios.get(`${config.API_URL}/Derakht_Tajhizat/GetList_Tajhiz/${tajhiz.Name_Jadval_Pm}/${searchstr}`)
      .then((response) => {
        settajhizData(response.data);  // Set data from response

    })
    .catch((err) => {
      console.error('Error fetching data:', err);
    })
    .finally(() => {
      setOpen(true); // Open the dialog
      setOpenprogress(false);
    });
   
  }
  const setfilternoeIrad =() =>
  {
   
    const tajhiz= findNodeById(treeData,noeTajhiz,idKey);
    setSelectedtajhiz(tajhiz);
       setOpen2(true); // Open the dialog
       setOpenprogress(false);
    // });
    
   }
  const updateChildNodesProperty = (tree, childNodes, property, newValue) => {
    const childIds = childNodes.map(node => node[idKey]); // Extract IDs of child nodes

    return tree.map(node => {
        if (childIds.includes(node[idKey])) {
            return {
                ...node, // Spread existing properties
                [property]: newValue // Set the desired property to the new value
            };
        }

        // If the node has children, update them recursively
        if (node.children && node.children.length > 0) {
            return {
                ...node,
                children: updateChildNodesProperty(node.children, childNodes, property, newValue)
            };
        }

        return node; // Return the node unchanged if not in childIds
    });
};
  const handleFormselectTajhizSubmit = (selectedTajhizlist) => {
    if(selectedTajhizlist!=null)
    {
    console.log('Data received from DialogForm:', selectedTajhizlist); // Log received data
    
   selectedtajhiz.where= selectedTajhizlist.map(obj => obj[selectedtajhiz.Code_Pm]).join(',');
   if(selectedtajhiz.where===',,')
     selectedtajhiz.where='';
   let childsnodes= getAllChildNodes(treeData,selectedtajhiz[idKey],idKey);
   settreeData( updateChildNodesProperty(treeData, childsnodes, 'where', ''));

   nodesData(treeData);
    }
    //setSubmitted(!submitted); // Optional: setting submitted state
    setOpen(false) // Close dialog after submission
    setOpen2(false)

  };
  const handleFormselectIradSubmit = (selectedIradlist) => {
    if(selectedIradlist!=null)
    {
    console.log('Data received from DialogForm:', selectedIradlist); // Log received data
    
   selectedtajhiz.whereirad= selectedIradlist.map(obj => String( obj['code_irad'])).join(',');
   if(selectedtajhiz.whereirad===',,')
     selectedtajhiz.whereirad='';
     nodesData(treeData);
  //alert(selectedtajhiz.whereirad);
    }
    //setSubmitted(!submitted); // Optional: setting submitted state
    setOpen(false) // Close dialog after submission
    setOpen2(false)

  };
    return (
      <Box style={{padding:'10px'}}>
           <SearchTajhizData onvantajhiz={selectedtajhiz.Sharh}   open={open} onClose={() => setOpen(false)} listTajhiz={tajhizdata} defaultitems={selectedtajhiz.where} keyfiled={selectedtajhiz.Code_Pm}  onSubmit={handleFormselectTajhizSubmit} title={selectedtajhiz.Name_Pm} />
     <SearchIradData onvantajhiz={selectedtajhiz.Sharh}   open={open2} onClose={() => setOpen2(false)}  defaultitems={selectedtajhiz.where} keyfiled={selectedtajhiz.Code_Pm}  onSubmit={handleFormselectIradSubmit} title={selectedtajhiz.Name_Pm} ID={selectedtajhiz[idKey]} />
      <Stack direction="row" spacing={2}>
      <i   disabled='true'  class= 'fa-solid fa-user-plus  fa-2xl'   onClick={() => window.alert(checkedNodes) }    
      
            onMouseMove={(event) => {
              event.currentTarget.className =noeTajhiz<=0 ? 'fa-solid fa-user-plus  fa-2xl' :  'fa-solid fa-user-plus  fa-2xl fa-beat-fade';
          }} 
          onMouseLeave={(event) => {
            event.currentTarget.className = 'fa-solid fa-user-plus  fa-2xl';
        }} 
     title='ثبت مشتری'  style={{ visibility:'hidden', paddingBottom:'30px' 
     ,cursor: noeTajhiz<=0 ? 'not-allowed' : 'pointer',
     color: noeTajhiz<=0 ? 'grey' : 'var(--common-control-backcolor)',
     opacity: noeTajhiz<=0 ? 0.5 : 1,}}></i>
      

    </Stack>
        
        {/* <TreeView   url={apiUrl} idKey={idKey} parentIdKey={parentIdKey} label='Sharh' /> */}
              <TreeViewComponent url={apiUrl} idKey={idKey} parentIdKey={parentIdKey} label='Sharh' onValueChange={(value) =>  setNoeTajhiz(value)}  checkedNodes ={(value) => onckeckedNodesChange(value) } onFilterNametajhiz={() => setfilternameTajhiz()} onFilterNoeIrad={() => setfilternoeIrad()}></TreeViewComponent>
              <CustomCircularProgress onClose={() => setOpenprogress(false)} open={openprogress} thickness={1} size={80}></CustomCircularProgress>             
             
              </Box>  
    );
  };
export default SetFilters;
