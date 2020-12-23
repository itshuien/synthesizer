import { useState, useEffect, Children, cloneElement } from 'react';
import styles from './SynthModeNav.module.scss';

export default function SynthModeNav(props) {
  const [tabs, setTabs] = useState([]);
  const [activeTabId, setActiveTabId] = useState(0);

  useEffect(() => {
    const children = Children.map(props.children, (child, i) => {
      return cloneElement(child, { id: i })
    });
    setTabs(children);
  }, [props.children]);

  function isActiveTabId(tabId) {
    return tabId === activeTabId;
  }

  return (
    <div className={styles.synthModeWrapper}>
      <nav className={styles.synthModeNav}>
        { tabs.map(tab => (
          <div
              key={tab.props.id}
              className={styles.synthModeTab}
              onClick={() => setActiveTabId(tab.props.id)}
          >{tab.props.title}</div>
        )) }

        <div
          className={styles.synthModeActiveTab}
          style={{ left: `${activeTabId * 128}px` }}
        ></div>
      </nav>
      
      <div className={styles.tabContentWrapper}>
        { tabs.map(tab => (
          <div
            key={tab.props.id}
            className={isActiveTabId(tab.props.id) ? styles.activeTabContent : styles.inactiveTabContent}
          >{tab}</div>
        ))}
      </div>
    </div>
  )
}