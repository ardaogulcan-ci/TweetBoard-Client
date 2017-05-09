import React, { Component, PropTypes } from 'react';
import { fromJS } from 'immutable'

import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';

import api from '../../configs/api';

import './style.css';

class QueryViewer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      queryData: undefined,
    }
  }

  componentDidMount() {
    const query = this.props.query
    if (!query) {
      return;
    }

    api.getTwitter(query.get('type'), query.get('term'))
    .then( response => {
      this.setState({
        queryData: fromJS(response),
      })
    });
  }

  render() {
    const queryData = this.state.queryData;
    const tweets = queryData && queryData.get('statuses');
    return (
      <div className="query-viewer">
        { tweets && tweets.map((tweet, index) =>
          <Paper key={index} zDepth={1} className="query">
            <a target="_blank"
              href={`https://twitter.com/${tweet.getIn(['user', 'screen_name'])}/status/${tweet.get('id_str')}`}
              className="query-link">
              <Avatar
                className="avatar"
                src={tweet.getIn(['user', 'profile_image_url'])}
                size={55} />
              <div className="text">{tweet.getIn(['text'])}</div>
            </a>
          </Paper>
        )}
      </div>
    );
  }
}

QueryViewer.propTypes = {
  query: PropTypes.any,
}

export default QueryViewer;
