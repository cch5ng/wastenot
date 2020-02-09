import React from 'react';
import './style.css';

const Checkbox = (props) => {
  let { checkboxVal, onChangeHandler, checkboxLabel, id, name} = props;

  if (checkboxLabel) {
    return (
      <div className="form-group">
        <input type="checkbox" className="list-item-input"
          checked={checkboxVal}
          onChange={ev => onChangeHandler(ev)}
          name={name} />

        {checkboxLabel && (
          <label className="checkbox-label" onClick={ev => onChangeHandler(ev)} id={id}>{checkboxLabel}</label>
        )}
      </div>
    )
  }

  return (
    <div className="form-group">
      <input checked={checkboxVal} type="checkbox" className="list-item-input"
        onChange={ev => onChangeHandler(ev)} name={name}
        />
      <label onClick={ev => onChangeHandler(ev)} id={id} />
    </div>
  )
}

export default Checkbox;
