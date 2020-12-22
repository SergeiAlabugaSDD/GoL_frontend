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

  useEffect(() => {
    window.addEventListener('wheel', onScrollHandler);
    return () => {
      window.removeEventListener('wheel', onScrollHandler);
    };
  }, [dispatch, onScrollHandler]);

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
    <div className="full_h full_w relative">
      <Canvas
        gameCell={gameCell}
        field={field}
        rules={rules}
        innerHeight={innerHeight}
        innerWidth={innerWidth}
      />
    </div>
  );
};
