import React from 'react';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import { Row, Col } from 'react-flexbox-grid';
import { TextField, Button, CircularProgress, FormLabel, FormGroup, Snackbar } from '@material-ui/core';
import Content from '../../common/containers/Content';

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
  }
  onChange = editorState => {
    console.log(convertToRaw(editorState.getCurrentContent()));
    this.setState({ editorState });
  }
  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);

    if (newState) {
      return true;
    }
    return false;
  }
  render() {
    return (
      <Content>
        <Row>
          <Col xs sm={6} smOffset={3} lg={8} lgOffset={2}>
            <div style={{ backgroundColor: 'red' }}>
              <Editor editorState={this.state.editorState} onChange={this.onChange} placeholder="Title" />
            </div>
          </Col>
        </Row>
      </Content>
    );
  }
}

export default CreateEvent;
