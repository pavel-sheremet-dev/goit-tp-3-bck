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

const serializeBooks = library => {
  const obj = {
    library: Object.keys(library).reduce((acc, status) => {
      return { ...acc, [status]: library[status].map(serializeBook) };
    }, {}),
  };

  return obj;
};

exports.booksSerializes = {
  serializeBook,
  serializeBooks,
};
