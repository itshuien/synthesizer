import { useState, useEffect } from 'react';
import * as Tone from 'tone';
import styles from './Chord.module.scss';

export default function Chord(props) {
  const [synth, setSynth] = useState();

  useEffect(() => {
    setSynth(new Tone.PolySynth(Tone.Synth).toDestination());
  }, []);

  function playChord() {
    for (let note of props.notes) synth.triggerAttack(note);
  }

  function releaseChord() {
    synth.triggerRelease(props.notes);
  }

  return (
    <button
      className={styles.chord}
      onMouseDown={playChord}
      onMouseUp={releaseChord}
      onMouseLeave={releaseChord}
    >{props.chordName}</button>
  )
}