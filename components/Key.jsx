import { useState, useEffect } from 'react';
import * as Tone from 'tone';
import styles from './Key.module.scss';

export default function Key(props) {
  const [synth, setSynth] = useState();

  useEffect(() => {
    setSynth(new Tone.PolySynth(Tone.Synth).toDestination());
  }, []);

  function playNote() {
    synth.triggerAttack(props.note);
  }

  function releaseNote() {
    synth.triggerRelease(props.note);
  }

  return (
    <div
      className={props.type === 'white' ? styles.whiteKey : styles.blackKey }
      onMouseDown={playNote}
      onMouseUp={releaseNote}
      onMouseLeave={releaseNote}
    ></div>
  )
}