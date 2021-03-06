import moment from 'moment';

export const getRandomIntegerNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * ( max - min + 1 )) + min;
};

export const getRandomArrayItem = (elements) => {
  const randomIndex = getRandomIntegerNumber(0, elements.length - 1);

  return elements[randomIndex];
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * ( i + 1 ));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

export const getRandomArrayItems = (array) => {
  const shuffledArray = shuffleArray(array.slice());

  return shuffledArray.slice(0, getRandomIntegerNumber(0, array.length));
};

export const getFormattedRunTime = (duration) => {
  const durationInMinutes = moment.duration(duration, `minutes`);

  return `${durationInMinutes.hours()}h ${durationInMinutes.minutes()}m`;
};

export const getEmailValidation = (emailValue) => {
  // eslint-disable-next-line max-len
  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(String(emailValue).toLowerCase());
};

export const noop = () => {
  // do nothing
};
