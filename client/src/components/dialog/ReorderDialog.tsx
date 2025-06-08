import React, { useEffect, useState, type JSXElementConstructor } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { IDData } from "../../types/idData";
import { useData } from "../../context/reportsDataContext";
import { addLog, addReportBulk } from "../../services/apiService";
import Loader from "../Loader";
import type { IDLog } from "../../types/idLog";
import type { IDUser } from "../../types/idUser";
import { toast } from "react-toastify";

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

const IDHeaderRow = styled(TableRow)(({ theme }) => ({
  background: theme.palette.grey[300],
}));

function SortableRow(props: { row: IDData }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props.row.id!,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: isDragging ? "#EEE" : undefined,
    cursor: "grab",
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <td>{props.row.title}</td>
    </tr>
  );
}

function ReorderDialog({
  open,
  onCloseDialog,
  onSave,
}: {
  open: boolean;
  onCloseDialog: () => void;
  onSave: () => void;
}) {
  const { data } = useData();
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<IDData[]>([] as IDData[]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setRows((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleClose = () => {
    onCloseDialog();
  };

  useEffect(() => {
    setRows(data.map((item) => ({ ...item })));
  }, [data]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const userJSON = localStorage.getItem("user");
      const user: IDUser = JSON.parse(userJSON ?? "");
      await addReportBulk(rows);

      const logData: IDLog = {
        action: `Data reordered.`,
        username: user.username,
      };
      await addLog(logData);
      setLoading(false);
      toast.success("Successfully reordered data!");
      onSave();
    } catch (error) {
      console.error(error);
      toast.success("Reordering data error!");
      setLoading(false);
    }
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
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={rows.map((r) => r.id!)}
              strategy={verticalListSortingStrategy}
            >
              <Table aria-label="report table">
                <TableHead>
                  <IDHeaderRow>
                    <TableCell>Title</TableCell>
                  </IDHeaderRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <SortableRow key={row.id} row={row} />
                  ))}
                </TableBody>
              </Table>
            </SortableContext>
          </DndContext>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => handleSave()}>
            Save
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Loader loading={loading} />
    </>
  );
}

export default ReorderDialog;
