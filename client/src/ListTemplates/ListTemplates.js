import React, { Component, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoIosAddCircleOutline } from "react-icons/io";
import Lists from '../Lists/Lists';
import { objToArray } from '../utils/utils';
import http_requests from '../utils/http_requests';
import { fetchLists, fetchTemplateListDelete } from '../actions/listTemplates';
import '../App.css';

class ListTemplates extends Component {
  componentDidMount() {
    if (this.props.authenticate && this.props.authenticate.authStr) {
      this.props.fetchLists({cookieStr: this.props.authenticate.authStr});
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.authenticate.authStr !== this.props.authenticate.authStr) {
      this.props.fetchLists({cookieStr: this.props.authenticate.authStr});
    }
  }

  removeListTemplates = (ev) => {
    let guid = ev.target.id;
    if (this.props.authenticate && this.props.authenticate.authStr) {
      this.props.fetchTemplateListDelete(
        { guid,
          cookieStr: this.props.authenticate.authStr
        }
      )
    }
  }

  render() {
    let listTemplatesAr = [];
    if (this.props.listTemplates && this.props.listTemplates.listTemplates) {
      listTemplatesAr = objToArray(this.props.listTemplates.listTemplates);
    }

    return (
      <div className="main">
        <div className="div-control">
          <Link to="/settings/listTemplatesNew"><IoIosAddCircleOutline className="list-item-icon-lg" /> New Template List</Link>
        </div>
        <Lists lists={listTemplatesAr} type="template" clickHandlerDelete={this.removeListTemplates} />
      </div>
    )
  }
}

const mapStateToProps = state => ({ authenticate: state.authenticate, listTemplates: state.listTemplates });

const mapDispatchToProps = dispatch => {
  return {
    fetchLists: ({cookieStr}) => dispatch(fetchLists({cookieStr})),
    fetchTemplateListDelete: (guid) => dispatch(fetchTemplateListDelete(guid))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListTemplates);
