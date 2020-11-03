import React from 'react';
import { useForm } from 'react-hook-form';

import logo from '../../assets/logo.png';
import ButtonForm from '../ButtonForm';
import { isPasswordEqual, emailPattern } from '../../utils';

import styles from './SignupForm.module.scss';

function SignupForm() {
  const { register, handleSubmit, errors, getValues } = useForm();

  const onSubmit = handleSubmit(({ firstName, lastName, email, password, confirmPassword }) => {
    const USER = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    };
    console.log({ user: USER });
  });

  return (
    <div className={styles.signupForm}>
      <img src={logo} className={styles.logo} />
      <form onSubmit={onSubmit}>
        <div>
          <label className={styles.label}>Nombre</label>
          {errors.firstName && <span className={styles.error}>{errors.firstName.message}</span>}
          <input className={styles.input} name="firstName" ref={register({ required: 'Requerido' })} />
        </div>
        <div>
          <label className={styles.label}>Apellido</label>
          {errors.lastName && <span className={styles.error}>{errors.lastName.message}</span>}
          <input className={styles.input} name="lastName" ref={register({ required: 'Requerido' })} />
        </div>
        <div>
          <label className={styles.label}>Email</label>
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}
          <input
            className={styles.input}
            name="email"
            ref={register({
              required: 'Requerido',
              pattern: emailPattern
            })}
          />
        </div>
        <div>
          <label className={styles.label}>Password</label>
          {errors.password && <span className={styles.error}>{errors.password.message}</span>}
          <input
            className={styles.input}
            name="password"
            type="password"
            ref={register({ required: 'Requerido' })}
          />
        </div>
        <div>
          <label className={styles.label}>Confirmación de Password</label>
          {errors.confirmPassword && (
            <span className={styles.error}>
              {errors.confirmPassword.message}
              {errors.confirmPassword.type === 'validate' && (
                <div className={styles.error}>Las contraseñas deben coincidir</div>
              )}
            </span>
          )}
          <input
            className={styles.input}
            name="confirmPassword"
            type="password"
            ref={register({
              required: 'Requerido',
              validate: confirmPassword => isPasswordEqual(confirmPassword, getValues('password'))
            })}
          />
        </div>
        <ButtonForm type="submit" text="Sign Up" isFilled />
        <div className={styles.divider} />
        <ButtonForm text="Login" type="button" />
      </form>
    </div>
  );
}

export default SignupForm;
