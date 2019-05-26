import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, Typography, IconButton, Drawer, ListItem, ListItemText } from '@material-ui/core';
import ExposurePlus1Icon from '@material-ui/icons/ExposurePlus1';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';

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
      )
    ];
    const ordinaryOptions = [];
    let options = [...ordinaryOptions];

    if (this.props.isAdmin) {
      options = [...ordinaryOptions, ...adminOptions];
    }

    return options.map((listItem, i) => (
      <div key={i}>{listItem}</div>
    ));
  }

  toggleState(open) {
    this.setState({ open });
  }

  render() {
    const { classes, title } = this.props;
    const { open } = this.state;
    const menuOptions = this.menuOptions();
    const hasMenuOptions = menuOptions && menuOptions.length;
    return (
      <AppBar position="static">
        <Toolbar className={hasMenuOptions ? classes.toolbar : ''}>
          {hasMenuOptions ?
            <IconButton edge="start" className={classes.iconButton}>
              <MenuIcon onClick={() => this.toggleState(true)} />
            </IconButton>
            :
            undefined
          }
        <Typography variant="title" color="inherit">{title}</Typography>
        </Toolbar>
        <Drawer open={open} className={open ? classes.showDrawer : ''} onClose={() => this.toggleState(false)}>
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
