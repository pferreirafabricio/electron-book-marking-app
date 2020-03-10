const { app, BrowserWindow } = require('electron');

let mainWindow;

createMainWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1600, height: 900,
        webPreferences: {
            nodeIntegration: false
        }
    });

    mainWindow.loadFile('./index.html')

    mainWindow.webContents.openDevTools();
}

app.whenReady().then(createMainWindow);

