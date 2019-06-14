import React, { Component } from 'react';
import { Col } from 'react-flexbox-grid/lib';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { LinearProgress, CardHeader, CardActions, Button, CircularProgress, Collapse, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LazyLoad from 'react-lazyload';
import marked from 'marked';
import { DateTime } from 'luxon';
import Content from '../../common/containers/Content';
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

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }
  componentDidMount() {
    this.props.loadEvents();
  }
  formatDatetime(datetime) {
    return datetime && DateTime.fromMillis(datetime).toFormat("dd/MM/yyyy - HH:mm");
  }
  render() {
    const { classes, events, loading, signup, signoff, id } = this.props;
    return (
      loading ?
      <LinearProgress />
      :
      <Content>
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
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <div dangerouslySetInnerHTML={{ __html: marked(event.description) }} />
                  </CardContent>
                </Collapse>
                <CardActions>
                  {event.loading ?
                    <Button disabled className={classes.button}>
                      <CircularProgress className={classes.circularProgress} size={35} thickness={5} />
                    </Button>
                    : event.participants && event.participants[id] ?
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
                  <IconButton
                    className={`${classes.expandMore} ${this.state.expanded ? classes.cardExpanded : classes.cardCollapsed}`}
                    onClick={() => this.setState({ expanded: !this.state.expanded })}>
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Col>
          ) : null
        }
      </Content>
    );
  }
}

export default withStyles(styles)(EventList);
