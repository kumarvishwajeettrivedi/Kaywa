import React from 'react';
import styles from './loadingscreen.module.css';

const CircleAnimation: React.FC = () => {
  return (
    <div className={styles.container}>
      <img 
        src="/loading2-unscreen.gif" 
        alt="Loading"
        className={styles.media}
      />
    </div>
  );
};

export default CircleAnimation;