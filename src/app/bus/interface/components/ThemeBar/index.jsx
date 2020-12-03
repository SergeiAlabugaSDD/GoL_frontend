import { useState } from 'react';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

// types
import { dndItemTypes } from '../../dndItemTypes';

// components

import { CanDragButton } from '../CanDragButton';

import './styles.css';

export const ThemeBar = (props) => {
  const {
    width,
    height,
    left,
    top,
    transform,
    id, // id for react d'n'd
    children,
    displayPreview, // check when ItemPreview component render
    closeHandler, // action for toggle @param show in reducer
  } = props;
  const [canDrag, toggleCanDrag] = useState(false);

  const canDragHandler = () => {
    toggleCanDrag(!canDrag);
  };

  const [{ isDragging }, drag] = useDrag({
    item: { type: dndItemTypes.THEME_BAR, id, left, top },
    end: (item, monitor) => {
      if (monitor.didDrop()) toggleCanDrag(!canDrag);
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  if (isDragging) return null;

  return (
    <div
      ref={canDrag ? drag : null}
      style={{
        left,
        top,
        width: `${width}px`,
        height: `${height}px`,
        transform,
        cursor: `${displayPreview ? 'grabbing' : 'default'}`,
      }}
      className="theme_bar"
    >
      <div className="full_h full_w relative flex a_c j_c">
        {canDrag || displayPreview ? null : (
          <>
            {children}
            <span
              className="close_bar"
              onClick={closeHandler}
              onKeyPress={closeHandler}
            >
              &times;
            </span>
          </>
        )}
        <CanDragButton
          show={displayPreview}
          clickHandler={canDragHandler}
          canDrag={canDrag}
          top={8}
          right={4}
        />
      </div>
    </div>
  );
};

ThemeBar.propTypes = {
  closeHandler: PropTypes.func,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  displayPreview: PropTypes.bool,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  id: PropTypes.string,
  transform: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

ThemeBar.defaultProps = {
  id: 'themeBar',
  transform: 'none',
  displayPreview: false,
  closeHandler: () => {},
};
