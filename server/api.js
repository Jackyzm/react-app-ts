const express = require('express');
const Router = express.Router();
const mockjs = require('mockjs');

const notices = require('../mock/api.notices.json');
const charts = require('./chart');
const userCurrent = require('../mock/api.userCurrent.json');
const projectNotice = require('./getData').getNotice;
const getActivities = require('./getData').getActivities;
const getRule = require('./rule').getRule;
const putRule = require('./rule').putRule;
const deleteRule = require('./rule').deleteRule;

// post 获取参数 console.log(req.body);
// get 获取参数 console.log(req.query);

Router.get('/notices', function(req, res) {
    return res.json(notices);
});

Router.get('/charts', function(req, res) {
    return res.json(charts);
});

Router.get('/userCurrent', function(req, res) {
    return res.json(userCurrent);
});

Router.get('/tags', function(req, res) {
    const list = mockjs.mock({
        'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
    })
    return res.json(list);
});

Router.get('/project/notice', function(req, res) {
    return res.json(projectNotice);
});

Router.get('/activities', function(req, res) {
    return res.json(getActivities);
});

Router.post('/form-basic', function(req, res) {
    return res.json({"code":200, "success":true, "data": null});
});

Router.get('/table-list', function(req, res) {
    return res.json(getRule(req.query));
});

Router.put('/table-list-put', function(req, res) {
    return res.json(putRule(req.body));
});

Router.post('/table-list-delete', function(req, res) {
    return res.json(deleteRule(req.body));
});

module.exports = Router;
