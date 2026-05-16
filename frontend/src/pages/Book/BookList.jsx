import { useState, useEffect } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import TableListIcon from "@mui/icons-material/TableChart";
import GridViewIcon from "@mui/icons-material/GridView";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";
import BookTableView from "./BookTableView";
import BookGridView from "./BookGridView";
import Alert from "@/components/Alert";

export default function BookList() {
  const [viewType, setViewType] = useState("table");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    bookId: null,
    bookTitle: "",
  });
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/books");
      setBooks(res.data);
    } catch (error) {
      console.error("Error fetching books:", error);
      setAlert({
        open: true,
        message: "Failed to fetch books",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id, title) => {
    setDeleteDialog({
      open: true,
      bookId: id,
      bookTitle: title,
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      setDeleteLoading(true);
      await api.delete(`/books/${deleteDialog.bookId}`);

      // Remove book from state instead of fetching all books
      setBooks(books.filter((book) => book.id !== deleteDialog.bookId));

      setAlert({
        open: true,
        message: "Book deleted successfully!",
        severity: "success",
      });

      setDeleteDialog({
        open: false,
        bookId: null,
        bookTitle: "",
      });
    } catch (error) {
      console.error("Error deleting book:", error);
      setAlert({
        open: true,
        message: error.response?.data?.message || "Failed to delete book",
        severity: "error",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({
      open: false,
      bookId: null,
      bookTitle: "",
    });
  };

  const handleEdit = (id) => {
    navigate(`/books/edit/${id}`);
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          My Books
        </Typography>

        {/* Add Book Button */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("/books/add")}
          size="small"
        >
          Add New Book
        </Button>
      </Box>

      {/* View Toggle & Controls */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
        }}
      >
        <ButtonGroup variant="outlined" size="small">
          <Button
            onClick={() => setViewType("table")}
            variant={viewType === "table" ? "contained" : "outlined"}
            startIcon={<TableListIcon />}
          >
            Table
          </Button>
          <Button
            onClick={() => setViewType("grid")}
            variant={viewType === "grid" ? "contained" : "outlined"}
            startIcon={<GridViewIcon />}
          >
            Grid
          </Button>
        </ButtonGroup>
      </Box>

      {/* Books Display */}
      {viewType === "table" ? (
        <BookTableView
          books={books}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      ) : (
        <BookGridView
          books={books}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={handleDeleteCancel}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: "1.2rem" }}>
          Delete Book?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mt: 1 }}>
            Are you sure you want to delete{" "}
            <strong>"{deleteDialog.bookTitle}"</strong>? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={handleDeleteCancel}
            variant="outlined"
            disabled={deleteLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            disabled={deleteLoading}
            sx={{
              minWidth: 100,
            }}
          >
            {deleteLoading ? <CircularProgress size={24} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Alert */}
      <Alert
        open={alert.open}
        onClose={handleCloseAlert}
        message={alert.message}
        severity={alert.severity}
      />
    </Box>
  );
}