import React from 'react';
import { nanoid } from 'nanoid';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

// selectors
import { interfaceSelectors } from '../../reducer';

// actions
import { actions } from '../../actions';

// common component
import { RadioButton, DoubleSlider } from '../../../../components';

import './styles.css';

export const ConfigBar = React.memo(() => {
  const dispatch = useDispatch();
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
  return (
    <div onChange={handleSubmit(changeHandler)} className="flex full_w full_h">
      <div className="config_bar flex d_column">
        <h3 className="config_bar_title tac">Born</h3>
        <ul className="flex full_h j_b">
          {born.map((item, index) => {
            return (
              <RadioButton
                key={nanoid(4)}
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
      <div className="config_bar flex d_column a_c">
        <h3 className="tac">Alive</h3>
        <DoubleSlider alive={alive} changeHandler={aliveChangeHandler} />
      </div>
    </div>
  );
});
