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
    this.props.fetchLists();
  }

  removeListTemplates = (ev) => {
    let listGuid = ev.target.id;

    this.props.fetchTemplateListDelete(listGuid)
  }

  render() {
    let listTemplatesAr = [];
    if (this.props.listTemplates && this.props.listTemplates.listTemplates) {
      listTemplatesAr = objToArray(this.props.listTemplates.listTemplates);
    }

    return (
      <div className="main">
        <Link to="/settings/listTemplatesNew"><IoIosAddCircleOutline className="list-item-icon-lg" /> New Template List</Link>
        <Lists lists={listTemplatesAr} type="template" clickHandlerDelete={this.removeListTemplates} />
      </div>
    )
  }
}

const mapStateToProps = state => ({ authenticate: state.authenticate, listTemplates: state.listTemplates });

const mapDispatchToProps = dispatch => {
  return {
    fetchLists: () => dispatch(fetchLists()),
    fetchTemplateListDelete: (guid) => dispatch(fetchTemplateListDelete(guid))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListTemplates);
