let config = require('../config/config');
let con = config.con;
let jwt = require('jsonwebtoken');
let Utils = require('../utils/utils') ;

class UserController {
    static getUsers(request) {
        async function usersCount(argQuery) {
            return new Promise((resolve, reject) => {
                con.query(argQuery, function (err, res) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(res);
                    }
                })
            })
        }
        var tokenResult = Utils.validateToken(request.headers.authorization)
        if (tokenResult) {
            var result = usersCount('select * from users');
            return new Promise((resolve , reject) => {
                resolve(result) ;
            })
        } else {
            return new Promise((resolve , reject) => {
                resolve({'Message':'Token is not valid'}) ;
            })
        }
    }
    static async saveUsers(payload) {
        function insertUsers(argQuery) {
            return new Promise((resolve, reject) => {
                con.query(argQuery, function (err, res) {
                    if (res) {
                        resolve('Data Saved Successfully');
                    } else if (err) {
                        reject('Data not saved');
                    }
                });
            })
        }
        function usersCount(argQuery) {
            return new Promise((resolve, reject) => {
                con.query(argQuery, function (err, res) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(res);
                    }
                })
            })
        }
        var checkCount = await usersCount('select count(*) as usersCount from users where username="' + payload.username + '"');
        if (checkCount[0].usersCount === 0) {
            var result = await insertUsers('insert into users (username,password) values ("' + payload.username + '","' + payload.password + '")');
            return new Promise((resolve, reject) => {
                resolve(result);
            });
        } else {
            let msg = 'username ' + payload.username + ' already exists';
            return new Promise((resolve, reject) => {
                resolve({ message: msg });
            });
        }
    }
}
module.exports = UserController;
