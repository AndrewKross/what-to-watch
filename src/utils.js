export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export const getRatingLevel = (rating) => {
  rating = parseInt(rating, 10);
  if (rating >= 0 && rating < 3) {
    return `Bad`;
  }
  if (rating < 5) {
    return `Normal`;
  }
  if (rating < 8) {
    return `Good`;
  }
  if (rating < 10) {
    return `Very good`;
  }
  if (rating === 10) {
    return `Awesome`;
  }
  return null;
};
