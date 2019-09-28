import React from 'react';
import './Checkbox.css';

const Checkbox = (props) => {
  let { checkboxVal, idVal, onChangeHandler, checkboxLabel, itemId } = props;

  return (
    <div className="div-checkbox">
      <input checked={checkboxVal} type="checkbox" className="list-item-input" id={idVal} 
        onChange={ev => onChangeHandler(ev)} />
      <label className="checkbox-label" onClick={ev => onChangeHandler(ev)} id={itemId} />
    </div>
  )
} 

export default Checkbox;
