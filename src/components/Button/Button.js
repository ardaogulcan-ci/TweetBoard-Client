import React, { Component, PropTypes } from 'react';
import styles from './style.css';

class Button extends Component {

  render() {
    const { children, className, rounded, icon, iconClass, onClick } = this.props;
    return (
      <button
        onClick={onClick}
        className={`button-component ${rounded ? styles.rounded : ''} ${className}`}>
        {icon && <img className={`${styles.icon} ${iconClass}`} src={icon} role='presentation' />}
        <span className={styles.children}>
          {children}
        </span>
      </button>
    );
  }
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  rounded: PropTypes.bool,
  icon: PropTypes.string,
  iconClass: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  className: '',
  rounded: false,
  iconClass: '',
  disabled: false,
}

export default Button;
