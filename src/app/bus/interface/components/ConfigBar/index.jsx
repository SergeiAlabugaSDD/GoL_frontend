/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import classnames from 'classnames';
import { nanoid } from 'nanoid';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

// selectors
import { interfaceSelectors } from '../../reducer';
import { gameCellSelectors } from '../../../gameCell/reducer';

// actions
import { actions } from '../../actions';
import { gameActions } from '../../../gameCell/actions';

// common component
import { RadioButton, DoubleSlider, Checkbox } from '../../../../components';

import './styles.css';
import { ReactComponent as Question } from '../../assets/icons/question.svg';

// generate uniq ids for radioButton
const keys = new Array(8).fill(0);
keys.forEach((item, index) => {
  keys[index] = nanoid(6);
});

export const ConfigBar = React.memo(({ centered }) => {
  const dispatch = useDispatch();
  // state for question description
  const [showDescr, setShowDescr] = useState([false, false, false]);

  // data from store
  const { born, alive } = useSelector(interfaceSelectors.getRules);
  const { waitTime } = useSelector(gameCellSelectors.getCellConfig);

  // styles
  const wrapperStyles = classnames('flex full_w full_h', {
    d_column: centered,
  });
  const barStyles = classnames('config_bar flex', {
    d_column: !centered,
    j_b: centered,
  });
  const radioBTNStyles = classnames('flex full_h', {
    j_b: !centered,
    j_a: centered,
    a_c: centered,
    full_w: centered,
  });
  // subscribe for changing radio-buttons values
  const { register, handleSubmit } = useForm({ mode: 'onChange' });

  // radio button handlers
  const changeHandler = (data) => {
    const newBorn = born.map((item, index) => {
      const newItem = Number(data.born) === index + 1 ? 1 : 0;
      return newItem;
    });
    dispatch(actions.setBorn(newBorn));
  };

  // slider change handlers
  const aliveChangeHandler = (newAlive) => {
    dispatch(actions.setAlive(newAlive));
  };
  const waitTimeChangeHandler = (newWait) => {
    dispatch(gameActions.setWaitTime(newWait[0]));
  };

  // mouse Over-Out handlers
  const mouseOverHandler = (e, id) => {
    const newShowArr = [...showDescr];
    newShowArr[id] = true;
    setShowDescr(newShowArr);
  };
  const toggleClickHandler = (e, id) => {
    const newShowArr = [...showDescr];
    newShowArr[id] = !showDescr[id];
    setShowDescr(newShowArr);
  };
  const mouseOutHandler = () => setShowDescr([false, false, false]);

  return (
    <div className={wrapperStyles}>
      <div className={barStyles}>
        <div className="config_bar_title flex a_c relative">
          <span>Born</span>
          <Question
            width="30px"
            height="16px"
            fill="var(--main-font-color)"
            onMouseOverCapture={(e) => mouseOverHandler(e, 0)}
            onFocus={(e) => mouseOverHandler(e, 0)}
            onMouseOut={mouseOutHandler}
            onBlur={mouseOutHandler}
            onTouchEnd={(e) => toggleClickHandler(e, 0)}
          />
          {showDescr[0] && (
            <ConfigDescription
              text="Counts of alive cells around a dead, needed to transform it to alive."
              show
            />
          )}
        </div>
        <ul onChange={handleSubmit(changeHandler)} className={radioBTNStyles}>
          {born.map((item, index) => {
            return (
              <RadioButton
                key={keys[index]}
                id={`born_${index + 1}`}
                label={index + 1}
                name="born"
                ref={register}
                checked={item === 1}
              />
            );
          })}
        </ul>
      </div>
      <div className={barStyles}>
        <div className="config_bar_title flex a_c relative">
          <span>Alive</span>
          <Question
            width="30px"
            height="16px"
            fill="var(--main-font-color)"
            onMouseOver={(e) => mouseOverHandler(e, 1)}
            onFocus={(e) => mouseOverHandler(e, 1)}
            onMouseLeave={mouseOutHandler}
            onBlur={mouseOutHandler}
            onTouchEnd={(e) => toggleClickHandler(e, 1)}
          />
          {showDescr[1] && (
            <ConfigDescription text="Counts of alive cells, needed to keep cell alive." />
          )}
        </div>
        <DoubleSlider
          domain={[1, 8]}
          values={alive}
          changeHandler={aliveChangeHandler}
        />
      </div>
      <div className={barStyles}>
        <div className="config_bar_title flex a_c relative">
          <span>Wait</span>
          <Question
            width="30px"
            height="16px"
            fill="var(--main-font-color)"
            onMouseOver={(e) => mouseOverHandler(e, 2)}
            onFocus={(e) => mouseOverHandler(e, 2)}
            onMouseLeave={mouseOutHandler}
            onBlur={mouseOutHandler}
            onTouchEnd={(e) => toggleClickHandler(e, 2)}
          />
          {showDescr[2] && (
            <ConfigDescription text='Time in "ms", before next generation will born.' />
          )}
        </div>
        <DoubleSlider
          domain={[0, 1000]}
          values={[waitTime]}
          changeHandler={waitTimeChangeHandler}
        />
      </div>
    </div>
  );
});

ConfigBar.propTypes = {
  centered: PropTypes.bool.isRequired,
};

const ConfigDescription = React.memo(({ text }) => {
  return <span className="config_bar_descr">{text}</span>;
});

ConfigDescription.propTypes = {
  text: PropTypes.string.isRequired,
};
