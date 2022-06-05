const serializeTraining = ({
  status,
  startDate,
  deadlineDate,
  totalPages,
  readedPages,
  books,
  results,
}) => ({
  status,
  startDate,
  deadlineDate,
  totalPages,
  readedPages,
  books,
  results,
});

exports.trainingsSerializes = {
  serializeTraining,
};
