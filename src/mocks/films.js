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
  `https://vod-progressive.akamaized.net/exp=1597357136~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F2535%2F15%2F387675159%2F1635261604.mp4~hmac=a4958ca1e0c75ecdaa63c267eeaae6eb77d6a5b966d9990b639ec2bbff3cdf19/vimeo-prod-skyfire-std-us/01/2535/15/387675159/1635261604.mp4?filename=Upper+Palatinate+-+31556.mp4`,
  `https://vod-progressive.akamaized.net/exp=1597357282~acl=%2A%2F529998233.mp4%2A~hmac=17d113ffc73af975721541b12248b90b3ba05bbe7515edfbe493042cb8c5b6d8/vimeo-prod-skyfire-std-us/01/3267/6/166335905/529998233.mp4?filename=City+-+3134.mp4`,
  `https://vod-progressive.akamaized.net/exp=1597357296~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4207%2F15%2F396036988%2F1684003587.mp4~hmac=bc273d50028c184eea5105ed7fb6672dafc78deffe4fd87aa47f132d9592004b/vimeo-prod-skyfire-std-us/01/4207/15/396036988/1684003587.mp4?filename=Sea+-+33194.mp4`,
  `https://vod-progressive.akamaized.net/exp=1597357312~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F2944%2F15%2F389724705%2F1646772050.mp4~hmac=0183ccbc8489e75074fd9fa5d636a41da7f550e51e43e577e35fb591f00f6cc4/vimeo-prod-skyfire-std-us/01/2944/15/389724705/1646772050.mp4?filename=Dubai+-+31956.mp4`,
  `https://vod-progressive.akamaized.net/exp=1597357324~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F2325%2F15%2F386628887%2F1629296114.mp4~hmac=f73ccc07b40f6f9ddf22d2e6693c194e524a15f71eeb7876c39dc01d1cf30dc1/vimeo-prod-skyfire-std-us/01/2325/15/386628887/1629296114.mp4?filename=Nature+-+31377.mp4`,
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

const VotesCountRange = {
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
    rating: getRandomIntegerNumber(RatingRange.MIN, RatingRange.MAX),
    votesCount: getRandomIntegerNumber(
      VotesCountRange.MIN,
      VotesCountRange.MAX
    ),
    description: DESCRRIPTION,
    director: getRandomArrayItem(DIRECTORS),
    actors: getRandomArrayItems(ACTORS),
    runTime: getRandomIntegerNumber(RunTimeRange.MIN, RunTimeRange.MAX),
    reviews,
  };
});
