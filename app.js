
'use strict'
//app.js
var Koa=require("koa");
var path=require("path");
var wechat=require("./wechat/g");
var util=require("./lib/util");
var config = require('./confige');
var reply = require('./wx/reply') ;
var ejs = require('ejs')
var heredoc = require('heredoc')
var crypto = require('crypto');
var router = require('koa-router')
var index = require('./routes/index.js');
var hashCode = require('./hashCode');

var Wechat = require('./wechat/wechat');
var wechat_file=path.join(__dirname, "./config/wechat.txt");

var parses = require('co-body');
var weiUser = require('./models/projects');
var mongoose = require('mongoose');
var serve = require('koa-static');
var logger = require('koa-logger');
var fs = require('fs');
var os = require('os');
var path = require('path')
var parse = require('co-busboy');
var koaBody   = require('koa-body');

var weiUsername = require('./models/infor');
var setting = require('./setting');

var ObjectID = require('mongodb').ObjectID;
//var bodyParse =require('koa-better-body');
var session = require('koa-generic-session');
var sessionStore = require('koa-session-mongoose');
var currentUser = require('./wx/userIndex');
var mongo = require('./wx/mongodb');
var qiniu = require('qiniu');
var qiniuConfig = require('./qiniuconfig');
var unoconv = require('unoconv2');

var Auth = require('./models/middlewares');
var wei = require('./models/pageIndex');
var uuid = require('uuid');
var uuidV1 = require('uuid/v1');

var app = new Koa();

app.keys = ['koa','Company'];


unoconv.listen();

app.use(koaBody({formidable:{uploadDir: __dirname}}));
//app.use(koaBody({formidable:{maxFields: 10}}));
//app.use(koaBody({formidable:{maxFieldsSize: 80}}));

app.use(serve(__dirname + '/public'));
app.use(logger());
//app.use(session({
//    store: MongoStore.create({
//        db:setting.db,
//        host:setting.host,
//        port:setting.port
//    })
//}));


app.use(session({
    store: sessionStore.create(),
    collection: 'sessions',
    connection: mongo,
    expires: 30 * 60 * 1000,
    model: 'KoaSession'
}));


var createNoce = function(){
  return Math.random().toString(36).substr(2,15);
}


var createTimeStamp = function()
{
     return parseInt(new Date().getTime() / 1000,10) + ''
}

function _sign(noncestr , ticket ,timestamp ,url) {
    var params = [
        'noncestr=' + noncestr,
        'jsapi_ticket=' + ticket ,
        'timestamp=' + timestamp ,
        'url=' + url
    ];
    var str = params.sort().join('&');
    var shasum = crypto.createHash('sha1');

    shasum.update(str);

    return shasum.digest('hex')
}

function sign(ticket ,url) {
    var noncestr = createNoce();
    console.log(noncestr);
    var timestamp = createTimeStamp()
    console.log(timestamp)
    var signature = _sign(noncestr , ticket ,timestamp ,url);
    console.log(signature)
    return {
        noncestr: noncestr,
        timestamp: timestamp,
        signature: signature
    }
}

var api = router();

app
    .use(api.routes())
    .use(api.allowedMethods());

// 怎么解决回调函数处理数据的存在问题



//var userOpenId = weiUsername.weixinUser.name;


//判断是否登陆

api.get('/Inpage',function *(){

    var url = this.request.url;
    var url1 = url.replace("/Inpage?code=", "");
    var counts  = 0;
    var getCode = url1.replace("&state=", "")

    this.session.getcode = getCode;

    console.log(getCode)
    console.log(this.session.getcode);

    var code = this.session.getcode

    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    var getOpenData  = yield  wechatApi.getRegcode(code);

    this.session.openid = getOpenData.openid;
    var openid = this.session.openid;
    var userInfor  = yield  wechatApi.batchfetchuser(openid);

    console.log(userInfor)

    console.log(getOpenData)

    var pic = userInfor.headimgurl;
    var userId  = userInfor.nickname
    var userCheck  = userInfor.openid;

    console.log(pic)
    console.log(userId)
    console.log(userCheck)

    weiUser.saveId(userId, pic , userCheck ,function(err, total) {
        if(err) {
            console.log(err)
        }
        else {
            console.log(total)
        }
    });

    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    //console.log(this.request.url)

    this.redirect("/notice");

});
//子公司列表 '/schools'
api.get('/companys',function *(){

    //var url = this.request.url;
    //var url1 = url.replace("/schools?code=", "");
    //var counts  = 0;
    //var getCode = url1.replace("&state=", "")
    //
    //this.session.getcode = getCode;
    //
    //console.log(getCode)
    //console.log(this.session.getcode);
    //
    //var code = this.session.getcode
    //
    //var wechatApi = new Wechat(config.wechat)
    //var data = yield wechatApi.fetchAccessToken();
    //var getOpenData  = yield  wechatApi.getRegcode(code);
    //this.session.openid = getOpenData.openid;
    //var openid = this.session.openid;
    //var userInfor  = yield  wechatApi.batchfetchuser(openid);
    //
    //console.log(userInfor)
    //
    //console.log(getOpenData)
    //
    //var pic = userInfor.headimgurl;
    //var userId  = userInfor.nickname
    //var userCheck  = userInfor.openid;
    //
    //console.log(pic)
    //console.log(userId)
    //console.log(userCheck)
    //
    //weiUser.saveId(userId, pic , userCheck ,function(err, total) {
    //    if(err) {
    //        console.log(err)
    //    }
    //    else {
    //        console.log(total)
    //    }
    //});
    if(this.session.openid) {
        var openid = this.session.openid;
        var company = {};
        var len = 0;

        weiUser.findCompany(function (err, docs, total) {
            if (err) {
                console.log(err)
            }
            company = docs;
            console.log(docs)
            len = total
        })

        var wechatApi = new Wechat(config.wechat)
        var data = yield wechatApi.fetchAccessToken();
        console.log(data)
        var access_token = data.access_token
        var ticketdata = yield wechatApi.fetchTicket(access_token);
        console.log(ticketdata)
        var ticket = ticketdata.ticket
        console.log(ticket);
        var url = this.href.replace(':8000', '');

        console.log(ticket);
        console.log(url);
        var params = sign(ticket, url);
        console.log("...........")
        console.log(params.noncestr)
        console.log(params.timestamp)
        console.log(params.signature)

        console.log(this.request.url)

        this.body = ejs.render(index.tpl35, {
            schoolList: company,
            len: len,
            openid: openid

        });
    }else {
        this.redirect("/reg")
    }

});


//显示所有参加此赛事的小组
api.get('/movie/:id',function *(){

    //console.log("ok"+this.session);

    var url = this.request.url;

    var getId = url.replace("/movie/", "");
    var relId = ObjectID(getId);

    var openid = this.session.openid;
    var name = this.session.name;

    //var userOpenId = weiUsername.weixinUser.userCheck;
    var openID = weiUsername.weixinUser.openID
    //
    console.log("ko "+openid)
    //
    var doc = {};
    var status = {}
    var votes = 0
    //var regUesr = {}

    //weiUser.findOpenId(regUesr, function(err, datas) {
    //    if(err) {
    //        datas = {}
    //    }
    //})

    var length = 0;
    weiUser.findAll(getId ,function(err, docs, len) {
        if(err) {
            data = {}
        }
        doc = docs
        length = len
        weiUser.findVotes(openid, function(err, vote) {
            if(err) {
                console.log(err)
            }
            console.log("votes"+ vote)
            votes = vote
            console.log("votes"+ votes)
        })
    });

    weiUser.findStatus(relId, function(err, docs) {
        if(err) {
            docs = {}
        }
        status = docs
    })


    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    // console.log(this.req.url)
    // console.log(weiUsername.name);
    var that = this

    // console.log(doc)
    // var length = doc.length;

    that.body = ejs.render(index.tpl24, {
        title: "参赛",
        data: doc,
        len: length,
        openID: openid,
        statuss: status,
        vote: votes
    })
});

