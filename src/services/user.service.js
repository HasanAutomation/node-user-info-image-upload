const User = require('../models/User');
const AppError = require('../util/AppError');

class UserService {
  async findUser(query) {
    try {
      const user = await User.findOne(query);
      return user;
    } catch (err) {
      throw err;
    }
  }
  async createUser(body) {
    return await User.create(body);
  }
}

module.exports = new UserService();
