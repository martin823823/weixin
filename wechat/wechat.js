
//
'use strict'

var Promise=require('bluebird');
var weiUsername = require('../models/infor');
var _=require('lodash');
var request=Promise.promisify(require('request'));
var prefix='https://api.weixin.qq.com/cgi-bin/';
var fs = require('fs')
var util = require('./util');
var api={
     semanticPrefix : 'https://api.weixin.qq.com/semantic/semproxy/search?',

    accessToken:prefix+'token?grant_type=client_credential',
    temporary:  {
        upload: prefix + 'media/upload?',
        fetch: prefix + 'media/get?'

    },
   permanent: {
       upload: prefix + 'material/add_material?',
       uploadNews: prefix+ 'material/add_news?',
       uploadPic: prefix + 'media/uploadimg?',
       fetch: prefix+ 'material/get_material?',
       de_material : prefix +'material/del_material?',
       update: prefix + 'material/update_news?',
       count : prefix + 'material/get_materialcount?',
       batchget :prefix + 'material/batchget_material?'
    },
    group: {
        create: prefix + 'groups/create?',
        get: prefix + 'groups/get?',
        check: prefix +'groups/getid?',
        update: prefix + 'groups/update?',
        move: prefix +'groups/members/update?',
        batchupdate: prefix +'groups/members/batchupdate?',
        delete: prefix + 'groups/delete?'

    } ,
   user: {
       remark : prefix+ 'user/info/updateremark?',
       fetch: prefix+ 'user/info?',
       batchFetch: prefix + 'user/info/batchget?',
       list: prefix +'user/get?'
   },
    mass : {
        group : prefix +'message/mass/sendall?',
        openid: prefix + 'message/mass/send?',
        del :prefix + 'message/mass/delete?',
        preiview : prefix + 'message/mass/preview?',
       check: prefix + 'message/mass/get?'
    },
    menu : {
          create:prefix +'menu/create?',
          get: prefix +'menu/get?',
          del: prefix +'menu/delete?',
          current: prefix +'get_current_selfmenu_info?'
    },
    ticket: {
     get:  prefix + 'ticket/getticket? '
    }
 };

function Wechat(opts){
    var that = this;
    this.appID=opts.appID;
    this.appSecret=opts.appSecret;
    this.getAccessToken=opts.getAccessToken;
    this.saveAccessToken=opts.saveAccessToken;
    this.getTicket=opts.getTicket;
    this.saveTicket=opts.saveTicket;

  this.fetchAccessToken()
}
Wechat.prototype.isValidAccessToken = function(data) {
    if (!data || !data.access_token || !data.expires_in) {
        return false;
    }
    var access_token=data.access_token;
    var expires_in=data.expires_in;
    var now = (new Date().getTime());

    if (now < expires_in) {
        return true
    }else{
        return false
    }
};


Wechat.prototype.isValidTicket = function(data) {
    if (!data || !data.ticket || !data.expires_in) {
        return false;
    }
    var ticket=data.ticket;
    var expires_in=data.expires_in;
    var now = (new Date().getTime());

    if (ticket && now < expires_in) {
        return true
    }else{
        return false
    }
};

Wechat.prototype.updataAccessToken = function() {
    var appID = this.appID;
    var appsecret = this.appSecret;
    var url=api.accessToken+'&appid='+appID+'&secret='+appsecret;

    return new Promise(function(resolve,reject){
        request({url: url , json : true}).then(function(response){

            var data = response.body;

            var now = (new Date().getTime())

            var expires_in = now+(data.expires_in-20)*1000
            data.expires_in = expires_in;
            resolve(data)
        })
    })
};


Wechat.prototype.updataTicket = function(access_token) {
    var appsecret = this.appSecret;
    var url=api.ticket.get+'&access_token='+access_token+'&type=jsapi';

    return new Promise(function(resolve,reject){
        request({url: url , json : true}).then(function(response){

            var data = response.body;

            var now = (new Date().getTime())

            var expires_in = now+(data.expires_in-20)*1000
            data.expires_in = expires_in;
            resolve(data)
        })
    })
};


