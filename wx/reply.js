'use strict'
var Koa=require("koa");
var config = require('../confige');
var Wechat = require('../wechat/wechat')
var menu = require('./menu')
var wechatApi = new Wechat(config.wechat)
var fs = require('fs');
var path = require('path');
var weiUser = require('../models/projects');
var User = require('../models/infor');
var request = require('request');

var mongo = require('./mongodb');



//app.use(session({
//    store: sessionStore.create(),
//    collection: 'sessions',
//    connection: mongo,
//    expires: 30 * 60 * 1000,
//    model: 'KoaSession'
//}));



//var Koa=require("koa");
//var router = require('koa-router')
//var app = new Koa();
//
//var api = router();
//app
//    .use(api.routes())
//    .use(api.allowedMethods());

//var userInfor = {
//    pic : '',
//    Id: null
//}
//
//module.exports = userInfor;


wechatApi.deletemenu().then(function(){
   return wechatApi.createMenu(menu)
})
    .then(function(msg) {
        console.log(msg)
    })

var filepath = {
    jpg2:path.join(__dirname,'../2.jpg'),
    video:path.join(__dirname,'../ll.mp4'),
     music:path.join(__dirname,'../node.mp3')
};

exports.reply = function* (next){

    var message = this.weixin;


    var user = yield  wechatApi.batchfetchuser(message.FromUserName , 'en')
    //console.log("你好"+user)


    var openids = [
        {
            openid: message.FromUserName,
            lang: 'en'
        }
    ]
    var users = yield  wechatApi.batchfetchuser(openids)

    //console.log(users.user_info_list[0].headimgurl);
    //console.log(users.user_info_list[0].openid);

    var pic = users.user_info_list[0].headimgurl;
    var userId  = users.user_info_list[0].nickname
    var userCheck  = users.user_info_list[0].openid

    this.session.openid = userCheck
    //console.log(username);


    console.log("this.session.openid  "+this.session.openid )

    if (message.MsgType === 'event') {
        if (message.Event === 'subscribe') {
            var user = yield  wechatApi.batchfetchuser(message.FromUserName , 'en')
            //console.log("你好"+user)


            var openids = [
                {
                    openid: message.FromUserName,
                    lang: 'en'
                }
            ]
            var users = yield  wechatApi.batchfetchuser(openids);


            //console.log(users.user_info_list[0].name);
            //console.log(users.user_info_list[0].openid);

            var pic = users.user_info_list[0].headimgurl;
            var userId  = users.user_info_list[0].nickname
            var userCheck  = users.user_info_list[0].openid

           // uesrOpenID = userCheck
            //console.log(username);

            console.log(userId)
          //   this.session.user = userId

            // User.weixinUser.name = userId


           // User.weixinUser.userCheck = uesrOpenID


            //weiUser.checkView(userId, function(err , docs) {
            //    if(err) {
            //        console.log(err);
            //    }
            //    if(docs !== []) {
            //        console.log("ni "+docs)
            //    }else{
            //
            //    }
            //})


            //weiUser.saveId(userId, pic , userCheck ,function(err, total) {
            //    if(err) {
            //        console.log(err)
            //    }
            //    else {
            //        console.log(total)
            //    }
            //});

                // userInfor.pic = users.user_info_list[0].headimgurl;


            if (message.EventKey) {
                console.log('扫二维码进来：' + message.EventKey + ' ' + message.Ticket)
            }
            this.body = '欢迎关注去大赛公众号,请通过以下地址设置你所在的学校' +
                         'http://martinbo.s1.natapp.cc/schools';
        }else if(message.Event === 'unsubscribe'){
            console.log('无情取关')
            User.weixinUser.name = null
            this.body = ''
        }
        else if(message.Event === 'LOCATION') {
            this.body = '你上报的位置: ' + message.Latitude +'/'
                    + message.Longitude +'-' + message.Precision
        }
        else if(message.Event === 'CLICK') {
            console.log(message.EventKey);
            this.body = '你点击的菜单' + message.EventKey
        }
        else if(message.Event === 'SCAN') {
            console.log('关注后的二维码' + message.EventKey + 'jjjjj' + message.Ticket)

            this.body = '看到了你'
        }
        else if(message.Event === 'VIEW') {

            this.body = '你点击的菜单链接: ' + message.EventKey
        }
        else if(message.Event === 'scancode_push') {
            console.log(message.ScanCodeInfo.ScanType)
            console.log(message.ScanCodeInfo.ScanResult)
            this.body = '你点击的菜单链接: ' + message.EventKey
        }
        else if(message.Event === 'scancode_waitmsg') {

            console.log(message.ScanCodeInfo.ScanType)
            console.log(message.ScanCodeInfo.ScanResult)
            this.body = '你点击的菜单链接: ' + message.EventKey
        }
        else if(message.Event === 'pic_sysphoto') {

            console.log(message.SendPicsInfo.PicList)
            console.log(message.SendPicsInfo.Count)
            this.body = '你点击的菜单链接: ' + message.EventKey

        }
        else if(message.Event === 'pic_photo_or_album') {
            console.log(message.SendPicsInfo.PicList)
            console.log(message.SendPicsInfo.Count)
            this.body = '你点击的菜单链接: '+ message.EventKey
        }
        else if(message.Event === 'pic_weixin') {

            console.log(message.SendPicsInfo.PicList)
            console.log(message.SendPicsInfo.Count)
            this.body = '你点击的菜单链接: ' + message.EventKey

        }
        else if(message.Event === 'location_select') {

            console.log(message.SendLocationInfo.Location_X)
            console.log(message.SendLocationInfo.Location_Y)
            console.log(message.SendLocationInfo.Scale)
            console.log(message.SendLocationInfo.Label)
            console.log(message.SendLocationInfo.Poiname)
            this.body = '你点击的菜单链接: ' + message.EventKey

        }

    }
    else if(message.MsgType === 'text'){
       var content = message.Content
        var reply = '你说的' + message.Content + '太浮躁了'

        if (content === '1') {
            reply = '你是大叔是坏人'
        }
        else if(content === '2') {
            reply = '你是坏人'
        }
         else if(content === '4') {
            reply = [{
                title: '技术改变世界',
                description: '还可以',
                picUrl: 'http://dn-tffimg.qbox.me/70/3b/76e/59f/775a21baf3104875f6c9a8.jpg?imageView2/1/w/660/h/347/format/png',
                url: 'http://cn.toursforfun.com/new-york-washington-dc-princeton-university-niagara-falls-8-days-tour.html?ici=home_recommand_spcecail_producets&icn=sales_promotion'

            },
                {
                    title: 'node.js开发',
                    description: 'good very',
                    picUrl: 'http://dn-tffimg.qbox.me/50/25/69a/b77/ef5b418cfdf00a5ae897fe.jpg?imageView2/1/w/660/h/347/format/png',
                    url: 'http://cn.toursforfun.com/yellowstone-mt-rushmore-grand-teton-grand-canyon-south-rim-las-vegas-los-angeles-sfo-12-day.html?ici=home_recommand_spcecail_producets&icn=sales_promotion'
                }]

        }
        else if (content === '5') {
            var data = yield wechatApi.uploadMaterial('image',filepath.jpg2)

            reply ={
                type:'image',
                mediaId: data.media_id
            };
        }
        else if (content === '6') {
            var data = yield wechatApi.uploadMaterial('video',filepath.video)

            reply ={
                type:'video',
                title: '视频',
                description: '寝室',
                mediaId: data.media_id
            };
        }
        else if (content === '7') {
            var data = yield wechatApi.uploadMaterial('image',filepath.jpg2)

            reply ={
                type:'music',
                title: '音乐',
                description: 'relax',
                musicUrl:'http://www.xiami.com/play?ids=/song/playlist/id/1792541433/object_name/default/object_id/0#loaded',
                thumbMediaId: data.media_id
            };
        }

        else if (content === '8') {
            var data = yield wechatApi.uploadMaterial('image',filepath.jpg2 , {type: 'image'})

            reply ={
                type:'image',
                mediaId: data.media_id
            };
        }

        else if (content === '9') {
            var data = yield wechatApi.uploadMaterial('video',filepath.video , {type: 'video' ,description: '{"title": "寝室", "introduction":"node"}'})

            reply ={
                type:'video',
                title: '视频',
                description: '寝室',
                mediaId: data.media_id
            };
        }

        else if (content === '10') {
            var picData = yield wechatApi.uploadMaterial('image', filepath.jpg2,{})

            var media = {
                articles: [{
                    title: 'cool',
                    thumb_media_id: picData.media_id,
                    author: 'lh',
                    digest: '没有摘要',
                    show_cover_pic: 1,
                    content: '没有内容',
                    content_source_url: 'http://github.com'
                },{
                    title: 'cool2',
                    thumb_media_id: picData.media_id,
                    author: 'lh',
                    digest: '没有摘要',
                    show_cover_pic: 1,
                    content: '没有内容',
                    content_source_url: 'http://github.com'
                }]
            }

            data = yield wechatApi.uploadMaterial('news', media, {}) //上传永久素材图文
            data = yield wechatApi.fetchMaterial(data.media_id, 'news', {}) //拿到详细信息

            console.log(data)

            var items = data.news_item
            var news = []

            items.forEach(function(item) {   //把多图文拼成回复的数组
                news.push({
                    title: item.title,
                    decription: item.digest,
                    picUrl: picData.url,
                    url: item.url
                })
            })

            reply = news
        }

        else if (content === '11') {
            var counts = yield wechatApi.countMaterial()

            console.log(JSON.stringify(counts))

            var results = yield [
                wechatApi.batchMaterial({
                    type: 'image',
                    offset:0,
                    count:10
                }),
                wechatApi.batchMaterial({
                    type: 'video',
                    offset:0,
                    count:10
                }),
                wechatApi.batchMaterial({
                    type: 'image',
                    offset:0,
                    count:10
                }),
                wechatApi.batchMaterial({
                    type: 'voice',
                    offset:0,
                    count:10
                }),
                wechatApi.batchMaterial({
                    type: 'news',
                    offset:0,
                    count:10
                }),
            ]

            console.log(JSON.stringify(results));
            reply = '1'
        }

        else if(content === '12') {
            var group = yield wechatApi.creategroup('wechat2');
            console.log(group);
            var groups = yield  wechatApi.getgroup();

            console.log("加了 wechat 后的分组列表");

            console.log(groups);

            var group2 = yield wechatApi.checkgroup(message.FromUserName)

            console.log('查看自己的分组')

            console.log(group2)

            var result = yield  wechatApi.batchmovegroup(message.FromUserName ,
            111)

            console.log('移动后的 111')
            console.log(result)

            var group3 = yield  wechatApi.getgroup();

            console.log("加了 wechat 后的分组列表");

            console.log(group3);
            //
            var group4 = yield  wechatApi.batchmovegroup([message.FromUserName],
                112)

            console.log('移动后的 112')
            console.log(group4)


            var group5 = yield  wechatApi.updategroup(116,"qwqw")

            console.log('wechat116 更新 ')
            console.log(group5)
            //
            //
            //var group6 = yield  wechatApi.getgroup();
            //
            //console.log("加了 wechat 后的分组列表");
            //
            //console.log(group6);


            //var result4 = yield wechatApi.deletegroup(102);
            //
            //console.log("shangchu")
            //
            //console.log(result4)
            //
            //var group7 = yield  wechatApi.getgroup();
            //
            //console.log("shanchu   l e ");
            //
            //console.log(group7);
            reply = 'group done'


        }

        else if(content === '13') {
          var user = yield  wechatApi.batchfetchuser(message.FromUserName , 'en')
            //console.log("你好"+user)

            var openids = [
                {
                    openid: message.FromUserName,
                    lang: 'en'
                }
            ]
            var users = yield  wechatApi.batchfetchuser(openids)
            //console.log(users.user_info_list[0].headimgurl)
            var Id  = users.user_info_list[0].openid
            console.log(users)
            reply = JSON.stringify(users)

           // reply = this.session.uss;
        }

        else if(content ==='14') {
            var usrlist = yield wechatApi.listusers()
            console.log(usrlist)

            reply = usrlist.total
        }
        else if (content === '15') {
            var mpnews = {
                media_id: 'aqvUEsHC02DwFH-sWMjHDd80bV8E-KFmaGolyDNIPXY'
            }

            var msgData = yield wechatApi.sendgroupAll('mpnews', mpnews , 111)

            console.log(msgData)

            reply = 'ok'
        }

        else if(content === '16') {
            var mpnews = {
                media_id: 'aqvUEsHC02DwFH-sWMjHDTGOS9T_zVRvY9jsaC_tfmk'
            }
            //var text = {
            //    'content' : 'hello'
            //}
            var msgData = yield wechatApi.preivemass('mpnews', mpnews ,'oouLZwsGFPrhboN3gdZbJ3V2EIiw')

            console.log(msgData)
            reply = 'ok'
        }

        else if(content === '17') {
            var mpnews = {
                //media_id: 'aqvUEsHC02DwFH-sWMjHDTGOS9T_zVRvY9jsaC_tfmk'
            }
            //var text = {
            //    'content' : 'hello'
            //}
            var msgData = yield wechatApi.chcekemass('6302574163222433656')

            console.log(msgData)
            reply = 'ok'
        }

        else if (content === '20') {
             var semanticData = {

                 "query": "node.js",
                 "city": "北京",
                 "category": "movie",
                 "uid": message.FromUserName
             }

            var _data = yield wechatApi.semantic(semanticData)

            reply = JSON.stringify(_data)
        }
  this.body = reply
     }
    yield next
}

