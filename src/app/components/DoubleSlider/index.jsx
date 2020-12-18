/* eslint-disable react/prop-types */
import { Slider, Handles, Tracks, Rail } from 'react-compound-slider';
import PropTypes from 'prop-types';

import './styles.css';

function Handle({ handle: { id, value, percent }, getHandleProps }) {
  return (
    <div
      className="double-slider_handle flex a_c j_c"
      style={{
        left: `calc(${percent}% - 15px)`,
      }}
      {...getHandleProps(id)}
    >
      <span className="double-slider_value">{value}</span>
    </div>
  );
}

function Track({ source, target, getTrackProps }) {
  return (
    <div
      className="double-slider_track"
      style={{
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps()}
    />
  );
}

export const DoubleSlider = ({ values, changeHandler, domain }) => {
  return (
    <Slider
      className="double-slider relative a_c flex"
      domain={domain}
      values={values}
      step={1}
      mode={1}
      onChange={changeHandler}
    >
      <Rail>
        {({ getRailProps }) => (
          <div className="double-slider_rail" {...getRailProps()} />
        )}
      </Rail>
      <Handles>
        {({ handles, getHandleProps }) => (
          <div className="slider-handles">
            {handles.map((handle) => (
              <Handle
                key={handle.id}
                handle={handle}
                getHandleProps={getHandleProps}
              />
            ))}
          </div>
        )}
      </Handles>
      <Tracks right={false} left={false}>
        {({ tracks, getTrackProps }) => (
          <div className="slider-tracks">
            {tracks.map(({ id, source, target }) => (
              <Track
                key={id}
                source={source}
                target={target}
                getTrackProps={getTrackProps}
              />
            ))}
          </div>
        )}
      </Tracks>
    </Slider>
  );
};

DoubleSlider.propTypes = {
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
  changeHandler: PropTypes.func.isRequired,
};
