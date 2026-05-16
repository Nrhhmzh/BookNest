import { Snackbar, Alert as MuiAlert } from "@mui/material";

export default function Alert({ open, onClose, message, severity = "success" }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MuiAlert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{
          width: "100%",
          fontWeight: 500,
        }}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
}