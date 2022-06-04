const serializeUser = ({ id, name, email }) => ({
  id,
  name,
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
