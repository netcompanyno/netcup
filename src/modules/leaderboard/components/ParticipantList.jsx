import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import { Col } from 'react-flexbox-grid/lib';
import { LinearProgress } from '@material-ui/core';
import ParticipantsListItem from './ParticipantListItem';
import Content from '../../common/components/Content';

class ParticipantsList extends Component {
  componentDidMount() {
    this.props.loadParticipants();
  }

  render() {
    const {
      participants,
      loading,
    } = this.props;

    return (
      <Content>
        <section>
          {loading &&
            <LinearProgress />
          }
          <Col md={6} mdOffset={3}>
            <List>
              {participants && participants.length ?
                participants.map((participant, i) =>
                  <article key={i}>
                    <ParticipantsListItem
                      name={participant.fullname}
                      avatar={participant.image}
                      points={participant.points} />
                  </article>
                ) : undefined
              }
            </List>
          </Col>
        </section>
      </Content>
    );
  }
}

ParticipantsList.propTypes = {
  header: PropTypes.string,
  participants: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
};

ParticipantsList.defaultProps = {
  header: '',
  participants: [],
  loading: false,
};

export default ParticipantsList;
