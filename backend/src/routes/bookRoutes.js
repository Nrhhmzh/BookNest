const express = require("express");
const prisma = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Create book with optional image
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { title, author } = req.body;
    const userId = req.user.id;

    if (!title || !author) {
      // Delete uploaded file if validation fails
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ message: "Title and author are required" });
    }

    const book = await prisma.book.create({
      data: {
        title,
        author,
        image: req.file ? `/uploads/${req.file.filename}` : null, // 👈 Save image path
        userId,
      },
    });

    res.status(201).json(book);
  } catch (error) {
    // Delete uploaded file if error occurs
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: error.message });
  }
});

// Get all books
router.get("/", authMiddleware, async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single book
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const book = await prisma.book.findUnique({
      where: { id: req.params.id },
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if user owns the book
    if (book.userId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update book with optional image
router.put("/:id", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { title, author } = req.body;
    const bookId = req.params.id;

    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.userId !== req.user.id) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(403).json({ message: "Unauthorized" });
    }

    let imageUrl = book.image;

    // Delete old image if new one is uploaded
    if (req.file) {
      if (book.image) {
        const oldImagePath = path.join(__dirname, "../", book.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedBook = await prisma.book.update({
      where: { id: bookId },
      data: {
        title: title || book.title,
        author: author || book.author,
        image: imageUrl,
      },
    });

    res.json(updatedBook);
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: error.message });
  }
});

// Delete book
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const book = await prisma.book.findUnique({
      where: { id: req.params.id },
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.userId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Delete image file if it exists
    if (book.image) {
      const imagePath = path.join(__dirname, "../", book.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await prisma.book.delete({
      where: { id: req.params.id },
    });

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;