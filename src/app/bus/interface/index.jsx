import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from 'lodash-es';

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
import {
  ItemPreview,
  GameBar,
  ThemeBar,
  ColorPicker,
  PresetsBar,
} from './components';
import { Button } from '../../components';

// bus
import { GameCell } from '../gameCell';

// assets
import {
  PresetSVG,
  OptionsSVG,
  ProfileSVG,
  AliveSVG,
  DeadSVG,
  ColorsPaleteSVG,
  RandomSVG,
  RunSVG,
  StopSVG,
  StepSVG,
  ThemeSVG,
  ClearSVG,
  SphereSVG,
  FieldSVG,
  FullscreenSVG,
  ExitFullscreenSVG,
} from './assets/icons';

// helpers
import { exitFullscreen, requestFullscreen } from '../../helpers';

export const Interface = () => {
  const [fullScreen, setFullScreen] = useState(false);
  // redux hooks
  const dispatch = useDispatch();

  // selectors
  const {
    gameBar,
    themeBar,
    presetsBar,
    userView: { innerWidth, innerHeight },
  } = useSelector(interfaceSelectors.getInterface);

  const { running, limited } = useSelector(gameCellSelectors.getCellConfig);

  // check position of themeBar
  const colorPickerShowRight =
    themeBar.width + 250 + themeBar.left < innerWidth;

  // handlers of themeBar
  const toggleThemeBarHandler = () => {
    dispatch(actions.toggleThemeBarAction());
  };

  // handlers of gameBar
  const toggleFullScreenHandler = () => {
    if (fullScreen) {
      exitFullscreen();
      setFullScreen(false);
      return undefined;
    }
    requestFullscreen(document.documentElement);
    setFullScreen(true);
    return undefined;
  };
  const toggleLimitedHandler = () => {
    dispatch(gameActions.toggleLimitedField());
  };
  const toggleConfigHandler = () => {
    dispatch(actions.toggleConfigBar());
  };
  const togglePresetHandler = () => {
    dispatch(actions.togglePresetBar());
  };
  const randomClickHandler = () => {
    dispatch(gameActions.generateRandomAction());
  };
  const clearClickHandler = () => {
    dispatch(gameActions.clearField());
  };
  const nextStepHandler = () => {
    dispatch(gameActions.goOneStep());
  };
  const runHandler = () => {
    dispatch(gameActions.toggleRun());
  };

  // drag'n'drop hook
  const [{ isDragging }, drop] = useDrop({
    accept: Object.values(dndItemTypes),
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      dispatch(actions.moveItemOfInterface({ id: item.id, left, top }));
      return undefined;
    },
    collect: (monitor) => ({
      isDragging: monitor.isOver(),
    }),
  });

  const resizeHandler = debounce(
    () => {
      dispatch(
        actions.setUserView({
          newHeight: window.innerHeight,
          newWidth: window.innerWidth,
        })
      );
      dispatch(
        actions.moveItemOfInterface({ left: gameBar.left, top: gameBar.top })
      );
    },
    100,
    { leading: false }
  );

  useEffect(() => {
    // stop rendering canvas if user dragging element of interface
    if (running && isDragging) dispatch(gameActions.toggleRun());

    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, [running, isDragging, dispatch, resizeHandler]);

  useEffect(() => {
    dispatch(
      actions.setUserView({
        newHeight: window.innerHeight,
        newWidth: window.innerWidth,
      })
    );
  }, [dispatch]);

  return (
    <div ref={drop} className="game_wrapper">
      <GameBar {...gameBar} innerHeight={innerHeight}>
        <button
          className="fullscreen-btn"
          type="button"
          onClick={toggleFullScreenHandler}
        >
          {fullScreen ? (
            <ExitFullscreenSVG
              width={22}
              height={22}
              fill="var(--main-font-color)"
            />
          ) : (
            <FullscreenSVG
              width={20}
              height={20}
              fill="var(--main-font-color)"
            />
          )}
        </button>
        <Button
          tooltip={`${running ? 'STOP' : 'RUN'}`}
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
          onClick={nextStepHandler}
        >
          <StepSVG width="80%" height="80%" fill="var(--main-font-color)" />
        </Button>
        <Button
          tooltip="Presets"
          className="btn_interface"
          riple
          description="Presets"
          onClick={togglePresetHandler}
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
          tooltip="Clear"
          className="btn_interface"
          riple
          description="Clear"
          onClick={clearClickHandler}
        >
          <ClearSVG width="80%" height="80%" fill="var(--main-font-color)" />
        </Button>
        <Button
          tooltip={`${limited ? 'SPHERE' : 'FIELD'}`}
          className="btn_interface absolute"
          riple
          description="TOGGLE_SPHERE"
          onClick={toggleLimitedHandler}
        >
          {limited ? (
            <SphereSVG width="80%" height="80%" fill="var(--main-font-color)" />
          ) : (
            <FieldSVG width="80%" height="80%" fill="var(--main-font-color)" />
          )}
        </Button>
        <Button
          tooltip="Colors"
          className="btn_interface"
          riple
          description="Colors"
          onClick={toggleThemeBarHandler}
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
          onClick={toggleConfigHandler}
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
        <ThemeBar {...themeBar} closeHandler={toggleThemeBarHandler}>
          <ColorPicker
            tablet={themeBar.tablet}
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
            tablet={themeBar.tablet}
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
            tablet={themeBar.tablet}
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
          zIndex: `${isDragging ? '-1' : 'auto'} `,
        }}
      >
        <GameCell />
      </div>
      <PresetsBar show={presetsBar.show} toggleHandler={togglePresetHandler} />
    </div>
  );
};
