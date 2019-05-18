import React, { Component } from 'react';
import { Col } from 'react-flexbox-grid/lib';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Content from '../../common/components/Content';
import { LinearProgress, CardHeader } from '@material-ui/core';
import LazyLoad from 'react-lazyload';

const styles = {
  wrapper: {
    paddingTop: 8,
    paddingBottom: 2,
  },
  card: {
    marginBottom: 8,
  },
  media: {
    height: 180,
  },
};

class EventList extends Component {
  componentDidMount() {
    this.props.loadEvents();
  }
  formatDatetime(date) {
    return date && `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
  }
  render() {
    const { classes, events, loading } = this.props;
    return (
      <div>
        {loading &&
          <LinearProgress />
        }
        <Content className={classes.wrapper}>
          {events && events.length ?
            events.map(event =>
              <Col md={6} mdOffset={3}>
                <Card className={classes.card}>
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
