const serializeBook = ({
  id,
  name,
  author,
  year,
  pages,
  status,
  rating,
  review,
}) => ({ id, name, author, year, pages, status, rating, review });

const serializeBooks = library => ({
  library,
});

exports.booksSerializes = {
  serializeBook,
  serializeBooks,
};
