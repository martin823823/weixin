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

        roadInfor: "false",
        check : false,

        company: null
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
                       // mongo.close();
                        if(err) {
                            return callback(err);
                        }
                        return   callback(null, total);
                    })
                }else {
                    //mongo.close();
                    return  callback(null, total);
                }
            })
        })
    })
}


weiUser.saveRoad = function(openid , place ,callback) {


    var roadInfor = {
        StartPlace : place.place1,
        EndPlace : place.place2,
        openid : openid,
        checkStatus: "true"
    }

    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }

        db.collection('users', function(err, collection) {
            if(err) {
                mongo.close()
                return callback(err)
            }
            var query = {}
            if(openid) {
                query.userCheck = openid
            }
            console.log("road" + openid)
            collection.update(query, {$set:{roadInfor: "true"}}, true, function(err) {
                if(err) {
                    return callback(err)
                }
                db.collection('road', function(err, collection) {
                    if(err) {
                        mongo.close();
                        return callback(err);
                    }
                    //
                    //collection.save(roadInfor ,function(err) {
                    //    // mongo.close();
                    //    if(err) {
                    //        return callback(err);
                    //    }
                    //    return callback(null);
                    //})

                    var query2 = {}
                    if(openid) {
                        query2.openid = openid
                    }
                    var place1 = place.place1
                    var place2 = place.place2
                    console.log(place2)

                    collection.count(query2, function(err, total) {
                        if(err) {
                            return callback(err);
                        }
                        if(total < 1) {

                            collection.save(roadInfor, function(err) {
                                // mongo.close();
                                if(err) {
                                    return callback(err);
                                }
                                return   callback(null, total);
                            })
                        }else if(total == 1){
                            //mongo.close();
                            collection.update(query2, {$set:{"StartPlace": place1, "EndPlace": place2, "checkStatus": "true"}} ,true ,function(err) {
                                // mongo.close();
                                if(err) {
                                    return callback(err);
                                }
                                return   callback(null);
                            })

                        }else{
                            return  callback(null, total);
                        }
                    })



                })
            })



        })

    })
}

weiUser.findRoad = function(openid ,callback) {


    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('road', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }

            var query = {}
            if(openid) {
                query.openid = openid;
            }
            collection.findOne(query, function(err, docs) {
                if(err) {
                    mongo.close();
                    return callback(err)
                }

                return callback(null, docs)
            })

        })
    })
}



weiUser.saveStaInfor = function(openid , data ,callback) {

    var StaInfor = {
        staNum : data.StaNum,
        cardNum : data.cardNum,
        openid : openid,
        phones: data.phones
    }

    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }

        db.collection('StaInfor', function(err, collection) {
            if(err) {
                mongo.close()
                return callback(err)
            }


      collection.save(StaInfor, function(err) {

          if(err) {
              mongo.close()
              return callback(err)
          }
          return callback(null)
      })

        })

    })
}

weiUser.updateStaInfor = function(openid , data ,callback) {

    var StaInfor = {
        staNum : data.StaNum,
        cardNum : data.cardNum,
        openid : openid,
        phones: data.phones
    }

    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }

        db.collection('StaInfor', function(err, collection) {
            if(err) {
                mongo.close()
                return callback(err)
            }

            var query = {}
            if(openid) {
                query.openid = openid;
            }
       collection.update(query, {"$set":{"staNum":data.StaNum,"cardNum": data.cardNum, "phones":data.phones}} ,true, function(err) {

          if(err) {
              mongo.close()
              return callback(err)
          }
          return callback(null)
      })

        })

    })
}

weiUser.checkStaInfor = function(openid  ,callback) {

    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }

        db.collection('StaInfor', function(err, collection) {
            if(err) {
                mongo.close()
                return callback(err)
            }

            var query = {}
            if(openid) {
                query.openid = openid
            }

         collection.findOne(query, function(err, docs) {
             if(err) {
                 mongo.close()
                 return callback(err)
             }
             return callback(null, docs)
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
                         //mongo.close();
                         if(err) {
                             return callback(err)
                         }
                         return  callback(null);
                     })
                 }
              })
          })
      })
}


