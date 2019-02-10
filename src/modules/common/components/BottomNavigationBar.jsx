import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FormatListNumberedRtlIcon from '@material-ui/icons/FormatListNumberedRtl';
import EventIcon from '@material-ui/icons/Event';
import ProfileIcon from '@material-ui/icons/PortraitRounded';

const styles = {
  root: {
    position: 'fixed',
    width: '100%',
    height: '10vh',
    bottom: 0,
  },
};

class BottomNavigationBar extends Component {
  render() {
    const { classes, value, switchTab, show } = this.props;

    return (
      show ?
        <BottomNavigation
          value={value}
          onChange={(e, value) => switchTab(value)}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction label="Leaderboard" icon={<FormatListNumberedRtlIcon />} />
          <BottomNavigationAction label="Events" icon={<EventIcon />} />
          <BottomNavigationAction label="Profile" icon={<ProfileIcon />} />
        </BottomNavigation>
        : null
    );
  }
}

export default withStyles(styles)(BottomNavigationBar);
