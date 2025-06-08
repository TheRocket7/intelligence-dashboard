import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import type { IDData } from "../types/idData";
import { Box, IconButton, styled } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { textFromHTML } from "../common/commonFunctions";

const IDTableContainer = styled(Box)(() => ({
  padding: "0.5rem",
}));

const IDHeaderRow = styled(TableRow)(({ theme }) => ({
  background: theme.palette.grey[300],
}));

function IDTable({
  data,
  openDialog,
}: {
  data: Array<IDData>;
  openDialog: (row: IDData) => void;
}) {
  return (
    <IDTableContainer>
      <TableContainer component={Paper}>
        <Table aria-label="report table">
          <TableHead>
            <IDHeaderRow>
              <TableCell>Name</TableCell>
              <TableCell>Content preview</TableCell>
              <TableCell></TableCell>
            </IDHeaderRow>
          </TableHead>
          <TableBody>
            {data.map((row: IDData) => (
              <TableRow key={row.title}>
                <TableCell component="td" scope="row">
                  {row.title}
                </TableCell>
                <TableCell>{textFromHTML(row.text)}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    size="small"
                    onClick={() => openDialog(row)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </IDTableContainer>
  );
}

export default IDTable;
