import React, {  useState,useEffect } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { Box } from '@mui/material';
import { useTreeViewApiRef } from '@mui/x-tree-view/hooks';
import { buildTree } from '../../jeneralscripts';
import CustomCircularProgress from '@/components/CustomCircularProgress';

import Stack from '@mui/material/Stack';
import { CustomTooltip } from '@/CustomControls/CustomTooltip';
import Typography from '@mui/material/Typography';

import Icon from '@mui/material/Icon';
import { useTreeItemUtils } from '@mui/x-tree-view/hooks';


const selectionPropagation = {
    parents: true,
    descendants: true,
  };
  
   
const TreeViewComponent = ( { url='http://localhost:800/api/Derakht_Tajhizat/GetDerakht_Tajhizat', idKey = 'ID', parentIdKey = 'Parent_tajhiz',label='Sharh' ,onValueChange,checkedNodes,onFilterNametajhiz,onFilterNoeIrad }) => {
function CustomLabel({ children, status, onClick, ...props  }) {
    return (
      <Stack
        direction="row"
        justifyContent="space-between"
        
      
       
      >
       <Typography  style={{ fontFamily:'IRANSans' }}>{children}</Typography>
       {selectedNode!=null && status.focused  &&   (selectedNode.Code_No_DerakhtTajhizat)!=1 && ( // Render icons when the node is selected and checked
          <>
           <CustomTooltip placement="top-end" title="فقط درخواست های کار مربوط به تجهیزات انتخابی نمایش داده می شود.برای مثال شما می توانید در قسمت فیدر فشار متوسط فقط فیدر یا فیدرهای مد نظر خود را انتخاب کنید. به همین شکل برای تمام انواع تجهیز قابل انجام می باشد "    >  
      
       <Icon 
             
          
       onClick={ () => onFilterNametajhiz()}  style={{marginRight:'10px ',color:  'var(--common-control-backcolor)'}} className="fa-solid fa-filter" sx={{ fontSize: 30 }} />
        </CustomTooltip>
          </>
        )}
       {selectedNode!=null && status.selected  && status.focused  &&  Boolean (selectedNode.Bazdid) && ( // Render icons when the node is selected and checked
          <>
            <CustomTooltip placement="top-end" title="ایرادات مربوط به هر تجهیزراانتخاب کنید دراین حالت فقط درخواستهای کاری که از نوع  ایراد یا ایرادهای انتخاب شده باشند نمایش داده می شوند"    >  
      
      <Icon  onClick={ () => onFilterNoeIrad()} baseClassName="fas" style={{marginRight:'10px ',color:  'var(--common-control-backcolor)'}} className="fa-list-check" sx={{ fontSize: 30 }} />
      </CustomTooltip>
          </>
        )}
      
      </Stack>
    );
  };


  
  const CustomTreeItem = React.forwardRef(function CustomTreeItem(props, ref) {
    const { interactions, status } = useTreeItemUtils({
      itemId: props.itemId,
      children: props.children,
    });
    const handleContentClick = (event) => {
      event.defaultMuiPrevented = true;
    };
  
    const handleIconButtonClick = (event) => {
      interactions.handleSelection(event);
    };
  
    return (
      <TreeItem
        {...props}
        ref={ref}
        slots={{
          label: CustomLabel,
       
        }}
        slotProps={{
            labelInput:
            {
              
                dir:'ltr',
                style:{ cursor: 'pointer', marginRight: '5px' },
            },
            checkbox:
        {
            dir:'rtl'
        
        },
            label:
            
        {  sx: { border: '0px solid',fontFamily:'IRANSans' },
        onClick: handleIconButtonClick, status,
    dir:'ltr'
    },
          content: {
            
            sx: { border: '0px solid'},
            dir:'rtl',
            style:{ cursor: 'pointer', marginRight: '5px' },
           
          },
        }}
      />
    );
  }); 
const apiRef = useTreeViewApiRef();   
const [data, setData] = useState([]);
const [selectedItems, setSelectedItems] =useState([]);
const [selectedNode, setSelectedNode] =useState(null);
const [openprogress, setOpenprogress] = useState(false);
const handleSelectedItemsChange = (event, ids) => {
  setSelectedItems(ids);
  checkedNodes(ids);
};


var first=true;
    const handleItemSelectionToggle = (event, itemId, isSelected) => {
       const ids=selectedItems;
       
       //if (isSelected) {
        // Adding the item to selectedItems if it is not already selected
       
        if(first)
         onValueChange(itemId);
       
    // } else {
   
    //     if(first)
    //       onValueChange(0);
    // }
    first=false;
        //window.alert(itemId);
     const row  =data.find(r=> String(r[idKey])===itemId)
    
   var item=  apiRef.current.getItem(itemId)
  
  };
      const handleItemClick = (event, itemId) => {
        //window.alert(itemId);
     const row  =data.find(r=> String(r[idKey])===itemId)
     setSelectedNode(row);
   var item=  apiRef.current.getItem(itemId)
 const isselectd=  selectedItems.indexOf(itemId);

 //if(isselectd>=0)
  onValueChange(itemId);
   //else
   //onValueChange(0);
};
const handleCloseProgress = () => {
    
  setOpenprogress(false); // Close the dialog
};
    useEffect(() => {
      setOpenprogress(true);
      const response = axios.get(url)
      .then((response) => {
        setData(response.data);  // Set data from response
     
        setOpenprogress(false);
    })
    .catch((err) => {
      console.error('Error fetching data:', err);
    })
    .finally(() => {
      setOpenprogress(false);
    });
/*         const fetchData = async () => {
          try {
            const response = await axios.get(url); // Use the passed URL
            const data = response.data;
           
            setData(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData(); */
      }, []); 
    const treeData = buildTree(data,idKey,parentIdKey);
    const getItemId = (node) =>String( node[idKey]);
    const getItemLabel = (node) =>node[label]===null?'': node[label];
    return (
      
        
        <Box sx={{ overflowY: 'auto', maxHeight: 400, border: '1px solid #ccc', borderRadius: '4px', padding: '10px' }}>
                 
        <RichTreeView
         sx={{ textAlign: "right", fontSize:'200px' }}
       
         itemChildrenIndentation={24}
        defaultExpandedItems={['tree']}
         getItemId={getItemId}
           
          getItemLabel={getItemLabel}
          selectionPropagation={{parents:false,descendants:true,}}
          slots={{ item: CustomTreeItem }}
          onItemSelectionToggle={handleItemSelectionToggle}
          onSelectedItemsChange={handleSelectedItemsChange}
          onItemClick={handleItemClick}
          selectedItems={selectedItems}
          multiSelect
          apiRef={apiRef}
          checkboxSelection
          items={treeData}
        
        />
         <CustomCircularProgress onClose={handleCloseProgress} open={openprogress} thickness={1} size={80}></CustomCircularProgress>             
             
      </Box>
      
      
    );
};

export default TreeViewComponent;