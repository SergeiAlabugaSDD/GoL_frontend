import { useState } from 'react';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

import './styles.css';

// types
import { dndItemTypes } from '../../dndItemTypes';

// components

import { CanDragButton } from '../CanDragButton';

export const GameBar = ({
  width,
  height,
  left,
  top,
  transform,
  id,
  children,
  displayPreview,
}) => {
  const [canDrag, toggleCanDrag] = useState(false);

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
    <div
      className="game_bar"
      ref={canDrag ? drag : null}
      style={{
        left,
        top,
        width: `${width}px`,
        height: `${height}px`,
        transform,
        cursor: `${displayPreview ? 'grabbing' : 'default'}`,
      }}
    >
      <div className="full_h full_w relative flex a_c j_b">
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

GameBar.propTypes = {
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

GameBar.defaultProps = {
  id: 'gameBar',
  transform: 'none',
  displayPreview: false,
};
