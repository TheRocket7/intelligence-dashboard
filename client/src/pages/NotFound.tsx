import { Link, Typography } from "@mui/material";

function NotFound() {
  return (
    <>
      <Typography textAlign="center" variant="h1">
        404 - not found
      </Typography>
      <Typography textAlign="center" variant="h3">
        Page that you looking for is missing. It's maybe deleted or moved. Go to{" "}
        <Link href={"/"}>Dashboard</Link> and try to found it.
      </Typography>
    </>
  );
}

export default NotFound;
