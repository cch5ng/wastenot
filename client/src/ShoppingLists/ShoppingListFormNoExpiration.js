import React, { useState, useEffect, Component } from 'react';
import Button from '../App/Shared/Button/Button';
//import SelectList from '../App/Shared/SelectList/SelectList';
import InputText from '../App/Shared/InputText/InputText';
import '../App.css';
import Checkbox from '../App/Shared/Checkbox/Checkbox';
import http_requests from '../utils/http_requests';
import { fetchShoppingListCreate, fetchShoppingListEdit } from '../actions/shoppingLists';
import { isUsingExpiration } from '../actions/setting';
import { objToArray, getCookieStr, arrayToObj } from '../utils/utils';
import { render } from 'react-dom';

const ShoppingListFormNoExpiration = (props) => {
    const { title, formSubmitHandler, listName, inputChangeHandler, onClickHandler, renderForm } = props;
    return (
        <div>
            <h3>{title}</h3>
            <div>
            <Button classVal="listDetailFormSaveBtn" onClickHandler={formSubmitHandler} label="Save" />
            <Button label="Cancel" onClickHandler={onClickHandler} />
            </div>
            <br />
            <InputText name="listNameInp" value={listName} placeholder="list name" onChangeHandler={inputChangeHandler} />
            <ul className="list-no-style">
            {renderForm()}
            </ul>
            <div>
            <Button classVal="listDetailFormSaveBtn" onClickHandler={formSubmitHandler} label="Save" />
            <Button label="Cancel" onClickHandler={onClickHandler} />
            </div>    
        </div>
    )
}

export default ShoppingListFormNoExpiration;
