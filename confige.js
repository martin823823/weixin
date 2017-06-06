'use strict'

var path=require("path");
var util=require("./lib/util");
var wechat_file=path.join(__dirname,"./config/wechat.txt");
var wechat_ticket_file=path.join(__dirname,"./config/wechat_ticket.txt");


var config={
    wechat:{
        appID:"wxd58fb049ed02ac45",
        //"9099b86275f7a4293ff4ab0fcb35a6e9"
        appSecret:"4b8fbe4c34f99bce3af9a0c5911a5bee",
        token:"wept",
        getAccessToken:function(){
            return util.readFileAsync(wechat_file);
        },
        saveAccessToken:function(data){
             data=JSON.stringify(data);
            return util.writeFileAsync(wechat_file,data);
        },
        getTicket:function(data){
            data=JSON.stringify(data);
            return util.writeFileAsync(wechat_ticket_file,data);
        },
        saveTicket:function(data){
            data=JSON.stringify(data);
            return util.writeFileAsync(wechat_ticket_file,data);
        }
    }
};


module.exports = config