Wechat.prototype.getinformations = function(code) {
    var mycode =  code
    var appsecret = this.appSecret;
    var url= 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxd58fb049ed02ac45&secret=4b8fbe4c34f99bce3af9a0c5911a5bee&code='+mycode+'&grant_type=authorization_code';
    console.log("myurl "+url)
    return new Promise(function(resolve,reject){
        request({method: 'GET', url: url,json: true}).then(function (response) {
            var _data = response.body;

            if (_data) {
                resolve(_data)
            } else {
                throw new Error('???')
            }

        })
            .catch(function (err) {
                reject(err)
            })
    })
};

Wechat.prototype.getRegcode = function(code) {
    var appsecret = this.appSecret;
    var code = code
    console.log(code)
    var url= 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxd58fb049ed02ac45&secret=4b8fbe4c34f99bce3af9a0c5911a5bee&code='+code+'&grant_type=authorization_code';
    console.log("myurl "+url)
    return new Promise(function(resolve,reject){
        request({method: 'GET', url: url,json: true}).then(function (response) {
            var _data = response.body;

            if (_data) {
                resolve(_data)
            } else {
                throw new Error('???')
            }

        })
            .catch(function (err) {
                reject(err)
            })
    })
};


Wechat.prototype.fetchAccessToken = function() {
    var that = this

    //if(this.access_token&&this.expires_in) {
    //    if(this.isValidAccessToken(this)) {
    //        return Promise.resolve(this)
    //    }
    //}
    return this.getAccessToken()
        .then(function(data){
            try{
                data=JSON.parse(data);
            }
            catch(e){
                return that.updataAccessToken()
            }
            if (that.isValidAccessToken(data)) {
                return Promise.resolve(data)
            }else{
                return that.updataAccessToken()
            }
        })
        .then(function(data){

            that.saveAccessToken(data)

            return Promise.resolve(data)
        })
}


Wechat.prototype.fetchTicket = function(access_token) {
    var that = this;
    return this.getTicket()
        .then(function(data){
            try{
                data=JSON.parse(data);
            }
            catch(e){
                return that.updataTicket(access_token)
            }
            if (that.isValidTicket(data)) {
                return Promise.resolve(data)
            }else{
                return that.updataTicket(access_token)
            }
        })
        .then(function(data){

            that.saveTicket(data)

            return Promise.resolve(data)
        })
}



Wechat.prototype.fetchMaterial = function(mediaId, type, permanent) {
    var that = this
    var fetchUrl = api.temporary.fetch

    if(permanent) {
        fetchUrl = api.permanent.fetch

    }
    return new Promise(function(resolve, reject){
        that.fetchAccessToken()
            .then(function(data) {
                var url = fetchUrl + '&access_token=' + data.access_token +
                '&media_id=' + mediaId
                var form = {}
                var options = {method: 'POST', url: url, json: true}

                if(permanent) {
                    form.media_id = mediaId
                    form.access_token = data.access_token
                    options.body = form
                }
                else {
                    if (type === 'video') {
                        url = url.replace('https://', 'http://')
                    }

                    url += '&media_id=' + mediaId
                }

                if (type === 'news' || type === 'video') {
                    request(options).then(function(response) {
                        var _data = response.body

                        if(_data) {
                            resolve(_data);
                            //console.log(_data)
                        }
                        else {
                            throw new Error('Fetch material fails')
                        }
                    })
                        .catch(function(err) {
                            reject(err)
                        })
                }
                else {
                    resolve(url)     //返回url
                }

            })
    })
}

