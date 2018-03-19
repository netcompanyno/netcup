import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

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
      <div className="participant-list-item__points">
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
