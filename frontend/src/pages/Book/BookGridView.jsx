import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BookIcon from "@mui/icons-material/Book";

export default function BookGridView({ books, onEdit, onDelete }) {
  return (
    <Box
      sx={{
        mt: 3,
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        gap: 2.5,
      }}
    >
      {books.length > 0 ? (
        books.map((book) => (
          <Card
            key={book.id}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: 2.5,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              backgroundColor: "#fafafa",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, #F6B1CE 0%, #3DB6B1 100%)",
                transform: "scaleX(0)",
                transformOrigin: "left",
                transition: "transform 0.3s ease",
              },
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 12px 24px rgba(0, 0, 0, 0.12)",
                backgroundColor: "#fff",
                border: "1px solid rgba(246, 177, 206, 0.3)",
                "&::before": {
                  transform: "scaleX(1)",
                },
              },
            }}
          >
            {/* Book Cover */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: 280,
                background: "linear-gradient(135deg, #F6B1CE15 0%, #3DB6B115 100%)",
                borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
                position: "relative",
              }}
            >
              {book.image ? (
                <Box
                  component="img"
                  src={`http://localhost:5000${book.image}`}
                  alt={book.title}
                  sx={{
                    maxHeight: 220,
                    maxWidth: "80%",
                    objectFit: "contain",
                    borderRadius: 2,
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                />
              ) : (
                <BookIcon
                  sx={{
                    fontSize: 80,
                    color: "#F6B1CE",
                    opacity: 0.5,
                  }}
                />
              )}
            </Box>

            {/* Content */}
            <CardContent sx={{ flexGrow: 1, pb: 1 }}>
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#1a1a1a",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  lineHeight: 1.3,
                  minHeight: "2.6em",
                }}
              >
                {book.title}
              </Typography>

              <Box sx={{ mt: 1.5 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    fontSize: "0.75rem",
                    mb: 0.75,
                    fontWeight: 600,
                  }}
                >
                  AUTHOR
                </Typography>
                <Chip
                  label={book.author}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: "#F6B1CE",
                    color: "#F6B1CE",
                    fontWeight: 500,
                    height: 24,
                    fontSize: "0.75rem",
                    "& .MuiChip-label": {
                      px: 1,
                    },
                  }}
                />
              </Box>
            </CardContent>

            {/* Actions */}
            <CardActions
              sx={{
                justifyContent: "flex-end",
                pt: 1,
                pb: 2,
                px: 2,
                gap: 0.5,
              }}
            >
              <IconButton
                size="small"
                color="primary"
                onClick={() => onEdit(book.id)}
                title="Edit book"
                sx={{
                  backgroundColor: "rgba(246, 177, 206, 0.1)",
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
                color="error"
                onClick={() => onDelete(book.id, book.title)}
                title="Delete book"
                sx={{
                  backgroundColor: "rgba(229, 57, 53, 0.1)",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "rgba(229, 57, 53, 0.2)",
                    transform: "scale(1.1)",
                  },
                }}
              >
                <DeleteIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </CardActions>
          </Card>
        ))
      ) : (
        <Box
          sx={{
            gridColumn: "1 / -1",
            textAlign: "center",
            py: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BookIcon
            sx={{
              fontSize: 64,
              color: "rgba(0, 0, 0, 0.1)",
              mb: 2,
            }}
          />
          <Typography
            variant="body1"
            sx={{
              color: "#999",
              fontSize: "1.1rem",
              fontWeight: 500,
            }}
          >
            No books found
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "#bbb",
              mt: 1,
            }}
          >
            Start by adding your first book
          </Typography>
        </Box>
      )}
    </Box>
  );
}