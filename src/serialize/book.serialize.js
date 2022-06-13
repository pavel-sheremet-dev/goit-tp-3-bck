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
  const keys = Object.keys(library);
  console.log('keys', keys);

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
