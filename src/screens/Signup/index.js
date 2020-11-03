import React from 'react';

import SignupForm from '../../components/SignupForm';

import styles from './Signup.module.scss';

function Signup() {
  return (
    <div className={styles.signup}>
      <SignupForm />
    </div>
  );
}

export default Signup;
