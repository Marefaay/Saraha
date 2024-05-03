const jwt = require("jsonwebtoken");
const userModel = require("../../models/user.model");
const emailVerfication = async (request, response) => {
  const { token } = request.params;
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      return response.json({ message: "error", err });
    }
   
    const user = await userModel.findOne({ email: decoded.email });
    if (user) {
      await userModel.findOneAndUpdate(
        { email: decoded.email },
        { emailConfirm: true }
      );
      return response.json({ message: "Email Verfied Succefully" });
    } else {
      return response.json({ message: "Email Not Found" });
    }

  });
};
module.exports = emailVerfication;
