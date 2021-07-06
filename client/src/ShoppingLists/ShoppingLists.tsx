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

//import { fetchShoppingLists, fetchShoppingListDelete } from '../actions/shoppingLists';

type MyProps = {
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
  // fetchShoppingLists: any,
  // fetchShoppingListDelete: any,
}
type MyState = {}

const ShoppingLists = () => {

// class ShoppingLists extends Component<MyProps, MyState> {
//   constructor(props) {
//     super(props);
//   }

  const dispatch = useDispatch();
  let authStr = useSelector((state: RootState) => state.auth.authStr);
  let shoppingListsMessage = useSelector((state: RootState) => state.shoppingLists.message);
  let shoppingLists = useSelector((state: RootState) => state.shoppingLists.shoppingLists.entities);


  useEffect(() => {
    if (authStr && shoppingListsMessage === 'no shopping lists have been retrieved') {
      dispatch(fetchShoppingLists({cookieStr: authStr}));
    }
  }, [])

  // componentDidMount() {
  //   if (this.props.authenticate && this.props.authenticate.authStr
  //     && this.props.shoppingLists.message === 'no shopping lists have been retrieved') {
  //     dispatch(fetchShoppingLists({cookieStr: this.props.authenticate.authStr}));
  //   }
  // }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.authenticate.authStr !== this.props.authenticate.authStr
  //     && this.props.shoppingLists.message === 'no shopping lists have been retrieved') {
  //     this.props.fetchShoppingLists({cookieStr: this.props.authenticate.authStr});
  //   }
  // }

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

// const mapStateToProps = state => ({ authenticate: state.authenticate, shoppingLists: state.shoppingLists });

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchShoppingLists: ({cookieStr}) => dispatch(fetchShoppingLists({cookieStr})),
//     fetchShoppingListDelete: ({ guid, cookieStr }) => dispatch(fetchShoppingListDelete({ guid, cookieStr }))
//   }
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ShoppingLists);
