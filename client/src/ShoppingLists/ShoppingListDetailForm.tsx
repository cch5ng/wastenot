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
import { objToArray, getCookieStr, arrayToObj, mappedListItemsArToObj, daysToMilliseconds } from '../utils/utils';

const KEY_BASE: string = 'shoppingListItem';
const listType: string = 'shopping';
const initListItemInputs = {};

const sectionOptions: {label: string, value: string}[] = [
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

type ShoppingListDetailFormProps = {
  mode: string,
  authenticate: {
    isLoggedIn: boolean,
    hasButtonClicked: boolean,
    status: string,
    message: string,
    authStr: string,
  },
  shoppingLists: {
    status: string,
    message: string,
    shoppingLists: {
      id: {
        name: string,
        guid: string
      },
    }
  },
  setting: {
    hasButtonClicked: boolean
  },
  fetchShoppingListCreate: any,
  fetchShoppingListEdit: any,
  isUsingExpiration: any
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
    let inputObj = {name: '', section: 'none', checked: false, list_item_map_guid: null, notify_timestamp: null};
    initListItemInputs[key] = inputObj;
    initListItemInputs[key].sortOrder = i;
  }

  const [listItemInputs, setListItemInputs] = useState(initListItemInputs);

  let inputChangeHandler = function(
    event: React.FormEvent<HTMLInputElement>
  ): void {
    const target = event.target as HTMLInputElement;
    const {name, value, type, id} = target;
    if (name === 'listNameInp') {
      setListName(value);
    } else if (type === 'text') {
      // handle list item text inputs
      let prevListItemInputs = listItemInputs;
      let newInput2: {name: string} = {name: value};
      let newInput = {}
      newInput[id] = {...prevListItemInputs[id], ...newInput2}
      let newListItemInputs = { ...prevListItemInputs, ...newInput};
      setListItemInputs(newListItemInputs);
    } else {
      // handle click on checkbox label (custom input)
      let prevListItemInputs = listItemInputs;
      let newInput2: {checked: boolean} = {checked: !prevListItemInputs[id].checked};
      let newInput = {}
      newInput[id] = {...prevListItemInputs[id], ...newInput2}
      let newListItemInputs = { ...prevListItemInputs, ...newInput};
      setListItemInputs(newListItemInputs);
    }
  }

  let reformatSelectId = function(id: string): string {  
    let tempAr = id.split('Select');
    return tempAr.join('');
  }

  let onChangeHandlerSelectSection = function(
    event: React.FormEvent<HTMLSelectElement>
  ): void {
    const target = event.target as HTMLSelectElement;
    const {id, value} = target;
    let reformattedId = reformatSelectId(id);
    let newInput2: {section: string} = {section: value};
    let prevListItemInputs = listItemInputs;
    let newInput = {};
    newInput[reformattedId] = {...prevListItemInputs[reformattedId], ...newInput2};
    let newListItemInputs = {...prevListItemInputs, ...newInput};
    setListItemInputs(newListItemInputs);
  }

  let formSubmitHandler = function(
    event: React.MouseEvent<HTMLButtonElement>
  ): void {
    event.preventDefault();  
    let requestBody;
    let listGuid;
    let cookieStr = (props.authenticate && props.authenticate.authStr) ? props.authenticate.authStr : null;
    let copyListItemInputs;

    if (props.mode === 'add') {
      listGuid = uuidv1();
      copyListItemInputs = {...listItemInputs};
      for (let tempId in copyListItemInputs) {
        copyListItemInputs[tempId].parentId = listGuid;
      }
      setListItemInputs(copyListItemInputs);
      let list = {
        name: listName,
        type: listType,
        listItems: objToArray(copyListItemInputs)
      }
      let d = new Date();
      list.listItems.forEach(item => {
        item.timestamp = d.toISOString();
      })
      props.fetchShoppingListCreate({ list, cookieStr});
    } else if (props.mode === 'edit') {
      listGuid = props.listGuid;
      copyListItemInputs = {...listItemInputs};
      for (let tempId in copyListItemInputs) {
        copyListItemInputs[tempId].parentId = listGuid;
      }
      setListItemInputs(copyListItemInputs);
      let list = {
        name: listName,
        type: listType,
        listItems: objToArray(listItemInputs),
        guid: listGuid
      }
      let d = new Date();
      list.listItems.forEach(item => {
        item.timestamp = d.toISOString();
      })
      props.fetchShoppingListEdit({ list, cookieStr });
    }
    clearForm('empty');
    setFormSubmitted(true);
  }

  //renders all list items (text inp and select list)
  let renderForm = function(): string[] {
    let htmlResult = [];
    if (Object.keys(listItemInputs).length) {
      let key;
      for (let i = 0; i < 50; i++) {
        key = props.mode === 'add' ? `${KEY_BASE}${i.toString()}` : Object.keys(listItemInputs)[i];
        let curInput =  listItemInputs[key];

        htmlResult.push(
          <li key={key} className="form-row-inline">
            <Checkbox checkboxVal={curInput.checked} onChangeHandler={inputChangeHandler} id={key}
              checkboxLabel='' name='' checkClassName='' />
            <InputText value={listItemInputs[key].name} placeholder="item name" 
              id={key} onChangeHandler={inputChangeHandler} name={key}
              inputClassName='' readOnly={false} type={null} />
          </li>
        )
      }
      return htmlResult;
    }
    return null;
  }

  //purpose is to get which react select component is being changed bc react select seems to be constructed with
  //the idea that each component should be added manually
  //but in this case, the components are being constructed programmatically so it requires more effort to identify
  //which component is being modified
  function selectClickHandler(event) {
    const {target, currentTarget} = event;
    let parent;
    let reactSelectInput;
    let idStr;

    //handle clicking on icon within the react select comp
    if (target.nodeName === 'svg') {
      if (target.parentNode.parentNode.parentNode) {
        parent = target.parentNode.parentNode.parentNode;
        reactSelectInput = parent.querySelector('input');
        if (reactSelectInput && reactSelectInput.id) {
          idStr = reactSelectInput.id;
          setCreateableSelectKey(idStr);  
        }
      }
    }
    else if (target.nodeName === 'path') {
      //this could be child of svg for the down arrow icon or for the X icon
      if (target.parentNode.parentNode.parentNode.parentNode) {
        parent = target.parentNode.parentNode.parentNode.parentNode;
        reactSelectInput = parent.querySelector('input');
        if (reactSelectInput && reactSelectInput.id) {
          idStr = reactSelectInput.id;
          setCreateableSelectKey(idStr);  
        }
      }
    }
    //case clicked parent of svg
    else if (target.parentNode.parentNode.className && target.parentNode.parentNode.className.indexOf('indicatorContainer') > -1) {
      if (target.parentNode.parentNode) {
        parent = target.parentNode.parentNode;
        reactSelectInput = parent.querySelector('input');
        if (reactSelectInput && reactSelectInput.id) {
          idStr = reactSelectInput.id;
          setCreateableSelectKey(idStr);  
        }
      }
    }
    //case click the select element
    else {
      reactSelectInput = target.parentNode.querySelector('input');
      if (reactSelectInput && reactSelectInput.id) {
        idStr = reactSelectInput.id;
        setCreateableSelectKey(idStr);  
      }  
    }
  }

  //methods specific to form using expiration notifications
  //react select
  function inputExpirationChangeHandler(newValue, actionMeta) {
    let val = newValue.value;
    let guid = mappedListItemsObj[val] && mappedListItemsObj[val].guid ? mappedListItemsObj[val].guid : null;
    let name = !guid ? val : null;
    let selectKey = createableSelectKey;
    let newListItemInput = {...listItemInputs[createableSelectKey], list_item_map_guid: guid, name}
    let updatedListItemInputs = {...listItemInputs, 
      [createableSelectKey]: newListItemInput
    }
    setListItemInputs({...listItemInputs, 
      [createableSelectKey]: newListItemInput
    });
  }

  let setNotificationClickHandler = function(
    event: React.MouseEvent<HTMLButtonElement>
  ): void {
    event.preventDefault();
    let dictListItemMapGuidToExpirationMs = {};
    for (const ky in mappedListItemsObj) {
      let mappedListItem = mappedListItemsObj[ky];
      let guid = mappedListItem.guid;
      let expiration_ms = mappedListItem.expiration_ms;
      dictListItemMapGuidToExpirationMs[guid] = expiration_ms;
    }
    let copyListItemInputs = {...listItemInputs};
    for (const k in copyListItemInputs) {
      let item = copyListItemInputs[k];
      if (item.list_item_map_guid) {
        let mappedListItemGuid = item.list_item_map_guid;
        let expirationMs = dictListItemMapGuidToExpirationMs[mappedListItemGuid];
        let timeISO;
        if (item.timestamp) {
          timeISO = item.timestamp;
        } else {
          let d = new Date();
          timeISO = d.toISOString();
          item.timestamp = timeISO;
        }
        let expireDate = new Date(timeISO)
        expireDate.setMilliseconds(expireDate.getMilliseconds() + expirationMs);
        item.notify_timestamp = expireDate.toISOString();
      }
    }
    setListItemInputs(copyListItemInputs);
    formSubmitHandler(event);
  }

  //(required) used by react select 3rd party component new input
  function handleCreatableInputChange(inputValue, actionMeta) {
  }

  let renderExpirationForm = function(): string[] {
    let htmlResult = [];
    let listItemOptions = [];
    let key;
    let dictListItemMapGuidToListItemMapName;

    mappedListItems.forEach(item => {
      let inObj: {value: string, label: string} = {
        value: item.name,
        label: item.name
      };
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
      if (props.mode === 'edit') {
        let label;
        if (listItemMapGuid) {
          label = dictListItemMapGuidToListItemMapName[listItemMapGuid].name
        } else {
          label = curInput.name;
        }
        value = {
          label,
          value: label
        };
      }

      htmlResult.push(
        <li key={key} id={key} className="" onClick={selectClickHandler}>
          <Checkbox checkboxVal={curInput.checked} onChangeHandler={inputChangeHandler} id={key}
            checkboxLabel='' name='' checkClassName='' />
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

  //TODO think clicking cancel btn on edit form mode maybe should not clear entire form
  let clearForm = function(
    clearMode: string = null
  ): void {
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
          if (resp && resp.mapped_list_items && resp.mapped_list_items.length) {
            setMappedListItems(resp.mapped_list_items);
            setMappedListItemsObj(mappedListItemsArToObj(resp.mapped_list_items));
          }
        })
        .catch(err => console.error('err', err.message))
  
      if (props.mode === 'edit') {
        http_requests.Lists.getTemplateList({ guid: props.listGuid, cookieStr })
          .then(resp => {
            if (resp && resp.type !== 'error') {
              setListName(resp.listTemplate.name);
              let listItemInputsObj = resp.listTemplate.listItems.length ? resp.listTemplate.listItems : {};
              setListItemInputs(listItemInputsObj);
            }
          })
      }  
    }
  }, [props.authenticate.authStr]);

  return (
    <div className="main">
      {formSubmitted && (
        <Redirect to="/shoppingLists" />
      )}
      {props.setting.isUsingExpiration === true && mappedListItems.length > 0 &&(
        <ShoppingListFormExpiration title={title} listName={listName}
          onClickHandler={clearForm} formSubmitHandler={formSubmitHandler} 
          inputChangeHandler={inputChangeHandler} renderForm={renderExpirationForm} 
          setNotificationClickHandler={setNotificationClickHandler} />
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
