export const NUMBER_OF_SIMILAR_FILMS = 4;
export const PREVIEW_DELAY = 1000;
export const REVIEWS_IN_COLUMN_COUNT = 3;
export const FILMS_COUNT_ON_START = 8;
export const FILMS_ON_SHOW_MORE_BUTTON = 20;
export const REVIEW_DATE_HUMAN_FORMAT = `MMMM D, YYYY`;
export const REVIEW_DATE_SERVICE_FORMAT = `YYYY-MM-DD`;
export const DEFAULT_GENRE = `All genres`;
// es31-server.appspot.com/wtw/
export const URL = `https://5.react.pages.academy/wtw`;
export const imgURL = `https://5.react.pages.academy`;

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

// export const AppRoute = {
//   MAIN: `/what-to-watch/`,
//   FILM: `/what-to-watch/film/`,
//   PLAYER: `/what-to-watch/player/`,
//   LOGIN: `/what-to-watch/login`,
//   MY_LIST: `/what-to-watch/mylist`,
// };

export const AppRoute = {
  MAIN: `/`,
  FILM: `/film/`,
  PLAYER: `/player/`,
  LOGIN: `/login`,
  MY_LIST: `/mylist`,
};

export const TabsNames = {
  OVERVIEW: `overview`,
  DETAILS: `details`,
  REVIEWS: `reviews`,
};

export const TabsData = [
  {
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

export const LoadingStatus = {
  PENDING: `PENDING`,
  SENDING: `SENDING`,
  OK: `OK`,
  ERROR: `ERROR`,
};

export const AuthorizationStatus = {
  AUTHORIZED: true,
  NOT_AUTHORIZED: false,
};

export const HttpStatus = {
  SUCCESS: 200,
  REDIRECT: 300,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
};

export const LoaderData = {
  TYPE: `Circles`,
  COLOR: `#a071bb`,
  WIDTH: 250,
  HEIGHT: 250,
  STYLE: {
    position: `fixed`,
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  },
};
