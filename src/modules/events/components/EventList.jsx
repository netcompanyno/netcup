import React, { Component } from 'react';
import { Col } from 'react-flexbox-grid/lib';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
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
  render() {
    const { classes, events } = this.props;
    return (
      <Content className={classes.wrapper}>
        {events && events.length &&
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
                    Lizard
            </Typography>
                  <Typography component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
            </Typography>
                </CardContent>
              </Card>
            </Col>
          )
        }
      </Content>
    );
  }
}

export default withStyles(styles)(EventList);
