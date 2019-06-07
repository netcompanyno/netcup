import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Select from 'react-select';
import { TextField, Button, CircularProgress, FormLabel, FormGroup, Snackbar } from '@material-ui/core';
import { Row, Col } from 'react-flexbox-grid';
import Content from '../../common/containers/Content';

const styles = {
  form: {
    marginLeft: '20px',
    marginRight: '20px',
  },
  formGroup: {
    marginTop: '20px',
  },
  formInput: {
    marginTop: '10px',
  },
  button: {
    marginTop: '30px',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
  },
};

class AssignPoints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedEvent: '',
      selectedParticipant: '',
      points: '',
    };
  }

  componentDidMount() {
    this.props.load(this.props.eventsPresent, this.props.usersPresent);
  }

  selectEvent(event, e) {
    if (e.action === 'clear') {
      return this.setState({ selectedEvent: '', selectedParticipant: '', points: '' });
    }
    return this.setState({ selectedEvent: event, selectedParticipant: '', points: '' });
  }

  selectParticipant(selectedEvent, selectedParticipant, e) {
    if (!selectedEvent) {
      return;
    }
    
    if (e.action === 'clear') {
      return this.setState({ selectedParticipant: '' });
    }

    const eventId = selectedEvent.value;
    const participantId = selectedParticipant.value;

    const event = this.props.events.find(event => event.id === eventId);
    const participant = event && event.participants ? 
      event.participants.find(participant => participant.id === participantId) : {};

    this.setState({ selectedParticipant: { value: participant.id, label: participant.fullname } });
  }

  findParticipantsForEvents(selectedEvent) {
    if (!selectedEvent) {
      return [];
    }
    const event = this.props.events.find(event => event.id === selectedEvent.value);
    return event ? event.participants : [];
  }

  render() {
    const { classes, loading, assignPoints, events, showSnackbar, dismissSnackbar } = this.props;
    return (
      <Content>
        <Snackbar open={showSnackbar} message="Successfully updated points" autoHideDuration={2000} onClose={dismissSnackbar} />
        <form className={classes.form}>
          <Row>
            <Col xs sm={6} smOffset={3} lg={4} lgOffset={4}>
              <FormGroup className={classes.formGroup}>
                <FormLabel required>Event</FormLabel>
                <Select
                  value={this.state.selectedEvent}
                  type="search"
                  placeholder="Search for event title"
                  isClearable
                  isSearchable
                  loading={loading}
                  disabled={loading}
                  options={events.map(event => ({
                    value: event.id,
                    label: event.title,
                  }))}
                  onChange={(event, e) => this.selectEvent(event, e)}
                  className={classes.formInput}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs sm={6} smOffset={3} lg={4} lgOffset={4}>
              <FormGroup className={classes.formGroup}>
                <FormLabel required>Participant</FormLabel>
                <Select
                  value={this.state.selectedParticipant}
                  type="search"
                  placeholder="Search for participant id"
                  isClearable
                  isSearchable
                  loading={loading}
                  disabled={loading}
                  options={this.findParticipantsForEvents(this.state.selectedEvent).map(participant => ({
                    value: participant.id,
                    label: participant.fullname,
                  }))}
                  onChange={(participant, e) => this.selectParticipant(this.state.selectedEvent, participant, e)}
                  className={classes.formInput}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs sm={6} smOffset={3} lg={4} lgOffset={4}>
              <FormGroup className={classes.formGroup}>
                <FormLabel required>Points</FormLabel>
                <TextField
                  type="number"
                  placeholder="Enter points to give participant"
                  fullWidth
                  required
                  value={this.state.points}
                  onChange={e => this.setState({ points: e.target.value })}
                  className={classes.formInput}
                />
              </FormGroup>
            </Col>
          </Row>
          {loading ?
            <div className={classes.loading}>
              <CircularProgress size={75} thickness={5} />
            </div>
            :
            <Row>
              <Col xs sm={6} smOffset={3} lg={1} lgOffset={7}>
                <Button
                  className={classes.button}
                  onClick={() => {
                    const { selectedParticipant, selectedEvent, points } = this.state;
                    assignPoints(selectedEvent.value, selectedParticipant.value, points);
                    this.setState({ selectedEvent: '', selectedParticipant: '', points: '' });
                  }}
                  disabled={
                    loading || 
                    (!this.state.selectedEvent || !this.state.selectedEvent.value) || 
                    (!this.state.selectedParticipant || !this.state.selectedParticipant.value) ||
                    !this.state.points
                  }
                  fullWidth
                  size="large"
                  variant="contained"
                  color="primary">
                  Save
                </Button>
              </Col>
            </Row>
          }
        </form>
      </Content>
    );
  }
}

export default withStyles(styles)(AssignPoints);
