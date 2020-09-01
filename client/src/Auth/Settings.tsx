import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import Button from '../App/Shared/Button/Button';
import InputText from '../App/Shared/InputText/InputText';
import dbTimezoneAr from '../utils/db_timezone';
import http_requests from '../utils/http_requests';

type SettingsProps = {
  authenticate: {
    isLoggedIn: boolean,
    hasButtonClicked: boolean,
    status: string,
    message: string,
    authStr: string,
  }
}
const Settings = (props: SettingsProps) => {
  const [timezone, setTimezone] = useState({value: 'none', label: 'Select a local timezone'});

  let onChangeHandler = function(
    selectedOption: {value: string, label: string}
  ): void {
    setTimezone(selectedOption);
  }

  let formSubmitHandler = function(
    event: React.MouseEvent<HTMLDivElement>
  ): void {
    event.preventDefault();
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

        <Button label="Save" onClickHandler={formSubmitHandler} 
          classVal='' idVal='' size={null} type={null} noMargin={false} />
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({ authenticate: state.authenticate, })

export default connect(mapStateToProps, null)(Settings);
