const { booksSerializes } = require('../serialize');
const { booksService: service } = require('../services');

const { serializeBook, serializeBooks } = booksSerializes;

const addBook = async (req, res) => {
  const book = await service.addBook({
    ...req.body,
    owner: req.user.id,
  });
  res.status(201).send(serializeBook(book));
};

const getBooks = async (req, res) => {
  const { id: owner } = req.user;
  const status = req.query?.status;
  const params = status ? { owner, status } : { owner };
  const books = await service.getAllBooks(params);
  res.status(200).send(serializeBooks(books));
};

const updateBook = async (req, res) => {
  const { id: owner } = req.user;
  const id = req.params.bookId;
  const { rating, review } = req.body;
  const book = await service.updateBook({ id, owner, rating, review });
  res.status(201).send(serializeBook(book));
};

exports.booksController = {
  addBook,
  getBooks,
  updateBook,
};