weiUser.saveBasic = function(privateInfor , checkOpenid ,callback) {

    var date = util.YYYYMMDDHHmmss(new Date(), {dateSep:'.'});

    //users.lab = relId
    privateInfor.date = date;
    privateInfor.priveteId = checkOpenid;



    mongo.open(function(err , db) {
        if(err) {
            return callback(err);
        }
        db.collection('Business' , function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }

            var query = {}
            if(checkOpenid) {
                query.priveteId = checkOpenid
            }
            collection.count(query, function(err, total) {
                if(err) {
                    return callback(err);
                }
                if(total < 1) {
                    collection.save(privateInfor, function(err) {
                        // mongo.close();
                        if(err) {
                            return callback(err);
                        }
                        return   callback(null, total);
                    })
                }else {
                    //mongo.close();
                    return  callback(null, total);
                }
            })
        })
    })
}

weiUser.saveInfor = function( users , checkOpenid ,callback) {

    var date = util.YYYYMMDDHHmmss(new Date(), {dateSep:'.'});
    users.date = date;

    users.businessNum = users.businessNum
    users.locations = users.locations
    users.numbers = users.numbers
    users.out_trade_no = users.out_trade_no;
    users.isCheck = "false";
    users.isPay = "false";
    users.isPayee = "false";
    users.checkUser = null;
    users.profile = null;
    users.downloadUrl = null;

    mongo.open(function(err , db) {
        if(err) {
            return callback(err);
        }
        db.collection('Business' , function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }

            var query = {}

            if(checkOpenid) {
                query.priveteId = checkOpenid
            }

            collection.findOne(query, function(err, docs) {
                if(err) {
                    return callback(err);
                }
                collection.update(query, {$push:{"materialInfor": users}}, true , function(err) {
                    //mongo.close();
                    if(err) {
                        return callback(err);
                    }
                    return  callback(null);
                })

            })
        })
    })
}

//function arr(index1 , openid, callback) {
//    var arrIndex = [];
//    for (var i = 0; i < index1.length; i++) {
//        if (index1[i].priveteId == openid) {
//            //mongo.close();
//            arrIndex.push(index1[i].priveteId);
//
//        }
//        return callback(arrIndex)
//
//    }
//}
//
//
//collection.update(query, {$push: {"joins": users}}, true, function (err) {
//    //mongo.close();
//    if (err) {
//        return callback(err);
//    }
//    return callback(null);
//})



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
                        //mongo.close();
                        if(err) {
                            return callback(err);
                        }
                        return  callback(null);
                    })
                }else {
                    for(var i = 0; i < docs.joins.length; i++) {
                        if(docs.joins[i].openID == youId) {
                            //mongo.close();
                            return callback(null);
                        }else {
                            collection.update(query, {$push:{"votes": infor}}, true , function(err) {
                                //mongo.close();
                                if(err) {
                                    return callback(err);
                                }
                                return callback(null);
                            })
                        }
                    }
                }
            })
        })
    })
}

//检查在途信息
//weiUser.checkRoad = function(openid, callback) {
//    mongo.open(function(err, db) {
//        if(err) {
//            return callback(err);
//        }
//        db.collection('road', function(err, collection) {
//            if(err) {
//                mongo.close();
//                return callback(err);
//            }
//            var query = {}
//            if(openid) {
//                query.openid = openid;
//            }
//           collection.findOne(query, function (err, docs) {
//               if(err) {
//                   return callback(err)
//               }
//               return callback(null, docs)
//           })
//        })
//    })
//}
weiUser.AllRoad = function(callback) {


    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('road', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
            collection.count({}, function(err, total) {
                if (err) {
                    return callback(err);
                }
                collection.find({}).toArray(function (err, docs) {
                    if (err) {
                        mongo.close()
                        return callback(err)
                    }
                    return callback(null, docs, total)
                })
            })
        })
    })
}

weiUser.checkRoad = function(openid, callback) {
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
            if(openid) {
                query.userCheck = openid;
            }
           collection.findOne(query, function (err, docs) {
               if(err) {
                   return callback(err)
               }
               return callback(null, docs)
           })
        })
    })
}

//确认收款

weiUser.payee = function(openid, data ,callback) {

    var businessNum  = data.businessNum;
    console.log(openid)
    console.log(businessNum)
    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection("Business", function(err, collection) {
            if(err) {
                return callback(err)
            }
            collection.update({"priveteId":openid , materialInfor:{$elemMatch:{businessNum:businessNum}}}, {$set:{"materialInfor.$.isPayee":"true"}},{w:0},function(err) {

                if(err) {
                    return callback(err)
                }
                return callback(null);
            })
        })
    })
}

