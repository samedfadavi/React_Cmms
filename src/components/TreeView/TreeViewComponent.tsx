import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { useTreeViewApiRef } from '@mui/x-tree-view/hooks';
import { useTreeItemUtils } from '@mui/x-tree-view/hooks';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';

import CustomCircularProgress from '@/components/CustomCircularProgress';
import { CustomTooltip } from '@/CustomControls/CustomTooltip';

import { buildTree } from '../../jeneralscripts';

/* ----------------------------------
   Types
---------------------------------- */

type TreeNode = {
  ID: number;
  Parent_tajhiz?: number;
  children?: TreeNode[];
  Code_No_DerakhtTajhizat?: number;
  Bazdid?: boolean;
  [key: string]: any;
};

type TreeViewComponentProps = {
  url?: string;
  idKey?: string;
  parentIdKey?: string;
  label?: string;
  onValueChange: (value: string) => void;
  checkedNodes: (value: string[]) => void;
  onFilterNametajhiz: () => void;
  onFilterNoeIrad: () => void;
};

/* ----------------------------------
   Component
---------------------------------- */

const TreeViewComponent = ({
  url = 'http://localhost:800/api/Derakht_Tajhizat/GetDerakht_Tajhizat',
  idKey = 'ID',
  parentIdKey = 'Parent_tajhiz',
  label = 'Sharh',
  onValueChange,
  checkedNodes,
  onFilterNametajhiz,
  onFilterNoeIrad
}: TreeViewComponentProps) => {

  /* ----------------------------------
     Custom label
  ---------------------------------- */

  const CustomLabel = ({
    children,
    status
  }: {
    children: React.ReactNode;
    status: any;
  }) => (
    <Stack direction="row" justifyContent="space-between">
      <Typography sx={{ fontFamily: 'IRANSans' }}>
        {children}
      </Typography>

      {selectedNode &&
        status.focused &&
        selectedNode.Code_No_DerakhtTajhizat !== 1 && (
          <CustomTooltip title="فیلتر تجهیزات">
            <Icon
              onClick={onFilterNametajhiz}
              className="fa-solid fa-filter"
              sx={{ fontSize: 30, color: 'var(--common-control-backcolor)' }}
            />
          </CustomTooltip>
        )}

      {selectedNode &&
        status.selected &&
        status.focused &&
        Boolean(selectedNode.Bazdid) && (
          <CustomTooltip title="فیلتر ایراد">
            <Icon
              onClick={onFilterNoeIrad}
              className="fa-list-check"
              sx={{ fontSize: 30, color: 'var(--common-control-backcolor)' }}
            />
          </CustomTooltip>
        )}
    </Stack>
  );

  /* ----------------------------------
     Custom TreeItem
  ---------------------------------- */

  const CustomTreeItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentProps<typeof TreeItem>
  >(function CustomTreeItem(props, ref) {
    const { interactions, status } = useTreeItemUtils({
      itemId: props.itemId!,
      children: props.children,
    });

    const handleIconButtonClick = (event: React.MouseEvent) => {
      interactions.handleSelection(event);
    };

    return (
      <TreeItem
        {...props}
        ref={ref}
        slots={{ label: CustomLabel }}
        slotProps={{
          label: {
            onClick: handleIconButtonClick,
            status,
            dir: 'ltr',
            sx: { fontFamily: 'IRANSans' },
          },
          content: {
            dir: 'rtl',
            sx: { cursor: 'pointer' },
          },
        }}
      />
    );
  });

  /* ----------------------------------
     State
  ---------------------------------- */

  const apiRef = useTreeViewApiRef();

  const [data, setData] = useState<TreeNode[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [openprogress, setOpenprogress] = useState<boolean>(false);

  /* ----------------------------------
     Handlers
  ---------------------------------- */

  const handleSelectedItemsChange = (
    _event: React.SyntheticEvent,
    ids: string[]
  ) => {
    setSelectedItems(ids);
    checkedNodes(ids);
  };

  let first = true;

  const handleItemSelectionToggle = (
    _event: React.SyntheticEvent,
    itemId: string,
    _isSelected: boolean
  ) => {
    if (first) onValueChange(itemId);
    first = false;
  };

  const handleItemClick = (
    _event: React.SyntheticEvent,
    itemId: string
  ) => {
    const row = data.find(r => String(r[idKey]) === itemId) || null;
    setSelectedNode(row);
    onValueChange(itemId);
  };

  /* ----------------------------------
     Data fetching
  ---------------------------------- */

  useEffect(() => {
    const fetchData = async () => {
      try {
        setOpenprogress(true);
        const response = await axios.get<TreeNode[]>(url);
        setData(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setOpenprogress(false);
      }
    };

    fetchData();
  }, [url]);

  /* ----------------------------------
     Tree helpers
  ---------------------------------- */

  const treeData = buildTree(data, idKey, parentIdKey);

  const getItemId = (node: TreeNode): string =>
    String(node[idKey]);

  const getItemLabel = (node: TreeNode): string =>
    node[label] ?? '';

  /* ----------------------------------
     Render
  ---------------------------------- */

  return (
    <Box sx={{ maxHeight: 400, overflowY: 'auto', border: '1px solid #ccc', p: 2 }}>
      <RichTreeView
        items={treeData}
        getItemId={getItemId}
        getItemLabel={getItemLabel}
        apiRef={apiRef}
        multiSelect
        checkboxSelection
        selectedItems={selectedItems}
        onSelectedItemsChange={handleSelectedItemsChange}
        onItemSelectionToggle={handleItemSelectionToggle}
        onItemClick={handleItemClick}
        slots={{ item: CustomTreeItem }}
        selectionPropagation={{ parents: false, descendants: true }}
      />

      <CustomCircularProgress
        open={openprogress}
        onClose={() => setOpenprogress(false)}
        size={80}
        thickness={1}
      />
    </Box>
  );
};

export default TreeViewComponent;
