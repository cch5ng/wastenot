import React, { useState, useEffect } from 'react';
import Checkbox from '../App/Shared/Checkbox/Checkbox';
import InputText from '../App/Shared/InputText/InputText';
import Button from '../App/Shared/Button/Button';
import SelectList from '../App/Shared/SelectList/SelectList';
import { EXPIRATION_DATES } from '../utils/expiration_dates';
import { getExpirationCategory, getExpirationDate } from '../utils/map_expiration_dates';
import http_requests from '../utils/http_requests';
import { getCookieStr } from '../utils/utils';

let initMappings = function(): {disabled: boolean, text: string, expirationCategory: string}[] {
  let initM = [];
  for (let i = 0; i < 30; i++) {
    let obj: {disabled: boolean, text: string, expirationCategory: string} = {
      disabled: false,
      text: '',
      expirationCategory: 'none'
    };
    initM.push(obj);
  }
  return initM;
}

let expirationCategoryOptions: {label: string, value: string}[] = [];
Object.keys(EXPIRATION_DATES).forEach(category => {
  let obj = {
    label: category,
    value: category
  }
  expirationCategoryOptions.push(obj);
});

const ExpirationMapTest = (props) => {
  const [expirationMapPage, setExpirationMapPage] = useState(1);
  const [mappings, setMappings] = useState(initMappings());

  let getMappingsIdxFromId = function(
    id: string
  ): string {
    let idAr = id.split('-');
    return idAr[idAr.length - 1];
  }

  let checkboxChangeHandler = function(
    event: React.FormEvent<HTMLInputElement>
  ): void {
    const target = event.target as HTMLInputElement;
    const {name, id} = target;
    let idx = getMappingsIdxFromId(id);
    if (name === 'checkbox') {
      let disabledNew = !mappings[idx].disabled;
      let newMappings = [].concat(mappings)
      newMappings[idx].disabled = disabledNew;
      setMappings(newMappings);
    }
  }

  let inputChangeHandler = function(
    event: React.FormEvent<HTMLInputElement>
  ): void {
    const target = event.target as HTMLInputElement;
    const {name, id, value} = target;
    let idx = getMappingsIdxFromId(id);
    if (name === 'inputText') {
      let newMappings = [].concat(mappings)
      newMappings[idx].text = value;
      setMappings(newMappings);
    }
  }

  let selectListChangeHandler = function(
    event: React.FormEvent<HTMLInputElement>
  ): void {
    const target = event.target as HTMLInputElement;
    const {value, id} = target;
    let idx = getMappingsIdxFromId(id);
    let newMappings = [].concat(mappings)
    newMappings[idx].expirationCategory = value;
    setMappings(newMappings);
  }

  //determines how to map the input text content to the expiration_dates objects
  let getMappedExpirationCategoriesAr = function(): {disabled: boolean, text: string}[] {
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

  let stepOneFormSubmitHandler = function(
    event: React.MouseEvent<HTMLDivElement>
  ): void {
    event.preventDefault();
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

  let stepTwoFormSubmitHandler = function(
    event: React.MouseEvent<HTMLDivElement>
  ): void {
    event.preventDefault();
    let mappingsWithExpiration = [];
    let cookie = getCookieStr();
    mappings.forEach(item => {
      if (item.text.length && item.expirationCategory.length) {
        let obj = {
          name: item.text,
          expirationMs: getExpirationDate(item.expirationCategory, EXPIRATION_DATES),
          skipNotification: item.disabled
        }
        mappingsWithExpiration.push(obj);
      }
    });
    http_requests.ListItemMap.postListItemMaps(cookie, mappingsWithExpiration)
      .then(resp => {
        console.log('resp', resp)
      })
      .catch(err => console.error('err', err));
    ;
  }

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

type MappingStep1Props = {
  mappings: {text: string}[],
  inputChangeHandler: any,
  stepOneFormSubmitHandler: any,
  checkboxChangeHandler: any,
  expirationCategoryOptions: object,
  selectListChangeHandler: any
}
const MappingStep1 = (props: MappingStep1Props) => {
  return (
    <div>
      <h1>Step 1: Enter a Sample Shopping List</h1>
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
                name="inputText" id={inputTextIdx} inputClassName="oneCol"
                placeholder='' readOnly={false} type={null} />
            </div>
          )
        })}
        <Button label="Next" onClickHandler={props.stepOneFormSubmitHandler} size="medium" 
          classVal='' idVal='' type={null} noMargin={false} />
      </form>
    </div>
  )
}

type ReviewStep2Props = {
  mappings: {text: string, disabled: boolean, expirationCategory: string}[],
  inputChangeHandler: any,
  selectListChangeHandler: any,
  checkboxChangeHandler: any,
  expirationCategoryOptions: object,
  stepTwoFormSubmitHandler: any
}
const ReviewStep2 = (props) => {
  return (
    <div>
      <h1>Step 2: Review Mappings</h1>
      <p>
        The system has automatically found food categories that match with the shopping list items. You can choose to skip getting notifications for an item by clicking its checkbox. If the food category does not look right, you can select a different category from the drop-down list or select "no match" if there is no corresponding category.
      </p>
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
                name="checkbox" id={checkboxIdx} checkClassName="sixCol" checkboxLabel={null}/>
              <InputText value={m.text} onChangeHandler={props.inputChangeHandler} 
                name="inputText" id={inputTextIdx} inputClassName="threeCol" readOnly={true} 
                placeholder='' type={null} />
              <SelectList value={m.expirationCategory} options={props.expirationCategoryOptions} 
                onChange={props.selectListChangeHandler} id={selectListIdx} selectClassName="threeCol"/>
            </div>
          )
        })}
        <Button label="Save" onClickHandler={props.stepTwoFormSubmitHandler} size="medium" 
          classVal='' idVal='' type={null} noMargin={false} />
      </form>
    </div>
  )
}