Wechat.prototype.delMaterial = function(mediaId) {
    var that= this;
    var form = {
        media_id : mediaId
    }

    return new Promise(function(resolve,reject) {
        that.fetchAccessToken()
            .then(function (data) {
                var url = api.permanent.del + 'access_token=' + data.access_token +
                    '&media_id=' + mediaId

                request({method: 'POST', url: url, body: form, json: true}).then(function (response) {
                    var _data = response.body;

                    if (_data) {
                        resolve(_data)
                    } else {
                        throw new Error('delete material fails')
                    }

                })
                    .catch(function (err) {
                        reject(err)
                    })
            })
    });
};
Wechat.prototype.uploadMaterial = function(type,material,permanent){

    var that = this
    var form = {}
    var uploadUrl = api.temporary.upload
    if (permanent){
        uploadUrl = api.permanent.upload

        _.extend(form,permanent) //继承
    }
    if (type === 'pic'){
        uploadUrl = api.permanent.uploadNewsPic
    }
    if (type === 'news'){
        uploadUrl = api.permanent.uploadNews
        form = material
    }
    else{
        form.media = fs.createReadStream(material)
    }

    return new Promise(function(resolve,reject){

        that
            .fetchAccessToken()
            .then(function(data){

                var url = uploadUrl + 'access_token=' + data.access_token

                if (!permanent){
                    url += '&type='+ type
                }
                else{
                    form.access_token = data.access_token
                }

                var options = {
                    method: 'POST',
                    url: url,
                    json: true
                }


                if (type === 'news'){
                    options.body = form
                }else{
                    options.formData = form
                }


                request(options).then(function(response){
                    var _data = response.body

                    console.log('_data')
                    console.log(_data)
                    console.log('***************')

                    if (_data){
                        resolve(_data)
                    }else{
                        throw new Error('Upload material fails')
                    }
                }).catch(function(err){
                    reject(err)
                })
            })
    })
}

Wechat.prototype.updateMaterial = function(mediaId, news) {
    var that= this;
    var form = {
        media_id : mediaId
    }
    _.extend(form,news);
    return new Promise(function(resolve,reject) {
        that.fetchAccessToken()
            .then(function (data) {
                var url = api.permanent.update + 'access_token=' + data.access_token +
                    '&media_id=' + mediaId

                request({method: 'POST', url: url, body: form, json: true}).then(function (response) {
                    var _data = response.body;

                    if (_data) {
                        resolve(_data)
                    } else {
                        throw new Error('upload material fails')
                    }

                })
                    .catch(function (err) {
                        reject(err)
                    })
            })
    });
};

Wechat.prototype.countMaterial = function() {
    var that= this;

    return new Promise(function(resolve,reject) {
        that.fetchAccessToken()
            .then(function (data) {
                var url = api.permanent.count + 'access_token=' + data.access_token


                request({method: 'GET', url: url , json: true}).then(function (response) {
                    var _data = response.body;

                    if (_data) {
                        resolve(_data)
                    } else {
                        throw new Error('Count material fails')
                    }

                })
                    .catch(function (err) {
                        reject(err)
                    })
            })
    });
};



Wechat.prototype.batchMaterial = function(options ) {
    var that= this;

    options.type = options.type || 'image'
    options.offset = options.offset || 0
    options.count = options.count || 1


    return new Promise(function(resolve,reject) {
        that.fetchAccessToken()
            .then(function (data) {
                var url = api.permanent.batchget + 'access_token=' + data.access_token


                request({method: 'POST', url: url, body: options, json: true}).then(function (response) {
                    var _data = response.body;

                    if (_data) {
                        resolve(_data)
                    } else {
                        throw new Error('batch material fails')
                    }

                })
                    .catch(function (err) {
                        reject(err)
                    })
            })
    });
};

Wechat.prototype.creategroup = function(name ) {
    var that= this;


    return new Promise(function(resolve,reject) {
        that.fetchAccessToken()
            .then(function (data) {
                var url = api.group.create + 'access_token=' + data.access_token

                var options = {
                    group : {
                        name: name
                    }
                }

                request({method: 'POST', url: url, body: options, json: true}).then(function (response) {
                    var _data = response.body;

                    if (_data) {
                        resolve(_data)
                    } else {
                        throw new Error('create material fails')
                    }

                })
                    .catch(function (err) {
                        reject(err)
                    })
            })
    });
};

