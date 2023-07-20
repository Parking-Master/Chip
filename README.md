# Chip
Chip is a personal AI desk robot powered by Character.AI and Node.js.

## Documentation
As in the description, this is a __personal__ project for myself. I made it public though for anyone else who would like to try this project.

### Prerequisites
- A speaker
- A microphone
- 2 Computers with either Linux, Windows or MacOS
- Node.js
- NPM
- ElectronJS
- Command access (no root or admin required)
- Python 3.8>

### Quickstart
_Make sure you have all of the prerequisites before starting._

Run the following commands in your terminal or CMD prompt to get started:
```bash
mkdir Chip
npm install node_characterai --save
npm install electron --save
npm install express --save
```

### Physical hardware and body
<kbd>
  <img src="https://github.com/Parking-Master/Chip/assets/88283567/55c3ccfd-ae6c-4102-9b84-1932a38e752b" alt="3D version of Chip">
  <h2 align="center">A 3D version of Chip</h2>
</kbd>

Chip's "physical hardware" is about $30-$40 total. You can customize your own hardware but this is the default:
- MOGOOD USB 2.0 splitter cable ([$6.99](https://www.amazon.com/Splitter-MOGOOD-Extension-Charging-Multiport/dp/B098L7WJ4C))
- Tkgou UM6 USB 2.0 gooseneck microphone ([$11.99](https://www.amazon.com/TKGOU-USB-PC-Microphone-Microphones/dp/B07D561S67/ref=sr_1_1?crid=1C0UFS5H6SZ7K&keywords=tkgou+um6&qid=1689864257&s=electronics&sprefix=tkgou+%2Celectronics%2C123&sr=1-1))
- UCTRONICS 7" x 4" Touch screen monitor (mine was free because it was laying around the house, [$59.99](https://www.amazon.com/UCTRONICS-Raspberry-1024%C3%97600-Capacitive-Touchscreen/dp/B07VWDDWQ9/ref=sr_1_4?crid=TVLT65V3K4JQ&keywords=uctronics+touch+screen&qid=1689865374&s=electronics&sprefix=uctronics+touch+screen%2Celectronics%2C130&sr=1-4))
- Raspberry Pi Zero 2 (W) with Headers kit by Vilros ([$50.00]([https://vilros.com/products/raspberry-pi-zero-2-w)](https://vilros.com/products/vilros-raspberry-pi-zero-2-w-basic-starter-kit)https://vilros.com/products/vilros-raspberry-pi-zero-2-w-basic-starter-kit))

#### The following are parts I found around my home, their brand is unidentical:
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
2. Run this command in your terminal or CMD prompt (replace "{YourUsername}" with your name):<br>
   `$ git clone https://github.com/{YourUsername}/Chip`
3. Go into the directory via GUI or CLI
4. In the current folder, open your text editor and go to Chip.js line 73
5. Change `play` in `run("play ...")` to whatever command your system uses to play audio files
6. Still in the same folder, run this command (see [this](#prerequisites)):<br>
   `$ npm test`
7. Chip should be active and you should see two blinking eyes.

_There are still a couple more steps!_

#### AI and voice host
Since my Raspberry Pi Zero is too slow to run `node_characterai` or generate AI speech, I host those two things on a _different_ computer and let the pi easily access it.

If you think your computer can handle everything on it's own, go to Chip.js line 36 and change `HOST` to "localhost".
