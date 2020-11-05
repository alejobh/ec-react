import React from 'react';
import { useForm } from 'react-hook-form';

import logo from '../../app/assets/logo.png';
import ButtonForm from '../ButtonForm';
import InputText from '../InputText';
import { isPasswordEqual, emailPattern } from '../../utils';

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
          type="text"
          name={AUTH_INPUTS.firstName}
          reference={register({ required: 'Requerido' })}
          errors={errors[AUTH_INPUTS.firstName]}
        />
        <InputText
          label="Apellido"
          type="text"
          name={AUTH_INPUTS.lastName}
          reference={register({ required: 'Requerido' })}
          errors={errors[AUTH_INPUTS.lastName]}
        />
        <InputText
          label="Email"
          type="text"
          name={AUTH_INPUTS.email}
          reference={register({
            required: 'Requerido',
            pattern: emailPattern
          })}
          errors={errors[AUTH_INPUTS.email]}
        />
        <InputText
          label="Password"
          type="password"
          name={AUTH_INPUTS.password}
          reference={register({ required: 'Requerido' })}
          errors={errors[AUTH_INPUTS.password]}
        />
        <InputText
          label="Confirmar password"
          type="password"
          name={AUTH_INPUTS.confirmPassword}
          reference={register({
            required: 'Requerido',
            validate: confirmPassword => {
              if (!isPasswordEqual(confirmPassword, getValues('password'))) {
                return 'Las contraseñas no coinciden';
              }
              return true;
            }
          })}
          errors={errors[AUTH_INPUTS.confirmPassword]}
        />
        <ButtonForm type="submit" isFilled>
          Sign Up
        </ButtonForm>
        <div className={styles.divider} />
        <ButtonForm type="button">Login</ButtonForm>
      </form>
    </div>
  );
}

export default SignupForm;
