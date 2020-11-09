import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './styles.module.scss';

function ButtonForm({ type, isFilled, isDivider, children }) {
  /* eslint-disable react/button-has-type */
  return (
    <button
      type={type}
      className={clsx(styles.button, { [styles.buttonFill]: isFilled }, { [styles.isDivider]: isDivider })}
    >
      {children}
    </button>
  );
}

ButtonForm.propTypes = {
  isDivider: PropTypes.bool,
  isFilled: PropTypes.bool,
  type: PropTypes.string
};

export default ButtonForm;
