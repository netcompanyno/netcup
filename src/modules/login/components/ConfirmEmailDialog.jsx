import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmEmailDialog = ({ showPrompt }) => (
  <Dialog open={showPrompt}>
    <DialogTitle>Confirm your account</DialogTitle>
    <DialogContent>
      <DialogContentText>{`Check your email for confirmation link`}</DialogContentText>
    </DialogContent>
  </Dialog>
);

export default ConfirmEmailDialog;
