/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from 'react-redux';
import { FixedSizeGrid as Grid } from 'react-window';

// lodash
import { throttle } from 'lodash-es';

// drag'n'drop
import { useDrop } from 'react-dnd';
import { dndItemTypes } from './dndItemTypes';

import './styles.css';

// actions
import { actions } from './actions';
import { interfaceSelectors } from './reducer';

// components
import { ItemPreview, GameBar } from './components';
import { Button } from '../../components';
// selectors

// assets
import presetSVG from './assets/presets.svg';
import optionsSVG from './assets/cogwheel.svg';
import profileSVG from './assets/user.svg';

export const Interface = () => {
  const grid = useSelector(interfaceSelectors.getGrid);
  const { innerHeight, innerWidth } = useSelector(
    interfaceSelectors.getUserView
  );

  const Cell = ({ columnIndex, rowIndex, style }) => (
    <div
      style={style}
      className={`${grid[columnIndex][rowIndex] === 1 ? 'life' : 'dead'}`}
    />
  );
  // redux hooks
  const dispatch = useDispatch();
  const { gameBar } = useSelector(interfaceSelectors.getInterface);

  // drag'n'drop hook
  const [, drop] = useDrop({
    accept: Object.values(dndItemTypes),
    drop: throttle((item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      dispatch(actions.moveItemOfInterface({ id: item.id, left, top }));
      return undefined;
    }, 100),
  });

  return (
    <div ref={drop} className="game_wrapper">
      <GameBar {...gameBar}>
        <Button className="btn_interface" riple>
          <img className="btn_img" src={presetSVG} alt="presets" />
        </Button>
        <Button className="btn_interface" riple>
          <img className="btn_img" src={optionsSVG} alt="options" />
        </Button>
        <Button className="btn_interface" riple>
          <img className="btn_img" src={profileSVG} alt="profile" />
        </Button>
      </GameBar>
      <ItemPreview />
      <Grid
        className="grid_game"
        columnCount={100}
        columnWidth={35}
        height={innerHeight - 30}
        rowCount={100}
        rowHeight={35}
        width={innerWidth - 30}
        overscanColumnCount={15}
        overscanRowCount={15}
      >
        {Cell}
      </Grid>
    </div>
  );
};
