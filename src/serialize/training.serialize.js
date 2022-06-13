const serializeBooks = ({ id, name, author, year, pages, status }) => ({
  id,
  status,
  name,
  author,
  year,
  pages,
});

const serializeTraining = ({
  id,
  status,
  startDate,
  deadlineDate,
  totalPages,
  readedPages,
  books,
  results,
  owner,
}) => ({
  id,
  status,
  startDate,
  deadlineDate,
  totalPages,
  readedPages,
  books: books.map(serializeBooks),
  results,
  owner,
});

exports.trainingsSerializes = {
  serializeTraining,
};
