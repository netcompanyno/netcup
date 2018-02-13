import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { NC_SECONDARY_COLOR } from '../../../styles/base';

const pointStyling = {
  borderRadius: '50%',
  backgroundColor: NC_SECONDARY_COLOR,
  height: '40px',
  width: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#FFFFFF',
};

const ParticipantsListItem = ({
  name,
  shortname,
  avatar,
  points,
}) =>
  <ListItem primaryText={name}
    secondaryText={shortname}
    leftAvatar={<Avatar src={avatar} />}
    rightAvatar={
      <div style={pointStyling}>
        <div>{points}</div>    
      </div>
    }    
  />;

ParticipantsListItem.propTypes = {
  name: PropTypes.string.isRequired,
  shortname: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
};

ParticipantsListItem.defaultProps = {
  name: '',
  shortname: '',
  avatar: '',
  points: NaN,  
};

export default ParticipantsListItem;
