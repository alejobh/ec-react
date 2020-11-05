import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

function InputText({ label, type = 'text', name, inputRef, error }) {
  return (
    <div className={styles.inputText}>
      <label className={styles.label}>{label}</label>
      {error && <span className={styles.error}>{error}</span>}
      <input className={styles.input} name={name} type={type} ref={inputRef} />
    </div>
  );
}

InputText.propTypes = {
  error: PropTypes.string,
  inputRef: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string
};

export default InputText;
