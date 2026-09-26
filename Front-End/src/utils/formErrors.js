export const parseApiErrors = (data) => {
  const fieldErrors = {};

  data?.errors?.forEach(({ field, message }) => {
    fieldErrors[field] = message;
  });

  return {
    fieldErrors,
    formError: data?.errors
      ? ""
      : data?.message || "Something went wrong, please try again",
  };
};
