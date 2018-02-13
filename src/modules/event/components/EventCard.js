import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const EventCard = ({ organizer, event }) => (
    <Card>
        <CardHeader title={organizer.name} subtitle={organizer.email} avatar={organizer.avatar} />
        <CardMedia overlay={<CardTitle title={event.title} subtitle={event.subtitle} />}>
            <img src={event.picture} alt="The event" />
        </CardMedia>
        <CardText>
        </CardText>
        <CardActions>
            <FlatButton label="Deltakere" />
            <FlatButton label="Resultater" />
        </CardActions>
    </Card>
)

EventCard.propTypes = {
    organizer: PropTypes.shape({
        name: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired
    }).isRequired,
    event: PropTypes.shape({
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
        description: PropTypes.string
    }).isRequired
};

export default EventCard;
