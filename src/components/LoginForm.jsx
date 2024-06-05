import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useGlobalContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setAuthType }) => {
  const { setUser } = useGlobalContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;

    const res = await fetch("https://nodejs-auth-server-tvdz.onrender.com/api/v1/auth/login", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      //make sure to serialize your JSON body
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const user = await res.json();
    if (user) {
      setUser(user);
      navigate("/exercises");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: "500px",
        margin: "auto",
        marginTop: "50px",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h5" component="div" sx={{ mb: 2 }}>
        Login Form
      </Typography>
      <TextField
        fullWidth
        label="Email"
        {...register("email", {
          required: "Email is required",
          minLength: {
            value: 3,
            message: "Email must be at least 3 characters",
          },
        })}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        margin="normal"
      />
      <TextField
        fullWidth
        type="password"
        label="Password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        })}
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
        margin="normal"
        sx={{ mt: 2 }}
      />
      <FormControlLabel
        control={<Checkbox {...register("rememberMe")} color="primary" />}
        label="Remember Me"
        sx={{ mt: 1, textAlign: "left" }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Login
      </Button>
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Link href="#" variant="body2">
          Forgot Password?
        </Link>
        <Box mt={1}>
          <Button onClick={() => setAuthType("register")} variant="body2">
            Don't have an account? Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
