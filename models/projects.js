var mongo = require('../wechat/db');
var util = require('utility');
var usePic = require('../wx/reply');
var ObjectID = require('mongodb').ObjectID;


function weiUser(name) {
    this.name = name;
}

//db.collection.update({"_id":ObjectID(post_id),comments:{$elemMatch: { id: comment_id }}},{$set:{"comments.$.state":state}},{w:0},callback(null));


module.exports = weiUser;

weiUser.saveId = function(userId , Userpic , userCheck  ,callback) {
    var uesrInfor = {
        userId: null,
        Userpic: null,
        userCheck: null,
        Profiles: null,
        PV: 0 ,
        check : false,
        vote : 1
    }
    if(userId) {
        uesrInfor.userId = userId
    }
    if(Userpic) {
        uesrInfor.Userpic =Userpic
    }
    if(userCheck) {
        uesrInfor.userCheck = userCheck
    }

    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('users', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
            var query = {}
            if(userId) {
                query.userId = userId
            }
            collection.count(query, function(err, total) {
                if(err) {
                    return callback(err);
                }
                if(total < 1) {
                    collection.save(uesrInfor, function(err) {
                        mongo.close();
                        if(err) {
                            return callback(err);
                        }
                        callback(null, total);
                    })
                }else {
                    mongo.close();
                    callback(null, total);
                }
            })
        })
    })
}

weiUser.saveFile = function(project , username ,callback) {

    var date = util.YYYYMMDDHHmmss(new Date(), {dateSep:'.'});

    var profile = {
        project: project ,
        date: date,
        PV: 0
    }
      mongo.open(function(err , db) {
          if(err) {
              return callback(err);
          }
          db.collection('users' , function(err, collection) {
              if(err) {
                  mongo.close();
                  return callback(err);
              }
              var query = {}
              if(username) {
                  query.userId = username
              }

              collection.find(query).toArray(function(err, docs) {
                  if(err) {
                      return callback(err);
                  }
                 if(docs.userId !== null) {
                     collection.update(query,{$set:{project: project}},true , function(err) {
                         mongo.close();
                         if(err) {
                             return callback(err)
                         }
                         callback(null);
                     })
                 }
              })
          })
      })
}

//weiUser.saveInfor = function( users , weiusename ,callback) {
//
//    var date = util.YYYYMMDDHHmmss(new Date(), {dateSep:'.'});
//
//
//    users.date = date;
//
//    mongo.open(function(err , db) {
//        if(err) {
//            return callback(err);
//        }
//        db.collection('users' , function(err, collection) {
//            if(err) {
//                mongo.close();
//                return callback(err);
//            }
//
//            var query = {}
//            if(weiusename) {
//                query.userId = weiusename
//            }
//
//            collection.find(query).toArray(function(err, docs) {
//                if(err) {
//                    return callback(err);
//                }
//                if(docs.userId !== null) {
//                    collection.update(query,{$set:{name: users.username,date: date , capita:users.capital,member:users.number,comment:users.comment,projectName:users.project}},true , function(err) {
//                        mongo.close();
//                        if(err) {
//                            return callback(err)
//                        }
//                        callback(null);
//                    })
//                }
//            })
//        })
//    })
//}


