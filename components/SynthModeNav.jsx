import { useState, useEffect } from 'react';
import styles from './SynthModeNav.module.scss';

export default function SynthModeNav(props) {
  const [tabs, setTabs] = useState([]);
  const [activeTabId, setActiveTabId] = useState(props.activeTabId);

  useEffect(() => {
    setTabs(props.children);
  }, [props.children]);

  function isActiveTabId(tabId) {
    return parseInt(tabId) === activeTabId;
  }

  return (
    <div className={styles.synthModeWrapper}>
      <nav className={styles.synthModeNav}>
        { tabs.map(tab => (
          <div
              key={tab.key}
              className={styles.synthModeTab}
              onClick={() => setActiveTabId(parseInt(tab.key))}
          >{tab.props['data-mode']}</div>
        )) }

        <div
          className={styles.synthModeActiveTab}
          style={{ left: `${activeTabId * 128}px` }}
        ></div>
      </nav>
      
      { tabs.map(tab => (
        <div
          key={tab.key}
          className={isActiveTabId(tab.key) ? styles.activeTabContent : styles.inactiveTabContent}
        >{tab}</div>
      ))}
    </div>
  )
}