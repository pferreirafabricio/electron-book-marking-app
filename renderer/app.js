const { ipcRenderer } = require('electron');

const showModal = document.getElementById('show-modal');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');
const addItem = document.getElementById('add-item');
const itemUrl = document.getElementById('url');

toggleModalButtons = () => {
    if (addItem.disabled) {
        addItem.disabled = false;
        addItem.style.opcatity = 1;
        addItem.innerHTML = 'Add Item'
        closeModal.style.display = 'inline';
    }
    else {
        addItem.disabled = true;
        addItem.style.opcatity = 0.5;
        addItem.innerHTML = 'Adding...'
        closeModal.style.display = 'none';
    }
}

showModal.addEventListener('click', e => {
    modal.style.display = 'flex';
    itemUrl.focus();
});

closeModal.addEventListener('click', e => {
    modal.style.display = 'none';
});

addItem.addEventListener('click', e => {
    if (itemUrl.value) {
        ipcRenderer.send('new-item', itemUrl.value);
        toggleModalButtons();
    }
});

itemUrl.addEventListener('keyup', e => {
    if (e.key == 'Enter') addItem.click()
});

ipcRenderer.on('new-item-success', (e, item) => {
    console.log(item);
    toggleModalButtons();
    
    // modal.style.display = 'none';
    itemUrl.value = '';
});