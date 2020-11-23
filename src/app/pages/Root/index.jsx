import './styles.css';

import { Header } from '../../bus/header';
import { Interface } from '../../bus/interface';

export const Root = () => {
  return (
    <div className="layout">
      <div className="grid_main">
        <Header />
        <div className="span2">
          <Interface />
        </div>
      </div>
    </div>
  );
};