//请求文件提交的页面;
api.get('/profiles/:id' ,function *(){


    var url = this.request.url;
    var getId = url.replace("/profiles/", "");
    //var relId = ObjectID(getId);

    //var openid = this.session.openid;
    //
    //var doc = {};
    //
    //weiUser.findOpen(openid, function(err,docs) {
    //    if(err) {
    //        console.log(err)
    //    }
    //    doc = docs;
    //})

    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    this.body = ejs.render(index.tpl3 , {

        getId: getId

    });

});


api.get('/wx_login', function *() {

    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    //var openid = "wxd58fb049ed02ac45";
    var redirect = "http://martin.s1.758kongbao.com/list";
    var openid = this.session.openid;
    console.log(openid)

    var appid = 'wxd58fb049ed02ac45'
   // console.log(uuidV1());
   // var uuid = uuidV1()


    this.body = ejs.render(index.tpl19);
});


//请求查看排名的页面;
api.get('/progress/:id' ,function *(){

    var arr = [];
    var pro = [];
    var saveArr = []
    var len = 0;
    var url = this.request.url;
    var getId = url.replace("/progress/", "");

    var relId = ObjectID(getId);

    weiUser.findRank(relId, function(err, docs, doc) {
        if(err) {
            console.log(err)
        }

       if(doc) {
           //for(var i = 0; i < docs.length; i++) {
           //    arr[i] = docs[i];
           //}

           try {
               for (var i = 0; i < doc.length; i++) {
                   arr[i] = doc[i]
               }
           }catch(err){
               console.log(err)
           }

           try {

               len = arr.length;
               for (var i = 0; i < arr.length - 1; i++) {
                   for (var j = i + 1; j < arr.length; j++) {
                       if (arr[i].PV < arr[j].PV) {
                           var rank = arr[i];
                           arr[i] = arr[j];
                           arr[j] = rank;
                       }
                   }
               }
               console.log(arr)
               for (var i = 0; i < arr.length; i++) {
                   saveArr.push(pro[i])

               }
           }catch(err){
               console.log(err)
           }
           weiUser.saveSuccess(saveArr, function(err) {
               if(err) {
                   console.log(err)
               }
           })

       }
    })


    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)



    this.body = ejs.render(index.tpl25, {
        data: arr,
        len: len
    });

});

//参赛小组报名页面;MP_verify_dFqk7Kh6RcABps5Y

api.get('/expenses', function *(){

    var openid = this.session.openid;
    var r1=Math.floor(Math.random()*9+1);//产生2个0-9的随机数
    var r2=Math.floor(Math.random()*9+1);
    //   var now = System.currentTimeMillis();//一个13位的时间戳
    var now = Date.parse(new Date());
    var out_trade_no = r1.toString() + r2.toString() + now.toString()// 订单ID

    if(openid) {

        console.log("bussiness" + openid)
        var wechatApi = new Wechat(config.wechat);
        var data = yield wechatApi.fetchAccessToken();
        console.log(data)
        var access_token = data.access_token
        var ticketdata = yield wechatApi.fetchTicket(access_token);
        console.log(ticketdata)
        var ticket = ticketdata.ticket
        console.log(ticket);
        var url = this.href.replace(':8000', '');

        console.log(ticket);
        console.log(url);
        var params = sign(ticket, url);
        console.log("...........")
        console.log(params.noncestr)
        console.log(params.timestamp)
        console.log(params.signature)


        this.body = ejs.render(index.tpl4, {
            openid: openid,
            out_trade_no: out_trade_no,
            nonceStr: params.noncestr,
            timestamp: params.timestamp,
            signature: params.signature

        });
    }else{
        this.redirect('/reg')
    }


});

//设置个人信息
api.get('/setInfor', function *(){

    var openid = this.session.openid;
    var sataus = "true"
    var doc = {}

    if(openid) {

        weiUser.checkStaInfor(openid, function (err, docs) {
            if(err) {
                console.log(err)
            }

           doc = docs;

            if(docs == null) {
                sataus = "false"
            }
        })

        var wechatApi = new Wechat(config.wechat)
        var data = yield wechatApi.fetchAccessToken();
        console.log(data)
        var access_token = data.access_token
        var ticketdata = yield wechatApi.fetchTicket(access_token);
        console.log(ticketdata)
        var ticket = ticketdata.ticket
        console.log(ticket);
        var url = this.href.replace(':8000', '');

        console.log(ticket);
        console.log(url);
        var params = sign(ticket, url);
        console.log("...........")
        console.log(params.noncestr)
        console.log(params.timestamp)
        console.log(params.signature)

        console.log(this.request.url)

        this.body = ejs.render(index.tpl7,{
            status: sataus,
            doc: doc
        });

    }else{
        this.redirect('/reg')
    }

});

//修改个人信息
api.post('/updateInfor', function *(){

    var openid = this.session.openid;
    var data = this.request.body


    weiUser.updateStaInfor(openid, data, function(err) {
        if(err) console.log(err);
    })

        var wechatApi = new Wechat(config.wechat)
        var data = yield wechatApi.fetchAccessToken();
        console.log(data)
        var access_token = data.access_token
        var ticketdata = yield wechatApi.fetchTicket(access_token);
        console.log(ticketdata)
        var ticket = ticketdata.ticket
        console.log(ticket);
        var url = this.href.replace(':8000', '');

        console.log(ticket);
        console.log(url);
        var params = sign(ticket, url);
        console.log("...........")
        console.log(params.noncestr)
        console.log(params.timestamp)
        console.log(params.signature)

        console.log(this.request.url)

      this.redirect("/setInfor")


});

//查询报销信息
api.get('/checkPay', function *(){

    var openid = this.session.openid;
    var doc = {}
    var len = 0

    if(openid) {

        weiUser.checkpay(openid , function(err, docs) {
            if(err) console.log(err);

            doc = docs
            if(doc == null) {

            }else{
                len = docs.materialInfor.length;

            }

        })
        var wechatApi = new Wechat(config.wechat)
        var data = yield wechatApi.fetchAccessToken();
        console.log(data)
        var access_token = data.access_token
        var ticketdata = yield wechatApi.fetchTicket(access_token);
        console.log(ticketdata)
        var ticket = ticketdata.ticket
        console.log(ticket);
        var url = this.href.replace(':8000', '');

        console.log(ticket);
        console.log(url);
        var params = sign(ticket, url);
        console.log("...........")
        console.log(params.noncestr)
        console.log(params.timestamp)
        console.log(params.signature)

        console.log(this.request.url)

        this.body = ejs.render(index.tpl8, {
            doc: doc,
            len: len
        });

    }else{
        this.redirect('/reg')
    }

});
api.post('/setInformation', function *(){

        var data = this.request.body;

        var openid = this.session.openid;

        weiUser.saveStaInfor(openid, data, function (err) {
            if(err) {
                console.log(err)
            }
        })
        var wechatApi = new Wechat(config.wechat)
        var data = yield wechatApi.fetchAccessToken();
        console.log(data)
        var access_token = data.access_token
        var ticketdata = yield wechatApi.fetchTicket(access_token);
        console.log(ticketdata)
        var ticket = ticketdata.ticket
        console.log(ticket);
        var url = this.href.replace(':8000', '');

        console.log(ticket);
        console.log(url);
        var params = sign(ticket, url);
        console.log("...........")
        console.log(params.noncestr)
        console.log(params.timestamp)
        console.log(params.signature)

        console.log(this.request.url)

       this.redirect("/setInfor")



});

