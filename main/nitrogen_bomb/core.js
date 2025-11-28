const { app, BrowserWindow, ipcMain } = require("electron");

//path finder specifically for main folder since we use a custom 
const path = require('path');
const axios = require("axios");

const Store = require('electron-store');
const store = new Store();



 

// FOR WINDOWS 
let startedMain;
let dashboardMain;

// If the Tool is under Development
const Dev = process.env.NODE_ENV !== 'development';
const electronReload = require('electron-reload');
electronReload(__dirname); // Watches the current directory for changes 

//============================================//
// App behaviors

// Helper: check onboarding completed
function hasOnboarded() {
    return store.get("onboardingDone", false);
}

function setOnboarded() {
    store.set("onboardingDone", true);
}


// IPC (Inter-Process Communication) handlers for window control
ipcMain.on('window-control', (event, action) => {
  // get the BrowserWindow that sent the IPC
  const win = BrowserWindow.fromWebContents(event.sender);
  if (!win || win.isDestroyed()) return;

  switch (action) {
    case 'minimize':
      win.minimize();
      break;
    case 'maximize':
      if (win.isMaximized()) win.unmaximize();
      else win.maximize();
      break;
    case 'close':
      win.close();
      break;
    default:
      console.warn('Unknown window action:', action);
  }

  if (win.isMaximized()) win.send('window-control-signal');

});

//Yeah whatever the fuck is this as soon as it works
ipcMain.on("save-onboarding", async (event, data) => {
  try {
    await axios.post("http://127.0.0.1:8000/onboarding", data);
    startedMain.close();
    dashboardWindow();
  } catch (e) {
    console.error("There was a problem parsing the following codes: ", e);
  }
});
//====================================================================//
//For Creating windows'


function startedWindow() {
  startedMain = new BrowserWindow({
    title: 'attendy tst',
    width: 500,
    height: 650,
    titleBarStyle: 'hidden', //Hide default window frame
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "../nitrogen_bomb/preload.js"),
      contextIsolation: true,
      nodeIntegration: false

    }
  });

  //Development here
  if (Dev) {
    startedMain.webContents.openDevTools();
  }
  // End of Development here

  //load the Main file
  startedMain.loadFile(path.join(__dirname, '../package/started.html'));

  // Event handler for when the main window is closed
  startedMain.on("closed", () => {
    startedMain = null;
  });
}

function dashboardWindow() {
  dashboardMain = new BrowserWindow({
    titleBarStyle: 'hidden', //Hide default window frame
    width: 900,
    height: 900,
    minHeight: 750,
    minWidth: 900,
    webPreferences: {
      preload: path.join(__dirname, "../nitrogen_bomb/preload.js"), // Load preload script
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  dashboardMain.loadFile(path.join(__dirname, '../package/dashboard/index.html'));
  // Load your second HTML file

  //Development here
  if (Dev) {
    dashboardMain.webContents.openDevTools();
  }
  // End of Development here
}
//====================================================================//

//--- WHEN APPLICATION IS GONNA LUNCH  ---//

//If ready then go
app.whenReady().then(() => {
  if (hasOnboarded()) {
    dashboardWindow();
  } else {
    startedWindow();
  }
});

