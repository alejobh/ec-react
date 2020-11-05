import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './styles.module.scss';

function ButtonForm({ type, isFilled, children }) {
  /* eslint-disable react/button-has-type */
  return (
    <div>
      <button type={type} className={clsx(styles.button, { [styles.buttonFill]: isFilled })}>
        {children}
      </button>
    </div>
  );
}

ButtonForm.propTypes = {
  isFilled: PropTypes.bool,
  type: PropTypes.string
};

export default ButtonForm;
