import { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import api from "@/api/axios";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

export default function Login() {
  const [email, setEmail] = useState("test@gmail.com"); 
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError("");
      setLoading(true);

      // Validation
      if (!email || !password) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/books");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #F6B1CE 0%, #3DB6B1 100%)",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 3,
          }}
        >
          {/* Logo */}
          <Box
            component="img"
            src={logo}
            alt="Book Nest Logo"
            sx={{
              height: 60,
              mb: 2,
            }}
          />

          {/* Title */}
          {/* <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 1 }}>
            Book Nest
          </Typography> */}

          <Typography variant="body2" color="textSecondary" sx={{ mb: 3, textAlign: "center" }}>
            Sign in to your account to continue
          </Typography>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ width: "100%", mb: 2 }} onClose={() => setError("")}>
              {error}
            </Alert>
          )}

          {/* Email Input */}
          <TextField
            fullWidth
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            margin="normal"
            variant="outlined"
            disabled={loading}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "primary.main",
                },
              },
            }}
          />

          {/* Password Input */}
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            margin="normal"
            variant="outlined"
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                    disabled={loading}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "primary.main",
                },
              },
            }}
          />

          {/* Login Button */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={handleLogin}
            disabled={loading}
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "none",
              "&:hover": {
                boxShadow: 3,
              },
            }}
          >
            {loading ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1, color: "inherit" }} />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>

          {/* Divider */}
          {/* <Typography variant="body2" color="textSecondary" sx={{ mt: 3 }}>
            Don't have an account?{" "}
            <Typography
              component="span"
              sx={{
                color: "primary.main",
                fontWeight: "bold",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={() => navigate("/register")}
            >
              Sign up here
            </Typography>
          </Typography> */}
        </Paper>
      </Container>
    </Box>
  );
}