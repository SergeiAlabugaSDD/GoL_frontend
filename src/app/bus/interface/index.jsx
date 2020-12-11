/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from 'react-redux';

// drag'n'drop
import { useDrop } from 'react-dnd';
import { dndItemTypes } from './dndItemTypes';

import './styles.css';

// actions
import { actions } from './actions';
import { interfaceSelectors } from './reducer';
import { gameActions } from '../gameCell/actions';

// components
import { ItemPreview, GameBar, ThemeBar, ColorPicker } from './components';
import { Button } from '../../components';

// bus
import { GameCell } from '../gameCell';

// assets
import presetSVG from './assets/icons/presets.svg';
import optionsSVG from './assets/icons/cogwheel.svg';
import profileSVG from './assets/icons/user.svg';
import aliveSVG from './assets/icons/heart.svg';
import deadSVG from './assets/icons/skull.svg';
import colorsPaleteSVG from './assets/icons/color-palette.svg';
import randomSVG from './assets/icons/shuffle.svg';

export const Interface = () => {
  // redux hooks
  const dispatch = useDispatch();
  const {
    gameBar,
    themeBar,
    userView: { innerHeight, innerWidth },
  } = useSelector(interfaceSelectors.getInterface);

  const colorPickerShowRight =
    themeBar.width + 250 + themeBar.left < innerWidth;

  const toggleOptionsHandler = (e) => {
    e.stopPropagation();
    dispatch(actions.toggleThemeBarAction());
  };

  const randomClickHandler = (e) => {
    e.stopPropagation();
    dispatch(gameActions.generateRandomAction());
  };

  const runHandler = (e) => {
    e.stopPropagation();
    dispatch(gameActions.toggleRun());
  };

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
          tooltip="RUN"
          className="btn_interface"
          icon={presetSVG}
          riple
          description="RUN"
          onClick={runHandler}
        />
        <Button
          tooltip="Step"
          className="btn_interface"
          icon={presetSVG}
          riple
          description="Step"
        />
        <Button
          tooltip="Random"
          className="btn_interface"
          icon={randomSVG}
          riple
          description="Random"
          onClick={randomClickHandler}
        />
        <Button
          tooltip="Colors"
          className="btn_interface"
          icon={colorsPaleteSVG}
          riple
          description="Colors"
          onClick={toggleOptionsHandler}
        />
        <Button
          tooltip="Options"
          className="btn_interface"
          icon={optionsSVG}
          riple
          description="Options"
        />
        <Button
          tooltip="Profile"
          className="btn_interface"
          icon={profileSVG}
          riple
          description="Profile"
        />
      </GameBar>
      {themeBar.show && (
        <ThemeBar {...themeBar} closeHandler={toggleOptionsHandler}>
          <ColorPicker
            colors={[
              '#b31449bf',
              '#9c27b0bf',
              '#673ab7bf',
              '#3f51b5bf',
              '#2196f3bf',
              '#00bcd4bf',
              '#4caf50bf',
              '#609721bf',
              '#b86e00bf',
              '#1f1f1fbf',
            ]}
            variableOfTheme="--main-bg-color"
            tooltip="Theme Color"
            showRight={colorPickerShowRight}
          />
          <ColorPicker
            colors={['#5b1084', '#0f41a3', '#7d540c', '#1f1f1f', '#8b272b']}
            variableOfTheme="dead"
            tooltip="Dead Color"
            icon={deadSVG}
            showRight={colorPickerShowRight}
            onChange={gameActions.setCanvasColor}
            canvas
          />
          <ColorPicker
            colors={[
              '#ff7a7a',
              '#a8a8a8',
              '#404040',
              '#ff6bbf',
              '#ff9a6b',
              '#ee80ff',
              '#8880ff',
              '#6bfffd',
              '#efff61',
              '#61ff79',
            ]}
            canvas
            variableOfTheme="alive"
            tooltip="Alive Color"
            icon={aliveSVG}
            showRight={colorPickerShowRight}
            onChange={gameActions.setCanvasColor}
          />
        </ThemeBar>
      )}
      <ItemPreview themeBar={themeBar} gameBar={gameBar} />
      <div
        className="grid_game"
        style={{
          height: `${innerHeight - 30}px`,
          width: `${innerWidth - 30}px`,
        }}
      >
        <GameCell width={innerWidth - 30} height={innerHeight - 30} />
      </div>
    </div>
  );
};
