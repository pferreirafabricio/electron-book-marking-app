const divEl = document.querySelector('#items');

exports.storage = JSON.parse(localStorage.getItem('readit-items')) || [];

exports.save = () => {
    localStorage.setItem('readit-items', JSON.stringify(this.storage));
}

exports.select = (e) => {
    document.getElementsByClassName('read-item selected')[0].classList.remove('selected');
    e.currentTarget.classList.add('selected');
}

exports.open((e) => {
    if (!this.storage.length) return

    let selectedtItem = document.getElementsByClassName('read-item selected')[0];
    let contentURL = selectedtItem.dataset.url;
});

exports.changeSelection = (direction) => {
    let currentItem = document.getElementsByClassName('read-item selected')[0];

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

    let divItem = document.createElement('div');
    divItem.setAttribute('class', 'read-item');
    divItem.addEventListener('click', this.select);

    let imgItem = document.createElement('img');
    imgItem.setAttribute('src', `${item.screenshot}`);

    let strongItem = document.createElement('P');
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