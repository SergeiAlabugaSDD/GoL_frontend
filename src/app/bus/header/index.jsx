import { Logo } from '../../components';

// instruments

import { HighlightedLine } from './components';

// styles
import './styles.css';

export const Header = () => {
  return (
    <header className="header span2">
      <Logo />
      <HighlightedLine color="#8926f2ab" />
    </header>
  );
};
