import React from 'react';
import './style.css';
import '../../../App.css';

const InputText = (props) => {
  let {value, options, placeholder, id, onChangeHandler, name} = props;

  return (
    <div className="formGroup">
      <input type="text" className="formGroup" id={id} value={value} 
        onChange={ev => onChangeHandler(ev)}
        placeholder={placeholder} name={name} />
    </div>
  )
}

export default InputText;
