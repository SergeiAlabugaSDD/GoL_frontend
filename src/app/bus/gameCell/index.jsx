import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from 'lodash-es';

// // component
import { Canvas } from './components';

// // selectors
import { gameCellSelectors } from './reducer';
import { interfaceSelectors } from '../interface/reducer';

// actions
import { gameActions } from './actions';

// helpers
import { exitFullscreen, requestFullscreen } from '../interface/helpers';

// assets
import { ReactComponent as FullscreenSVG } from './assets/fullscreen.svg';
import { ReactComponent as ExitFullscreenSVG } from './assets/exit_fullscreen.svg';

export const GameCell = () => {
  const [fullScreen, setFullScreen] = useState(false);
  const dispatch = useDispatch();
  const gameCell = useSelector(gameCellSelectors.getCellConfig);
  const field = useSelector(gameCellSelectors.getField);
  const rules = useSelector(interfaceSelectors.getRules);
  const { innerWidth, innerHeight } = useSelector(interfaceSelectors.getView);

  const onScrollHandler = debounce(
    (e) => {
      dispatch(
        gameActions.setSize({
          increase: e.deltaY < 0,
          userWidth: innerWidth,
          userHeight: innerHeight,
        })
      );
    },
    30,
    { leading: false }
  );

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

  const clickZoomHandler = (increse) => {
    dispatch(
      gameActions.setSize({
        increase: increse,
        userWidth: innerWidth,
        userHeight: innerHeight,
      })
    );
  };

  // effect to check scrolling
  useEffect(() => {
    window.addEventListener('wheel', onScrollHandler);
    return () => {
      window.removeEventListener('wheel', onScrollHandler);
    };
  }, [dispatch, onScrollHandler]);

  // effect need for rerender canvas with new innerWidth and innerHeight after dispatch SET_USER_VIEW in interface line:135
  useEffect(() => {
    dispatch(
      gameActions.setSize({
        increase: 'same',
        userWidth: innerWidth,
        userHeight: innerHeight,
      })
    );
  }, [dispatch, innerWidth, innerHeight]);

  return (
    <div className="full_h full_w">
      <Canvas
        gameCell={gameCell}
        field={field}
        rules={rules}
        innerHeight={innerHeight}
        innerWidth={innerWidth}
      />
      <div className="flex canvas-game_setsize">
        <button
          className="zoom-btn"
          type="button"
          onClick={() => clickZoomHandler(true)}
        >
          +
        </button>
        <span className="zoom-btn flex a_c j_c">zoom</span>
        <button
          className="zoom-btn"
          type="button"
          onClick={() => clickZoomHandler(false)}
        >
          -
        </button>
      </div>
      <button
        className="zoom-btn fullscreen-btn"
        type="button"
        onClick={toggleFullScreenHandler}
      >
        {fullScreen ? (
          <ExitFullscreenSVG
            width={15}
            height={15}
            fill="var(--main-font-color)"
          />
        ) : (
          <FullscreenSVG width={15} height={15} fill="var(--main-font-color)" />
        )}
      </button>
    </div>
  );
};