api.get('/result', function *(){
    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    console.log(this.request.url)

    this.body = ejs.render(index.tpl4 , {
        title: "投票成功,你的唯一一次投票次数已使用"
    });

});

api.get('/restart', function *(){
    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    console.log(this.request.url)

    this.body = ejs.render(index.tpl17 , {
        title: "投票次数已使用"
    });

});

//修改赛事的状态控制报名,和statues一起使用
api.get('/status2', function *(){
    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    console.log(this.request.url)

    this.body = ejs.render(index.tpl15);

});


//审核提交作品
api.get('/checkAllwork', function *(){

    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    console.log(this.request.url)

    this.body = ejs.render(index.tpl42);

});

api.post('/checkAllwork', function *(){

    var data = this.request.body;

    var projectId = data.projectID;
    var relId = ObjectID(projectId);

    weiUser.checkwork(relId ,data, function(err) {
        if(err) {
            console.log(err)
        }
    })

    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    console.log(this.request.url)

     this.redirect("/checkAllwork");
});


//审核管理员状态
api.get('/managers', function *(){
    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    console.log(this.request.url)

    this.body = ejs.render(index.tpl36);

});

api.post('/managers', function *(){

    var data = this.request.body;

   weiUser.updateManager(data, function(err) {
       if(err) {
           console.log(err)
       }
   })

    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    console.log(this.request.url)

    this.redirect("/managers");

});

//控制排名
api.get('/status3', function *(){
    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    console.log(this.request.url)

    this.body = ejs.render(index.tpl26);

});

//提交文件后,显示等待审核的页面;
api.get('/check', function *(){

    var openid = this.session.openid;

    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = data.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    console.log(this.request.url)

    this.body = ejs.render(index.tpl10 , {
        title: "报销申请提交成功",
        openid: openid
    });
});


api.get('/checkInformation', function *(){
    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = data.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    console.log(this.request.url)

    this.body = ejs.render(index.tpl22 , {
        title: "提交成功,等待审核结果"

    });
});


// 添加赛事页面
api.get('/inputList', function *(){

    var schools = {}
    var len = 0;

    weiUser.findSchool(function(err, docs, total) {
        if(err) {
            console.log(err)
        }
        schools = docs;
        len = total;
    })

    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    console.log(this.request.url)

    this.body = ejs.render(index.tpl6, {
        schoolList: schools,
        len: len
    });

});

// 请求审核的页面;
api.get('/checkPro', function *(){

    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    console.log(this.request.url)

    this.body = ejs.render(index.tpl11);

});


api.get('/alstatus/:id', function *(){

    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    console.log(this.request.url)

    this.body = ejs.render(index.tpl12);

});
//
//api.get('/lookProfiles/:id', function *(){
//
//    var url = this.request.url;
//    var getName = url.replace("/lookProfiles/", "");
//
//    var wechatApi = new Wechat(config.wechat)
//    var data = yield wechatApi.fetchAccessToken();
//    console.log(data)
//    var access_token = data.access_token
//    var ticketdata = yield wechatApi.fetchTicket(access_token);
//    console.log(ticketdata)
//    var ticket = ticketdata.ticket
//    console.log(ticket);
//    var url = this.href.replace(':8000','');
//
//    console.log(ticket);
//    console.log(url);
//    var params = sign(ticket ,url);
//    console.log("...........")
//    console.log(params.noncestr)
//    console.log(params.timestamp)
//    console.log(params.signature)
//
//    console.log(this.request.url)
//
//    this.body = ejs.render(index.tpl6);
//
//});

//显示参赛队伍的详情
api.get('/movie/userproject/:id/:userId', function *(){


    var rel = /\/(\w{5})\/(\w{11})\/(\w{24})/g;

    var link = '?plg_nld=1&plg_uin=1&plg_auth=1&plg_nld=1&plg_usr=1&plg_vkey=1&plg_dev=1';


    var url = this.request.url;

    // console.log(url);

    var url2 = url.match(rel);

    var GetId = url2[0].replace("/movie/userproject/", "");

    var relId = ObjectID(GetId);

    var getuserId = url.replace(url2[0] + "/", "");

    //console.log(getuserId)
    //console.log(relId)

    var doc = {};

    weiUser.findYoufile(relId, getuserId, function(err, docs) {
        if(err) {
            console.log(err)
        }
        console.log(docs)
        doc = docs
    })

    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    console.log(this.request.url)

    this.body = ejs.render(index.tpl8, {
        data: doc,
        link: link
    });

});

//显示所有赛事页面;
api.get('/list',function *(){

    var url = this.request.url;
    var url1 = url.replace("/list?code=", "");
    var counts  = 0;
    var getCode = url1.replace("&state=", "")
    var wechatApi = new Wechat(config.wechat)

    console.log("getCode "+getCode)

    //weiUsername.weixinUser.code = getCode
    this.session.mycode = getCode
    console.log(" mycode"+this.session.mycode);

    //var sessionID = this.request.url.query;
    //console.log(sessionID);
    var openid = this.session.openid;
    var gcode = this.session.mycode;

   // var openID = weiUsername.weixinUser.openID
    //if(openID) {
    //    weiUser.savecode(getCode, openID, function(err) {
    //        if(err) {
    //            console.log(err)
    //        }
    //    });
    //
    //    console.log(this.session)
    //    session.count = session.count || 0;
    //    session.count++;
    //
    //    console.log("no" + openID);
    //    var wechatApi = new Wechat(config.wechat);
    //
    //
    //    var openids = [
    //        {
    //            openid: openID,
    //            lang: 'en'
    //        }
    //    ]
    //    var users = yield  wechatApi.batchfetchuser(openids)
    //    console.log(users.user_info_list[0]);
    //
    //    this.session.openid = users.user_info_list[0].openid;
    //    this.session.name = users.user_info_list[0].nickname;
    //
    //}else{
    //
    //
    //  var openid = this.session.openid
    //  var name = this.session.name
    //
    //    weiUser.savecode(getCode, openID, function(err) {
    //        if(err) {
    //            console.log(err)
    //        }
    //    });
    //    console.log("seat" + openid);
    //    var wechatApi = new Wechat(config.wechat);
    //
    //
    //    var openids = [
    //        {
    //            openid: openid,
    //            lang: 'en'
    //        }
    //    ]
    //    var users = yield  wechatApi.batchfetchuser(openids)
    //   // console.log(users.user_info_list[0]);
    //
    //
    //}

    if(this.session.openid) {
        weiUser.savecode(gcode, openid, function(err) {
            if(err) {
                console.log(err)
            }
        });
    //console.log(this.session.name);
    //console.log(this.session.openid);

   // var checkOpenid = this.session.openid;
   // var information = users.user_info_list[0]


    var doc = {}
    var lenIt = 0;
   // var leni = 0;
    var singDoc = {}

    //weiUser.findOpenid(function (err, docs, total) {
    //    if(err) {
    //        console.log(err)
    //    }
    //    leni = total;
    //    singDoc = docs;
    //})


    weiUser.findList(function(err, docs ,total) {
        if(err) {
            console.log(err)
        }
        doc = docs
        lenIt = total


    })

    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    console.log(this.request.url)




     //this.redirect("/Getcode");
    this.body = ejs.render(index.tpl23, {
        data: doc,
        len: lenIt
    });
    }else {
        this.redirect("/reg")
    }
});


