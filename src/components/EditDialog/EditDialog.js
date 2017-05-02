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
        title={this.props.title}
        actions={[
          <FlatButton
            label="İptal Et"
            secondary={true}
            onTouchTap={this.props.onCancel}
          />,
          <FlatButton
            label="Onayla"
            primary={true}
            onTouchTap={this.props.onConfirm}
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
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  title: PropTypes.string
}

EditDialog.defaultProps = {
  open: false,
}

export default EditDialog