import React from 'react';
import './style.css';

const InputText = (props) => {
  let {value, options, placeholder, id, onChangeHandler, name} = props;

  return (
    <input type="text" className="list-item-input" id={id} value={value} 
      onChange={ev => onChangeHandler(ev)}
      placeholder={placeholder} name={name} />
  )
}

export default InputText;