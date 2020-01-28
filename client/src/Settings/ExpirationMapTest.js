import React, { useState, useEffect } from 'react';
import Checkbox from '../App/Shared/Checkbox';
import Button from '../App/Shared/Button';
import InputText from '../App/Shared/InputText';
import SelectList from '../App/Shared/SelectList';

const ExpirationMapTest = (props) => {

  const [mappings, setMappings] = useState({});

  //
  formChangeHandler = () => {

  }

  expirationDateMapper1 = () => {

  }

  expirationDateMapper2 = () => {

  }

  renderForm = () => {
    for (let i = 0; i < 29; i++) {
      return (
        <div>
          <Checkbox />
          <InputText />
        </div>
      )

    }
  }

  return (
    <div>
      <form>
      </form>
    </div>
  )

}

export default ExpirationMapTest;
