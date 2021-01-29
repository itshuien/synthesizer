import { useState, useEffect } from 'react';
import * as Tone from 'tone';
import Key from './Key';
import styles from './Keyboard.module.scss';

import Piano from '../services/Piano';
const { pianoNotes, isWhiteKey, generatePianoKeys } = Piano;

export default function Keyboard() {
  const [synth, setSynth] = useState();
  const [volume, setVolume] = useState(0);
  const [numOfOctaves, setNumOfOctaves] = useState(2);
  const [startingNote, setStartingNode] = useState('C');
  const [startingOctave, setStartingOctave] = useState(4);
  const [pianoKeys, setPianoKeys] = useState([{ note: 'C', octave: 4 }]);

  useEffect(() => {
    setSynth(new Tone.PolySynth(Tone.Synth, { volume }).toDestination());
  }, [volume]);

  useEffect(() => {
    setPianoKeys(generatePianoKeys(startingNote, startingOctave, numOfOctaves));
  }, [startingNote, startingOctave, numOfOctaves]);

  return (
    <>
      <div className={styles.keyboard}>
        {pianoKeys.map(key => (
          <Key
            synth={synth}
            note={key.note}
            octave={key.octave}
            key={`${key.note}${key.octave}`}
          />
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <label htmlFor="volume">Volume</label>
        <input
          id="volume"
          className={styles.volumeController}
          value={volume}
          onChange={e => setVolume(e.target.value)}
          type="number"
        />

        <form>
          <label htmlFor="octaves">Number of octaves</label>
          <input
            id="octaves"
            type="number"
            value={numOfOctaves}
            min="1"
            max="3"
            onChange={e => setNumOfOctaves(parseInt(e.target.value))}
          />

          <label htmlFor="startingNote">Starting note</label>
          <select id="startingNote" value={startingNote} onChange={e => setStartingNode(e.target.value)}>
            {
              pianoNotes
                .filter(note => isWhiteKey(note))
                .map(note => (
                  <option value={note} key={note}>{note}</option>
                ))
            }
          </select>
        </form>
      </div>
    </>
  )
}