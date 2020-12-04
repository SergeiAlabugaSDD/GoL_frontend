import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { CirclePicker } from 'react-color';

import './styles.css';

// helpers
import { setTheme } from '../../helpers';

// hooks
import { useOutsideAlerter } from '../../hooks';

// components
import { Button } from '../../../../components';

// assets
import colorPickerSVG from './images/color-picker.svg';

export const ColorPicker = ({
  variableOfTheme,
  tooltip,
  colors,
  icon,
  showRight,
}) => {
  const wrapperRef = useRef(null);
  const [show, setShow] = useState(false);

  // styles where render color-picker
  const styles = showRight
    ? { right: '-15px', transform: 'translate(100%, -50%)' }
    : {
        left: '-15px',
        transform: 'translate(-100%, -50%)',
      };

  // outside clickHandler
  const outsideClickHandler = (e) => {
    e.preventDefault();
    if (show) setShow(false); // hide colorPicker
  };

  useOutsideAlerter(wrapperRef, outsideClickHandler);

  const toggleHideHandler = (e) => {
    e.stopPropagation();
    setShow(!show);
  };

  const changeHandler = ({ rgb }, event) => {
    event.stopPropagation();
    setTheme(variableOfTheme, `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`);
  };

  return (
    <div ref={wrapperRef} className="color-picker relative">
      <Button
        tooltip={tooltip}
        icon={icon}
        className="color-picker_btn"
        onClick={toggleHideHandler}
        riple
      />
      {show && (
        <div style={{ ...styles }} className="color-picker_wrap absolute">
          <CirclePicker
            colors={colors}
            onChange={changeHandler}
            circleSize={40}
            circleSpacing={10}
          />
        </div>
      )}
    </div>
  );
};

ColorPicker.propTypes = {
  variableOfTheme: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  icon: PropTypes.string,
  showRight: PropTypes.bool,
};

ColorPicker.defaultProps = {
  icon: colorPickerSVG,
  showRight: true,
};
