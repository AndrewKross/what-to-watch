import { URL } from "../const";

const imgUrl = URL.slice(0, -4);

const userAdapter = (user) => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    avatar: imgUrl + user.avatar_url,
  };
};

export { userAdapter };