weiUser.saveInfor = function( users , privateInfor , checkOpenid, checkName,relId ,callback) {

    var date = util.YYYYMMDDHHmmss(new Date(), {dateSep:'.'});

    users.lab = relId
    users.date = date;
   // users.priveteId = privateInfor.userCheck
    users.priveteId = checkOpenid;
    users.userId = privateInfor._id
    users.Userpic = privateInfor.Userpic
   // users.identifyUser = privateInfor.userId
    users.identifyUse = checkName;
    users.project = null
    users.status = false;
    users.exsit = true
    users.voteUser = []
    users.PV = 0


    mongo.open(function(err , db) {
        if(err) {
            return callback(err);
        }
        db.collection('contest' , function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
            var query = {}
            if(relId) {
                query._id = relId
            }
            collection.findOne(query,function(err, docs) {
                if(err) {
                    return callback(err);
                }
               if(docs.status2 == "true") {
                   if(docs.joins.length < 1) {
                       console.log("22222")
                       collection.update(query, {$push:{"joins":users}}, true,function(err) {
                           docs.exsit = false;
                           mongo.close();
                           if(err) {
                               return callback(err);
                           }
                           callback(null);
                       })
                   } else {
                       console.log("33333");
                       for(var i =0; i<docs.joins.length; i++) {
                           if(docs.joins[i].priveteId == checkOpenid) {
                               mongo.close();
                               callback(null)
                           }else {
                               collection.update(query, {$push:{"joins":users}}, true, function(err) {
                                   mongo.close();
                                   if(err) {
                                       return callback(err);
                                   }
                                   callback(null);
                               })
                           }
                       }
                   }
               } else {
                   mongo.close();
                   var docs = {
                       content: "报名截止",
                   }
                   callback(null, docs);
               }
            })
        })
    })
}

weiUser.saveVotes = function(projectId, youId, project ,callback) {


    var infor = {
        newname: project.userId,
        checkUser: project.userCheck,
        relId: project._id,
        vote : 0
    }

    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('contest', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
            var query = {}

            if(projectId) {
                query._id = projectId;
            }

            collection.findOne(query, function(err, docs) {
                if(err) {
                    return callback(err);
                }
                if(docs.joins.length <= 1) {
                    collection.update(query, {$push:{"votes": infor}}, true , function(err) {
                        mongo.close();
                        if(err) {
                            return callback(err);
                        }
                        callback(null);
                    })
                }else {
                    for(var i = 0; i < docs.joins.length; i++) {
                        if(docs.joins[i].openID == youId) {
                            mongo.close();
                            return callback(null);
                        }else {
                            collection.update(query, {$push:{"votes": infor}}, true , function(err) {
                                mongo.close();
                                if(err) {
                                    return callback(err);
                                }
                                callback(null);
                            })
                        }
                    }
                }
            })
        })
    })
}


weiUser.saveStatus = function(projectID, openID , callback) {
    console.log("projectID "+ projectID);
    console.log("openID "+ openID);

    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('status', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
            collection.count({}, function(err, total) {
                if(err) {
                    mongo.close();
                    return callback(err);
                }
                var query3 = {};
                if(openID) {
                    query3.openID = openID
                }

                var status = {
                    status: false ,
                    projectId : projectID,
                    openID: openID
                }
                //if(total < 1 ) {
                //    collection.save(voteUser, function(err, docs) {
                //        if(err) {
                //            return callback(err);
                //        }
                //        callback(null);
                //    })
                //}else {
                //    collection.findOne(query3, function(err, docs) {
                //        if(err) {
                //            return callback(err);
                //        }
                //        console.log("voteIdentity " +openID)
                //        if(docs.openID == openID) {
                //            mongo.close();
                //            callback(null);
                //        }else{
                //            collection.save(voteUser, function(err, docs) {
                //                if(err) {
                //                    return callback(err);
                //                }
                //                callback(null);
                //            })
                //        }
                //    })
                //}
                collection.save(status, function(err, docs) {
                    if(err) {
                        return callback(err);
                    }
                    callback(null);
                })
            })
        })
    })
}

//
//weiUser.checkView = function(name, callback) {
//    mongo.open(function(err, db) {
//        if(err) {
//            return callback(err);
//        }
//        db.collection('users', function(err, collection) {
//            if(err) {
//                mongo.close();
//                return callback(err);
//            }
//            var query = {}
//            if(name) {
//                query.userId = name;
//            }
//            collection.count(query, function(err, total) {
//                if(err) {
//                    mongo.close();
//                    return callback(err);
//                }
//                if(total>=1) {
//                    collection.update(query,{$set:{userId: name}}, function(err) {
//                        mongo.close();
//                        if(err) {
//                         return callback(err);
//                     }
//                        callback(null);
//                    })
//                }
//            })
//        })
//    })
//}