//判断排名状态

api.get('/rank/:projectId', function*(){

    var status = '';


    var getUrl = this.request.url;

   // console.log(getUrl)

    var getId = getUrl.replace('/rank/', "");

    var relId = ObjectID(getId);

    weiUser.rank(relId, function(err, docs) {
        if(err) {
            console.log(err)
        }
       // console.log(docs)
        try {
            status = docs.status
        }catch(err){
            console.log(err)
        }
    })


    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');
    //
    //console.log(ticket);
    //console.log(url);
    var params = sign(ticket ,url);
    //console.log("...........")
    //console.log(params.noncestr)
    //console.log(params.timestamp)
    //console.log(params.signature)
    //
    //console.log(this.request.url)


    //var mycode = '';
    //
    //if(this.session.code.length>1) {
    //    mycode = this.session.code
    //}else {
    //    mycode = null;
    //}

    this.body = {status1 : status}

})

//更新文件
api.get('/updatePro',function *(){

    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    console.log(this.request.url)

    this.body = ejs.render(index.tpl14);

});


//后台
api.get('/Mwechat',function *(){

    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    console.log(this.request.url)

    this.body = ejs.render(index.tpl46);

});

//申请院校管理员权限
api.get('/premission',function *(){
    var openid = this.session.openid
   // var wechatApi = new Wechat(config.wechat)
    if(this.session.openid) {
    var schoolList = {};
    var workList = {};
    var  len1 = 0;
    var len2 = 0;
    var status = ""


    var wechatApi = new Wechat(config.wechat);
    //
    //var openID = weiUsername.weixinUser.openID
    //
    //var openids = [
    //    {
    //        openid: openID,
    //        lang: 'en'
    //    }
    //]
    //var users = yield  wechatApi.batchfetchuser(openids)
    //
    //this.session.openid = users.user_info_list[0].openid;
    //this.session.name = users.user_info_list[0].nickname;




    console.log("nihao" + openid)

    weiUser.findOpen(openid, function(err, docs) {
        if(err) {
            console.log(docs)
        }
        weiUser.findManagers(docs.school, function(err, index) {
             if(err) {
                 console.log(err)
             }
            status = index
        })
        weiUser.findSchool(function(err, docs ,total) {
            if(err) {
                console.log(err)
            }
            schoolList = docs;
            //console.log("hellp")
            len1 = total
        })

        weiUser.findWork(function(err, docs , total2) {
            if(err) {
                console.log(err)
            }
            workList = docs
            len2 = total2
        })
    })

    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    console.log(this.request.url)

    console.log(status)
   // console.log(schoolList)

    this.body = ejs.render(index.tpl18, {
        schoolList: schoolList,
        workList: workList,
        len1 : len1,
        len2: len2,
        status: status
    });
    }else {
        this.redirect("/reg")
    }
});

api.post('/premission',function *(){

     var data = this.request.body;

     var openid = this.session.openid;
    console.log(openid)

    weiUser.saveManagers(openid, data, function(err, toatl) {
        if(err) {
            console.log(err)
        }
    })

    var wechatApi = new Wechat(config.wechat)

    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    console.log(this.request.url)

    this.redirect('/AllList')

});



// 管理赛事
api.get('/Mancontest',function *(){

    var that = this;

    if(this.session.openid) {
        that.openid = this.session.openid;
        that.indexPro = "false"

        weiUser.ManagerPress(that.openid, function(err, index2) {
            if(err) {
                console.log(err)
            }
            that.indexPro = index2
            console.log("ManagerPress123"+index2);
        })

        var wechatApi = new Wechat(config.wechat)
        var data = yield wechatApi.fetchAccessToken();
        console.log(data)
        var access_token = data.access_token
        var ticketdata = yield wechatApi.fetchTicket(access_token);
        console.log(ticketdata)
        var ticket = ticketdata.ticket
        console.log(ticket);
        var url = this.href.replace(':8000','');

        console.log(ticket);
        console.log(url);
        var params = sign(ticket ,url);
        console.log("...........")
        console.log(params.noncestr)
        console.log(params.timestamp)
        console.log(params.signature)

        console.log(that.openid)


        console.log("ManagerPress"+that.indexPro);
        console.log("ManagerPress"+that.openid);

        if(that.indexPro == "false" || that.indexPro == false) {
            this.body = ejs.render(index.tpl47);
        }else{
            this.body = ejs.render(index.tpl46);
        }
    }else {
        this.redirect("/reg")
    }
});

// 增加学校接口 schoolList
api.get('/companyList',function *(){

    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    console.log(this.request.url)

    this.body = ejs.render(index.tpl33);

});


api.post('/companys',function *(){


   var data = this.request.body;

    var openid = this.session.openid;
    var company = data.company

    console.log(openid);

    console.log(company)

   weiUser.insertCompany(company, openid, function(err) {
       if(err) {
           console.log(err)
       }
   })

    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    console.log(this.request.url)

    this.redirect("/notice")

});
//增加职位接口

api.get('/workList',function *(){

    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    console.log(this.request.url)

    this.body = ejs.render(index.tpl34);

});


// 联系我们


api.get('/contactUs',function *(){

    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    console.log(this.request.url)

    this.body = ejs.render(index.tpl45);

});
//在途信息

api.get('/roadInfor',function *(){

    var openid = this.session.openid;
    var roadStatus = "" ;

    var doc = {}
    var docs = {}
    var len = 0

    if(openid) {

     weiUser.findRoad(openid, function(err, docs0) {
         if(err) {
             console.log(err)
         }

         doc = docs0
         weiUser.checkRoad(openid, function(err, docs1) {
             if(err) {
                 console.log(err)
             }
             roadStatus = docs1.roadInfor;


         })

         weiUser.AllRoad(function(err, docs2, total) {
             if(err) {
                 console.log(err)
             }
             docs = docs2;
             len = total

         })
     })



    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)


    this.body = ejs.render(index.tpl37, {
        roadInfor: roadStatus,
        doc: doc,
        docs: docs,
        len: len,
        nonceStr: params.noncestr,
        timestamp: params.timestamp,
        signature: params.signature

    });



    }else{
        this.redirect('/reg')
    }

});

//结束行程

api.post('/endRoad',function *(){

    var openid = this.session.openid;

    weiUser.endRoad(openid, function (err) {
        if(err) {
            console.log(err)
        }
    })

    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    this.redirect("/roadInfor")

});

//确认收款

api.post('/payee',function *(){

    var openid = this.session.openid;

    var data = this.request.body;

    weiUser.payee(openid, data, function (err) {
        if(err) console.log(err);
    })

    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    this.redirect("/checkPay")

});

api.post('/roadSub',function *(){


    var data = this.request.body;

    var openid = this.session.openid;
    var place1 = data.place1
    var place2 = data.place2

    console.log(data)

    weiUser.saveRoad(openid, data, function(err) {
        if(err) {
            console.log(err)
        }
    })

    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    console.log(this.request.url)

    this.redirect("/roadInfor")

});

