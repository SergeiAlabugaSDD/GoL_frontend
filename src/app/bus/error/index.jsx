import { useSelector, useDispatch } from 'react-redux';

// selectors
import { errorSelectors } from './reducer';

// actions
import { errorActions } from './actions';

// components
import { Button } from '../../components';

// styles
import './styles.css';

// assets
import { ReactComponent as ErrorSVG } from './assets/warning.svg';

export const Error = () => {
  const dispatch = useDispatch();
  const { error, message } = useSelector(errorSelectors.getError);

  const clickHandler = () => {
    dispatch(errorActions.setErrorNull());
  };

  return (
    <>
      {error && (
        <div className="error">
          <h2 className="error_title flex a_c j_c">
            <ErrorSVG width={30} height={30} fill="var(--main-font-color)" />
            Error
          </h2>
          <p className="error_message">{message}</p>
          <Button
            tooltip="OK"
            className="error_btn"
            riple
            description="OK"
            onClick={clickHandler}
          >
            OK
          </Button>
        </div>
      )}
    </>
  );
};
