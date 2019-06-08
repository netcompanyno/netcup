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
  row: {
    marginRight: '0 !important',
    marginLeft: '0 !important',
  },
};

const FORMAT = 'markdown';
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
  componentDidMount() {
    const format = datetime => {
      if (!datetime) {
        return '';
      }
      return DateTime.fromMillis(datetime).toFormat("yyyy-MM-dd'T'HH:mm");
    }

    this.setState({
      title: this.props.title,
      imageUrl: this.props.imageUrl,
      value: RichTextEditor.createValueFromString(this.props.content, FORMAT),
      datetime: format(this.props.datetime),
    });
  }
  render() {
    const { classes, loading, save, showSnackbar, dismissSnackbar } = this.props;
    const { title, imageUrl, value, datetime } = this.state;
    return (
      <Content>
        <Snackbar open={showSnackbar} message="Successfully created event" autoHideDuration={2000} onClose={dismissSnackbar} />
        <form>
          <Row className={classes.row}>
            <Col xs sm={6} smOffset={3} lg={8} lgOffset={2}>
              <FormGroup className={classes.field}>
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
