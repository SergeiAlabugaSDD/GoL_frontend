import { useSelector } from 'react-redux';

import './styles.css';

// bus
import { Interface } from '../../bus/interface';

// selectors
import { interfaceSelectors } from '../../bus/interface/reducer';

export const Game = () => {
  const { innerHeight } = useSelector(interfaceSelectors.getUserView);

  return (
    <div className="game" style={{ gridTemplateRows: `${innerHeight}px` }}>
      <div className="span2">
        <Interface />
      </div>
    </div>
  );
};
