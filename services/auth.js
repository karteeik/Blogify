import JWT from "jsonwebtoken";

const secret = "$JohnDue@#$123";

export const createTokenForUser = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImage: user.profileImage,
    role: user.role,
  };

  const token = JWT.sign(payload, secret);
  return token;
};

export const validateToken = (token) => {
  const payload = JWT.verify(token, secret);
  return payload;
};
