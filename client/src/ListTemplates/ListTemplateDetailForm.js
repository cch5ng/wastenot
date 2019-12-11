import React, { useState, useEffect, Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';

import Button from '../App/Shared/Button/Button';
import SelectList from '../App/Shared/SelectList/SelectList';
import InputText from '../App/Shared/InputText/InputText';
import '../App.css';
import http_requests from '../utils/http_requests';
import { fetchTemplateListAdd, fetchListTemplate } from '../actions/listTemplates';
import { objToArray, getCookieStr } from '../utils/utils';

let inputObj = {name: '', section: 'none'};

const listType = 'template';
const initListItemInputs = {
      templateListItem0: inputObj,
      templateListItem1: inputObj,
      templateListItem2: inputObj,
      templateListItem3: inputObj,
      templateListItem4: inputObj,
      templateListItem5: inputObj,
      templateListItem6: inputObj,
      templateListItem7: inputObj,
      templateListItem8: inputObj,
      templateListItem9: inputObj,
      templateListItem10: inputObj,
      templateListItem11: inputObj,
      templateListItem12: inputObj,
      templateListItem13: inputObj,
      templateListItem14: inputObj,
      templateListItem15: inputObj,
      templateListItem16: inputObj,
      templateListItem17: inputObj,
      templateListItem18: inputObj,
      templateListItem19: inputObj,
      templateListItem20: inputObj,
      templateListItem21: inputObj,
      templateListItem22: inputObj,
      templateListItem23: inputObj,
      templateListItem24: inputObj,
      templateListItem25: inputObj,
      templateListItem26: inputObj,
      templateListItem27: inputObj,
      templateListItem28: inputObj,
      templateListItem29: inputObj,
      templateListItem30: inputObj,
      templateListItem31: inputObj,
      templateListItem32: inputObj,
      templateListItem33: inputObj,
      templateListItem34: inputObj,
      templateListItem35: inputObj,
      templateListItem36: inputObj,
      templateListItem37: inputObj,
      templateListItem38: inputObj,
      templateListItem39: inputObj,
      templateListItem40: inputObj,
      templateListItem41: inputObj,
      templateListItem42: inputObj,
      templateListItem43: inputObj,
      templateListItem44: inputObj,
      templateListItem45: inputObj,
      templateListItem46: inputObj,
      templateListItem47: inputObj,
      templateListItem48: inputObj,
      templateListItem49: inputObj
}

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

const ListTemplateDetailForm = (props) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mode, setMode] = useState(props.mode);
  const [title, setTitle] = useState(props.mode === 'edit' ? 'Edit Template List' : 'Add Template List');
  //const {listTemplates, updateListTemplates} = props;
  let editListItemTemplates;
  let editListTemplateName;
  let listGuid;
  let curListTemplate;

  const [listName, setListName] = useState('');
  const [listItemInputs, setListItemInputs] = useState(initListItemInputs);

  function inputChangeHandler(ev) {
    let name = ev.target.name;
    let value = ev.target.value;
    let id = ev.target.id;

    if (name === 'listNameInp') {
      setListName(value);
    } else {
      // handle list item inputs
      let prevListItemInputs = listItemInputs;
      let newInput2 = {};
      newInput2.name = value;
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

  //DEBUG and figure out how to handle actions
  //TODO update the backend
  function formSubmitHandler(ev) {
    let requestBody;
    let listGuid;
    let list = {};

    if (mode === 'add') {
      listGuid = uuidv1();
      for (let itemKey in listItemInputs) {
        listItemInputs[itemKey].parentId = listGuid;
      }

      list.name = listName;
      list.type = listType;
      list.listItems = objToArray(listItemInputs);

      props.fetchTemplateListAdd(list);
    } else if (mode === 'edit') {
      listGuid = props.listTemplateGuid;

      //TODO refactor
      for (let itemKey in listItemInputs) {
        listItemInputs[itemKey].parentId = listGuid;
      }

      list.name = listName;
      list.type = listType;
      list.listItems = objToArray(listItemInputs);
      list.guid = listGuid;

      props.fetchTemplateListEdit(list)

      //this.props.receiveTemplateListEdit(requestBody)
    }

    //updateListTemplates(requestBody);

    clearForm('empty');
    setFormSubmitted(true);
  }

  //renders all list items (text inp and select list)
  function renderForm() {
    let htmlResult = [];

    if (listItemInputs.length) {
      for (let i = 0; i < 50; i++) {
        let key = 'templateListItem' + i.toString();
        let selectKey = 'templateListItemSelect' + i.toString();
        console.log('listItemInputs', listItemInputs)
        console.log('listItemInputs[key]', listItemInputs[key])

        let curInput = listItemInputs[i];
        //console.log('curInput', curInput)
        htmlResult.push(
          <li key={key} >
            <InputText value={curInput.name} placeholder="item name" 
              id={key} onChangeHandler={inputChangeHandler} name={key}
            />
            <SelectList value={curInput.section} id={selectKey} 
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
    let formClearMode = clearMode === "empty" ? clearMode : {mode};

    switch(formClearMode) {
      case "edit":
        setListItemInputs(props.editList.listItemInputs);
        setListName(props.editList.listName);
        // this.setState({
        //   listItemInputs: this.props.editList.listItemInputs,
        //   listName: this.props.editList.listName
        // })
        break;

      case "add":
      case "empty":
      default:
        setListItemInputs(initListItemInputs);
        setListName('');
        // this.setState({
        //   listItemInputs: initListItemInputs,
        //   listName: ''
        // })
        break;
    }
  }

  useEffect(() => {
    if (mode === 'edit') {
      //refactor to use hook state instead
        //let cookieStr = getCookieStr();
      if (getCookieStr()) {
        http_requests.Lists.getTemplateList(props.listTemplateGuid)
          .then(resp => {
            if (resp && resp.type !== 'error') {
              setListName(resp.listTemplate.name);
              setListItemInputs(resp.listTemplate.listItems || []);
            }
          })
      }
      //props.fetchListTemplate(props.listTemplateGuid);
    }
  }, []);

  //TODO refactor button set into one component
  // if (mode === "edit" && props.listTemplates && props.listTemplates.curListTemplate) {
  //   listGuid = props.listTemplateGuid;
  //   //curListTemplate = props.listTemplates.listTemplates[listGuid];
  //   let {name, listItems} = props.listTemplates.curListTemplate;
  //   console.log('name', name)
  //   console.log('listItems', listItems)
  //   setListName(name);
  //   setListItemInputs(listItems);
  // }

  return (
    <div className="main">
      {formSubmitted && (
        <Redirect to="/settings/listTemplates" />
      )}

      <h3>{title}</h3>
      <div>
        <Button classVal="listDetailFormSaveBtn" onClickHandler={formSubmitHandler} label="Save" />
        <Button label="Cancel" onClickHandler={clearForm} />
      </div>
      <br />
      <InputText name="listNameInp" value={listName} placeholder="list name" onChangeHandler={inputChangeHandler} />
      <ul>
        {renderForm()}
      </ul>
      <div>
        <Button classVal="listDetailFormSaveBtn" onClickHandler={formSubmitHandler} label="Save" />
        <Button label="Cancel" onClickHandler={clearForm} />
      </div>
    </div>
  )
}

const mapStateToProps = state => ({ authenticate: state.authenticate, listTemplates: state.listTemplates });

const mapDispatchToProps = dispatch => {
  return {
    fetchTemplateListAdd: (list) => dispatch(fetchTemplateListAdd(list)),
    fetchListTemplate: (guid) => dispatch(fetchListTemplate(guid))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListTemplateDetailForm);
