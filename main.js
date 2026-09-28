const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const os = require("os");

function createWindow() {
  const isMac = os.platform() === "darwin";

  const win = new BrowserWindow({
    width: 1000,
    height: 400,
    minWidth: 600,
    minHeight: 400,
    backgroundColor: "#00000000",
    resizable: true,
    frame: false,
    autoHideMenuBar: true,
    transparent: true,
    vibrancy: isMac ? "appearance-based" : undefined,
    visualEffectState: isMac ? "active" : undefined,
    roundedCorners: true,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  win.loadFile("index.html");

  ipcMain.on("minimize", () => {
    win.minimize();
  });

  ipcMain.on("close", () => {
    win.close();
  });

  ipcMain.on("fullscreen", () => {
    if (win.isMaximized()) {
      // Exit maximized state and explicitly restore the desired size
      win.unmaximize();

      // Give the window its normal size again
      win.setSize(1000, 400);

      // Optional: center it after restoring
      win.center();
    } else {
      // Maximize
      win.maximize();
    }
  });
}

Menu.setApplicationMenu(null);

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});