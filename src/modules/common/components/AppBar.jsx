import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, Typography, IconButton, Drawer, ListItem, ListItemText, Divider } from '@material-ui/core';
import ExposurePlus1Icon from '@material-ui/icons/ExposurePlus1';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import FormatListNumberedRtlIcon from '@material-ui/icons/FormatListNumberedRtl';
import EventIcon from '@material-ui/icons/Event';
import ProfileIcon from '@material-ui/icons/PortraitRounded';

const styles = {
  iconButton: {
    color: '#FFFFFF'
  },
  toolbar: {
    paddingLeft: 0,
  },
  list: {
    width: 250,
  },
  showDrawer: {
    // Required due to drawer not changing visibility with state updates
    visibility: 'visible',
  },
};

class CustomAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  toggleState = open => this.setState({ open });

  menuOptions() {
    const clickMenuOption = onClick => {
      this.toggleState(false);
      onClick();
    }
    
    const adminOptions = [
      (
        <ListItem button onClick={() => clickMenuOption(this.props.goToPoints)}>
          <ExposurePlus1Icon />
          <ListItemText>Assign points</ListItemText>
        </ListItem>
      ),
    ];
    
    const ordinaryOptions = [
      (
        <ListItem button onClick={() => clickMenuOption(this.props.goToLeaderBoard)}>
          <FormatListNumberedRtlIcon />
          <ListItemText>Leaderboards</ListItemText>
        </ListItem>
      ),
      (
        <ListItem button onClick={() => clickMenuOption(this.props.goToEvents)}>
          <ProfileIcon />
          <ListItemText>Events</ListItemText>
        </ListItem>
      ),
      (
        <ListItem button onClick={() => clickMenuOption(this.props.goToProfile)}>
          <EventIcon />
          <ListItemText>Profile</ListItemText>
        </ListItem>
      ),
    ];

    let options = [...ordinaryOptions];

    if (this.props.isAdmin) {
      options = [
        ...ordinaryOptions,
        (<Divider />),
        ...adminOptions
      ];
    }

    return options.map((listItem, i) => (
      <div key={i}>{listItem}</div>
    ));
  }

  render() {
    const { classes, title, show } = this.props;
    const { open } = this.state;
    const menuOptions = this.menuOptions();
    const hasMenuOptions = show && menuOptions && menuOptions.length;
    return (
      <AppBar position="static">
        <Toolbar className={hasMenuOptions ? classes.toolbar : ''}>
          {hasMenuOptions &&
            <IconButton edge="start" className={classes.iconButton}>
              <MenuIcon onClick={() => this.toggleState(true)} />
            </IconButton>
          }
          <Typography variant="title" color="inherit">{title}</Typography>
        </Toolbar>
        <Drawer
          open={open}
          className={open ? classes.showDrawer : ''}
          onClose={() => this.toggleState(false)}
        >
          <div className={classes.list} role="presentation">
            <List>
              {menuOptions}
            </List>
          </div>
        </Drawer>
      </AppBar>
    );
  }
}

export default withStyles(styles)(CustomAppBar);
