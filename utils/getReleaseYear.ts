const getReleaseYear = (releaseDate: string) => {
  const [year] = releaseDate.split('-');
  return year;
};

export { getReleaseYear };
