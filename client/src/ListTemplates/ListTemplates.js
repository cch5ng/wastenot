import React, { Component, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoIosAddCircleOutline } from "react-icons/io";
//import useListTemplates from '../utils/hooks/useListTemplates';

//import {FaPlusSquareO} from 'react-icons/fa';
import Lists from '../Lists/Lists';
import { objToArray } from '../utils/utils';
import http_requests from '../utils/http_requests';
//import '../App.css';

const ListTemplates = (props) => {
  const {listTemplates, updateListTemplates, removeListTemplates} = props;

  let listTemplatesAr = []
  if (listTemplates) {
    listTemplatesAr = objToArray(listTemplates)
  }

  useEffect(() => {
    //TODO
    //fetch list template and update hook state
    let token = props.authenticate && props.authenticate.token ? props.authenticate.token : null;
    http_requests.Lists.getAllTemplateLists(token)
      .then(json => updateListTemplates(json))
      .catch(err => console.error('fetch error', err))
  });

  console.log('props', props);

  return (
    <div className="main">
      <Link to="/settings/listTemplatesNew"><IoIosAddCircleOutline className="list-item-icon-lg" /> New Template List</Link>
      <Lists lists={listTemplatesAr} type="template" clickHandlerDelete={removeListTemplates} />
    </div>
  )
}

const mapStateToProps = state => ({ authenticate: state.authenticate });

export default connect(
  mapStateToProps,
  null
)(ListTemplates);


//export default ListTemplates;
