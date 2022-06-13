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
  library: Object.keys(library).map(status =>
    library[status].map(serializeBook),
  ),
});

exports.booksSerializes = {
  serializeBook,
  serializeBooks,
};
