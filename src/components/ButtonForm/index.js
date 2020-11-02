import React from 'react';
import './ButtonForm.scss';
import PropTypes from 'prop-types';

function ButtonForm(props) {
  /* eslint-disable react/button-has-type */
  return (
    <div className="button-form">
      <button type={props.type} className={`button ${props.isFilled ? 'btn-fill' : ''}`}>
        {props.text}
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
