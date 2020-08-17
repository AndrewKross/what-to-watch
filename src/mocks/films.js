import { nanoid } from "nanoid";
import {
  getRandomIntegerNumber,
  getRandomArrayItem,
  getRandomArrayItems,
} from "../utils/common.js";
import { reviews } from "./reviews.js";

const ID_LENGTH = 8;

const TITLES = [
  `Fantastic Beasts: The Crimes of Grindelwald`,
  `Bohemian Rhapsody`,
  `Macbeth`,
  `Aviator`,
  `We need to talk about Kevin`,
  `What We Do in the Shadows`,
  `Revenant`,
  `Johnny English`,
];

const COVERS = [
  `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  `img/bohemian-rhapsody.jpg`,
  `img/macbeth.jpg`,
  `img/aviator.jpg`,
  `img/we-need-to-talk-about-kevin.jpg`,
  `img/what-we-do-in-the-shadows.jpg`,
  `img/revenant.jpg`,
  `img/johnny-english.jpg`,
];

const PREVIEWS = [
  `https://cdn.videvo.net/videvo_files/video/free/2019-09/small_watermarked/190828_07_MarinaBayatNightDrone_UHD_02_preview.webm`, `https://www.videvo.net/videvo_files/converted/2018_07/preview/180607_A_064.mp429860.webm`, `https://www.videvo.net/videvo_files/converted/2018_01/preview/171124_H1_006.mp491073.webm`, `https://www.videvo.net/videvo_files/converted/2016_11/preview/GOPR6239_1.mov34724.webm`, `https://cdn.videvo.net/videvo_files/video/free/2019-12/small_watermarked/190915_B_01_Timelapse%20Danang_01_preview.webm`,
];

const GENRES = [
  `comedy`,
  `drama`,
  `melodrama`,
  `horror`,
  `crime`,
  `documentary`,
  `romance`,
  `thriller`,
];

const DESCRRIPTION = `In the 1930s, the Grand Budapest Hotel is a popular European ski resort,
presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's
friend and protege. Gustave prides himself on providing first-class service to the hotel's guests,
including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's
lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief
suspect in her murder.`;

const DIRECTORS = [
  `Otto Bathurst`,
  `Tom Harper`,
  `Colm McCarthy`,
  `Tim Mielants`,
  `David Caffrey`,
];

const ACTORS = [
  `Cillian Murphy`,
  `Sam Neill`,
  `Helen McCrory`,
  `Paul Anderson`,
  `Annabelle Wallis`,
  `Iddo Goldberg`,
  `Sophie Rundle`,
  `Joe Cole`,
  `Finn Cole`,
];

const ReleaseRange = {
  MIN: 1980,
  MAX: 2020,
};

const RatingRange = {
  MIN: 0,
  MAX: 10,
};

const ratingsCountRange = {
  MIN: 0,
  MAX: 1000,
};

const RunTimeRange = {
  MIN: 20,
  MAX: 240,
};

export const filmsData = TITLES.map((title, index) => {
  return {
    id: nanoid(ID_LENGTH),
    title,
    cover: COVERS[index],
    poster: COVERS[index],
    preview: getRandomArrayItem(PREVIEWS),
    genre: getRandomArrayItem(GENRES),
    release: getRandomIntegerNumber(
      ReleaseRange.MIN,
      ReleaseRange.MAX
    ).toString(),
    rating: +(Math.random() * RatingRange.MAX).toPrecision(2),
    ratingsCount: getRandomIntegerNumber(
      ratingsCountRange.MIN,
      ratingsCountRange.MAX
    ),
    description: DESCRRIPTION,
    director: getRandomArrayItem(DIRECTORS),
    actors: getRandomArrayItems(ACTORS),
    runTime: getRandomIntegerNumber(RunTimeRange.MIN, RunTimeRange.MAX),
    reviews,
  };
});
