const ShowingPegination = ({pagination}) => {
  const startIndex = (pagination.currentPage - 1) * pagination.totalPage + 1;
  const endIndex = Math.min(
    pagination.currentPage * pagination.totalPage,
    pagination.totalDocuments
  );

  const displayRange = `Showing ${startIndex}-${endIndex} OF ${pagination.totalDocuments}`;

  return <>{displayRange}</>;
};

export default ShowingPegination;
