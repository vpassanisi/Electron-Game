"use strict";

const { app, BrowserWindow } = require("electron");
const path = require("path");
require("electron-reload")(path.join(__dirname));

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

const isDevelopment = process.env.NODE_ENV !== "production";

function createWindow() {
  const win = new BrowserWindow({
    height: 745,
    width: 1280,
    resizable: false,
  });

  win.setMenuBarVisibility(false);

  if (isDevelopment) {
    win.webContents.openDevTools();
    win.loadFile(path.join(__dirname, "index.html"));
  } else {
    win.removeMenu();
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
