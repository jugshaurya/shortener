const isValidUrl = url => {
  const isCorrectURL = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    url
  );
  return (
    isCorrectURL &&
    url &&
    url.trim() !== "" &&
    url.trim().length >= 1 &&
    url.trim().length <= 100
  );
};

const isValidName = name => {
  const isCorrectName = /^[a-zA-Z0-9\\_\\"]+$/i.test(name);
  return (
    isCorrectName &&
    name &&
    name.trim() !== "" &&
    name.trim().length >= 1 &&
    name.trim().length <= 20
  );
};

module.exports = {
  isValidUrl,
  isValidName
};
