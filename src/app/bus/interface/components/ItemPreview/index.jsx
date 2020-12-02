import { usePreview } from 'react-dnd-preview';

// lodash
import { throttle } from 'lodash-es';

// components

import { GameBar } from '../GameBar';

export const ItemPreview = () => {
  const { itemType, style } = usePreview();

  const renderPreview = throttle(() => {
    switch (itemType) {
      case 'GAME_BAR':
        return (
          <GameBar className="game_bar" {...style}>
            GAME BAR
          </GameBar>
        );

      default:
        return null;
    }
  }, 100);

  return <>{renderPreview()}</>;
};
