import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

function InputText({ label, type, name, reference, errors }) {
  return (
    <>
      <label className={styles.label}>{label}</label>
      {errors && <span className={styles.error}>{errors.message}</span>}
      <input className={styles.input} name={name} type={type} ref={reference} />
    </>
  );
}

InputText.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  errors: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  reference: PropTypes.func,
  type: PropTypes.string
};

export default InputText;
