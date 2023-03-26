const { contextBridge, ipcRenderer } = require("electron");

const preload = {
  store: {
    get(key: string) {
      return ipcRenderer.sendSync("electron-store-get", key);
    },
    set(property: string, val: any) {
      ipcRenderer.send("electron-store-set", property, val);
    },
  },
};

export type Preload = typeof preload;

contextBridge.exposeInMainWorld("electron", preload);
