import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Typography,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BookIcon from "@mui/icons-material/Book";

export default function BookTableView({ books, onEdit, onDelete }) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 3,
        borderRadius: 2.5,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        overflow: "hidden",
        border: "1px solid rgba(0, 0, 0, 0.06)",
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              background: "linear-gradient(135deg, #F6B1CE15 0%, #3DB6B115 100%)",
              borderBottom: "2px solid rgba(246, 177, 206, 0.3)",
              "& .MuiTableCell-head": {
                fontWeight: 700,
                fontSize: "0.95rem",
                color: "#1a1a1a",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                py: 2,
              },
            }}
          >
            <TableCell>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <BookIcon sx={{ fontSize: 20, color: "#F6B1CE" }} />
                Title
              </Box>
            </TableCell>
            <TableCell>Author</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.length > 0 ? (
            books.map((book, index) => (
              <TableRow
                key={book.id}
                sx={{
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
                  "&:hover": {
                    backgroundColor: "rgba(246, 177, 206, 0.05)",
                    boxShadow: "inset 0 0 0 1px rgba(246, 177, 206, 0.1)",
                  },
                  "&:last-child td": {
                    borderBottom: "none",
                  },
                }}
              >
                <TableCell
                  sx={{
                    py: 2,
                    fontWeight: 500,
                    color: "#1a1a1a",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background:
                          "linear-gradient(135deg, #F6B1CE 0%, #3DB6B1 100%)",
                      }}
                    />
                    <Typography
                      sx={{
                        fontWeight: 500,
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {book.title}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ py: 2 }}>
                  <Chip
                    label={book.author}
                    variant="outlined"
                    size="small"
                    sx={{
                      borderColor: "#3DB6B1",
                      color: "#3DB6B1",
                      fontWeight: 500,
                      height: 28,
                      "& .MuiChip-label": {
                        px: 1,
                      },
                    }}
                  />
                </TableCell>
                <TableCell align="right" sx={{ py: 2 }}>
                  <Box sx={{ display: "flex", gap: 0.5, justifyContent: "flex-end" }}>
                    <IconButton
                      size="small"
                      onClick={() => onEdit(book.id)}
                      title="Edit book"
                      sx={{
                        backgroundColor: "rgba(246, 177, 206, 0.1)",
                        color: "#F6B1CE",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: "rgba(246, 177, 206, 0.2)",
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <EditIcon sx={{ fontSize: 18 }} />
                    </IconButton>

                    <IconButton
                      size="small"
                      onClick={() => onDelete(book.id, book.title)} 
                      title="Delete book"
                      sx={{
                        backgroundColor: "rgba(229, 57, 53, 0.1)",
                        color: "#E53935",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: "rgba(229, 57, 53, 0.2)",
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <DeleteIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} sx={{ py: 8, textAlign: "center" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <BookIcon
                    sx={{
                      fontSize: 48,
                      color: "rgba(0, 0, 0, 0.1)",
                      mb: 2,
                    }}
                  />
                  <Typography
                    sx={{
                      color: "#999",
                      fontSize: "1.1rem",
                      fontWeight: 500,
                      mb: 0.5,
                    }}
                  >
                    No books found
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#bbb",
                    }}
                  >
                    Start by adding your first book
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}