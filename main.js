const { app, BrowserWindow } = require('electron');

let mainWindow;

createMainWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1600, height: 900,
        webPreferences: {
            nodeIntegration: false 
        }
    });

    mainWindow.loadURL('https://github.com')

    //mainWindow.webContents.openDevTools();
}

app.whenReady().then(createMainWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })