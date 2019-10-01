import React from 'react';
import { Link } from 'react-router-dom';
//import { FaEdit, FaMinusSquareO } from 'react-icons/fa';
import { IoIosRemoveCircleOutline, IoMdCreate } from "react-icons/io";

const Lists = ({ lists, type, clickHandlerDelete }) => {
  return (
    <ul className="list-group">
      {lists.map(list => {
        let listLink;
        let editListLink;

        if (list) {
          if (type === "shopping") {
            listLink = `/lists/${list.listId}`;
            editListLink = `/listEdit/${list.listId}`;
          } else if (type === "template") {
            listLink = `/settings/listTemplates/${list.listId}`;
            editListLink = `/settings/listTemplatesEdit/${list.listId}`;
          }
          return (
            <li key={list.listId}>
              <Link to={listLink}><span className="list-name">{list.listName}</span></Link>
              <Link to={editListLink}><IoMdCreate className="list-item-icon" /></Link>
              <IoIosRemoveCircleOutline className="list-item-icon" id={list.listId} onClick={(ev) => (clickHandlerDelete(ev))} />
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
