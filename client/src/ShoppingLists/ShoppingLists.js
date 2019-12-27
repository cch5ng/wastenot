import React, { Component, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoIosAddCircleOutline } from "react-icons/io";
import Lists from '../Lists/Lists';
import { objToArray } from '../utils/utils';
import http_requests from '../utils/http_requests';
import { fetchShoppingLists } from '../actions/shoppingLists';
import '../App.css';

class ShoppingLists extends Component {
  componentDidMount() {
    if (this.props.authenticate && this.props.authenticate.authStr) {
      this.props.fetchShoppingLists({cookieStr: this.props.authenticate.authStr});
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.authenticate.authStr !== this.props.authenticate.authStr) {
      this.props.fetchShoppingLists({cookieStr: this.props.authenticate.authStr});
    }
  }

  removeListTemplates = (ev) => {
    let listGuid = ev.target.id;
    //TODO
    console.log('TODO implement ShoppingLists > removeListTemplates')
    //this.props.fetchTemplateListDelete(listGuid)
  }

  render() {
    let shoppingListsAr = [];
    if (this.props.shoppingLists && this.props.shoppingLists.shoppingLists) {
      shoppingListsAr = objToArray(this.props.shoppingLists.shoppingLists);
    }

    return (
      <div className="main">
        <div className="div-control">
          <Link to="/shoppingLists/new"><IoIosAddCircleOutline className="list-item-icon-lg" /> New Shopping List</Link>
        </div>
        <Lists lists={shoppingListsAr} type="shopping" clickHandlerDelete={this.removeListTemplates} />
      </div>
    )
  }
}

const mapStateToProps = state => ({ authenticate: state.authenticate, shoppingLists: state.shoppingLists });

const mapDispatchToProps = dispatch => {
  return {
    fetchShoppingLists: ({cookieStr}) => dispatch(fetchShoppingLists({cookieStr}))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingLists);
