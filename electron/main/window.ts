import { BrowserWindow, shell } from "electron";
import { join } from "node:path";
import { appConfig } from "./config";

process.env.DIST_ELECTRON = join(__dirname, "..");
process.env.DIST = join(process.env.DIST_ELECTRON, "../dist");
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, "../public")
  : process.env.DIST;

// Here, you can also use other preload
const preload = join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, "index.html");

// async function that returns a promise
export const createWindow = async () => {
  let dim = appConfig.get("mainWindowDimension");
  let pos = appConfig.get("mainWindowPosition");

  const win = new BrowserWindow({
    title: "AuTool",
    transparent: false,
    show: true,
    hasShadow: true,

    frame: true,
    resizable: true,
    closable: true,
    minWidth: 590,
    minHeight: 40,

    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#ffffff",
      symbolColor: "#74b1be",
      height: 30,
    },

    x: pos.x,
    y: pos.y,
    width: dim.width,
    height: dim.isCollapsed ? 40 : dim.height,

    icon: join(process.env.PUBLIC, "favicon.ico"),
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Set taskBar icon on the top of the screen
  if (dim.isCollapsed) {
    win.setAlwaysOnTop(true, 'floating', 1)
    win.setWindowButtonVisibility(false)
    win.setResizable(false)
  }

  if (process.env.VITE_DEV_SERVER_URL) {
    // electron-vite-vue#298
    win.loadURL(url);
    // Open devTool if the app is not packaged
    win.webContents.openDevTools();
  } else {
    win.loadFile(indexHtml);
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });
  // win.webContents.on('will-navigate', (event, url) => { }) #344
  return win;
};
