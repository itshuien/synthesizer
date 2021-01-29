import styles from './Key.module.scss';
import Piano from '../services/Piano';

const { isWhiteKey } = Piano;

export default function Key({ synth, note, octave }) {
  function playNote() {
    synth.triggerAttack(`${note}${octave}`);
  }

  function releaseNote() {
    synth.triggerRelease(`${note}${octave}`);
  }

  return (
    <div
      className={isWhiteKey(note) ? styles.whiteKey : styles.blackKey }
      onMouseDown={playNote}
      onMouseUp={releaseNote}
      onMouseLeave={releaseNote}
    ></div>
  )
}