import React, { useState, useEffect, Component } from 'react';
import Creatable, { makeCreatableSelect }  from 'react-select/creatable';
import Button from '../App/Shared/Button/Button';
import '../App.css';
import InputText from '../App/Shared/InputText/InputText';
import Checkbox from '../App/Shared/Checkbox/Checkbox';
import http_requests from '../utils/http_requests';
import { fetchShoppingListCreate, fetchShoppingListEdit } from '../actions/shoppingLists';
import { isUsingExpiration } from '../actions/setting';
import { objToArray, getCookieStr, arrayToObj } from '../utils/utils';
import { render } from 'react-dom';

type ShoppingListFormExpirationProps = {
    title: string, 
    formSubmitHandler: any, 
    listName: string, 
    inputChangeHandler: any, 
    onClickHandler: any, 
    renderForm: any, 
    setNotificationClickHandler: any
}
const ShoppingListFormExpiration = (props) => {
    const { title, formSubmitHandler, listName, inputChangeHandler, onClickHandler, 
        renderForm, setNotificationClickHandler, displayError, mode } = props;
    return (
        <div>
            <h1>{title}</h1>
            <div>
                <Button classVal="listDetailFormSaveBtn" onClickHandler={formSubmitHandler} label="Save" 
                    idVal='' size={null} type={null} noMargin={false} />
                <Button label="Cancel" onClickHandler={ev => onClickHandler(mode)} 
                    classVal='' idVal='' size={null} type={null} noMargin={false} />
                <Button label="Set Notification" onClickHandler={setNotificationClickHandler} 
                    classVal='' idVal='' size={null} type={null} noMargin={false} />
            </div>
            {displayError !== null && (
                <div>
                    <h2>Errors</h2>
                    <p>{displayError}</p>
                </div>
            )}
            <br />
            <InputText name="listNameInp" value={listName} placeholder="list name" onChangeHandler={inputChangeHandler} 
                id='' inputClassName='' readOnly={false} type={null} />
            <ul className="list-no-style">
            {renderForm()}
            </ul>
            <div>
                <Button classVal="listDetailFormSaveBtn" onClickHandler={formSubmitHandler} label="Save" 
                    idVal='' size={null} type={null} noMargin={false} />
                <Button label="Cancel" onClickHandler={onClickHandler}
                    classVal='' idVal='' size={null} type={null} noMargin={false} />
                <Button label="Set Notification" onClickHandler={setNotificationClickHandler}
                    classVal='' idVal='' size={null} type={null} noMargin={false} />
            </div>
        </div>
    )
}

export default ShoppingListFormExpiration;