//new  所有赛事展示
api.get('/AllList',function *(){

    var that = this
    if(this.session.openid) {
        that.doc = {}
        that.lenIt = 0
        that.doc2 = {}
        that.len2 = 0
        that.youSchool ="";

        var openid = this.session.openid;
        console.log("AllList" + openid)


        weiUser.findOpen(openid, function (err, docs) {
            if (err) {
                console.log(err)
            }

            that.youSchool = docs.school;
            console.log(that.youSchool)

            weiUser.findYouSchool( that.youSchool, function (err, docs, total) {
                if (err) {
                    console.log(err)
                }

                that.len2 = total;
                that.doc2 = docs;
            })

            weiUser.findList(function (err, docs, total) {
                if (err) {
                    console.log(err)
                }
                that.doc = docs

                console.log("docs " + docs)
                that.lenIt = total

            });

        })

        var wechatApi = new Wechat(config.wechat)
        var data = yield wechatApi.fetchAccessToken();
        console.log(data)
        var access_token = data.access_token
        var ticketdata = yield wechatApi.fetchTicket(access_token);
        console.log(ticketdata)
        var ticket = ticketdata.ticket
        console.log(ticket);
        var url = this.href.replace(':8000', '');

        console.log(ticket);
        console.log(url);
        var params = sign(ticket, url);
        console.log("...........")
        console.log(params.noncestr)
        console.log(params.timestamp)
        console.log(params.signature)

        console.log(this.request.url)
       // console.log(that.doc2)

        this.body = ejs.render(index.tpl37, {
            docs: that.doc,
            len: that.lenIt,
            doc: that.doc2,
            len2: that.len2,
            school: that.youSchool
        });
    }else {
        this.redirect("/reg")
    }
});

// 作品介绍
//new  所有赛事展示
api.get('/workIntro/:_id',function *(){

    var getUrl = this.request.url;

    // console.log(getUrl)
    var name =""

    var getId = getUrl.replace('/workIntro/', "");

    var relId = ObjectID(getId);

    var doc = {}

    weiUser.findListName(relId, function(err, docs) {
         if(err) {
             console.log(err)
         }
        try{
            doc = docs;
        }catch(err) {
            console.log(err)
        }
    })


        var wechatApi = new Wechat(config.wechat)
        var data = yield wechatApi.fetchAccessToken();
        console.log(data)
        var access_token = data.access_token
        var ticketdata = yield wechatApi.fetchTicket(access_token);
        console.log(ticketdata)
        var ticket = ticketdata.ticket
        console.log(ticket);
        var url = this.href.replace(':8000', '');

        console.log(ticket);
        console.log(url);
        var params = sign(ticket, url);
        console.log("...........")
        console.log(params.noncestr)
        console.log(params.timestamp)
        console.log(params.signature)

        console.log(this.request.url)
        //console.log(doc)

        this.body = ejs.render(index.tpl44, {
            InId: getId,
            doc: doc

        });

});
// new 作品

//center 行政模块
api.get('/notice',function *(){

        var doc  = {};
        var len  = 0;

        weiUser.findNews(function (err, docs, total) {
            if(err){
                console.log(err)
            }
            doc = docs;
            len = total;
        })
        var wechatApi = new Wechat(config.wechat)
        var data = yield wechatApi.fetchAccessToken();
        console.log(data)
        var access_token = data.access_token
        var ticketdata = yield wechatApi.fetchTicket(access_token);
        console.log(ticketdata)
        var ticket = ticketdata.ticket
        console.log(ticket);
        var url = this.href.replace(':8000', '');

        console.log(ticket);
        console.log(url);
        var params = sign(ticket, url);
        console.log("...........")
        console.log(params.noncestr)
        console.log(params.timestamp)
        console.log(params.signature)

        //console.log(status)
        //console.log(doc)

            this.body = ejs.render(index.tpl41 , {
                doc: doc,
                len: len
            });


});

// 详情作品

api.get('/indexProject/:_id/:userid',function *(){

    var that = this;
    if(this.session.openid) {

      that.rel = /\/(\w{12})\/(\w{24})/g;

        var link = '?plg_nld=1&plg_uin=1&plg_auth=1&plg_nld=1&plg_usr=1&plg_vkey=1&plg_dev=1';


        that.url = this.request.url;

        // console.log(url);

        that.url2 = that.url.match(that.rel);

        that.GetId = that.url2[0].replace("/indexProject/", "");

        //console.log(GetId)


        that.relId = ObjectID(that.GetId);

        that.getuserId = that.url.replace(that.url2[0] + "/", "");

        that.openid = this.session.openid

        // console.log(getuserId)
        that.doc = {}

        that.name = ""
        that.pic = ""
        that.votes = 0;

        weiUser.findProject(that.relId, that.getuserId, function (err, docs) {
            if (err) {
                console.log(err)
            }
            //console.log(docs)
            try {
                that.doc = docs
            }catch(err){
                console.log(err)
            }
            weiUser.findListName(that.relId, function (err, docs) {
                if (err) {
                    console.log(err)
                }
                try {
                    that.name = docs.name;
                    that.pic = docs.pic
                }catch(err){
                    console.log(err)
                }

            })

            weiUser.findVotes(that.openid, function (err, vote) {
                if (err) {
                    console.log(err)
                }
                console.log("votes" + vote)
                that.votes = vote
            })
        })

        var wechatApi = new Wechat(config.wechat)
        var data = yield wechatApi.fetchAccessToken();
        console.log(data)
        var access_token = data.access_token
        var ticketdata = yield wechatApi.fetchTicket(access_token);
        console.log(ticketdata)
        var ticket = ticketdata.ticket
        console.log(ticket);
        var url = this.href.replace(':8000', '');

        console.log(ticket);
        console.log(url);
        var params = sign(ticket, url);
        console.log("...........")
        console.log(params.noncestr)
        console.log(params.timestamp)
        console.log(params.signature)



            this.body = ejs.render(index.tpl43, {
                doc: that.doc,
                proName: that.name,
                pic: that.pic,
                vote: that.votes
            });

    }
});

api.post('/companyList',function *(){

    var data = this.request.body;

    var company = data.username;

    weiUser.saveCompany(company, function(err) {
        if(err) {
            console.log(err)
        }
    })
    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    console.log(this.request.url)

    this.body = ejs.render(index.tpl33);

});

//api.get('/expense',function *(){
//
//    //var data = this.request.body;
//    //
//    //var work = data.username;
//    //
//    //weiUser.saveWork(work, function(err) {
//    //    if(err) {
//    //        console.log(err)
//    //    }
//    //})
//
//    var wechatApi = new Wechat(config.wechat)
//    var data = yield wechatApi.fetchAccessToken();
//    console.log(data)
//    var access_token = data.access_token
//    var ticketdata = yield wechatApi.fetchTicket(access_token);
//    console.log(ticketdata)
//    var ticket = ticketdata.ticket
//    console.log(ticket);
//    var url = this.href.replace(':8000','');
//
//    console.log(ticket);
//    console.log(url);
//    var params = sign(ticket ,url);
//    console.log("...........")
//    console.log(params.noncestr)
//    console.log(params.timestamp)
//    console.log(params.signature)
//
//    console.log(this.request.url)
//
//    this.body = ejs.render(index.tpl3);
//
//});


api.get('/code', function*(){

    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');
    //
    //console.log(ticket);
    //console.log(url);
    var params = sign(ticket ,url);
    //console.log("...........")
    //console.log(params.noncestr)
    //console.log(params.timestamp)
    //console.log(params.signature)
    //
    //console.log(this.request.url)
    console.log("dfdf"+this.session.code)
   // this.body = {code : "node"}
    this.body = ejs.render(index.tpl19);

})

