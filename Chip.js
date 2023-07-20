/* Copyright (c) 2023 Parking Master / Chip.js

* Only change this file for update usage, hardware modifications, and testing purposes!
* Chip.js

*/

const { app, BrowserWindow, globalShortcut } = require("electron");
const application = require("express")();
const run = require("child_process").exec;
const { getAudioDurationInSeconds } = require("get-audio-duration");
const fs = require("fs");

require("v8-compile-cache");

application.get("/cpu", function(req, res) {
  run("cat /sys/class/thermal/thermal_zone0/temp", (error, result) => {
    return res.send(((((result.trim() - 0) / 1000) * 1.8) + 32).toString() + "* F");
  });
});

application.get("/speak", function(req, res) {
  let message = decodeURIComponent(new URLSearchParams("?" + req.url.split("?").pop()).get("q")).trim();
  fs.writeFile("spch_to_text.txt", message, (err) => {
    if (err) throw err;
    return res.end();
  });
});

// Global variables
let mainWindow = null;
let phrases = [];
let sleep = false;
let listen = true;
let face = true;
let HOST = "YOUR_HOST_IP";
let PORT = 2876;
let HOST_PORT = PORT;

// Change port if the host and client are the same IP
if (HOST == "localhost") {
  PORT++;
  run("node Host.js");
}

// Initialize UI
if (face) app.on("ready", function() {
  app.commandLine.appendSwitch('enable-features', 'WebSpeechAPI');
  globalShortcut.register("CommandOrControl+X", () => {
    app.quit();
  });
  const window = new BrowserWindow({
    fullscreen: true,
    frame: false,
    hasShadow: false
  });
  window.show();
  window.loadFile("./screen.html");
  mainWindow = window;
});

// Forever running processes
setInterval(() => {
  if ((new Date()).getHours() == 20 && (new Date()).getMinutes() == 30) {
    if (!sleep) sleep = true, run("xscreensaver-command -activate");
  }
  if ((new Date()).getHours() == 7 && (new Date()).getMinutes() == 30) {
    if (sleep) sleep = false, run("xscreensaver-command -deactivate");
  }
}, 10000);
 
function speak(input) {
  input = input.replace(/\"/gi, "'");
  getScript(`http://${HOST}:${HOST_PORT}/retrieve/speak?q=${encodeURIComponent(input.trim())}`).then((url) => {
    run(`: > output.mp3; curl ${url.trim()} >> output.mp3`);
  });
  let report = false;
  fs.watchFile("output.mp3", () => {
    if (report) return;
    report = true;
    setTimeout(() => {
      run("play ./output.mp3");
      if (face) {
        getAudioDurationInSeconds("output.mp3").then((duration) => {
          console.log(duration);
          duration = duration - 0;
          let end = false;
          let run = setInterval(() => {
            mainWindow.webContents.executeJavaScript(`
            setWidthOfMouth(${Math.floor(Math.random() * 1000000)}, ${end});
            `);
          }, 100);
          setTimeout(() => (end = true, setTimeout(() => clearInterval(run), 100)), duration * 1000);
        });
      }
    }, 2000);
  });
}

const getScript = (url) => {
  return new Promise((resolve, reject) => {
    const http = require("http");
    const https = require("https");
    let client = http;
    if (url.toString().indexOf("https") === 0) {
      client = https;
    }
    client.get(url, (resp) => {
      let data = "";
      resp.on("data", (chunk) => {
        data += chunk;
      });
      resp.on("end", () => {
        resolve(data);
      });
    }).on("error", (err) => {
      reject(err);
    });
  });
};


(async () => {
  async function messanger(message) {
    getScript("http://" + HOST + ":" + HOST_PORT + "/?q=" + encodeURIComponent(message)).then((response) => {
      console.log(response);
      speak(response);
    });
  }

  run("python3 listen.py");
  console.log("Listening...");

  fs.watchFile("spch_to_text.txt", () => {
    console.log("recieved message");
    let text = fs.readFileSync("spch_to_text.txt", "utf8");
    text = text.toLowerCase().trim();
    // if (text && text.length > 5) messanger(text);
    if (text.trim() == "no audio") {
      console.log("The listener heard audio, but could not parse any text...");
    } else messanger(text);
  });
})();

application.listen(PORT);
