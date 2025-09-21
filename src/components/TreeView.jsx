import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
import { NineK } from '@mui/icons-material';
// Sample flat data with parentId

const buildTree = (data, idKey, parentIdKey) => {
  const tree = [];
  const lookup = {};

  data.forEach(item => {
    lookup[item[idKey]] = { ...item, children: [] };
  });

  data.forEach(item => {
    if (item[parentIdKey] === 0) {
      tree.push(lookup[item[idKey]]);
    } else {
      lookup[item[parentIdKey]].children.push(lookup[item[idKey]]);
    }
  });

  return tree;
};
// Recursive TreeNode Component
const TreeNode = ({id ,label, node, onSelectChange, selectedNodes }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Check if the node is selected
  const isChecked = selectedNodes.includes(node[id]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckChange = (event) => {
    const { checked } = event.target;
    onSelectChange(node[id], checked); // Notify parent about the change
  };
 // fa-solid fa-plus
  return (
    <div  dir='rtl' style={{ marginRight: '20px'  }  }>
      <div style={{textWrap:'false'}}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckChange}
        />
        <span onClick={handleToggle}   style={{ cursor: 'pointer', marginRight: '5px',fontFamily:'IRANSans' }}>
        {node.children.length > 0 && (isOpen ? ' - ' : ' + ')} {node[label]}
        </span>
      </div>
      {isOpen && node.children.map(child => (
        <TreeNode key={child[id]} id={id} label={label} node={child} onSelectChange={onSelectChange} selectedNodes={selectedNodes} />
      ))}
    </div>
  );
};

// Main TreeView Component
const TreeView = ({ url, idKey = 'ID', parentIdKey = 'parentId',label='Sharh' }) => {  // Accept URL, idKey, and parentIdKey as props
  const [treeData, setTreeData] = useState([]);
  const [data, setData] = useState([]);
  const [selectedNodes, setSelectedNodes] = useState([]);

  // Fetch data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url); // Use the passed URL
        const data = response.data;
        const tree = buildTree(data, idKey, parentIdKey); // Pass dynamic keys to buildTree
        setTreeData(tree);
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [url, idKey, parentIdKey]); 

  const handleSelectChange = (id, isSelected) => {
    setSelectedNodes(prevSelected => {
      const newSelection = new Set(prevSelected); // Use a Set to avoid duplicates

      const updateSelection = (nodeId, checked) => {
        if (checked) {
          newSelection.add(nodeId); // Add the current node
          // Add all child nodes
          data.forEach(item => {
            if (item[parentIdKey] === nodeId) {
              updateSelection(item[idKey], true);
            }
          });
        } else {
          newSelection.delete(nodeId); // Remove the current node
          // Remove all child nodes
          data.forEach(item => {
            if (item[parentIdKey] === nodeId) {
              updateSelection(item[idKey], false);
            }
          });
        }
      };

      updateSelection(id, isSelected);
      return Array.from(newSelection); // Convert back to array
    });
  };


  // Function to return selected node IDs
  const  getSelectedNodeIds = () => {
    return selectedNodes;
  };

  // Example of using the function (e.g., on button click)
  const handleShowSelectedNodes = () => {
    const selectedIds = getSelectedNodeIds();
    alert(`Selected Node IDs: ${selectedIds.join(', ')}`);
  };

  return (
    <div>

      {treeData.map(node => (
        <TreeNode key={node[idKey]} id={idKey} label={label}  node={node} onSelectChange={handleSelectChange} selectedNodes={selectedNodes} />
      ))}
    </div>
  );
};

export default TreeView;