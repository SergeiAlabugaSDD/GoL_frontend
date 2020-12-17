import { useSelector } from 'react-redux';

// // component
import { Canvas } from './components';

// // selectors
import { gameCellSelectors } from './reducer';
import { interfaceSelectors } from '../interface/reducer';

export const GameCell = () => {
  const gameCell = useSelector(gameCellSelectors.getCellConfig);
  const field = useSelector(gameCellSelectors.getField);
  const rules = useSelector(interfaceSelectors.getRules);

  return (
    <div className="full_h full_w">
      <Canvas gameCell={gameCell} field={field} rules={rules} />
    </div>
  );
};
