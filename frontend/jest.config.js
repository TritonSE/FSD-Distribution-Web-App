module.exports = {
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css|less|scss)$":
      "<rootDir>/__mocks__/stub.js",
    "^typeface-": "<rootDir>/__mocks__/stub.js",
  },
};
