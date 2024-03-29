# Chip
Chip is a personal AI desk robot powered by Character.AI and Node.js.

## Documentation
As in the description, this is a __personal__ project for myself. I made it public though for anyone else who would like to try this project.

### Prerequisites
- A play.ht account
- A Character.AI account
- A speaker
- A microphone
- Any computer with either Linux, Windows or MacOS
- Node.js
- NPM
- ElectronJS
- Command access (no root or admin required)
- Python 3.8>

### Quickstart
_Make sure you have all of the prerequisites before starting._

#### Host and client computer
Please take an important note of this before beginning.

If you are using two computers to host this project (one that generates AI messages and speech, the other that requests it) then you will need to see this before starting.

- The "Host" computer will be the computer that hosts AI generated speech and text.
- The "Client" computer will be the physical robot requesting speech generation or text when needed.

If you just want to use one computer (if it can handle hosting and serving at the same time) then the "Host" and the "Client" will just be your computer.

Now that that's out of the way, you can get started.

#### Get started
Run the following commands in your terminal or CMD prompt to get started:
```bash
mkdir Chip
cd Chip
npm install node_characterai --save
npm install electron --save
npm install express --save
npm install v8-compile-cache --save
pip3 install SpeechRecognition
```

This will install `node_characterai`, `electron`, `express`, `v8-compile-cache`, and `SpeechRecognition` (for python).<br>
_Note: The installation may take a while._

It will also create a directory `Chip` which will soon include:
```
node_modules - The NPM packages required for the project
Chip - A cloned directory that includes this entire repo
```

