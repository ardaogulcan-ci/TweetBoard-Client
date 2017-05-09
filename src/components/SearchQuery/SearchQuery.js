import React, { Component, PropTypes } from 'react';

import { fromJS } from 'immutable';

import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import LanguageSelect from '../LanguageSelect/LanguageSelect';
import { convertDate } from '../../helpers/date';

class SearchQuery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      includes: '',
      excludes: '',
      from: '',
      to: '',
      mentioning: '',
      filters: fromJS({
        images: false,
        videos: false,
        positive: false,
        negative: false,
        question: false,
        links: false,
      }),
      date: fromJS({
        since: undefined,
        until: undefined,
      }),
      type: 'mixed',
      language: 'all',
    }
  }

  generateQuery() {
    const data = this.state;
    let termString = data.includes.replace(',', ' OR ');
    termString += data.excludes ? ' -' + data.excludes.replace(',', ' -') : '';
    termString += data.from ? ' from:' + data.from.replace(',', ' OR from:') : '';
    termString += data.to ? ' to:' + data.to.replace(',', ' OR to:') : '';
    termString += data.mentioning ? ' @' + data.mentioning.replace(',', ' OR @') : '';

    termString += data.filters.keySeq().reduce((acc, key) => acc + (data.filters.get(key) ? ` filter:${key}`: ''), '');
    termString += data.date.keySeq().reduce((acc, key) => {
      let date = data.date.get(key);
      date = date && convertDate(date);
      return acc + (date? ` ${key}:${date}`: '');
    }, '');

    termString = termString
    .replace('filter:question', '?')
    .replace('filter:positive', ':)')
    .replace('filter:negative', ':(');

    termString = 'q=' + encodeURIComponent(termString);
    termString += '&result_type=' + encodeURIComponent(data.type);
    termString += '&lang=' + encodeURIComponent(data.language);

    if (this.props.onChange) {
      this.props.onChange(termString);
    }

  }

  handleTextChange(field, event, value) {
    this.setState({
      [field]: value,
    }, this.generateQuery);
  }

  handleToogleChange(field, event, value) {
    this.setState({
      filters: this.state.filters.set(field, value),
    }, this.generateQuery);
  }

  handleDateChange(field, event, value) {
    this.setState({
      date: this.state.date.set(field, value),
    }, this.generateQuery);
  }

  handleTypeChange(event, key, value) {
    this.setState({
      type: value,
    }, this.generateQuery);
  }

  handleLangaugeChange(event, key, value) {
    this.setState({
      language: value,
    }, this.generateQuery);
  }

  render() {
    return (
      <div>
        <TextField
          id="includes"
          hintText="Write a search term and hit enter"
          floatingLabelText="Search for"
          floatingLabelFixed={true}
          onChange={this.handleTextChange.bind(this, 'includes')}
          value={this.state.includes}
          fullWidth={true}/>
        <TextField
          id="excludes"
          hintText="Write a term to exclude from the results"
          floatingLabelText="Exlcude"
          floatingLabelFixed={true}
          onChange={this.handleTextChange.bind(this, 'excludes')}
          value={this.state.excludes}
          fullWidth={true}/>
        <TextField
          id="from"
          hintText="Search in tweets from an account"
          floatingLabelText="From"
          floatingLabelFixed={true}
          onChange={this.handleTextChange.bind(this, 'from')}
          value={this.state.from}
          fullWidth={true}/>
        <TextField
          id="to"
          hintText="Search in tweets to a account"
          floatingLabelText="To"
          floatingLabelFixed={true}
          onChange={this.handleTextChange.bind(this, 'to')}
          value={this.state.to}
          fullWidth={true}/>
        <TextField
          id="mentioning"
          hintText="Search in tweets where accont is mentioning"
          floatingLabelText="Mentioning"
          floatingLabelFixed={true}
          onChange={this.handleTextChange.bind(this, 'mentioning')}
          value={this.state.mentioning}
          fullWidth={true}/>
        <Toggle
          label="Images"
          onToggle={this.handleToogleChange.bind(this, 'images')}
          value={this.state.filters.get('images')}/>
        <Toggle
          label="Videos"
          onToggle={this.handleToogleChange.bind(this, 'videos')}
          value={this.state.filters.get('videos')}/>
        <Toggle
          label="Positive"
          onToggle={this.handleToogleChange.bind(this, 'positive')}
          value={this.state.filters.get('positive')}/>
        <Toggle
          label="Negative"
          onToggle={this.handleToogleChange.bind(this, 'negative')}
          value={this.state.filters.get('negative')}/>
        <Toggle
          label="Question"
          onToggle={this.handleToogleChange.bind(this, 'question')}
          value={this.state.filters.get('questions')}/>
        <Toggle
          label="Link"
          onToggle={this.handleToogleChange.bind(this, 'links')}
          value={this.state.filters.get('links')}/>
        <DatePicker
          hintText="Tweets From Date"
          floatingLabelText="From"
          floatingLabelFixed={true}
          autoOk={true}
          onChange={this.handleDateChange.bind(this, 'since')}
          value={this.state.date.get('since')}/>
        <DatePicker
          hintText="Tweets To Date"
          floatingLabelText="To"
          floatingLabelFixed={true}
          autoOk={true}
          minDate={this.state.date.get('since')}
          onChange={this.handleDateChange.bind(this, 'until')}
          value={this.state.date.get('until')}/>
        <SelectField
          hintText="Select the tweet types"
          floatingLabelText="Tweet Type"
          floatingLabelFixed={true}
          onChange={this.handleTypeChange.bind(this)}
          value={this.state.type}>
          <MenuItem value="mixed" primaryText="Mixed" />
          <MenuItem value="recent" primaryText="Recent" />
          <MenuItem value="popular" primaryText="Popular" />
        </SelectField>
        <LanguageSelect
          id="language,"
          onChange={this.handleLangaugeChange.bind(this)}
          value={this.state.language}/>
      </div>
    );
  }
}

SearchQuery.propTypes = {
  onChange: PropTypes.func,
}

export default SearchQuery;