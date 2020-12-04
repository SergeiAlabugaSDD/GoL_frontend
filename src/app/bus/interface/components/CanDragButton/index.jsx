// import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';

import './styles.css';

// images
import ableToDragSvg from './images/move.svg';
import canDragSvg from './images/drag.svg';

export const CanDragButton = ({
  show,
  clickHandler,
  canDrag,
  top,
  right,
  bottom,
  left,
}) => {
  return (
    <div
      className="can-drag-wrap absolute flex a_c"
      style={{
        opacity: show ? 0 : 1,
        top: `${canDrag && !bottom ? '50%' : `${top}px`}`,
        right: `${canDrag && !left ? '50%' : `${right}px`}`,
        bottom: `${canDrag && !top ? '50%' : `${bottom}px`}`,
        left: `${canDrag && !right ? '50%' : `${left}px`}`,
      }}
    >
      <div className="relative full_h full_w">
        <button
          className="can-drag-button"
          type="button"
          onClick={clickHandler}
        >
          <img
            style={{
              height: `${canDrag ? '50px' : '30px'}`,
              transform: `${canDrag ? 'translate(50%, -50%)' : 'none'}`,
            }}
            src={canDrag ? canDragSvg : ableToDragSvg}
            alt="canDrag"
          />
        </button>
        {canDrag ? (
          ''
        ) : (
          <span className="absolute can-drag-descr flex a_c j_c">
            able to drag
          </span>
        )}
      </div>
    </div>
  );
};

CanDragButton.propTypes = {
  show: PropTypes.bool,
  canDrag: PropTypes.bool,
  clickHandler: PropTypes.func,
  top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  right: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  bottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  left: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

CanDragButton.defaultProps = {
  show: true,
  clickHandler: () => {},
  canDrag: false,
  top: '',
  right: '',
  bottom: '',
  left: '',
};
