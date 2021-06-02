// utilites
const path = require('path');

// constants
const port = 3000;

// web server
const express = require('express');
const app = express();

// waveform handler
const SoundManager = require('./soundManager.js');

// parse application/json
app.use(express.json())

// statically serve UI
app.use(express.static(path.join(__dirname, '..', 'ui')));

// generate basic waveform
app.post('/generate', function (req, res) {
  console.log('recv POST /generate request');
  console.log(`${req.body.waveShape} sample rate ${req.body.sampleRate} depth ${req.body.bitDepth} freq ${req.body.frequency} amp ${req.body.amplitude}`);
  const path = SoundManager.generate(req.body);
  res.download(path);
});

app.listen(port, () => {
  console.log(`Soundscape server listening at http://localhost:${port}`)
});