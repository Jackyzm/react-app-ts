const express = require('express');
const Router = express.Router();
const mockjs = require('mockjs');

const notices = require('../mock/api.notices.json');
const charts = require('./chart');
const userCurrent = require('../mock/api.userCurrent.json');
const projectNotice = require('./getData').getNotice;
const getActivities = require('./getData').getActivities;

// post 获取参数 console.log(req.body);
// get 获取参数 console.log(req.query);

Router.get('/notices',function(req,res){
    return res.json(notices);
});

Router.get('/charts',function(req,res){
    return res.json(charts);
});

Router.get('/userCurrent',function(req, res){
    return res.json(userCurrent);
});

Router.get('/tags',function(req, res){
    const list = mockjs.mock({
        'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
    })
    return res.json(list);
});

Router.get('/project/notice',function(req, res){
    return res.json(projectNotice);
});

Router.get('/activities',function(req, res){
    return res.json(getActivities);
});

module.exports = Router;
