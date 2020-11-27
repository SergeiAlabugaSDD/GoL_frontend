import { useForm } from 'react-hook-form';

// styles
import './styles.css';

export const LoginForm = () => {
  // form login
  const { register, handleSubmit, errors, reset, clearErrors } = useForm();

  const onLoginSubmit = (data) => {
    console.log(data);
    reset();
  };
  const onLoginError = (errorsSubmit, e) => console.log(errorsSubmit, e);

  // form registration

  return (
    <form
      className="flex d-column"
      onSubmit={handleSubmit(onLoginSubmit, onLoginError)}
    >
      <div className="relative">
        <input
          className="input_text"
          name="name"
          placeholder="Name or E-Mail"
          ref={register({
            required: 'this is a required',
            minLength: {
              value: 2,
              message: 'Your name is too short',
            },
          })}
          onInput={() => clearErrors('name')}
        />
        {errors.name && (
          <span className="input_error">{errors.name.message}</span>
        )}
      </div>
      <div className="relative">
        <input
          className="input_text"
          name="password"
          ref={register({
            required: 'this is a required',
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
              message:
                'Your password least 8 characters, 1 number, 1 upper and 1 lowercase',
            },
          })}
          placeholder="Password"
          type="password"
          onInput={() => clearErrors('password')}
        />
        {errors.password && (
          <span className="input_error">{errors.password.message}</span>
        )}
      </div>

      <input className="button_primary" type="submit" value="login" />
    </form>
  );
};
