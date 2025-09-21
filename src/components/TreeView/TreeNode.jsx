import React from 'react';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

const TreeNode = ({ node }) => {
    return (
        <TreeItem nodeId={String(node.id)} label={node.name}>
            {node.children && node.children.length > 0 ? (
                node.children.map(child => <TreeNode key={child.id} node={child} />)
            ) : null}
        </TreeItem>
    );
};

export default TreeNode;