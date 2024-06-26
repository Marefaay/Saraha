const jwt = require("jsonwebtoken");
const userModel = require("../../models/user.model");
const userAutherization = async (request, response, next) => {
  const token = request.header("token");
  jwt.verify(token, process.env.JWT_SECRET_KEY, async(err, decoded) => {
    if (err) {
      return response.json({status:"false",message:err});
    } else {
      const user =await userModel.findOne({ _id: decoded.userId });
      if (!user) {
        return response.json({status:"false", message: "This User Not Found" });
      } else {
        console.log(user.emailConfirm)
        if (user.emailConfirm == true) {
          request.id = decoded.userId;
          next();
        } else {
          return response.json({status:"false", message: "You Must Confirm You Email" });
        }
      }
    }
  });
};
module.exports = userAutherization;
