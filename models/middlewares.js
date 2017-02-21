
"use strict";
///<reference path="../../typings/node/node.d.ts" />
var util = require('util');

/*
 * 校验会话
 */
module.exports = function () {
    return function* (next) {
        if (!this.session.user) {
            return;
        }
        yield next;
    }
}