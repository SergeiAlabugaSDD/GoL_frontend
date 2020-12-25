import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from 'lodash-es';

// // component
import { Canvas } from './components';

// // selectors
import { gameCellSelectors } from './reducer';
import { interfaceSelectors } from '../interface/reducer';

// actions
import { gameActions } from './actions';

export const GameCell = () => {
  const dispatch = useDispatch();
  const gameCell = useSelector(gameCellSelectors.getCellConfig);
  const field = useSelector(gameCellSelectors.getField);
  const rules = useSelector(interfaceSelectors.getRules);
  const { innerWidth, innerHeight } = useSelector(interfaceSelectors.getView);

  const onScrollHandler = debounce(
    (e) => {
      const zoomer = e.deltaY < 0 ? -1 : 1;
      dispatch(
        gameActions.setSize({
          increase: zoomer,
          userWidth: innerWidth,
          userHeight: innerHeight,
        })
      );
    },
    30,
    { leading: false }
  );

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
          onClick={() => clickZoomHandler(1)}
        >
          +
        </button>
        <span className="zoom-btn flex a_c j_c">zoom</span>
        <button
          className="zoom-btn"
          type="button"
          onClick={() => clickZoomHandler(-1)}
        >
          -
        </button>
      </div>
    </div>
  );
};
