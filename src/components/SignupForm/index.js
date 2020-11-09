import React from 'react';
import { useForm } from 'react-hook-form';

import logo from '../../app/assets/logo.png';
import ButtonForm from '../ButtonForm';
import InputText from '../InputText';
import { isPasswordEqual, emailPattern } from '../../utils/formValidations';

import { AUTH_INPUTS } from './fields';
import styles from './styles.module.scss';

function SignupForm() {
  const { register, handleSubmit, errors, getValues } = useForm();

  const onSubmit = handleSubmit(({ firstName, lastName, email, password, confirmPassword }) => {
    const user = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    };
    console.log({ user });
  });

  return (
    <div className={styles.signupForm}>
      <img src={logo} className={styles.logo} />
      <form onSubmit={onSubmit}>
        <InputText
          label="Nombre"
          name={AUTH_INPUTS.firstName}
          inputRef={register({ required: 'Requerido' })}
          error={errors[AUTH_INPUTS.firstName]?.message}
        />
        <InputText
          label="Apellido"
          name={AUTH_INPUTS.lastName}
          inputRef={register({ required: 'Requerido' })}
          error={errors[AUTH_INPUTS.lastName]?.message}
        />
        <InputText
          label="Email"
          name={AUTH_INPUTS.email}
          inputRef={register({
            required: 'Requerido',
            pattern: emailPattern
          })}
          error={errors[AUTH_INPUTS.email]?.message}
        />
        <InputText
          label="Password"
          type="password"
          name={AUTH_INPUTS.password}
          inputRef={register({ required: 'Requerido' })}
          error={errors[AUTH_INPUTS.password]?.message}
        />
        <InputText
          label="Confirmar password"
          type="password"
          name={AUTH_INPUTS.confirmPassword}
          inputRef={register({
            required: 'Requerido',
            validate: confirmPassword => {
              if (!isPasswordEqual(confirmPassword, getValues('password'))) {
                return 'Las contraseñas no coinciden';
              }
              return true;
            }
          })}
          error={errors[AUTH_INPUTS.confirmPassword]?.message}
        />
        <ButtonForm type="submit" isFilled>
          Sign Up
        </ButtonForm>
        <ButtonForm type="button" isDivider>
          Login
        </ButtonForm>
      </form>
    </div>
  );
}

export default SignupForm;
