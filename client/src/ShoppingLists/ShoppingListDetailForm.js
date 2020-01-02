import React, { useState, useEffect, Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';

import Button from '../App/Shared/Button/Button';
import SelectList from '../App/Shared/SelectList/SelectList';
import InputText from '../App/Shared/InputText/InputText';
import '../App.css';
import Checkbox from '../App/Shared/Checkbox/Checkbox';
import http_requests from '../utils/http_requests';
import { fetchShoppingListCreate, fetchShoppingListEdit } from '../actions/shoppingLists';
import { objToArray, getCookieStr, arrayToObj } from '../utils/utils';

const KEY_BASE = 'shoppingListItem';
const listType = 'shopping';
const initListItemInputs = {};

const sectionOptions = [
      {label: 'Section', value: 'none'},
      {label: 'drinks', value: 'drinks'},
      {label: 'dairy', value: 'dairy'},
      {label: 'frozen', value: 'frozen'},
      {label: 'meat', value: 'meat'},
      {label: 'prepared', value: 'prepared'},
      {label: 'deli', value: 'deli'},
      {label: 'produce', value: 'produce'},
      {label: 'bread', value: 'bread'},
]

const ShoppingListDetailForm = (props) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [title, setTitle] = useState(props.mode === 'edit' ? 'Edit Shopping List' : 'Add Shopping List');
  let editListItemTemplates;
  let editListTemplateName;
  let listGuid;
  let curListTemplate;

  const [listName, setListName] = useState('');

  for (let i = 0; i < 50; i++) {
    let key = `${KEY_BASE}${i}`;
    let inputObj = {name: '', section: 'none', checked: false};
    initListItemInputs[key] = inputObj;
    initListItemInputs[key].sortOrder = i;
  }

  const [listItemInputs, setListItemInputs] = useState(initListItemInputs);

  function inputChangeHandler(ev) {
    let name = ev.target.name;
    let value = ev.target.value;
    let type = ev.target.type;
    let id = ev.target.id;

    if (name === 'listNameInp') {
      setListName(value);
    } else if (type === 'text') {
      // handle list item text inputs
      let prevListItemInputs = listItemInputs;
      let newInput2 = {};
      newInput2.name = value;
      let newInput = {}
      newInput[id] = {...prevListItemInputs[id], ...newInput2}
      let newListItemInputs = { ...prevListItemInputs, ...newInput};
      setListItemInputs(newListItemInputs);
    } else {
      // handle click on checkbox label (custom input)
      let prevListItemInputs = listItemInputs;
      let newInput2 = {};
      newInput2.checked = !prevListItemInputs[id].checked;
      let newInput = {}
      newInput[id] = {...prevListItemInputs[id], ...newInput2}
      let newListItemInputs = { ...prevListItemInputs, ...newInput};
      setListItemInputs(newListItemInputs);
    }
  }

  function reformatSelectId(id) {
    let tempAr = id.split('Select')
    return tempAr.join('')
  }

  function onChangeHandlerSelectSection(ev) {
    let id = ev.target.id;
    let reformattedId = reformatSelectId(id);
    let section = ev.target.value;
    let newInput2 = {};
    newInput2.section = section;
    let prevListItemInputs = listItemInputs;
    let newInput = {};
    newInput[reformattedId] = {...prevListItemInputs[reformattedId], ...newInput2};
    let newListItemInputs = {...prevListItemInputs, ...newInput};
    setListItemInputs(newListItemInputs);
  }

  function formSubmitHandler(ev) {
    let requestBody;
    let listGuid;
    let list = {};
    let cookieStr = (props.authenticate && props.authenticate.authStr) ? props.authenticate.authStr : null;

    if (props.mode === 'add') {
      listGuid = uuidv1();
      for (let tempId in listItemInputs) {
        listItemInputs[tempId].parentId = listGuid;
      }

      list.name = listName;
      list.type = listType;
      list.listItems = objToArray(listItemInputs);

      props.fetchShoppingListCreate({ list, cookieStr});
    } else if (props.mode === 'edit') {
      listGuid = props.listGuid;

      for (let tempId in listItemInputs) {
        listItemInputs[tempId].parentId = listGuid;
      }

      list.name = listName;
      list.type = listType;
      list.listItems = objToArray(listItemInputs);
      list.guid = listGuid;

      props.fetchShoppingListEdit({ list, cookieStr })
    }

    clearForm('empty');
    setFormSubmitted(true);
  }

  //renders all list items (text inp and select list)
  function renderForm() {
    let htmlResult = [];
    let sortedObjects = [];

    if (Object.keys(listItemInputs).length) {
      let key;
      let selectKey;
      for (let i = 0; i < 50; i++) {
        key = props.mode === 'add' ? `${KEY_BASE}${i.toString()}` : Object.keys(listItemInputs)[i];
        //TODO fix later when I handle select value/id pairs
        selectKey = 'templateListItemSelect' + i.toString();
        let curInput =  listItemInputs[key];

        //TODO add some way to indicate that the list items were purchased
        htmlResult.push(
          <li key={key} className="form-row-inline">
            <Checkbox checkboxVal={curInput.checked} onChangeHandler={inputChangeHandler} itemId={key}/>
            <InputText value={listItemInputs[key].name} placeholder="item name" 
              id={key} onChangeHandler={inputChangeHandler} name={key}
            />
            <SelectList value={listItemInputs[key].section} id={selectKey} 
              options={sectionOptions} onChange={onChangeHandlerSelectSection} name={selectKey}
            />
          </li>
        )
      }
      return htmlResult;
    }
    return null;
  }

  //TODO think clicking cancel btn on edit form mode maybe should not clear entire form
  function clearForm(clearMode = null) {
    let formClearMode = clearMode === "empty" ? clearMode : props.mode;

    switch(formClearMode) {
      case "edit":
        setListItemInputs(props.editList.listItemInputs);
        setListName(props.editList.listName);
        break;
      case "add":
      case "empty":
      default:
        setListItemInputs(initListItemInputs);
        setListName('');
        break;
    }
  }

  useEffect(() => {
    if (props.mode === 'edit') {
      console.log('gets to use effect')
      if (props.authenticate.authStr) {
        http_requests.Lists.getTemplateList({ guid: props.listGuid, cookieStr: props.authenticate.authStr })
          .then(resp => {
            if (resp && resp.type !== 'error') {
              setListName(resp.listTemplate.name);
              let listItemInputsObj = resp.listTemplate.listItems.length ? resp.listTemplate.listItems : {};
              //arrayToObj(resp.listTemplate.listItems)
              setListItemInputs(listItemInputsObj);
            }
          })
      }
    }
  }, []); //props.authenticate.authStr

  return (
    <div className="main">
      {formSubmitted && (
        <Redirect to="/shoppingLists" />
      )}

      <h3>{title}</h3>
      <div>
        <Button classVal="listDetailFormSaveBtn" onClickHandler={formSubmitHandler} label="Save" />
        <Button label="Cancel" onClickHandler={clearForm} />
      </div>
      <br />
      <InputText name="listNameInp" value={listName} placeholder="list name" onChangeHandler={inputChangeHandler} />
      <ul className="list-no-style">
        {renderForm()}
      </ul>
      <div>
        <Button classVal="listDetailFormSaveBtn" onClickHandler={formSubmitHandler} label="Save" />
        <Button label="Cancel" onClickHandler={clearForm} />
      </div>
    </div>
  )
}

const mapStateToProps = state => ({ authenticate: state.authenticate, shoppingLists: state.shoppingLists });

const mapDispatchToProps = dispatch => {
  return {
    fetchShoppingListCreate: ({ list, cookieStr }) => dispatch(fetchShoppingListCreate({ list, cookieStr })),
    //fetchListTemplate: ({ guid, cookieStr }) => dispatch(fetchListTemplate({ guid, cookieStr })),
    fetchShoppingListEdit: ({ list, cookieStr }) => dispatch(fetchShoppingListEdit({ list, cookieStr }))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingListDetailForm);
