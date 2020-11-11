import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { t } from 'i18next';

import logo from '../../app/assets/logo.png';
import ButtonForm from '../ButtonForm';
import InputText from '../InputText';
import { isPasswordEqual, emailPattern } from '../../utils/formValidations';
import { signUp } from '../../services/userService';
import useRequest from '../../app/hooks/useRequest';
import { AUTH_INPUTS } from '../../constants/forms';

import styles from './styles.module.scss';

function SignupForm() {
  const [userData, setUserData] = useState();
  const { register, handleSubmit, errors, getValues } = useForm();
  const [isLoading, submitError, response] = useRequest({ request: signUp, payload: userData });
  const onSubmit = handleSubmit(({ firstName, lastName, email, password, confirmPassword }) => {
    setUserData({
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    });
    // eslint-disable-next-line no-console
    console.log(response);
  });

  return (
    <div className={styles.signupForm}>
      <img src={logo} className={styles.logo} />
      {submitError.length ? (
        <div className={styles.submitErrors} key={submitError}>
          - {submitError}
        </div>
      ) : null}
      <form onSubmit={onSubmit}>
        <InputText
          label={t('SignupForm:labelName')}
          name={AUTH_INPUTS.firstName}
          inputRef={register({ required: t('FormValidations:required') })}
          error={errors[AUTH_INPUTS.firstName]?.message}
        />
        <InputText
          label={t('SignupForm:labelLastName')}
          name={AUTH_INPUTS.lastName}
          inputRef={register({ required: t('FormValidations:required') })}
          error={errors[AUTH_INPUTS.lastName]?.message}
        />
        <InputText
          label={t('SignupForm:labelEmail')}
          name={AUTH_INPUTS.email}
          inputRef={register({
            required: t('FormValidations:required'),
            pattern: emailPattern
          })}
          error={errors[AUTH_INPUTS.email]?.message}
        />
        <InputText
          label={t('SignupForm:labelPassword')}
          type="password"
          name={AUTH_INPUTS.password}
          inputRef={register({ required: t('FormValidations:required') })}
          error={errors[AUTH_INPUTS.password]?.message}
        />
        <InputText
          label={t('SignupForm:labelConfirmPassword')}
          type="password"
          name={AUTH_INPUTS.confirmPassword}
          inputRef={register({
            required: t('FormValidations:required'),
            validate: confirmPassword => {
              if (!isPasswordEqual(confirmPassword, getValues('password'))) {
                return t('SignupForm:labelConfirmPasswordError');
              }
              return true;
            }
          })}
          error={errors[AUTH_INPUTS.confirmPassword]?.message}
        />
        {isLoading ? (
          <p>{t('FormValidations:loading')}...</p>
        ) : (
          <>
            <ButtonForm type="submit" isFilled>
              {t('FormValidations:signup')}
            </ButtonForm>
            <ButtonForm isDivider>{t('FormValidations:login')}</ButtonForm>
          </>
        )}
      </form>
    </div>
  );
}

export default SignupForm;
