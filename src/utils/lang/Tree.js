
export const createTree = (data, parentNode) => {
    const tree = [].concat(data);
    tree.forEach((node) => {
        node.parent = parentNode;
        if (node.children) {
            let subTree = createTree(node.children, node);
            node.children = subTree;
        }
    });
    return tree;
}

export const findNodeParents = (parents, node, map) => {
    let parentNode = node.parent;
    if (parentNode) {
        parents.push(parentNode); 
        map && map(parentNode, node);
        findNodeParents(parents, parentNode, map);
    }
}

export const findNodeTreeNodes = (subNodes, node, map) => {
    if (!node.children || node.children.length < 1) return;
    node.children.forEach((subNode) => {
        map && map(subNode);
        subNodes.push(subNode);
        findNodeTreeNodes(subNodes, subNodes, map);
    });
}

export const findNode = (tree, node, matchFunc) => {
    for (var i = 0; i < tree.length; i++) {
        var tmp = tree[i];
        if (matchFunc(tmp, node)) {
            //found
            return tmp;
        } else {
            if (tmp.children && tmp.children.length > 0) {
                tmp = findNode(tmp.children, node, matchFunc);
                if (tmp) return tmp;
            }
        }
    }
}

export const addNode = (parent, node, index) => {
    node.parent = parent;
    parent.children = parent.children || [];
    if (index == undefined || index == null) {
        parent.children.push(node);
    } else {
        parent.children.splice(index, 0, node);
    }
}

export const deepClone = (tree, parent, mapFunc) => {
    let clone = [];
    tree.forEach((node) => {
        let newNode = {...node};
        newNode.parent = parent;
        clone.push(newNode);
        if (newNode.children) {
             let children = deepClone(node.children, newNode, mapFunc);
            newNode.children = children;
        }
        mapFunc && mapFunc(newNode);
    });
    return clone;
}

export const deepLoop = (tree, mapFunc) => {
    tree.forEach((node) => {
        mapFunc && mapFunc(node);
        if (node.children) {
            deepLoop(node.children, mapFunc);
        }
    });
}

export const deepFilter = (tree, filterFunc) => {
    let filters = [];
    tree.forEach((node) => {
        if (filterFunc) {
            let result = filterFunc(node);
            if (result != undefined || result != null) {
                filters.push(result);
            }
        }
        if (node.children) {
            filters = filters.concat(deepFilter(node.children, filterFunc));
        }
    });
    return filters;
}