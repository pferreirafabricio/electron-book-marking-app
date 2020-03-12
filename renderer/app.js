const { ipcRenderer } = require('electron');
const items = require('./items');

const showModal = document.getElementById('show-modal');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');
const addItem = document.getElementById('add-item');
const itemUrl = document.getElementById('url');
const search = document.getElementById('search');

search.addEventListener('keyup', (e) => {
    console.log(Array.from(document.getElementsByClassName('read-item')));
    Array.from(document.getElementsByClassName('read-item')).forEach((item) => {
        let hasMatch = item.innerHTML.toLowerCase().includes(search.value);
        item.style.display = hasMatch ? 'flex' : 'none';
    });
});

window.newItem = () => {
    showModal.click();
}

window.openItem = items.open;

window.deleteItem = () => {
    let selectedItem = items.getSelectedItem();
    items.delete(selectedItem.index);
}

window.openItemNative = items.openNative;

window.searchItem = () => {
    search.focus();
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        items.changeSelection(e.key);
    }
});

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
    items.addItem(item, true);

    toggleModalButtons();

    modal.style.display = 'none';
    itemUrl.value = '';
});