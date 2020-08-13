import moment from "moment";

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

export const getRandomIntegerNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomArrayItem = (elements) => {
  const randomIndex = getRandomIntegerNumber(0, elements.length - 1);

  return elements[randomIndex];
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

export const getRandomArrayItems = (array) => {
  const shuffledArray = shuffleArray(array.slice());

  return shuffledArray.slice(0, getRandomIntegerNumber(0, array.length));
};

export const getFormatedRunTime = (duration) => {
  const durationInMinutes = moment.duration(duration, `minutes`);

  return `${durationInMinutes.hours()}h ${durationInMinutes.minutes()}m`;
};