api.get('/Getcode', function*(){

    var url = this.request.url;
    var url1 = url.replace("/Getcode?code=", "");
    var counts  = 0;
    var getCode = url1.replace("&state=", "")


        //this.session.code2 = getCode
    //}
    weiUsername.weixinUser.code = null;
    weiUsername.weixinUser.code = getCode

        var wechatApi = new Wechat(config.wechat)
        var data = yield wechatApi.fetchAccessToken();
        console.log(data)
        var access_token = data.access_token
        var ticketdata = yield wechatApi.fetchTicket(access_token);
        console.log(ticketdata)
        var ticket = ticketdata.ticket
        console.log(ticket);
        var url = this.href.replace(':8000','');
        //
        //console.log(ticket);
        //console.log(url);
        var params = sign(ticket ,url);
        //console.log("...........")
        //console.log(params.noncestr)
        //console.log(params.timestamp)
        //console.log(params.signature)
        //
        //console.log(this.request.url)

        //var mycode = '';
        //
        //if(this.session.code.length>1) {
        //    mycode = this.session.code
        //}else {
        //    mycode = null;

        console.log("nini"+ weiUsername.weixinUser.code)
        this.body = {code :  weiUsername.weixinUser.code}



  //  var wechatApi = new Wechat(config.wechat)
  //
  //  var wechatApi = new Wechat(config.wechat)
  //  var data = yield wechatApi.fetchAccessToken();
  //  console.log(data)
  //  var access_token = data.access_token
  //  var ticketdata = yield wechatApi.fetchTicket(access_token);
  //  console.log(ticketdata)
  //  var ticket = ticketdata.ticket
  //  console.log(ticket);
  //  var url = this.href.replace(':8000','');
  //  //
  //  //console.log(ticket);
  //  //console.log(url);
  //  var params = sign(ticket ,url);
  //  //console.log("...........")
  //  //console.log(params.noncestr)
  //  //console.log(params.timestamp)
  //  //console.log(params.signature)
  //  //
  //  //console.log(this.request.url)
  //
  //  //var mycode = '';
  //  //
  //  //if(this.session.code.length>1) {
  //  //    mycode = this.session.code
  //  //}else {
  //  //    mycode = null;
  //  //}
  //// var mcode = this.session.mycode
  //  console.log("dfdf"+mcode)
  //  this.body = {code : mcode}

})

api.get('/getopen', function*(){


    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    var code =  weiUsername.weixinUser.code;
    var getOpenData  = yield  wechatApi.getinformations(code);

    console.log(getOpenData);
    weiUsername.weixinUser.code = null
    this.session.openid = getOpenData.openid;
   // this.session.code = weiUsername.weixinUser.code;

    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');
    //
    //console.log(ticket);
    //console.log(url);
    var params = sign(ticket ,url);
    //console.log("...........")
    //console.log(params.noncestr)
    //console.log(params.timestamp)
    //console.log(params.signature)
    //
    //console.log(this.request.url)
    console.log("dfdf"+ getOpenData.openid)
    console.log("dfdf"+ this.session.code )
    console.log("dfdf"+ this.session.openid )

    this.body = {code : this.session.openid}

})



api.get('/WebPage', function*(){

    var doc = {};
    var openidUser = this.session.openid;
   weiUser.findOpen(openidUser, function(err,docs) {
       if(err) {
          console.log(err)
        }
       doc = docs;
   })

    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();

    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    var params = sign(ticket ,url);
    console.log("my" + this.session.openid)

   // console.log(" session" +this.session.openid);
    this.body = ejs.render(index.tpl28,{
        openid: this.session.openid,
        docs: doc
    });

})


api.post('/postProfile', function*(){

    var getInfors = this.request.body;

    var projectName = getInfors.projectName;
    var getopenid = getInfors.getOpenid;

    console.log("project "+ projectName)
    console.log("project "+ getopenid)

    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');
    var params = sign(ticket ,url);

    this.redirect('/profiles/'+projectName)

})

api.post('/getCheckLogin', function*(){



    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    console.log(this.request.url)


})


//显示所有赛事,
api.get('/allProjects',function *(){

    var doc = {};
    var len = 0 ;
    weiUser.findSuccess(function(err, docs, total) {
        if(err) {
            console.log(err)
        }
       // console.log("node " +docs)
        doc = docs
        len = total
    })

    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    console.log(this.request.url)

    this.body = ejs.render(index.tpl16, {
        data: doc,
        len: len
    });

});


//显示我的赛事
api.get('/myContest',function *(){

  if (this.session.openid) {
      var docs = {};
      var total = 0;
      var Pic = ''

      var checkOpenid = this.session.openid;

      // console.log("checkOpenid"+ checkOpenid)

      weiUser.findContest(checkOpenid, function (err, arr) {
          if (err) {
              console.log(err)
          }
          ///console.log(docs)
          total = arr.length;

          docs = arr

          console.log(total)
          console.log(arr)

      })

      weiUser.findContestPic(checkOpenid, function (err, pic) {
          if (err) {
              console.log(err)
          }

          Pic = pic

          console.log(Pic)
      })

      var wechatApi = new Wechat(config.wechat)
      var data = yield wechatApi.fetchAccessToken();
      console.log(data)
      var access_token = data.access_token
      var ticketdata = yield wechatApi.fetchTicket(access_token);
      console.log(ticketdata)
      var ticket = ticketdata.ticket
      console.log(ticket);
      var url = this.href.replace(':8000', '');

      console.log(ticket);
      console.log(url);
      var params = sign(ticket, url);
      console.log("...........")
      console.log(params.noncestr)
      console.log(params.timestamp)
      console.log(params.signature)

      console.log(this.request.url)

      this.body = ejs.render(index.tpl31, {
          data: docs,
          len: total,
          pic: Pic
      });
  }else {
      this.redirect("/reg")
  }

});

//显示所有这个赛事下的参赛人员
api.get('/shows/:id/:userId', function *(){


    var rel = /\/(\w{5})\/(\w{24})/g;

    var url = this.request.url;
    console.log(url);

    var gets = url.match(rel)

   // console.log("nnnn "+gets[0]);

    var getUserId = url.replace(gets[0]+"/", "");

    var url1 = url.replace("/shows/", "");

    var getindex = url1.replace("/"+getUserId, "" );

    console.log(getindex);
    //
    //var relId = ObjectID(getindex)
    ////
    //console.log(relId)
    //
    var doc = {};

    weiUser.userIndex(getindex , getUserId ,function(err, docs) {
        if(err) {
            data = {}
        }
        doc = docs
    });

    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)


    this.body = ejs.render(index.tpl30 , {
        index: getindex,
        data: doc
    });
});


//赛事回顾
api.get('/contestBack', function *(){

    if(this.session.openid) {
        var openid = this.session.openid;
        var myur = ''

        console.log("back" + this.session.openid)

        weiUser.findOpen(openid, function (err, docs) {
            if (err) {
                console.log(err)
            }
            myur = docs.Userpic;
        })

        var wechatApi = new Wechat(config.wechat)
        var data = yield wechatApi.fetchAccessToken();
        console.log(data)
        var access_token = data.access_token
        var ticketdata = yield wechatApi.fetchTicket(access_token);
        console.log(ticketdata)
        var ticket = ticketdata.ticket
        console.log(ticket);
        var url = this.href.replace(':8000', '');

        console.log(ticket);
        console.log(url);
        var params = sign(ticket, url);
        console.log("...........")
        console.log(params.noncestr)
        console.log(params.timestamp)
        console.log(params.signature)

        console.log(myur)
        this.body = ejs.render(index.tpl32, {
            url: myur
        });
    }else {
        this.redirect("/reg")
    }
});

