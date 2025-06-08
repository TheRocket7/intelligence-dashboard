import {
  Container,
  Box,
  styled,
  Divider,
  Button,
  IconButton,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  MenuItem,
  useMediaQuery,
  Select,
  type SelectChangeEvent,
  Typography,
} from "@mui/material";
import TableRowsIcon from "@mui/icons-material/TableRows";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import CachedIcon from "@mui/icons-material/Cached";
import LogoutIcon from "@mui/icons-material/Logout";
import { useCallback, useEffect, useState } from "react";
import IDTable from "../components/Table";
import type { IDData } from "../types/idData";
import IDCardGrid from "../components/Card";
import IDDrawer from "../components/Drawer";
import { getReports, getReportsWithQuery } from "../services/apiService";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/reportsDataContext";
import ReorderDialog from "../components/dialog/ReorderDialog";
import Loader from "../components/Loader";
import type { IDUser } from "../types/idUser";
import React from "react";

const IDHeader = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "end",
  padding: "0.5rem 1rem",
}));

const IDMainTitle = styled(Typography)(() => ({
  paddingTop: "1rem",
}));

const IDActions = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  padding: "1rem 0.5rem",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    width: "100%",
    gap: "1rem",
  },
}));

const IDActionGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "1rem",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    width: "100%",
  },
}));

const IDActionField = styled(FormControl)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    width: "16.25rem",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const IDButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

function IDDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { data, setData } = useData();
  const isBigScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const [reports, setReports] = useState<Array<IDData>>([]);
  const [isTable, setIsTable] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [openReportDrawer, setOpenReportDrawer] = useState<boolean>(false);
  const [selectedReport, setSelectedReport] = useState<IDData | undefined>();
  const [filterOptions, setFilterOptions] = useState<Array<string>>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [openReorderDialog, setOpenReorderDialog] = useState<boolean>(false);
  const [user, setUser] = useState<IDUser>({} as IDUser);

  const handleFilterChange = (event: SelectChangeEvent) => {
    setSelectedFilter(event.target.value);
    if (event.target.value === "") {
      setReports(data);
    } else {
      const tempReports = reports.filter(
        (item) => item.title === event.target.value
      );
      setReports(tempReports);
    }
  };

  const handleOpenDialog = (row: IDData) => {
    setOpenReportDrawer(true);
    setSelectedReport(row);
  };

  const handleCloseDrawer = () => {
    setOpenReportDrawer(false);
    setSelectedReport(undefined);
  };

  const fetchData = useCallback(
    async (query?: string) => {
      setLoading(true);
      try {
        let response = new Array<IDData>();

        if (query && query.length > 0) {
          response = await getReportsWithQuery(query);
        } else {
          response = await getReports();
          setData(response);
        }

        const tempFilterOptions = [
          ...new Set(response.map((item: IDData) => item.title)),
        ] as Array<string>;
        tempFilterOptions.unshift("");
        setFilterOptions(tempFilterOptions);

        setReports(response);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    },
    [setData]
  );

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    const tempUser = JSON.parse(userJson ?? "");
    setUser(tempUser);
    fetchData();
  }, [fetchData]);

  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <>
      <IDHeader>
        <IconButton aria-label="edit" size="small" onClick={() => logOut()}>
          <LogoutIcon fontSize="large" />
        </IconButton>
      </IDHeader>
      <Divider />
      <Container maxWidth={"xl"}>
        <IDMainTitle textAlign="center" variant="h1">
          Open AI Intelligence Dashboard
        </IDMainTitle>
        <IDActions>
          <IDActionGroup>
            <IDActionField variant="outlined">
              <InputLabel htmlFor="outlined-adornment-search">
                Search
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-search"
                endAdornment={
                  <InputAdornment position="end">
                    {!isSearched ? (
                      <IconButton
                        onClick={() => {
                          setIsSearched(true);
                          fetchData(searchQuery);
                        }}
                        edge="end"
                      >
                        <SearchIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => {
                          setSearchQuery("");
                          setIsSearched(false);
                          fetchData("");
                        }}
                        edge="end"
                      >
                        <CloseIcon />
                      </IconButton>
                    )}
                  </InputAdornment>
                }
                label="Search"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setIsSearched(false);
                  setSearchQuery(e.target.value);
                }}
              />
            </IDActionField>
            <IDActionField>
              <InputLabel id="filter-select-label">Filter</InputLabel>
              <Select
                labelId="filter-select-label"
                id="filter-select"
                value={selectedFilter}
                label="Filter"
                onChange={handleFilterChange}
              >
                {filterOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </IDActionField>
          </IDActionGroup>
          {isBigScreen && (
            <IDActionGroup>
              <Button
                variant="outlined"
                onClick={() => {
                  setIsTable(!isTable);
                }}
              >
                {isTable ? <TableRowsIcon /> : <ViewModuleIcon />}
              </Button>
            </IDActionGroup>
          )}
        </IDActions>
        <Divider />
        {user.role === "Admin" && (
          <IDActions>
            <IDButton
              variant="contained"
              startIcon={<CachedIcon />}
              onClick={() => setOpenReorderDialog(true)}
            >
              Reorder
            </IDButton>
            <IDButton
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                setSelectedReport(undefined);
                setOpenReportDrawer(true);
              }}
            >
              Add Report
            </IDButton>
          </IDActions>
        )}
        {reports.length ? (
          <>
            {isTable && isBigScreen ? (
              <IDTable data={reports} openDialog={handleOpenDialog} />
            ) : (
              <IDCardGrid data={reports} openDialog={handleOpenDialog} />
            )}
          </>
        ) : (
          <Box>
            <Typography textAlign="center" variant="h4">
              You don't have reports. Click on 'Add Report' button to add new
              report.
            </Typography>
          </Box>
        )}
      </Container>
      <IDDrawer
        open={openReportDrawer}
        data={selectedReport}
        onClose={handleCloseDrawer}
        onSave={() => {
          handleCloseDrawer();
          fetchData();
        }}
      />
      <ReorderDialog
        open={openReorderDialog}
        onCloseDialog={() => setOpenReorderDialog(false)}
        onSave={() => {
          setOpenReorderDialog(false);
          fetchData();
        }}
      />
      <Loader loading={loading} />
    </>
  );
}

export default IDDashboard;