Once the installation finishes, head over to the [Software setup](#software-setup) section to quickly set up the bot.

### Physical hardware and body
<kbd>
  <img src="https://github.com/Parking-Master/Chip/assets/88283567/34a6f3b9-7f76-487c-a3a9-cdc7996bd386" alt="3D version of Chip">
  <h2 align="center">A 3D version of Chip</h2>
</kbd>

Chip's "physical hardware" is about $30-$40 total. You can customize your own hardware but this is the default:
- MOGOOD USB 2.0 splitter cable ([$6.99](https://www.amazon.com/Splitter-MOGOOD-Extension-Charging-Multiport/dp/B098L7WJ4C))
- Tkgou UM6 USB 2.0 gooseneck microphone ([$11.99](https://www.amazon.com/TKGOU-USB-PC-Microphone-Microphones/dp/B07D561S67/ref=sr_1_1?crid=1C0UFS5H6SZ7K&keywords=tkgou+um6&qid=1689864257&s=electronics&sprefix=tkgou+%2Celectronics%2C123&sr=1-1))
- UCTRONICS 7" x 4" Touch screen monitor (mine was free because it was laying around the house, [$59.99](https://www.amazon.com/UCTRONICS-Raspberry-1024%C3%97600-Capacitive-Touchscreen/dp/B07VWDDWQ9/ref=sr_1_4?crid=TVLT65V3K4JQ&keywords=uctronics+touch+screen&qid=1689865374&s=electronics&sprefix=uctronics+touch+screen%2Celectronics%2C130&sr=1-4))
- Raspberry Pi Zero 2 (W) with Headers kit by Vilros ([$50.00](https://vilros.com/products/vilros-raspberry-pi-zero-2-w-basic-starter-kit))

#### The following are parts I found around my home, their brand is unidentifiable:
- 5" x 5" black computer cooling fan
- A small black micro-usb cable

If you have an idea of what brand they are, let me know in the "Issues" section!

### Exterior body
I used basic balsa wood with the following measurements:

[X Left/Right-side] 7.5" x 3.5" x 1/8"<br>
[Y Top/Bottom ariel] 3" x 4" x 1/8"<br>
[Z Front/Back-side] 7.5" x 5.5" x 1/8"

### Software setup
The software is easy to set up.

1. "Fork" this repository at the top right of this page
2. Run this command in your terminal or CMD prompt (replace "{YourUsername}" with your GitHub username):<br>
   `$ git clone https://github.com/{YourUsername}/Chip`
3. Go into the directory with:<br>
   `$ cd Chip`
5. In the current folder, open your text editor and go to Chip.js line 84
6. Change the `play` command in `run("play ...")` to whatever command your system uses to play audio files
7. Now run this command in the same folder (for electron):
   ```bash
   $ npm init -y; echo $(cat package.json | sed -r 's/echo/electron \./g') > package.json
   ```
8. Still in the same folder, run this command (see [this](#prerequisites)):<br>
   `$ npm test`
9. Chip should be active and you should see two blinking eyes.

_There are still a couple more steps!_

#### AI and voice host
Since my Raspberry Pi Zero is too slow to run `node_characterai` or generate AI speech, I host those two things on a _different_ computer and let the pi easily access it.

Like mentioned before, the "Host" computer will be any computer that is able to host the AI speech and text generation, while the "Client" will be the robot you are building that requests the speech and text generation (from your Host).

##### Self hosting
If you think your computer can handle everything on it's own, go to Chip.js line 36 and change "YOUR_HOST_IP to "localhost".

Then go to [Finishing the project](#finishing-the-project) when you're done.

##### Seperate hosting
If you would like to run on two seperate computers, upload the Host.js file to the host computer and run:
```bash
$ node Host.js
```

Then on the client computer (running Chip.js, not Host.js), open your text editor and go to Chip.js line 36, and change "YOUR_HOST_IP" to the host computer's IPv4 address (no port included, just the IP).

Now if you completed everything, finish the project below.

#### Finishing the project
For the final steps of setup, you need to provide your play.ht and Character.AI auth tokens (for AI speech and chat).

1. Go to the __host__ computer
2. Get both of your Play.ht tokens [here](https://play.ht/app/api-access)
3. Then get your Character.AI auth token from [these docs](https://github.com/realcoloride/node_characterai#using-an-access-token)
4. Go to "Host.js" line 6 and fill in the Character.AI auth token variable
5. Now on the same file, go to line 7 and 8 and fill in the variables with your Play.ht tokens

Now to start the Chip.js bot, use the following command on the __client__ computer:
```bash
$ npm test
```

You should see _two blinking eyes_ when the script starts. If you see this, there are no errors, and the web server's pages are loading, then it works.

That's it! If everything was successful, then you just built a physical AI robot!

If something didn't work, please report it in the "Issues" section and I'll respond!

#### Local web server
If your client (Chip.js) is running on Linux (Debian, Ubuntu, etc.) you can go to its IP address on port 2876 or 2877 and monitor the CPU temperature while running. With nothing running in the background except the terminal and the script, the CPU temperature should be around 95&#176;F - 130&#176;F.

The host computer's script (Host.js) should also host a server on port 2876 or 2877 with the following pages:

<kbd>/ask</kbd> - A simple page to talk to the bot directly<br>
<kbd>/</kbd> - Send a parameter (`?q=This is my text!`) that will generate AI text<br>
<kbd>/retrieve/speak</kbd> - Send a parameter (`?q=AI speech`) to generate speech

And the client computer's script should be hosting the following pages on its IP address on port 2876 or 2877:

<kbd>/cpu</kbd> - A page that returns the client's CPU temp (in farenheit)<br>
<kbd>/speak</kbd> - Send a parameter (`?q=This is my text!`) to talk to the bot directly

### Customization
You can customize the face (in HTML form) in "face.html".

You can customize any of the hardware to fit your style.

You can customize Chip's sleep schedule in Chip.js line 64 (sleep) and 67 (wake).

Here's my Chip (without the exterior):
<kbd><img src="https://github.com/Parking-Master/Chip/assets/88283567/7ec24ff8-bd33-472d-97bd-036ba98f238c"></kbd>

# License
MIT
