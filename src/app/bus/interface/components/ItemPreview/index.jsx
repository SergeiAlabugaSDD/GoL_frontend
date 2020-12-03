import { usePreview } from 'react-dnd-preview';
import PropTypes from 'prop-types';

// lodash
import { throttle } from 'lodash-es';

// components

import { GameBar } from '../GameBar';
import { ThemeBar } from '../ThemeBar';

export const ItemPreview = ({ gameBar, themeBar }) => {
  const { display, itemType, style } = usePreview();

  if (!display) {
    return null;
  }

  const renderPreview = throttle(() => {
    switch (itemType) {
      case 'GAME_BAR':
        return (
          <GameBar
            className="game_bar"
            displayPreview={display}
            {...style}
            width={gameBar.width}
            height={gameBar.height}
          >
            GAME BAR
          </GameBar>
        );
      case 'THEME_BAR':
        return (
          <ThemeBar
            show
            displayPreview={display}
            width={themeBar.width}
            height={themeBar.height}
            {...style}
          >
            THEME BAR
          </ThemeBar>
        );

      default:
        return null;
    }
  }, 100);

  return <>{renderPreview()}</>;
};

ItemPreview.propTypes = {
  gameBar: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,
  }).isRequired,
  themeBar: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,
  }).isRequired,
};
