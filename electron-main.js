/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { app, BrowserWindow } = require("electron");
const path = require("path");
const express = require("express");
const cors = require("cors");

const localServerApp = express();
const PORT = 5173;

const startLocalServer = (done) => {
  localServerApp.use(express.json({ limit: "100mb" }));
  localServerApp.use(cors());
  localServerApp.use(express.static("./build/"));
  localServerApp.listen(PORT, () => {
    console.log("Server Started on PORT ", PORT);
    done();
  });
};

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, "public", "border.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadURL('http://localhost:3000');

  mainWindow.maximize();
}

app.whenReady().then(() => {
  startLocalServer(createWindow);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
