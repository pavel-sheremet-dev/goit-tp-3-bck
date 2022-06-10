const serializeBooks = ({ id, pages, status }) => ({
  id,
  pages,
  status,
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
