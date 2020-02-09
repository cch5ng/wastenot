import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import Button from '../App/Shared/Button/Button';
import InputText from '../App/Shared/InputText/InputText';
import dbTimezoneAr from '../utils/db_timezone';
import http_requests from '../utils/http_requests';

const Settings = (props) => {

  const [timezone, setTimezone] = useState({value: 'none', label: 'Select a local timezone'});

  function onChangeHandler(selectedOption) {
    setTimezone(selectedOption);
  }

  function formSubmitHandler(ev) {
    ev.preventDefault();
    if (props.authenticate && props.authenticate.authStr) {
      http_requests.Auth.putTimezone({timezone, cookieStr: props.authenticate.authStr})
    }
  }

  useEffect(() => {
    //get the user's timezone and if it exists set the timezone
    if (props.authenticate && props.authenticate.authStr) {
      http_requests.Auth.getTimezone({cookieStr: props.authenticate.authStr})
        .then((resp) => {
          if (resp.time_zone.time_zone) {
            setTimezone(JSON.parse(resp.time_zone.time_zone));
          }
        })
    }
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
