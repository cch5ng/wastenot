import React from 'react';
import './style.css';

const Button = (props) => {
  let { label, onClickHandler, classVal, idVal, size, type } = props;

  let classNameVal = size ? `button ${size}` : `button`;
  return (
    <button className={classNameVal}  onClick={ev => onClickHandler(ev)} >{label}</button>
  )
}

export default Button;
