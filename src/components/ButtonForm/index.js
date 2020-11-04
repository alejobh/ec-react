import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './ButtonForm.module.scss';

function ButtonForm(props) {
  const { type, isFilled, text } = props;
  const { buttonFill, button } = styles;

  /* eslint-disable react/button-has-type */
  return (
    <div>
      <button type={type} className={clsx(button, isFilled && buttonFill)}>
        {text}
      </button>
    </div>
  );
}

ButtonForm.propTypes = {
  isFilled: PropTypes.bool,
  text: PropTypes.string,
  type: PropTypes.string
};

export default ButtonForm;
