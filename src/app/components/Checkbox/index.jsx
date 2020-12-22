import PropTypes from 'prop-types';

import './styles.css';

/**
 * A simple Checkbox component
 */

/**
 * NOTES/TODOS:
 * -------------------
 * <span> is used as a wrapper since input and label are both inline elements
 * <span.checkbox-indicator> can be expanded to hold Icons/SVG for different
 * states at a later date.
 * <label> is semantically linked to input element.
 * Checkbox should be read to screenreaders
 */

export const Checkbox = ({
  disabled = false,
  name,
  label,
  checked,
  onChange,
}) => {
  const handler = !disabled ? onChange : undefined;

  return (
    <span className="checkbox" onClick={handler} onKeyPress={handler}>
      <input
        className="checkbox-input"
        type="checkbox"
        name={name}
        id={`${name}-id`}
        disabled={disabled}
        checked={checked}
        onChange={handler}
        area-labelledby="checkbox-label"
      />
      <span className="checkbox-indicator" />
      <label className="checkbox-label" htmlFor={`${name}-id`}>
        {label}
      </label>
    </span>
  );
};

Checkbox.propTypes = {
  /** name given to input[type=checkbox] */
  name: PropTypes.string.isRequired,
  /** Text to display. Apllied to <Label> element */
  label: PropTypes.string.isRequired,
  /** Is the checkbox checked or nor */
  checked: PropTypes.bool.isRequired,
  /** function to run when the checkbox is clicked */
  onChange: PropTypes.func.isRequired,
  /** is the Checkbox disabled? */
  disabled: PropTypes.bool.isRequired,
};
