import React, { Component, PropTypes } from 'react';
import styles from './style.css';

class SearchInput extends Component {
  render() {
    const {
      className,
      onChange,
      placeholder,
      type,
      valid,
      value
    } = this.props;

    return (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`search-input ${className} ${!valid ? styles.invalid : ''}`} />
    );
  }
}

SearchInput.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  valid: PropTypes.bool,
  value: PropTypes.string.isRequired,
};

SearchInput.defaultProps = {
  type: 'text',
  className: '',
  placeholder: '',
  valid: true,
  value: '',
}

export default SearchInput;
