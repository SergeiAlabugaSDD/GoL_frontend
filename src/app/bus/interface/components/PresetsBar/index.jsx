import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Motion, spring, presets } from 'react-motion';

import './styles.css';

// components
import { Pattern } from '../Pattern';

// assets
import { ReactComponent as ArrowRightSVG } from './assets/right-arrow.svg';

// mock
const typesOfPatterns = [
  {
    id: nanoid(6),
    name: 'Guns',
    patterns: [
      {
        id: nanoid(6),
        name: 'Simkin gun',
        src: '/assets/simkin_gun.svg',
        data: [],
      },
      {
        id: nanoid(6),
        name: 'Glider gun',
        src: '/assets/glider_gun.svg',
        data: [],
      },
    ],
  },
  {
    id: nanoid(6),
    name: 'Oscillators',
    patterns: [
      {
        id: nanoid(6),
        name: 'Beacon',
        src: '/assets/beacon_osci.gif',
        data: [],
      },
      {
        id: nanoid(6),
        name: 'Blinker',
        src: '/assets/blinker_osci.gif',
        data: [],
      },
      {
        id: nanoid(6),
        name: 'Column',
        src: '/assets/column_osci.gif',
        data: [],
      },
      {
        id: nanoid(6),
        name: 'Pulsar',
        src: '/assets/pulsar_osci.gif',
        data: [],
      },
      {
        id: nanoid(6),
        name: 'Toad',
        src: '/assets/toad_osci.gif',
        data: [],
      },
    ],
  },
  {
    id: nanoid(6),
    name: 'Spaceships',
    patterns: [
      {
        id: nanoid(6),
        name: 'Glider',
        src: '/assets/glider_ship.gif',
        data: [],
      },
      {
        id: nanoid(6),
        name: 'Light ship',
        src: '/assets/light_ship.gif',
        data: [],
      },
      {
        id: nanoid(6),
        name: 'Middle ship',
        src: '/assets/middle_ship.gif',
        data: [],
      },
      {
        id: nanoid(6),
        name: 'Heavy ship',
        src: '/assets/heavy_ship.gif',
        data: [],
      },
    ],
  },
  {
    id: nanoid(6),
    name: 'Still lifes',
    patterns: [
      {
        id: nanoid(6),
        name: 'beehive',
        src: '/assets/beehive_still.svg',
        data: [],
      },
      {
        id: nanoid(6),
        name: 'block',
        src: '/assets/block_still.svg',
        data: [],
      },
      { id: nanoid(6), name: 'boat', src: '/assets/boat_still.svg', data: [] },
      {
        id: nanoid(6),
        name: 'flower',
        src: '/assets/flower_still.svg',
        data: [],
      },
      { id: nanoid(6), name: 'loaf', src: '/assets/loaf_still.svg', data: [] },
    ],
  },
];

// render hovered list
const RenderListOfPatterns = ({ id, style }) => {
  const { patterns } = typesOfPatterns.filter((item) => item.id === id)[0];
  return (
    <div className="presets_bar_list" style={{ ...style }}>
      {patterns.map((pattern) => (
        <div key={pattern.id} className="flex a_c j_c">
          <Pattern pattern={pattern} />
        </div>
      ))}
    </div>
  );
};

RenderListOfPatterns.propTypes = {
  id: PropTypes.string.isRequired,
  style: PropTypes.shape().isRequired,
};

export const PresetsBar = ({ show, toggleHandler }) => {
  const [showList, setShowList] = useState(null);
  // handlers
  const mouseOverHandler = (id) => {
    if (typeof id === 'string') {
      setShowList(id);
    } else setShowList(null);
  };

  return (
    <Motion
      style={{
        transform: spring(show ? 0 : 160, presets.stiff),
        opacity: spring(show ? 1 : 0, presets.stiff),
      }}
    >
      {(value) => {
        return (
          <div
            className="presets_bar"
            style={{
              transform: `translateX(${value.transform}px)`,
              opacity: value.opacity,
            }}
          >
            <ul className="relative">
              <button
                className="preset_bar_close"
                type="button"
                onClick={toggleHandler}
                onTouchEnd={toggleHandler}
              >
                <ArrowRightSVG
                  width={25}
                  height={20}
                  fill="var(--main-font-color)"
                />
              </button>
              {typesOfPatterns.map((item) => (
                <li
                  key={item.id}
                  className="presets_bar_item flex a_c j_c"
                  onMouseOver={() => mouseOverHandler(item.id)}
                  onFocus={() => mouseOverHandler(item.id)}
                >
                  {item.name}
                  <Motion
                    style={{
                      transform: spring(
                        showList === item.id ? -100 : -90,
                        presets.stiff
                      ),
                      opacity: spring(
                        showList === item.id ? 1 : 0,
                        presets.stiff
                      ),
                    }}
                  >
                    {(position) => {
                      return (
                        <RenderListOfPatterns
                          style={{
                            transform: `translate(${position.transform}%)`,
                            opacity: position.opacity,
                            display: showList === item.id ? 'grid' : 'none',
                          }}
                          id={item.id}
                          onMouseOut={mouseOverHandler}
                          onBlur={mouseOverHandler}
                        />
                      );
                    }}
                  </Motion>
                </li>
              ))}
            </ul>
          </div>
        );
      }}
    </Motion>
  );
};

PresetsBar.propTypes = {
  show: PropTypes.bool.isRequired,
  toggleHandler: PropTypes.func.isRequired,
};
