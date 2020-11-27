import { useSelector, useDispatch } from 'react-redux';

// drag'n'drop
import { useDrop } from 'react-dnd';
import { dndItemTypes } from './dndItemTypes';

import './styles.css';

// actions
import { actions } from './actions';
import { interfaceSelectors } from './reducer';

// components
import { Button, ItemPreview, ResizebleLine, InputRange } from './components';

// another bus
import { Game } from '../game';

export const Interface = () => {
  // redux hooks
  const dispatch = useDispatch();
  const { buttonOK, rangeBorn } = useSelector(interfaceSelectors.getInterface);
  const { width, isStartResizing } = useSelector(
    interfaceSelectors.getResizeble
  );

  // drag'n'drop hook
  const [, drop] = useDrop({
    accept: Object.values(dndItemTypes),
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      dispatch(actions.moveItemOfInterface({ id: item.id, left, top }));
      return undefined;
    },
  });

  // resizeble
  const mouseDownHandler = () => {
    dispatch(actions.startResizing());
  };
  const mouseUpHandler = () => {
    dispatch(actions.endResizing());
  };
  const mouseMoveHandler = (e) => {
    if (isStartResizing) {
      dispatch(actions.moveResizeble(e.nativeEvent.pageX));
    }
  };

  return (
    <div
      className="interface"
      style={{
        gridTemplateColumns: `${width}px 6px 1fr`,
      }}
      onMouseUp={mouseUpHandler}
      onMouseMove={mouseMoveHandler}
    >
      <Game />
      <ResizebleLine mouseDownHandler={mouseDownHandler} />
      <div className="custom" ref={drop}>
        <Button
          id="buttonOK"
          title="button"
          onClick={() => {
            console.log('ok');
          }}
          {...buttonOK}
        />
        <InputRange
          id="rangeBorn"
          {...rangeBorn}
          label="Born"
          max={8}
          min={0}
          value={2}
          dndItemType={dndItemTypes.RANGE_BORN}
          className="input_range"
        />
        <ItemPreview />
      </div>
    </div>
  );
};
