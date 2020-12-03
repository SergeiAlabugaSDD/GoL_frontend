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
    show,
    width,
    height,
    left,
    top,
    transform,
    id,
    children,
    displayPreview,
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

  if (!show || isDragging) return null;

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
        {canDrag ? null : children}
        <CanDragButton
          show={displayPreview}
          clickHandler={canDragHandler}
          canDrag={canDrag}
          top={15}
          right={10}
        />
      </div>
    </div>
  );
};

ThemeBar.propTypes = {
  show: PropTypes.bool.isRequired,
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
};
