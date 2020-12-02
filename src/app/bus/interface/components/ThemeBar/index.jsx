import './styles.css';

import PropTypes from 'prop-types';

export const ThemeBar = (props) => {
  const { show, top, left } = props;

  if (!show) return null;

  return (
    <div
      style={{
        width: '300px',
        top: `${top}px`,
        left: `${left}px`,
      }}
      className="theme_bar flex a_c j_c"
    >
      THEME_BAR
    </div>
  );
};

ThemeBar.propTypes = {
  show: PropTypes.bool.isRequired,
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
};
