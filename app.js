
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

app.keys = ['koa','weixin'];


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
    var relId = ObjectID(getId);

    var openid = this.session.openid;

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

    this.body = ejs.render(index.tpl2 , {
        projectId: relId,
        openid: openid
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


    weiUser.findRank(getId, function(err, docs, doc) {
        if(err) {
            console.log(err)
        }
       if(docs) {
           for(var i = 0; i < docs.length; i++) {
               arr[i] = docs[i];
           }
       if(doc) {
           for(var i = 0; i < doc.length; i++) {
               pro[i] = doc[i]
           }
       }
           console.log(arr);
           len = arr.length;
           for(var i = 0 ; i < arr.length-1; i++) {
               for(var j = i+1; j < arr.length; j++) {
                   if(arr.projects[i].PV < arr.projects[j].PV) {
                       var rank = arr.projects[i];
                       arr.projects[i] = arr.projects[j];
                       arr.projects[j] = rank;
                   }
               }
           }

           for(var i = 0 ; i < 3; i++) {
               saveArr.push(pro[i])
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

//参赛小组报名页面;
api.get('/information/:id', function *(){

    var getUrl = this.request.url;

    var getId = getUrl.replace('/information/', "");

    var relId = ObjectID(getId);

    var wechatApi = new Wechat(config.wechat);
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
        id: relId
    });

});




api.get('/vote/:id', function *(){

    var url = this.request.url;
    var getPrivateId = url.replace("/vote/", "");

    console.log("vote " + getPrivateId)

    var voteNumber = {};

    weiUser.findVote(getPrivateId, function(err, docs) {
        if(err) {
            console.log(err)
        }
        voteNumber = docs
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

    this.body = ejs.render(index.tpl9 , {
        data : voteNumber
    });

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
        title: "提交成功,等待审核结果"
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
        title: "提交成功,等待审核结果",
        url: "请在电脑上打开网址: http://martinbo.s1.natapp.cc/code"
    });
});


// 添加赛事页面
api.get('/inputList', function *(){
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

    this.body = ejs.render(index.tpl6);

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

    //var relId = ObjectID(GetId);

    var getuserId = url.replace(url2[0] + "/", "");

    //console.log(getuserId)
    //console.log(relId)

    var doc = {};

    weiUser.findProject(GetId, getuserId, function(err, docs) {
        if(err) {
            console.log(err)
        }
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
    console.log(getCode)

    weiUsername.weixinUser.code = getCode
   // console.log(this.session.code);

    var sessionID = this.request.url.query;
    console.log(sessionID);

    var wechat=require("./wechat/g");

    var openID = weiUsername.weixinUser.openID
    console.log(openID)
    if(openID) {
        weiUser.savecode(getCode, openID, function(err) {
            if(err) {
                console.log(err)
            }
        });

        console.log(this.session)
        session.count = session.count || 0;
        session.count++;

        console.log("no" + openID);
        var wechatApi = new Wechat(config.wechat);


        var openids = [
            {
                openid: openID,
                lang: 'en'
            }
        ]
        var users = yield  wechatApi.batchfetchuser(openids)
        console.log(users.user_info_list[0]);

        this.session.openid = users.user_info_list[0].openid;
        this.session.name = users.user_info_list[0].nickname;

    }else{


      var openid = this.session.openid
      var name = this.session.name

        weiUser.savecode(getCode, openID, function(err) {
            if(err) {
                console.log(err)
            }
        });
        console.log("seat" + openid);
        var wechatApi = new Wechat(config.wechat);


        var openids = [
            {
                openid: openid,
                lang: 'en'
            }
        ]
        var users = yield  wechatApi.batchfetchuser(openids)
        console.log(users.user_info_list[0]);


    }


    console.log(this.session.name);
    console.log(this.session.openid);

    var information = users.user_info_list[0]


    var doc = {}
    var lenIt = 0

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

    this.body = ejs.render(index.tpl23, {
        data: doc,
        len: lenIt,

    });

});


//判断排名状态

api.get('/rank/:projectId', function*(){

    var status = '';


    var getUrl = this.request.url;

   // console.log(getUrl)

    var getId = getUrl.replace('/rank/', "");

   // var relId = ObjectID(getId);

    weiUser.rank(getId, function(err, docs) {
        if(err) {
            console.log(err)
        }
       // console.log(docs)
        status = docs.status
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

api.get('/premission',function *(){

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

    this.body = ejs.render(index.tpl18);

});

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
    console.log("dfdf"+ weiUsername.weixinUser.code)

    //var mycode = '';
    //
    //if(this.session.code.length>1) {
    //    mycode = this.session.code
    //}else {
    //    mycode = null;
    //}

    this.body = {code : weiUsername.weixinUser.code}

})

api.get('/getopen', function*(){


    var wechatApi = new Wechat(config.wechat)
    var data = yield wechatApi.fetchAccessToken();
    var getOpenData  = yield  wechatApi.getinformations();

    console.log(getOpenData);
    this.session.code = weiUsername.weixinUser.code;
    weiUsername.weixinUser.code = null
    this.session.openid = getOpenData.openid;

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
    this.body = ejs.render(index.tpl21,{
        openid: this.session.openid
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


    this.body = ejs.render(index.tpl5 , {
        index: getindex,
        data: doc
    });
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


api.post('/information/:id', function*(){

    var docIndex = {};

    var openid = this.session.openid;
    var name  = this.session.name;

    console.log("hhh"+openid);
    console.log("hhh"+name);


    var url = this.request.url;
    var getConstestId = url.replace("/information/", "");
    var relId = ObjectID(getConstestId);

    var openID = weiUsername.weixinUser.openID

    console.log("infof" + openID)
    var that = this

    weiUser.findOpen(openID ,function(err, docs) {
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
            comment : post.comment
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

    //var userOpenId = weiUsername.weixinUser.userCheck;
    //
    //console.log(userOpenId)

    //console.log(docIndex)

    //console.log(docIndex)
    //
    //var privateInfor = {}
    //
    //privateInfor.identifyUser = docIndex.userId
    //privateInfor._id = docIndex._id
    //privateInfor.Userpic = docIndex.Userpic
    //privateInfor.userCheck = docIndex.userCheck
    //
    //
    //console.log(privateInfor)
    //
    //console.log(docIndex)


    //this.redirect('/profiles/'+getConstestId)
    this.redirect('/checkInformation')
})



//参赛小组提交文件页面;
api.post('/profiles/:id',function*(){

    var url = this.request.url;
    var getId = url.replace("/profiles/", "");
    var relId = ObjectID(getId);




    var openID = weiUsername.weixinUser.openID

    var openid = this.session.openid;
    //var name = this.session.name;

    console.log("openID is " + openid)


    var parts = parse(this);
    var part;
    console.log(parts);



    while (part = yield parts) {
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


        part.pipe(stream);

        //console.log(stream.path)

        console.log('uploading %s -> %s', part.filename, stream.path);



        //var post = yield parse(this.request);
        //console.log("name "+post.name)
        //
        ////var that = this

    var profile = stream.path.replace('/Users/mac/wechat/uploads/',"");

    qiniu.conf.ACCESS_KEY = qiniuConfig.AK;
    qiniu.conf.SECRET_KEY = qiniuConfig.SK;

    var bucket = qiniuConfig.bucket;

    var key = 'weixinProject/'+ getId +'/' + openid + '/' +  part.filename

    function uptoken(bucket, key) {
        var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
        return putPolicy.token();
    }

//生成上传 Token
    var token = uptoken(bucket, key);


    function uploadFile(uptoken, key, localFile) {
        var extra = new qiniu.io.PutExtra();
        qiniu.io.putFile(uptoken, key, localFile, extra, function (err, ret) {
            if (!err) {
               console.log("上传成功")
            }else{
                console.log("fail")
            }
        });
    }

    var target = __dirname + "/uploads/" +  part.filename;

        console.log(target)

    uploadFile(token, key, target);

        qiniu.conf.ACCESS_KEY = qiniuConfig.AK;
        qiniu.conf.SECRET_KEY = qiniuConfig.SK;
    var qiniuUrl = 'http://7xt1fn.com1.z0.glb.clouddn.com/' + key;

    var policy = new qiniu.rs.GetPolicy();

    var downloadUrl = policy.makeRequest(qiniuUrl);
    console.log(downloadUrl);
    }
    //weiUser.saveFile(profile , weiUsername.name ,function(err) {
    //    if(err) {
    //        console.log(err)
    //    }
    //})

    //unoconv.convert('第十一批赴美学生行前辅导会.ppt' , 'pdf', function (err, result) {
    //    // result is returned as a Buffer
    //    fs.writeFile('converted.pdf', result);
    //    console.log("result" + result)
    //});

    //var userCheck = weiUsername.weixinUser.openID
    //
    //var doc = {}



    //weiUser.findOpen(openid ,function(err, docs) {
    //    if (err) {
    //        docs = {};
    //    }
    //    doc = docs;
    //
    //    weiUser.findYou(relId, openid , doc , profile , downloadUrl ,function(err) {
    //        if(err) {
    //            console.log(err)
    //        }
    //    })
    //});

    weiUser.findYou(openid ,relId ,profile , downloadUrl ,function(err) {
        if(err) {
            console.log(err)
        }
    })

    //if(!this.request.file) {
    //    console.log("no")
    //}
    //var target = __dirname + '/uploads/'  + this.request.file.filename

    this.session.openid = null;
    this.session.code = null;
    this.redirect('/check')
});


//koa-body 解决数据问题

var dcos = {}

api.post('/vote', function*(){

    console.log(this.request.body)
    var Uid = this.request.userId;
    console.log(Uid)

    var weiUserId = this.request.body;
    var priveteId = weiUserId.userId
    var userCheck = weiUserId.userCheck

    var projectId = ObjectID(userCheck);

  //  var openID = weiUsername.weixinUser.openID;

    var openid = this.session.openid;

    console.log("vote"+ openid)


    var relID =ObjectID(projectId);



    var that = this;
    weiUser.findId(priveteId, userCheck ,openid , function(err) {
        if(err) {
            console.log(err)
        }
        console.log("vote 成功")
    })

    this.redirect('/list')
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