//结束行程
weiUser.endRoad = function(openid, callback) {
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
            if(openid) {
                query.userCheck = openid;
            }
           collection.update(query,{"$set":{"roadInfor": "false"}}, function (err) {
               if(err) {
                   mongo.close();
                   return callback(err);
               }

               db.collection('road', function(err, collection) {
                   if(err) {
                       mongo.close();
                       return callback(err);
                   }
                   var query2 = {}
                   if(openid) {
                       query2.openid = openid;
                   }
                   collection.update(query2,{"$set":{"checkStatus": "false"}}, function (err) {
                       if(err) {
                           mongo.close();
                           return callback(err);
                       }

                     return callback(null)
                   })
               })

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
                    //mongo.close();
                    if(err) {
                        return callback(err);
                    }
                    return callback(null, docs ,total);
                })
            })
        })
    })
}

weiUser.checkpay = function(openid ,callback) {
    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('Business', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
            var query = {}
            if(openid) {
                query.priveteId = openid;
            }
            collection.findOne(query, function(err, docs) {
                if(err) {
                    mongo.close();
                    return callback(err);
                }
                return callback(null, docs)
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
                            db.collection('contest', function(err, collection) {
                                if(err) {
                                    mongo.close();
                                    return callback(err);
                                }
                                console.log("usrcheck"+userCheck);
                                console.log("_id"+_id);
                                console.log("openid"+openID)
                                collection.update({"_id":userCheck , joins:{$elemMatch:{priveteId:_id}}}, {$inc:{"joins.$.PV":1}},{w:0},function(err) {
                                    if(err) {
                                        return callback(err);
                                    }
                                    return callback(null);
                                })

                            })
                        })
                } else {
                    //mongo.close();
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
                //mongo.close();
                if(err) {
                    return callback(err);
                }
               for(var i = 0; i < docs.projects.length; i++) {
                   if(docs.projects[i].priveteId == getUserId) {
                     return callback(null, docs.projects[i])
                   }
               }
            })
        })
    })
}




weiUser.findNews = function(callback) {
    mongo.open(function(err, db) {
        if(err) {
            return callback(err)
        }
        db.collection('News', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
         collection.count({}, function(err, total) {
             if(err) {
                 return callback(err);
             }
             collection.find({}).toArray(function(err, docs) {
                 //mongo.close();
                 if(err) {
                     return callback(err);
                 }
                return callback(null, docs , total);
             })
         })

        })
    })
}
//
weiUser.saveContest = function(checkOpenid ,checkProject ,callback) {

    var checkOpenid = {
        userOpenid : checkOpenid,
        userProject: checkProject
    }

    mongo.open(function(err, db) {
        if(err) {
            return callback(err)
        }
        db.collection('singUp', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
           collection.save(checkOpenid, function(err) {
               //mongo.close();
               if(err) {
                   return callback(err);
               }
               return callback(null);
           })

        })
    })
}

weiUser.saveMatch = function(data ,callback) {

    var doc = {
        date: data.time,
        name: data.name,
        place: data.place,
        school: data.school,
        comment: data.comment,
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
                //mongo.close();

                if(err) {
                    return callback(err);
                }
                return  callback(null, docs);
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
                //mongo.close();
                if(err) {
                    return callback(err);
                }
                return callback(null);
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
                //mongo.close();
                if(err) {
                    return callback(err);
                }
                return callback(null, docs);
            })
        })
    })
}

weiUser.findContestPic = function(userID ,callback) {
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
               //  mongo.close();
                if(err) {
                    return callback(err);
                }
                return callback(null, docs.Userpic);
            })
        })
    })
}

weiUser.findContest = function(checkOpenid ,callback) {
    mongo.open(function(err, db) {
        if(err) {
            return callback(err)
        }
        db.collection('contest', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }

            collection.find({}).toArray(function(err, docs) {

                    if(err) {
                        return callback(err);
                    }
                 var arr = []
                 var arr2 = {}

                 for(var i =0; i < docs.length; i++) {
                     for(var j =0; j<docs[i].joins.length; j++) {
                         if(checkOpenid == docs[i].joins[j].priveteId) {
                            arr2.name = docs[i].name;
                            arr2.place = docs[i].place
                            arr2.part = docs[i].part
                            console.log(arr2)
                            arr.push(arr2);
                            arr2 = {};
                         }
                     }
                 }

                return  callback(null, arr);

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
                        //mongo.close();
                        if(err) {
                            return callback(err);
                        }
                        return callback(null,docs ,len);
                    } else{
                        //mongo.close();
                        return callback(null);
                    }

                    })


        })
    })
}