Wechat.prototype.getgroup = function(name ) {
    var that= this;
    return new Promise(function(resolve,reject) {
        that.fetchAccessToken()
            .then(function (data) {
                var url = api.group.get + 'access_token=' + data.access_token


                request({method: 'GET', url: url,json: true}).then(function (response) {
                    var _data = response.body;

                    if (_data) {
                        resolve(_data)
                    } else {
                        throw new Error('get material fails')
                    }

                })
                    .catch(function (err) {
                        reject(err)
                    })
            })
    });
};


Wechat.prototype.checkgroup = function(openId ) {
    var that= this;

    return new Promise(function(resolve,reject) {
        that.fetchAccessToken()
            .then(function (data) {
                var url = api.group.check + 'access_token=' + data.access_token


                var form = {
                    openid: openId
                }
                request({method: 'POST', url: url, body: form, json: true}).then(function (response) {
                    var _data = response.body;

                    if (_data) {
                        resolve(_data)
                    } else {
                        throw new Error('check material fails')
                    }

                })
                    .catch(function (err) {
                        reject(err)
                    })
            })
    });
};


Wechat.prototype.updategroup = function(id, name) {
    var that= this;

    return new Promise(function(resolve,reject) {
        that.fetchAccessToken()
            .then(function (data) {
                var url = api.group.update + 'access_token=' + data.access_token


                var form = {
                   group: {
                       id: id ,
                       name: name
                   }
                }
                request({method: 'POST', url: url, body: form, json: true}).then(function (response) {
                    var _data = response.body;

                    if (_data) {
                        resolve(_data)
                    } else {
                        throw new Error('upload material fails')
                    }

                })
                    .catch(function (err) {
                        reject(err)
                    })
            })
    });
};


Wechat.prototype.batchmovegroup = function(openIds, to_groupid) {
    var that= this;

    return new Promise(function(resolve,reject) {
        that.fetchAccessToken()
            .then(function (data) {
                var url
                var form = {
                    to_groupid: to_groupid
                }
                 if(_.isArray(openIds)) {
                      url = api.group.batchupdate + 'access_token=' + data.access_token


                         form.openid_list = openIds


                 } else {
                      url = api.group.move + 'access_token=' + data.access_token

                     form.openid = openIds
                 }


                request({method: 'POST', url: url, body: form, json: true}).then(function (response) {
                    var _data = response.body;

                    if (_data) {
                        resolve(_data)
                    } else {
                        throw new Error('move material fails')
                    }

                })
                    .catch(function (err) {
                        reject(err)
                    })
            })
    });
};


Wechat.prototype.deletegroup = function(id) {
    var that= this;

    return new Promise(function(resolve,reject) {
        that.fetchAccessToken()
            .then(function (data) {
                var url = api.group.delete + 'access_token=' + data.access_token

                var form = {
                   group: {
                       id: id
                   }
                }

                request({method: 'POST', url: url, body: form, json: true}).then(function (response) {
                    var _data = response.body;

                    if (_data) {
                        resolve(_data)
                    } else {
                        throw new Error('delete material fails')
                    }

                })
                    .catch(function (err) {
                        reject(err)
                    })
            })
    });
};


Wechat.prototype.remarkuser = function(openid , remark) {
    var that= this;

    return new Promise(function(resolve,reject) {
        that.fetchAccessToken()
            .then(function (data) {
                var url = api.user.remark + 'access_token=' + data.access_token

                var form = {
                   openid: openid,
                    remark: remark
                }

                request({method: 'POST', url: url, body: form, json: true}).then(function (response) {
                    var _data = response.body;

                    if (_data) {
                        resolve(_data)
                    } else {
                        throw new Error('remark material fails')
                    }

                })
                    .catch(function (err) {
                        reject(err)
                    })
            })
    });
};


