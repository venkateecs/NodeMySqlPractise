var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "testramana"
});
config = {
    port: 9000,
    con: con,
    DB: function () {
        con.connect(function (err) {
            if (err) throw err;
            console.log(`Connected to DB`);
        });
    },
    jwt: {
        secret: 'JWT-SECRET'
    }
};
module.exports = config;