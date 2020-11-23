import logo from './images/logo.png';

import styles from './styles.module.css';

export const Logo = () => {
  return (
    <div className={styles.logo}>
      <a href="/">
        <img src={logo} alt="logo" />
      </a>
      <h2 className={styles.logo_title}>GoL</h2>
    </div>
  );
};
