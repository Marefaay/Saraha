const userModel = require("../../models/user.model");
const editName = async (request, response) => {
  const { name } = request.body;
  const user = await userModel.findOne({ _id: request.id });
  if (user) {
    await userModel.updateOne({ _id: request.id },{name});
    return response.json({ message: "User Name Updated Succefully" });
  } else {
    return response.json({ message: "User Not Found" });
  }
};
module.exports = editName;
