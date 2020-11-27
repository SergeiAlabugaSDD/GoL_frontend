import PropTypes from 'prop-types';

import logo from './images/logo.png';

import styles from './styles.module.css';

export const Logo = ({ title }) => {
  return (
    <div className={styles.logo}>
      <a href="/">
        <img src={logo} alt="logo" />
      </a>
      <h2 className={styles.logo_title}>{title}</h2>
    </div>
  );
};

Logo.propTypes = {
  title: PropTypes.string.isRequired,
};