weiUser.checkView = function(name, callback) {
    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('users', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
            var query = {}
            if(name) {
                query.userId = name;
            }
           collection.find(query).toArray(function(err, docs) {
               mongo.close();
               if(err) {
                   return callback(err);
               }
               callback(null, docs);
           })
        })
    })
}

weiUser.find = function(username ,callback) {
    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('users', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
            var query = {}
            if(username) {
                query.userId = username;
            }
            collection.count(query, function(err, total) {
                if(err) {
                    return callback(err);
                }
                collection.find(query).toArray(function(err, docs) {
                    mongo.close();
                    if(err) {
                        return callback(err);
                    }
                    callback(null, docs ,total);
                })
            })
        })
    })
}

//weiUser.findAll = function( callback) {
//    mongo.open(function(err, db) {
//        if(err) {
//            return callback(err)
//        }
//        db.collection('users', function(err, collection) {
//            if(err) {
//                mongo.close();
//                return callback(err);
//            }
//
//            collection.find({}).toArray(function(err, docs) {
//                mongo.close();
//                if(err) {
//                    return callback(err);
//                }
//               return callback(null,docs);
//            })
//        })
//    })
//}


weiUser.findId = function(_id, userCheck  ,openID ,callback) {
    mongo.open(function(err, db) {
        if (err) {
            return callback(err)
        }
        db.collection('users', function (err, collection) {
            if (err) {
                mongo.close();
                return callback(err);
            }
            var query = {}
            if (openID) {
                query.userCheck = openID;
            }
            collection.findOne(query, function (err, docs) {
                if (err) {
                    return callback(err);
                }
 //db.collection.update({"_id":ObjectID(post_id),comments:{$elemMatch: { id: comment_id }}},{$set:{"comments.$.state":state}},{w:0},callback(null));

                if (docs.vote == 1 ) {

                        collection.update(query, {$set:{"vote": 0}}, function(err) {
                            if(err) {
                                return callback(err);
                            }
                            db.collection('newTable', function(err, collection) {
                                if(err) {
                                    mongo.close();
                                    return callback(err);
                                }

                                //console.log("jaja "+ userCheck);
                                //collection.findOne(query2, function(err, doc) {
                                //    console.log("muuuuu  "+doc)
                                //    if(doc) {
                                //        collection.update(query2, {$inc:{"PV" :1}}, function(err) {
                                //            if(err) {
                                //                return callback(err);
                                //            }
                                //            callback(null);
                                //        })
                                //    }
                                //})
                                collection.update({"projectID":userCheck , projects:{$elemMatch:{priveteId:_id}}}, {$inc:{"projects.$.PV":1}},{w:0},function(err) {
                                    if(err) {
                                        return callback(err);
                                    }
                                    callback(null);
                                })

                            })
                        })
                } else {
                    mongo.close();
                    return callback(null, docs);
                }
            })
        })
    })
}


weiUser.userIndex = function(_id , getUserId ,callback) {
    mongo.open(function(err, db) {
        if(err) {
            return callback(err)
        }
        db.collection('newTable', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
            var query = {}
            if(_id) {
                query.projectID = _id;
            }
            collection.findOne(query, function(err, docs) {
                mongo.close();
                if(err) {
                    return callback(err);
                }
               for(var i = 0; i < docs.projects.length; i++) {
                   if(docs.projects[i].priveteId == getUserId) {
                      callback(null, docs.projects[i])
                   }
               }
            })
        })
    })
}




weiUser.findList = function(callback) {
    mongo.open(function(err, db) {
        if(err) {
            return callback(err)
        }
        db.collection('contest', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
         collection.count({}, function(err, total) {
             if(err) {
                 return callback(err);
             }
             collection.find({}).toArray(function(err, docs) {
                 mongo.close();
                 if(err) {
                     return callback(err);
                 }
                 callback(null, docs , total);
             })
         })

        })
    })
}


