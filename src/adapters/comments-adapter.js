const convertCommentFromServer = (comment) => {
  return ({
    id: comment.id,
    text: comment.comment,
    rating: comment.rating,
    userName: comment.user.name,
    date: new Date(comment.date),
  });
};

// eslint-disable-next-line import/prefer-default-export
export const convertCommentsFromServer = (comments) => {
  return comments.map((comment) => convertCommentFromServer(comment));
};
