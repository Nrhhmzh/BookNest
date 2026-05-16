const prisma = require("../config/db");

exports.createBook = async (req, res) => {
  try {
    const { title, author } = req.body;

    const userId = req.userId; // from JWT middleware

    const book = await prisma.book.create({
      data: {
        title,
        author,
        userId,
      },
    });

    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const userId = req.userId;

    const books = await prisma.book.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author } = req.body;

    const book = await prisma.book.update({
      where: { id },
      data: {
        title,
        author,
      },
    });

    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.book.delete({
      where: { id },
    });

    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};