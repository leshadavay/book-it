export const checkObjectId = (id) => {
  if (!id) {
    return false;
  }

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return false;
  }
  return true;
};

//common error response
export const errorReport = (res, error, status = 400) => {
  res.status(status).json({
    success: false,
    error: error.message,
  });
};
//common success response
export const successReport = (res, data, status = 200) => {
  res.status(status).json({
    success: true,
    ...data,
  });
};
