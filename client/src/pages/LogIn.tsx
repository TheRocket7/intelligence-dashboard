import { Box, Button, Container, styled, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import type { IDLogInUser } from "../types/idUser";
import { logIn } from "../services/apiService";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: theme.palette.background.default,
}));

const FormBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper,
  width: "100%",
  maxWidth: "40rem",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  width: "100%",
}));

const LoginButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: "100%",
}));

function LogIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IDLogInUser>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<IDLogInUser>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as string]: value }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<IDLogInUser> = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      try {
        const data = await logIn(formData);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard", { replace: true });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  return (
    <LoginContainer>
      <FormBox>
        <Box component="form" onSubmit={handleSubmit}>
          <StyledTextField
            label={"Username"}
            name="username"
            variant="filled"
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
            fullWidth
            required
          />
          <StyledTextField
            label={"Password"}
            name="password"
            variant="filled"
            type="password"
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            fullWidth
            required
          />
          <LoginButton type="submit" variant="contained" color="primary">
            Log In
          </LoginButton>
        </Box>
      </FormBox>
    </LoginContainer>
  );
}

export default LogIn;
