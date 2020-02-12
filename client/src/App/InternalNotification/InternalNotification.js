import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './style.css';

class InternalNotification extends Component {

    constructor(props) {
      super(props);
      this.state = {
      }
    }
  
    componentDidMount() {
    }

    render() {
        return (
          <div>
          </div>
        )
    }
}

const mapStateToProps = state => ({ setting: state.setting });

const mapDispatchToProps = dispatch => {
  return {
    //register: ({ email, password }) => dispatch(register({ email, password }))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(InternalNotification);
