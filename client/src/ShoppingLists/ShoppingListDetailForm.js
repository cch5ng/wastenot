import React, { useState, useEffect, Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';
import CreatableSelect from 'react-select/creatable';
import Button from '../App/Shared/Button/Button';
import SelectList from '../App/Shared/SelectList/SelectList';
import InputText from '../App/Shared/InputText/InputText';
import '../App.css';
import Checkbox from '../App/Shared/Checkbox/Checkbox';
import ShoppingListFormNoExpiration from './ShoppingListFormNoExpiration';
import ShoppingListFormExpiration from './ShoppingListFormExpiration';
import http_requests from '../utils/http_requests';
import { fetchShoppingListCreate, fetchShoppingListEdit } from '../actions/shoppingLists';
import { isUsingExpiration } from '../actions/setting';
import { objToArray, getCookieStr, arrayToObj, mappedListItemsArToObj } from '../utils/utils';

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

const listItemStyles = {
  control: styles => ({ ...styles, width: '80%' })
}

const ShoppingListDetailForm = (props) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [title, setTitle] = useState(props.mode === 'edit' ? 'Edit Shopping List' : 'Add Shopping List');
  let editListItemTemplates;
  let editListTemplateName;
  let listGuid;
  let curListTemplate;

  const [listName, setListName] = useState('');
  //expiration case specific
  const [mappedListItems, setMappedListItems] = useState([]);
  const [mappedListItemsObj, setMappedListItemsObj] = useState({});
  const [createableSelectKey, setCreateableSelectKey] = useState(null);

  for (let i = 0; i < 50; i++) {
    let key = `${KEY_BASE}${i}`;
    let inputObj = {name: '', section: 'none', checked: false, list_item_map_guid: null};
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
    let copyListItemInputs;

    if (props.mode === 'add') {
      listGuid = uuidv1();
      copyListItemInputs = {...listItemInputs};
      for (let tempId in copyListItemInputs) {
        copyListItemInputs[tempId].parentId = listGuid;
      }
      setListItemInputs(copyListItemInputs);
      list.name = listName;
      list.type = listType;
      list.listItems = objToArray(listItemInputs);
      props.fetchShoppingListCreate({ list, cookieStr});
    } else if (props.mode === 'edit') {
      listGuid = props.listGuid;
      copyListItemInputs = {...listItemInputs};
      for (let tempId in copyListItemInputs) {
        copyListItemInputs[tempId].parentId = listGuid;
      }
      setListItemInputs(copyListItemInputs);
      list.name = listName;
      list.type = listType;
      list.listItems = objToArray(listItemInputs);
      list.guid = listGuid;
      props.fetchShoppingListEdit({ list, cookieStr })
    }

    clearForm('empty');
    setFormSubmitted(true);
  }

/*
<SelectList value={listItemInputs[key].section} id={selectKey} 
  options={sectionOptions} onChange={onChangeHandlerSelectSection} name={selectKey} />
*/

  //renders all list items (text inp and select list)
  function renderForm() {
    let htmlResult = [];

    if (Object.keys(listItemInputs).length) {
      let key;
      //let selectKey;
      for (let i = 0; i < 50; i++) {
        key = props.mode === 'add' ? `${KEY_BASE}${i.toString()}` : Object.keys(listItemInputs)[i];
        //TODO fix later when I handle select value/id pairs
        //selectKey = 'templateListItemSelect' + i.toString();
        let curInput =  listItemInputs[key];

        //TODO add some way to indicate that the list items were purchased
        htmlResult.push(
          <li key={key} className="form-row-inline">
            <Checkbox checkboxVal={curInput.checked} onChangeHandler={inputChangeHandler} id={key}/>
            <InputText value={listItemInputs[key].name} placeholder="item name" 
              id={key} onChangeHandler={inputChangeHandler} name={key}
            />
            
          </li>
        )
      }
      return htmlResult;
    }
    return null;
  }

  function selectClickHandler(ev) {
    let parent = ev.target;
    let reactSelectInput;

    //case click the select element
    reactSelectInput = parent.querySelector('input');
    if (reactSelectInput && reactSelectInput.id) {
      let idStr = reactSelectInput.id;
      setCreateableSelectKey(idStr);  
    }

    //2 cases; either click the svg
    if (parent.tagName === 'svg') {
      if (parent.parentNode.parentNode.parentNode) {
        parent = parent.parentNode.parentNode.parentNode;
        reactSelectInput = parent.querySelector('input');
        if (reactSelectInput && reactSelectInput.id) {
          let idStr = reactSelectInput.id;
          setCreateableSelectKey(idStr);  
        }
      }
    }

    //case clicked parent of svg
    if (parent.className && parent.className.indexOf('indicatorContainer') > -1) {
      if (parent.parentNode.parentNode) {
        parent = parent.parentNode.parentNode;
        reactSelectInput = parent.querySelector('input');
        if (reactSelectInput && reactSelectInput.id) {
          let idStr = reactSelectInput.id;
          setCreateableSelectKey(idStr);  
        }
      }
    }
  }

  //methods specific to form using expiration notifications
  //react select
  function inputExpirationChangeHandler(newValue, actionMeta) {
    let val = newValue.value;
    //let guid = mappedListItemsObj[val].guid;
    let selectKey = createableSelectKey;
    let newListItemInput = {...listItemInputs[createableSelectKey], list_item_map_guid: mappedListItemsObj[val].guid}

    setListItemInputs({...listItemInputs, 
      [createableSelectKey]: newListItemInput
    });
    //this applies to changed values as well as new values
    //__isNew__ === true
  }
  //react select new input
  function handleCreatableInputChange(inputValue, actionMeta) {
  }

  function renderExpirationForm() {
    let htmlResult = [];
    let listItemOptions = [];
    let key;
    let dictListItemMapGuidToListItemMapName;

    mappedListItems.forEach(item => {
      let inObj = {};
      inObj.value = item.name;
      inObj.label = item.name;
      listItemOptions.push(inObj);
    })

    if (props.mode === 'edit') {
      dictListItemMapGuidToListItemMapName = mappedListItems.reduce((accum, cur) => {
        let guid = cur.guid;
        accum[guid] = cur;
        return accum;
      }, {});
    }

    for (let i = 0; i < 50; i++) {
      key = props.mode === 'add' ? `${KEY_BASE}${i.toString()}` : Object.keys(listItemInputs)[i];
      let curInput =  listItemInputs[key];
      let listItemMapGuid = curInput.list_item_map_guid;
      let value = undefined;
      if (listItemMapGuid && props.mode === 'edit') {
        let label = dictListItemMapGuidToListItemMapName[listItemMapGuid].name
        value = {
          label,
          value: label
        };
      }

      //TODO issue here with form-row-inline
      htmlResult.push(
        <li key={key} id={key} className="" onClick={selectClickHandler}>
          <Checkbox checkboxVal={curInput.checked} onChangeHandler={inputChangeHandler} id={key}/>
          <CreatableSelect
            isClearable
            onChange={inputExpirationChangeHandler}
            onInputChange={handleCreatableInputChange}
            options={listItemOptions}
            styles={listItemStyles}
            name={key}
            inputId={key}
            defaultValue={value}
          />          
        </li>
      )
    }
    return htmlResult;
  }

  //generic helper
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
    if (props.authenticate.authStr) {
      let cookieStr = props.authenticate.authStr;
      props.isUsingExpiration({cookieStr})

      http_requests.ListItemMap.getListItemMaps(cookieStr)
        .then(resp => {
          if (resp.length) {
            setMappedListItems(resp);
            setMappedListItemsObj(mappedListItemsArToObj(resp));
          }
        })
        .catch(err => console.error('err', err.message))
  
      if (props.mode === 'edit') {
        http_requests.Lists.getTemplateList({ guid: props.listGuid, cookieStr })
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
  }, [props.authenticate.authStr]); //

  //TEST
  //4 cases
  //props.mode === 'add', setting.isUsingExpiration === true
  //  new
  //props.mode === 'edit', setting.isUsingExpiration === true
  //  new
  //props.mode === 'add', setting.isUsingExpiration === false
  //  existing logic
  //props.mode === 'edit', setting.isUsingExpiration === false
  //  existing logic
  // console.log('listItemInputs', listItemInputs)
  // console.log('mappedListItems', mappedListItems)
  //console.log('mappedListItemsObj', mappedListItemsObj)
  //console.log('createableSelectKey', createableSelectKey)

  return (
    <div className="main">
      {formSubmitted && (
        <Redirect to="/shoppingLists" />
      )}

      {props.setting.isUsingExpiration === true && mappedListItems.length > 0 &&(
        <ShoppingListFormExpiration title={title} listName={listName}
          onClickHandler={clearForm} formSubmitHandler={formSubmitHandler} 
          inputChangeHandler={inputChangeHandler} renderForm={renderExpirationForm} />
      )}

      {(props.setting.isUsingExpiration === false || mappedListItems.length === 0) && (
        <ShoppingListFormNoExpiration title={title} formSubmitHandler={formSubmitHandler}
          onClickHandler={clearForm} listName={listName} inputChangeHandler={inputChangeHandler}
          renderForm={renderForm} />
      )}
    </div>
  )
}

const mapStateToProps = state => (
  { authenticate: state.authenticate,
    shoppingLists: state.shoppingLists,
    setting: state.setting
  });

const mapDispatchToProps = dispatch => {
  return {
    fetchShoppingListCreate: ({ list, cookieStr }) => dispatch(fetchShoppingListCreate({ list, cookieStr })),
    fetchShoppingListEdit: ({ list, cookieStr }) => dispatch(fetchShoppingListEdit({ list, cookieStr })),
    isUsingExpiration: ({cookieStr}) => dispatch(isUsingExpiration({cookieStr}))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingListDetailForm);
