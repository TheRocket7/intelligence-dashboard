import { styled, Box, CircularProgress } from "@mui/material";

interface MyBoxProps {
  loading?: boolean;
}

const LoadingBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "loading",
})<MyBoxProps>(({ loading }) => ({
  position: "fixed",
  width: "100%",
  height: "100%",
  transition: "opacity 300ms ease, visibility 300ms ease",
  top: 0,
  left: 0,
  padding: "0 0.3rem",
  backdropFilter: "blur(5px)",
  opacity: loading ? 1 : 0,
  visibility: loading ? "visible" : "hidden",
  zIndex: 200,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

interface LoaderProps {
  loading: boolean;
}

export default function Loader({ loading }: LoaderProps) {
  return (
    <LoadingBox loading={loading}>
      <CircularProgress size="4rem" />
    </LoadingBox>
  );
}
