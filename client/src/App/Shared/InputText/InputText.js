import React from 'react';
import classNames from 'classnames';
import './style.css';
import '../../../App.css';

const InputText = (props) => {
  let {value, options, placeholder, id, onChangeHandler, name, inputClassName } = props;
  let inputClass;

  if (inputClassName) {
    inputClass = `formGroup ${inputClassName}`
  }

  return (
    <div className={inputClass}>
      <input type="text" className={inputClass} id={id} value={value} 
        onChange={ev => onChangeHandler(ev)}
        placeholder={placeholder} name={name} />
    </div>
  )
}

export default InputText;
