export default class Piano {
  static pianoNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  static isWhiteKey = note => {
    const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    return whiteKeys.includes(note);
  }

  static getNextNote = ({ note, octave }) => {    
    if (note === 'B') return { note: 'C', octave: octave + 1 };

    const nextNoteIndex = this.pianoNotes.indexOf(note) + 1;

    return { note: this.pianoNotes[nextNoteIndex], octave };
  }

  static getOctaveKeys = (notes, octave) => notes.map(note => {
    return { note, octave }
  });

  static generatePianoKeys = (startingNote, startingOctave, numOfOctaves) => {
    const startNoteIndex = this.pianoNotes.indexOf(startingNote);
    const endingOctave = startingOctave + numOfOctaves;
    let pianoKeys = [];

    for (let i = startingOctave; i <= endingOctave; i++) {
      let pianoNoteRange = this.pianoNotes;

      if (i === startingOctave) pianoNoteRange = pianoNoteRange.slice(startNoteIndex);
      else if (i === endingOctave) pianoNoteRange = pianoNoteRange.slice(0, startNoteIndex);

      pianoKeys.push(...this.getOctaveKeys(pianoNoteRange, i));
    }

    const [lastKey] = pianoKeys.slice(-1);

    if (!this.isWhiteKey(lastKey.note)) pianoKeys.push(this.getNextNote(lastKey));

    return pianoKeys;
  }
}