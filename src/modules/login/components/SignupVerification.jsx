import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Content from '../../common/components/Content';
import { CircularProgress, Typography, Snackbar } from '@material-ui/core';

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
  },
  child: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  text: {
    marginTop: '12px',
  },
};

class SignupVerification extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.finishRegistration(this.props.userId);
  }

  render() {
    const { classes, showErrorMessage, errorMessage } = this.props;
    return (
      <Content>
        <div className={classes.wrapper}>
          <Snackbar open={showErrorMessage} message={errorMessage} />        
          <div className={classes.child}>
            <CircularProgress size={100} thickness={4} />
            <Typography variant="body1" gutterBottom className={classes.text}>
              Finishing up registration
            </Typography>
          </div>
        </div>
      </Content>
    );
  }
}

export default withStyles(styles)(SignupVerification);
