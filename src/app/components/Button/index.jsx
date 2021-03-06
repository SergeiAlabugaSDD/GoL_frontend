/* eslint-disable react/button-has-type */
import { useEffect, useReducer } from 'react';

import PropTypes from 'prop-types';
import './styles.css';

const initialState = {
  clicked: false,
  posX: 0,
  posY: 0,
  d: 0,
};

function buttonReducer(state, { type, payload }) {
  switch (type) {
    case 'CLICKED':
      return {
        ...state,
        clicked: payload.clicked,
        posX: payload.x,
        posY: payload.y,
        d: payload.d,
      };
    case 'END':
      return {
        ...state,
        clicked: false,
        posX: payload.x,
        posY: payload.y,
        d: 0,
      };
    default:
      return state;
  }
}

export const Button = (props) => {
  const {
    className,
    onClick = () => {},
    riple,
    children,
    type,
    tooltip,
    styles,
  } = props;
  const [state, dispatch] = useReducer(buttonReducer, initialState);

  const rippleEffect = (event) => {
    // get position of riple element
    const rect = event.currentTarget.getBoundingClientRect();
    const d = Math.max(
      event.currentTarget.clientWidth,
      event.currentTarget.clientHeight
    );
    const x = `${event.clientY - rect.top - d / 2}px`;
    const y = `${event.clientX - rect.left - d / 2}px`;
    dispatch({
      type: 'CLICKED',
      payload: {
        clicked: true,
        x,
        y,
        d,
      },
    });
  };

  useEffect(() => {
    let timeOut;
    if (state.clicked) {
      // destroy ripple element
      timeOut = setTimeout(() => {
        dispatch({
          type: 'END',
          payload: {
            x: 0,
            y: 0,
          },
        });
      }, 400);
    }
    return () => clearTimeout(timeOut);
  }, [state.clicked]);

  return (
    <button
      type={type}
      onClick={(e) => {
        onClick(e);
        if (riple) {
          rippleEffect(e);
        }
      }}
      className={`btn ${className}`}
      style={{ ...styles }}
    >
      {tooltip && (
        <span className="absolute btn_tooltip flex a_c j_c">{tooltip}</span>
      )}
      {children}
      {state.clicked && (
        <div
          className="riple"
          style={{
            width: state.d,
            height: state.d,
            top: state.posX,
            left: state.posY,
          }}
        />
      )}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  tooltip: PropTypes.string,
  riple: PropTypes.bool,
  styles: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Button.defaultProps = {
  riple: false,
  type: 'button',
  onClick: () => {},
  children: null,
  tooltip: '',
  styles: {},
};
