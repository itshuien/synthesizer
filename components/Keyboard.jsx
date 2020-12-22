import { useState, useEffect } from 'react';
import * as Tone from 'tone';
import Key from './Key';
import styles from './Keyboard.module.scss';

export default function Keyboard() {
  const [volume, setVolume] = useState(0);
  const [synth, setSynth] = useState();

  useEffect(() => {
    setSynth(new Tone.PolySynth(Tone.Synth, { volume }).toDestination());
  }, [volume]);

  return (
    <div>
      <div className={styles.keyboard}>
        <Key synth={synth} note="C4" type="white" />
        <Key synth={synth} note="C#4" type="black" />
        <Key synth={synth} note="D4" type="white" />
        <Key synth={synth} note="D#4" type="black" />
        <Key synth={synth} note="E4" type="white" />
        <Key synth={synth} note="F4" type="white" />
        <Key synth={synth} note="F#4" type="black" />
        <Key synth={synth} note="G4" type="white" />
        <Key synth={synth} note="G#4" type="black" />
        <Key synth={synth} note="A4" type="white" />
        <Key synth={synth} note="A#4" type="black" />
        <Key synth={synth} note="B4" type="white" />
      </div>

      <input
        className={styles.volumeController}
        value={volume}
        onChange={e => setVolume(e.target.value)}
        type="number"
      />
    </div>
  )
}