weiUser.saveMatch = function(data ,callback) {

    var doc = {
        date: data.time,
        name: data.name,
        place: data.place,
        pic: data.pic,
        part: data.part,
        status: data.status,
        status2: "true",
        projects: [],
        joins: [],
        votes: []

    };
    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('contest', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
            collection.insert(doc, function(err ,docs) {
                mongo.close();

                if(err) {
                    return callback(err);
                }
                callback(null, docs);
            })
        })
    })
}

weiUser.savePrivate = function(_id, data ,callback) {
    mongo.open(function(err, db) {
        if(err) {
           return callback(err);
        }
        db.collection('contest', function(err, collection) {
            if(err) {
                return callback(err);
            }
            var query = {}

            if(_id) {
                query._id = _id
            }

            collection.update(query, {$push:{"joins":data}}, true, function(err) {
                mongo.close();
                if(err) {
                    return callback(err);
                }
                callback(null);
            })
        })
    })
}

weiUser.findOpen = function(userID ,callback) {
    mongo.open(function(err, db) {
        if(err) {
            return callback(err)
        }
        db.collection('users', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
           var query = {};

            if(userID) {
                query.userCheck = userID
            }
            collection.findOne(query, function(err, docs) {
                mongo.close();
                if(err) {
                    return callback(err);
                }
                 callback(null, docs);
            })
        })
    })
}


weiUser.findAll = function( projectId ,callback) {

    mongo.open(function(err, db) {
        if(err) {
            return callback(err)
        }
        db.collection('newTable', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
            var query = {}

            if(projectId) {
                query.projectID = projectId
            }
                    collection.findOne(query, function(err, docs) {

                    if(docs) {
                        var len = docs.joins.length;
                        mongo.close();
                        if(err) {
                            return callback(err);
                        }
                        return callback(null,docs ,len);
                    } else{
                        mongo.close();
                        callback(null);
                    }

                    })


        })
    })
}

weiUser.findYou = function(checkOpenid, relId ,profile ,downloadUrl ,callback) {


    var infor = {

        checkUser: checkOpenid,
        //relId: project._id,
        contestId: relId,
        profile: profile,
        downloadUrl: downloadUrl
    }

    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('contest', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
            var query = {}

            if(relId) {
                query._id = relId;
            }




            collection.findOne(query, function(err, docs) {
                if(err) {
                    return callback(err);
                }
               if(docs.projects.length < 1) {
                   console.log("11111");
                   collection.update(query, {$push:{"projects": infor}}, true , function(err) {
                       mongo.close();
                       if(err) {
                           return callback(err);
                       }
                       callback(null);
                   })
               }else {

                   for(var i = 0; i < docs.projects.length; i++) {
                       console.log(docs.projects[i].newname);
                       console.log(checkOpenid);
                        if(docs.projects[i].checkUser == checkOpenid) {
                            console.log("55555");
                            mongo.close();
                            return callback(null);
                        }else {
                            console.log("44444");
                            collection.update(query, {$push:{"projects": infor}}, true , function(err) {
                                mongo.close();
                                if(err) {
                                    return callback(err);
                                }
                                callback(null);
                            })
                        }
                   }
               }
            })
        })
    })
}

weiUser.findProject = function(_id, userId, callback) {
         mongo.open(function(err, db) {
             if(err) {
                 return callback(err);
             }
             db.collection('newTable', function(err, collection) {
                 if(err) {
                     mongo.close();
                     return callback(err);
                 }
                 var query = {};
                 if(_id) {
                     query.projectID = _id
                 }
                 collection.findOne(query, function(err, docs) {
                     if(err) {
                         return callback(err);
                     }
                     for(var i = 0; i < docs.joins.length; i++){
                       if(docs.joins[i].checkUser == userId) {
                           mongo.close();
                           callback(null, docs.joins[i]);
                       }
                     }
                 })
             })
         })
}

