import React, { Component } from "react";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  container: {
    [theme.breakpoints.down('md')]: {
      paddingTop: '1vh',
      paddingBottom: '10vh',
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: '9vh',
    },
  },
  showSidebar: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: '250px',
    },
  }
});

class Content extends Component {
  render() {
    const { classes, className, showSidebar } = this.props;
    return (
      <div className={`${classes.container} ${className || ''} ${showSidebar && classes.showSidebar}`}>
        {this.props.children}
      </div>
    )
  }
}

export default withStyles(styles)(Content);
