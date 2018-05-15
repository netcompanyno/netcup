import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { Col, Row } from 'react-flexbox-grid/lib';
import CircularProgress from 'material-ui/CircularProgress';
import ParticipantsListItem from './ParticipantListItem';

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
      <section>
        <Col md={8} mdOffset={2}>
          <header className="participant-list__subheader-wrapper">
            <div className="participant-list__subheader">Resultatliste</div>
          </header>
        </Col>
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
                  <Divider />
                  <ParticipantsListItem name={participant.name}
                    shortname={participant.shortname}
                    avatar={participant.image}
                    points={participant.points} />
                </article>
              ) : undefined
            }
          </List>
        </Col>
      </section>
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
