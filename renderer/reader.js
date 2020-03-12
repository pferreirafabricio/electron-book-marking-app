let divEl = document.createElement('div');
divEl.innerHTML = 'Done';

divEl.style.position = 'fixed';
divEl.style.bottom = '15px';
divEl.style.right = '15px';
divEl.style.padding = '5px 10px';
divEl.style.fontSize = '20px';
divEl.style.fontWeight = 'bold';
divEl.style.backgroundColor = 'darkturquoise';
divEl.style.color = '#fff';
divEl.style.borderRadius = '5px';
divEl.style.cursor = 'default';
divEl.style.boxShadow = '2px 2px 2px rgba(0, 0, 0, 0.2)';
divEl.style.msUserSelect = 'none';

divEl.addEventListener('click', () => {
    window.opener.postMessage({
        action: 'delete-read-item',
        itemIndex: {index},
    }, '*');
});

document.getElementsByTagName('body')[0].appendChild(divEl);