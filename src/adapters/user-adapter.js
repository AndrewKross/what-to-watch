import { imgURL } from '../const';

const userAdapter = (user) => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    avatar: imgURL + user.avatar_url,
  };
};

export { userAdapter };
