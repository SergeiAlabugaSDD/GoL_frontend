import { useForm } from 'react-hook-form';

// components
import { Button } from '../../components';

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

  const onRegistrationSubmit = () => {
    // data
    reset();
  };
  const onRegistrationError = () => {
    // errorsSubmit, e
    return undefined;
  };

  // form registration

  const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[а-яёa-z0-9](?:[а-яёa-z0-9-]*[ёа-яa-z0-9])?\.)+([a-z0-9]{2,}$|[а-яё0-9]{2,}$)/;
  const passRegex = /^(?=.*\d)(?=.*[a-zа-я])(?=.*[A-ZА-Я])[0-9a-zA-Zа-яА-Я]{8,}$/;

  return (
    <form
      className="flex d_column"
      onSubmit={handleSubmit(onRegistrationSubmit, onRegistrationError)}
    >
      <div className="relative">
        <input
          type="text"
          className="input_text"
          name="name"
          placeholder="Name"
          ref={register({
            required: 'this is a required!',
            minLength: {
              value: 2,
              message: 'Your name is too short.',
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
            required: 'this is a required!',
            pattern: {
              value: emailRegex,
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
              value: passRegex,
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

      <Button className="button_primary" type="submit" riple>
        submit
      </Button>
    </form>
  );
};
