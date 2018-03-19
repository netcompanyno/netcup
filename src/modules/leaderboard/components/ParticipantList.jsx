import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { Col } from 'react-flexbox-grid/lib';
import ParticipantsListItem from './ParticipantListItem';

const ParticipantsList = ({ header, participants }) =>
  <section>
    <Col md={8} mdOffset={2}>
      <header className="participant-list__subheader-wrapper">
        <div className="participant-list__subheader">{header}</div>
      </header>
    </Col>
    <Col md={8} mdOffset={2}>
      <List className="participant-list__list">
        {participants && participants.length ?
          participants.map((participant, i) =>
            <article key={i}>
              <Divider />
              <ParticipantsListItem name={participant.name}
                shortname={participant.shortname}
                avatar={participant.imageUrl}
                points={participant.points} />
            </article>
          ) : undefined
        }
      </List>
    </Col>
  </section>;

ParticipantsList.propTypes = {
  header: PropTypes.string,
  participants: PropTypes.arrayOf(PropTypes.object),
};

ParticipantsList.defaultProps = {
  header: '',  
  participants: [],
};

export default ParticipantsList;
