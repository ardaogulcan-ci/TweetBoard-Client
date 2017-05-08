import React, { Component, PropTypes } from 'react';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class MoreMenu extends Component {
  render() {
    return (
      <IconMenu
        {...this.props}
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}} >
        { this.props.children }
      </IconMenu>
    );
  }
}
MoreMenu.propTypes = {
  children: PropTypes.node.isRequired,
}
MoreMenu.muiName = 'IconMenu';

export default MoreMenu;