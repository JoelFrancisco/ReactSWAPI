const getFormattedDate = (date: string) => {
  const dateArray = date.split('-');
  const formattedDate = `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
  return formattedDate;
};

export { getFormattedDate };
