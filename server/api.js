const express = require('express');
const Router = express.Router();
const notices = require('../mock/api.notices.json');
const charts = require('./chart');
const userCurrent = require('../mock/api.userCurrent.json');
// post 获取参数 console.log(req.body);
// get 获取参数 console.log(req.query);

Router.get('/notices',function(req,res){
    return res.json(notices);
});

Router.get('/charts',function(req,res){
    return res.json(charts);
});

Router.get('/userCurrent',function(req,res){
    return res.json(userCurrent);
});

module.exports = Router;
