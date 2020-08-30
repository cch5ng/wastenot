import React from 'react';
import classNames from 'classnames';
import './style.css';
import '../../../App.css';

type InputTextProps = { 
  value: string, 
  placeholder: string, 
  id: string, 
  onChangeHandler: any, 
  name: string, 
  inputClassName: string, 
  readOnly: boolean, 
  type: string
};
const InputText = (props: InputTextProps) => {
  let {value, placeholder, id, onChangeHandler, name, inputClassName, readOnly, type } = props;
  let inputClass: string;

  if (inputClassName) {
    inputClass = `formGroup ${inputClassName}`;
  }

  return (
    <div className={inputClass}>
      <input type={type} className={inputClass} id={id} value={value} 
        onChange={ev => onChangeHandler(ev)}
        placeholder={placeholder} name={name}
        readOnly={readOnly ? readOnly : false} />
    </div>
  )
}

export default InputText;
