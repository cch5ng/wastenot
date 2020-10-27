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


type ShoppingListFormNoExpirationProps = {
    title: string, 
    formSubmitHandler: any, 
    listName: string, 
    inputChangeHandler: any, 
    onClickHandler: any, 
    renderForm: any
}
const ShoppingListFormNoExpiration = (props) => {
    const { title, formSubmitHandler, listName, inputChangeHandler, onClickHandler, renderForm, mode } = props;
    return (
        <form className='formShoppingListContainer'>
            <h3>{title}</h3>
            <div>
                <Button classVal="listDetailFormSaveBtn" onClickHandler={formSubmitHandler} label="Save" 
                    idVal='' size={null} type={null} noMargin={false} />
                <Button label="Cancel" onClickHandler={ev => onClickHandler(mode)} 
                    classVal='' idVal='' size={null} type={null} noMargin={false} />
            </div>
            <br />
            <div className="formGroup">
                <label htmlFor="listNameInp">List Name</label>
                <InputText name="listNameInp" value={listName} placeholder="list name" 
                onChangeHandler={inputChangeHandler} id='listNameInp' inputClassName='' 
                readOnly={false} type={null} />
            </div>
            <ul className="list-no-style">
            {renderForm()}
            </ul>
            <div>
                <Button classVal="listDetailFormSaveBtn" onClickHandler={formSubmitHandler} label="Save"
                    idVal='' size={null} type={null} noMargin={false} />
                <Button label="Cancel" onClickHandler={onClickHandler}
                    classVal='' idVal='' size={null} type={null} noMargin={false} />
            </div>    
        </form>
    )
}

export default ShoppingListFormNoExpiration;
