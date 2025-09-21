export const buildTree = (data, idKey, parentIdKey) => {
    const mappedData = {};
    const tree = [];

    // Create a map for all nodes
    data.forEach((item) => {
        mappedData[item[idKey]] = { ...item, children: [] };
    });

    // Build the tree structure
    data.forEach((item) => {
        if (item[parentIdKey] === 0) {
            tree.push(mappedData[item[idKey]]);
        } else {
            mappedData[item[parentIdKey]].children.push(mappedData[item[idKey]]);
        }
    });

    return tree;
};

export const findParentById1 = (tree, targetId, parentId = 0, idKey) => {
    for (let node of tree) {
        // Check if the current node is the target node
        if (String(node[idKey]) === targetId) {
            return parentId; // Return the ID of the parent
        }

        // If the node has children, search through them
        if (node.children && node.children.length > 0) {
            const parent = findParentById(node.children, targetId, node[idKey]);
            if (parent !== null) {
                return parent; // Return the parent ID found in children
            }
        }
    }
    return null; // Return null if the parent is not found
};

export const findParentById = (tree, targetId, parentId = 0, idKey) => {
    for (let node of tree) {
        // If the current node's ID matches the target ID, return the parent ID
        if (String(node[idKey]) === targetId) {
            return parentId; // Return the parent ID if the target node is found
        }

        // If the node has children, search through them
        if (node.children && node.children.length > 0) {
            const foundParentId = findParentById(node.children, targetId, node[idKey], idKey);
            // If a parent ID is found in the recursion, return it
            if (foundParentId !== null) {
                return foundParentId;
            }
        }
    }
    return null; // If no parent is found, return null
};

export const findNodeById = (tree, targetId, idKey) => {
    for (let node of tree) {
        // Check if the current node matches the target
        if (String(node[idKey]) === targetId) {
            return node; // Found the node
        }

        // If the node has children, recursively search through them
        if (node.children && node.children.length > 0) {
            const foundNode = findNodeById(node.children, targetId, idKey);
            if (foundNode) {
                return foundNode; // Node found in children
            }
        }
    }
    return null; // Node not found
};

// New function to get all child nodes for a given ID
export const getAllChildNodes = (tree, targetId, idKey) => {
    let result = [];

    const findNodeAndCollectChildren = (nodes) => {
        for (let node of nodes) {
            // Check if the current node matches the target ID
            if (String(node[idKey]) === targetId) {
                // If it matches, collect all children recursively
                collectChildren(node);
                return; // Exit once the target is found
            }

            // If the node has children, search through them
            if (node.children && node.children.length > 0) {
                findNodeAndCollectChildren(node.children);
            }
        }
    };

    const collectChildren = (node) => {
        result.push(node); // Add the current node to the result
        // Recursively collect all child nodes
        if (node.children && node.children.length > 0) {
            node.children.forEach(collectChildren);
        }
    };

    // Start searching from the root of the tree
    findNodeAndCollectChildren(tree);

    return result; // Return the collected child nodes
};