//上传报销凭证
weiUser.findYou = function(checkOpenid, getId ,profile ,downloadUrl ,callback) {

    //
    //var infor = {
    //    checkUser: checkOpenid, //openid
    //    //relId: project._id,
    //    contestId: getId, //报销单号
    //    profile: profile, //文件路径
    //    downloadUrl: downloadUrl //URL路径
    //
    //}

    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('Business', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
            var query = {}

            if(checkOpenid) {
                query.priveteId = checkOpenid;
            }

            collection.findOne(query, function(err, docs) {
                if(err) {
                    return callback(err);
                }
                //collection.update(query, {$push:{"material": infor}}, true , function(err) {
                //    //mongo.close();
                //    if(err) {
                //        return callback(err);
                //    }
                //    return  callback(null);
                //})
                console.log(checkOpenid)

                console.log(profile)
                console.log(downloadUrl)

                collection.update({"priveteId":checkOpenid , materialInfor:{$elemMatch:{out_trade_no:getId}}}, {$set:{"materialInfor.$.checkUser":checkOpenid,"materialInfor.$.profile":profile,"materialInfor.$.downloadUrl":downloadUrl}},{w:0},function(err) {
                    if(err) {
                        return callback(err);
                    }
                    return callback(null);
                })

            })
        })
    })
}

weiUser.findProject = function(_id, userId, callback) {
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
                 if(_id) {
                     query._id = _id
                 }
                 collection.findOne(query, function(err, docs) {
                     if(err) {
                         return callback(err);
                     }
                     for(var i = 0; i < docs.joins.length; i++){
                       if(docs.joins[i].priveteId == userId) {
                           //mongo.close();
                           return callback(null, docs.joins[i]);
                       }
                     }
                 })
             })
         })
}

weiUser.findYoufile = function(_id, userId, callback) {
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
            if(_id) {
                query._id = _id
            }
            collection.findOne(query, function(err, docs) {
                if(err) {
                    return callback(err);
                }
                for(var i = 0; i < docs.projects.length; i++){
                    if(docs.projects[i].checkUser == userId) {
                        //mongo.close();
                        return callback(null, docs.projects[i]);
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
                //mongo.close();
                if(err) {
                    return callback(err)
                }
                return callback(null, docs);
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
                //mongo.close()
                if(err) {
                   return callback(err);
               }
                return  callback(null, docs);
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
                //mongo.close();
                if(err) {
                    return callback(err);
                }
                return  callback(null,docs);
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
                         //mongo.close()
                         return callback(null, docs.joins[i] , docs.projects[i])
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
                            //mongo.close();
                            if(err) {
                                return callback(err);
                            }
                        })
                    })
                }else{
                    collection.update(query, {$push:{"projects": data1, "joins": data2}}, true, true ,function(err) {
                        //mongo.close();
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
        db.collection('contest', function(err, collection) {
            if(err) {
                return callback(err);
            }
            var query = {};
            if(projectID) {
                query._id = projectID
            }
            collection.count({}, function(err, total) {
                if(err) {
                    return callback(err);
                }
                if(total >=1 ) {
                    collection.findOne(query, function(err, docs) {
                        //mongo.close();
                        if(err) {
                            return callback(err);
                        }
                        //console.log(docs.projects)

                        return  callback(null ,docs.projects, docs.joins);

                    })
                }else{
                    return callback(null)
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
                //mongo.close();
                if(err) {
                    return callback(err);
                }
                return  callback(null);
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
                    //mongo.close();
                    if(err) {
                        return callback(err);
                    }
                    return  callback(null);
                })
            }
        })
    })
}

weiUser.updateStatus2 = function(data, callback) {

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
                collection.update({"_id":relId},{$set:{"status": data.status}}, function(err) {
                    //mongo.close();
                    if(err) {
                        return callback(err);
                    }
                    return callback(null);
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
                        //mongo.close();
                        if(err) {
                            return callback(err);
                        }
                        return  callback(null);
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
                                  //mongo.close();
                                  return callback(null);
                              } else {
                                      collection.save(saveData, function(err) {
                                      //mongo.close();
                                      if(err) {
                                          return callback(err);
                                      }
                                          return  callback(null);
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
                   //mongo.close();
                   if(err) {
                       return callback(err);
                   }
                   return callback(err, docs, total);
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
                //mongo.close();
                if(err) {
                    return callback(err);
                }
                return callback(null, docs.vote);
            })
        })
    })
}


