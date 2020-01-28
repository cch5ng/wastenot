import React, { useState, useEffect } from 'react';
import Checkbox from '../App/Shared/Checkbox/Checkbox';
import InputText from '../App/Shared/InputText/InputText';
import Button from '../App/Shared/Button/Button';
//import SelectList from '../../App/Shared/SelectList/SelectList';

const initMappings = () => {
  let initM = [];
  for (let i = 0; i < 30; i++) {
    let obj = {};
    obj.disabled = false; //disabled is same as checked
    obj.text = '';
    obj.expirationMap = 'none';
    initM.push(obj);
  }
  return initM;
}

const ExpirationMapTest = (props) => {
  const [mappings, setMappings] = useState(initMappings());

  //handles change to rows of checkbox and input text fields
  const checkboxChangeHandler = (ev) => {
    let name = ev.target.name;
    let id = ev.target.id;
    let idAr = id.split('-');
    let idx = idAr[idAr.length - 1];
    //handle checkbox change
    if (name = 'checkbox') {
      let disabledNew = !mappings[idx].disabled;
      let newMappings = [].concat(mappings)
      newMappings[idx].disabled = disabledNew;
      setMappings(newMappings);
    }
    //this should trigger expirationDateMapper1
  }

  const inputChangeHandler = (ev) => {
    let name = ev.target.name;
    let value = ev.target.value;
    let id = ev.target.id;
    let idAr = id.split('-');
    let idx = idAr[idAr.length - 1];
    //handle checkbox change
    if (name = 'inputText') {
    //handle input text change
      console.log('name inputText')
      let newMappings = [].concat(mappings)
      newMappings[idx].text = value;
      setMappings(newMappings);
    }
    expirationDateMapper1();
  }


  //determines how to map the input text content to the expiration_dates objects
  const expirationDateMapper1 = () => {
    console.log('TODO')
  }

  //determines how to convert above mapping to a resulting expiration date duration
  //I think this does not affect the UI but should be stored into state/backend
  //const expirationDateMapper2 = () => {
  //}

  //const renderForm = () => {
  //}

  return (
    <div>
      <form>
        {mappings.map((m, idx) => {
          let keyBase = `expirationMapRow-`;
          let outerKey = `${keyBase}${idx}`;
          let checkboxIdx = `${keyBase}checkBox-${idx}`;
          let inputTextIdx = `${keyBase}inputText-${idx}`;
          return (
            <div key={outerKey} >
              <Checkbox checkboxVal={m.disabled} onChangeHandler={checkboxChangeHandler} 
                name="checkbox" id={checkboxIdx} />
              <InputText value={m.text} onChangeHandler={inputChangeHandler} 
                name="inputText" id={inputTextIdx} />
            </div>
          )
        })}
      </form>
    </div>
  )

}

export default ExpirationMapTest;
