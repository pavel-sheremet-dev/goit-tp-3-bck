exports.getStartDate = (date = new Date(), includeThisDay = false) => {
  const delta = includeThisDay ? 1 : 0;
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + delta),
  );
};