weiUser.rank = function(project , callback) {
    console.log(project)
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
            if(project) {
                query._id = project
            }
            collection.findOne(query, function(err, docs) {
                //mongo.close();
                if(err) {
                    return callback(err);
                }
                return callback(null, docs);
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
                //mongo.close()
                if(err) {

                    return callback(err);
                }
                return  callback(null);
            })
        })
    })
}

weiUser.saveCompany = function( company ,callback) {
    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('CompanyList', function(err, collection) {
            if(err) {
                mongo.close()
                return callback(err);
            }
            var codeObj = {
                companys: company
            }
            collection.save(codeObj, function(err) {
                //mongo.close()
                if(err) {

                    return callback(err);
                }
                return  callback(null);
            })
        })
    })
}

//findSchool找到所有学校
weiUser.findCompany = function(callback) {
    mongo.open(function(err, db) {
        if(err) {
            return callback(err)
        }
        db.collection('CompanyList', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
           collection.count({} ,function(err, tatol) {
               if(err) {
                   callback(err);
               }
            collection.find({}).toArray(function(err, docs) {
                //mongo.close();
                if(err) {

                    return callback(err);
                }
                return  callback(null, docs, tatol)
            })
           })
        })
    })
}


weiUser.saveWork = function( work ,callback) {
    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('workList', function(err, collection) {
            if(err) {
                mongo.close()
                return callback(err);
            }
            var codeObj = {
                works : work
            }
            collection.save(codeObj, function(err) {
                //mongo.close()
                if(err) {

                    return callback(err);
                }
                return callback(null);
            })
        })
    })
}

weiUser.findWork = function(callback) {
    mongo.open(function(err, db) {
        if(err) {
            return callback(err)
        }
        db.collection('workList', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
            collection.count({} ,function(err, tatol) {
                if (err) {
                    callback(err);
                }
                collection.find({}).toArray(function (err, docs) {
                    //mongo.close();
                    if (err) {

                        return callback(err);
                    }
                    return  callback(null, docs, tatol)
                })
            })
        })
    })
}


weiUser.saveManagers = function(openid ,data ,callback) {
    var uesrInfor = {
        userId: null,
        name: null,
        school: null,
        work: null,
        phone: null ,
        email : null,
        status: null

    }
    if(openid) {
        uesrInfor.userId = openid
    }
    if(data) {
        uesrInfor.name =data.name
        uesrInfor.school =data.school
        uesrInfor.work =data.work
        uesrInfor.phone =data.phone
        uesrInfor.email =data.email
        uesrInfor.status =data.status
    }


    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('Managers', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
            var query = {}
            if(openid) {
                query.userId = openid
            }
            collection.count(query, function(err, total) {
                if(err) {
                    return callback(err);
                }
                if(total < 1) {
                    collection.save(uesrInfor, function(err) {
                        //mongo.close();
                        if(err) {
                            return callback(err);
                        }
                        return  callback(null, total);
                    })
                }else {
                    //mongo.close();
                    return  callback(null, total);
                }
            })
        })
    })
}

weiUser.insertCompany = function(company , openid ,callback) {

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
            if(openid) {
                query.userCheck = openid
            }

            collection.find(query).toArray(function(err, docs) {
                if(err) {
                    return callback(err);
                }
                if(docs.userId !== null) {
                    collection.update(query,{$set:{company: company}},true , function(err) {
                        //mongo.close();
                        if(err) {
                            return callback(err)
                        }
                        return callback(null);
                    })
                }
            })
        })
    })
}


weiUser.updateManager = function(data, callback) {

    var openid = data.openid;

    mongo.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('Managers', function(err, collection) {
            if(err, collection) {
                if(err) {
                    mongo.close();
                    return callback(err);
                }
                collection.update({"userId":openid},{$set:{"status": data.status2}}, function(err) {
                    //mongo.close();
                    if(err) {
                        return callback(err);
                    }
                    return callback(null);
                })
            }
        })
    })
}

weiUser.findManagers = function(school ,callback) {
    console.log("school"+school)
    mongo.open(function(err, db) {
        if(err) {
            return callback(err)
        }
        db.collection('Managers', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
            var query = {};

            if(school) {
                query.school = school
            }
            collection.findOne(query, function(err, docs) {

                if(err) {
                    return callback(err);
                }
                var index = "";
                if(docs) {
                   index = "ture"
                    return  callback(null, index)
                }else{
                    index = "false"
                    return  callback(null,index)
                }
            })
        })
    })
}


