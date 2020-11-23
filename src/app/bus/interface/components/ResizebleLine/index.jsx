import { useSelector } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './styles.css';

import { interfaceSelectors } from '../../reducer';

export const ResizebleLine = ({ mouseDownHandler }) => {
  const { isStartResizing } = useSelector(interfaceSelectors.getResizeble);
  const styles = classNames('resizeble_button', { bg_red: isStartResizing });

  return (
    <div className="resizeble-line">
      <button
        className={styles}
        type="button"
        onMouseDown={mouseDownHandler}
        tabIndex={0}
      />
    </div>
  );
};

ResizebleLine.propTypes = {
  mouseDownHandler: PropTypes.func.isRequired,
};
