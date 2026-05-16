import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Card,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import api from "@/api/axios";
import Alert from "@/components/Alert";

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),
  author: Yup.string()
    .required("Author is required")
    .min(3, "Author must be at least 3 characters")
    .max(100, "Author must not exceed 100 characters"),
  image: Yup.mixed()
    .nullable()
    .test("fileSize", "File size must be less than 5MB", (value) => {
      if (!value) return true;
      return value.size <= 5 * 1024 * 1024;
    })
    .test("fileType", "Only image files are allowed", (value) => {
      if (!value) return true;
      return ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(
        value.type
      );
    }),
});

export default function UpdateBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [preview, setPreview] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      image: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("author", values.author);
        if (values.image) {
          formData.append("image", values.image);
        }

        await api.put(`/books/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setAlert({
          open: true,
          message: "Book updated successfully!",
          severity: "success",
        });

        setTimeout(() => {
          navigate("/books");
        }, 1500);
      } catch (error) {
        setAlert({
          open: true,
          message: error.response?.data?.message || "Failed to update book",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setFetching(true);
        const res = await api.get(`/books/${id}`);
        formik.setValues({
          title: res.data.title,
          author: res.data.author,
          image: null,
        });
        if (res.data.image) {
          setCurrentImage(res.data.image);
          setPreview(`http://localhost:5000${res.data.image}`);
        }
      } catch (error) {
        setAlert({
          open: true,
          message: error.response?.data?.message || "Failed to fetch book",
          severity: "error",
        });
      } finally {
        setFetching(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  if (fetching) {
    return (
      <Box sx={{ p: 3 }}>
        <Container maxWidth="sm">
          <Box sx={{ mb: 3 }}>
            <Skeleton variant="text" width={100} height={40} />
          </Box>

          <Card
            sx={{
              borderRadius: 2.5,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              overflow: "hidden",
            }}
          >
            <Box sx={{ p: 3 }}>
              <Skeleton variant="text" width="60%" height={40} sx={{ mb: 2 }} />
              <Skeleton variant="text" width="80%" height={20} sx={{ mb: 3 }} />

              <Skeleton
                variant="rounded"
                width="100%"
                height={56}
                sx={{ mb: 2 }}
              />
              <Skeleton
                variant="rounded"
                width="100%"
                height={56}
                sx={{ mb: 2 }}
              />
              <Skeleton
                variant="rounded"
                width="100%"
                height={56}
                sx={{ mb: 3 }}
              />

              <Box sx={{ display: "flex", gap: 2 }}>
                <Skeleton variant="rounded" width="50%" height={40} />
                <Skeleton variant="rounded" width="50%" height={40} />
              </Box>
            </Box>
          </Card>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Container maxWidth="sm">
        {/* Header */}
        <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/books")}
            variant="text"
            color="inherit"
            sx={{
              textTransform: "none",
              color: "#666",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            Back
          </Button>
        </Box>

        {/* Card */}
        <Card
          sx={{
            borderRadius: 2.5,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            overflow: "hidden",
            border: "1px solid rgba(0, 0, 0, 0.06)",
          }}
        >
          <Box
            sx={{
              background:
                "linear-gradient(135deg, rgba(246, 177, 206, 0.08) 0%, rgba(61, 182, 177, 0.08) 100%)",
              p: 3,
              borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                color: "#1a1a1a",
              }}
            >
              Update Book
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                mt: 0.5,
              }}
            >
              Update the book details in your collection
            </Typography>
          </Box>

          {/* Form */}
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
            }}
          >
            {/* Title Input */}
            <Box>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Book Title"
                placeholder="Enter book title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                disabled={loading}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    transition: "all 0.2s ease",
                    "&:hover fieldset": {
                      borderColor: "primary.main",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                      borderWidth: "2px",
                    },
                  },
                }}
              />
            </Box>

            {/* Author Input */}
            <Box>
              <TextField
                fullWidth
                id="author"
                name="author"
                label="Author Name"
                placeholder="Enter author name"
                value={formik.values.author}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.author && Boolean(formik.errors.author)}
                helperText={formik.touched.author && formik.errors.author}
                disabled={loading}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    transition: "all 0.2s ease",
                    "&:hover fieldset": {
                      borderColor: "primary.main",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                      borderWidth: "2px",
                    },
                  },
                }}
              />
            </Box>

            {/* Image Upload */}
            <Box>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
                disabled={loading}
              />
              <label htmlFor="image" style={{ width: "100%" }}>
                <Button
                  component="span"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                  disabled={loading}
                  sx={{
                    textTransform: "none",
                    py: 1.5,
                  }}
                >
                  {formik.values.image
                    ? formik.values.image.name
                    : "Update Image (Optional)"}
                </Button>
              </label>
              {formik.touched.image && formik.errors.image && (
                <Typography
                  variant="caption"
                  sx={{ color: "#d32f2f", display: "block", mt: 0.5 }}
                >
                  {formik.errors.image}
                </Typography>
              )}

              {/* Image Preview */}
              {preview && (
                <Box
                  sx={{
                    mt: 2,
                    textAlign: "center",
                  }}
                >
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      maxWidth: "200px",
                      maxHeight: "200px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                  {formik.values.image && (
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        color: "#666",
                        mt: 1,
                      }}
                    >
                      New image selected
                    </Typography>
                  )}
                </Box>
              )}
            </Box>

            {/* Buttons */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mt: 2,
                pt: 2,
                borderTop: "1px solid rgba(0, 0, 0, 0.06)",
              }}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/books")}
                disabled={loading}
                sx={{
                  flex: 1,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 500,
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading || !formik.dirty}
                startIcon={
                  loading ? (
                    <CircularProgress size={20} sx={{ color: "inherit" }} />
                  ) : (
                    <SaveIcon />
                  )
                }
                sx={{
                  flex: 1,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 500,
                  py: 1.2,
                }}
              >
                {loading ? "Updating..." : "Update Book"}
              </Button>
            </Box>
          </Box>
        </Card>
      </Container>

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