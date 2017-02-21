
"use strict";
///<reference path="../../typings/node/node.d.ts" />
var util = require('util');
var sha1 = require('sha1')
var getRawBody = require('raw-body')
var Wechat = require('../wechat/wechat')
var util = require('../wechat/util')
var config = require('../confige');
var wechatApi = new Wechat(config.wechat)

var reply = require('../wx/reply') ;
var handler = reply.reply

/*
 * 校验会话
 */
module.exports =  function() {
       return function*(next){
           var wechat = new Wechat(config.wechat)   //初试化 构造函数
              //加密的逻辑
            var that = this
            var token = config.wechat.token
            var signature = this.query.signature
            var nonce = this.query.nonce
            var timestamp = this.query.timestamp
            var echostr = this.query.echostr
            var str = [token, timestamp, nonce].sort().join('')
            var sha = sha1(str)
            if (this.method === 'GET') {
                if (sha === signature) {
                    this.body = echostr + ''
                }
                else {
                    this.body = 'wrong'
                }
            }
            else if (this.method === 'POST') {    //post过来的数据
                if (sha !== signature) {
                    this.body = 'wrong'
                    return false
                }
                var data = yield getRawBody(this.req, {    //可以把this 上面的request对象，http中request对象，去拼接它的数据，最终可得到buff的 XML 数据
                    length: this.length,           //post过来的数据的长度
                    limit: '8mb',           //限制数据体积 1兆
                    encoding: this.charset    // 编码
                })
//console.log(data.toString())      //异步请求 看xml数据
                var content = yield util.parseXMLAsync(data)   //工具包  把原始的xml数据

                console.log("node" + content)
                var message = util.formatMessage(content.xml)
                console.log("kokokokko "+message.FromUserName)

                this.weixin = message
                yield handler.call(this, next)
                wechat.reply.call(this)    //调用wechat 方法
            }

        var message = this.message;
        var user = yield  wechatApi.batchfetchuser(message.FromUserName , 'en');
        var openids = [
            {
                openid: message.FromUserName,
                lang: 'en'
            }
        ]
        var users = yield  wechatApi.batchfetchuser(openids)

        console.log("saaaaaaaa "+users)

        yield  next
    }

}
