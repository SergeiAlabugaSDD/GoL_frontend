// import { useState } from 'react';
import PropTypes from 'prop-types';
// import { Motion, spring, presets } from 'react-motion';

import './styles.css';

export const Pattern = ({ pattern }) => {
  const {
    // id,
    name,
    src,
    // data,
  } = pattern;

  const gun = src.includes('gun');
  return (
    <div
      style={{ gridColumn: `span ${gun ? '2' : '1'}` }}
      className="flex a_c j_c full_w"
    >
      <figure className="pattern flex d_column j_c">
        <img className="pattern_img" src={src} alt={name} />
        <figcaption className="pattern_descr">{name}</figcaption>
      </figure>
    </div>
  );
};

Pattern.propTypes = {
  pattern: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    src: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.array),
  }).isRequired,
};
