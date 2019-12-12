import React from 'react';
import './style.css';

const SelectList = (props) => {

  let {value, options, onChange, id} = props;
  return (
    <select  id={id} value={value} onChange={(ev) => onChange(ev)}>
      {options.map((option, idx) => {
        let key = `${option['value']}${idx.toString()}`
        return (<option key={key} value={option['value']} >{option['label']}</option>)
      })}
    </select>
  )
}

export default SelectList;
