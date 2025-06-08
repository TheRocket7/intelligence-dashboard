import { textFromHTML } from "../common/commonFunctions";
import type { IDData } from "../types/idData";
import { Box, Grid, styled, Typography } from "@mui/material";

const IDCardGridContainer = styled(Grid)(() => ({
  paddingTop: "1rem",
}));

const IDCardContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    padding: "0.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0.5rem 0",
  },
}));

const IDCard = styled(Box)(() => ({
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "0.5rem",
  padding: "0.5rem",
  "&:hover": {
    boxShadow:
      "0 10px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    background: "white",
    cursor: "pointer",
  },
}));

const IDTruncatedTypography = styled(Typography)(() => ({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "block",
  maxWidth: "100%",
}));

function IDCardGrid({
  data,
  openDialog,
}: {
  data: Array<IDData>;
  openDialog: (row: IDData) => void;
}) {
  return (
    <IDCardGridContainer container>
      {data.map((report, index) => {
        return (
          <IDCardContainer
            key={index}
            size={{ xs: 12, sm: 12, md: 4, lg: 3, xl: 3 }}
            onClick={() => {
              openDialog(report);
            }}
          >
            <IDCard>
              <Typography variant="h4">{report.title}</Typography>
              <IDTruncatedTypography>
                {textFromHTML(report.text)}
              </IDTruncatedTypography>
            </IDCard>
          </IDCardContainer>
        );
      })}
    </IDCardGridContainer>
  );
}

export default IDCardGrid;
