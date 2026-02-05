import React, { useRef, useState, useEffect,useCallback } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import axios from 'axios';

import config from '@/config';
import TreeViewComponent from '@/components/TreeView/TreeViewComponent';
import {
  buildTree,
  findNodeById,
  findParentById,
  getAllChildNodes
} from '@/jeneralscripts';

import SearchTajhizData from './SearchTajhizData';
import SearchIradData from './SearchIradData';
import CustomCircularProgress from '@/components/CustomCircularProgress';

/* ----------------------------------
   Types
---------------------------------- */

type TreeNode = {
  ID: number;
  Parent_tajhiz?: number;
  children?: TreeNode[];
  where?: string;
  whereirad?: string;
  whererizirad?: string;
  whereolaviat?: string;
  Code_Pm?: string;
  Code_No_DerakhtTajhizat?: number;
  Name_Jadval_Pm?: string;
  Field_Rabet?: string;
  Name_Pm?: string;
  Sharh?: string;
  [key: string]: any; // allows dynamic backend fields
};

type SetFiltersProps = {
  checkedNodes: (value: any) => void;
  nodesData: (value: TreeNode[]) => void;
};

/* ----------------------------------
   Component
---------------------------------- */

const SetFilters = ({ checkedNodes, nodesData }: SetFiltersProps) => {
  const apiUrl = `${config.API_URL}/Derakht_Tajhizat/GetDerakht_Tajhizat`;
  const idKey = 'ID';
  const parentIdKey = 'Parent_tajhiz';

  const fab = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);

  const [data, setData] = useState<TreeNode[]>([]);
  const [tajhizdata, setTajhizData] = useState<any[]>([]);
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [noeTajhiz, setNoeTajhiz] = useState<number | string>('');
  const [selectedtajhiz, setSelectedtajhiz] = useState<TreeNode>({});
  const [open, setOpen] = useState<boolean>(false);
  const [open2, setOpen2] = useState<boolean>(false);
  const [openprogress, setOpenprogress] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<TreeNode[]>(apiUrl);
        const list = response.data;

        list.forEach(item => {
          if (item[idKey] === 2) {
            item.where = '88';
          } else {
            item.where = '';
            item.whereirad = '';
            item.whererizirad = '';
            item.whereolaviat = '';
          }
        });

        setData(list);
        const tree = buildTree(list, idKey, parentIdKey);
        setTreeData(tree);
        nodesData(tree);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const setfilternameTajhiz =useCallback( async () => {
    const tajhiz = findNodeById(treeData, noeTajhiz, idKey);
    setSelectedtajhiz(tajhiz);

    let searchstr = ` where ${tajhiz.Field_Rabet} in ( `;
    let parentid: any = noeTajhiz;
    let where = '';
    let endwhere = '';

    do {
      parentid = findParentById(treeData, String(parentid), 0, idKey);
      const tajhiz2 = findNodeById(treeData, String(parentid), idKey);
      where = tajhiz2.where;

      if (
        tajhiz2.Code_No_DerakhtTajhizat! > 1 ||
        tajhiz2.Name_Jadval_Pm === 'tbl_Omoor'
      ) {
        searchstr += `select ${tajhiz2.Code_Pm} from ${tajhiz2.Name_Jadval_Pm}`;
        searchstr += where
          ? ` where ${tajhiz2.Code_Pm} in(${where})`
          : ` where ${tajhiz2.Field_Rabet} in (`;
        endwhere += ')';
      }
    } while (parentid > 0 && where === '');

    searchstr += endwhere;

    try {
      setOpenprogress(true);
      const res = await axios.get(
        `${config.API_URL}/Derakht_Tajhizat/GetList_Tajhiz/${tajhiz.Name_Jadval_Pm}/${searchstr}`
      );
      setTajhizData(res.data);
      setOpen(true);
    } catch (err) {
      console.error(err);
    } finally {
      setOpenprogress(false);
    }
  }, [treeData, noeTajhiz]);

  const setfilternoeIrad = () => {
    const tajhiz = findNodeById(treeData, noeTajhiz, idKey);
    setSelectedtajhiz(tajhiz);
    setOpen2(true);
  };

  const updateChildNodesProperty = (
    tree: TreeNode[],
    childNodes: TreeNode[],
    property: string,
    newValue: string
  ): TreeNode[] => {
    const childIds = childNodes.map(node => node[idKey]);

    return tree.map(node => {
      if (childIds.includes(node[idKey])) {
        return { ...node, [property]: newValue };
      }

      if (node.children?.length) {
        return {
          ...node,
          children: updateChildNodesProperty(
            node.children,
            childNodes,
            property,
            newValue
          )
        };
      }

      return node;
    });
  };

  const handleFormselectTajhizSubmit = (selectedList: any[]) => {
    if (!selectedList) return;

    selectedtajhiz.where = selectedList
      .map(obj => obj[selectedtajhiz.Code_Pm!])
      .join(',');

    if (selectedtajhiz.where === ',,') selectedtajhiz.where = '';

    const childsnodes = getAllChildNodes(
      treeData,
      selectedtajhiz[idKey],
      idKey
    );

    setTreeData(updateChildNodesProperty(treeData, childsnodes, 'where', ''));
    nodesData(treeData);
    setOpen(false);
    setOpen2(false);
  };

  const handleFormselectIradSubmit = (selectedList: any[]) => {
    if (!selectedList) return;

    selectedtajhiz.whereirad = selectedList
      .map(obj => String(obj['code_irad']))
      .join(',');

    if (selectedtajhiz.whereirad === ',,') selectedtajhiz.whereirad = '';
    nodesData(treeData);
    setOpen(false);
    setOpen2(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <SearchTajhizData
        open={open}
        onClose={() => setOpen(false)}
        listTajhiz={tajhizdata}
        defaultitems={selectedtajhiz.where}
        keyfiled={selectedtajhiz.Code_Pm}
        onSubmit={handleFormselectTajhizSubmit}
        title={selectedtajhiz.Name_Pm}
      />

      <SearchIradData
        open={open2}
        onClose={() => setOpen2(false)}
        onSubmit={handleFormselectIradSubmit}
        title={selectedtajhiz.Name_Pm}
        ID={selectedtajhiz[idKey]}
      />

      <TreeViewComponent
        url={apiUrl}
        idKey={idKey}
        parentIdKey={parentIdKey}
        label="Sharh"
        onValueChange={value => setNoeTajhiz(value)}
        checkedNodes={checkedNodes}
        onFilterNametajhiz={setfilternameTajhiz}
        onFilterNoeIrad={setfilternoeIrad}
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

export default SetFilters;
