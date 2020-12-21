export default class AudioSynthInstrument {
  constructor(parent, name, soundId) {
    this.parent = parent;
    this.name = name;
    this.soundId = soundId;
  }

  play(note, octave, duration) {
    return this.parent.play(this.soundId, note, octave, duration);
  }

  generate(note, octave, duration) {
    return this.parent.generate(this.soundId, note, octave, duration);
  }
}