api.post('/allProjects',function *(){

});

api.post('/status2', function *(){

    var data = this.request.body;

    weiUser.updateStatus(data, function(err) {
        if(err) {
            console.log(err)
        }
    })

    this.redirect('/status2')

});



api.post('/status3', function *(){

    var data = this.request.body;

    weiUser.updateStatus2(data, function(err) {
        if(err) {
            console.log(err)
        }
    })

    this.redirect('/status3')

});



api.post('/updatePro',function *(){

    var data = this.request.body;


    console.log(data);

    weiUser.updatePro(data, function(err) {
        if(err) {
            console.log(err)
        }
    })
  this.redirect('/updatePro')

});

api.post('/inputList', function *(){


    var data = this.request.body;

    console.log(data)

    weiUser.saveMatch(data ,function(err, docs) {
        if(err) {
            console.log(err);
        }
     //console.log(docs.insertedIds[0])
    })

   // var projectId = doc.insertedIds[0];

    this.redirect('/inputList')

});

api.post('/alstatus', function *(){
    var data = this.request.body;

    var getOpenID = data.openID

    weiUser.alertStatus(getOpenID, function(err) {
        if(err) {
            console.log(err)
        }
    })
    this.redirect('/list')
});

// 审核小组报名的状态;
api.post('/checkPro', function *(){

     var data = this.request.body;

     console.log("data "+data.projectID)

     var data1 = {}
     var data2 = {}

    var projectID = data.projectID;
    var reID = ObjectID(projectID);

     weiUser.newStatus(reID ,data, function(err, docs, doc) {
         if(err) {
             console.log("33333")
             console.log(err)
         }

         console.log("111111")
         data1 = docs;
         data2 = doc
         console.log(data1);
         weiUser.newAdd(data1, data2, data, function(err) {
             if(err) {
                 console.log(err)
             }
         })
     })



    this.redirect('/checkPro')

});

//登陆

api.get('/reg', function *(){

    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    console.log(data)
    var access_token = data.access_token
    var ticketdata = yield wechatApi.fetchTicket(access_token);
    console.log(ticketdata)
    var ticket = ticketdata.ticket
    console.log(ticket);
    var url = this.href.replace(':8000','');

    console.log(ticket);
    console.log(url);
    var params = sign(ticket ,url);
    console.log("...........")
    console.log(params.noncestr)
    console.log(params.timestamp)
    console.log(params.signature)

    console.log(this.request.url)

    this.body = ejs.render(index.tpl39);

});



api.post('/information/:id', function*(){

    var docIndex = {};

    var openid = this.session.openid;
    var name  = this.session.name;

    console.log("hhh"+openid);
    console.log("hhh"+name);


    var url = this.request.url;
    var getConstestId = url.replace("/information/", "");
    var relId = ObjectID(getConstestId);

    //var openID = weiUsername.weixinUser.openID


    var that = this

    //weiUser.saveContest(openid, relId, function(err) {
    //    if(err) {
    //        console.log(err)
    //    }
    //})


    weiUser.findOpen(openid ,function(err, docs) {
        if(err) {
            docs = {};
        }
        //console.log("here "+docs.userCheck);
        //console.log("here "+docs.Userpic);
        //console.log("here "+docs.userId);

        docIndex = docs

        //console.log("there "+ docIndex.userCheck)
        //console.log("there "+ docIndex.Userpic)
        //console.log("there "+ docIndex.userId)


        var post = that.request.body;
        console.log(post)

        var userData = {
            username : post.username,
            capital : post.capital,
            number : post.number,
            project : post.project,
            comment : post.comment,
            school : post.school
        }


        // console.log(weiUsername.name)

        weiUser.saveInfor(userData , docIndex ,openid,name,relId ,function(err) {
            console.log("wo wo "+docIndex)
            if(err) {
                console.log(err)
            }
        })
        //weiUser.saveVotes(relId, docIndex.userCheck, docs ,function(err) {
        //    if(err) {
        //        console.log(err)
        //    }
        //})
        weiUser.saveStatus(relId , openid, function(err) {
            if(err) {
                console.log(err)
            }
        })
    })
    //this.redirect('/profiles/'+getConstestId)
    this.redirect('/checkInformation')
})

api.post('/business/:id', function*(){

    var docIndex = {};

    var openid = this.session.openid;

    console.log("hhh"+openid);



    var url = this.request.url;
    var getConstestId = url.replace("/business/", "");

    var that = this

    weiUser.findOpen(openid ,function(err, docs) {
        if(err) {
            docs = {};
        }

        docIndex = docs
        var post = that.request.body;
        console.log(post)

        var userData = {
            businessNum : post.businessNum,
            locations : post.locations,
            numbers : post.numbers,
            out_trade_no : post.out_trade_no //订单号
        }


        // console.log(weiUsername.name)
        weiUser.saveBasic(docIndex ,openid ,function(err) {

            if(err) {
                console.log(err)
            }

            weiUser.saveInfor(userData ,openid ,function(err) {

                if(err) {
                    console.log(err)
                }
            })
        })




    })
    //this.redirect('/profiles/'+getConstestId)
    this.redirect('/profiles/'+getConstestId)
})



//参赛小组提交文件页面;
api.post('/profiles/:id',function*(){

    var url = this.request.url;
    var getId = url.replace("/profiles/", ""); //报销单号
    //var relId = ObjectID(getId);



    var openid = this.session.openid;
    //var name = this.session.name;

    //console.log("openID is " + openid)


    var parts = parse(this);
    var part;
    console.log(parts);


    while ((part = yield parts)) {
        var getName = part.mimeType;
        // var getIndex = getName.replace("application/" , "");
        console.log(part)
        //console.log("...." +getIndex);
        //if(getIndex == 'pdf') {
        //    var stream = fs.createWriteStream(path.join(__dirname + '/uploads/', Math.random().toString()+ '.'+ getIndex));
        //}
        //else if(getIndex == 'vnd.ms-powerpoint') {
        //    var stream = fs.createWriteStream(path.join(__dirname + '/uploads/', Math.random().toString()+ '.ppt'));
        //}else if(getIndex == 'msword') {
        //    var stream = fs.createWriteStream(path.join(__dirname + '/uploads/', Math.random().toString()+ '.doc'));
        //}

        var stream = fs.createWriteStream(path.join(__dirname + '/uploads/', part.filename));
        var hashcode = ""

        part.pipe(stream);

        //console.log(stream.path)

        console.log('uploading %s -> %s', part.filename, stream.path);

        //var post = yield parse(this.request);
        //console.log("name "+post.name)
        //
        ////var that = this

        var profile = stream.path.replace('/Users/mac/wechat/uploads/', "");

        qiniu.conf.ACCESS_KEY = qiniuConfig.AK;
        qiniu.conf.SECRET_KEY = qiniuConfig.SK;

        var bucket = qiniuConfig.bucket;

        var key = 'weixinProject/' + getId + '/' + openid + '/' + part.filename

        function uptoken(bucket, key) {
            var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
            return putPolicy.token();
        }

//生成上传 Token
        var token = uptoken(bucket, key);

        //var target = __dirname + "/uploads/" + part.filename;
        var target = stream.path;


        console.log(target)

        uploadFile(token, key, target);

        function uploadFile(uptoken, key, localFile) {
            var extra = new qiniu.io.PutExtra();
            qiniu.io.putFile(uptoken, key, localFile, extra, function (err, ret) {
                hashCode.hashcode(target, function (data) {
                   if(data == ret.hash) {
                       console.log("上传成功")
                       console.log(ret.hash, ret.key, ret);
                   }else{
                       uploadFile(token, key, target);
                   }
                })
            });
        }


        qiniu.conf.ACCESS_KEY = qiniuConfig.AK;
        qiniu.conf.SECRET_KEY = qiniuConfig.SK;
        var qiniuUrl = 'http://7xt1fn.com1.z0.glb.clouddn.com/' + key;

        var policy = new qiniu.rs.GetPolicy();

        var downloadUrl = policy.makeRequest(qiniuUrl);
        console.log(downloadUrl);
    }

    weiUser.findYou(openid ,getId ,profile , downloadUrl ,function(err) {
        if(err) {
            console.log(err)
        }
    })

    //if(!this.request.file) {
    //    console.log("no")
    //}
    //var target = __dirname + '/uploads/'  + this.request.file.filename
    //
    //this.session.openid = null;
    //this.session.code = null;
    this.redirect('/check')


});


