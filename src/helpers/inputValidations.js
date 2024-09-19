export const inputValidation = (data) => {
  const namePattern = /^[\p{L}\s\-]+$/u;
  const agePattern = /^[0-9]+$/;

  if (!namePattern.test(data.userName)) {
    return {
      error: true,
      errorMessage:
        "Incorrect name. Only letters, spaces, and hyphens are allowed.",
    };
  }
  if (
    !agePattern.test(data.userAge) ||
    data.userAge <= 18 ||
    data.userAge > 100
  ) {
    return {
      error: true,
      errorMessage: "Incorrect age. Should be a number between 18 and 100.",
    };
  } else {
    return {
      error: false,
    };
  }
};
