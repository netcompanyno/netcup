import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Row, Col } from 'react-flexbox-grid';
import RichTextEditor from 'react-rte';
import { TextField, Button, CircularProgress, FormLabel, FormGroup, Snackbar } from '@material-ui/core';
import { DateTime } from 'luxon';
import Content from '../../common/containers/Content';

const styles = {
  loading: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',
  },
  button: {
    marginTop: '20px',
    marginRight: '20px',
  },
  field: {
    marginTop: '30px',
  },
  descriptionField: {
    marginTop: '15px',
  },
  form: {
    paddingTop: '20px',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
};

const FORMAT = 'html';
const extractContent = value => value && value.toString(FORMAT);

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      imageUrl: '',
      value: RichTextEditor.createEmptyValue(),
      datetime: '',
    };
  }

  loadEvent({ title, imageUrl, content, datetime }) {
    this.setState({
      title,
      imageUrl,
      value: content ? RichTextEditor.createValueFromString(content, FORMAT) : RichTextEditor.createEmptyValue(),
      datetime: datetime ? DateTime.fromMillis(datetime).toFormat("yyyy-MM-dd'T'HH:mm") : '',
    });
  }

  /**
   * Ensures that when going directly to link for editing and event and we _dont_
   * have events preloaded, it will fetch all events and load correct one into state.
   */
  componentDidUpdate(prevProps) {
    const { title, content, imageUrl, datetime, editing } = this.props;
    const updateState = editing &&
      prevProps.title !== title ||
      prevProps.content !== content ||
      prevProps.imageUrl !== imageUrl ||
      prevProps.datetime !== datetime;
      
    if (updateState) {
      this.loadEvent(this.props);
    }
  }
  
  /**
   * Ensures that when following edit icon from event-list that event is loaded 
   * correctly into state for editing.
   */
  componentDidMount() {
    if (this.props.editing) {
      this.props.load(this.props.events);
    }

    this.loadEvent(this.props);
  }

  render() {
    const { classes, loading, save, showSnackbar, dismissSnackbar, snackbarMessage } = this.props;
    const { title, imageUrl, value, datetime } = this.state;
    return (
      <Content>
        {showSnackbar &&
          <Snackbar open={showSnackbar} message={snackbarMessage} autoHideDuration={2000} onClose={dismissSnackbar} />
        }
        <form className={classes.form} key={this.props.title}>
          <Row className={classes.row}>
            <Col xs sm={6} smOffset={3} lg={8} lgOffset={2}>
              <FormGroup>
                <FormLabel required>Title</FormLabel>
                <TextField
                  type="text"
                  value={this.state.title}
                  onChange={e => this.setState({ title: e.target.value })}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className={classes.row}>
            <Col xs sm={6} smOffset={3} lg={8} lgOffset={2}>
              <FormGroup className={classes.field}>
                <FormLabel>ImageUrl</FormLabel>
                <TextField
                  type="url"
                  value={this.state.imageUrl}
                  onChange={e => this.setState({ imageUrl: e.target.value })}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className={classes.row}>
            <Col xs sm={6} smOffset={3} lg={8} lgOffset={2}>
              <FormGroup className={classes.field}>
                <FormLabel required>Description</FormLabel>
                <RichTextEditor 
                  className={classes.descriptionField}
                  value={this.state.value}
                  onChange={value => this.setState({ value })}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className={classes.row}>
            <Col xs sm={6} smOffset={3} lg={2} lgOffset={2}>
              <FormGroup className={classes.field}>
                <FormLabel required>Date and time</FormLabel>
                <TextField
                  type="datetime-local"
                  value={this.state.datetime}
                  onChange={e => this.setState({ datetime: e.target.value })}
                  className={classes.textField}
                />
              </FormGroup>
            </Col>
          </Row>
          {loading ?
          <div className={classes.loading}>
            <CircularProgress size={75} thickness={5} />
          </div>
          :
          <Row className={classes.row}>
            <Col xs sm={6} smOffset={3} lg={2} lgOffset={8}>
              <Button
                className={classes.button}
                onClick={() => {
                  save({
                    title,
                    imageUrl,
                    content: extractContent(value),
                    datetime,
                  });
                  this.setState({ title: '', imageUrl: '', value: RichTextEditor.createEmptyValue(), datetime: '' });
                }}
                disabled={!(title && value && datetime)}
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

export default withStyles(styles)(CreateEvent);
