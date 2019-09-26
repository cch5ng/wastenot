import React from 'react';
import './Button.css';

const Button = (props) => {
  let { label, onClickHandler, classVal, idVal } = props;

  return (
    <button className="button"  onClick={ev => onClickHandler(ev)} >{label}</button>
  )
}

export default Button;
