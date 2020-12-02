import { usePreview } from 'react-dnd-preview';

// lodash
import { throttle } from 'lodash-es';

// components

import { GameBar } from '../GameBar';

export const ItemPreview = () => {
  const { display, itemType, style } = usePreview();

  if (!display) {
    return null;
  }

  const renderPreview = throttle(() => {
    switch (itemType) {
      case 'GAME_BAR':
        return (
          <GameBar className="game_bar" displayPreview={display} {...style}>
            GAME BAR
          </GameBar>
        );

      default:
        return null;
    }
  }, 100);

  return <>{renderPreview()}</>;
};
