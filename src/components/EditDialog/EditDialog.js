import React, { Component, PropTypes } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class EditDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDialog: false,
      loading: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({showDialog: nextProps.open});
  }

  render() {
    return (
      <Dialog
        className={this.props.className}
        bodyClassName={this.props.bodyClassName}
        title={this.props.title}
        autoScrollBodyContent={true}
        actions={[
          <FlatButton
            label="Cancel"
            secondary={true}
            onTouchTap={this.props.onCancel}
          />,
          <FlatButton
            label="Save"
            primary={true}
            onTouchTap={this.props.onSave}
          />,
        ]}
        open={this.state.showDialog}>
          { this.props.children }
      </Dialog>

    );
  }
}

EditDialog.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  bodyClassName: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  title: PropTypes.string
}

EditDialog.defaultProps = {
  open: false,
}

export default EditDialog