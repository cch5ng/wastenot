import React from 'react';
import classNames from 'classnames';
import './style.css';

type SelectListProps = { 
  value: string, 
  options: object, 
  onChange: any, 
  id: string, 
  selectClassName: string
};
const SelectList = (props) => {
  let {value, options, onChange, id, selectClassName, inline } = props;
  let selectClass: string;
  if (selectClassName) {
    selectClass = `formGroup ${selectClassName}`
  }
  if (inline) {
    selectClass = `${selectClassName}`
  }
  return (
    <select  id={id} value={value} onChange={(ev) => onChange(ev)} className={selectClass}>
      {options.map((option, idx) => {
        let key = `${option['value']}${idx.toString()}`
        return (<option key={key} value={option['value']} >{option['label']}</option>)
      })}
    </select>
  )
}

export default SelectList;
