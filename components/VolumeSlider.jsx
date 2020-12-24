import { useState } from 'react';
import styles from './VolumeSlider.module.scss';

export default function VolumeSlider() {
  const [volume, setVolume] = useState(10);

  return (
    <div id="volumeSliderWrapper" className={styles.volumeSliderWrapper}>
      <span style={{ marginRight: '16px' }}>Volume: {volume}</span>
      <input
        id="volumeSlider"
        className={styles.volumeSlider}
        type="range"
        min="-20"
        max="20"
        onChange={e => setVolume(e.target.value)}
      />
    </div>
  )
}