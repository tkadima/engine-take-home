export const getPaginationParams = (page: number, itemsPerPage: number) => ({
    startIndex: (page - 1) * itemsPerPage,
    limit: itemsPerPage,
  });