import { useState } from 'react';

import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// styles
import './styles.css';

// components
import { Logo } from '../../components/Logo';

export const LoginForm = () => {
  const [displayReg, setDisplayReg] = useState(false);

  const regDisplayHandle = () => {
    setDisplayReg(true);
  };

  const loginDisplayHandle = () => {
    setDisplayReg(false);
  };

  // form login
  const { register, handleSubmit, errors, reset } = useForm();

  const onLoginSubmit = (data) => {
    console.log(data);
    reset();
  };
  const onLoginError = (errorsSubmit, e) => console.log(errorsSubmit, e);

  // form registration

  return (
    <div className="login_wrapper flex d-column relative">
      {displayReg ? (
        <input
          className="button_primary"
          type="button"
          value="back"
          onClick={loginDisplayHandle}
        />
      ) : (
        <form
          className="flex d-column"
          onSubmit={handleSubmit(onLoginSubmit, onLoginError)}
        >
          <Logo title="Game of Life" />
          <input
            className="input_text"
            name="name"
            placeholder="Name or E-Mail"
            ref={register({ required: true })}
          />
          {errors.name && <span>This field is required</span>}
          <input
            className="input_text"
            name="password"
            ref={register({ required: true })}
            placeholder="Password"
            type="password"
          />
          {errors.mail && <span>This field is required</span>}

          <input className="button_primary" type="submit" value="login" />
          <input
            className="button_primary"
            type="submit"
            value="registration"
            onClick={regDisplayHandle}
          />
        </form>
      )}

      <span className="or_insert">or</span>
      <Link className="button_primary" to="/game">
        Try it Now!
      </Link>
    </div>
  );
};
