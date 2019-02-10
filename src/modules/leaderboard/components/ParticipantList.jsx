import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import { Col, Row } from 'react-flexbox-grid/lib';
import CircularProgress from '@material-ui/core/CircularProgress';
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
            <Row center="xs">
              <Row middle="xs">
                <CircularProgress size={60} />
              </Row>
            </Row>
          }
          <Col md={8} mdOffset={2}>
            <List>
              {participants && participants.length ?
                participants.map((participant, i) =>
                  <article key={i}>
                    <ParticipantsListItem
                      name={participant.name}
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
