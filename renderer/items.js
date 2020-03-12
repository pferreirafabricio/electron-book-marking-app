const fs = require('fs');
const { shell } = require('electron');

let readerJS;
fs.readFile(`${__dirname}/reader.js`, (err, data) => {
    readerJS = data.toString();
});

exports.storage = JSON.parse(localStorage.getItem('readit-items')) || [];

window.addEventListener('message', (e) => {
    if (e.data.action === 'delete-read-item') {
        this.delete(e.data.itemIndex);

        e.source.close();
    }
});

exports.delete = (indexItem) => {
    const divEl = document.querySelector('#items');
    divEl.removeChild(divEl.childNodes[indexItem]);

    this.storage.splice(indexItem);
    this.save();

    if (this.storage.length) {
        let newSelectedItem = (indexItem === 0) ? 1 : indexItem - 1;
        document.getElementsByClassName('read-item')[newSelectedItem].classList.add('selected');
    }
}

exports.getSelectedItem = () => {
    let currentItem = document.getElementsByClassName('read-item selected')[0];

    let itemIndex = 0;
    let child = currentItem;
    while ((child = child.previousSibling) != null) itemIndex++;

    return { node: currentItem, index: itemIndex }
}

exports.save = () => {
    localStorage.setItem('readit-items', JSON.stringify(this.storage));
}

exports.select = (e) => {
    this.getSelectedItem().node.classList.remove('selected');
    e.currentTarget.classList.add('selected');
}

exports.open = ((e) => {
    if (!this.storage.length) return

    let selectedtItem = this.getSelectedItem();
    let contentURL = selectedtItem.node.dataset.url;
    let readerWin = window.open(contentURL, '', `
        maxWidth=2000,
        maxHeight=2000,
        width=1200,
        height=800,
        x=0,
        backgroundColor=#DEDEDE,
        nodeIntegration=0,
        contextIsolation=1
    `);

    readerWin.eval(readerJS.replace('{index}', selectedtItem.index));
});

exports.openNative = () => {
    if (!this.storage.length) return

    let selectedItem = this.getSelectedItem();
    shell.openExternal(selectedItem.node.dataset.url);
}

exports.changeSelection = (direction) => {
    let currentItem = this.getSelectedItem().node;

    if (direction === 'ArrowUp' && currentItem.previousSibling) {
        currentItem.classList.remove('selected');
        currentItem.previousSibling.classList.add('selected');
    }
    else if (direction === 'ArrowDown' && currentItem.nextSibling) {
        currentItem.classList.remove('selected');
        currentItem.nextSibling.classList.add('selected');
    }
}

exports.addItem = (item, isNew = fase) => {
    const divEl = document.querySelector('#items');

    let divItem = document.createElement('div');
    divItem.setAttribute('class', 'read-item');
    divItem.setAttribute('data-url', item.url);
    divItem.addEventListener('click', this.select);
    divItem.addEventListener('dblclick', this.open);

    let imgItem = document.createElement('img');
    imgItem.setAttribute('src', `${item.screenshot}`);

    let strongItem = document.createElement('p');
    strongItem.innerHTML = `${item.title}`;

    divItem.appendChild(imgItem);
    divItem.appendChild(strongItem);

    divEl.appendChild(divItem);

    if (document.getElementsByClassName('read-item').length === 1) {
        divItem.classList.add('selected');
    }

    if (isNew) {
        this.storage.push(item);
        this.save();
    }
}

this.storage.forEach((item) => {
    this.addItem(item, false);
});