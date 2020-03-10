const divEl = document.querySelector('#items');

exports.storage = JSON.parse(localStorage.getItem('readit-items')) || [];

exports.save = () => {
    localStorage.setItem('readit-items', JSON.stringify(this.storage));
}

exports.addItem = (item, isNew = fase) => {

    let divItem = document.createElement('div');
    divItem.setAttribute('class', 'read-item');

    let imgItem = document.createElement('img');
    imgItem.setAttribute('src', `${item.screenshot}`);

    let strongItem = document.createElement('P'); 
    strongItem.innerHTML = `${item.title}`; 

    divItem.appendChild(imgItem);
    divItem.appendChild(strongItem);

    divEl.appendChild(divItem);

    if (isNew) {
        this.storage.push(item);
        this.save();
    }
}

this.storage.forEach((item) => {
    this.addItem(item, false);
});