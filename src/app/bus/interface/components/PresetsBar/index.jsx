import PropTypes from 'prop-types';
import { Motion, spring, presets } from 'react-motion';

import './styles.css';

export const PresetsBar = ({ show }) => {
  return (
    <Motion
      style={{
        transform: spring(show ? 0 : 160, presets.stiff),
        opacity: spring(show ? 1 : 0, presets.stiff),
      }}
    >
      {(value) => {
        return (
          <div
            className="presets_bar"
            style={{
              transform: `translateX(${value.transform}px)`,
              opacity: value.opacity,
            }}
          >
            Presets
          </div>
        );
      }}
    </Motion>
  );
};

PresetsBar.propTypes = {
  show: PropTypes.bool.isRequired,
};
