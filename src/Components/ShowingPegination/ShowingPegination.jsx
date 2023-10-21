const ShowingPegination = ({ pagination }) => {
  // if pageSize is 5 this size change also slice and page components
  const pageSize = 5;
  const startIndex = (pagination?.currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(
    startIndex + pageSize - 1,
    pagination?.totalDocuments
  );

  const displayRange = `Showing ${startIndex}-${endIndex} OF ${pagination?.totalDocuments}`;

  return <>{displayRange}</>;
};

export default ShowingPegination;
