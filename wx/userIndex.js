var config = require('../confige');
var Wechat = require('../wechat/wechat')
var wechatApi = new Wechat(config.wechat)

var fs = require('fs');
var path = require('path');

exports.indexUser = function* (next) {
    var message = this.weixin;
    console.log("ssss "+message.FromUserName)
    var user = yield  wechatApi.batchfetchuser(message.FromUserName , 'en')
    //console.log("你好"+user)


    var openids = [
        {
            openid: message.FromUserName,
            lang: 'en'
        }
    ]
    var users = yield  wechatApi.batchfetchuser(openids)
    var userIds  = users.user_info_list[0].nickname
    console.log("ninini "+userIds)

    currentUser = userIds;
}