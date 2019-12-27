import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosRemoveCircleOutline, IoMdCreate } from "react-icons/io";
import '../App.css';

const Lists = ({ lists, type, clickHandlerDelete }) => {
  return (
    <ul className="list-group list-no-style">
      {lists.map(list => {
        let editListLink;
        if (list) {
          if (type === "shopping") {
            editListLink = `/shoppingLists/${list.guid}/edit`;
          } else if (type === "template") {
            editListLink = `/settings/listTemplatesEdit/${list.guid}`;
          }
          return (
            <li key={list.guid}>
              <Link to={editListLink}><span className="list-name">{list.name}</span></Link>
              <Link to={editListLink}><IoMdCreate className="list-item-icon" /></Link>
              <IoIosRemoveCircleOutline className="list-item-icon" id={list.guid} onClick={(ev) => (clickHandlerDelete(ev))} />
            </li>
          )
        }
        if (!list) {
          return (null)
        }
      })}
    </ul>
  )
}

export default Lists;
