/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from 'react-redux';
import { FixedSizeGrid as Grid } from 'react-window';

// drag'n'drop
import { useDrop } from 'react-dnd';
import { dndItemTypes } from './dndItemTypes';

import './styles.css';

// actions
import { actions } from './actions';
import { interfaceSelectors } from './reducer';

// components
import { ItemPreview, GameBar, ThemeBar } from './components';
import { Button } from '../../components';
// selectors

// assets
import presetSVG from './assets/icons/presets.svg';
import optionsSVG from './assets/icons/cogwheel.svg';
import profileSVG from './assets/icons/user.svg';

export const Interface = () => {
  // redux hooks
  const dispatch = useDispatch();
  const {
    gameBar,
    grid,
    themeBar,
    userView: { innerHeight, innerWidth },
  } = useSelector(interfaceSelectors.getInterface);

  const toggleOptionsHandler = (e) => {
    e.stopPropagation();
    dispatch(actions.toggleThemeBarAction());
  };

  const Cell = ({ columnIndex, rowIndex, style }) => (
    <div
      style={style}
      className={`${grid[columnIndex][rowIndex] === 1 ? 'life' : 'dead'}`}
    />
  );

  // drag'n'drop hook
  const [, drop] = useDrop({
    accept: Object.values(dndItemTypes),
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      dispatch(actions.moveItemOfInterface({ id: item.id, left, top }));
      return undefined;
    },
  });

  return (
    <div ref={drop} className="game_wrapper">
      <GameBar {...gameBar}>
        <Button
          tooltip="Presets"
          className="btn_interface"
          icon={presetSVG}
          riple
          description="Presets"
        />
        <Button
          tooltip="Profile"
          className="btn_interface"
          icon={profileSVG}
          riple
          description="Profile"
        />
        <Button
          tooltip="Options"
          className="btn_interface"
          icon={optionsSVG}
          riple
          description="Options"
          onClick={toggleOptionsHandler}
        />
      </GameBar>
      <ThemeBar {...themeBar} closeHandler={toggleOptionsHandler}>
        THEME BAR
      </ThemeBar>
      <ItemPreview themeBar={themeBar} gameBar={gameBar} />
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
