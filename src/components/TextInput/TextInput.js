import React, { Component, PropTypes } from 'react';
import styles from './style.css';

class TextInput extends Component {
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
        className={`text-input ${className} ${!valid ? styles.invalid : ''}`} />
    );
  }
}

TextInput.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  valid: PropTypes.bool,
  value: PropTypes.string.isRequired,
};

TextInput.defaultProps = {
  type: 'text',
  className: '',
  placeholder: '',
  valid: true,
  value: '',
}

export default TextInput;
