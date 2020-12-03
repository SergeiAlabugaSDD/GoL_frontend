// import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';

import './styles.css';

// images
import ableToDragSvg from './images/move.svg';
import canDragSvg from './images/drag.svg';

export const CanDragButton = ({ show, clickHandler, canDrag, top, right }) => {
  return (
    <button
      className="can-drag-button absolute flex a_c"
      style={{
        opacity: show ? 0 : 1,
        top: `${canDrag ? '50%' : `${top}px`}`,
        right: `${canDrag ? '50%' : `${right}px`}`,
      }}
      type="button"
      onClick={clickHandler}
    >
      {canDrag ? '' : <span>able to drag</span>}
      <img
        style={{
          height: `${canDrag ? '50px' : '30px'}`,
          transform: `${canDrag ? 'translate(50%, -50%)' : 'none'}`,
        }}
        src={canDrag ? canDragSvg : ableToDragSvg}
        alt="canDrag"
      />
    </button>
  );
};

CanDragButton.propTypes = {
  show: PropTypes.bool,
  canDrag: PropTypes.bool,
  clickHandler: PropTypes.func,
  top: PropTypes.number,
  right: PropTypes.number,
};

CanDragButton.defaultProps = {
  show: true,
  clickHandler: () => {},
  canDrag: false,
  top: 15,
  right: 10,
};
