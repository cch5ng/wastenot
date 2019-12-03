import React, { Component, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoIosAddCircleOutline } from "react-icons/io";
//import useListTemplates from '../utils/hooks/useListTemplates';

//import {FaPlusSquareO} from 'react-icons/fa';
import Lists from '../Lists/Lists';
import { objToArray } from '../utils/utils';
import http_requests from '../utils/http_requests';
import { fetchLists } from '../actions/listTemplates';
//import '../App.css';

class ListTemplates extends Component {

  state = {

  }

  componentDidMount() {
    this.props.fetchLists();
  }

  removeListTemplates = (ev) => {
    let listId = ev.target.id;
    let newListTemplates = {};

    //TODO refactor based on redux store for listTemplates
    //let filteredKeys = Object.keys(listTemplates).filter(k => k !== listId);
    //filteredKeys.forEach(k => {
    //  newListTemplates[k] = listTemplates[k];
    //})
    //TODO update redux and update BE
    //setListTemplates(newListTemplates);
  }

  // const {listTemplates, updateListTemplates, removeListTemplates} = props;

  // if (listTemplates) {
  //   listTemplatesAr = objToArray(listTemplates)
  // }

  // useEffect(() => {
  //   //TODO
  //   //fetch list template and update hook state
  //   let token = props.authenticate && props.authenticate.token ? props.authenticate.token : null;
  //   http_requests.Lists.getAllTemplateLists(token)
  //     .then(json => updateListTemplates(json))
  //     .catch(err => console.error('fetch error', err))
  // });

  // console.log('props', props);

  render() {
    let listTemplatesAr = []

    return (
      <div className="main">
        <Link to="/settings/listTemplatesNew"><IoIosAddCircleOutline className="list-item-icon-lg" /> New Template List</Link>
        <Lists lists={listTemplatesAr} type="template" clickHandlerDelete={this.removeListTemplates} />
      </div>
    )
  }
}


const mapStateToProps = state => ({ authenticate: state.authenticate });

const mapDispatchToProps = dispatch => {
  return {
    fetchLists: () => dispatch(fetchLists()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListTemplates);
