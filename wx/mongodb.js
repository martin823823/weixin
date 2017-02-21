"use strict";

var mongoose = require('mongoose');
var config = require('../setting');

var mongod = mongoose.connect("mongodb://" + config.host + ":" + config.port + "/" + config.db);

module.exports = mongod;