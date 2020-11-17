import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { t } from 'i18next';

import logo from '../../app/assets/logo.png';
import ButtonForm from '../../components/ButtonForm';
import InputText from '../../components/InputText';
import { isPasswordEqual, emailPattern } from '../../utils/formValidations';
import { signUp } from '../../services/userService';
import useLazyRequest from '../../app/hooks/useLazyRequest';
import { AUTH_INPUTS } from '../../constants/forms';
import { PATHS } from '../../constants/paths';

import styles from './styles.module.scss';

function SignupForm() {
  const { register, handleSubmit, errors, getValues } = useForm();
  const [isLoading, submitError, response, sendRequest] = useLazyRequest({ request: signUp });
  const onSubmit = handleSubmit(({ firstName, lastName, email, password, confirmPassword }) => {
    sendRequest({
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
    <div className={`column center ${styles.signupFormContainer}`}>
      <div className={`column ${styles.signupForm}`}>
        <img src={logo} className={styles.logo} />
        {submitError && submitError.length > 0 && (
          <div className={styles.submitErrors} data-testid="error">
            - {submitError}
          </div>
        )}
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
            <p data-testid="loading">{t('FormValidations:loading')}...</p>
          ) : (
            <>
              <ButtonForm type="submit" name="signUpButton" isFilled>
                {t('FormValidations:signup')}
              </ButtonForm>
              <Link to={PATHS.login} className={styles.link}>
                <ButtonForm name="loginButton" isDivider>
                  {t('FormValidations:login')}
                </ButtonForm>
              </Link>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
