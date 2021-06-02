const WaveFile = require('wavefile').WaveFile;
const fs = require('fs');

module.exports = {
  generate
};

let wav = new WaveFile();

function generatePath(options) {
  if (!fs.existsSync('./waves/')) {
    fs.mkdirSync('waves');
  }
  return `./waves/${options.waveShape}_${options.sampleRate}_${options.bitDepth}_${options.frequency}_${options.amplitude}.wav`;
}

function generateData(options) {
  const nSamples = Math.trunc(options.sampleRate/options.frequency);
  const amp = options.amplitude*Math.pow(2, options.bitDepth)/2-1;
  const omega = 2*Math.PI*options.frequency;
  var a = new Array(nSamples);
  for (var i = 0; i < nSamples; i++) {
    a[i] = Math.trunc(amp*Math.sin(omega * i/options.sampleRate));
  }
  return a;
}

function generate(options) {
  const path = generatePath(options);
  if (!fs.existsSync(path)) {
    wav.fromScratch(1, 
      options.sampleRate, 
      options.bitDepth, 
      generateData(options)
    );
    fs.writeFileSync(path, wav.toBuffer());
  }
  return path;
}