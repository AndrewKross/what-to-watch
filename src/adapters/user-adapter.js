const userAdapter = (user) => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    avatar: `https://4.react.pages.academy${user.avatar_url}`,
  };
};

export { userAdapter };
