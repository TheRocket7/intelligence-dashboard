import React, { type JSXElementConstructor } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<
      unknown,
      string | JSXElementConstructor<unknown>
    >;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SumarizeContentDialog({
  data,
  open,
  onCloseDialog,
}: {
  data: string;
  open: boolean;
  onCloseDialog: () => void;
}) {
  const handleClose = () => {
    onCloseDialog();
  };
  return (
    <>
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="sumarize-dialog-slide-description"
      >
        <DialogTitle>{"Sumarize Content"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="sumarize-dialog-slide-description">
            {data}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SumarizeContentDialog;
