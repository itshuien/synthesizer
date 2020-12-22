import styles from './Key.module.scss';

export default function Key(props) {
  function playNote() {
    props.synth.triggerAttack(props.note);
  }

  function releaseNote() {
    props.synth.triggerRelease(props.note);
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