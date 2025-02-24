const { authService } = require("../services");

const getProfile = async (request, response) => {
  try {
    const user = request.params.userId;
    if (!user) return response.status(404).json({ message: "User Id required" });
    const result = await authService.getUserById(user);
    response.status(200).json(result);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

const update = async (request, response) => {
  try {
    const user = request.params.userId;
    if (!user || !request.body) {
      return response.status(404).json({ message: "User data required" });
    }
    const result = await authService.updateUser(user, request.body);
    response.status(200).json(result);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

module.exports = {
    getProfile,
    update,
}