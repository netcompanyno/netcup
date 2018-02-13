import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ParticipantsListItem from './ParticipantListItem';
import { PRIMARY_FONT_SIZE } from '../../../styles/font';
import { BASE } from '../../../styles/base';

const subHeaderWrapper = {
  display: 'flex',
  justifyContent: 'left',
  alignItems: 'center',
  paddingLeft: BASE,
};

const subheader = {
  marginTop: BASE,
  marginBottom: BASE,
  fontSize: PRIMARY_FONT_SIZE,
};

const list = {
  paddingTop: '0',
};

const ParticipantsList = ({ header, participants }) =>
  <div>
    <div style={subHeaderWrapper}>
      <div style={subheader}>{header}</div>
    </div>
    <List style={list}>
      {participants && participants.length ?
        participants.map((participant, i) =>
          <div key={i}>
            <Divider />
            <ParticipantsListItem name={participant.name}
              shortname={participant.shortname}
              avatar={participant.imageUrl}
              points={participant.points} />
          </div>
        ) : undefined
      }
    </List>
  </div>;

ParticipantsList.propTypes = {
  header: PropTypes.string,
  participants: PropTypes.arrayOf(PropTypes.object),
};

ParticipantsList.defaultProps = {
  header: '',  
  participants: [],
};

export default ParticipantsList;
