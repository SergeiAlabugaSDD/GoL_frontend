import { useState } from 'react';
import { CirclePicker } from 'react-color';

import './styles.css';

// helpers
import { setTheme } from '../../helpers';

// components
import { Button } from '../../../../components';

// assets
import colorPickerSVG from './images/color-picker.svg';

export const ColorPicker = () => {
  const [show, setShow] = useState(false);

  const toggleHideHandler = (e) => {
    e.stopPropagation();
    setShow(!show);
  };

  const changeHandler = ({ rgb }, event) => {
    event.stopPropagation();
    setTheme('--main-bg-color', `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`);
  };

  return (
    <div className="color-picker relative">
      <Button
        tooltip="Pick Color"
        icon={colorPickerSVG}
        className="color-picker_btn"
        onClick={toggleHideHandler}
        riple
      />
      {show && (
        <div className="color-picker_wrap absolute">
          <CirclePicker
            colors={[
              '#b31449bf',
              '#9c27b0bf',
              '#673ab7bf',
              '#3f51b5bf',
              '#2196f3bf',
              '#00bcd4bf',
              '#4caf50bf',
              '#609721bf',
              '#b86e00bf',
              '#1f1f1fbf',
            ]}
            onChange={changeHandler}
            circleSize={40}
            circleSpacing={10}
          />
        </div>
      )}
    </div>
  );
};