weiUser.checksManager = function(userId ,callback) {

    mongo.open(function(err, db) {
        if(err) {
            return callback(err)
        }
        db.collection('Managers', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
            var query = {};

            if(userId) {
                query.userId = userId
            }
            collection.findOne(query, function(err, docs) {

                if(err) {
                    return callback(err);
                }
                var index = ""
                if(docs && docs.status == true) {
                    index = "true"
                   return callback(null, index);
                }else{
                    index = "false"
                    return callback(null, index);
                }
            })
        })
    })
}


weiUser.ManagerPress = function(userId ,callback) {

    mongo.open(function(err, db) {
        if(err) {
            return callback(err)
        }
        db.collection('Managers', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
            var query = {};

            if(userId) {
                query.userId = userId
            }
            collection.findOne(query, function(err, docs) {

                if(err) {
                    return callback(err);
                }
                var index = ""
                if(docs && docs.status == "true") {
                    index = "true"
                    return callback(null, index);
                }else{
                    index = "false"
                    return callback(null, index);
                }
            })
        })
    })
}

weiUser.yourSchool = function(school ,callback) {
    console.log("school"+school)
    mongo.open(function(err, db) {
        if(err) {
            return callback(err)
        }
        db.collection('contest', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
            var query = {};

            if(school) {
                query.school = school
            }
            collection.findOne(query, function(err, docs) {

                if(err) {
                    return callback(err);
                }
                var index = "";
                if(docs) {
                    index = "ture"
                    return   callback(null, index)
                }else{
                    index = "false"
                    return  callback(null,index)
                }
            })
        })
    })
}



weiUser.findYouSchool = function(school ,callback) {
    mongo.open(function(err, db) {
        if(err) {
            return callback(err)
        }
        db.collection('contest', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
            var query = {}
            if(school) {
                query.school = school
            }
            collection.count(query, function(err, total) {
                if(err) {
                    return callback(err);
                }

                collection.find(query).toArray(function(err, docs) {
                    //mongo.close();
                    if(err) {
                        return callback(err);
                    }
                    return  callback(null, docs , total);
                })
            })

        })
    })
}


weiUser.findListName = function(projectId ,callback) {
    mongo.open(function(err, db) {
        if(err) {
            return callback(err)
        }
        db.collection('contest', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
            var query = {}
            if(query) {
                query._id = projectId
            }
          collection.findOne(query, function(err, docs){
              if(err) {
                  callback(err);
              }
              return  callback(null, docs);
          })

        })
    })
}


weiUser.checkwork = function(  projectId , data ,callback) {
    mongo.open(function(err, db) {
        if(err) {
            return callback(err)
        }
        db.collection('contest', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }

            var openid = data.openid;
            var status = data.status;

            console.log(projectId)
            console.log(openid)
            console.log(status)


            collection.update({"_id":projectId , joins:{$elemMatch:{priveteId:openid}}}, {$set:{"joins.$.status":status}},{w:0},function(err) {
                if(err) {
                    return callback(err);
                }
                return  callback(null);
            })

        })
    })
}

//查找当前比赛下的参赛作品, 并且检查joins 下的status的状态.
weiUser.showWorks = function(projectId ,callback) {
    mongo.open(function(err, db) {
        if(err) {
            return callback(err)
        }
        db.collection('contest', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }

            console.log(projectId)

            var query = {};
            if(query) {
                query._id = projectId
            }
            collection.findOne(query, function(err, docs) {
                if(err) {
                    console.log(err)
                }
                var len = docs.joins.length;
                return  callback(null, docs.joins, len)
            })

        })
    })
}

weiUser.checkSignUp = function(  projectId , openid ,callback) {
    mongo.open(function(err, db) {
        if(err) {
            return callback(err)
        }
        db.collection('contest', function(err, collection) {
            if(err) {
                mongo.close();
                return callback(err);
            }
            var query = {}

            if(query) {
                query._id = projectId
            }
           collection.findOne(query, function(err, docs) {
               if(err) {
                   console.log(err)
               }
               var status = "false";
               for(var i =0; i<docs.joins.length;i++) {
                   if(docs.joins[i].priveteId == openid) {
                     status = "true"
                   }
               }
               return callback(null, status)
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

