export const NUMBER_OF_SIMILAR_FILMS = 4;
export const PREVIEW_DELAY = 1000;
export const REVIEWS_IN_COLUMN_COUNT = 3;
export const FILMS_ON_START_SCREEN = 8;
export const FILMS_ON_SHOW_MORE_BUTTON = 20;
export const REVIEW_DATE_HUMAN_FORMAT = `MMMM D, YYYY`;
export const REVIEW_DATE_SERVICE_FORMAT = `YYYY-MM-DD`;

export const RatingRange = {
  MIN: 0,
  MAX_BAD: 3,
  MAX_NORMAL: 5,
  MAX_GOOD: 8,
  MAX: 10,
};

export const RatingGrade = {
  BAD: `Bad`,
  NORMAL: `Normal`,
  GOOD: `Good`,
  VERY_GOOD: `Very good`,
  AWESOME: `Awesome`,
};

export const AppRoute = {
  MAIN: `/`,
  FILM: `/film/`,
  PLAYER: `/player/`,
};

export const GENRES = [
  `All genres`,
  `Comedies`,
  `Crime`,
  `Documentary`,
  `Dramas`,
  `Horror`,
  `Kids & Family`,
  `Romance`,
  `Sci-Fi`,
  `Thrillers`,
];

export const GenresForFilms = {
  [`Comedies`]: `comedy`,
  [`Crime`]: `crime`,
  [`Documentary`]: `documentary`,
  [`Dramas`]: `drama`,
  [`Horror`]: `horror`,
  [`Kids & Family`]: `kids & family`,
  [`Romance`]: `romance`,
  [`Sci-Fi`]: `sci-fi`,
  [`Thrillers`]: `thriller`,
};

export const TabsNames = {
  OVERVIEW: `overview`,
  DETAILS: `details`,
  REVIEWS: `reviews`,
};

export const TabsData = [{
  name: TabsNames.OVERVIEW,
  content: `Overview`,
},
{
  name: TabsNames.DETAILS,
  content: `Details`,
},
{
  name: TabsNames.REVIEWS,
  content: `Reviews`,
},
];
