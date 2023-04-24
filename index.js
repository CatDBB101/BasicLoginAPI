const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const expressApp = express();

expressApp.use(express.json());
expressApp.use(cookieParser());

function  checkAccount(username, password) {
    for ( var i = 0 ; i < account_database.length ; i++ ) {
        var user_data = account_database[i];
        if (user_data.username == username && user_data.password == password) {
            return user_data.userid;
        }
    }
    return false;
}

var account_database = [
    {
        userid : "001",
        username : "User1",
        password : "user1password"
    } ,
    {
        userid : "002",
        username : "User2",
        password : "user2password"
    }
];

expressApp.get("/login" , (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    console.log(username, password);

    if (checkAccount(username,password)) {
        res.cookie("LoginKey" , checkAccount(username,password), {maxAge : 1000*60*60});
    } else {
        res.send(["something went wrong"]);
    }

    res.end();
});

expressApp.get("/menu" , (req,res) => {
    var user_cookies = req.cookies;
    console.log(user_cookies);
    if (user_cookies.LoginKey != undefined) {
        if ( checkAccount(user_cookies.LoginKey.username,user_cookies.LoginKey.password) ) {
            res.send(["Welcome back "+user_cookies.LoginKey.username]);
        } else {
            res.send([402]);
        }
    } else {
        res.send(["You must login first"]);
    }
})

// TODO : Port setting
const port = 2000;
expressApp.listen(port, () => {
    // listen for connection request.
    console.log("Listening on port", port);
});

module.exports = expressApp;