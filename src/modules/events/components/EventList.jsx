import React, { Component } from 'react';
import { Col } from 'react-flexbox-grid/lib';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { LinearProgress, CardHeader, CardActions, Button, CircularProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import LazyLoad from 'react-lazyload';
import Content from '../../common/components/Content';
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
});

class EventList extends Component {
  componentDidMount() {
    this.props.loadEvents();
  }
  formatDatetime(date) {
    return date && `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
  }
  render() {
    const { classes, events, loading, signup, signoff, id } = this.props;
    return (
      <div>
        {loading &&
          <LinearProgress />
        }
        <Content className={classes.wrapper}>
          {events && events.length ?
            events.map(event =>
              <Col md={6} mdOffset={3} key={event.id}>
                <Card className={eventIsBeforeToday(event.datetime) ? classes.disabledCard : classes.activeCard}>
                  <CardHeader
                    title={event.title}
                    subheader={this.formatDatetime(event.datetime)}
                  />
                  <LazyLoad height={300}>
                    <CardMedia
                      className={classes.media}
                      image={event.image}
                    />
                  </LazyLoad>
                  <CardContent>
                    <Typography component="p">{event.description}</Typography>
                  </CardContent>
                  <CardActions>
                    {event.loading ?
                      <Button disabled className={classes.button}>
                        <CircularProgress className={classes.circularProgress} size={35} thickness={5} />
                      </Button>
                      : event.participants[id] ?
                        <Button color="primary"
                          aria-label="signoff"
                          disabled={eventIsBeforeToday(event.datetime)}
                          className={classes.button}
                          onClick={() => signoff(event)}>
                          {eventIsBeforeToday(event.datetime) ? 'You went' : 'Going'}
                          <CheckIcon className={classes.rightIcon} />
                        </Button>
                      : eventIsBeforeToday(event.datetime) ?
                        undefined
                      :
                      <Button color="primary"
                        aria-label="signup"
                        disabled={eventIsBeforeToday(event.datetime)}                        
                        className={classes.button}
                        onClick={() => signup(event)}>
                        Register
                        <AddIcon className={classes.rightIcon} />
                      </Button>
                    }
                  </CardActions>
                </Card>
              </Col>
            ) : null
          }
        </Content>
      </div>
    );
  }
}

export default withStyles(styles)(EventList);
