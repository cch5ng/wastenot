import React from 'react';
import './SelectList.css';

const SelectList = (props) {

  let {defVal, options, onChange, idVal} = props;
  return (
    <select  id={idVal} value={defVal} onChange={(ev) => onChange(ev)}>
      {options.map((option, idx) => {
        let key = `${option['value']}${idx.toString()}`
        return (<option key={key} value={option['value']} >{option['label']}</option>)
      })}
    </select>
  )
}

export default SelectList;
