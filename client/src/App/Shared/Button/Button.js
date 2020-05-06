import React from 'react';
import classNames from 'classnames';
import './style.css';

const Button = (props) => {
  let { label, onClickHandler, classVal, idVal, size, type } = props;

  var btnClass = classNames({
      button: true,
      [`${size}`]: size && true,
      [`${type}`]: type && true,
      'small': !size,
      'basic': !type,
      [`${classVal}`]: classVal && true
  });

  return (
    <button className={btnClass}  onClick={ev => onClickHandler(ev)} >{label}</button>
  )
}

export default Button;
