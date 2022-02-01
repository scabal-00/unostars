import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const ConfirmationAlert = (props) => {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Disagree</Button>
        <Button onClick={props.onAccept}>Agree</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationAlert;
