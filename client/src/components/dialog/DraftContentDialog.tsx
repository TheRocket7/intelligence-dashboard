import React, { useState, type JSXElementConstructor } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  styled,
  TextField,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import { askAI } from "../../services/apiService";
import { demoText2 } from "../../demo/demoResponses";
import Loader from "../Loader";

interface IDDraft {
  question: string;
}

const IDContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  paddingTop: "0.5rem",
}));

const IDActions = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  paddingTop: "1rem",
  justifyContent: "space-between",
}));

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

const instructionDraft =
  "You are a writing reports assistant. Can you write this to sounds better?";

function DraftContentDialog({
  open,
  onCloseDialog,
}: {
  open: boolean;
  onCloseDialog: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<IDDraft>({
    question: "",
  });
  const [errors, setErrors] = useState<Partial<IDDraft>>({});
  const [AIResponse, setAIResponse] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as string]: value }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<IDDraft> = {};
    if (!formData.question) newErrors.question = "Draft is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (validate()) {
      try {
        const response = await askAI(instructionDraft, formData.question);
        setAIResponse(response);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setAIResponse(demoText2);
        setLoading(false);
      }
    }
  };

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
        aria-describedby="draft-dialog-slide-description"
      >
        <DialogTitle>{"Draft Content"}</DialogTitle>
        <DialogContent>
          <IDContainer>
            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
              onSubmit={(e: React.FormEvent) => handleSubmit(e)}
            >
              <TextField
                label="Write your draft"
                name="question"
                multiline
                rows={5}
                value={formData.question}
                onChange={handleChange}
                error={!!errors.question}
                helperText={errors.question}
                fullWidth
                required
              />
              <TextField
                label="AI Response"
                name="response"
                multiline
                rows={5}
                value={AIResponse}
                fullWidth
                disabled
              />
              <IDActions>
                <Button variant="contained" type="submit">
                  Ask
                </Button>
                <Button variant="outlined" onClick={handleClose}>
                  Close
                </Button>
              </IDActions>
            </Box>
          </IDContainer>
        </DialogContent>
      </Dialog>
      <Loader loading={loading} />
    </>
  );
}

export default DraftContentDialog;
