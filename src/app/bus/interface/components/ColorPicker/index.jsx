import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { CirclePicker } from 'react-color';

import './styles.css';

// helpers
import { setTheme } from '../../helpers';

// hooks
import { useOutsideAlerter } from '../../hooks';

// components
import { Button } from '../../../../components';

export const ColorPicker = ({
  variableOfTheme,
  tooltip,
  colors,
  showRight,
  onChange,
  canvas,
  children,
}) => {
  const dispatch = useDispatch();
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
  const outsideClickHandler = () => {
    if (show) setShow(false); // hide colorPicker
  };

  useOutsideAlerter(wrapperRef, outsideClickHandler);

  const toggleHideHandler = () => {
    setShow(!show);
  };

  const changeHandler = ({ rgb }, event) => {
    const changedColor = `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`;
    event.stopPropagation();
    if (canvas) {
      dispatch(onChange({ type: variableOfTheme, color: changedColor }));
      return;
    }
    setTheme(variableOfTheme, changedColor);
  };

  return (
    <div ref={wrapperRef} className="color-picker relative">
      <Button
        tooltip={tooltip}
        className="color-picker_btn"
        onClick={toggleHideHandler}
        riple
      >
        {children}
      </Button>
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
  showRight: PropTypes.bool,
  onChange: PropTypes.func,
  canvas: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

ColorPicker.defaultProps = {
  showRight: true,
  onChange: () => {},
  canvas: false,
  children: null,
};
