import React from 'react';
import './style.css';

const Checkbox = (props) => {
  let { checkboxVal, idVal, onChangeHandler, checkboxLabel, itemId } = props;

  if (checkboxLabel) {
    return (
      <div className="form-group">
        <input type="checkbox" className="list-item-input"
          checked={checkboxVal}
          onChange={ev => onChangeHandler(ev)} />

        {checkboxLabel && (
          <label className="checkbox-label" onClick={ev => onChangeHandler(ev)} id={itemId}>{checkboxLabel}</label>
        )}
      </div>
    )
  }

  return (
    <div className="form-group">
      <input checked={checkboxVal} type="checkbox" className="list-item-input"
        onChange={ev => onChangeHandler(ev)} />
      <label onClick={ev => onChangeHandler(ev)} id={itemId}/>
    </div>
  )
} 

export default Checkbox;

//value={checkboxVal}
//value={checkboxVal}
