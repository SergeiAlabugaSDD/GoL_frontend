/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useDrag } from 'react-dnd';
import { Motion, spring, presets } from 'react-motion';
import PropTypes from 'prop-types';

import './styles.css';

// types
import { dndItemTypes } from '../../dndItemTypes';

// components
import { ConfigBar } from '../ConfigBar';
import { CanDragButton } from '../CanDragButton';

export const GameBar = ({
  width,
  height,
  left,
  top,
  toggleConfig,
  transform,
  id,
  children,
  displayPreview,
  innerHeight,
}) => {
  const [canDrag, toggleCanDrag] = useState(false);
  const slideConfigToTop = 2 * height + top + 50 > innerHeight;

  const getTransform = () => {
    let verticalPos;
    if (slideConfigToTop) {
      verticalPos = -2 * height;
    } else verticalPos = 0;

    return toggleConfig ? verticalPos : -height;
  };

  const canDragHandler = () => {
    toggleCanDrag(!canDrag);
  };

  const [{ isDragging }, drag] = useDrag({
    item: { type: dndItemTypes.GAME_BAR, id, left, top },
    end: (item, monitor) => {
      if (monitor.didDrop()) toggleCanDrag(!canDrag);
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  if (isDragging) return null;

  return (
    <>
      <div
        className="game_bar"
        ref={canDrag ? drag : null}
        style={{
          left,
          top,
          width: `${width}px`,
          cursor: `${displayPreview ? 'grabbing' : 'default'}`,
          transform,
          height: `${height}px`,
        }}
      >
        <div className="game_bar_bg game_bar_wrapper full_h full_w relative flex a_c j_b">
          {canDrag ? null : children}
          <CanDragButton
            show={displayPreview}
            clickHandler={canDragHandler}
            canDrag={canDrag}
            top={8}
            right={4}
          />
        </div>
        {!displayPreview && (
          <Motion
            style={{
              transform: spring(getTransform(), presets.stiff),
              opacity: spring(toggleConfig && !canDrag ? 1 : 0, presets.stiff),
            }}
          >
            {(value) => {
              return (
                <div
                  className="game_bar_bg full_w relative flex a_c j_c"
                  style={{
                    height: `${height}px`,
                    transform: `translateY(${value.transform}px)`,
                    zIndex: `${toggleConfig ? 0 : -1}`,
                    opacity: value.opacity,
                  }}
                >
                  <ConfigBar />
                </div>
              );
            }}
          </Motion>
        )}
      </div>
    </>
  );
};

GameBar.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  displayPreview: PropTypes.bool,
  toggleConfig: PropTypes.bool,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  innerHeight: PropTypes.number,
  id: PropTypes.string,
  transform: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

GameBar.defaultProps = {
  id: 'gameBar',
  transform: 'none',
  displayPreview: false,
  toggleConfig: false,
  innerHeight: 0,
};
