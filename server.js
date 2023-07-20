const app = require("express")();
const CharacterAI = require("node_characterai");
const characterAI = new CharacterAI();
const run = require("child_process").exec;

(async () => {
  try {
    await characterAI.authenticateWithToken("YOUR_CHARACTERAI_AUTHTOKEN");
  } catch(err) {
    console.log(err);
  }
  const characterId = "ZLeSik-Md54f-r3iYAsRjwDWxlBkaeIojzCdASJEmx8";
  const chat = await characterAI.createOrContinueChat(characterId);
  function requestMessage(input) {
    return new Promise(async function(resolve, reject) {
      const response = await chat.sendAndAwaitResponse(input, true);
      resolve(response);
    });
  }

  app.get("/", function(req, res) {
    let input = decodeURIComponent(new URLSearchParams("?" + req.url.split("?").splice(1).join("?")).get("q")).trim();
    console.log(input)
    requestMessage(input).then((response) => {
      return res.send(response.text.toString().trim());
    });
  });
})();

process.on("uncaughtException", (err) => {
  console.log(err);
});

// Speak
function TTS(text, callback) {
  text = text.trim().replace(/'/g, "").replace(/"/g, "");
  run(`curl 'https://play.ht/api/v2/tts' -X POST -H "Content-Type: application/json" -H "accept: text/event-stream" -H 'AUTHORIZATION: Bearer YOUR_PLAYHT_APIKEY' -H 'X-USER-ID: YOUR_PLAYHT_USERID' --data-binary '{"text":"${text}","voice":"larry","quality":"premium","output_format":"mp3"}'`, function(err, result, output) {
    if (err) throw err;
    let url = "https" + (result.trim().split("\n").reverse()[0].split("https")[1] || "").split("\"")[0];
    callback(url);
  });
}

app.get("/retrieve/speak", function(req, res) {
  let text = decodeURIComponent(new URLSearchParams("?" + req.url.split("?").splice(1)).get("q")).trim();
  TTS(text.trim(), (url) => {
    res.setHeader("Content-Type", "text/plain");
    return res.send(url);
  });
});

app.get("/ask", function(req, res) {
  return res.sendFile(__dirname + "/src/ask.html");
});

app.listen(2876);