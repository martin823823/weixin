//
//{
//    'name' : '点出菜单',
//    'sub_button': [{
//    'type': 'view',
//    'name': '电影查询',
//    'url': 'http://mrq1itqtsf.proxy.qqbrowser.cc/movie'
//},{
//    'type': 'scancode_push',
//    'name':'事件',
//    'key':'qr_scan'
//},{
//    'type':'scancode_waitmsg',
//    'name':'扫码推送事件',
//    'key':'qr_scan_wait'
//},{
//    'type':'pic_sysphoto',
//    'name':'弹出拍照',
//    'key':'pic_photo'
//},{
//    'type':'pic_photo_or_album',
//    'name':'弹出拍照相册',
//    'key':'pic_photo_album'
//}]
//},{


    'use strict'

module.exports = {
    'button' : [
        {
        'name': '参赛作品',
        'sub_button':[
            {
                 'type':'view',
                'name': '赛事列表',
                'url': 'http://martinbo.s1.natapp.cc/list'
}
        ]},{     'name':'我',
           'sub_button':[{
               //'type':'pic_weixin',
               //'name':'微信发图',
               //'key':'pic_weixin'
               'name': '审核',
               'type':'view',
               'url': 'http://martinbo.s1.natapp.cc/premission'
            },
               {
                   //'type':'pic_weixin',
                   //'name':'微信发图',
                   //'key':'pic_weixin'
                   'name': '成功实例',
                   'type':'view',
                   'url': 'http://martinbo.s1.natapp.cc/premission'

               },{
                   //'type':'pic_weixin',
                   //'name':'微信发图',
                   //'key':'pic_weixin'
                   'name': '导入赛事',
                   'type':'view',
                   'url': 'http://martinbo.s1.natapp.cc/premission'

               }
           // , {
           //    'type': 'location_select',
           //    'name': '地理',
           //    'key': 'location_select'
           //    //}
           //    //},{
           //    //        'name':'发图片谢谢',
           //    //        'type':'media_id',
           //    //        'media_id':'6303015419572505333'
           //    //    },{
           //    //        'name':'跳转图文',
           //    //        'type':'view_limited',
           //    //        'media_id':'6303015419572505333'
           //    //    }]
           //}
           ]
    }]
}