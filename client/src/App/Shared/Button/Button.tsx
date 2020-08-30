import React from 'react';
import classNames from 'classnames';
import './style.css';

type ButtonProps = { 
  label: string, 
  onClickHandler: any, 
  classVal: string, 
  idVal: string, 
  size: string, 
  type: string, 
  noMargin: boolean
};
const Button = (props: ButtonProps) => {
  let { label, onClickHandler, classVal, idVal, size, type, noMargin } = props;
  var btnClass : string = classNames({
      button: true,
      [`${size}`]: size && true,
      [`${type}`]: type && true,
      'small': !size,
      'basic': !type,
      [`${classVal}`]: classVal && true,
      'no-margin': noMargin
  });

  return (
    <button className={btnClass}  onClick={ev => onClickHandler(ev)} >{label}</button>
  )
}

export default Button;
