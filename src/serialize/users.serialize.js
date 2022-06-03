const serializeUser = ({ id, email }) => ({
  id,
  email,
});

const serializeSignInResponce = ({ user, token }) => ({
  user: serializeUser(user),
  token,
});

exports.usersSerializes = {
  serializeUser,
  serializeSignInResponce,
};