weiUser.findVote = function(openID, callback) {
    mongo.open(function(err, db) {
        if(err) {
            return callback(err)
        }
        db.collection('vote', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
            var query = {}
            if(openID) {
                query.openID = openID
            }
            collection.findOne(query, function(err, docs) {
                mongo.close();
                if(err) {
                    return callback(err)
                }
                callback(null, docs);
            })
        })
    })
}

weiUser.findPassword = function(openId ,callback) {
    mongo.open(function(err, db) {
        if(err) {
            return callback(err)
        }
        db.collection('users', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
            var query = {};

            if(openId) {
                query.userCheck = openId
            }
            collection.findOne(query, function(err, docs) {
                mongo.close()
                if(err) {
                   return callback(err);
               }
                callback(null, docs);
            })
        })
    })
}



weiUser.findStatus = function(projectID , callback) {
    mongo.open(function(err, db) {
        if(err) {
            return callback(err)
        }
        db.collection('status', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
            var query = {};

            if(projectID) {
                query.projectId = projectID
            }
            collection.find(query).toArray(function(err, docs) {
                mongo.close();
                if(err) {
                    return callback(err);
                }
                callback(null,docs);
            })
        })
    })
}


/// 后台更改状态


weiUser.newStatus = function(projectId ,data ,callback) {

    console.log("i am "+data)

    mongo.open(function(err, db) {
        if(err) {
           return callback(err);
        }
        db.collection('contest', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }

            var query = {};
            console.log("sss "+ data.projectID)
            if(data.projectId) {
                query._id = data.projectId
            }
            collection.findOne(query, function(err, docs) {
                console.log("my name " +docs)
                if(err) {
                    return callback(err);
                }

                for(var i =0 ; i < docs.joins.length; i++) {
                     if(docs.joins[i].priveteId == data.openID && docs.projects[i].checkUser == data.openID ) {
                         mongo.close()
                         callback(null, docs.joins[i] , docs.projects[i])
                     }
                }
            })
        })
    })
}

weiUser.newAdd = function(data1, data2 , data  , callback) {
    console.log("sdsd" + data1)
    data.projects = []
    data.joins = []
     mongo.open(function(err, db) {
         if(err) {
             return callback(err);
         }
         db.collection('newTable' , function(err, collection) {
             if(err){
                 return callback(err);
             }
             var query = {}
             console.log("ddd "+ data.projectID)
             if(data.projectID) {
                 query.projectID = data.projectID
             }
            collection.count({}, function(err, total) {
                if(err) {
                    return callback(err);
                }

                console.log(" totla " +total)
                if(total < 1) {
                    collection.save(data, function(err) {
                        if(err) {
                            return callback(err);
                        }
                        collection.update(query, {$push:{"projects": data1, "joins": data2}} ,function(err) {
                            mongo.close();
                            if(err) {
                                return callback(err);
                            }
                        })
                    })
                }else{
                    collection.update(query, {$push:{"projects": data1, "joins": data2}}, true, true ,function(err) {
                        mongo.close();
                        if(err) {
                            return callback(err);
                        }
                    })
                }
            })
         })
     })
}


weiUser.findRank = function(projectID ,callback) {
    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('newTable', function(err, collection) {
            if(err) {
                return callback(err);
            }
            var query = {};
            if(projectID) {
                query.projectID = projectID
            }
            collection.count({}, function(err, total) {
                if(err) {
                    return callback(err);
                }
                if(total >=1 ) {
                    collection.findOne(query, function(err, docs) {
                        mongo.close();
                        if(err) {
                            return callback(err);
                        }
                        //console.log(docs.projects)
                        callback(null ,docs.projects, docs.joins);
                    })
                }else{
                    callback(null)
                }
            })
        })
    })
}
//db.collection.update({"_id":ObjectID(post_id),comments:{$elemMatch: { id: comment_id }}},{$set:{"comments.$.state":state}},{w:0},callback(null));

