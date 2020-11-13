import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { t } from 'i18next';
import { Link, Redirect } from 'react-router-dom';

import logo from '../../app/assets/logo.png';
import ButtonForm from '../ButtonForm';
import InputText from '../InputText';
import { emailPattern } from '../../utils/formValidations';
import { login, persistSession } from '../../services/userService';
import useRequest from '../../app/hooks/useRequest';
import { AUTH_INPUTS } from '../../constants/forms';

import styles from './styles.module.scss';

function LoginForm() {
  const [userData, setUserData] = useState();
  const { register, handleSubmit, errors } = useForm();
  const [isLoading, submitError, response] = useRequest({ request: login, payload: userData });
  const onSubmit = handleSubmit(({ email, password }) => {
    setUserData({
      email,
      password
    });
  });

  if (response && response.ok && response.headers && response.headers.accessToken) {
    persistSession(response.headers.accessToken);
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.loginForm}>
      <img src={logo} className={styles.logo} />
      {submitError && submitError.length ? (
        <div className={styles.submitErrors} data-testid="error">
          - {submitError}
        </div>
      ) : null}
      <form onSubmit={onSubmit}>
        <InputText
          label={t('LoginForm:labelEmail')}
          name={AUTH_INPUTS.email}
          inputRef={register({
            required: t('FormValidations:required'),
            pattern: emailPattern
          })}
          error={errors[AUTH_INPUTS.email]?.message}
        />
        <InputText
          label={t('LoginForm:labelPassword')}
          type="password"
          name={AUTH_INPUTS.password}
          inputRef={register({ required: t('FormValidations:required') })}
          error={errors[AUTH_INPUTS.password]?.message}
        />
        {isLoading ? (
          <p data-testid="loading">{t('FormValidations:loading')}...</p>
        ) : (
          <>
            <ButtonForm type="submit" name="loginButton" isFilled>
              {t('FormValidations:login')}
            </ButtonForm>
            <Link to="/signup">
              <ButtonForm type="button" name="signUpButton" isDivider>
                {t('FormValidations:signup')}
              </ButtonForm>
            </Link>
          </>
        )}
      </form>
    </div>
  );
}

export default LoginForm;
