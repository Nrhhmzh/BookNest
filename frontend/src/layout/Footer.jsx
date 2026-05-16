import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ textAlign: "center", p: 2 }}>
      <Typography variant="body2">
        © 2026 by{" "}
        <Link
          href="https://naurahhamizah.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Nrhhmzh
        </Link>
      </Typography>
    </Box>
  );
}