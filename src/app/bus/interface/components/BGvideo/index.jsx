import PropTypes from 'prop-types';
import './styles.css';

export const BGvideo = ({ source }) => {
  return (
    <video src={source} className="bg_video" autoPlay loop muted>
      Your browser does not support the video tag.
    </video>
  );
};

BGvideo.propTypes = {
  source: PropTypes.string.isRequired,
};
