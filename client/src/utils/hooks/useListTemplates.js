import React, { useState, useEffect } from 'react';

const useListTemplates = (cb) => {
  const [listTemplates, setListTemplates] = useState({});

  const updateListTemplates = (list) => {
    let prevListTemplates = listTemplates;
    let key = list.listId;
    let newListTemplates = { ...prevListTemplates, [key]: list };

    setListTemplates(newListTemplates);
  }

  //TODO
  const removeListTemplates = () => {

  }
  // useEffect(() => {
  //   function handleStatusChange(status) {
  //     setIsOnline(status.isOnline);
  //   }

  //   ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
  // });


  return {listTemplates, updateListTemplates, removeListTemplates};
}

export default useListTemplates;
