import React, { Component } from 'react';
import { Col } from 'react-flexbox-grid/lib';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { CardHeader, CardActions, Button, CircularProgress, Collapse, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LazyLoad from 'react-lazyload';
import { DateTime } from 'luxon';
import { eventIsBeforeToday } from '../utils/dateutils';

const styles = theme => ({
  wrapper: {
    paddingTop: 8,
    paddingBottom: 2,
  },
  media: {
    height: 180,
  },
  rightIcon: {
    marginLeft: 3,
  },
  circularProgress: {
    marginLeft: 6,
  },
  disabledCard: {
    marginBottom: 8,
    opacity: 0.5,
  },
  activeCard: {
    marginBottom: 8,
    opacity: 1.0,
  },
  expandMore: {
    marginLeft: 'auto',
  },
  cardExpanded: {
    transform: 'rotate(180deg)',
  },
  cardCollapsed: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
});

class EventListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }
  formatDatetime(datetime) {
    return datetime && DateTime.fromMillis(datetime).toFormat("dd/MM/yyyy - HH:mm");
  }
  render() {
    const { classes, loading, signedUp, title, datetime, image, description, signup, signoff } = this.props;
    return (
      <Col md={6} mdOffset={3}>
        <Card className={eventIsBeforeToday(datetime) ? classes.disabledCard : classes.activeCard}>
          <CardHeader
            title={title}
            subheader={this.formatDatetime(datetime)}
          />
          <LazyLoad height={300}>
            <CardMedia
              className={classes.media}
              image={image}
            />
          </LazyLoad>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </CardContent>
          </Collapse>
          <CardActions>
            {loading ?
              <Button disabled className={classes.button}>
                <CircularProgress className={classes.circularProgress} size={35} thickness={5} />
              </Button>
              : signedUp ?
                <Button color="primary"
                  aria-label="signoff"
                  disabled={eventIsBeforeToday(datetime)}
                  className={classes.button}
                  onClick={signoff}>
                  {eventIsBeforeToday(datetime) ? 'You went' : 'Going'}
                  <CheckIcon className={classes.rightIcon} />
                </Button>
              : eventIsBeforeToday(datetime) ?
                undefined
              :
              <Button color="primary"
                aria-label="signup"
                disabled={eventIsBeforeToday(datetime)}                        
                className={classes.button}
                onClick={signup}>
                Register
                <AddIcon className={classes.rightIcon} />
              </Button>
            }
            <IconButton
              className={`${classes.expandMore} ${this.state.expanded ? classes.cardExpanded : classes.cardCollapsed}`}
              onClick={() => this.setState({ expanded: !this.state.expanded })}>
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Col>
    );
  }
}

export default withStyles(styles)(EventListItem);
