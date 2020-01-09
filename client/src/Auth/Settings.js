import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import Button from '../App/Shared/Button/Button';
import InputText from '../App/Shared/InputText/InputText';
import dbTimezoneAr from '../utils/db_timezone';

const Settings = (props) => {

  const [timezone, setTimezone] = useState('none');

  function onChangeHandler(selectedOption) {
    setTimezone(selectedOption);
  }

  function formSubmitHandler(ev) {
    ev.preventDefault();
    console.log('todo make BE request to update timezone')
  }

  useEffect(() => {
    //get the user's timezone and if it exists set the timezone
  }, [])

  //reformat the data source for consumption by react select
  return (
    <div>
      <h1>Application Settings</h1>
      <form>
        <Select
          value={timezone}
          onChange={onChangeHandler}
          options={dbTimezoneAr}
        />

        <Button label="Save" onClickHandler={formSubmitHandler} />
      </form>
    </div>
  )

}

//needs connect to authenticate for cookie access

const mapStateToProps = (state) => ({ authenticate: state.authenticate, })

export default connect(mapStateToProps, null)(Settings);
