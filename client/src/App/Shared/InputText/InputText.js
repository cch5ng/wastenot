import React from 'react';
import './InputText.css';

const InputText = (props) => {
  let {defVal, options, placeholderVal, idVal, onChangeHandler} = props;

  return (
    <input type="text" className="list-item-input" id={idVal} value={defVal} 
      onChange={ev => onChangeHandler(ev)}
      placeholder={placeholderVal} />
  )
}

export default InputText;