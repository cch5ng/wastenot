import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import uuidv1 from 'uuid/v1'

import Button from '../App/Shared/Button/Button'
import SelectList from '../App/Shared/SelectList/SelectList'
import InputText from '../App/Shared/InputText/InputText'
import '../App.css';

const inputObj = {name: '', section: 'none'};

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
      {label: 'prepared', value: 'prepared'},
      {label: 'deli', value: 'deli'},
      {label: 'produce', value: 'produce'},
]

const ListTemplateDetailForm = (props) => {

  const [mode, setMode] = useState(props.mode === 'edit' ? props.mode : 'create');
  const [title, setTitle] = useState(props.mode === 'edit' ? 'Edit Template List' : 'Add Template List');
  const [listItemInputs, setListItemInputs] = useState(props.mode === 'edit' ? {} : initListItemInputs);
  const [listName, setListName] = useState('');

  //a litte confused about if I want to toggle one form for create vs edit view, how do I reconcile a form field value for prefilling
  //on edit state?

  function listNameInputChangeHandler(ev) {
    let listName = ev.target.value
    setListName(listName);
  }

  function listItemInputChangeHandler(ev) {
    let name = ev.target.value
    let id = ev.target.id

    this.setState(prevState => {
      let newInput2 = {}
      newInput2.name = name

      let newInput = {}
      newInput[id] = {...prevState.listItemInputs[id], ...newInput2}
      let newState = {...prevState.listItemInputs, ...newInput}
      return {listItemInputs: newState}
    })
  }

  function getInputValue(id) {
    return this.state.listItemInputs[id]
  }

  function formSubmitHandler(ev) {
    let listItemInputs = this.state.listItemInputs
    let listName = this.state.listName
    let requestBody
    let listId

    if (mode === "add") {
      listId = uuidv1();
      for (let itemKey in listItemInputs) {
        listItemInputs[itemKey].parentId = listId
      }
      requestBody = { listId, listName, listItemInputs}
      this.props.receiveTemplateListCreate(requestBody)
    } else if (this.state.mode === "Edit") {
      listId = this.props.templateListId
      requestBody = { listId, listName, listItemInputs}
      this.props.receiveTemplateListEdit(requestBody)
    }

    this.clearForm('empty')
  }

  function reformatSelectId(id) {
    let tempAr = id.split('Select')
    return tempAr.join('')
  }

  function onChangeHandlerSelectSection(ev) {
    let id = ev.target.id
    let reformattedId = this.reformatSelectId(id)
    let section = ev.target.value
    this.setState(prevState => {
      let newInput2 = {}
      newInput2.section = section

      let newInput = {}
      newInput[reformattedId] = {...prevState.listItemInputs[reformattedId], ...newInput2}
      let newState = {...prevState.listItemInputs, ...newInput}
      return {listItemInputs: newState}
    })
  }

  function renderForm() {
    let htmlResult = []

    for (let i = 0; i < 50; i++) {
      let key = 'shoppingListItem' + i.toString()
      let selectKey = 'shoppingListItemSelect' + i.toString()
      htmlResult.push(
        <li key={key} >
          <InputText defVal={listItemInputs[key].name} placeholderVal="item name" idVal={key} onChangeHandler={listItemInputChangeHandler} />
          <SelectList defVal={listItemInputs[key].section} idVal={selectKey} options={sectionOptions} onChange={onChangeHandlerSelectSection} />
        </li>
      )
    }
    return htmlResult;
  }

  function clearForm(clearMode = null) {
    let formClearMode = clearMode === "empty" ? clearMode : {mode};

    switch(formClearMode) {
      case "Edit":
        this.setState({
          listItemInputs: this.props.editList.listItemInputs,
          listName: this.props.editList.listName
        })
        break

      case "Add":
      case "empty":
      default:
        this.setState({
          listItemInputs: initListItemInputs,
          listName: ''
        })
        break
    }
  }

  return (
    <div className="main">
      <h3>{title}</h3>
      <div>
        <Button classVal="listDetailFormSaveBtn" onClickHandler={formSubmitHandler} label="Save" />
        <Button label="Cancel" onClickHandler={clearForm} />
      </div>
      <br />
      <InputText defVal={listName} placeholderVal="list name" onChangeHandler={listNameInputChangeHandler} />
      <ul>
        {renderForm()}
      </ul>
      <div>
        <Button classVal="listDetailFormSaveBtn" onClickHandler={formSubmitHandler}label="Save" />
        <Button label="Cancel" onClickHandler={clearForm} />
      </div>
    </div>
  )

}

export default ListTemplateDetailForm;
