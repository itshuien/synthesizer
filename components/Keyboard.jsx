import Key from './Key';
import styles from './Keyboard.module.scss';

export default function Keyboard() {
  return (
    <div class={styles.keyboard}>
      <Key note="C4" type="white" />
      <Key note="C#4" type="black" />
      <Key note="D4" type="white" />
      <Key note="D#4" type="black" />
      <Key note="E4" type="white" />
      <Key note="F4" type="white" />
      <Key note="F#4" type="black" />
      <Key note="G4" type="white" />
      <Key note="G#4" type="black" />
      <Key note="A4" type="white" />
      <Key note="A#4" type="black" />
      <Key note="B4" type="white" />
    </div>
  )
}