//koa-body 解决数据问题

var dcos = {}

api.post('/vote', function*(){

    console.log(this.request.body)

    var weiUserId = this.request.body;
    var priveteId = weiUserId.userId
    var userCheck = weiUserId.userCheck

    var projectId = ObjectID(userCheck);

  //  var openID = weiUsername.weixinUser.openID;

    var openid = this.session.openid;




    var relID =ObjectID(projectId);



    var that = this;
    weiUser.findId(priveteId, relID ,openid , function(err) {
        if(err) {
            console.log(err)
        }
        console.log("vote 成功")
    })

    this.redirect('/AllList')
})



app.use(wechat.number1(config.wechat, reply.reply));

app.listen(8080);
console.log("Listening:8080");

//var tpl = heredoc(function() {
//    /*
//    <!DOCTYPE html>
//    <html>
//      <head>
//        <title>电影 </title>
//        <meta name = "viewport" content = "initial-scale=1, maximum-scale
//        =1 , minimum-scale=1">
//      </head>
//    <body>
//        <h1>点击标题,开始录音</h1>
//        <p id = "title"></p>
//         <div id="actor"></div>
//          <div id="year"></div>
//         <div id="poster"></div>
//     <script src ="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
//        <script src="http://zeptojs.com/zepto-docs.min.js"></script>
//        <script>
//     wx.config({
//     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//     appId: 'wxd58fb049ed02ac45', // 必填，公众号的唯一标识
//     timestamp: '<%= timestamp%>', // 必填，生成签名的时间戳
//     nonceStr: '<%= noncestr%>', // 必填，生成签名的随机串
//     signature: '<%= signature%>',// 必填，签名，见附录1
//     jsApiList: [
//                 'onVoiceRecordEnd',
//                 'onMenuShareTimeline',
//                 'onMenuShareAppMessage',
//                 'onMenuShareQQ',
//                 'onMenuShareWeibo',
//                 'onMenuShareQZone',
//                 'previewImage',
//                 'startRecord',
//                 'stopRecord',
//                'translateVoice'
//
//     ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
//     });
//
//
//     wx.ready(function(){
//     wx.checkJsApi({
//     jsApiList: ['onVoiceRecordEnd'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
//     success: function(res) {
//     console.log(res)
//
//     // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
//     }
//     });
//
//     //wx.onMenuShareAppMessage({
//     //title: 'huhu', // 分享标题
//     //desc: '电影', // 分享描述
//     //link: 'http://baidu.com', // 分享链接
//     //imgUrl: '', // 分享图标
//     //type: '', // 分享类型,music、video或link，不填默认为link
//     //dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
//     //success: function () {
//     //// 用户确认分享后执行的回调函数
//     //},
//     //cancel: function () {
//     //// 用户取消分享后执行的回调函数
//     //}
//     //}
//     //);
//
//
//     var slides
//     $('#poster').on('tap',function() {
//       wx.previewImage(slides);
//     })
//
//     var isRecording =false
//
//
//     $('h1').on('tap', function() {
//
//     //wx.getNetworkType({
//     //success: function (res) {
//     //var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
//     //
//     //}
//     //});
//
//
//       if(!isRecording) {
//     isRecording=true
//      wx.startRecord({
//      cancel : function() {
//         window.alert('no')
//      }
//      })
//      return
//      }
//     isRecording =false
//     wx.stopRecord({
//     success: function(res){
//       var localID = res.localId
//     wx.translateVoice({
//             localId: localID, // 需要识别的音频的本地Id，由录音相关接口获得
//             isShowProgressTips: 1, // 默认为1，显示进度提示
//             success: function (res) {
//             var result = res.translateResult
//             window.alert(res.translateResult); // 语音识别的结果
//             console.log(res.translateResult)
//             $.ajax({
//              type: 'get',
//              url: 'https://api.douban.com/v2/movie/search?q=' + result,
//              dataType : 'jsonp',
//              jsonp : 'callback',
//              success: function(data) {
//                      var subject = data.subjects[0]
//
//                      $('#actor').html(subject.directors[0].name)
//                     $('#title').html(subject.title)
//                     $('#year').html(subject.year)
//
//                   $('#poster').html('<img src="'+ subject.images.large + '"/>')
//
//
//
//              slides = {
//                      current : subject.images.large,
//                      urls: []
//
//                   }
//                     data.subjects.forEach(function(item) {
//                       slides.urls.push(item.images.large)
//
//                     })
//
//                             //wx.onMenuShareAppMessage({
//                             //title: subject.title,
//                             //desc: '电影' + subject.title,
//                             //link: 'http://baidu.com',
//                             //imgUrl: subject.images.large ,
//                             //success: function () {
//                             //window.alert('分享成功')
//                             //},
//                             //cancel: function () {
//                             //window.alert('分享失败')
//                             //}
//                             //});
//
//
//        }
//
//             })
//     }
//     });
//     }
//     })
//     })
//     });
//
//
//        </script>
//
//    </body>
//    </html>
//    */
//})



//
//app.use(function *(next) {
//    if(this.url.indexOf('/movie') > -1) {
//        var wechatApi = new Wechat(config.wechat)
//        var data = yield wechatApi.fetchAccessToken();
//        console.log(data)
//        var access_token = data.access_token
//        var ticketdata = yield wechatApi.fetchTicket(access_token);
//        console.log(ticketdata)
//        var ticket = ticketdata.ticket
//        console.log(ticket);
//        var url = this.href.replace(':8000','');
//
//        console.log(ticket);
//        console.log(url);
//        var params = sign(ticket ,url);
//        console.log("...........")
//        console.log(params.noncestr)
//        console.log(params.timestamp)
//        console.log(params.signature)
//
//        this.body = ejs.render(tpl , params);
//
//        return next
//    }
//    yield next
//})

//app.use(function *(next) {
//    if(this.url.indexOf('/project') > -1) {
//        var wechatApi = new Wechat(config.wechat)
//        var data = yield wechatApi.fetchAccessToken();
//        console.log(data)
//        var access_token = data.access_token
//        var ticketdata = yield wechatApi.fetchTicket(access_token);
//        console.log(ticketdata)
//        var ticket = ticketdata.ticket
//        console.log(ticket);
//        var url = this.href.replace(':8000','');
//
//        console.log(ticket);
//        console.log(url);
//        var params = sign(ticket ,url);
//        console.log("...........")
//        console.log(params.noncestr)
//        console.log(params.timestamp)
//        console.log(params.signature)
//
//        this.body = ejs.render(tpl2 , params);
//
//        return next
//    }
//    yield next
//})

