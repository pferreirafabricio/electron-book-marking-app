const { BrowserWindow } = require('electron');

let offscreenWindow;

module.exports = (url, callback) => {
    offscreenWindow = new BrowserWindow({
        width: 500, height: 500,
        show: false,
        webPreferences: {
            nodeIntegration: false,
            offscreen: true
        }
    });

    offscreenWindow.loadURL(url);

    offscreenWindow.webContents.on('did-finish-load', async (e) => {
        let title = offscreenWindow.getTitle();

        let imageCaptured = await offscreenWindow.webContents.capturePage();
        let screenshot = imageCaptured.toDataURL();

        callback({ title, screenshot, url });

        offscreenWindow.close();
        offscreenWindow = null;
    });
};