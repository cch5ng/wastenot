import React, { useState, useEffect } from 'react';

const useListTemplates = (cb) => {
  const [listTemplates, setListTemplates] = useState({});

  const addList = (list) => {
    let prevListTemplates = listTemplates;
    let key = list.listId;
    let newListTemplates = { ...prevListTemplates, [key]: list };

    setListTemplates(newListTemplates);
  }
  // useEffect(() => {
  //   function handleStatusChange(status) {
  //     setIsOnline(status.isOnline);
  //   }

  //   ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
  // });

  return {listTemplates, addList};
}

export default useListTemplates;
