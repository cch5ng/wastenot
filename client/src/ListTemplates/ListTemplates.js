import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IoIosAddCircleOutline } from "react-icons/io";
import useListTemplates from '../utils/hooks/useListTemplates';

//import {FaPlusSquareO} from 'react-icons/fa';

//import Lists from '../Lists/components/Lists'
//import '../App.css';

const ListTemplates = (props) => {
  const {listTemplates, addList} = useListTemplates();
  console.log('listTemplates', listTemplates);

  function objToArray(obj) {
    let resultAr = []
    Object.keys(obj).forEach(ok => {
      resultAr.push(obj[ok])
    })

    return resultAr
  }

  let listTemplatesAr = []
  if (props.listTemplates) {
    listTemplatesAr = objToArray(props.listTemplates)
  }

  return (
    <div className="main">
      <Link to="/settings/listTemplatesNew"><IoIosAddCircleOutline className="list-item-icon-lg" /> New Template List</Link>
    </div>
  )

}

export default ListTemplates;

// <Lists lists={listTemplatesAr} type="template" />