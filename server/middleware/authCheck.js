const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log(authHeader)
  if (authHeader) {
    const token = authHeader;

    jwt.verify(token, process.env.SECRET_KEY, async (err, payload) => {
      try {
        if (err) {
          return res.status(400).send({ error: "Unauthorized User!" });
        }

        const user = await User.findOne({ _id: payload.id }).select(
          "-password"
        );
        req.user = user;
        next();
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    return res.status(400).send({ error: "Forbidden operation" });
  }
};
