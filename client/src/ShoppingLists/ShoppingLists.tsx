import React, { Component, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosAddCircleOutline } from "react-icons/io";
import Lists from '../Lists/Lists';
import { objToArray } from '../utils/utils';
import http_requests from '../utils/http_requests';
import '../App.css';
import {fetchShoppingLists, deleteShoppingList} from './shoppingListsSlice';
import type { RootState } from '../App/store';

const ShoppingLists = () => {

  const dispatch = useDispatch();
  let authStr = useSelector((state: RootState) => state.auth.authStr);
  let shoppingListsMessage = useSelector((state: RootState) => state.shoppingLists.message);
  let shoppingLists = useSelector((state: RootState) => state.shoppingLists.shoppingLists.entities);


  useEffect(() => {
    if (authStr && shoppingListsMessage === 'no shopping lists have been retrieved') {
      dispatch(fetchShoppingLists({cookieStr: authStr}));
    }
  }, [])

  const removeListTemplates = (ev) => {
    let listGuid = ev.target.id;
    if (authStr) {
      dispatch(deleteShoppingList({cookieStr: authStr, guid: listGuid}));
    }
  }

  let shoppingListsAr = [];
  if (shoppingLists) {
    shoppingListsAr = objToArray(shoppingLists);
  }

  return (
    <div className="main">
      <div className="div-control">
        <Link to="/shoppingLists/new"><IoIosAddCircleOutline className="list-item-icon-lg" /> New Shopping List</Link>
      </div>
      <Lists lists={shoppingListsAr} type="shopping" clickHandlerDelete={removeListTemplates} />
    </div>
  )
}

export default ShoppingLists;