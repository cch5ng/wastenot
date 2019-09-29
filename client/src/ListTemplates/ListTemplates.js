import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IoIosAddCircleOutline } from "react-icons/io";
//import useListTemplates from '../utils/hooks/useListTemplates';

//import {FaPlusSquareO} from 'react-icons/fa';
import Lists from '../Lists/components/Lists';
import { objToArray } from '../utils/utils';
//import '../App.css';

const ListTemplates = (props) => {
  //const {listTemplates, addList} = useListTemplates();
  const {listTemplates, updateListTemplates, removeListTemplates} = props;

  console.log('listTemplates', listTemplates);

  let listTemplatesAr = []
  if (listTemplates) {
    listTemplatesAr = objToArray(listTemplates)
  }

  return (
    <div className="main">
      <Link to="/settings/listTemplatesNew"><IoIosAddCircleOutline className="list-item-icon-lg" /> New Template List</Link>
      <Lists lists={listTemplatesAr} type="template" />
    </div>
  )

}

export default ListTemplates;

// <Lists lists={listTemplatesAr} type="template" />