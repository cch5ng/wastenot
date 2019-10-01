import React, { useState, useEffect } from 'react';

const useListTemplates = (cb) => {
  const [listTemplates, setListTemplates] = useState({});

  const updateListTemplates = (list) => {
    let prevListTemplates = listTemplates;
    let key = list.listId;
    let newListTemplates = { ...prevListTemplates, [key]: list };

    setListTemplates(newListTemplates);
  }

  const removeListTemplates = (ev) => {
    let listId = ev.target.id;
    let newListTemplates = {};

    let filteredKeys = Object.keys(listTemplates).filter(k => k !== listId);
    filteredKeys.forEach(k => {
      newListTemplates[k] = listTemplates[k];
    })
    setListTemplates(newListTemplates);
  }

  return {listTemplates, updateListTemplates, removeListTemplates};
}

export default useListTemplates;
