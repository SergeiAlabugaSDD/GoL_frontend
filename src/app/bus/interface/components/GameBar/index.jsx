/* eslint-disable no-use-before-define */
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import './styles.css';

// types
import { dndItemTypes } from '../../dndItemTypes';

export const GameBar = ({ width, left, top, transform, id, children }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: dndItemTypes.GAME_BAR, id, left, top },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      className="game_bar"
      ref={drag}
      style={{
        opacity: isDragging ? 0 : 1,
        left,
        top,
        width: `${width}px`,
        transform,
      }}
    >
      {children}
    </div>
  );
};

GameBar.propTypes = {
  width: PropTypes.number,
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
  width: window.innerWidth / 2,
};
