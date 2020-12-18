/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

// selectors
import { interfaceSelectors } from '../../reducer';

// actions
import { actions } from '../../actions';

// common component
import { RadioButton, DoubleSlider } from '../../../../components';

import './styles.css';
import { ReactComponent as Question } from '../../assets/icons/question.svg';

// generate uniq ids for radioButton
const keys = new Array(8).fill(0);
keys.forEach((item, index) => {
  keys[index] = nanoid(6);
});

export const ConfigBar = React.memo(() => {
  const dispatch = useDispatch();
  const [showBornDescr, setShowBornDescr] = useState(false);
  const [showAliveDescr, setShowAliveDescr] = useState(false);
  const { born, alive } = useSelector(interfaceSelectors.getRules);
  const { register, handleSubmit } = useForm({ mode: 'onChange' });

  const changeHandler = (data) => {
    const newBorn = born.map((item, index) => {
      const newItem = Number(data.born) === index + 1 ? 1 : 0;
      return newItem;
    });
    dispatch(actions.setBorn(newBorn));
  };

  const aliveChangeHandler = (newAlive) => {
    dispatch(actions.setAlive(newAlive));
  };

  const mouseOverHandler = () => setShowBornDescr(true);
  const mouseOutHandler = () => setShowBornDescr(false);

  const mouseAliveOverHandler = () => setShowAliveDescr(true);
  const mouseAliveOutHandler = () => setShowAliveDescr(false);
  return (
    <div onChange={handleSubmit(changeHandler)} className="flex full_w full_h">
      <div className="config_bar flex d_column">
        <div className="config_bar_title flex a_c">
          <span>Born</span>
          <Question
            width="30px"
            height="16px"
            fill="var(--main-font-color)"
            onMouseOverCapture={mouseOverHandler}
            onFocus={mouseOverHandler}
            onMouseOut={mouseOutHandler}
            onBlur={mouseOutHandler}
          />
          {showBornDescr && (
            <ConfigDescription
              key={keys[8]}
              text="Count of alive cells, needed to transform dead to alive."
              show
            />
          )}
        </div>
        <ul className="flex full_h j_b">
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
      <div className="config_bar flex d_column">
        <div className="config_bar_title flex a_c">
          <span>Alive</span>
          <Question
            width="30px"
            height="16px"
            fill="var(--main-font-color)"
            onMouseOver={mouseAliveOverHandler}
            onFocus={mouseAliveOverHandler}
            onMouseLeave={mouseAliveOutHandler}
            onBlur={mouseAliveOutHandler}
          />
          {showAliveDescr && (
            <ConfigDescription text="Count of alive cells, needed to keep cell alive." />
          )}
        </div>
        <DoubleSlider
          domain={[1, 8]}
          values={alive}
          changeHandler={aliveChangeHandler}
        />
      </div>
    </div>
  );
});

const ConfigDescription = React.memo(({ text }) => {
  return <span className="config_bar_descr">{text}</span>;
});

ConfigDescription.propTypes = {
  text: PropTypes.string.isRequired,
};
