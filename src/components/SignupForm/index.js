import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import UserService from '../../services/userService';
import logo from '../../assets/logo.png';
import spin from '../../assets/spin.gif';
import ButtonForm from '../ButtonForm';

import './SignupForm.scss';

function SignupForm() {
  const { register, handleSubmit, errors, getValues } = useForm();
  const [isLoading, setIsLoading] = useState();
  const [submitErrors, setSubmitErrors] = useState([]);

  const isPasswordEqual = (password: string) => password === getValues('password');

  const userHttpService = new UserService();

  const onSubmit = handleSubmit(({ firstName, lastName, email, password, confirmPassword }) => {
    const USER = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    };

    setIsLoading(true);
    userHttpService.signUp(USER).then(response => {
      if (!response.ok && response.data.errors && response.data.errors.full_messages) {
        setSubmitErrors(response.data.errors.full_messages);
      } else {
        // eslint-disable-next-line no-console
        console.log(response);
        setSubmitErrors([]);
      }
      setIsLoading(false);
    });
  });

  return (
    <div className="signup-form">
      <img src={logo} className="logo" />
      {submitErrors.map(error => (
        <div key={error} className="submit-errors">
          - {error}
        </div>
      ))}
      <form onSubmit={onSubmit}>
        <div>
          <label>Nombre</label>
          <span className="error">{errors.firstName && errors.firstName.message}</span>
          <input name="firstName" ref={register({ required: 'Requerido' })} />
        </div>
        <div>
          <label>Apellido</label>
          <span className="error">{errors.lastName && errors.lastName.message}</span>
          <input name="lastName" ref={register({ required: 'Requerido' })} />
        </div>
        <div>
          <label>Email</label>
          <span className="error">{errors.email && errors.email.message}</span>
          <input
            name="email"
            ref={register({
              required: 'Requerido',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'email inválido'
              }
            })}
          />
        </div>
        <div>
          <label>Password</label>
          <span className="error">{errors.password && errors.password.message}</span>
          <input name="password" type="password" ref={register({ required: 'Requerido' })} />
        </div>
        <div>
          <label>Confirmación de Password</label>
          <span className="error">
            {errors.confirmPassword && errors.confirmPassword.message}
            {errors.confirmPassword && errors.confirmPassword.type === 'validate' && (
              <div className="error">Las contraseñas deben coincidir</div>
            )}
          </span>
          <input
            name="confirmPassword"
            type="password"
            ref={register({ required: 'Requerido', validate: isPasswordEqual })}
          />
        </div>
        {isLoading ? (
          <img src={spin} className="logo" />
        ) : (
          <>
            <ButtonForm type="submit" text="Sign Up" isFilled />
            <div className="divider" />
            <ButtonForm text="Login" type="button" />
          </>
        )}
      </form>
    </div>
  );
}

export default SignupForm;
