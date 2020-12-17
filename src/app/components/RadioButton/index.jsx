/* eslint-disable no-unused-vars */
import React, { memo, forwardRef } from 'react';
import { Motion, spring } from 'react-motion';

import PropTypes from 'prop-types';

import './styles.css';

export const RadioButton = memo(
  forwardRef(({ id, label, name, checked }, ref) => {
    return (
      <li className="radio-button relative flex">
        <label className="flex a_c j_a d_column full_w full_h" htmlFor={id}>
          <input
            ref={ref}
            id={id}
            type="radio"
            name={name}
            defaultChecked={checked}
            value={label}
          />
          <span className="design">
            <Motion
              defaultStyle={{
                transform1: 0,
                opacity1: 0,
                transform2: 0,
                opacity2: 0,
              }}
              style={{
                transform1: spring(checked ? 0.6 : 0, {
                  stiffness: 300,
                  damping: 20,
                  precision: 2,
                }),
                opacity1: spring(checked ? 1 : 0, {
                  stiffness: 260,
                  damping: 15,
                  precision: 2,
                }),
                transform2: spring(checked ? 2 : 0, {
                  stiffness: 300,
                  damping: 20,
                  precision: 2,
                }),
                opacity2: spring(checked ? 0.2 : 0, {
                  stiffness: 260,
                  damping: 15,
                  precision: 2,
                }),
              }}
            >
              {(value) => {
                return (
                  <>
                    <span
                      style={{
                        transform: `scale(${value.transform1})`,
                        opacity: value.opacity1,
                      }}
                      className="checked"
                    />
                    <span
                      style={{
                        transform: `scale(${value.transform2})`,
                        opacity: value.opacity2,
                      }}
                      className="checked checked_after"
                    />
                  </>
                );
              }}
            </Motion>
          </span>
          <span className="text">{label}</span>
        </label>
      </li>
    );
  })
);

RadioButton.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
};

RadioButton.defaultProps = {
  checked: false,
};
