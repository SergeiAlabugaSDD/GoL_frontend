import { useForm } from 'react-hook-form';

// styles
import './styles.css';

export const RegistrationForm = () => {
  // form login
  const {
    register,
    handleSubmit,
    errors,
    reset,
    clearErrors,
    getValues,
  } = useForm();

  const onRegistrationSubmit = (data) => {
    console.log(data);
    reset();
  };
  const onRegistrationError = (errorsSubmit, e) => console.log(errorsSubmit, e);

  // form registration

  return (
    <form
      className="flex d-column"
      onSubmit={handleSubmit(onRegistrationSubmit, onRegistrationError)}
    >
      <div className="relative">
        <input
          type="text"
          className="input_text"
          name="name"
          placeholder="Name"
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
          type="text"
          className="input_text"
          name="email"
          placeholder="E-Mail"
          ref={register({
            required: 'this is a required',
            pattern: {
              value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
              message: 'Please, enter valid an email address.',
            },
          })}
          onInput={() => clearErrors('name')}
        />
        {errors.email && (
          <span className="input_error">{errors.email.message}</span>
        )}
      </div>
      <div className="relative">
        <input
          className="input_text"
          name="password"
          ref={register({
            required: 'this is a required!',
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
              message:
                'Your password least 8 characters, 1 number, 1 upper and 1 lowercase',
            },
          })}
          placeholder="Password"
          type="password"
          onInput={() => clearErrors(['password', 'repeat_password'])}
        />
        {errors.password && (
          <span className="input_error">{errors.password.message}</span>
        )}
      </div>
      <div className="relative">
        <input
          className="input_text"
          name="repeat_password"
          ref={register({
            required: 'this is a required!',
            validate: (value) =>
              value === getValues('password') ||
              'Both passwords must be the same.',
          })}
          placeholder="Repeat Password"
          type="password"
          onInput={() => clearErrors(['password', 'repeat_password'])}
        />
        {errors.repeat_password && (
          <span className="input_error">{errors.repeat_password.message}</span>
        )}
      </div>

      <input className="button_primary" type="submit" value="submit" />
    </form>
  );
};
