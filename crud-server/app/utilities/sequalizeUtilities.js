const getPagination = (page, size) => {
  // let limit = null;
  // let offset = null;
  // if (page == null || size == null) {
  //   return { limit, offset };
  // }
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, rows, totalPages, currentPage };
};

module.exports = {
  getPagination,
  getPagingData,
};
