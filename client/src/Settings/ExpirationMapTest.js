import React, { useState, useEffect } from 'react';
import Checkbox from '../App/Shared/Checkbox/Checkbox';
import InputText from '../App/Shared/InputText/InputText';
import Button from '../App/Shared/Button/Button';
import SelectList from '../App/Shared/SelectList/SelectList';
import { EXPIRATION_DATES } from '../utils/expiration_dates';
import { getExpirationCategory, getExpirationDate } from '../utils/map_expiration_dates';
import http_requests from '../utils/http_requests';
import { getCookieStr } from '../utils/utils';

const initMappings = () => {
  let initM = [];
  for (let i = 0; i < 30; i++) {
    let obj = {};
    obj.disabled = false; //disabled is same as checked
    obj.text = '';
    obj.expirationCategory = 'none';
    initM.push(obj);
  }
  return initM;
}

let expirationCategoryOptions = [];
Object.keys(EXPIRATION_DATES).forEach(category => {
  let obj = {}
  obj.label = category;
  obj.value = category;
  expirationCategoryOptions.push(obj);
});
//console.log('expirationCategoryOptions', expirationCategoryOptions)

const ExpirationMapTest = (props) => {
  const [expirationMapPage, setExpirationMapPage] = useState(1);
  const [mappings, setMappings] = useState(initMappings());

  const getMappingsIdxFromId = (id) => {
    let idAr = id.split('-');
    return idAr[idAr.length - 1];
  }

  //handles change to rows of checkbox and input text fields
  const checkboxChangeHandler = (ev) => {
    let name = ev.target.name;
    let id = ev.target.id;
    let idx = getMappingsIdxFromId(id);
    //handle checkbox change
    if (name = 'checkbox') {
      let disabledNew = !mappings[idx].disabled;
      let newMappings = [].concat(mappings)
      newMappings[idx].disabled = disabledNew;
      setMappings(newMappings);
    }
    //this should trigger expirationDateMapper1, only if the checkbox is not checked
    //handle also the case if mapping was never done but then the checkbox gets de selected
  }

  const inputChangeHandler = (ev) => {
    let name = ev.target.name;
    let value = ev.target.value;
    let id = ev.target.id;
    let idx = getMappingsIdxFromId(id);
    if (name = 'inputText') {
      let newMappings = [].concat(mappings)
      newMappings[idx].text = value;
      setMappings(newMappings);
    }
  }

  const selectListChangeHandler = (ev) => {
    let value = ev.target.value;
    let id = ev.target.id;
    let idx = getMappingsIdxFromId(id);

    let newMappings = [].concat(mappings)
    newMappings[idx].expirationCategory = value;
    setMappings(newMappings);
  }

  //determines how to map the input text content to the expiration_dates objects
  const getMappedExpirationCategoriesAr = () => {
    let mappedExpirationCategoriesAr = mappings.map(mapping => {
      if (!mapping.disabled && mapping.text.length) {
        return getExpirationCategory(mapping.text, EXPIRATION_DATES)
      } else {
        //mapping is disabled
        return 'none';
      }
    });

    return mappedExpirationCategoriesAr;
  }

  const stepOneFormSubmitHandler = (ev) => {
    ev.preventDefault();

    let cookie = getCookieStr();
    let mappedExpirationCategoriesAr = getMappedExpirationCategoriesAr();
    let newMappings = [].concat(mappings);
    mappedExpirationCategoriesAr.forEach((expirCategory, idx) => {
      newMappings[idx].expirationCategory = expirCategory;
    })
    setMappings(newMappings);
    http_requests.Setting.putListItemMapSetting(cookie)
      .then(resp => console.log('resp', resp))
      .catch(err => console.error(err))
    setExpirationMapPage(2);
  }

  const stepTwoFormSubmitHandler = (ev) => {
    ev.preventDefault();
    let mappingsWithExpiration = [];

    let cookie = getCookieStr();
    mappings.forEach(item => {
      if (item.disabled === false && item.text.length && item.expirationCategory.length) {
        console.log('gets here')
        console.log('item.text', item.text)
        let obj = {}
        obj.name = item.text;
        obj.expirationDays = getExpirationDate(item.expirationCategory, EXPIRATION_DATES);
        mappingsWithExpiration.push(obj);
      }
    });
    http_requests.ListItemMap.postListItemMaps(cookie, mappingsWithExpiration)
      .then(resp => {
        console.log('resp', resp)
      })
      .catch(err => console.error('err', err));
    ;
    //console.log('mappingsWithExpiration', mappingsWithExpiration);


    // let mappedExpirationCategoriesAr = getMappedExpirationCategoriesAr();
    // let newMappings = [].concat(mappings);
    // mappedExpirationCategoriesAr.forEach((expirCategory, idx) => {
    //   newMappings[idx].expirationCategory = expirCategory;
    // })
    // setMappings(newMappings);
    // http_requests.Setting.putListItemMapSetting(cookie)
    //   .then(resp => console.log('resp', resp))
    //   .catch(err => console.error(err))
  }


  //determines how to convert above mapping to a resulting expiration date duration
  //I think this does not affect the UI but should be stored into state/backend
  //const expirationDateMapper2 = () => {
  //}

  //const renderForm = () => {
  //}

  if (expirationMapPage === 1) {
    return (
      <MappingStep1 mappings={mappings} checkboxChangeHandler={checkboxChangeHandler} 
        inputChangeHandler={inputChangeHandler} expirationCategoryOptions={expirationCategoryOptions}
        selectListChangeHandler={selectListChangeHandler} stepOneFormSubmitHandler={stepOneFormSubmitHandler}
      />
    )    
  }

  if (expirationMapPage === 2) {
    return (
      <ReviewStep2 mappings={mappings} checkboxChangeHandler={checkboxChangeHandler} 
        inputChangeHandler={inputChangeHandler} expirationCategoryOptions={expirationCategoryOptions}
        selectListChangeHandler={selectListChangeHandler} stepTwoFormSubmitHandler={stepTwoFormSubmitHandler}
      />
    )    
  }
}

