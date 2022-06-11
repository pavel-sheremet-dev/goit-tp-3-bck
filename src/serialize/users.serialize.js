const serializeUser = ({ id, name, email }) => ({
  user: { id, name, email },
});

const serializeSignInResponce = ({ user, token }) => ({
  user: serializeUser(user).user,
  token,
});

exports.usersSerializes = {
  serializeUser,
  serializeSignInResponce,
};
