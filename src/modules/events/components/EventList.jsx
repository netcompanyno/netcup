import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid/lib';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Content from '../../common/components/Content';

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
  render() {
    const { classes, events, loading } = this.props;
    return (
      <Content className={classes.wrapper}>
        {loading &&
          <Row center="xs">
            <CircularProgress size={60} />
          </Row>
        }
        {events && events.length ?
          events.map(event =>
            <Col md={12}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={event.image}
                  title={event.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {event.title}
            </Typography>
                  <Typography component="p">{event.description}
            </Typography>
                </CardContent>
              </Card>
            </Col>
          ) : null
        }
      </Content>
    );
  }
}

export default withStyles(styles)(EventList);