export default ExpirationMapTest;

const MappingStep1 = (props) => {

//        <div className="twoCol">Expiration Category</div>
//inputClassName="twoCol"
//              <SelectList value={m.expirationCategory} options={props.expirationCategoryOptions} 
//onChange={props.selectListChangeHandler} id={selectListIdx} selectClassName="twoCol"/>

  return (
    <div>
      <h1>TODO need explanation purpose of this form</h1>
      <div className="row">
        <div className="oneCol">List Item</div>
      </div>
      <form>
        {props.mappings.map((m, idx) => {
          let keyBase = `expirationMapRow-`;
          let outerKey = `${keyBase}${idx}`;
          let checkboxIdx = `${keyBase}checkBox-${idx}`;
          let inputTextIdx = `${keyBase}inputText-${idx}`;
          let selectListIdx = `${keyBase}selectList-${idx}`;
          return (
            <div key={outerKey} className="row">
              <InputText value={m.text} onChangeHandler={props.inputChangeHandler} 
                name="inputText" id={inputTextIdx} inputClassName="oneCol"/>
            </div>
          )
        })}
        <Button label="Next" onClickHandler={props.stepOneFormSubmitHandler} size="medium" />
      </form>
    </div>
  )
}

const ReviewStep2 = (props) => {
  return (
    <div>
      <h1>TODO need explanation REVIEW step</h1>
      <div className="row">
        <div className="sixCol">Disable</div>
        <div className="threeCol">List Item</div>
        <div className="threeCol">Expiration Category</div>
      </div>
      <form>
        {props.mappings.map((m, idx) => {
          let keyBase = `expirationMapRow-`;
          let outerKey = `${keyBase}${idx}`;
          let checkboxIdx = `${keyBase}checkBox-${idx}`;
          let inputTextIdx = `${keyBase}inputText-${idx}`;
          let selectListIdx = `${keyBase}selectList-${idx}`;
          return (
            <div key={outerKey} className="row">
              <Checkbox checkboxVal={m.disabled} onChangeHandler={props.checkboxChangeHandler} 
                name="checkbox" id={checkboxIdx} checkClassName="sixCol" />
              <InputText value={m.text} onChangeHandler={props.inputChangeHandler} 
                name="inputText" id={inputTextIdx} inputClassName="threeCol"/>
              <SelectList value={m.expirationCategory} options={props.expirationCategoryOptions} 
                onChange={props.selectListChangeHandler} id={selectListIdx} selectClassName="threeCol"/>
            </div>
          )
        })}
        <Button label="Save" onClickHandler={props.stepTwoFormSubmitHandler} size="medium" />
      </form>
    </div>
  )
}