Wechat.prototype.batchfetchuser = function(openIds,lang) {
    var that= this;

    var lang = lang || 'zh_CN'
    return new Promise(function(resolve,reject) {
        that.fetchAccessToken()
            .then(function (data) {

                var options = {
                    json:true

                }

                if(_.isArray(openIds)){
                   options.url = api.user.batchFetch + 'access_token=' + data.access_token
                   options.body  = {
                        user_list: openIds
                    }
                    options.method= 'POST'
                } else {
                     options.url = api.user.fetch + 'access_token=' + data.access_token +
                             '&openid=' + openIds + '&lang=' + lang

                }

                console.log(options.url);

                request(options).then(function (response) {
                    var _data = response.body;

                    if (_data) {
                        resolve(_data)
                    } else {
                        throw new Error('batch material fails')
                    }

                })
                    .catch(function (err) {
                        reject(err)
                    })
            })
    });
};



Wechat.prototype.listusers = function(openid) {
    var that= this;

    return new Promise(function(resolve,reject) {
        that.fetchAccessToken()
            .then(function (data) {
                var url = api.user.list + 'access_token=' + data.access_token


                if(openid) {
                    url += + '&next_openid=' + openid
                }


                request({method: 'GET', url: url, json: true}).then(function (response) {
                    var _data = response.body;

                    if (_data) {
                        resolve(_data)
                    } else {
                        throw new Error('list material fails')
                    }

                })
                    .catch(function (err) {
                        reject(err)
                    })
            })
    });
};


Wechat.prototype.sendgroupAll = function(type ,message , groupId) {
    var that= this;

    var msg = {
        filter: {},
        msgtype: type
    }

    msg[type] = message

    if(!groupId)
     {
         msg.filter.is_to_all = true
     } else {
        msg.filter.is_to_all =false
        msg.filter = {
            is_to_all : false,
            group_id: groupId
        }
    }
    return new Promise(function(resolve,reject) {
        that.fetchAccessToken()
            .then(function (data) {
                var url = api.mass.group + 'access_token=' + data.access_token

                request({method: 'POST', url: url, body: msg, json: true}).then(function (response) {
                    var _data = response.body;

                    if (_data) {
                        resolve(_data)
                    } else {
                        throw new Error('send all  fails')
                    }

                })
                    .catch(function (err) {
                        reject(err)
                    })
            })
    });
};


Wechat.prototype.sendopenidAll = function(type ,message , openids) {
    var that= this;

    var msg = {
        msgtype: type ,
        touser: openids
    }

    msg[type] = message


    return new Promise(function(resolve,reject) {
        that.fetchAccessToken()
            .then(function (data) {
                var url = api.mass.openid + 'access_token=' + data.access_token

                request({method: 'POST', url: url, body: msg, json: true}).then(function (response) {
                    var _data = response.body;

                    if (_data) {
                        resolve(_data)
                    } else {
                        throw new Error('send openids   fails')
                    }

                })
                    .catch(function (err) {
                        reject(err)
                    })
            })
    });
};




Wechat.prototype.delmass = function(msgid) {
    var that= this;


    return new Promise(function(resolve,reject) {
        that.fetchAccessToken()
            .then(function (data) {
                var url = api.mass.del + 'access_token=' + data.access_token

                var form = {
                    msg_id : msgid
                }
                request({method: 'POST', url: url, body: form, json: true}).then(function (response) {
                    var _data = response.body;

                    if (_data) {
                        resolve(_data)
                    } else {
                        throw new Error('delete openids   fails')
                    }

                })
                    .catch(function (err) {
                        reject(err)
                    })
            })
    });
};




Wechat.prototype.preivemass = function(type ,message , openid) {
    var that= this;

    var msg = {
        msgtype: type ,
        touser: openid
    }

    msg[type] = message


    return new Promise(function(resolve,reject) {
        that.fetchAccessToken()
            .then(function (data) {
                var url = api.mass.preiview + 'access_token=' + data.access_token


                request({method: 'POST', url: url, body: msg, json: true}).then(function (response) {
                    var _data = response.body;

                    if (_data) {
                        resolve(_data)
                    } else {
                        throw new Error('delete openids   fails')
                    }

                })
                    .catch(function (err) {
                        reject(err)
                    })
            })
    });
};



