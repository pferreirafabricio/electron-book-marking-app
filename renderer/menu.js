const { remote, shell } = require('electron');

const templateMenu = [
    {
        label: 'Items',
        submenu: [
            {
                label: 'Add item',
                click: () => {
                    window.newItem();
                },
                accelerator: 'CmdOrCtrl+O',
            },
            {
                label: 'Read Item',             
                click: window.openItem,
                accelerator: 'CmdOrCtrl+Enter'
            },
            {
                label: 'Delete Item',
                click: window.deleteItem,
                accelerator: 'CmdOrCtrl+Backspace'
            },
            {
                label: 'Open in Browser',
                click: window.openItemNative,
                accelerator: 'CmdOrCtrl+Shift+E'
            },
            {
                label: 'Search Items',
                click: window.searchItem,
                accelerator: 'CmdOrCtrl+S'
            }
        ]
    },
    {
        role: 'editMenu'
    },
    {
        role: 'windowMenu'
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click: () => {
                    shell.openExternal('https://github.com/pferreirafabricio/electron-bookmarkingApp');
                }
            }
        ]
    },
];


if (process.platform === 'darwin') {
    templateMenu.unshift({
        label: remote.app.getName(),
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' },
        ]
    });
}

const menu = remote.Menu.buildFromTemplate(templateMenu);

remote.Menu.setApplicationMenu(menu);