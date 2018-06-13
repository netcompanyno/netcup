import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const ParticipantsListItem = ({ name, avatar, points }) =>
  <ListItem>
    <ListItemIcon>
      <Avatar src={avatar}></Avatar>
    </ListItemIcon>
    <ListItemText primary={name} /> 
    <div className="participant-list-item__points">
      <div>{points}</div>
    </div>
  </ListItem>;

ParticipantsListItem.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
};

ParticipantsListItem.defaultProps = {
  name: '',
  avatar: '',
  points: NaN,  
};

export default ParticipantsListItem;