Wechat.prototype.chcekemass = function(msgid) {
    var that= this;

    return new Promise(function(resolve,reject) {
        that.fetchAccessToken()
            .then(function (data) {
                var url = api.mass.check + 'access_token=' + data.access_token
                var form = {
                    msgid:msgid
                }

                request({method: 'POST', url: url, body: form, json: true}).then(function (response) {
                    var _data = response.body;

                    if (_data) {
                        resolve(_data)
                    } else {
                        throw new Error('delete openids   fails')
                    }

                })
                    .catch(function (err) {
                        reject(err)
                    })
            })
    });
};




Wechat.prototype.createMenu = function(menu) {
    var that= this;

    return new Promise(function(resolve,reject) {
        that.fetchAccessToken()
            .then(function (data) {
                var url = api.menu.create + 'access_token=' + data.access_token

                request({method: 'POST', url: url, body: menu, json: true}).then(function (response) {
                    var _data = response.body;

                    if (_data) {
                        resolve(_data)
                    } else {
                        throw new Error('create menu  fails')
                    }

                })
                    .catch(function (err) {
                        reject(err)
                    })
            })
    });
};




Wechat.prototype.getmune = function() {
    var that= this;

    return new Promise(function(resolve,reject) {
        that.fetchAccessToken()
            .then(function (data) {
                var url = api.menu.get + 'access_token=' + data.access_token

                request({ url: url, json: true}).then(function (response) {
                    var _data = response.body;

                    if (_data) {
                        resolve(_data)
                    } else {
                        throw new Error('get menu openids   fails')
                    }

                })
                    .catch(function (err) {
                        reject(err)
                    })
            })
    });
};





Wechat.prototype.deletemenu = function() {
    var that= this;

    return new Promise(function(resolve,reject) {
        that.fetchAccessToken()
            .then(function (data) {
                var url = api.menu.del + 'access_token=' + data.access_token

                request({ url: url, json: true}).then(function (response) {
                    var _data = response.body;

                    if (_data) {
                        resolve(_data)
                    } else {
                        throw new Error('delete menu openids   fails')
                    }

                })
                    .catch(function (err) {
                        reject(err)
                    })
            })
    });
};




Wechat.prototype.getcurrentmenu = function() {
    var that= this;

    return new Promise(function(resolve,reject) {
        that.fetchAccessToken()
            .then(function (data) {
                var url = api.menu.current + 'access_token=' + data.access_token

                request({ url: url, json: true}).then(function (response) {
                    var _data = response.body;

                    if (_data) {
                        resolve(_data)
                    } else {
                        throw new Error(' get current fails')
                    }

                })
                    .catch(function (err) {
                        reject(err)
                    })
            })
    });
};


Wechat.prototype.semantic = function(semanticData) {
    var that= this;

    return new Promise(function(resolve,reject) {
        that.fetchAccessToken()
            .then(function (data) {
                var url = api.semanticPrefix + 'access_token=' + data.access_token

                semanticData.appid= data.appID;

                request({method: 'POST', url: url, body: semanticData, json: true}).then(function (response) {
                    var _data = response.body;

                    if (_data) {
                        resolve(_data)
                    } else {
                        throw new Error('semantic  fails')
                    }

                })
                    .catch(function (err) {
                        reject(err)
                    })
            })
    });
};






Wechat.prototype.reply = function() {
    var content = this.body;
    var message = this.weixin;
     console.log(content.type);
    //console.log("你好"+message);  //message is object
    //console.log("my name is "+content);//value has been received
    var xml = util.tpl(content,message);
    this.status = 200;
    this.type = 'application/xml';
    this.body = xml
};

module.exports=Wechat;

