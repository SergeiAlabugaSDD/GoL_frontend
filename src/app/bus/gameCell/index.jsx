import { useSelector } from 'react-redux';

// component
import { Canvas } from './components';

// selectors
import { gameCellSelectors } from './reducer';
import { interfaceSelectors } from '../interface/reducer';

export const GameCell = () => {
  const gameCell = useSelector(gameCellSelectors.getCell);
  const { innerWidth, innerHeight } = useSelector(
    interfaceSelectors.getUserView
  );

  return (
    <div className="full_h full_w">
      <Canvas
        innerWidth={innerWidth}
        innerHeight={innerHeight}
        gameCell={gameCell}
      />
    </div>
  );
};
