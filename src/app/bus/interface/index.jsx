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
import { gameCellSelectors } from '../gameCell/reducer';

// components
import { ItemPreview, GameBar, ThemeBar, ColorPicker } from './components';
import { Button } from '../../components';

// bus
import { GameCell } from '../gameCell';

// assets
import { ReactComponent as PresetSVG } from './assets/icons/presets.svg';
import { ReactComponent as OptionsSVG } from './assets/icons/config.svg';
import { ReactComponent as ProfileSVG } from './assets/icons/profile.svg';
import { ReactComponent as AliveSVG } from './assets/icons/alive.svg';
import { ReactComponent as DeadSVG } from './assets/icons/skull.svg';
import { ReactComponent as ColorsPaleteSVG } from './assets/icons/pick_color.svg';
import { ReactComponent as RandomSVG } from './assets/icons/random.svg';
import { ReactComponent as RunSVG } from './assets/icons/pixels_run.svg';
import { ReactComponent as StopSVG } from './assets/icons/pixels_stop.svg';
import { ReactComponent as StepSVG } from './assets/icons/next_step.svg';
import { ReactComponent as ThemeSVG } from './assets/icons/theme.svg';

export const Interface = () => {
  // redux hooks
  const dispatch = useDispatch();
  const {
    gameBar,
    themeBar,
    userView: { innerHeight, innerWidth },
  } = useSelector(interfaceSelectors.getInterface);

  const { running } = useSelector(gameCellSelectors.getCellConfig);

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
          tooltip="RUN"
          className="btn_interface"
          riple
          description="RUN"
          onClick={runHandler}
        >
          {running ? (
            <StopSVG width="80%" height="80%" fill="var(--main-font-color)" />
          ) : (
            <RunSVG width="80%" height="80%" fill="var(--main-font-color)" />
          )}
        </Button>
        <Button
          tooltip="Step"
          className="btn_interface"
          riple
          description="Step"
        >
          <StepSVG width="80%" height="80%" fill="var(--main-font-color)" />
        </Button>
        <Button
          tooltip="Presets"
          className="btn_interface"
          riple
          description="Presets"
        >
          <PresetSVG width="80%" height="80%" fill="var(--main-font-color)" />
        </Button>
        <Button
          tooltip="Random"
          className="btn_interface"
          riple
          description="Random"
          onClick={randomClickHandler}
        >
          <RandomSVG width="80%" height="80%" fill="var(--main-font-color)" />
        </Button>
        <Button
          tooltip="Colors"
          className="btn_interface"
          riple
          description="Colors"
          onClick={toggleOptionsHandler}
        >
          <ColorsPaleteSVG
            width="80%"
            height="80%"
            fill="var(--main-font-color)"
          />
        </Button>
        <Button
          tooltip="Options"
          className="btn_interface"
          riple
          description="Options"
        >
          <OptionsSVG width="80%" height="80%" fill="var(--main-font-color)" />
        </Button>
        <Button
          tooltip="Profile"
          className="btn_interface"
          riple
          description="Profile"
        >
          <ProfileSVG width="80%" height="80%" fill="var(--main-font-color)" />
        </Button>
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
          >
            <ThemeSVG width="80%" height="80%" fill="var(--main-font-color)" />
          </ColorPicker>
          <ColorPicker
            colors={['#5b1084', '#0f41a3', '#7d540c', '#1f1f1f', '#8b272b']}
            variableOfTheme="dead"
            tooltip="Dead Color"
            showRight={colorPickerShowRight}
            onChange={gameActions.setCanvasColor}
            canvas
          >
            <DeadSVG width="80%" height="80%" fill="var(--main-font-color)" />
          </ColorPicker>
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
            showRight={colorPickerShowRight}
            onChange={gameActions.setCanvasColor}
          >
            <AliveSVG width="80%" height="80%" fill="var(--main-font-color)" />
          </ColorPicker>
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
