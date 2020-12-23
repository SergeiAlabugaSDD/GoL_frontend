import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Motion, spring, presets } from 'react-motion';

import './styles.css';

// components
import { Pattern } from '../Pattern';

// actions
import { gameActions } from '../../../gameCell/actions';

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
        data: [
          [5, 1],
          [5, 2],
          [6, 1],
          [6, 2],
          [5, 11],
          [6, 11],
          [7, 11],
          [4, 12],
          [8, 12],
          [3, 13],
          [9, 13],
          [3, 14],
          [9, 14],
          [6, 15],
          [4, 16],
          [8, 16],
          [7, 17],
          [6, 17],
          [5, 17],
          [6, 18],
          [3, 21],
          [4, 21],
          [5, 21],
          [3, 22],
          [4, 22],
          [5, 22],
          [2, 23],
          [6, 23],
          [1, 25],
          [2, 25],
          [6, 25],
          [7, 25],
          [3, 35],
          [4, 35],
          [3, 36],
          [4, 36],
        ],
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
        data: [
          [1, 1],
          [1, 2],
          [2, 1],
          [3, 4],
          [4, 4],
          [4, 3],
        ],
      },
      {
        id: nanoid(6),
        name: 'Blinker',
        src: '/assets/blinker_osci.gif',
        data: [
          [1, 1],
          [1, 2],
          [1, 3],
        ],
      },
      {
        id: nanoid(6),
        name: 'Column',
        src: '/assets/column_osci.gif',
        data: [
          [10, 14],
          [11, 14],
          [12, 13],
          [12, 15],
          [13, 14],
          [14, 14],
          [15, 14],
          [16, 14],
          [17, 13],
          [17, 15],
          [18, 14],
          [19, 14],
          [10, 35],
          [11, 35],
          [12, 34],
          [12, 36],
          [13, 35],
          [14, 35],
          [15, 35],
          [16, 35],
          [17, 34],
          [17, 36],
          [18, 35],
          [19, 35],
        ],
      },
      {
        id: nanoid(6),
        name: 'Pulsar',
        src: '/assets/pulsar_osci.gif',
        data: [
          [10, 21],
          [10, 22],
          [10, 26],
          [10, 27],
          [9, 21],
          [9, 27],
          [8, 21],
          [8, 27],
          [12, 17],
          [12, 18],
          [12, 19],
          [12, 22],
          [12, 23],
          [12, 25],
          [12, 26],
          [12, 29],
          [12, 30],
          [12, 31],
          [13, 19],
          [13, 21],
          [13, 23],
          [13, 25],
          [13, 27],
          [13, 29],
          [14, 21],
          [14, 22],
          [14, 26],
          [14, 27],
          [16, 21],
          [16, 22],
          [16, 26],
          [16, 27],
          [17, 19],
          [17, 21],
          [17, 23],
          [17, 25],
          [17, 27],
          [17, 29],
          [18, 17],
          [18, 18],
          [18, 19],
          [18, 22],
          [18, 23],
          [18, 25],
          [18, 26],
          [18, 29],
          [18, 30],
          [18, 31],
          [20, 21],
          [20, 22],
          [20, 26],
          [20, 27],
          [21, 21],
          [21, 27],
          [22, 21],
          [22, 27],
        ],
      },
      {
        id: nanoid(6),
        name: 'Toad',
        src: '/assets/toad_osci.gif',
        data: [
          [1, 2],
          [1, 3],
          [1, 4],
          [2, 1],
          [2, 2],
          [2, 3],
        ],
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
const RenderListOfPatterns = ({ id, style, onMouseOut, onBlur }) => {
  const dispatch = useDispatch();

  const clickHandler = (data) => {
    dispatch(gameActions.setSinglePattern(data));
  };

  const { patterns } = typesOfPatterns.filter((item) => item.id === id)[0];
  return (
    <div
      className="presets_bar_list"
      style={{ ...style }}
      onMouseOut={onMouseOut}
      onBlur={onBlur}
    >
      {patterns.map((pattern) => (
        <Pattern key={pattern.id} pattern={pattern} onClick={clickHandler} />
      ))}
    </div>
  );
};

RenderListOfPatterns.propTypes = {
  id: PropTypes.string.isRequired,
  style: PropTypes.shape().isRequired,
  onMouseOut: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
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
              zIndex: `${show ? '10' : '-1'}`,
            }}
          >
            <ul className="relative">
              <button
                className="preset_bar_close"
                type="button"
                onClick={toggleHandler}
              >
                <ArrowRightSVG
                  width={20}
                  height={18}
                  fill="var(--main-font-color)"
                />
              </button>
              {typesOfPatterns.map((item) => (
                <li
                  key={item.id}
                  className="presets_bar_item"
                  onMouseOver={() => mouseOverHandler(item.id)}
                  onFocus={() => mouseOverHandler(item.id)}
                >
                  <button
                    type="button"
                    className="presets_bar_btn flex a_c j_c full_w full_h"
                    onClick={() => mouseOverHandler(item.id)}
                  >
                    {item.name}
                  </button>
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
