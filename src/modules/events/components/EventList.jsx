import React, { Component } from 'react';
import { LinearProgress } from '@material-ui/core';
import { DateTime } from 'luxon';
import Content from '../../common/containers/Content';
import EventListItem from './EventListItem';

class EventList extends Component {
  componentDidMount() {
    this.props.loadEvents();
  }
  render() {
    const { userId, admin, editEventClick, events, loading, signup, signoff, formatDescription } = this.props;
    return (
      loading ?
      <LinearProgress />
      :
      <Content>
        {events && events.length ?
          events.map(event => 
            <EventListItem 
              key={event.id}
              admin={admin}
              editEventClick={() => editEventClick(event.id)}
              loading={event.loading}
              signedUp={event.participants && event.participants[userId]}
              title={event.title}
              description={event.description}
              image={event.image}
              datetime={event.datetime}
              signup={() => signup(event)} 
              signoff={() => signoff(event)}
              formatDescription={content => formatDescription(content)}
            />
          ) 
          : 
          null
        }
      </Content>
    );
  }
}

export default EventList;
