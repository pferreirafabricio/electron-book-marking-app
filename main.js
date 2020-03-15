const { app, BrowserWindow, ipcMain } = require('electron');
const windowStateKeeper = require('electron-window-state');
const readItem = require('./readItem');
const updater = require('./updater');

let mainWindow;
// let urlWindow;

ipcMain.on('new-item', (e, itemUrl) => {
  readItem(itemUrl, (item) => {
    e.sender.send('new-item-success', item);
  });
});

createMainWindow = () => {

  setTimeout(updater, 3000);

  let stateWindow = windowStateKeeper({
    defaultWidth: 500, defaultHeight: 650,
  });

  mainWindow = new BrowserWindow({
    x: stateWindow.x, y: stateWindow.y,
    width: stateWindow.width, height: stateWindow.height,
    minWidth: 350, maxWidth: 650, minHeight: 300,
    webPreferences: {
      nodeIntegration: true
    },
    icon: __dirname + '/build/logo.ico', 
  });

  stateWindow.manage(mainWindow);

  mainWindow.loadFile('./renderer/main.html');
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