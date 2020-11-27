import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

import './styles.css';

export const InputRange = ({
  left,
  top,
  id,
  label,
  max,
  min,
  value,
  changeHandler,
  className,
  dndItemType,
}) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: dndItemType, id, left, top },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      style={{
        opacity: isDragging ? 0 : 1,
        left,
        top,
      }}
      className={className}
    >
      <input
        ref={drag}
        type="range"
        id={label}
        name="volume"
        min={min}
        max={max}
        value={value}
        onChange={changeHandler}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

InputRange.propTypes = {
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  changeHandler: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  dndItemType: PropTypes.string.isRequired,
};
