import { useSelector, useDispatch } from 'react-redux';

import { useDrop } from 'react-dnd';
import { dndItemTypes } from './dndItemTypes';

import './styles.css';

import videoSource from './assets/bg_video.mp4';

// actions
import { actions } from './actions';
import { interfaceSelectors } from './reducer';

// dropable components
import { Button, ItemPreview, ResizebleLine, BGvideo } from './components';

export const Interface = () => {
  // redux hooks
  const dispatch = useDispatch();
  const buttonOK = useSelector(interfaceSelectors.getButtonOK);
  const { width, isStartResizing } = useSelector(
    interfaceSelectors.getResizeble
  );

  // drag'n'drop hook
  const [, drop] = useDrop({
    accept: dndItemTypes.BUTTON,
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
      <div className="game">GAME</div>
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
        <ItemPreview />
      </div>

      <BGvideo source={videoSource} />
    </div>
  );
};
