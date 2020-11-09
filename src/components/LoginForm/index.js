import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import logo from '../../app/assets/logo.png';
import ButtonForm from '../ButtonForm';
import InputText from '../InputText';
import { emailPattern } from '../../utils/formValidations';
import { login } from '../../services/userService';
import spin from '../../assets/spin.gif';
import useRequest from '../../hooks/useRequest';

import { AUTH_INPUTS } from './fields';
import styles from './styles.module.scss';

function LoginForm() {
  const { t } = useTranslation();
  const { register, handleSubmit, errors } = useForm();
  const [isLoading, submitErrors, setSubmit] = useRequest(login);
  const onSubmit = handleSubmit(({ email, password }) => {
    const credentials = {
      email,
      password
    };
    setSubmit(credentials);
  });

  return (
    <div className={styles.loginForm}>
      <img src={logo} className={styles.logo} />
      {submitErrors.map(error => (
        <div className={styles.submitErrors} key={error}>
          - {error}
        </div>
      ))}
      <form onSubmit={onSubmit}>
        <InputText
          label={t('login.form.email.label')}
          name={AUTH_INPUTS.email}
          inputRef={register({
            required: t('required'),
            pattern: emailPattern
          })}
          error={errors[AUTH_INPUTS.email]?.message}
        />
        <InputText
          label={t('login.form.password.label')}
          type="password"
          name={AUTH_INPUTS.password}
          inputRef={register({ required: t('required') })}
          error={errors[AUTH_INPUTS.password]?.message}
        />
        {isLoading ? (
          <img src={spin} />
        ) : (
          <>
            <ButtonForm type="submit" isFilled>
              {t('button.login')}
            </ButtonForm>
            <Link to="/signup">
              <ButtonForm type="button" isDivider>
                {t('button.signup')}
              </ButtonForm>
            </Link>
          </>
        )}
      </form>
    </div>
  );
}

export default LoginForm;
