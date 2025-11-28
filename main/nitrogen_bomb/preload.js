// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  windowControl: (action) => ipcRenderer.send('window-control', action),
      saveOnboarding: () => ipcRenderer.send("save-onboarding"),
    checkOnboarding: () => ipcRenderer.invoke("check-onboarding")
});

contextBridge.exposeInMainWorld("startedAPI", {
  saveOnboarding: (data) => ipcRenderer.send("save-onboarding", data)
});

contextBridge.exposeInMainWorld("attendyAPI", {
  updateStatus: (payload) => ipcRenderer.invoke("update-status", payload),
  getTeacherAttendanceList: () => ipcRenderer.invoke("get-teacher-attendance")
});

window.electronAPI.saveOnboarding(selectedRole);
