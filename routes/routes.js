let config = require('../config/config');
let con = config.con;
const configNew = require('../config/config');
let UserController = require('../controllers/UserController');
let jwt = require('jsonwebtoken');

const getUsers = {
  method: 'GET',
  path: '/users',
  config: {
    handler: async (request) => {
      return UserController.getUsers(request).then((res) => {
        return { 'Result': res };
      });
    }
  }
};

const saveUsers = {
  method: 'POST',
  path: '/saveUsers',
  config: {
    handler: async (request) => {
      return UserController.saveUsers(request.payload).then((res) => {
        return res;
      });
    }
  }
}
const login = {
  method: 'POST',
  path: '/login',
  config: {
    handler: async (req) => {
      token = jwt.sign(req.payload, configNew.jwt.secret, { expiresIn: 1440 });
      req.headers.name = 'venkat';
      return { token: token };
    }
  }
}
const helloTwo = {
  method: 'GET',
  path: '/hello-two',
  config: {
    handler: (request, reply) => {
      return 'Hello world two!';
    }
  }
};
module.exports = [getUsers, helloTwo, login, saveUsers]