weiUser.updatePro = function(data, callback) {
    var projectid = data.projectID;

    console.log("projectid "+projectid)

    var relID = ObjectID(projectid);
    mongo.open(function(err, db) {
        if(err) {
            return callback(err)
        }
        db.collection('contest', function(err, collection) {
            if(err) {
                mongo.close()
                return callback(err);
            }
            collection.update({"_id":relID, projects:{$elemMatch:{checkUser:data.openID}}}, {$set:{"projects.$.downloadUrl": data.profiles}},{w:0}, function(err) {
                mongo.close();
                if(err) {
                    return callback(err);
                }
                callback(null);
            })
        })
    })
}

weiUser.updateStatus = function(data, callback) {

    var relId = ObjectID(data.projectID);

    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('contest', function(err, collection) {
            if(err, collection) {
                if(err) {
                    mongo.close();
                    return callback(err);
                }
                collection.update({"_id":relId},{$set:{"status2": data.status2}}, function(err) {
                    mongo.close();
                    if(err) {
                        return callback(err);
                    }
                    callback(null);
                })
            }
        })
    })
}


weiUser.saveSuccess = function(data, callback) {

    var saveData = {
        data: data
    }

    mongo.open(function(err, db){
        if(err) {
            return callback(err);
        }
        db.collection('examples', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
            collection.count({} , function(err, total) {
                if(err) {
                    mongo.close();
                    return callback(err);
                }
                if(total < 1) {

                    collection.save(saveData, function(err) {
                        mongo.close();
                        if(err) {
                            return callback(err);
                        }
                        callback(null);
                    })
                } else {
                    collection.find({}, function(err ,docs){
                        if(err) {
                            mongo.close();
                            return callback(err);
                        }
                        for(var i = 0; i < docs.length; i++) {
                          for(var j = 0; j < data.length ; j++) {
                              if(data.priveteId == docs[i].data.priveteId) {
                                  mongo.close();
                                  return callback(null);
                              } else {
                                      collection.save(saveData, function(err) {
                                      mongo.close();
                                      if(err) {
                                          return callback(err);
                                      }
                                      callback(null);
                                  })
                              }
                          }
                        }
                    })
                }
            })
        })
    })
}

weiUser.findSuccess = function(callback) {
    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('examples', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
           collection.count({}, function(err, total) {
               if(err) {
                   console.log(err)
               }
               collection.find({}).toArray(function(err, docs) {
                   mongo.close();
                   if(err) {
                       return callback(err);
                   }
                   callback(err, docs, total);
               })
           })
        })
    })
}



weiUser.findVotes = function(openID , callback) {
    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('users', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
            var query = {}
            if(openID) {
                query.userCheck = openID
            }
            collection.findOne(query, function(err, docs) {
                mongo.close();
                if(err) {
                    return callback(err);
                }
                callback(null, docs.vote);
            })
        })
    })
}

weiUser.savecode = function(code , openid, callback) {
    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('code', function(err, collection) {
            if(err) {
                mongo.close()
               return callback(err);
            }
            var codeObj = {
                code: code,
                openid: openid
            }
            collection.save(codeObj, function(err) {
                mongo.close()
                if(err) {

                    return callback(err);
                }
                 callback(null);
            })
        })
    })
}

//weiUser.findPic = function(projectID, pic ,callback) {
//    mongo.open(function(err, db) {
//        if(err) {
//            return callback(err);
//        }
//        db.collection('contest', function(err, collection) {
//            if(err){
//                mongo.close();
//                return callback(err);
//            }
//
//            var query = {}
//            if(projectID){
//                query._id = projectID
//            }
//            collection.findOne(query, function(err, docs) {
//                if(err) {
//                    return callback(err);
//                }
//                if(docs) {
//                    collection.update(query, {$set:{projectPic: pic}}, true , function(err) {
//                        mongo.close();
//                        if(err) {
//                            return callback(err);
//                        }
//                        callback(null);
//                    })
//                }
//            })
//        })
//    })
//}



//<a style="text-decoration: none;" href = "http://mrq1itqtsf.proxy.qqbrowser.cc/usrProject/<%= data.joins[i].userId%>">
//<button class="btn btn-primary">
//查看作品
//</button>
//</a>