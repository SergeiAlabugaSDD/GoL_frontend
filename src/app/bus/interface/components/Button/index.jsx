import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import './styles.css';

// types
import { dndItemTypes } from '../../dndItemTypes';

export const Button = ({
  left,
  top,
  id,
  title = 'button',
  onClick = () => {},
}) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: dndItemTypes.BUTTON, id, left, top },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <button
      className="button"
      type="button"
      ref={drag}
      style={{
        opacity: isDragging ? 0 : 1,
        left,
        top,
      }}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

Button.propTypes = {
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
