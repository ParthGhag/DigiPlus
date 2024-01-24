const tree = document.querySelector('.tree');
const addNodeBtn = document.getElementById('add-node-btn');
const selectNodeBtn = document.getElementById('select-node-btn');
const addChildBtn = document.getElementById('add-child-btn');
const addParentBtn = document.getElementById('add-parent-btn');
let selectedNode = null;

function createNode(value, isParent = false, isChild = false) {
    const li = document.createElement('li');
    li.textContent = value;

    if (isParent) {
        li.classList.add('parent');
    }

    if (isChild) {
        li.classList.add('child');
    }

    return li;
}

function addSingleNode(value) {
    const newNode = createNode(value);
    tree.appendChild(newNode);
}

function addChildNode(value, parentNode) {
    const newNode = createNode(value, true);
    parentNode.appendChild(newNode);
}

function addParentNode(value, childNode) {
    const newNode = createNode(value, false, true);
    const parentNode = childNode.closest('li.parent');
    parentNode.parentNode.insertBefore(newNode, parentNode);
}

function handleAddNode() {
    const nodeValue = document.getElementById('node-value').value;
    if (selectedNode) {
        if (selectedNode.classList.contains('parent')) {
            addChildNode(nodeValue, selectedNode);
        } else if (selectedNode.classList.contains('child')) {
            addParentNode(nodeValue, selectedNode);
        } else {
            addSingleNode(nodeValue);
        }
    } else {
        addSingleNode(nodeValue);
    }

    document.getElementById('node-value').value = '';
}

function handleSelectNode() {
    selectedNode = document.activeElement.closest('li');
    addChildBtn.removeAttribute('disabled');
    addParentBtn.removeAttribute('disabled');
}

function handleAddChild() {
    if (selectedNode) {
        const nodeValue = document.getElementById('node-value').value;
        addChildNode(nodeValue, selectedNode);
        document.getElementById('node-value').value = '';
    }
}

function handleAddParent() {
    if (selectedNode) {
        const nodeValue = document.getElementById('node-value').value;
        addParentNode(nodeValue, selectedNode);
        document.getElementById('node-value').value = '';
    }
}

addNodeBtn.addEventListener('click', handleAddNode);
selectNodeBtn.addEventListener('click', handleSelectNode);
addChildBtn.addEventListener('click', handleAddChild);
addParentBtn.addEventListener('click', handleAddParent);

tree.addEventListener('click', (event) => {
    if (event.target.tagName.toLowerCase() === 'li') {
        selectedNode = event.target;
        selectNodeBtn.removeAttribute('disabled');
    }
});