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
        'name': '信息中心',
        'sub_button':[
          {
                'type':'view',
                'name': '行政公告',
                'url': 'http://martin123.natapp1.cc/notice'
            },
            {
                'type':'view',
                'name': '在途信息',
                'url': 'http://martin123.natapp1.cc/roadInfor'
            }
        ]},
        {     'name':'事务处理',
           'sub_button':[
               {
                   //'type':'pic_weixin',
                   //'name':'微信发图',
                   //'key':'pic_weixin'
                   'name': '我要报销',
                   'type':'view',
                   'url': 'http://martin123.natapp1.cc/expenses'

               },
           ]},
        {     'name':'个人中心',
            'sub_button':[{
                //'type':'pic_weixin',
                //'name':'微信发图',
                //'key':'pic_weixin'
                'name': '设置',
                'type':'view',
                'url': 'http://martin123.natapp1.cc/setInfor'
            }, {
                    //'type':'pic_weixin',
                    //'name':'微信发图',
                    //'key':'pic_weixin'
                    'name': '报销查询',
                    'type':'view',
                    'url': 'http://martin123.natapp1.cc/checkPay'

                }

            ]}

    ]
}