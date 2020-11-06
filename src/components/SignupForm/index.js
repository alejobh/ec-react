import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import logo from '../../app/assets/logo.png';
import ButtonForm from '../ButtonForm';
import InputText from '../InputText';
import { isPasswordEqual, emailPattern } from '../../utils/formValidations';
import { signUp } from '../../services/userService';
import spin from '../../assets/spin.gif';
import useRequest from '../../hooks/useRequest';

import { AUTH_INPUTS } from './fields';
import styles from './styles.module.scss';

function SignupForm() {
  const { t } = useTranslation();
  const { register, handleSubmit, errors, getValues } = useForm();
  const [isLoading, submitErrors, setSubmit] = useRequest(signUp);
  const onSubmit = handleSubmit(({ firstName, lastName, email, password, confirmPassword }) => {
    const user = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    };
    setSubmit(user);
  });

  return (
    <div className={styles.signupForm}>
      <img src={logo} className={styles.logo} />
      {submitErrors.map(error => (
        <div className={styles.submitErrors} key={error}>
          - {error}
        </div>
      ))}
      <form onSubmit={onSubmit}>
        <InputText
          label={t('signup.form.name.label')}
          type="text"
          name={AUTH_INPUTS.firstName}
          inputRef={register({ required: t('required') })}
          error={errors[AUTH_INPUTS.firstName]?.message}
        />
        <InputText
          label={t('signup.form.lastName.label')}
          type="text"
          name={AUTH_INPUTS.lastName}
          inputRef={register({ required: t('required') })}
          error={errors[AUTH_INPUTS.lastName]?.message}
        />
        <InputText
          label={t('signup.form.email.label')}
          type="text"
          name={AUTH_INPUTS.email}
          inputRef={register({
            required: t('required'),
            pattern: emailPattern
          })}
          error={errors[AUTH_INPUTS.email]?.message}
        />
        <InputText
          label={t('signup.form.password.label')}
          type="password"
          name={AUTH_INPUTS.password}
          inputRef={register({ required: t('required') })}
          error={errors[AUTH_INPUTS.password]?.message}
        />
        <InputText
          label={t('signup.form.confirmPassword.label')}
          type="password"
          name={AUTH_INPUTS.confirmPassword}
          inputRef={register({
            required: t('required'),
            validate: confirmPassword => {
              if (!isPasswordEqual(confirmPassword, getValues('password'))) {
                return t('signup.form.confirmPassword.error');
              }
              return true;
            }
          })}
          error={errors[AUTH_INPUTS.confirmPassword]?.message}
        />
        {isLoading ? (
          <img src={spin} />
        ) : (
          <>
            <ButtonForm type="submit" isFilled>
              {t('button.signup')}
            </ButtonForm>
            <ButtonForm type="button">{t('button.login')}</ButtonForm>
          </>
        )}
      </form>
    </div>
  );
}

export default SignupForm;
