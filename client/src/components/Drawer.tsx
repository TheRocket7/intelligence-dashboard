import { useEffect, useRef, useState } from "react";
import type { IDData } from "../types/idData";
import { Box, Button, Divider, Drawer, styled, TextField } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import type { Editor as TinyMCEEditor } from "tinymce";
import { textFromHTML } from "../common/commonFunctions";
import { demoText1 } from "../demo/demoResponses";
import {
  addReport,
  updateReport,
  addLog,
  deleteReport,
  askAI,
} from "../services/apiService";
import type { IDLog } from "../types/idLog";
import type { IDUser } from "../types/idUser";
import SumarizeContentDialog from "./dialog/SumarizeContentDialog";
import DraftContentDialog from "./dialog/DraftContentDialog";
import Loader from "./Loader";
import { toast } from "react-toastify";

const IDContainer = styled(Box)(({ theme }) => ({
  padding: "1rem",
  [theme.breakpoints.up("md")]: {
    width: "45rem",
  },
  [theme.breakpoints.down("md")]: {
    width: "100vw",
  },
}));

const IDTitle = styled(Divider)(({ theme }) => ({
  fontSize: theme.typography.h1.fontSize,
  fontWeight: theme.typography.h1.fontWeight,
  paddingBottom: "1rem",
}));

const IDAiActions = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  padding: "1rem 0",
  gap: "0.5rem",
  [theme.breakpoints.up("sm")]: {
    justifyContent: "end",
  },
}));

const IDButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const IDActions = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: "1rem 0",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "0.5rem",
  },
}));

const IDFormActions = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "start",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    gap: "0.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    gap: "0.5rem",
  },
}));

const instructionSummary =
  "Summarize the following text into key bullet points.";

function IDDrawer({
  open,
  data,
  onClose,
  onSave,
}: {
  open: boolean;
  data?: IDData;
  onClose: () => void;
  onSave: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [formData, setFormData] = useState<IDData>({
    title: "",
    text: "",
  });
  const [errors, setErrors] = useState<Partial<IDData>>({});
  const [openAiResponse, setOpenAiResponse] = useState<string>("");
  const [sumarizeContentDialogOpen, setSumarizeContentDialogOpen] =
    useState<boolean>(false);

  const [draftContentDialogOpen, setDraftContentDialogOpen] =
    useState<boolean>(false);
  const [user, setUser] = useState<IDUser>({} as IDUser);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as string]: value }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<IDData> = {};
    if (!formData.title) newErrors.title = "Title is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    if (validate()) {
      const userJSON = localStorage.getItem("user");
      const user: IDUser = JSON.parse(userJSON ?? "");
      const tempData = { ...formData };
      tempData.text = editorRef.current?.getContent?.() ?? "";

      try {
        if (data?.id) {
          await updateReport(tempData);

          const logData: IDLog = {
            action: `Report ${tempData.title} with id ${tempData.id} edited in base.`,
            username: user.username,
          };
          await addLog(logData);
        } else {
          await addReport(tempData);

          const logData: IDLog = {
            action: `Report ${tempData.title} added in base.`,
            username: user.username,
          };
          await addLog(logData);
        }

        setFormData({
          title: "",
          text: "",
        });

        setLoading(false);
        toast.success("Successfully saved report!");
        onSave();
      } catch (error) {
        console.error(error);
        toast.success("Saved report error!");
        setLoading(false);
      }
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const userJSON = localStorage.getItem("user");
      const user: IDUser = JSON.parse(userJSON ?? "");
      if (data?.id) await deleteReport(data?.id);

      const logData: IDLog = {
        action: `Report with ${data?.id} id added in base.`,
        username: user.username,
      };
      await addLog(logData);

      setLoading(false);
      toast.success("Successfully deleted report!");
      onSave();
    } catch (error) {
      console.error(error);
      toast.success("Deleting report error!");
      setLoading(false);
    }
  };

  const askOpenAI = async (instruction: string, prompt: string) => {
    setLoading(true);
    try {
      const userJSON = localStorage.getItem("user");
      const user: IDUser = JSON.parse(userJSON ?? "");
      const data = await askAI(instruction, prompt);
      setOpenAiResponse(data.result);
      setLoading(false);

      const logData: IDLog = {
        action: `Called summrize content.`,
        username: user.username,
      };
      await addLog(logData);

      setSumarizeContentDialogOpen(true);
    } catch (error) {
      console.log(error);
      setOpenAiResponse(demoText1);
      setLoading(false);
      setSumarizeContentDialogOpen(true);
    }
  };

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    const tempUser = JSON.parse(userJson ?? "");
    setUser(tempUser);
    if (data) {
      setFormData(data);
    }
  }, [data]);

  return (
    <Drawer anchor="right" open={open}>
      <IDContainer>
        <IDTitle textAlign="center">Report</IDTitle>
        {user.role === "Admin" && (
          <IDAiActions>
            <IDButton
              variant="outlined"
              onClick={() => setDraftContentDialogOpen(true)}
            >
              Draft
            </IDButton>
            {formData.text && formData.text !== "" && (
              <IDButton
                variant="outlined"
                onClick={() =>
                  askOpenAI(instructionSummary, textFromHTML(formData.text))
                }
              >
                Summarize Content
              </IDButton>
            )}
          </IDAiActions>
        )}
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          onSubmit={(e: React.FormEvent) => handleSubmit(e)}
        >
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            fullWidth
            required
            disabled={user.role !== "Admin"}
          />
          <Editor
            disabled={user.role !== "Admin"}
            apiKey={import.meta.env.VITE_EDITOR_API_KEY}
            onInit={(_evt, editor) => (editorRef.current = editor)}
            initialValue={formData.text}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
          <IDActions>
            {user.role === "Admin" ? (
              <IDFormActions>
                <IDButton variant="contained" type="submit">
                  Save
                </IDButton>
                {data?.id && (
                  <IDButton variant="contained" onClick={() => handleDelete()}>
                    Delete
                  </IDButton>
                )}
              </IDFormActions>
            ) : (
              <div></div>
            )}
            <Button
              variant="outlined"
              onClick={() => {
                onClose();
                setFormData({
                  title: "",
                  text: "",
                });
              }}
            >
              Close
            </Button>
          </IDActions>
        </Box>
      </IDContainer>
      <SumarizeContentDialog
        data={openAiResponse}
        open={sumarizeContentDialogOpen}
        onCloseDialog={() => setSumarizeContentDialogOpen(false)}
      />
      <DraftContentDialog
        open={draftContentDialogOpen}
        onCloseDialog={() => setDraftContentDialogOpen(false)}
      />
      <Loader loading={loading} />
    </Drawer>
  );
}

export default IDDrawer;
