import AudioSynthInstrument from './AudioSynthInstrument';

export default class AudioSynth {
  _debug = false;
  _bitsPerSample = 16;
  _channels = 1;
  _sampleRate = 44100
  _volume = 32768;
  _notes = {
    'C': 261.63,
    'C#': 277.18,
    'D':293.66,
    'D#':311.13,
    'E':329.63,
    'F':349.23,
    'F#':369.99,
    'G':392.00,
    'G#':415.30,
    'A':440.00,
    'A#':466.16,
    'B':493.88
  }
  _fileCache = [];
  _temp = {};
  _sounds = [];
  _mod = [function(i,s,f,x){return Math.sin((2 * Math.PI)*(i/s)*f+x);}]

  constructor() {
    this._resizeCache();
  }

  setSampleRate(v) {
    this._sampleRate = Math.max(Math.min(v|0, 44100), 4000);
    this._clearCache();
    return this._sampleRate;
  }

  getSampleRate() {
    return this._sampleRate;
  }

  _resizeCache() {
    const f = this._fileCache;
    const l = this._sounds.length;

    while (f.length < l) {
      const octaveList = [];
      for (let i = 0; i < 8; i++) {
        const noteList = {};
        for (let k in this._notes) {
          noteList[k] = {};
        }
        octaveList.push(noteList);
      }
      f.push(octaveList);
    }
  }

  _clearCache() {
    this._fileCache = [];
    this._resizeCache();
  }

  generate(sound, note, octave, duration) {
		var thisSound = this._sounds[sound];
		if(!thisSound) {
			for(var i=0;i<this._sounds.length;i++) {
				if(this._sounds[i].name==sound) {
					thisSound = this._sounds[i];
					sound = i;
					break;
				}
			}
		}
		if(!thisSound) { throw new Error('Invalid sound or sound ID: ' + sound); }
		var t = (new Date).valueOf();
		this._temp = {};
		octave |= 0;
		octave = Math.min(8, Math.max(1, octave));
		var time = !duration?2:parseFloat(duration);
		if(typeof(this._notes[note])=='undefined') { throw new Error(note + ' is not a valid note.'); }
		if(typeof(this._fileCache[sound][octave-1][note][time])!='undefined') {
			if(this._debug) { console.log((new Date).valueOf() - t, 'ms to retrieve (cached)'); }
			return this._fileCache[sound][octave-1][note][time];
		} else {
			var frequency = this._notes[note] * Math.pow(2,octave-4);
			var sampleRate = this._sampleRate;
			var volume = this._volume;
			var channels = this._channels;
			var bitsPerSample = this._bitsPerSample;
      var attack = thisSound.attack(sampleRate, frequency, volume);
      var dampen = thisSound.dampen(sampleRate, frequency, volume);
			var waveFunc = thisSound.wave;
			var waveBind = {modulate: this._mod, vars: this._temp};
			var val = 0;
			var curVol = 0;

			var data = new Uint8Array(new ArrayBuffer(Math.ceil(sampleRate * time * 2)));
			var attackLen = (sampleRate * attack) | 0;
      var decayLen = (sampleRate * time) | 0;

			for (var i = 0 | 0; i !== attackLen; i++) {
		
				val = volume * (i/(sampleRate*attack)) * waveFunc.call(waveBind, i, sampleRate, frequency, volume);

				data[i << 1] = val;
				data[(i << 1) + 1] = val >> 8;

			}

			for (; i !== decayLen; i++) {

				val = volume * Math.pow((1-((i-(sampleRate*attack))/(sampleRate*(time-attack)))),dampen) * waveFunc.call(waveBind, i, sampleRate, frequency, volume);

				data[i << 1] = val;
				data[(i << 1) + 1] = val >> 8;

      }
      
      var pack = function(c,arg) {
        return [
          new Uint8Array([arg, arg >> 8]),
          new Uint8Array([arg, arg >> 8, arg >> 16, arg >> 24])
        ][c];
      };

			var out = [
				'RIFF',
				pack(1, 4 + (8 + 24/* chunk 1 length */) + (8 + 8/* chunk 2 length */)), // Length
				'WAVE',
				// chunk 1
				'fmt ', // Sub-chunk identifier
				pack(1, 16), // Chunk length
				pack(0, 1), // Audio format (1 is linear quantization)
				pack(0, channels),
				pack(1, sampleRate),
				pack(1, sampleRate * channels * bitsPerSample / 8), // Byte rate
				pack(0, channels * bitsPerSample / 8),
				pack(0, bitsPerSample),
				// chunk 2
				'data', // Sub-chunk identifier
				pack(1, data.length * channels * bitsPerSample / 8), // Chunk length
				data
      ];
			var blob = new Blob(out, {type: 'audio/wav'});
			var dataURI = URL.createObjectURL(blob);
			this._fileCache[sound][octave-1][note][time] = dataURI;
      if(this._debug) { console.log((new Date).valueOf() - t, 'ms to generate'); }
			return dataURI;
		}
  }
  
  play(sound, note, octave, duration) {
    const src = this.generate(sound, note, octave, duration);
    const audio = new Audio(src);
    audio.play();
    return true;
  }

  debug() {
    this._debug = true;
  }

  createInstrument(sound) {
    var n = 0;
		var found = false;
		if(typeof(sound)=='string') {
			for(var i=0;i<this._sounds.length;i++) {
				if(this._sounds[i].name==sound) {
					found = true;
					n = i;
					break;
				}
			}
		} else {
			if(this._sounds[sound]) {
				n = sound;
				sound = this._sounds[n].name;
				found = true;
			}
		}
		if(!found) { throw new Error('Invalid sound or sound ID: ' + sound); }
    // _encapsulated = true;
    const ins = new AudioSynthInstrument(this, sound, n);
    // _encapsulated = false;
    return ins;
  }

  listSounds() {
    var r = [];
		for(var i=0;i<this._sounds.length;i++) {
			r.push(this._sounds[i].name);
		}
		return r;
  }

  loadSoundProfile() {
    for(var i=0,len=arguments.length;i<len;i++) {
			const o = arguments[i];
			if(!(o instanceof Object)) { throw new Error('Invalid sound profile.'); }
			this._sounds.push(o);
		}
		this._resizeCache();
		return true;
  }

  loadModulationFunction() {
    for(var i=0,len=arguments.length;i<len;i++) {
			const f = arguments[i];
			if(typeof(f)!='function') { throw new Error('Invalid modulation function.'); }
			this._mod.push(f);
		}
		return true;
  }
}