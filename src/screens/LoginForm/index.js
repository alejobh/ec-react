import React from 'react';
import { useForm } from 'react-hook-form';
import { t } from 'i18next';
import { Link, useHistory } from 'react-router-dom';
import clsx from 'clsx';

import logo from '../../app/assets/logo.png';
import ButtonForm from '../../components/ButtonForm';
import InputText from '../../components/InputText';
import { emailPattern } from '../../utils/formValidations';
import { login } from '../../services/userService';
import useLazyRequest from '../../app/hooks/useLazyRequest';
import { AUTH_INPUTS } from '../../constants/forms';
import { PATHS } from '../../constants/paths';

import styles from './styles.module.scss';

function LoginForm() {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [isLoading, submitError, response, sendRequest] = useLazyRequest({ request: login });
  const onSubmit = handleSubmit(({ email, password }) => {
    sendRequest({
      email,
      password
    });
  });

  if (response?.ok) {
    history.push(PATHS.root);
  }

  return (
    <div className="column center">
      <div className={clsx(styles.loginForm, 'column')}>
        <img src={logo} className={styles.logo} />
        {submitError && submitError.length > 0 && (
          <div className={styles.submitErrors} data-testid="error">
            - {submitError}
          </div>
        )}
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
              <Link to={PATHS.signup} className={styles.link}>
                <ButtonForm type="button" name="signUpButton" isDivider>
                  {t('FormValidations:signup')}
                </ButtonForm>
              </Link>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
