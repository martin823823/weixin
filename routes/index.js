var heredoc = require('heredoc');

//参建者的信息
//关注评委的信息
//小组ID
//只头一次
//数据库  票数1
//报名后重定向提交作品
// 修改详情
// 报名截止日期
// 星级( 作品推荐下载功能)
// 作品下载
// 往日获奖作品浏览,下载
// 改进报名状态
// 录入成绩,把前三名,录入数据库,
// 增加优秀作品借鉴,以及下载功能,


module.exports = {
     tpl : heredoc(function() {
        /*
         <!DOCTYPE html>
         <html>
         <head>
         <title>参赛时间 </title>
         <meta name = "viewport" content = "initial-scale=1, maximum-scale
         =1 , minimum-scale=1">
         <meta name="viewport" content="width=device-width, initial-scale=1">
         <link href="/stylesheets/bootstrap.min.css" rel="stylesheet" media="screen">
         <link href="  //res.wx.qq.com/open/libs/weui/0.4.2/weui.css" rel="stylesheet" media="screen">

         <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>
         <script src="/javascripts/bootstrap.min.js" type="text/javascript"></script>
         <script src="/javascript/bootstrap.js" type="text/javascript"></script>
         </head>
         <body>

         <%for(var i=0;i<len ;i++){%>

         <table class="table table-striped">
         <caption></caption>
         <thead>
         <tr>
         <th>小组照片</th>
         <th>组长</th>
         <th>队名</th>
         <th>票数</th>
         <th>小组人数</th>
         </tr>
         </thead>
         <tbody>
         <tr>
         <td><img src='<%= data.projects[i].Userpic%>' style="width: 100px; height: 100px"></td>
         <td><%= data.projects[i].capital%></td>
         <td><%= data.projects[i].username%></td>
         <td><%= data.projects[i].PV%></td>
         <td><%= data.projects[i].number%></td>
         </tr>
         </tbody>
         </table>
         <form method = 'post' action = '/vote'>

         <p>
         <button type="submit" class="btn btn-primary"
         data-toggle="button" id = "<%= data.projects[i].lab%>" name = "<%= data.projects[i].priveteId%>" onclick = "vote(this.id,this.name%>)">投票
         </button>
         </p>

         </form>

         <a style="text-decoration: none;" href = "/movie/<%= data.projects[i].lab%>/<%= data.projects[i].priveteId%>">
         <button class="btn btn-primary">
         详情
         </button>
         </a>


         <hr>
         <script type="text/javascript">

         function vote(userCheck , userId) {

           var getVote = <%= vote%>

         var userObj = {"userId" : userId, "userCheck":userCheck}
          if(getVote == 1) {
         $.ajax({
         url: '/vote',
         type: 'post',
         data: userObj ,
         success: function(data) {
         location.href = "/result"
         },
         error: function(data) {
         alert(data)
         }
         })
           }else{
             location.href = "/restart"
           }
         }
         </script>
          <%}%>

         </body>
         <script src="http://zeptojs.com/zepto-docs.min.js"></script>


         </html>
         */
    }),

    tpl2 : heredoc(function() {
        /*
         <!DOCTYPE html>
         <html>
         <head>
         <title>文件提交  </title>
         <meta name = "viewport" content = "initial-scale=1, maximum-scale
         =1 , minimum-scale=1">
         <meta name="viewport" content="width=device-width, initial-scale=1">
         <link href="/stylesheets/bootstrap.min.css" rel="stylesheet" media="screen">
         <link href="  //res.wx.qq.com/open/libs/weui/0.4.2/weui.css" rel="stylesheet" media="screen">

         <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>
         <script src="/javascripts/bootstrap.min.js" type="text/javascript"></script>
         <script src="/javascript/bootstrap.js" type="text/javascript"></script>
         </head>
         <body>

          <form enctype="multipart/form-data" method = 'post' action = '/profiles/<%= projectId%>' class="form-inline" role="form">
         <div class="form-group">
         <label class="sr-only" for="name">名称</label>
         <p>文件上传<p><br />
         <p>为了更好的预览,请将文件转化未PDF格式, 参考网址:https://www.freepdfconvert.com/zh-hans</p>
         </div>
         <hr>
         <div class="form-group">
         <label class="sr-only" for="inputfile">文件输入</label>
         <input type="file" name='pros' multiple id="">
         </div>
         <hr>

         <div class="checkbox">
         <label>
         <input type="checkbox"> 请打勾
         </label>
         </div>
         <button type="submit" class="weui_btn weui_btn_primary">提交</button>
         </form>




         <script src="http://zeptojs.com/zepto-docs.min.js"></script>
         </body>
         </html>
         */
    }),
       tpl3 : heredoc(function() {
        /*
         <!DOCTYPE html>
         <html>
         <head>
         <title>参赛报名 </title>
         <meta name = "viewport" content = "initial-scale=1, maximum-scale
         =1 , minimum-scale=1">
         <meta name="viewport" content="width=device-width, initial-scale=1">
         <link href="/stylesheets/bootstrap.min.css" rel="stylesheet" media="screen">
         <link href="  //res.wx.qq.com/open/libs/weui/0.4.2/weui.css" rel="stylesheet" media="screen">

         <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>
         <script src="/javascripts/bootstrap.min.js" type="text/javascript"></script>
         <script src="/javascript/bootstrap.js" type="text/javascript"></script>
         <script src="/javascript/index.js" type="text/javascript"></script>
         </head>
         <body>
         <%if(data.status2 == "true") {%>
         <div style="height: 10px">
         </div>



         <div class="weui_cells weui_cells_form">
         <div class="weui_cell">
         <div class="weui_cell_hd">
         <label class="weui_label">赛事编号</label>
         </div>
         <div class="weui_cell_bd weui_cell_primary">
         <input name="lab" id="lab"  class="weui_input" type="text" placeholder="团队名" value = "<%= id%>" readonly>
         </div>
         </div>
         </div>


         <div class="weui_cells weui_cells_form">
         <div class="weui_cell">
         <div class="weui_cell_hd">
         <label class="weui_label">团队名</label>
         </div>
         <div class="weui_cell_bd weui_cell_primary">
         <input name="username" id="username"  class="weui_input" type="text" placeholder="团队名">
         </div>
         </div>
         </div>

         <div class="weui_cells weui_cells_form">
         <div class="weui_cell">
         <div class="weui_cell_hd">
         <label class="weui_label">队长</label>
         </div>
         <div class="weui_cell_bd weui_cell_primary">
         <input name="capital" id="capital"  class="weui_input" type="text" placeholder="队长名">
         </div>
         </div>
         </div>

         <div class="weui_cells weui_cells_form">
         <div class="weui_cell">
         <div class="weui_cell_hd">
         <label class="weui_label">小组成员数</label>
         </div>
         <div class="weui_cell_bd weui_cell_primary">
         <input name="number" id="number"  class="weui_input" type="number" placeholder="输入小组成员数">
         </div>
         </div>
         </div>

         <div class="weui_cells weui_cells_form">
         <div class="weui_cell">
         <div class="weui_cell_hd">
         <label class="weui_label">院校</label>
         </div>
         <div class="weui_cell_bd weui_cell_primary">

         <select id="school">
         <%for(var i=0; i < len; i++ ) {%>
         <option value="<%= schoolList[i].schools%>"><%= schoolList[i].schools%></option>
         <%}%>
         </select>

         </div>
         </div>
         </div>


         <div class="weui_cells weui_cells_form">
         <div class="weui_cell">
         <div class="weui_cell_hd">
         <label class="weui_label">项目名字</label>
         </div>
         <div class="weui_cell_bd weui_cell_primary">
         <input name="project" id="project"  class="weui_input" type="text" placeholder=输入项目名字>
         </div>
         </div>
         </div>


         <div class="weui_cells weui_cells_form">
         <div class="weui_cell">
         <div class="weui_cell_bd weui_cell_primary">
         <textarea name="comment" id="comment" class="weui_textarea" placeholder="项目简介" rows="3"></textarea>
         <div class="weui_textarea_counter"><span>0</span>/200</div>
         </div>
         </div>
         </div>

         <div class="form-group">
         <div class="col-sm-offset-2 col-sm-10">
         <div class="checkbox">
         <label>
         <input type="checkbox">
         如果第一次提交信息有错,可以第二次提交进行修改
         </label>
         </div>
         </div>
         </div>
         <div class="form-group">
         <div class="col-sm-offset-2 col-sm-10">
         <button type="submit" class="weui_btn weui_btn_primary" id="inforBtn" onclick="information()">提交</button>
         </div>
         </div>
         <%}else{%>
             <p>报名已结束</p>
         <%}%>
         <script src="http://zeptojs.com/zepto-docs.min.js"></script>
         <script type="text/javascript" src="/javascripts/jquery.min.js"></script>

         <script>
         function information() {

         $('#inforBtn').attr("disabled",true)
         var lab = $("#lab").val();
         var username = $("#username").val();
         var capital = $("#capital").val();
         var school = $("#school").val();
         var number = $("#number").val();
         var project = $("#project").val();
         var comment = $("#comment").val();


         var data = {"lab": lab,"username":username,"capital":capital, "school": school, "number": number, "project": project,"comment":comment};
         $.ajax({
         url: '/information/<%= id%>',
         type: 'post',
         data:  data,
         success: function(data, status) {

         window.location.href="/checkInformation"
         },
         error: function(data, status) {

         }
         });
         }
         </script>
         </body>
         </html>
         */
       }),
         tpl4 : heredoc(function() {
            /*
             <!DOCTYPE html>
             <html>
             <head>
             <title>页面</title>
             <meta name = "viewport" content = "initial-scale=1, maximum-scale
             =1 , minimum-scale=1">
             <meta name="viewport" content="width=device-width, initial-scale=1">
             <link href="/stylesheets/bootstrap.min.css" rel="stylesheet" media="screen">
             <link href="  //res.wx.qq.com/open/libs/weui/0.4.2/weui.css" rel="stylesheet" media="screen">

             <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>
             <script src="/javascripts/bootstrap.min.js" type="text/javascript"></script>
             <script src="/javascript/bootstrap.js" type="text/javascript"></script>
             </head>
             <body>
             <span class="label label-info"><%= title%></span>
             <script src="http://zeptojs.com/zepto-docs.min.js"></script>
             </body>
             </html>
             */
           }),

              tpl5 : heredoc(function() {
           /*
            <!DOCTYPE html>
            <html>
            <head>
            <title>赛事列表</title>
            <meta name = "viewport" content = "initial-scale=1, maximum-scale
            =1 , minimum-scale=1">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="/stylesheets/bootstrap.min.css" rel="stylesheet" media="screen">
            <link href="  //res.wx.qq.com/open/libs/weui/0.4.2/weui.css" rel="stylesheet" media="screen">

            <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>
            <script src="/javascripts/bootstrap.min.js" type="text/javascript"></script>
            <script src="/javascript/bootstrap.js" type="text/javascript"></script>
            </head>
            <body>


            <div class="panel panel-info">
            <div class="panel-heading">
            <h3 class="panel-title"><%= data.lab%></h3>
            </div>
            <div class="panel-body">
            <p>团队名字:
          <%= data.username%>
          </p>
            </div>
            <div class="panel-body">
            <p>提交是日期 :
           <%= data.date%>
           </p>
            </div>
            <div class="panel-body">
            <p>队长:
            <%= data.capital%>
            </p>
            </div>
            <div class="panel-body">
            <p>小组人数:
            <%= data.number%>
            </p>
            </div>
            <div class="panel-body">
            <p>项目简介:
            <%= data.comment%>
             </p>
            </div>

            <a style="text-decoration: none;" href = "/movie/userproject/<%= data.lab%>/<%= data.priveteId%>">
            <button class="btn btn-primary">
            查看作品
            </button>
            </a>

            </div>

            <script src="http://zeptojs.com/zepto-docs.min.js"></script>
            </body>
            </html>
            */
          }),
             tpl6 : heredoc(function() {
              /*
               <!DOCTYPE html>
               <html>
               <head>
               <title>页面</title>
               <meta name = "viewport" content = "initial-scale=1, maximum-scale
               =1 , minimum-scale=1">
               <meta name="viewport" content="width=device-width, initial-scale=1">
               <link href="/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker.min.css" rel="stylesheet" media="screen">
               <link rel="stylesheet/less" href="/bootstrap-datetimepicker-master/build/build_standalone.less">

               <link href="/stylesheets/bootstrap.min.css" rel="stylesheet" media="screen">
               <link href="  //res.wx.qq.com/open/libs/weui/0.4.2/weui.css" rel="stylesheet" media="screen">

               <script src="/bootstrap-datetimepicker-master/js/locales/bootstrap-datetimepicker.zh-CN.js" type="text/javascript"></script>

               <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>
               <script src="/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
               <script src="/javascripts/bootstrap.min.js" type="text/javascript"></script>
               <script src="/javascript/bootstrap.js" type="text/javascript"></script>

               </head>
               <body>


               <div class="panel panel-info">
               <div class="panel-heading">
               <h3 class="panel-title">导入比赛</h3>
               </div>
               <div class="panel-body">
               <p>比赛时间: </p><div class="input-append date form_datetime">
               <input size="16" type="text" name="time" id="time" value="" readonly>

               <span class="add-on"><i class="icon-th"></i></span>


               </div>

               </div>

               <div class="panel-body">
               <p>报名状态: </p><input type="text" name= "status" id="status" class="form-control" id="lastname">
               </div>

               <div class="panel-body">
               <p>比赛海报: </p><input type="text" name= "pic"  id="pic" class="form-control" id="lastname">
               </div>


                <div class="panel-body">
               <p>院校: </p>
                <select id="school">
               <%for(var i=0; i < len; i++ ) {%>
               <option value="<%= schoolList[i].schools%>"><%= schoolList[i].schools%></option>
               <%}%>
               </select>
               </div>



               <div class="panel-body">
               <p>比赛名字: </p><input type="text" name= "name" id="name" class="form-control" id="lastname">
               </div>

                <div class="panel-body">
               <p>比赛介绍: </p>
               <textarea name="comment" id="comment" class="form-control" placeholder="比赛介绍" rows="3"></textarea>
               </div>


               <div class="panel-body">
               <p>比赛地点: </p><input type="text" name= "place" id="place" class="form-control" id="lastname">
               </div>
               <div class="panel-body">
               <p>主办方: </p><input type="text" name= "part" id="part" class="form-control" id="lastname">
               </div>
               </div>
               <div class="col-sm-offset-2 col-sm-10">
               <button type="submit" id="buttonID" class="weui_btn weui_btn_primary">提交</button>
               </div>



               <script src="http://zeptojs.com/zepto-docs.min.js"></script>
               <script type="text/javascript">
               $(".form_datetime").datetimepicker({format: 'yyyy-mm-dd hh:ii'});
               </script>
               <script type="text/javascript" src="/javascripts/jquery.min.js"></script>

               <script>
               $("#buttonID").on('click',function(){

               $('#buttonID').attr("disabled",true)
               var time = $("#time").val();
               var status = $("#status").val();
               var school = $("#school").val();
               var pic = $("#pic").val();
               var name = $("#name").val();
               var place = $("#place").val();
               var part = $("#part").val();
               var comment = $("#comment").val();

               var data = {"time": time,"status":status,"pic":pic, "school": school, "name": name, "place": place,"part":part,"comment":comment};
               $.ajax({
               url: '/inputList',
               type: 'post',
               data:  data,
               success: function(data, status) {
               index = "true"
               window.location.href="/inputList"
               },
               error: function(data, status) {

               }

               });

               });

               </script>
               </body>
               </html>
               */
             }),
                tpl7 : heredoc(function() {
                 /*
                  <!DOCTYPE html>
                  <html>
                  <head>
                  <title>页面</title>
                  <meta name = "viewport" content = "initial-scale=1, maximum-scale
                  =1 , minimum-scale=1">
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                  <link href="/stylesheets/bootstrap.min.css" rel="stylesheet" media="screen">
                  <link href="  //res.wx.qq.com/open/libs/weui/0.4.2/weui.css" rel="stylesheet" media="screen">

                  <link href="/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker.min.css" rel="stylesheet" media="screen">
                  <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>
                  <script src="/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker.min.js" type="text/javascript"></script>
                  <script src="/bootstrap-datetimepicker-master/js/locales/bootstrap-datetimepicker.zh-CN.js" type="text/javascript"></script>
                  <script src="/javascripts/bootstrap.min.js" type="text/javascript"></script>
                  <script src="/javascript/bootstrap.js" type="text/javascript"></script>
                  </head>
                  <body>
                  <%for(var i = 0; i < len; i++ ) {%>

                  <div class="panel panel-info">
                  <div class="panel-heading">
                  <h3 class="panel-title">赛事</h3>
                  </div>

                  <div class="panel-body">
                  <p>赛事海报: </p>
                  <img style="width:190px;height:150px" src="<%= data[i].pic%>">

                  </div>

                  <div class="panel-body">
                  <p>赛事ID:
                  <%= data[i]._id%>
                  </p>
                  </div>

                  <div class="panel-body">
                  <p> 报名状态:
                  <%if(data[i].status2 === "true") {%>
                  <%= data[i].status%>
                  <a style="text-decoration: none;" href = "/information/<%= data[i]._id%>">
                  <button class="btn btn-primary">
                  报名
                  </button>
                  </a>
                  <%}else{%>
                  报名已经截止
                  <%}%>
                  </p>
                  </div>

                  <div class="panel-body">
                  <p>比赛日期 :
                  <%= data[i].date%>
                  </p>
                  </div>
                  <div class="panel-body">
                  <p>比赛名:
                  <%= data[i].name%>
                  </p>
                  </div>
                  <div class="panel-body">
                  <p>比赛地点:
                  <%= data[i].place%>
                  </p>
                  </div>

                  <a style="text-decoration: none;" href = "/movie/<%= data[i]._id%>">
                  <button class="btn btn-primary">
                  参加作品
                  </button>
                  </a>

                  <a style="text-decoration: none;" href = "/progress/<%= data[i]._id%>">
                  <button class="btn btn-primary">
                  查看排名
                  </button>
                  </a>

                  </div>

                  <%}%>



                  <script src="http://zeptojs.com/zepto-docs.min.js"></script>
                  </body>
                  </html>
                  */
                }),
                 tpl8 : heredoc(function() {
                  /*
                   <!DOCTYPE html>
                   <html>
                   <head>
                   <title>页面</title>
                   <meta name = "viewport" content = "initial-scale=1, maximum-scale
                   =1 , minimum-scale=1">
                   <meta name="viewport" content="width=device-width, initial-scale=1">
                   <link href="/stylesheets/bootstrap.min.css" rel="stylesheet" media="screen">
                   <link href="  //res.wx.qq.com/open/libs/weui/0.4.2/weui.css" rel="stylesheet" media="screen">

                   <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>
                   <script src="/javascripts/bootstrap.min.js" type="text/javascript"></script>
                   <script src="/javascript/bootstrap.js" type="text/javascript"></script>
                   </head>
                   <body>

                   <div class="panel panel-info">
                   <div class="panel-heading">
                   <h3 class="panel-title">文件</h3>
                   </div>
                   <p>点击右上方 --> 打开在浏览器中浏览 ---> 点击查看文件</p>

                   <p>文件不支持在微信中打开,请在浏览器打开本页面</p>
                   <div class="panel-body">


                   <p>项目文件:
                   <a href= "<%= data.downloadUrl%>">查看文件</a>
                   </p>
                   </div>
                   </div>

                   <script src="http://zeptojs.com/zepto-docs.min.js"></script>
                   </body>
                   </html>
                   */
                 }),
                  tpl9 : heredoc(function() {
                   /*
                    <!DOCTYPE html>
                    <html>
                    <head>
                    <title>页面</title>
                    <meta name = "viewport" content = "initial-scale=1, maximum-scale
                    =1 , minimum-scale=1">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <link href="/stylesheets/bootstrap.min.css" rel="stylesheet" media="screen">
                    <link href="  //res.wx.qq.com/open/libs/weui/0.4.2/weui.css" rel="stylesheet" media="screen">

                    <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>
                    <script src="/javascripts/bootstrap.min.js" type="text/javascript"></script>
                    <script src="/javascript/bootstrap.js" type="text/javascript"></script>
                    </head>
                    <body>

                    <div class="panel panel-info">
                    <div class="panel-heading">
                    <h3 class="panel-title">票数</h3>
                    </div>
                    <div class="panel-body">
                    <p>小组票数:
                      <%= data.PV%>
                    </p>
                    </div>
                    </div>

                    <script src="http://zeptojs.com/zepto-docs.min.js"></script>
                    </body>
                    </html>
                    */
                  }),
                   tpl10 : heredoc(function() {
                    /*
                     <!DOCTYPE html>
                     <html>
                     <head>
                     <title>页面</title>
                     <meta name = "viewport" content = "initial-scale=1, maximum-scale
                     =1 , minimum-scale=1">
                     <meta name="viewport" content="width=device-width, initial-scale=1">
                     <link href="/stylesheets/bootstrap.min.css" rel="stylesheet" media="screen">
                     <link href="  //res.wx.qq.com/open/libs/weui/0.4.2/weui.css" rel="stylesheet" media="screen">

                     <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>
                     <script src="/javascripts/bootstrap.min.js" type="text/javascript"></script>
                     <script src="/javascript/bootstrap.js" type="text/javascript"></script>
                     </head>
                     <body>
                     <span class="label label-info"><%= title%></span>
                     <script src="http://zeptojs.com/zepto-docs.min.js"></script>
                     </body>
                     </html>
                     */
                   }),
                     tpl11 : heredoc(function() {
                      /*
                       <!DOCTYPE html>
                       <html>
                       <head>
                       <title>页面</title>
                       <meta name = "viewport" content = "initial-scale=1, maximum-scale
                       =1 , minimum-scale=1">
                       <meta name="viewport" content="width=device-width, initial-scale=1">
                       <link href="/stylesheets/bootstrap.min.css" rel="stylesheet" media="screen">
                       <link href="  //res.wx.qq.com/open/libs/weui/0.4.2/weui.css" rel="stylesheet" media="screen">

                       <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>
                       <script src="/javascripts/bootstrap.min.js" type="text/javascript"></script>
                       <script src="/javascript/bootstrap.js" type="text/javascript"></script>
                       </head>
                       <body>



                       <form class="form-horizontal" role="form" method = 'post' action = '/checkPro'>
                       <div class="form-group">
                       <label for="firstname" class="col-sm-2 control-label">projectID</label>
                       <div class="col-sm-10">
                       <input type="text" class="form-control" name="projectID"  id="firstname" placeholder="projectID">
                       </div>
                       </div>
                       <div class="form-group">
                       <label for="lastname" class="col-sm-2 control-label">openID</label>
                       <div class="col-sm-10">
                       <input type="text" class="form-control" name="openID" id="lastname" placeholder="openID">
                       </div>
                       </div>

                       <div class="form-group">
                       <label for="lastname" class="col-sm-2 control-label">date</label>
                       <div class="col-sm-10">
                       <input type="text" class="form-control" name="date" id="lastname" placeholder="date">
                       </div>
                       </div>

                       <div class="form-group">
                       <label for="lastname" class="col-sm-2 control-label">status</label>
                       <div class="col-sm-10">
                       <input type="text" class="form-control" name="status" id="lastname" placeholder="date">
                       </div>
                       </div>


                       <div class="form-group">
                       <label for="lastname" class="col-sm-2 control-label">Pic</label>
                       <div class="col-sm-10">
                       <input type="text" class="form-control" name="Pic" id="lastname" placeholder="Pic">
                       </div>
                       </div>

                       <div class="form-group">
                       <label for="lastname" class="col-sm-2 control-label">name</label>
                       <div class="col-sm-10">
                       <input type="text" class="form-control" name="name"  id="lastname" placeholder="name">
                       </div>
                       </div>

                       <div class="form-group">
                       <label for="lastname" class="col-sm-2 control-label">place</label>
                       <div class="col-sm-10">
                       <input type="text" class="form-control" name="place" id="lastname" placeholder="place">
                       </div>
                       </div>

                       <div class="form-group">
                       <label for="lastname" class="col-sm-2 control-label">part</label>
                       <div class="col-sm-10">
                       <input type="text" class="form-control" name="part" id="lastname" placeholder="part">
                       </div>
                       </div>

                       <div class="form-group">
                       <div class="col-sm-offset-2 col-sm-10">
                       <div class="checkbox">
                       <label>
                       <input type="checkbox">请记住我
                       </label>
                       </div>
                       </div>
                       </div>
                       <div class="form-group">
                       <div class="col-sm-offset-2 col-sm-10">
                       <button type="submit" class="btn btn-default">submit</button>
                       </div>
                       </div>
                       </form>

                       <script src="http://zeptojs.com/zepto-docs.min.js"></script>
                       </body>
                       </html>
                       */
                     }),
                      tpl12 : heredoc(function() {
                       /*
                        <!DOCTYPE html>
                        <html>
                        <head>
                        <title>页面</title>
                        <meta name = "viewport" content = "initial-scale=1, maximum-scale
                        =1 , minimum-scale=1">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <link href="/stylesheets/bootstrap.min.css" rel="stylesheet" media="screen">
                        <link href="  //res.wx.qq.com/open/libs/weui/0.4.2/weui.css" rel="stylesheet" media="screen">

                        <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>
                        <script src="/javascripts/bootstrap.min.js" type="text/javascript"></script>
                        <script src="/javascript/bootstrap.js" type="text/javascript"></script>
                        </head>
                        <body>

                        <form method = 'post' action = '/alstatus' >
                        <div class="panel panel-info">
                        <div class="panel-heading">
                        <h3 class="panel-title">修改状态</h3>
                        </div>
                        <div class="panel-body">
                        <p>状态: </p><input type="text" name="status"  class="form-control" id="lastname"
                        </div>

                        <div class="panel-body">
                        <p>openID: </p><input type="text" name="openID"  class="form-control" id="lastname"
                        </div>

                        </div>
                        <div class="col-sm-offset-2 col-sm-10">
                        <button type="submit" class="btn btn-default">提交</button>
                        </div>
                        </form>

                        <script src="http://zeptojs.com/zepto-docs.min.js"></script>
                        </body>
                        </html>
                        */
                      }),
                        tpl13 : heredoc(function() {
                         /*
                          <!DOCTYPE html>
                          <html>
                          <head>
                          <title>页面</title>
                          <meta name = "viewport" content = "initial-scale=1, maximum-scale
                          =1 , minimum-scale=1">
                          <meta name="viewport" content="width=device-width, initial-scale=1">
                          <link href="/stylesheets/bootstrap.min.css" rel="stylesheet" media="screen">
                          <link href="  //res.wx.qq.com/open/libs/weui/0.4.2/weui.css" rel="stylesheet" media="screen">

                          <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>
                          <script src="/javascripts/bootstrap.min.js" type="text/javascript"></script>
                          <script src="/javascript/bootstrap.js" type="text/javascript"></script>
                          </head>
                          <body>

                          <%for(var i = 0 ; i < len; i++) {%>
                          <div class="panel panel-info">
                          <div class="panel-heading">
                          <h3 class="panel-title"><%= data.lab%></h3>
                          </div>

                          <div class="panel-body">
                          <p>排名:
                          第<%= i+1%>名
                          </p>
                          </div>

                          <div class="panel-body">
                          <p>小组照片:
                           <img style="width:140px; height: 140px" src = "<%= data[i].Userpic%>">
                          </p>
                          </div>
                          <div class="panel-body">
                          <p>小组名 :
                          <%= data[i].username%>
                          </p>
                          </div>


                          </div>
                           <%}%>

                          <script src="http://zeptojs.com/zepto-docs.min.js"></script>
                          </body>
                          </html>
                          */
                        }),
                          tpl14 : heredoc(function() {
                           /*
                            <!DOCTYPE html>
                            <html>
                            <head>
                            <title>页面</title>
                            <meta name = "viewport" content = "initial-scale=1, maximum-scale
                            =1 , minimum-scale=1">
                            <meta name="viewport" content="width=device-width, initial-scale=1">
                            <link href="/stylesheets/bootstrap.min.css" rel="stylesheet" media="screen">
                            <link href="  //res.wx.qq.com/open/libs/weui/0.4.2/weui.css" rel="stylesheet" media="screen">

                            <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>
                            <script src="/javascripts/bootstrap.min.js" type="text/javascript"></script>
                            <script src="/javascript/bootstrap.js" type="text/javascript"></script>
                            </head>
                            <body>

                            <form method = 'post' action = '/updatePro' >
                            <div class="panel panel-info">
                            <div class="panel-heading">
                            <h3 class="panel-title">文件预览修改</h3>
                            </div>

                            <div class="panel-body">
                            <p>projectID: </p><input type="text" name="projectID"  class="form-control" id="lastname"
                            </div>

                            <div class="panel-body">
                            <p>openID: </p><input type="text" name="openID"  class="form-control" id="lastname"
                            </div>


                            <div class="panel-body">
                            <p>profile: </p><input type="text" name="profiles"  class="form-control" id="lastname"
                            </div>

                            </div>
                            <div class="col-sm-offset-2 col-sm-10">
                            <button type="submit" class="btn btn-default">提交</button>
                            </div>
                            </form>


                            <script src="http://zeptojs.com/zepto-docs.min.js"></script>
                            </body>
                            </html>
                            */
                          }),
                            tpl15 : heredoc(function() {
                             /*
                              <!DOCTYPE html>
                              <html>
                              <head>
                              <title>页面</title>
                              <meta name = "viewport" content = "initial-scale=1, maximum-scale
                              =1 , minimum-scale=1">
                              <meta name="viewport" content="width=device-width, initial-scale=1">
                              <link href="/stylesheets/bootstrap.min.css" rel="stylesheet" media="screen">
                              <link href="  //res.wx.qq.com/open/libs/weui/0.4.2/weui.css" rel="stylesheet" media="screen">

                              <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>
                              <script src="/javascripts/bootstrap.min.js" type="text/javascript"></script>
                              <script src="/javascript/bootstrap.js" type="text/javascript"></script>
                              </head>
                              <body>

                              <form method = 'post' action = '/status2' >
                              <div class="panel panel-info">
                              <div class="panel-heading">
                              <h3 class="panel-title">状态修改</h3>
                              </div>

                              <div class="panel-body">
                              <p>projectID: </p><input type="text" name="projectID"  class="form-control" id="lastname"
                              </div>

                              <div class="panel-body">
                              <p>status: </p><input type="text" name="status2"  class="form-control" id="lastname"
                              </div>

                              </div>
                              <div class="col-sm-offset-2 col-sm-10">
                              <button type="submit" class="weui_btn weui_btn_primary">提交</button>
                              </div>
                              </form>


                              <script src="http://zeptojs.com/zepto-docs.min.js"></script>
                              </body>
                              </html>
                              */
                            }),
                            tpl16 : heredoc(function() {
                             /*
                              <!DOCTYPE html>
                              <html>
                              <head>
                              <title>页面</title>
                              <meta name = "viewport" content = "initial-scale=1, maximum-scale
                              =1 , minimum-scale=1">
                              <meta name="viewport" content="width=device-width, initial-scale=1">
                              <link href="/stylesheets/bootstrap.min.css" rel="stylesheet" media="screen">
                              <link href="  //res.wx.qq.com/open/libs/weui/0.4.2/weui.css" rel="stylesheet" media="screen">

                              <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>
                              <script src="/javascripts/bootstrap.min.js" type="text/javascript"></script>
                              <script src="/javascript/bootstrap.js" type="text/javascript"></script>
                              </head>
                              <body>


                              <%for(var i = 0; i < len; i++ ) {%>
                              <div class="weui_panel weui_panel_access">
                              <div class="weui_panel_hd">点击在右上角,在浏览器打开本页面,浏览文件(电脑可下载文件)</div>
                              <div class="weui_panel_bd">
                              <a href="<%= data[i].data[0].downloadUrl%>" class="weui_media_box weui_media_appmsg">
                              <div class="weui_media_hd">
                              <img class="weui_media_appmsg_thumb" src="http://7xt1fn.com1.z0.glb.clouddn.com/myPicture/IMG_20160520_092515.jpg" alt="">
                              </div>
                              <div class="weui_media_bd">
                              <h4 class="weui_media_title">项目名字</h4>
                              <p class="weui_media_desc"><%= data[i].data[0].profile%></p>
                              </div>
                              </a>

                              </div>

                              </div>
                              <%}%>



                              <script src="http://zeptojs.com/zepto-docs.min.js"></script>
                              </body>
                              </html>
                              */
                            }),
                             tpl17 : heredoc(function() {
                              /*
                               <!DOCTYPE html>
                               <html>
                               <head>
                               <title>页面</title>
                               <meta name = "viewport" content = "initial-scale=1, maximum-scale
                               =1 , minimum-scale=1">
                               <meta name="viewport" content="width=device-width, initial-scale=1">
                               <link href="/stylesheets/bootstrap.min.css" rel="stylesheet" media="screen">
                               <link href="  //res.wx.qq.com/open/libs/weui/0.4.2/weui.css" rel="stylesheet" media="screen">

                               <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>
                               <script src="/javascripts/bootstrap.min.js" type="text/javascript"></script>
                               <script src="/javascript/bootstrap.js" type="text/javascript"></script>
                               </head>
                               <body>
                               <span class="label label-info"><%= title%></span>
                               <script src="http://zeptojs.com/zepto-docs.min.js"></script>
                               </body>
                               </html>
                               */
                             }),
                                tpl18 : heredoc(function() {
                            /*
                             <!DOCTYPE html>
                             <html>
                             <head>
                             <title>管理员申请 </title>
                             <meta name = "viewport" content = "initial-scale=1, maximum-scale
                             =1 , minimum-scale=1">
                             <meta name="viewport" content="width=device-width, initial-scale=1">
                             <link href="/stylesheets/bootstrap.min.css" rel="stylesheet" media="screen">
                             <link href="  //res.wx.qq.com/open/libs/weui/0.4.2/weui.css" rel="stylesheet" media="screen">

                             <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>
                             <script src="/javascripts/bootstrap.min.js" type="text/javascript"></script>
                             <script src="/javascript/bootstrap.js" type="text/javascript"></script>
                             <script src="/javascript/index.js" type="text/javascript"></script>
                             </head>
                             <body>
                             <div style="height: 10px">
                             </div>

                           <%if(status==="false") {%>
                             <div class="weui_cells weui_cells_form">
                             <div class="weui_cell">
                             <div class="weui_cell_hd">
                             <label class="weui_label">姓名</label>
                             </div>
                             <div class="weui_cell_bd weui_cell_primary">
                             <input name="username" id="name"  class="weui_input" type="text" placeholder="姓名">
                             <input  id="status"  class="weui_input" type="hidden" value="false">
                             </div>
                             </div>
                             </div>

                             <div class="weui_cells weui_cells_form">
                             <div class="weui_cell">
                             <div class="weui_cell_hd">
                             <label class="weui_label">院校</label>
                             </div>
                             <div class="weui_cell_bd weui_cell_primary">

                             <select id="school">
                             <%for(var i=0; i < len1; i++ ) {%>
                             <option value="<%= schoolList[i].schools%>"><%= schoolList[i].schools%></option>
                             <%}%>
                             </select>

                             </div>
                             </div>
                             </div>

                             <div class="weui_cells weui_cells_form">
                             <div class="weui_cell">
                             <div class="weui_cell_hd">
                             <label class="weui_label">职位</label>
                             </div>
                             <div class="weui_cell_bd weui_cell_primary">
                             <select id="work">
                             <%for(var i=0; i < len2; i++ ) {%>
                             <option value="<%= workList[i].works%>"><%= workList[i].works%></option>
                             <%}%>
                             </select>
                             </div>
                             </div>
                             </div>



                             <div class="weui_cells weui_cells_form">
                             <div class="weui_cell">
                             <div class="weui_cell_hd">
                             <label class="weui_label">电话</label>
                             </div>
                             <div class="weui_cell_bd weui_cell_primary">
                             <input name="phone" id="phone"  class="weui_input" type="number" placeholder=电话>
                             </div>
                             </div>
                             </div>

                             <div class="weui_cells weui_cells_form">
                             <div class="weui_cell">
                             <div class="weui_cell_hd">
                             <label class="weui_label">邮箱</label>
                             </div>
                             <div class="weui_cell_bd weui_cell_primary">
                             <input name="email" id="email"  class="weui_input" type="email" placeholder=邮箱>
                             </div>
                             </div>
                             </div>


                             <div class="form-group">
                             <div class="col-sm-offset-2 col-sm-10">
                             <div class="checkbox">
                             <label>
                             <input type="checkbox"> 请记住我
                             </label>
                             </div>
                             </div>
                             </div>
                             <div class="form-group">
                             <div class="col-sm-offset-2 col-sm-10">
                             <button type="submit" class="weui_btn weui_btn_primary" id="" onclick="check()">提交</button>
                             </div>
                             </div>

                             <%}else{%>

                                <p>该院校已报名</p>
                             <%}%>
                             <script src="http://zeptojs.com/zepto-docs.min.js"></script>
                             <script type="text/javascript" src="/javascripts/jquery.min.js"></script>

                              <script>
                             function check() {

                             var name = $("#name").val();
                             var phone = $("#phone").val();
                             var email = $("#email").val();
                             var school = $("#school").val();
                             var work = $("#work").val();
                             var status = $("#status").val();


                             var data = {"name": name,"phone":phone,"email":email, "school": school, "work": work, "status": status};
                             $.ajax({
                             url: '/premission',
                             type: 'post',
                             data:  data,
                             success: function(data, status) {
                              alert("申请已提交,等待审核");
                              window.location.href="/list"
                             },
                             error: function(data, status) {

                             }
                             });
                             }
                              </script>


                             </body>
                             </html>
                             */
                           }),
                            tpl19 : heredoc(function() {
                             /*
                              <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                              <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
                              <head>
                              <title>Cross-Browser QRCode generator for Javascript</title>
                              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                              <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no" />
                              <script type="text/javascript" src="/javascripts/jquery.min.js"></script>
                              <script type="text/javascript" src="/javascripts/qrcode.js"></script>


                              <link rel="shortcut icon" href="//res.wx.qq.com/a/wx_fed/webwx/res/static/img/3wOU-7F.ico" type="image/x-icon"/>
                              <link rel="icon" sizes="192x192" href="//res.wx.qq.com/a/wx_fed/webwx/res/static/img/qMUjOdv.png" type="image/png" />
                              <link rel="icon" sizes="128x128" href="//res.wx.qq.com/a/wx_fed/webwx/res/static/img/2kAS7mD.png" type="image/png" />
                              <link rel="apple-touch-icon" sizes="128x128" href="//res.wx.qq.com/a/wx_fed/webwx/res/static/img/2kAS7mD.png" type="image/png" />
                              <!--style-->
                              <!--style-->
                              <!--[if lt IE 9]>


                              <![endif]-->
                              <link rel="stylesheet" href="//res.wx.qq.com/a/wx_fed/webwx/res/static/css/f97670b1601457f4e7155a8f60c019b3.css"/></head>


                              </head>
                              <body>
                              <input id="text" type="hidden" value="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd58fb049ed02ac45&redirect_uri=http://martinbo.s1.natapp.cc/Getcode&response_type=code&scope=snsapi_userinfo&#wechat_redirect" style="width:80%" /><br />
                              <div id="qrcode" style="width:100px; height:100px; margin-top:15px;"></div>

                              <div style="margin-left: 500px;margin-top: 280px">
                              <p class="sub_title" style="font-size:100%">使用手机微信扫码登录</p>
                              </div>
                              <script type="text/javascript">
                              var qrcode = new QRCode(document.getElementById("qrcode"), {
                              width : 250,
                              height : 250
                              });

                              function makeCode () {
                              var elText = document.getElementById("text");

                              if (!elText.value) {
                              alert("Input a text");
                              elText.focus();
                              return;
                              }

                              qrcode.makeCode(elText.value);
                              }

                              makeCode();

                              $("#text").
                              on("blur", function () {
                              makeCode();
                              }).
                              on("keydown", function (e) {
                              if (e.keyCode == 13) {
                              makeCode();
                              }
                              });



                              function poll() {
                              $.ajax({
                              url: '/Getcode',
                              type: 'get',
                              success: function(data) {
                              if(data.code == null || data.code== '/Getcode') {
                              poll()
                              }else {
                              var myCode = data.code
                              alert(myCode);
                              var url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxd58fb049ed02ac45&secret=4b8fbe4c34f99bce3af9a0c5911a5bee&code='+myCode+'&grant_type=authorization_code'

                              myCode = null;

                              getopenid(function(data) {
                                if(data){
                                location.href="http://martinbo.s1.natapp.cc/WebPage"
                                }

                              })


                              }
                              }
                              })

                              }
                              poll()

                              function getopenid(callback) {

                              $.ajax({
                              url: '/getopen',
                              type: 'get',
                              success: function(data) {
                               alert(data.code);
                               callback(data.code);
                              },

                              })


                              }


                              </script>
                              </body>
                              </html>


                              */
                            }),
                              tpl20 : heredoc(function() {
                           /*
                            <!DOCTYPE html>
                            <html>
                            <head>
                            <title>页面</title>
                            <meta name = "viewport" content = "initial-scale=1, maximum-scale
                            =1 , minimum-scale=1">
                            <meta name="viewport" content="width=device-width, initial-scale=1">
                            <link href="/stylesheets/bootstrap.min.css" rel="stylesheet" media="screen">
                            <link href="  //res.wx.qq.com/open/libs/weui/0.4.2/weui.css" rel="stylesheet" media="screen">

                            <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>
                            <script src="/javascripts/bootstrap.min.js" type="text/javascript"></script>
                            <script src="/javascript/bootstrap.js" type="text/javascript"></script>
                            </head>
                            <body>
                            <h1>报名登陆界面</h1>
                            <form action="/reg" method="post">
                              <input type="text" name="name" placeholder="姓名">
                              <input type="password" name="password' placeholder="密码">
                              <input type="text" name="regNumber" placeholder="注册码">
                            <input type="submit" value="submit">
                            </form>
                            <script src="http://zeptojs.com/zepto-docs.min.js"></script>
                            </body>
                            </html>
                            */
                          }),
                            tpl21 : heredoc(function() {
                             /*
                              <!DOCTYPE html>
                              <html>
                              <head>
                              <title>web页面</title>

                              </head>
                              <body>
                              <p>选择大赛的名称,进行文件的上传</p>
                              <form>
                              <select id="select_id">
                              <option value="58350c3f48cac10e08715912">app</option>
                              <option value="58d4d580aebe6350460d0ba5">微信</option>
                              </select>
                              <input type="hidden" id="myOpenid" value="<%= openid%>">
                              <input type="button" value="下一步" onclick="postProfile()">
                              </form>

                              <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>

                              <script>

                               function postProfile() {
                              var getValue = $("#select_id").val();
                              var getOpenid = $("#myOpenid").val();

                              var data = {"projectName": getValue, "getOpenid": getOpenid}

                              $.ajax({
                              url: '/postProfile',
                              type: 'post',
                              data: data,
                              success: function() {
                              location.href = "/profiles/"+getValue
                              }

                              })
                               }


                              </script>

                              </body>
                              </html>
                              */
                            }),
                            tpl22 : heredoc(function() {
                             /*
                              <!DOCTYPE html>
                              <html>
                              <head>
                              <title>页面</title>
                              <meta name = "viewport" content = "initial-scale=1, maximum-scale
                              =1 , minimum-scale=1">
                              <meta name="viewport" content="width=device-width, initial-scale=1">
                              <link href="/stylesheets/bootstrap.min.css" rel="stylesheet" media="screen">
                              <link href="  //res.wx.qq.com/open/libs/weui/0.4.2/weui.css" rel="stylesheet" media="screen">

                              <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>
                              <script src="/javascripts/bootstrap.min.js" type="text/javascript"></script>
                              <script src="/javascript/bootstrap.js" type="text/javascript"></script>
                              </head>
                              <body>
                              <span class="label label-info"><%= title%></span>
                              <br />
                              <span class="label label-info">请在电脑上打开网址: http://martinbo.s1.natapp.cc/code</span>
                              <script src="http://zeptojs.com/zepto-docs.min.js"></script>
                              </body>
                              </html>
                              */
                            }),

                          tpl23: heredoc(function() {
                           /*
                            <!DOCTYPE HTML>
                            <html>
                            <head>
                            <title>赛事列表</title>
                            <!-- Custom Theme files -->
                            <meta name="viewport" content="width=device-width, initial-scale=1">
                            <script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
                            <meta name="keywords" content="赛事列表" />
                            <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
                            <script src="js/jquery-1.11.1.min.js"></script>
                            <!-- Custom Theme files -->
                            <link href="/showStyle/css/style.css" rel='stylesheet' type='text/css' />
                            <script type="text/javascript" src="/showStyle/js/Chart.js"></script>
                            <!-- Google Fonts -->
                            <link href='http://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900' rel='stylesheet' type='text/css'>
                            <!---tage-script---->
                            <!-- start price_bar  -->
                            <link href="/showStyle/css/jquery.nouislider.css" rel="stylesheet">
                            <script src="/showStyle/js/jquery.nouislider.js"></script>
                            <link rel="stylesheet" type="text/css" href="/showStyle/css/fd-slider.css">
                            <script type="text/javascript" src="/showStyle/js/fd-slider.js"></script>

                            <script src="/showStyle/js/easyResponsiveTabs.js" type="text/javascript"></script>

                            <!----Calender -------->
                            <link rel="stylesheet" href="/showStyle/css/clndr.css" type="text/css" />

                            <!----End Calender -------->
                            </head>
                            <body>
                            <%for(var i = 0; i < len; i++ ) {%>

                            <div class="twitter_widget_1">
                            <div class="twit_1_banner">
                            <div class="twit_1_img"><a href="#"><img style="width: 320px; height: 193px;" src="<%= data[i].pic%>" alt="" /></a></div>
                            </div>
                            <ul class="twit_nav">
                            <li><a href="#" class="twit_1"><p><span>已报名</span><br><%= data[i].projects.length%> &nbsp 组</p></a></li>
                            <li><a href="#" class="twit_2"><p><span>比赛名</span><br> <%= data[i].name%></p></a></li>
                            <li><a href="#" class="twit_3"><p><span>比赛地点</span><br> <%= data[i].place%></p></a></li>
                            </ul>
                            <div class="latest_tweets">

                             <br />
                            <h3>报名状态:





                            <%if(data[i].status2 === "true") {%>

                            <a style="text-decoration: none;" href = "/information/<%= data[i]._id%>">
                            <input class="blue red but_1" type="button" value="点击报名">
                            </a>
                            <%}else{%>
                            报名已经截止

                            <%}%>



                            </h3>
                            </div>
                            <br />
                            <ul class="twit_nav">
                            <li><a href = "/movie/<%= data[i]._id%>" class="twit_1"><input class="blue but_1" type="button" value="参赛作品"></a></li>

                            <li><button class="blue but_1" id="<%= data[i]._id%>" onclick="rank(this.id)">查看排名</button></li>
                            </ul>
                            </div>



                            </body>
                            <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>

                            <script>
                                function rank(_id) {

                                var url = '/rank/'+_id
                                var url2 = "/progress/"+_id

                                    $.ajax({
                                    url: url,
                                    type: 'get',
                                    success: function(data) {

                                         if(data.status1 == "false") {
                                            alert("排名还未公布");
                                         }else{
                                         window.location.href = url2
                                         }
                                      }

                                      })

                                   }

                            </script>
                            <%}%>
                            </html>

                            */
                          }),


                          tpl24: heredoc(function() {
                       /*
                        <!DOCTYPE HTML>
                        <html>
                        <head>
                        <title>投票页面</title>
                        <!-- Custom Theme files -->
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
                        <meta name="keywords" content="赛事" />
                        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
                        <script src="js/jquery-1.11.1.min.js"></script>
                        <!-- Custom Theme files -->
                        <link href="/showStyle/css/style.css" rel='stylesheet' type='text/css' />
                        <script type="text/javascript" src="/showStyle/js/Chart.js"></script>
                        <!-- Google Fonts -->
                        <link href='http://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900' rel='stylesheet' type='text/css'>
                        <!---tage-script---->
                        <!-- start price_bar  -->
                        <link href="/showStyle/css/jquery.nouislider.css" rel="stylesheet">
                        <script src="/showStyle/js/jquery.nouislider.js"></script>
                        <link rel="stylesheet" type="text/css" href="/showStyle/css/fd-slider.css">
                        <script type="text/javascript" src="/showStyle/js/fd-slider.js"></script>

                        <script src="/showStyle/js/easyResponsiveTabs.js" type="text/javascript"></script>

                        <!----Calender -------->
                        <link rel="stylesheet" href="/showStyle/css/clndr.css" type="text/css" />

                        <!----End Calender -------->
                        </head>
                        <body>
                        <%for(var i=0;i<len ;i++){%>

                        <div class="twitter_widget_1">
                        <div class="twit_1_banner">
                        <div class="twit_1_img"><a href="#"><img src='<%= data.projects[i].Userpic%>' style="width: 100px; height: 100px; border-radius:50%;" alt="" /></a></div>
                        </div>
                        <ul class="twit_nav">
                        <li><a href="#" class="twit_1"><p><span>队名</span><br><%= data.projects[i].username%></p></a></li>
                        <li><a href="#" class="twit_2"><p><span>组长</span><br><%= data.projects[i].capital%></p></a></li>
                        <li><a href="#" class="twit_3"><p><span>票数</span><br><%= data.projects[i].PV%></p></a></li>
                        </ul>
                        <div class="latest_tweets">
                        <h3>项目简介: </h3>
                        <h3> &nbsp &nbsp<%= data.projects[i].comment%></h3>
                        </div>
                        <ul class="twit_nav">
                        <li>


                        <form method = 'post' action = '/vote'>

                        <p>
                        <button type="submit"class="blue but_1" id ="<%= data.projects[i].lab%>" name ="<%= data.projects[i].priveteId%>" onclick = "vote(this.id,this.name%>)">投票
                        </button>
                        </p>

                        </form>

                        </li>

                        <li><a href = "/shows/<%= data.projects[i].lab%>/<%= data.projects[i].priveteId%>" class="twit_3"><input class="blue but_1" type="button" value="详情"></a></li>
                        </ul>
                        </div>

                        <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>

                        <script type="text/javascript">

                        function vote(userCheck , userId) {

                        var getVote = <%= vote%>



                        var data = {"userId":userId, "userCheck":userCheck}
                        if(getVote == 1) {
                        $.ajax({
                        url: '/vote',
                        type: 'post',
                        data: data,
                        success: function(data) {

                        alert("投票成功");



                        },
                        error: function(data) {
                        alert(data)
                        }
                        })
                        }else{
                        alert("投票已使用");

                        }
                        }
                        </script>
                        <%}%>

                        </body>
                        </html>

                        */
                      }),
                        tpl25: heredoc(function() {
                        /*
                         <html><head>
                         <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                         <meta http-equiv="X-UA-Compatible" content="IE=edge">
                         <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
                         <meta name="apple-mobile-web-app-capable" content="yes">
                         <meta name="apple-mobile-web-app-status-bar-style" content="black">
                         <meta name="format-detection" content="telephone=no">


                         <script nonce="" type="text/javascript">
                         window.logs = {
                         pagetime: {}
                         };
                         window.logs.pagetime['html_begin'] = (+new Date());
                         </script>

                         <link rel="dns-prefetch" href="//res.wx.qq.com">
                         <link rel="dns-prefetch" href="//mmbiz.qpic.cn">
                         <link rel="shortcut icon" type="image/x-icon" href="//res.wx.qq.com/mmbizwap/zh_CN/htmledition/images/icon/common/favicon22c41b.ico">
                         <script nonce="" type="text/javascript">
                         String.prototype.html = function(encode) {
                         var replace =["&#39;", "'", "&quot;", '"', "&nbsp;", " ", "&gt;", ">", "&lt;", "<", "&amp;", "&", "&yen;", "¥"];
                         if (encode) {
                         replace.reverse();
                         }
                         for (var i=0,str=this;i< replace.length;i+= 2) {
                         str=str.replace(new RegExp(replace[i],'g'),replace[i+1]);
                         }
                         return str;
                         };

                         window.isInWeixinApp = function() {
                         return /MicroMessenger/.test(navigator.userAgent);
                         };

                         window.getQueryFromURL = function(url) {
                         url = url || 'http://qq.com/s?a=b#rd';
                         var tmp = url.split('?'),
                         query = (tmp[1] || "").split('#')[0].split('&'),
                         params = {};
                         for (var i=0; i<query.length; i++) {
                         var arg = query[i].split('=');
                         params[arg[0]] = arg[1];
                         }
                         if (params['pass_ticket']) {
                         params['pass_ticket'] = encodeURIComponent(params['pass_ticket'].html(false).html(false).replace(/\s/g,"+"));
                         }
                         return params;
                         };

                         (function() {
                         var params = getQueryFromURL(location.href);
                         window.uin = params['uin'] || "" || '';
                         window.key = params['key'] || "" || '';
                         window.wxtoken = params['wxtoken'] || '';
                         window.pass_ticket = params['pass_ticket'] || '';
                         })();

                         function wx_loaderror() {
                         if (location.pathname === '/bizmall/reward') {
                         new Image().src = '/mp/jsreport?key=96&content=reward_res_load_err&r=' + Math.random();
                         }
                         }

                         </script>

                         <title>
                         排名</title>

                         <link rel="stylesheet" href="//res.wx.qq.com/mmbizwap/zh_CN/htmledition/style/page/homepage/index23b0e8.css">

                         <script src="http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_common/utils/report275627.js,/mmbizwap/zh_CN/htmledition/js/homepage/report243273.js,/mmbizwap/zh_CN/htmledition/js/biz_wap/zepto/event275627.js,/mmbizwap/zh_CN/htmledition/js/biz_wap/zepto/ajax275627.js,/mmbizwap/zh_CN/htmledition/js/biz_wap/zepto/zepto275627.js,/mmbizwap/zh_CN/htmledition/js/homepage/index2e7b74.js" type="text/javascript" async=""></script><script src="http://res.wx.qq.com/hp/hp_1_7.js,/hp/hp_2_9.js" type="text/javascript" async=""></script><script src="http://res.wx.qq.com/hp/hp_1_7.css.js,/hp/hp_2_9.css.js" type="text/javascript" async=""></script><style type="text/css">.slider{overflow:hidden;position:relative}.swiper{height:180px;overflow:hidden;position:relative}.swiper .item{float:left;position:relative}.swiper .item a{display:block}.swiper .item .img{display:block;width:100%;height:180px;background:center center no-repeat;background-size:cover}.swiper .item .desc{position:absolute;left:0;right:0;bottom:0;height:1.4em;font-size:16px;padding:20px 50px 12px 13px;background-image:-webkit-linear-gradient(top,rgba(0,0,0,0) 0,rgba(0,0,0,.7) 100%);background-image:linear-gradient(to bottom,rgba(0,0,0,0) 0,rgba(0,0,0,.7) 100%);color:#fff;text-shadow:0 1px 0 rgba(0,0,0,.5);width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.indicator{position:absolute;right:15px;bottom:10px}.indicator a{float:left;margin-left:6px}.icon_dot{display:inline-block;vertical-align:middle;width:6px;height:6px;border-radius:3px;background-color:#d0cdd1}.icon_dot.active{background-color:#6a666f}</style><style type="text/css">.tab_hd{height:44px}.tab_hd_inner{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;width:100%;font-size:0;background-color:#f2f2f2}.tab_hd_inner .item{height:44px;line-height:44px;width:100%;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;box-flex:1;flex:1;font-size:15px;color:#000;text-align:center;text-decoration:none;-webkit-tap-highlight-color:transparent}.tab_hd_inner .item.active{color:#21b100}.tab_hd_inner .item:active{background-color:rgba(0,0,0,.1)}.article_list{background-color:#fff}.list_item{display:block;padding:15px 15px 10px 10px;overflow:hidden;position:relative;text-decoration:none;-webkit-tap-highlight-color:transparent}.list_item:active{background-color:rgba(0,0,0,.1)}.list_item:after{content:" ";position:absolute;bottom:0;width:100%;height:1px;border-bottom:1px solid #e2e2e2;-webkit-transform-origin:0 100%;-ms-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);-ms-transform:scaleY(.5);transform:scaleY(.5);left:10px}.list_item:last-child:after{border:0}.list_item .cover{float:left;margin-right:10px}.list_item .cover .img{display:block;width:80px;height:60px}.list_item .cont{overflow:hidden}.list_item .cont .title{font-weight:400;font-size:16px;color:#000;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.list_item .cont .desc{font-size:13px;color:#999;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-height:1.3}.more{text-align:center}.list-loading{text-align:center;color:#888;padding:10px 0;}
                         </style></head>
                         <body id="" class="zh_CN ">

                         <script>

                         var benchmark = {
                         mark: function(key) {
                         benchmark[key] = (+new Date());
                         },
                         pageBegin: 0,
                         pageEnd: 0,
                         cssEnd: 0,
                         jsEnd: 0,
                         moonJsEnd: 0,
                         soonJsEnd: 0
                         };
                         benchmark.mark('pageBegin');
                         </script>
                         <div class="container">
                         <div id="js_plugins_loading" class="loading" style="display: none;">
                         加载中    </div>
                         <div id="js_plugins" style="visibility: visible;">
                         <div class="slider js_plugin" id="namespace_0" data-pid="1">


                         </div>
                         <div class="tab js_plugin" id="namespace_1" data-pid="2">
                         <div class="tab_hd">
                         <div class="tab_hd_inner">

                         <div type="index" data-index="0" class="item active">作品排名</div>


                         </div>
                         </div>
                         <div class="tab_bd">

                         <div class="article_list article_list_0">

                         <%for(var i = 0 ; i < len; i++) {%>
                         <a class="list_item js_post" href="">
                         <div class="cover">

                         <img class="img js_img" src="<%= data[i].Userpic%>" alt="">

                         </div>

                         <div class="cont">
                         <h2 class="title js_title">
                         名次:
                         第<%= i+1%>名

                         </h2>
                         <p class="desc">

                         队名:
                         <%= data[i].username%>
                         </p>
                         </div>

                         <p class="desc">

                         票数:
                         <%= data[i].PV%>
                         </p>
                         </div>
                         </a>
                         <%}%>

                         </div>

                         <div class="article_list article_list_1" style="display: none;">
                         <div class="article_list article_list_1">



                         </div>

                         </div>
                         </div>

                         </div>
                         </div>


                         <script nonce="">
                         var __DEBUGINFO = {
                         debug_js : "//res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_wap/debug/console2ca724.js",
                         safe_js : "//res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_wap/safe/moonsafe2f3e84.js",
                         res_list: []
                         };
                         </script>

                         <script nonce="">
                         (function() {
                         function _addVConsole(uri) {
                         var url = '//res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/vconsole/' + uri;
                         document.write('<script nonce="" type="text/javascript" src="' + url + '"><\/script>');
                         }
                         if (
                         (document.cookie && document.cookie.indexOf('vconsole_open=1') > -1)
                         || location.href.indexOf('vconsole=1') > -1
                         ) {
                         _addVConsole('2.5.1/vconsole.min.js');
                         _addVConsole('plugin/vconsole-elements/1.0.2/vconsole-elements.min.js');
                         _addVConsole('plugin/vconsole-sources/1.0.1/vconsole-sources.min.js');
                         _addVConsole('plugin/vconsole-resources/1.0.0/vconsole-resources.min.js');
                         _addVConsole('plugin/vconsole-mpopt/1.0.0/vconsole-mpopt.js');
                         }
                         })();
                         </script>

                         <script>window.moon_map = {"biz_common/utils/report.js":"//res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_common/utils/report275627.js","homepage/report.js":"//res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/homepage/report243273.js","biz_wap/zepto/event.js":"//res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_wap/zepto/event275627.js","biz_wap/zepto/ajax.js":"//res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_wap/zepto/ajax275627.js","biz_wap/zepto/zepto.js":"//res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_wap/zepto/zepto275627.js","homepage/index.js":"//res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/homepage/index2e7b74.js"};</script>
                         <script>
                         var cgiData = {
                         biz: 'MjM5Nzk3OTA2OA==',
                         hid: '2',
                         pagename: '科技微讯',
                         comboList: {
                         'js': '/hp/hp_1_7.js,/hp/hp_2_9.js',
                         'css.js': '/hp/hp_1_7.css.js,/hp/hp_2_9.css.js'
                         },
                         biz_info: {
                         nickname: "科技微讯"
                         }
                         };
                         </script>
                         <script>
                         var soonBaseURL = location.protocol + '//' + window.location.host,
                         soonMap = {
                         'js': [],
                         'css.js': []
                         };




                         for (var k in cgiData.comboList) {
                         soonMap[k] = cgiData.comboList[k].split(',');
                         }


                         function soonDefineCallback(fileType) {
                         if (fileType == 'css.js') {
                         if (seajs.requiredNum['css.js'] >= Object.keys(soon.map['css.js']).length) {
                         benchmark.mark('cssEnd');
                         }
                         } else if (fileType == 'js' || fileType == 'moon.js') {
                         if (fileType == 'js' && seajs.requiredNum['js'] >= Object.keys(soon.map['js']).length) {
                         benchmark.mark('soonJsEnd');
                         }
                         if (fileType == 'moon.js' && seajs.requiredNum['moon.js'] >= Object.keys(soon.map['moon.js']).length) {
                         benchmark.mark('moonJsEnd');
                         }
                         if (seajs.requiredNum['js']+seajs.requiredNum['moon.js'] >= Object.keys(soon.map['js']).length+Object.keys(soon.map['moon.js']).length) {
                         benchmark.mark('jsEnd');
                         }
                         }
                         if (seajs.requiredNum['css.js'] >= Object.keys(soon.map['css.js']).length && seajs.requiredNum['js'] >= Object.keys(soon.map['js']).length && seajs.requiredNum['moon.js'] >= Object.keys(soon.map['moon.js']).length) {


                         document.getElementById('js_plugins_loading').style.display = "none";
                         document.getElementById('js_plugins').style.visibility = "visible";
                         }
                         }

                         benchmark.mark('soonJsBegin');
                         </script>

                         <script type="text/javascript" src="//res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/homepage/soon322696.js"></script>
                         <script>
                         seajs.use('homepage/index.js');
                         benchmark.mark('pageEnd');
                         </script>


                         <script nonce="" type="text/javascript">document.addEventListener("touchstart", function() {},false);</script>

                         <!--tailTrap<body></body><head></head><html></html>-->

                         </body></html>

                         */
                       }),
                      tpl26 : heredoc(function() {
                       /*
                        <!DOCTYPE html>
                        <html>
                        <head>
                        <title>页面</title>
                        <meta name = "viewport" content = "initial-scale=1, maximum-scale
                        =1 , minimum-scale=1">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <link href="/stylesheets/bootstrap.min.css" rel="stylesheet" media="screen">
                        <link href="  //res.wx.qq.com/open/libs/weui/0.4.2/weui.css" rel="stylesheet" media="screen">

                        <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>
                        <script src="/javascripts/bootstrap.min.js" type="text/javascript"></script>
                        <script src="/javascript/bootstrap.js" type="text/javascript"></script>
                        </head>
                        <body>

                        <form method = 'post' action = '/status3' >
                        <div class="panel panel-info">
                        <div class="panel-heading">
                        <h3 class="panel-title">状态修改</h3>
                        </div>

                        <div class="panel-body">
                        <p>projectID: </p><input type="text" name="projectID"  class="form-control" id="lastname"
                        </div>

                        <div class="panel-body">
                        <p>status: </p><input type="text" name="status"  class="form-control" id="lastname"
                        </div>

                        </div>
                        <div class="col-sm-offset-2 col-sm-10">
                        <button type="submit" class="weui_btn weui_btn_primary">提交</button>
                        </div>
                        </form>


                        <script src="http://zeptojs.com/zepto-docs.min.js"></script>
                        </body>
                        </html>
                        */
                      }),
                 tpl27: heredoc(function () {
                 /*
                 <!DOCTYPE HTML>
                  <html>
                  <head>
                  <title>报名</title>
                   <!-- Custom Theme files -->
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                      <script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
                  <meta name="keywords" content="Flatastic Mega Mobile UI Kit App Responsive web template, Bootstrap Web Templates, Flat Web Templates, AndriodCompatible web template, Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyErricsson, Motorola webdesign" />
                       <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
                      <script src="/showStyle/js/jquery-1.11.1.min.js"></script>
                       <!-- Custom Theme files -->
                      <link href="/showStyle/css/style.css" rel='stylesheet' type='text/css' />
                      <script type="text/javascript" src="/showStyle/js/Chart.js"></script>
                       <!-- Google Fonts -->
                      <link href='http://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900' rel='stylesheet' type='text/css'>
                      <!---tage-script---->
                   <!-- start price_bar  -->
                  <link href="/showStyle/css/jquery.nouislider.css" rel="stylesheet">
                      <script src="/showStyle/js/jquery.nouislider.js"></script>
                      <link rel="stylesheet" type="text/css" href="/showStyle/css/fd-slider.css">
                      <script type="text/javascript" src="/showStyle/js/fd-slider.js"></script>

                      <script src="/showStyle/js/easyResponsiveTabs.js" type="text/javascript"></script>

                       <!----Calender -------->
                      <link rel="stylesheet" href="/showStyle/css/clndr.css" type="text/css" />

                       <!----End Calender -------->
                      </head>
                      <body>
                  <div class="login_1 login_2">
                  <ul class="various-grid accout-login2 login_3">
                  <form>
                  <li>
                  <input type="text" class="text" value="Username" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Username';}"><a href="#" class=" icon user"></a>
                  </li>

                  <li>
                  <input type="password" value="Password" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Password';}"><a href="#" class=" icon lock"></a>
                  </li>

                  <li>
                  <input type="password" value="Password" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Password';}"><a href="#" class=" icon lock"></a>
                  </li>

                  <li>
                  <input type="password" value="Password" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Password';}"><a href="#" class=" icon lock"></a>
                  </li>


                  <li>
                  <input type="password" value="Password" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Password';}"><a href="#" class=" icon lock"></a>
                  </li>



                  <textarea value="Message" placeholder="项目简介" rows="3"></textarea>


                  <div class="but_4">
                  <input type="submit" onclick="myFunction()" value="Login">
                  </div>
                  </form>
                  </ul>

                  </div>


                      </body>
                      </html>

                      */
                 }),

                tpl28: heredoc(function() {
                  /*
                   <!DOCTYPE html>
                   <html lang="en">
                   <head>
                   <meta charset="utf-8">
                   <meta http-equiv="X-UA-Compatible" content="IE=edge">
                   <meta name="viewport" content="width=device-width, initial-scale=1">
                   <title>大赛</title>
                   <meta name="description" content="">
                   <meta name="author" content="templatemo">
                   <!--
                   Visual Admin Template
                   http://www.templatemo.com/preview/templatemo_455_visual_admin
                   -->
                   <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,400italic,700' rel='stylesheet' type='text/css'>
                   <link href="/webstyle/css/font-awesome.min.css" rel="stylesheet">
                   <link href="/webstyle/css/bootstrap.min.css" rel="stylesheet">
                   <link href="/webstyle/css/templatemo-style.css" rel="stylesheet">

                   </head>
                   <body>
                   <!-- Left column -->
                   <div class="templatemo-flex-row">
                   <div class="templatemo-sidebar">
                   <header class="templatemo-site-header">
                   <div class="square"></div>
                   <h1>大赛文件</h1>
                   </header>
                   <div class="profile-photo-container">
                   <img src="<%= docs.Userpic%>" style="border-radius:50%;"  class="img-responsive">
                   <div class="profile-photo-overlay"></div>
                   </div>
                   <!-- Search box -->

                   <div class="mobile-menu-icon">
                   <i class="fa fa-bars"></i>
                   </div>
                   <nav class="templatemo-left-nav">
                   <ul>
                   <li><a href="#" class="active"><i class="fa fa-home fa-fw"></i>首页</a></li>

                   </ul>
                   </nav>
                   </div>
                   <!-- Main content -->
                   <div class="templatemo-content col-1 light-gray-bg">
                   <div class="templatemo-top-nav-container">
                   <div class="row">
                   <nav class="templatemo-top-nav col-lg-12 col-md-12">
                   <ul class="text-uppercase">
                   <li><a href="" class="active">欢迎您 : <%= docs.userId%></a></li>

                   </ul>
                   </nav>
                   </div>
                   </div>


                   <div class="templatemo-content-container">
                   <div style="float: left;">
                   <h2>选择对应的大赛的名称: </h2>
                   </div>
                   <div class="templatemo-flex-row flex-content-row">


                    &nbsp; &nbsp;
                   &nbsp; &nbsp; &nbsp;

                   <form>
                   <select id="select_id" class="form-control">
                   <option value="html">HTML</option>
                   <option value="plain">Plain Text</option>
                   <option value="58d9b9915b0929285d71acb5">天府足球杯</option>
                   <option value="58d9b95a5b0929285d71acb4">天府好声音</option>
                   </select>
                   <br />
                   <input type="hidden" id="myOpenid" value="<%= openid%>">
                   <input class="templatemo-blue-button" type="button" value="下一步" onclick="postProfile()">


                   </form>



                   </div>
                   </div>
                   </div>

                   <!-- JS -->
                   <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>
                   <script>

                   function postProfile() {
                   var getValue = $("#select_id").val();
                   var getOpenid = $("#myOpenid").val();

                   var data = {"projectName": getValue, "getOpenid": getOpenid}

                   $.ajax({
                   url: '/postProfile',
                   type: 'post',
                   data: data,
                   success: function() {
                   location.href = "/profiles/"+getValue
                   }

                   })
                   }


                   </script>

                   </body>
                   </html>


                  */

                }),

                  tpl29: heredoc(function() {
                   /*
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                    <meta charset="utf-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>大赛</title>
                    <meta name="description" content="">
                    <meta name="author" content="templatemo">
                    <!--
                    Visual Admin Template
                    http://www.templatemo.com/preview/templatemo_455_visual_admin
                    -->
                    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,400italic,700' rel='stylesheet' type='text/css'>
                    <link href="/webstyle/css/font-awesome.min.css" rel="stylesheet">
                    <link href="/webstyle/css/bootstrap.min.css" rel="stylesheet">
                    <link href="/webstyle/css/templatemo-style.css" rel="stylesheet">



                    </head>
                    <body>
                    <!-- Left column -->
                    <div class="templatemo-flex-row">
                    <div class="templatemo-sidebar">
                    <header class="templatemo-site-header">
                    <div class="square"></div>
                    <h1>大赛文件</h1>
                    </header>
                    <div class="profile-photo-container">
                    <img src="<%= docs.Userpic%>" style="border-radius:50%;"  class="img-responsive">
                    <div class="profile-photo-overlay"></div>
                    </div>
                    <!-- Search box -->

                    <div class="mobile-menu-icon">
                    <i class="fa fa-bars"></i>
                    </div>
                    <nav class="templatemo-left-nav">
                    <ul>
                    <li><a href="#" class="active"><i class="fa fa-home fa-fw"></i>首页</a></li>

                    </ul>
                    </nav>
                    </div>
                    <!-- Main content -->
                    <div class="templatemo-content col-1 light-gray-bg">
                    <div class="templatemo-top-nav-container">
                    <div class="row">
                    <nav class="templatemo-top-nav col-lg-12 col-md-12">
                    <ul class="text-uppercase">
                    <li><a href="" class="active">欢迎您 : <%= docs.userId%></a></li>

                    </ul>
                    </nav>
                    </div>
                    </div>


                    <div class="templatemo-content-container">

                    <div class="templatemo-flex-row flex-content-row">



                    <form enctype="multipart/form-data" method = 'post' action = '/profiles/<%= projectId%>' class="form-inline" role="form">
                    <div class="form-group">
                    <label class="sr-only" for="name">名称</label>
                    <h2>文件上传</h2><br />
                    <p>为了更好的预览,请将文件转化未PDF格式, 参考网址:https://www.freepdfconvert.com/zh-hans</p>
                    </div>
                    <hr>

                    <div class="form-group">
                    <label class="sr-only" for="inputfile">文件输入</label>
                    <input type="file" name='pros' multiple id="">
                    </div>
                    <hr>



                    <button type="submit" class="templatemo-blue-button">上传</button>

                    </form>


                    </div>
                    </div>
                    </div>

                    <!-- JS -->
                    <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>


                    </body>
                    </html>


                    */

                  }),
                   tpl30: heredoc(function() {
                /*
                 <!DOCTYPE HTML>
                 <html>
                 <head>
                 <title>小组信息</title>
                 <!-- Custom Theme files -->
                 <meta name="viewport" content="width=device-width, initial-scale=1">
                 <script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
                 <meta name="keywords" content="赛事" />
                 <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
                 <script src="js/jquery-1.11.1.min.js"></script>
                 <!-- Custom Theme files -->
                 <link href="/showStyle/css/style.css" rel='stylesheet' type='text/css' />
                 <script type="text/javascript" src="/showStyle/js/Chart.js"></script>
                 <!-- Google Fonts -->
                 <link href='http://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900' rel='stylesheet' type='text/css'>
                 <!---tage-script---->
                 <!-- start price_bar  -->
                 <link href="/showStyle/css/jquery.nouislider.css" rel="stylesheet">
                 <script src="/showStyle/js/jquery.nouislider.js"></script>
                 <link rel="stylesheet" type="text/css" href="/showStyle/css/fd-slider.css">
                 <script type="text/javascript" src="/showStyle/js/fd-slider.js"></script>

                 <script src="/showStyle/js/easyResponsiveTabs.js" type="text/javascript"></script>

                 <!----Calender -------->
                 <link rel="stylesheet" href="/showStyle/css/clndr.css" type="text/css" />

                 <!----End Calender -------->
                 </head>
                 <body>

                 <div class="twitter_widget_1">
                 <div class="twit_1_banner">
                 <div class="twit_1_img"><a href="#"><img src="<%= data.Userpic%>" style="width: 100px; height: 100px; border-radius:50%; " alt="" /></a></div>
                 </div>
                 <ul class="twit_nav">
                 <li><a href="#" class="twit_1"><p><span>团队名字</span><br> <%= data.username%></p></a></li>

                 <li><a href="#" class="twit_3"><p><span>队长</span><br> <%= data.capital%></p></a></li>

                 <li><a href="#" class="twit_2"><p><span>小组人数</span><br><%= data.number%></p></a></li>
                 </ul>

                   <br />
                 <ul class="twit_nav">
                 <li><a href = "/movie/userproject/<%= data.lab%>/<%= data.priveteId%>" class="twit_1"><input class="blue but_1" type="button" value="查看文档"></a></li>

                 </ul>

                 </div>

                 <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>


                 </body>
                 </html>


                 */
               }),
                tpl31: heredoc(function() {
                 /*
                  <!DOCTYPE HTML>
                  <html>
                  <head>
                  <title>我的赛事</title>
                  <!-- Custom Theme files -->
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                  <script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
                  <meta name="keywords" content="赛事" />
                  <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
                  <script src="js/jquery-1.11.1.min.js"></script>
                  <!-- Custom Theme files -->
                  <link href="/showStyle/css/style.css" rel='stylesheet' type='text/css' />
                  <script type="text/javascript" src="/showStyle/js/Chart.js"></script>
                  <!-- Google Fonts -->
                  <link href='http://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900' rel='stylesheet' type='text/css'>
                  <!---tage-script---->
                  <!-- start price_bar  -->
                  <link href="/showStyle/css/jquery.nouislider.css" rel="stylesheet">
                  <script src="/showStyle/js/jquery.nouislider.js"></script>
                  <link rel="stylesheet" type="text/css" href="/showStyle/css/fd-slider.css">
                  <script type="text/javascript" src="/showStyle/js/fd-slider.js"></script>

                  <script src="/showStyle/js/easyResponsiveTabs.js" type="text/javascript"></script>

                  <!----Calender -------->
                  <link rel="stylesheet" href="/showStyle/css/clndr.css" type="text/css" />

                  <!----End Calender -------->
                  </head>
                  <body>

                  <%for(var i=0; i<len; i++){%>
                  <div class="twitter_widget_1">
                  <div class="twit_1_banner">
                  <div class="twit_1_img"><a href="#"><img src="<%= pic%>" style="width: 100px; height: 100px; border-radius:50%; " alt="" /></a></div>
                  </div>
                  <ul class="twit_nav">
                  <li><a href="#" class="twit_1"><p><span>比赛名</span><br><%= data[i].name%></p></a></li>
                  <li><a href="#" class="twit_2"><p><span>地点</span><br><%= data[i].place%> </p></a></li>
                  <li><a href="#" class="twit_3"><p><span>举办方</span><br><%= data[i].part%></p></a></li>
                  </ul>
                  <div class="latest_tweets">
                  <h3>报名状态:
                     &nbsp;&nbsp;
                     已报名
                  </h3>
                  </div>

                  </div>

                  <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>

                   <%}%>
                  </body>
                  </html>


                  */
                }),
                 tpl32: heredoc(function() {
                  /*
                   <html>
                   <head>
                   <meta http-equiv="Content-Type" content="text/html" charset="utf-8">
                   <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
                   <meta name="format-detection" content="telephone=no">
                   <meta name="apple-mobile-web-app-capable" content="yes">
                   <meta name="description" content="">
                   <meta name="keywords" content="">


                   <title>赛事论坛</title>
                   <link rel="stylesheet" href="/webstyle/css/comm.css">



                   </head>
                   <body style="zoom: 1;">
                   <div class="warp">
                   <div id="headerbanner" class="topicM" style="display: none"></div>
                   <div id="header"><div class="header">
                   <i class="topicLogo fl db"><img  class="tImg lazy" width="78" height="78" alt="标志" src="<%= url%>" style="display: inline;"></i>
                   <h3>赛事论坛<a href="javascript:;" class="follow attentionBtn">关注</a></h3>
                   <p class="subTitle">
                   <span><em>100</em>话题</span>

                   <span><em>86</em>成员</span>

                   <span><a href="javascript:;" class="mobilesign" style="display: none;"></a></span>
                   </p>

                   </div></div>
                   <div id="refreshWait" class="loading mt10" style="display:none;">
                   <div class="loadInco">
                   <span class="blockG" id="rotateG_01"></span>
                   <span class="blockG" id="rotateG_02"></span>
                   <span class="blockG" id="rotateG_03"></span>
                   <span class="blockG" id="rotateG_04"></span>
                   <span class="blockG" id="rotateG_05"></span>
                   <span class="blockG" id="rotateG_06"></span>
                   <span class="blockG" id="rotateG_07"></span>
                   <span class="blockG" id="rotateG_08"></span>
                   </div>
                   正在加载...
                   </div>
                   <div id="topcontainer"></div>
                   <div id="container" class="container">
                   <div id="topicList1">
                   <div class="topicBox threadList" tid="1298879" page="1" id="thread1298879">
                   <div class="topicCon">
                   <p class="personImgDate">
                   <span class="perImg db">
                   <img data-original="http://ucenter.gamebbs.qq.com/avatar.php?uid=33742096&amp;size=small" onerror="javascript:this.src='../cdn/discuz/images/personImg.jpg'" class="bImg lazy" width="35" height="35" uid="33742096" alt="头像" src="http://ucenter.gamebbs.qq.com/avatar.php?uid=33742096&amp;size=small" style="display: block;">

                   <span class="timeT">
                   2015121220U7PB1

                   <i>2017-2-21 14:37</i>
                   </span>
                   </span>
                   <span class="perDate db" tid="1298879" fid="36" style="display: none;">
                   <a href="javascript:;" class="incoA db"></a>
                   </span>
                   <span class="perPop" tid="1298879" style="display:none"></span>
                   </p>
                   <div class="detailCon">
                   <p>

                   <a href="javascript:;" class="studioBtn db">公告</a>
                   <a href="#">信息解决大赛的报名流程</a>

                   </p>
                   <span class="replyShare db fr">
                   <a class="topicadminMsg" tid="1298879"></a>

                   <a href="javascript:;" class="incoRBtn" tid="1298879"><i class="icon-comment-alt"></i>24</a>
                   </span>

                   </div>
                   </div>

                   <div class="topicList">
                   <ul>

                   <li><img data-original="http://ucenter.gamebbs.qq.com/avatar.php?uid=17124773&amp;size=small" onerror="javascript:this.src='../cdn/discuz/images/personImg.jpg'" class="sImg db fl lazy" width="25" height="25" alt="头像" src="http://ucenter.gamebbs.qq.com/avatar.php?uid=17124773&amp;size=small" style="display: block;"><a href="javascript:;" class="sW fl"><span>DrLight：</span>想咨询一下大赛的详细的信息</a></li>

                   <li><img data-original="http://ucenter.gamebbs.qq.com/avatar.php?uid=8132095&amp;size=small" onerror="javascript:this.src='../cdn/discuz/images/personImg.jpg'" class="sImg db fl lazy" width="25" height="25" alt="头像" src="http://ucenter.gamebbs.qq.com/avatar.php?uid=8132095&amp;size=small" style="display: block;"><a href="javascript:;" class="sW fl"><span>德艾辟：</span>此次的大赛会有企业过来招聘吗 ...</a></li>

                   <li><img data-original="http://ucenter.gamebbs.qq.com/avatar.php?uid=524410&amp;size=small" onerror="javascript:this.src='../cdn/discuz/images/personImg.jpg'" class="sImg db fl lazy" width="25" height="25" alt="头像" src="http://ucenter.gamebbs.qq.com/avatar.php?uid=524410&amp;size=small" style="display: block;"><a href="javascript:;" class="sW fl"><span>缘义香草：</span>现在可以进行报名了吗?</a></li>

                   </ul>

                   <p class="more"><a href="javascript:;" title="">查看全部24条回复</a></p>

                   </div>

                   </div>

                   <div class="topicBox threadList" tid="1299010" page="1" id="thread1299010">
                   <div class="topicCon">
                   <p class="personImgDate">
                   <span class="perImg db">
                   <img data-original="http://ucenter.gamebbs.qq.com/avatar.php?uid=5712647&amp;size=small" onerror="javascript:this.src='../cdn/discuz/images/personImg.jpg'" class="bImg lazy" width="35" height="35" uid="5712647" alt="头像" src="http://ucenter.gamebbs.qq.com/avatar.php?uid=5712647&amp;size=small" style="display: block;">

                   <span class="timeT">
                   [C.N]Ratars.W
                   <span class="gBg1">LV5</span>

                   <i>2017-2-26 07:28</i>
                   </span>
                   </span>
                   <span class="perDate db" tid="1299010" fid="36" style="display: none;">
                   <a href="javascript:;" class="incoA db"></a>
                   </span>
                   <span class="perPop" tid="1299010" style="display:none"></span>
                   </p>
                   <div class="detailCon">
                   <p>






                   <a href="javascript:;" class="studioBtn db">天府好声音</a>
                   到这里,听你喜欢的歌,给她(他)投一票

                   </p>
                   <span class="replyShare db fr">
                   <a class="topicadminMsg" tid="1299010"></a>

                   <a href="javascript:;" class="incoRBtn" tid="1299010"><i class="incoR spr"></i>6</a>
                   </span>

                   </div>
                   </div>

                   <div class="topicList">
                   <ul>

                   <li><img data-original="http://ucenter.gamebbs.qq.com/avatar.php?uid=25736953&amp;size=small" onerror="javascript:this.src='../cdn/discuz/images/personImg.jpg'" class="sImg db fl lazy" width="25" height="25" alt="头像" src="http://ucenter.gamebbs.qq.com/avatar.php?uid=25736953&amp;size=small" style="display: block;"><a href="javascript:;" class="sW fl"><span>冥夜渊：</span>支持天府好声音,把我珍贵的一片投给 ...</a></li>

                   <li><img data-original="http://ucenter.gamebbs.qq.com/avatar.php?uid=3063880&amp;size=small" onerror="javascript:this.src='../cdn/discuz/images/personImg.jpg'" class="sImg db fl lazy" width="25" height="25" alt="头像" src="http://ucenter.gamebbs.qq.com/avatar.php?uid=3063880&amp;size=small" style="display: block;"><a href="javascript:;" class="sW fl"><span>qq1045643509：</span>要是一人可以投两票就好了</a></li>

                   <li><img data-original="http://ucenter.gamebbs.qq.com/avatar.php?uid=39678953&amp;size=small" onerror="javascript:this.src='../cdn/discuz/images/personImg.jpg'" class="sImg db fl lazy" width="25" height="25" alt="头像" src="http://ucenter.gamebbs.qq.com/avatar.php?uid=39678953&amp;size=small" style="display: block;"><a href="javascript:;" class="sW fl"><span>2016110323oef6R：</span>我也想参加,就是没有好声音,哈哈哈</a></li>

                   </ul>

                   <p class="more"><a href="javascript:;" title="">查看全部6条回复</a></p>

                   </div>

                   </div>

                   </div>

                   <div id="loadNextPos"></div>
                   <div class="loading" id="showAll" style="display:none;">已显示全部</div>
                   </div>
                   <div id="backToTopBtn" class="floatLayer db" style="display:none;"><a href="javascript:;" class="upBtn db"></a></div>
                   <div class="bottomBar" style="display: block;"><div class="bottomBarCon">
                   <a href="javascript:;" class="backBtn"><i class="iconAnswer commF back db"></i></a>
                   <a href="javascript:;" id="forumlist" class="blockSec db"><i class="icon-qrcode"></i>版块</a>
                   <a href="javascript:;" id="post_thread" class="publish ml db"><i class="icon-edit"></i>发帖</a>
                   <a href="javascript:;" id="info_center" class="moreC db">
                   <i class="circle">●</i><i class="circle">●</i><i class="circle">●</i>
                   <i class="db numP" style="display:none;">0</i>
                   </a>
                   </div></div>

                   <div id="fwin_mask_tips" class="g-mask" style="display:none;position:absolute;top:-0px;left:-0px;width:456px;height:3706px;background:#000;filter:alpha(opacity=60);opacity:0.5; z-index:10000;"></div><div class="sideBar" id="fwin_normal_sideBar" style="display:none;position:fixed;z-index:999999;" showed="">
                   <div class="sideBarCon">

                   </div>
                   </div></body></html>


                   */
                 }),
                  tpl33 : heredoc(function() {
                   /*
                    <!DOCTYPE html>
                    <html>
                    <head>
                    <title>学校接口 </title>
                    <meta name = "viewport" content = "initial-scale=1, maximum-scale
                    =1 , minimum-scale=1">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <link href="/stylesheets/bootstrap.min.css" rel="stylesheet" media="screen">
                    <link href="  //res.wx.qq.com/open/libs/weui/0.4.2/weui.css" rel="stylesheet" media="screen">

                    <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>
                    <script src="/javascripts/bootstrap.min.js" type="text/javascript"></script>
                    <script src="/javascript/bootstrap.js" type="text/javascript"></script>
                    <script src="/javascript/index.js" type="text/javascript"></script>
                    </head>
                    <body>
                    <div style="height: 10px">
                    </div>

                    <form  method = 'post' action = '/schoolList' class="form-horizontal" role="form">

                    <div class="weui_cells weui_cells_form">
                    <div class="weui_cell">
                    <div class="weui_cell_hd">
                    <label class="weui_label">学校名称</label>
                    </div>
                    <div class="weui_cell_bd weui_cell_primary">
                    <input name="username"  class="weui_input" type="text" placeholder="学校名称">
                    </div>
                    </div>
                    </div>


                    <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                    <div class="checkbox">
                    <label>
                    <input type="checkbox"> 请记住我
                    </label>
                    </div>
                    </div>
                    </div>
                    <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" class="weui_btn weui_btn_primary" id="">提交</button>
                    </div>
                    </div>
                    </form>
                    <script src="http://zeptojs.com/zepto-docs.min.js"></script>
                    </body>
                    </html>
                    */
                  }),
                    tpl34 : heredoc(function() {
                     /*
                      <!DOCTYPE html>
                      <html>
                      <head>
                      <title>职位接口 </title>
                      <meta name = "viewport" content = "initial-scale=1, maximum-scale
                      =1 , minimum-scale=1">
                      <meta name="viewport" content="width=device-width, initial-scale=1">
                      <link href="/stylesheets/bootstrap.min.css" rel="stylesheet" media="screen">
                      <link href="  //res.wx.qq.com/open/libs/weui/0.4.2/weui.css" rel="stylesheet" media="screen">

                      <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>
                      <script src="/javascripts/bootstrap.min.js" type="text/javascript"></script>
                      <script src="/javascript/bootstrap.js" type="text/javascript"></script>
                      <script src="/javascript/index.js" type="text/javascript"></script>
                      </head>
                      <body>
                      <div style="height: 10px">
                      </div>

                      <form  method = 'post' action = '/workList' class="form-horizontal" role="form">

                      <div class="weui_cells weui_cells_form">
                      <div class="weui_cell">
                      <div class="weui_cell_hd">
                      <label class="weui_label">职位名称</label>
                      </div>
                      <div class="weui_cell_bd weui_cell_primary">
                      <input name="username"  class="weui_input" type="text" placeholder="职位名称">
                      </div>
                      </div>
                      </div>


                      <div class="form-group">
                      <div class="col-sm-offset-2 col-sm-10">
                      <div class="checkbox">
                      <label>
                      <input type="checkbox"> 请记住我
                      </label>
                      </div>
                      </div>
                      </div>
                      <div class="form-group">
                      <div class="col-sm-offset-2 col-sm-10">
                      <button type="submit" class="weui_btn weui_btn_primary" id="">提交</button>
                      </div>
                      </div>
                      </form>
                      <script src="http://zeptojs.com/zepto-docs.min.js"></script>
                      </body>
                      </html>
                      */
                    }),
                      tpl35 : heredoc(function() {
                       /*
                        <!DOCTYPE html>
                        <html>
                        <head>
                        <title>学校列表 </title>
                        <meta name = "viewport" content = "initial-scale=1, maximum-scale
                        =1 , minimum-scale=1">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <link href="/stylesheets/bootstrap.min.css" rel="stylesheet" media="screen">
                        <link href="  //res.wx.qq.com/open/libs/weui/0.4.2/weui.css" rel="stylesheet" media="screen">

                        <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>
                        <script src="/javascripts/bootstrap.min.js" type="text/javascript"></script>
                        <script src="/javascript/bootstrap.js" type="text/javascript"></script>
                        <script src="/javascript/index.js" type="text/javascript"></script>
                        </head>
                        <body>
                        <div style="height: 10px">
                        </div>


                        <div class="weui_cells weui_cells_form">
                        <div class="weui_cell">
                        <div class="weui_cell_hd">
                        <label class="weui_label">院校</label>
                        </div>
                        <div class="weui_cell_bd weui_cell_primary">

                        <select id="school">
                        <%for(var i=0; i < len; i++ ) {%>
                        <option value="<%= schoolList[i].schools%>"><%= schoolList[i].schools%></option>
                        <%}%>
                        </select>
                        <input type="hidden" value="<%= openid%>" id="name">

                        </div>
                        </div>
                        </div>


                        <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                        <div class="checkbox">
                        <label>
                        <input type="checkbox"> 请记住我
                        </label>
                        </div>
                        </div>
                        </div>
                        <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                        <button type="submit" class="weui_btn weui_btn_primary" id="schoolBtn" onclick="check()">提交</button>
                        </div>
                        </div>

                        <script src="http://zeptojs.com/zepto-docs.min.js"></script>
                        <script type="text/javascript" src="/javascripts/jquery.min.js"></script>

                        <script>
                        function check() {
                        $('#schoolBtn').attr("disabled",true)

                        var school = $("#school").val();
                        var name = $("#name").val();



                        var data = {"name": name, "school": school};
                        $.ajax({
                        url: '/schools',
                        type: 'post',
                        data:  data,
                        success: function(data, status) {
                        alert("提交成功");
                        window.location.href="/AllList"
                        },
                        error: function(data, status) {

                        }
                        });
                        }
                        </script>

                        </body>
                        </html>
                        */
                      }),
                      tpl36 : heredoc(function() {
                       /*
                        <!DOCTYPE html>
                        <html>
                        <head>
                        <title>管理员审核</title>
                        <meta name = "viewport" content = "initial-scale=1, maximum-scale
                        =1 , minimum-scale=1">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <link href="/stylesheets/bootstrap.min.css" rel="stylesheet" media="screen">
                        <link href="  //res.wx.qq.com/open/libs/weui/0.4.2/weui.css" rel="stylesheet" media="screen">

                        <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>
                        <script src="/javascripts/bootstrap.min.js" type="text/javascript"></script>
                        <script src="/javascript/bootstrap.js" type="text/javascript"></script>
                        </head>
                        <body>

                        <form method = 'post' action = '/managers' >
                        <div class="panel panel-info">
                        <div class="panel-heading">
                        <h3 class="panel-title">状态修改</h3>
                        </div>

                        <div class="panel-body">
                        <p>openid: </p><input type="text" name="openid"  class="form-control" id="lastname"
                        </div>

                        <div class="panel-body">
                        <p>status: </p><input type="text" name="status2"  class="form-control" id="lastname"
                        </div>

                        </div>
                        <div class="col-sm-offset-2 col-sm-10">
                        <button type="submit" class="weui_btn weui_btn_primary">提交</button>
                        </div>
                        </form>


                        <script src="http://zeptojs.com/zepto-docs.min.js"></script>
                        </body>
                        </html>
                        */
                      }),
                    tpl37: heredoc(function() {
                     /*
                      <html><head>
                      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                      <meta http-equiv="X-UA-Compatible" content="IE=edge">
                      <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
                      <meta name="apple-mobile-web-app-capable" content="yes">
                      <meta name="apple-mobile-web-app-status-bar-style" content="black">
                      <meta name="format-detection" content="telephone=no">


                      <script nonce="" type="text/javascript">
                      window.logs = {
                      pagetime: {}
                      };
                      window.logs.pagetime['html_begin'] = (+new Date());
                      </script>

                      <link rel="dns-prefetch" href="//res.wx.qq.com">
                      <link rel="dns-prefetch" href="//mmbiz.qpic.cn">
                      <link rel="shortcut icon" type="image/x-icon" href="//res.wx.qq.com/mmbizwap/zh_CN/htmledition/images/icon/common/favicon22c41b.ico">

                      <script nonce="" type="text/javascript">
                      String.prototype.html = function(encode) {
                      var replace =["&#39;", "'", "&quot;", '"', "&nbsp;", " ", "&gt;", ">", "&lt;", "<", "&amp;", "&", "&yen;", "¥"];
                      if (encode) {
                      replace.reverse();
                      }
                      for (var i=0,str=this;i< replace.length;i+= 2) {
                      str=str.replace(new RegExp(replace[i],'g'),replace[i+1]);
                      }
                      return str;
                      };

                      window.isInWeixinApp = function() {
                      return /MicroMessenger/.test(navigator.userAgent);
                      };

                      window.getQueryFromURL = function(url) {
                      url = url || 'http://qq.com/s?a=b#rd';
                      var tmp = url.split('?'),
                      query = (tmp[1] || "").split('#')[0].split('&'),
                      params = {};
                      for (var i=0; i<query.length; i++) {
                      var arg = query[i].split('=');
                      params[arg[0]] = arg[1];
                      }
                      if (params['pass_ticket']) {
                      params['pass_ticket'] = encodeURIComponent(params['pass_ticket'].html(false).html(false).replace(/\s/g,"+"));
                      }
                      return params;
                      };

                      (function() {
                      var params = getQueryFromURL(location.href);
                      window.uin = params['uin'] || "" || '';
                      window.key = params['key'] || "" || '';
                      window.wxtoken = params['wxtoken'] || '';
                      window.pass_ticket = params['pass_ticket'] || '';
                      })();

                      function wx_loaderror() {
                      if (location.pathname === '/bizmall/reward') {
                      new Image().src = '/mp/jsreport?key=96&content=reward_res_load_err&r=' + Math.random();
                      }
                      }

                      </script>

                      <title>
                      赛事列表</title>

                      <link rel="stylesheet" href="//res.wx.qq.com/mmbizwap/zh_CN/htmledition/style/page/homepage/index23b0e8.css">

                      <script src="http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_common/utils/report275627.js,/mmbizwap/zh_CN/htmledition/js/homepage/report243273.js,/mmbizwap/zh_CN/htmledition/js/biz_wap/zepto/event275627.js,/mmbizwap/zh_CN/htmledition/js/biz_wap/zepto/ajax275627.js,/mmbizwap/zh_CN/htmledition/js/biz_wap/zepto/zepto275627.js,/mmbizwap/zh_CN/htmledition/js/homepage/index2e7b74.js" type="text/javascript" async=""></script><script src="http://res.wx.qq.com/hp/hp_1_7.js,/hp/hp_2_9.js" type="text/javascript" async=""></script><script src="http://res.wx.qq.com/hp/hp_1_7.css.js,/hp/hp_2_9.css.js" type="text/javascript" async=""></script><style type="text/css">.slider{overflow:hidden;position:relative}.swiper{height:180px;overflow:hidden;position:relative}.swiper .item{float:left;position:relative}.swiper .item a{display:block}.swiper .item .img{display:block;width:100%;height:180px;background:center center no-repeat;background-size:cover}.swiper .item .desc{position:absolute;left:0;right:0;bottom:0;height:1.4em;font-size:16px;padding:20px 50px 12px 13px;background-image:-webkit-linear-gradient(top,rgba(0,0,0,0) 0,rgba(0,0,0,.7) 100%);background-image:linear-gradient(to bottom,rgba(0,0,0,0) 0,rgba(0,0,0,.7) 100%);color:#fff;text-shadow:0 1px 0 rgba(0,0,0,.5);width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.indicator{position:absolute;right:15px;bottom:10px}.indicator a{float:left;margin-left:6px}.icon_dot{display:inline-block;vertical-align:middle;width:6px;height:6px;border-radius:3px;background-color:#d0cdd1}.icon_dot.active{background-color:#6a666f}</style><style type="text/css">.tab_hd{height:44px}.tab_hd_inner{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;width:100%;font-size:0;background-color:#f2f2f2}.tab_hd_inner .item{height:44px;line-height:44px;width:100%;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;box-flex:1;flex:1;font-size:15px;color:#000;text-align:center;text-decoration:none;-webkit-tap-highlight-color:transparent}.tab_hd_inner .item.active{color:#21b100}.tab_hd_inner .item:active{background-color:rgba(0,0,0,.1)}.article_list{background-color:#fff}.list_item{display:block;padding:15px 15px 10px 10px;overflow:hidden;position:relative;text-decoration:none;-webkit-tap-highlight-color:transparent}.list_item:active{background-color:rgba(0,0,0,.1)}.list_item:after{content:" ";position:absolute;bottom:0;width:100%;height:1px;border-bottom:1px solid #e2e2e2;-webkit-transform-origin:0 100%;-ms-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);-ms-transform:scaleY(.5);transform:scaleY(.5);left:10px}.list_item:last-child:after{border:0}.list_item .cover{float:left;margin-right:10px}.list_item .cover .img{display:block;width:80px;height:60px}.list_item .cont{overflow:hidden}.list_item .cont .title{font-weight:400;font-size:16px;color:#000;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.list_item .cont .desc{font-size:13px;color:#999;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-height:1.3}.more{text-align:center}.list-loading{text-align:center;color:#888;padding:10px 0;}

                      .button {
                      background-color: #4CAF50;
                      border: none;
                      color: white;
                      padding: 15px 32px;
                      text-align: center;
                      text-decoration: none;
                      display: inline-block;
                      font-size: 16px;
                      margin: 4px 2px;
                      cursor: pointer;
                      border-radius: 8px;
                      }

                      </style></head>
                      <body id="" class="zh_CN ">

                      <script>

                      var benchmark = {
                      mark: function(key) {
                      benchmark[key] = (+new Date());
                      },
                      pageBegin: 0,
                      pageEnd: 0,
                      cssEnd: 0,
                      jsEnd: 0,
                      moonJsEnd: 0,
                      soonJsEnd: 0
                      };
                      benchmark.mark('pageBegin');
                      </script>
                      <div class="container">
                      <div id="js_plugins_loading" class="loading" style="display: none;">
                      加载中    </div>
                      <div id="js_plugins" style="visibility: visible;">
                      <div class="slider js_plugin" id="namespace_0" data-pid="1">
                      <div class="swiper" style="height: 180px; width: 1280px;">

                      <div class="item js_post" style="width: 1280px; height: 180px;">
                      <a href="http://mp.weixin.qq.com/s?__biz=MjM5Nzk3OTA2OA==&amp;mid=504070371&amp;idx=1&amp;sn=d64dea84d86d4282e2b7e87d70b3b883&amp;scene=19#wechat_redirect">
                      <div class="img js_img" style="background-image: url('');"><img src="/tableList/images/20160318035040.gif" style="width:375px; height:180px"></div>
                      <p class="desc js_title">赛事流程</p>
                      </a>
                      </div>

                      </div>
                      <div class="indicator">

                      <a href="javascript:;"><i class="icon_dot active"></i></a>

                      </div>
                      </div>
                      <div class="tab js_plugin" id="namespace_1" data-pid="2">
                      <div class="tab_hd">
                      <div class="tab_hd_inner">

                      <div type="index" data-index="0" class="item active">本校赛事</div>

                      <div type="index" data-index="1" class="item ">所有赛事</div>

                      </div>
                      </div>
                      <div class="tab_bd">

                      <div class="article_list article_list_0">

                      <%if(school !== null) {%>
                      <%for(var i=0; i<len2;i++) {%>
                      <a class="list_item js_post" href="/tableList/<%= doc[i]._id%>">
                      <div class="cover">
                      <img class="img js_img" src="<%= doc[i].pic%>" alt="">
                      </div>
                      <div class="cont">
                      <h2 class="title js_title">比赛名: <%= doc[i].name%></h2>
                      <p class="desc">报名结束日期: <%= doc[i].date%></p>
                      <p class="desc">已报名组数: <%= doc[i].joins.length%></p>
                      </div>
                      </a>
                      <%}%>
                      <%}else{%>

                      <a href="http://martinbo.s1.natapp.cc/schools" style="text-align:center" >

                      <button class="button">前往设置院校 </button>
                      </a>
                      <%}%>
                      </div>

                      <div class="article_list article_list_1" style="display: none;">
                      <div class="article_list article_list_1">

                      <%for(var i=0; i<len;i++) {%>
                      <a class="list_item js_post" href="/tableList/<%= docs[i]._id%>">
                      <div class="cover">
                      <img class="img js_img" src="<%= docs[i].pic%>" alt="">
                      </div>
                      <div class="cont">
                      <h2 class="title js_title">比赛名: <%= docs[i].name%></h2>
                      <p class="desc">报名结束日期: <%= docs[i].date%></p>
                      <p class="desc">已报名组数: <%= docs[i].joins.length%></p>
                      </div>
                      </a>
                      <%}%>

                      </div>

                      </div>
                      </div>

                      </div>
                      </div>


                      <script nonce="">
                      var __DEBUGINFO = {
                      debug_js : "//res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_wap/debug/console2ca724.js",
                      safe_js : "//res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_wap/safe/moonsafe2f3e84.js",
                      res_list: []
                      };
                      </script>

                      <script nonce="">
                      (function() {
                      function _addVConsole(uri) {
                      var url = '//res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/vconsole/' + uri;
                      document.write('<script nonce="" type="text/javascript" src="' + url + '"><\/script>');
                      }
                      if (
                      (document.cookie && document.cookie.indexOf('vconsole_open=1') > -1)
                      || location.href.indexOf('vconsole=1') > -1
                      ) {
                      _addVConsole('2.5.1/vconsole.min.js');
                      _addVConsole('plugin/vconsole-elements/1.0.2/vconsole-elements.min.js');
                      _addVConsole('plugin/vconsole-sources/1.0.1/vconsole-sources.min.js');
                      _addVConsole('plugin/vconsole-resources/1.0.0/vconsole-resources.min.js');
                      _addVConsole('plugin/vconsole-mpopt/1.0.0/vconsole-mpopt.js');
                      }
                      })();
                      </script>

                      <script>window.moon_map = {"biz_common/utils/report.js":"//res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_common/utils/report275627.js","homepage/report.js":"//res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/homepage/report243273.js","biz_wap/zepto/event.js":"//res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_wap/zepto/event275627.js","biz_wap/zepto/ajax.js":"//res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_wap/zepto/ajax275627.js","biz_wap/zepto/zepto.js":"//res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_wap/zepto/zepto275627.js","homepage/index.js":"//res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/homepage/index2e7b74.js"};</script>
                      <script>
                      var cgiData = {
                      biz: 'MjM5Nzk3OTA2OA==',
                      hid: '2',
                      pagename: '科技微讯',
                      comboList: {
                      'js': '/hp/hp_1_7.js,/hp/hp_2_9.js',
                      'css.js': '/hp/hp_1_7.css.js,/hp/hp_2_9.css.js'
                      },
                      biz_info: {
                      nickname: "科技微讯"
                      }
                      };
                      </script>
                      <script>
                      var soonBaseURL = location.protocol + '//' + window.location.host,
                      soonMap = {
                      'js': [],
                      'css.js': []
                      };




                      for (var k in cgiData.comboList) {
                      soonMap[k] = cgiData.comboList[k].split(',');
                      }


                      function soonDefineCallback(fileType) {
                      if (fileType == 'css.js') {
                      if (seajs.requiredNum['css.js'] >= Object.keys(soon.map['css.js']).length) {
                      benchmark.mark('cssEnd');
                      }
                      } else if (fileType == 'js' || fileType == 'moon.js') {
                      if (fileType == 'js' && seajs.requiredNum['js'] >= Object.keys(soon.map['js']).length) {
                      benchmark.mark('soonJsEnd');
                      }
                      if (fileType == 'moon.js' && seajs.requiredNum['moon.js'] >= Object.keys(soon.map['moon.js']).length) {
                      benchmark.mark('moonJsEnd');
                      }
                      if (seajs.requiredNum['js']+seajs.requiredNum['moon.js'] >= Object.keys(soon.map['js']).length+Object.keys(soon.map['moon.js']).length) {
                      benchmark.mark('jsEnd');
                      }
                      }
                      if (seajs.requiredNum['css.js'] >= Object.keys(soon.map['css.js']).length && seajs.requiredNum['js'] >= Object.keys(soon.map['js']).length && seajs.requiredNum['moon.js'] >= Object.keys(soon.map['moon.js']).length) {


                      document.getElementById('js_plugins_loading').style.display = "none";
                      document.getElementById('js_plugins').style.visibility = "visible";
                      }
                      }

                      benchmark.mark('soonJsBegin');
                      </script>

                      <script type="text/javascript" src="//res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/homepage/soon322696.js"></script>
                      <script>
                      seajs.use('homepage/index.js');
                      benchmark.mark('pageEnd');
                      </script>


                      <script nonce="" type="text/javascript">document.addEventListener("touchstart", function() {},false);</script>

                      <!--tailTrap<body></body><head></head><html></html>-->

                      </body></html>

                     */
                    }),
              tpl38: heredoc(function () {
                /*
                 <html><head>
                 <meta charset="utf-8">
                 <meta http-equiv="X-UA-Compatible" content="IE=edge">
                 <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
                 <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                 <title><%= name%></title>
                 <link href="/tableList/css/reset.css" rel="stylesheet">
                 <link href="/tableList/css/ad.css" rel="stylesheet">
                 <link href="/tableList/css/main.css" rel="stylesheet">
                 <script src="/tableList/js/jquery.js"></script>
                 <script src="/tableList/js/foundation.js"></script>
                 <script src="/tableList/js/fastclick.js"></script>
                 <script src="/tableList/js/ad.js"></script>
                 <script src="/tableList/js/main.js"></script>

                 </head>
                 <body>

                 <div class="index-top clearfix" id="top">
                 <div class="index-top-left line-downdrop">
                 <img src="images/memu.png" alt="">
                 <div class="side-nav" id="side-nav">
                 <ul class="no-login">

                 </ul>
                 </div>
                 </div>
                 <div class="logo"><img src="<%= pic%>" style="border-radius:50%; "alt=""></div>
                 </div>


                 <div class="banner">
                 <div id="slider" class="case_box" style="height: 404.211px;">
                 <ul class="clearfix" style="width: 3840px; left: -768px;">
                 <li class="case_4" style="width: 768px;"><a href="http://www.mini-tour.cn/"><img src="/tableList/images/20160318033135.gif"></a></li>
                 <li class="case_5" style="width: 768px;"><a href="http://www.cts-tech.cn/"><img src="/tableList/images/20160318035040.gif"></a></li>
                 </ul>
                 <ol style="margin-left: -35px;"><li class="">1</li>
                 <li class="active">2</li><li class="">3</li><li class="">4</li>
                 <li class="">5</li></ol></div>
                 </div>
                 <div class="index-cont">
                 <div class="index-list">
                 <a href="/workIntro/<%= relId%>" class="index-item">
                 <img class="item-icon" src="/tableList/images/index-icon1.png" alt="">
                 <p>赛事介绍</p>
                 <img class="arrow-icon" src="/tableList/images/right.png" alt="">
                 </a>
                 <a href="/information/<%= relId%>" class="index-item">
                 <img class="item-icon" src="/tableList/images/index-icon2.png" alt="">
                 <p>我要报名</p>
                 <img class="arrow-icon" src="/tableList/images/right.png" alt="">
                 </a>

                 <a href="/theWorks/<%= relId%>" class="index-item">
                 <img class="item-icon" src="/tableList/images/index-icon3.png" alt="">
                 <p>参赛作品</p>
                 <img class="arrow-icon" src="/tableList/images/right.png" alt="">
                 </a>
                 <a href="#" class="index-item">
                 <img class="item-icon" src="/tableList/images/index-icon4.png" alt="">
                 <button  id="<%= relId%>" onclick="rank(this.id)">

                 <p>查看排名</p>

                 </button>


                 <img class="arrow-icon" src="/tableList/images/right.png" alt="">
                 </a>
                 <a href="/contestBack" class="index-item">
                 <img class="item-icon" src="/tableList/images/index-icon5.png" alt="">
                 <p>评论区</p>
                 <img class="arrow-icon" src="/tableList/images/right.png" alt="">
                 </a>
                 <a href="/contactUs" class="index-item">
                 <img class="item-icon" src="/tableList/images/index-icon6.png" alt="">
                 <p>联系我们</p>
                 <img class="arrow-icon" src="/tableList/images/right.png" alt="">
                 </a>
                 </div>
                 </div>
                 <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>

                 <script>
                 function rank(_id) {

                 var url = '/rank/'+_id
                 var url2 = "/progress/"+_id

                 $.ajax({
                 url: url,
                 type: 'get',
                 success: function(data) {

                 if(data.status1 == "false") {
                 alert("排名还未公布");
                 }else{
                 window.location.href = url2
                 }
                 }

                 })

                 }

                 </script>

                 </body></html>

                 */
              }),
                 tpl39 : heredoc(function() {

               /*


                <!DOCTYPE html>
                <html>
                <head>
                <title>页面</title>
                <meta name = "viewport" content = "initial-scale=1, maximum-scale
                =1 , minimum-scale=1">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link href="/stylesheets/bootstrap.min.css" rel="stylesheet" media="screen">
                <link href="  //res.wx.qq.com/open/libs/weui/0.4.2/weui.css" rel="stylesheet" media="screen">

                <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>
                <script src="/javascripts/bootstrap.min.js" type="text/javascript"></script>
                <script src="/javascript/bootstrap.js" type="text/javascript"></script>
                </head>
                <body>

                </div>
                <div class="col-sm-offset-2 col-sm-10">
                <div style="height: 260px">


                </div>
                </div>

                </div>
                <div class="col-sm-offset-2 col-sm-10">
                <button type="submit" class="weui_btn weui_btn_primary" onclick="postProfile()">确认登陆</button>
                </div>


                <script src="http://zeptojs.com/zepto-docs.min.js"></script>
                <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>

                <script>

                function postProfile() {

                location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd58fb049ed02ac45&redirect_uri=http://martinbo.s1.natapp.cc/Inpage&response_type=code&scope=snsapi_userinfo&#wechat_redirect"

                }
                </script>
                </body>
                </html>

               */

             }),
             tpl40 : heredoc(function() {

              /*


               <!DOCTYPE html>
               <html>
               <head>
               <title>页面</title>
               <meta name = "viewport" content = "initial-scale=1, maximum-scale
               =1 , minimum-scale=1">
               <meta name="viewport" content="width=device-width, initial-scale=1">
               <link href="/stylesheets/bootstrap.min.css" rel="stylesheet" media="screen">
               <link href="  //res.wx.qq.com/open/libs/weui/0.4.2/weui.css" rel="stylesheet" media="screen">

               <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>
               <script src="/javascripts/bootstrap.min.js" type="text/javascript"></script>
               <script src="/javascript/bootstrap.js" type="text/javascript"></script>
               </head>
               <body>




               <script src="http://zeptojs.com/zepto-docs.min.js"></script>
               <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>

               <script>

               function postProfile() {

               alert("不能查看,报名未截止");
               location.href = "/tableList/<%= relId%>"
               }
               postProfile()
               </script>
               </body>
               </html>

               */

             }),
                tpl41: heredoc(function() {
                 /*
                  <html><head>
                  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                  <meta http-equiv="X-UA-Compatible" content="IE=edge">
                  <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
                  <meta name="apple-mobile-web-app-capable" content="yes">
                  <meta name="apple-mobile-web-app-status-bar-style" content="black">
                  <meta name="format-detection" content="telephone=no">


                  <script nonce="" type="text/javascript">
                  window.logs = {
                  pagetime: {}
                  };
                  window.logs.pagetime['html_begin'] = (+new Date());
                  </script>

                  <link rel="dns-prefetch" href="//res.wx.qq.com">
                  <link rel="dns-prefetch" href="//mmbiz.qpic.cn">
                  <link rel="shortcut icon" type="image/x-icon" href="//res.wx.qq.com/mmbizwap/zh_CN/htmledition/images/icon/common/favicon22c41b.ico">
                  <script nonce="" type="text/javascript">
                  String.prototype.html = function(encode) {
                  var replace =["&#39;", "'", "&quot;", '"', "&nbsp;", " ", "&gt;", ">", "&lt;", "<", "&amp;", "&", "&yen;", "¥"];
                  if (encode) {
                  replace.reverse();
                  }
                  for (var i=0,str=this;i< replace.length;i+= 2) {
                  str=str.replace(new RegExp(replace[i],'g'),replace[i+1]);
                  }
                  return str;
                  };

                  window.isInWeixinApp = function() {
                  return /MicroMessenger/.test(navigator.userAgent);
                  };

                  window.getQueryFromURL = function(url) {
                  url = url || 'http://qq.com/s?a=b#rd';
                  var tmp = url.split('?'),
                  query = (tmp[1] || "").split('#')[0].split('&'),
                  params = {};
                  for (var i=0; i<query.length; i++) {
                  var arg = query[i].split('=');
                  params[arg[0]] = arg[1];
                  }
                  if (params['pass_ticket']) {
                  params['pass_ticket'] = encodeURIComponent(params['pass_ticket'].html(false).html(false).replace(/\s/g,"+"));
                  }
                  return params;
                  };

                  (function() {
                  var params = getQueryFromURL(location.href);
                  window.uin = params['uin'] || "" || '';
                  window.key = params['key'] || "" || '';
                  window.wxtoken = params['wxtoken'] || '';
                  window.pass_ticket = params['pass_ticket'] || '';
                  })();

                  function wx_loaderror() {
                  if (location.pathname === '/bizmall/reward') {
                  new Image().src = '/mp/jsreport?key=96&content=reward_res_load_err&r=' + Math.random();
                  }
                  }

                  </script>

                  <title>
                  赛事列表</title>

                  <link rel="stylesheet" href="//res.wx.qq.com/mmbizwap/zh_CN/htmledition/style/page/homepage/index23b0e8.css">

                  <script src="http://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_common/utils/report275627.js,/mmbizwap/zh_CN/htmledition/js/homepage/report243273.js,/mmbizwap/zh_CN/htmledition/js/biz_wap/zepto/event275627.js,/mmbizwap/zh_CN/htmledition/js/biz_wap/zepto/ajax275627.js,/mmbizwap/zh_CN/htmledition/js/biz_wap/zepto/zepto275627.js,/mmbizwap/zh_CN/htmledition/js/homepage/index2e7b74.js" type="text/javascript" async=""></script><script src="http://res.wx.qq.com/hp/hp_1_7.js,/hp/hp_2_9.js" type="text/javascript" async=""></script><script src="http://res.wx.qq.com/hp/hp_1_7.css.js,/hp/hp_2_9.css.js" type="text/javascript" async=""></script><style type="text/css">.slider{overflow:hidden;position:relative}.swiper{height:180px;overflow:hidden;position:relative}.swiper .item{float:left;position:relative}.swiper .item a{display:block}.swiper .item .img{display:block;width:100%;height:180px;background:center center no-repeat;background-size:cover}.swiper .item .desc{position:absolute;left:0;right:0;bottom:0;height:1.4em;font-size:16px;padding:20px 50px 12px 13px;background-image:-webkit-linear-gradient(top,rgba(0,0,0,0) 0,rgba(0,0,0,.7) 100%);background-image:linear-gradient(to bottom,rgba(0,0,0,0) 0,rgba(0,0,0,.7) 100%);color:#fff;text-shadow:0 1px 0 rgba(0,0,0,.5);width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.indicator{position:absolute;right:15px;bottom:10px}.indicator a{float:left;margin-left:6px}.icon_dot{display:inline-block;vertical-align:middle;width:6px;height:6px;border-radius:3px;background-color:#d0cdd1}.icon_dot.active{background-color:#6a666f}</style><style type="text/css">.tab_hd{height:44px}.tab_hd_inner{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;width:100%;font-size:0;background-color:#f2f2f2}.tab_hd_inner .item{height:44px;line-height:44px;width:100%;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;box-flex:1;flex:1;font-size:15px;color:#000;text-align:center;text-decoration:none;-webkit-tap-highlight-color:transparent}.tab_hd_inner .item.active{color:#21b100}.tab_hd_inner .item:active{background-color:rgba(0,0,0,.1)}.article_list{background-color:#fff}.list_item{display:block;padding:15px 15px 10px 10px;overflow:hidden;position:relative;text-decoration:none;-webkit-tap-highlight-color:transparent}.list_item:active{background-color:rgba(0,0,0,.1)}.list_item:after{content:" ";position:absolute;bottom:0;width:100%;height:1px;border-bottom:1px solid #e2e2e2;-webkit-transform-origin:0 100%;-ms-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(.5);-ms-transform:scaleY(.5);transform:scaleY(.5);left:10px}.list_item:last-child:after{border:0}.list_item .cover{float:left;margin-right:10px}.list_item .cover .img{display:block;width:80px;height:60px}.list_item .cont{overflow:hidden}.list_item .cont .title{font-weight:400;font-size:16px;color:#000;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}.list_item .cont .desc{font-size:13px;color:#999;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;line-height:1.3}.more{text-align:center}.list-loading{text-align:center;color:#888;padding:10px 0;}
                  </style></head>
                  <body id="" class="zh_CN ">

                  <script>

                  var benchmark = {
                  mark: function(key) {
                  benchmark[key] = (+new Date());
                  },
                  pageBegin: 0,
                  pageEnd: 0,
                  cssEnd: 0,
                  jsEnd: 0,
                  moonJsEnd: 0,
                  soonJsEnd: 0
                  };
                  benchmark.mark('pageBegin');
                  </script>
                  <div class="container">
                  <div id="js_plugins_loading" class="loading" style="display: none;">
                  加载中    </div>
                  <div id="js_plugins" style="visibility: visible;">
                  <div class="slider js_plugin" id="namespace_0" data-pid="1">
                  <div class="swiper" style="height: 180px; width: 1280px;">

                  <div class="item js_post" style="width: 1280px; height: 180px;">
                  <a href="http://mp.weixin.qq.com/s?__biz=MjM5Nzk3OTA2OA==&amp;mid=504070371&amp;idx=1&amp;sn=d64dea84d86d4282e2b7e87d70b3b883&amp;scene=19#wechat_redirect">
                  <div class="img js_img" style="background-image: url('');"><img src="/tableList/images/20160318035040.gif" style="width:375px; height:180px"></div>
                  <p class="desc js_title">赛事流程</p>
                  </a>
                  </div>

                  </div>
                  <div class="indicator">

                  <a href="javascript:;"><i class="icon_dot active"></i></a>

                  </div>
                  </div>
                  <div class="tab js_plugin" id="namespace_1" data-pid="2">
                  <div class="tab_hd">
                  <div class="tab_hd_inner">

                  <div type="index" data-index="0" class="item active">参赛作品</div>


                  </div>
                  </div>
                  <div class="tab_bd">

                  <div class="article_list article_list_0">

                  <%for(var i=0; i<len; i++){%>
                  <a class="list_item js_post"
                  <%try{%>
                  href="/indexProject/<%= doc[i].lab%>/<%= doc[i].priveteId%>"
                  <%}catch(err){%>

                   <%}%>
                   >

                  <div class="cover">

                  <img class="img js_img" src="<%= doc[i].Userpic%>" alt="">
                  </div>

                  <div class="cont">
                  <h2 class="title js_title">
                  队名:

                  <%try{%>
                  <%= doc[i].username%>
                  <%}catch(err){%>
                  <%}%>


                  </h2>
                  <p class="desc">

                  院校:

                  <%try{%>
                  <%= doc[i].school%>
                  <%}catch(err){%>
                  <%}%>

                  </p>
                  </div>
                  </a>

                  <%}%>

                  </div>

                  <div class="article_list article_list_1" style="display: none;">
                  <div class="article_list article_list_1">


                  </div>

                  </div>
                  </div>

                  </div>
                  </div>


                  <script nonce="">
                  var __DEBUGINFO = {
                  debug_js : "//res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_wap/debug/console2ca724.js",
                  safe_js : "//res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_wap/safe/moonsafe2f3e84.js",
                  res_list: []
                  };
                  </script>

                  <script nonce="">
                  (function() {
                  function _addVConsole(uri) {
                  var url = '//res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/vconsole/' + uri;
                  document.write('<script nonce="" type="text/javascript" src="' + url + '"><\/script>');
                  }
                  if (
                  (document.cookie && document.cookie.indexOf('vconsole_open=1') > -1)
                  || location.href.indexOf('vconsole=1') > -1
                  ) {
                  _addVConsole('2.5.1/vconsole.min.js');
                  _addVConsole('plugin/vconsole-elements/1.0.2/vconsole-elements.min.js');
                  _addVConsole('plugin/vconsole-sources/1.0.1/vconsole-sources.min.js');
                  _addVConsole('plugin/vconsole-resources/1.0.0/vconsole-resources.min.js');
                  _addVConsole('plugin/vconsole-mpopt/1.0.0/vconsole-mpopt.js');
                  }
                  })();
                  </script>

                  <script>window.moon_map = {"biz_common/utils/report.js":"//res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_common/utils/report275627.js","homepage/report.js":"//res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/homepage/report243273.js","biz_wap/zepto/event.js":"//res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_wap/zepto/event275627.js","biz_wap/zepto/ajax.js":"//res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_wap/zepto/ajax275627.js","biz_wap/zepto/zepto.js":"//res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/biz_wap/zepto/zepto275627.js","homepage/index.js":"//res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/homepage/index2e7b74.js"};</script>
                  <script>
                  var cgiData = {
                  biz: 'MjM5Nzk3OTA2OA==',
                  hid: '2',
                  pagename: '科技微讯',
                  comboList: {
                  'js': '/hp/hp_1_7.js,/hp/hp_2_9.js',
                  'css.js': '/hp/hp_1_7.css.js,/hp/hp_2_9.css.js'
                  },
                  biz_info: {
                  nickname: "科技微讯"
                  }
                  };
                  </script>
                  <script>
                  var soonBaseURL = location.protocol + '//' + window.location.host,
                  soonMap = {
                  'js': [],
                  'css.js': []
                  };




                  for (var k in cgiData.comboList) {
                  soonMap[k] = cgiData.comboList[k].split(',');
                  }


                  function soonDefineCallback(fileType) {
                  if (fileType == 'css.js') {
                  if (seajs.requiredNum['css.js'] >= Object.keys(soon.map['css.js']).length) {
                  benchmark.mark('cssEnd');
                  }
                  } else if (fileType == 'js' || fileType == 'moon.js') {
                  if (fileType == 'js' && seajs.requiredNum['js'] >= Object.keys(soon.map['js']).length) {
                  benchmark.mark('soonJsEnd');
                  }
                  if (fileType == 'moon.js' && seajs.requiredNum['moon.js'] >= Object.keys(soon.map['moon.js']).length) {
                  benchmark.mark('moonJsEnd');
                  }
                  if (seajs.requiredNum['js']+seajs.requiredNum['moon.js'] >= Object.keys(soon.map['js']).length+Object.keys(soon.map['moon.js']).length) {
                  benchmark.mark('jsEnd');
                  }
                  }
                  if (seajs.requiredNum['css.js'] >= Object.keys(soon.map['css.js']).length && seajs.requiredNum['js'] >= Object.keys(soon.map['js']).length && seajs.requiredNum['moon.js'] >= Object.keys(soon.map['moon.js']).length) {


                  document.getElementById('js_plugins_loading').style.display = "none";
                  document.getElementById('js_plugins').style.visibility = "visible";
                  }
                  }

                  benchmark.mark('soonJsBegin');
                  </script>

                  <script type="text/javascript" src="//res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/homepage/soon322696.js"></script>
                  <script>
                  seajs.use('homepage/index.js');
                  benchmark.mark('pageEnd');
                  </script>


                  <script nonce="" type="text/javascript">document.addEventListener("touchstart", function() {},false);</script>

                  <!--tailTrap<body></body><head></head><html></html>-->

                  </body></html>

                  */
                }),
                tpl42 : heredoc(function() {
                 /*
                  <!DOCTYPE html>
                  <html>
                  <head>
                  <title>页面</title>
                  <meta name = "viewport" content = "initial-scale=1, maximum-scale
                  =1 , minimum-scale=1">
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                  <link href="/stylesheets/bootstrap.min.css" rel="stylesheet" media="screen">
                  <link href="  //res.wx.qq.com/open/libs/weui/0.4.2/weui.css" rel="stylesheet" media="screen">

                  <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>
                  <script src="/javascripts/bootstrap.min.js" type="text/javascript"></script>
                  <script src="/javascript/bootstrap.js" type="text/javascript"></script>
                  </head>
                  <body>

                  <form method = 'post' action = '/checkAllwork' >
                  <div class="panel panel-info">
                  <div class="panel-heading">
                  <h3 class="panel-title">状态修改</h3>
                  </div>

                  <div class="panel-body">
                  <p>projectID: </p><input type="text" name="projectID"  class="form-control" id="lastname"
                  </div>

                  <div class="panel-body">
                  <p>openid: </p><input type="text" name="openid"  class="form-control" id="lastname"
                  </div>


                  <div class="panel-body">
                  <p>status: </p><input type="text" name="status"  class="form-control" id="lastname"
                  </div>

                  </div>
                  <div class="col-sm-offset-2 col-sm-10">
                  <button type="submit" class="weui_btn weui_btn_primary">提交</button>
                  </div>
                  </form>


                  <script src="http://zeptojs.com/zepto-docs.min.js"></script>
                  </body>
                  </html>
                  */
                }),
                tpl43: heredoc(function() {
                 /*
                  <html class="huodongxing" style="margin:0px auto;font-size:50px;"><head>
                  <title>
                  <%try{%>
                  <%= proName%>
                  <%}catch(err){%>
                  <%}%>
                  </title>
                  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                  <meta http-equiv="Pragma" content="no-cache">
                  <meta http-equiv="X-UA-Compatible" content="IE=edge">
                  <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1, maximum-scale=1, user-scalable=no">
                  <meta name="MobileOptimized" content="width">
                  <meta name="HandheldFriendly" content="true">
                  <meta name="apple-mobile-web-app-capable" content="yes">
                  <meta name="format-detection" content="telephone=no">
                  <meta name="apple-mobile-web-app-status-bar-style" content="black">
                  <meta name="distribution" content="global">

                  <link rel="SHORTCUT ICON" href="http://cdn.huodongxing.com/Content/img/favicon.ico">
                  <link rel="apple-touch-icon-precomposed" href="http://cdn.huodongxing.com/Content/v2.0/mobile/img/touch-icon.png">
                  <link href="http://cdn.huodongxing.com/Content/v2.0/mobile/dist/css/hdx.min.css?v=v4.0.0.0" rel="stylesheet" type="text/css">


                  <style type="text/css">
                  .open-btn-banner{
                  width: 100%;
                  height: 40px;
                  line-height: 40px;
                  text-align: center;
                  color: #fff;
                  background: #64b559;
                  border-radius: 5px;
                  outline: none;
                  border: none;
                  margin-bottom: 20px;
                  }

                  #openApp{

                  }
                  .navbar-fixed-bottom{
                  border-top:1px solid #bcbcbc;
                  box-sizing:border-box;
                  height:50px;
                  }
                  .navbar-bottom-small{
                  background:#fff;
                  }
                  .navbar-bottom-small a.btn{
                  padding-top:5px;
                  height:50px;
                  color:#999999
                  }
                  .navbar-bottom-small a.btn span{
                  margin-right:0px;
                  }
                  #reg_event_btn_enabled{
                  height:50px;
                  line-height:50px;
                  padding:0;
                  }
                  .open-app-img{
                  width:20px;
                  }
                  .navbar-bottom-small:nth-of-type(1){
                  border-right:1px solid #bcbcbc;
                  }
                  .icon-like{
                  width:20px;
                  height:20px;
                  background:url(http://cdn.huodongxing.com/Content/v2.0/mobile/img/like-active.png) no-repeat;
                  background-size:cover;
                  }
                  .icon-like-before{
                  width:20px;
                  height:20px;
                  background:url(http://cdn.huodongxing.com/Content/v2.0/mobile/img/like.png) no-repeat;
                  background-size:cover;
                  }
                  #event_content img{max-width:100% !important;height: auto !important;}

                  </style>

                  <script async="" src="//www.google-analytics.com/analytics.js"></script><script type="text/javascript" src="http://cdn.huodongxing.com/Content/v2.0/mobile/dist/js/libs.min.js"></script>

                  <script type="text/javascript" src="http://cdn.huodongxing.com/Content/v2.0/dist/js/jquery.js"></script>
                  <script type="text/javascript">
                  jQuery.fn.modal = Zepto.fn.modal;
                  jQuery.noConflict();
                  </script>


                  <script type="text/javascript" src="http://cdn.huodongxing.com/Content/v2.0/mobile/dist/js/accupass.form.js"></script>
                  <script type="text/javascript" src="http://cdn.huodongxing.com/Content/js/accupass.statistics.js"></script>
                  <script type="text/javascript" src="http://cdn.huodongxing.com/Content/js/accupass.wechat.js"></script>

                  <script type="text/javascript" src="http://cdn.huodongxing.com/Content/v2.0/dist/js/jquerylib.min.js"></script>

                  <script type="text/javascript" src="http://hm.baidu.com/h.js?d89d7d47b4b1b8ff993b37eafb0b49bd"></script></head>
                  <body>
                  <!-- mobile端 datatable分页，添加jquery标志-->
                  <input id="isHuoDongXingMobile" type="hidden" value="true">
                  <header style="">
                  <div class="navbar-left"><div onclick="javascript:if(history.length>=2) { history.go(-1); } else { window.location = 'http://www.huodongxing.com'; }"><div class="icon-back" style="display: none;"></div></div></div>
                  <div class="navbar-right">
                  <span data-target="#nav-menu" data-toggle="modal"><span class="icon-nav-menu"><span></span></span></span>
                  </div>
                  <h1><div class="logo">

                  <%try{%>
                  <%= proName%>
                  <%}catch(err){%>
                  <%}%>
                  </div></h1>
                  </header>
                  <div class="modal nav-menu" id="nav-menu" data-backdrop-opacity="false">
                  <div class="modal-dialog popover bottom">
                  <div class="arrow"></div>

                  </div>
                  </div>

                  <section class="event-details event-details2" id="event-details">


                  <h1 style="text-align:center">

                  <%try{%>
                  <%= doc.school%>
                  <%}catch(err){%>
                  <%}%>
                  </h1>
                  <div class="org-name">

                  <div style="clear:both;"></div>
                  </div>

                  <div class="event-info">

                  <div>
                  <span><span class="icon-time"></span>队名</span>
                  <h3>

                  <%try{%>
                  <%= doc.username%>
                  <%}catch(err){%>
                  <%}%>
                  </h3>
                  </div>

                  <div>
                  <span><span class="icon-time"></span>队长</span>
                  <h3>
                  <%try{%>
                  <%= doc.capital%>
                  <%}catch(err){%>
                  <%}%>
                  </h3>
                  </div>

                  <div>
                  <span><span class="icon-time"></span>票数</span>
                  <h3>


                  <%try{%>
                  <%= doc.PV%>
                  <%}catch(err){%>
                  <%}%>
                  </h3>
                  </div>




                  <img class="banner"
                  <%try{%>
                  src="<%= pic%>"
                  <%}catch(err){%>
                  <%}%>
                  alt="赛事图片">



                  <style type="text/css">
                  @media all and (max-width:400px){
                  .modal.pay-complete.in .modal-dialog{
                  width:100% !important;
                  }
                  }


                  @media all and (max-width:320px){
                  .modal.pay-complete.in .go-ticket{
                  padding-top:220px !important;
                  }
                  }


                  @media all and (min-width:350px) and (max-width:400px){
                  .modal.pay-complete.in .modal-dialog{
                  width:350px !important;
                  }
                  }


                  @media all and (min-width:401px) and (max-width:450px){
                  .modal.pay-complete.in .modal-dialog{
                  width:85% !important;
                  }
                  }

                  </style>

                  <div id="event_register_step1">
                  <div class="navbar-fixed-bottom btn-signup-lg">
                  <div class="col-3 navbar-bottom-small">
                  <a href = "/movie/userproject/<%= doc.lab%>/<%= doc.priveteId%>" >
                  <p style="text-align:center">
                  <button class="btn btn-primary" style="width: 88px">参赛文件</button>

                  </p>
                  </a>
                  </div>
                  <div class="col-3  navbar-bottom-small">


                  <button class="btn btn-primary"    <%try{%>
                  id="<%= doc.lab%>"
                  <%}catch(err){%>
                  <%}%> onclick="rank(this.id)" style="width: 88px">查看排名</button>

                  </div>

                  <div class="col-6">
                  <form method = 'post' action = '/vote'>

                  <p>
                  <button  type="submit" class="btn btn-primary"
                  <%try{%>
                  id ="<%= doc.lab%>" name ="<%= doc.priveteId%>"
                  <%}catch(err){%>
                  <%}%>
                  onclick = "vote(this.id,this.name%>)">投票
                  </button>
                  </p>

                  </form>
                  </div>
                  </div>

                  <div class="modal fade ticket-modal ticket-modal-bottom" id="ticket-modal" data-scroll="true">
                  <div class="modal-dialog">
                  <div class="modal-content">
                  <h3 class="modal-header">
                  选择票券
                  <div class="close" data-dismiss="modal"><span class="icon-close-bubble"></span></div>
                  </h3>
                  <div class="media">
                  <img class="pull-left" src="http://wimg.huodongxing.com/logo/201702/4374471714400/752630789989325_v2.jpg@!wmlogo" alt="【2017个推大会】移动互联 · 数据创新">
                  <div class="media-body">
                  <h4>【2017个推大会】移动互联 · 数据创新</h4>
                  <div>广东 深圳</div>
                  <div>3月26日 周日 09:00-18:00</div>
                  </div>
                  </div>
                  <div class="modal-body">
                  <div id="">



                  <div class="clearfix" style="padding-top: 10px;">


                  </div>
                  </div>
                  </div>
                  </div>
                  </div>
                  </div>
                  </div>




                  <div class="modal register-alert">
                  <div class="modal-dialog">
                  <button class="close" data-dismiss="modal"><span></span></button>
                  <div class="modal-content">
                  <div class="icon-error-lg"><span></span></div>
                  <ul>
                  <li class="text-primary"></li>
                  </ul>
                  </div>
                  </div>
                  </div>




                  <script type="text/javascript" src="http://cdn.huodongxing.com/Content/v2.0/mobile/dist/js/selectEventTicket.min.js"></script>
                  <script type="text/javascript">
                  var isExp = false;
                  var formItemsJson = [{"Key":"I_3","Sort":3,"Type":"textarea","Category":"CUSTOM","IsDefault":false,"Required":true,"Multiple":false,"Title":"姓名","Subitems":[],"Description":"","IsHide":false,"Value":null,"TypeTitle":"多行文本框"},{"Key":"I_4","Sort":4,"Type":"textarea","Category":"CUSTOM","IsDefault":false,"Required":true,"Multiple":false,"Title":"手机号码","Subitems":[],"Description":"","IsHide":false,"Value":null,"TypeTitle":"多行文本框"},{"Key":"I_5","Sort":5,"Type":"textarea","Category":"CUSTOM","IsDefault":false,"Required":true,"Multiple":false,"Title":"电子邮箱","Subitems":[],"Description":"","IsHide":false,"Value":null,"TypeTitle":"多行文本框"},{"Key":"I_7","Sort":7,"Type":"input","Category":"CUSTOM","IsDefault":false,"Required":true,"Multiple":false,"Title":"公司","Subitems":[],"Description":"","IsHide":false,"Value":null,"TypeTitle":"单行文本框"},{"Key":"I_8","Sort":8,"Type":"input","Category":"CUSTOM","IsDefault":false,"Required":true,"Multiple":false,"Title":"职位","Subitems":[],"Description":"","IsHide":false,"Value":null,"TypeTitle":"单行文本框"}];
                  var requireParticipant = true;
                  var TimesToken = "124F7A6F48DF860A71478D012E23A17C0790D6F2BD82EDC8EE";
                  </script>
                  <script type="text/javascript" src="http://cdn.huodongxing.com/Content/v2.0/mobile/dist/js/startRegisterEvent.min.js"></script>





                  <section>
                  <div id="event_content">

                  <div id="home_event_description" class="home_event_summary"><p><span style="font-size: 16px; font-family: 微软雅黑, 'Microsoft YaHei';">小组人数：</span><span style="font-size: 16px; font-family: 微软雅黑;">



                  <%try{%>
                  <%= doc.number%>
                  <%}catch(err){%>
                  <%}%>
                  </span><br></p>

                  <p style="text-align: left;"><br></p>
                  <p style="text-align: left;"><strong>
                  <span style="font-size: 20px; color: rgb(0, 176, 240); font-family: 微软雅黑, 'Microsoft YaHei';">
                  项目介绍</span></strong></p>


                  <p style="text-align: justify;"><span style="color: rgb(0, 0, 0); font-size: 16px;">
                  <span style="color: rgb(0, 0, 0); font-family: 'Microsoft YaHei'; line-height: 23px;">

                  <%try{%>
                  <%= doc.comment%>
                  <%}catch(err){%>
                  <%}%>
                  </span></span></p>
                  </div>
                  </div>

                  <br>


                  </section>


                  </section>
                  <div class="lead" style="border-top: 1px solid #f5f5f5;margin-bottom:46px">

                  </div>

                  <div id="wx_error_msg" style="display:none;color:red;"></div>



                  <script type="text/javascript" src="http://cdn.huodongxing.com/Content/v2.0/mobile/dist/js/foundation.abide.min.js"></script>
                  <script type="text/javascript" src="http://cdn.huodongxing.com/Content/v2.0/mobile/dist/js/iscroll-lite.min.js"></script>

                  <script src="https://lkme.cc/js/linkedme.min.js"></script>



                  <!-- End Alexa Certify Javascript -->

                  <script type="text/javascript" src="http://cdn.huodongxing.com/Content/v2.0/js/jserr-tracking.js" async=""></script>
                  <input type="hidden" value="ex-web05">

                  <script src="/javascripts/jquery-2.1.1.min.js" type="text/javascript"></script>

                  <script type="text/javascript">

                  function vote(userCheck , userId) {

                  var getVote = <%= vote%>



                  var data = {"userId":userId, "userCheck":userCheck}
                  if(getVote == 1) {
                  $.ajax({
                  url: '/vote',
                  type: 'post',
                  data: data,
                  success: function(data) {

                  alert("投票成功");



                  },
                  error: function(data) {
                  alert(data)
                  }
                  })
                  }else{
                  alert("投票已使用");

                  }
                  }
                  </script>

                  <script>
                  function rank(_id) {

                  var url = '/rank/'+_id
                  var url2 = "/progress/"+_id

                  $.ajax({
                  url: url,
                  type: 'get',
                  success: function(data) {

                  if(data.status1 == "false") {
                  alert("排名还未公布");
                  }else{
                  window.location.href = url2
                  }
                  }

                  })

                  }

                  </script>
                  </body></html>
                 */
                }),
              tpl44: heredoc(function() {
               /*
                <html lang="zh-CN" style="font-size: 9.375px;"><head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;">
                <meta name="format-detection" content="telephone=no">
                <title>赛事介绍</title>
                <link rel="stylesheet" href="/workIndex/css/ivtw.css">
                </head>
                <body>
                <header>
                <div class="title">
                <span>在微信上关注我们</span>
                </div>
                <div class="clearfix"></div>
                </header>

                <div style="height: 30px">


                </div>
                <section>
                <div class="list">

                <div class="right">
                <h1><%= doc.name%></h1>
                <small>ID:<%= InId%></small>
                </div>
                </div>
                <div class="go">
                <a href="/AllList">去报名</a>
                </div>
                <div class="clearfix"></div>
                <div class="content">
                <p><%= doc.comment%></p>
                <div class="link">
                <a href="">举办院校：<%= doc.school%></a>
                <a href="">地点：<%= doc.place%></a>
                <a href="">举办方: <%= doc.part%></a>
                </div>
                </div>
                </section>


                <script src="http://ui.geekbang.org/library/jquery/jquery.js"></script>
                <script>
                $(function(){
                if(navigator.userAgent.match(/MicroMessenger/i)){
                var weixinShareLogo = 'http://static.geekbang.org/ck/5715c40433572.png';
                $('body').prepend('<div style=" overflow:hidden; width:0px; height:0; margin:0 auto; position:absolute; top:-800px;"><img src="'+ weixinShareLogo +'"></div>');
                };
                });

                (function (doc, win) {
                var docEl = doc.documentElement,
                resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                if(clientWidth>=640){
                docEl.style.fontSize = '10px';
                }else{
                docEl.style.fontSize = 16 * (clientWidth / 640) + 'px';
                console.log(clientWidth);
                }
                };

                if (!doc.addEventListener) return;
                win.addEventListener(resizeEvt, recalc, false);
                doc.addEventListener('DOMContentLoaded', recalc, false);
                })(document, window);
                </script>

                </body></html>

               */
              }),
               tpl45: heredoc(function () {
                /*
                 <html><head>
                 <meta charset="utf-8">
                 <meta http-equiv="X-UA-Compatible" content="IE=edge">
                 <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
                 <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                 <title>去大赛</title>
                 <link href="/tableList/css/reset.css" rel="stylesheet">
                 <link href="/tableList/css/ad.css" rel="stylesheet">
                 <link href="/tableList/css/main.css" rel="stylesheet">


                 </head>
                 <body>

                 <div class="contacUs-back"></div>
                 <div class="contact-us"><div class="contact-us-cont" ><h1 style="text-align: left;">联系我们：</h1>
                 <pre style="text-align: left;">
                 电&nbsp;&nbsp;话：13401239989
                 网&nbsp;&nbsp;址：http：//www.qhzqc.com
                 E-mail：martin2975068046@gmail.com
                 地&nbsp;&nbsp;址：西南财经大学天府学院</pre>
                 </div>
                 <p style="text-align: left;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<img src="/images/weixin.png" alt="20160317030849.jpg" width="80" height="80" border="0" vspace="0" title="20160317030849.jpg" style="text-align: center; white-space: normal; width: 80px; height: 80px;">&nbsp; &nbsp;</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;扫一扫关注去大赛</p><p>&nbsp; &nbsp;</p></div>


                 </body></html>
                */
               }),

          tpl46: heredoc(function() {
           /*
            <!DOCTYPE html>
            <!--
            Template Name: Conquer - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.0
            Version: 1.5
            Author: KeenThemes
            Website: http://www.keenthemes.com/
            Purchase: http://themeforest.net/item/conquer-responsive-admin-dashboard-template/3716838?ref=keenthemes
            -->
            <!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
            <!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
            <!--[if !IE]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
            <!-- BEGIN HEAD -->
            <head>
            <meta charset="utf-8" />
            <title>赛事管理平台</title>
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta content="width=device-width, initial-scale=1.0" name="viewport" />
            <meta content="" name="description" />
            <meta content="" name="author" />
            <meta name="MobileOptimized" content="320">
            <!-- BEGIN GLOBAL MANDATORY STYLES -->
            <link href="assets/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
            <link href="assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
            <link href="assets/plugins/uniform/css/uniform.default.css" rel="stylesheet" type="text/css"/>
            <!-- END GLOBAL MANDATORY STYLES -->
            <!-- BEGIN PAGE LEVEL STYLES -->
            <link rel="stylesheet" type="text/css" href="assets/plugins/bootstrap-fileupload/bootstrap-fileupload.css" />
            <link rel="stylesheet" type="text/css" href="assets/plugins/gritter/css/jquery.gritter.css" />
            <link rel="stylesheet" type="text/css" href="assets/plugins/select2/select2_conquer.css" />
            <link rel="stylesheet" type="text/css" href="assets/plugins/clockface/css/clockface.css" />
            <link rel="stylesheet" type="text/css" href="assets/plugins/bootstrap-wysihtml5/bootstrap-wysihtml5.css" />
            <link rel="stylesheet" type="text/css" href="assets/plugins/bootstrap-datepicker/css/datepicker.css" />
            <link rel="stylesheet" type="text/css" href="assets/plugins/bootstrap-timepicker/compiled/timepicker.css" />
            <link rel="stylesheet" type="text/css" href="assets/plugins/bootstrap-colorpicker/css/colorpicker.css" />
            <link rel="stylesheet" type="text/css" href="assets/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css" />
            <link rel="stylesheet" type="text/css" href="assets/plugins/bootstrap-datetimepicker/css/datetimepicker.css" />
            <link rel="stylesheet" type="text/css" href="assets/plugins/jquery-multi-select/css/multi-select.css" />
            <link rel="stylesheet" type="text/css" href="assets/plugins/bootstrap-switch/static/stylesheets/bootstrap-switch-conquer.css"/>
            <link rel="stylesheet" type="text/css" href="assets/plugins/jquery-tags-input/jquery.tagsinput.css" />
            <link rel="stylesheet" type="text/css" href="assets/plugins/bootstrap-markdown/css/bootstrap-markdown.min.css">
            <!-- END PAGE LEVEL STYLES -->
            <!-- BEGIN THEME STYLES -->
            <link href="assets/css/style-conquer.css" rel="stylesheet" type="text/css"/>
            <link href="assets/css/style.css" rel="stylesheet" type="text/css"/>
            <link href="assets/css/style-responsive.css" rel="stylesheet" type="text/css"/>
            <link href="assets/css/plugins.css" rel="stylesheet" type="text/css"/>
            <link href="assets/css/themes/default.css" rel="stylesheet" type="text/css" id="style_color"/>
            <link href="assets/css/custom.css" rel="stylesheet" type="text/css"/>
            <!-- END THEME STYLES -->
            <link rel="shortcut icon" href="favicon.ico" />
            </head>
            <!-- END HEAD -->
            <!-- BEGIN BODY -->
            <body class="page-header-fixed">
            <!-- BEGIN HEADER -->
            <div class="header navbar navbar-inverse navbar-fixed-top">
            <!-- BEGIN TOP NAVIGATION BAR -->
            <div class="header-inner">
            <!-- BEGIN LOGO -->
            <a class="navbar-brand" href="index.html">
            <img src="" alt="西南财经大学天府学院" class="img-responsive" />
            </a>

            <!-- END LOGO -->
            <!-- BEGIN RESPONSIVE MENU TOGGLER -->
            <a href="javascript:;" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <img src="assets/img/menu-toggler.png" alt="" />
            </a>
            <!-- END RESPONSIVE MENU TOGGLER -->
            <!-- BEGIN TOP NAVIGATION MENU -->
            <ul class="nav navbar-nav pull-right">
            <!-- BEGIN NOTIFICATION DROPDOWN -->
            <li class="dropdown" id="header_notification_bar">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
            data-close-others="true">

            </a>
            <ul class="dropdown-menu extended notification">

            </ul>
            </li>
            <!-- END NOTIFICATION DROPDOWN -->
            <!-- BEGIN INBOX DROPDOWN -->
            <li class="dropdown" id="header_inbox_bar">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
            data-close-others="true">

            </a>
            <ul class="dropdown-menu extended inbox">

            </ul>
            </li>

            <li class="dropdown" id="header_task_bar">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">

            </a>
            <ul class="dropdown-menu extended tasks">

            </ul>
            </li>

            <li class="devider">&nbsp;</li>
            <!-- BEGIN USER LOGIN DROPDOWN -->
            <li class="dropdown user">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
            <img alt="" src="assets/img/avatar3_small.jpg"/>
            <span class="username">Nick</span>
            <i class="icon-angle-down"></i>
            </a>
            <ul class="dropdown-menu">

            </ul>
            </li>
            <!-- END USER LOGIN DROPDOWN -->
            </ul>
            <!-- END TOP NAVIGATION MENU -->
            </div>
            <!-- END TOP NAVIGATION BAR -->
            </div>
            <!-- END HEADER -->
            <div class="clearfix"></div>
            <!-- BEGIN CONTAINER -->
            <div class="page-container">
            <!-- BEGIN SIDEBAR -->
            <div class="page-sidebar navbar-collapse collapse">
            <!-- BEGIN SIDEBAR MENU -->
            <ul class="page-sidebar-menu">
            <li>

            </li>
            <li>
            <!-- BEGIN SIDEBAR TOGGLER BUTTON -->
            <div class="sidebar-toggler"></div>
            <div class="clearfix"></div>
            <!-- BEGIN SIDEBAR TOGGLER BUTTON -->
            </li>

            <li class="active ">
            <a href="javascript:;">
            <i class="icon-table"></i>
            <span class="title">赛事</span>
            <span class="selected"></span>
            <span class="arrow open"></span>
            </a>
            <ul class="sub-menu">

            <li class="active">
            <a href="form_component.html">
            赛事创建</a>
            </li>

            </ul>
            </li>

            <li class="">
            <a href="javascript:;">
            <i class="icon-th"></i>
            <span class="title">审核</span>
            <span class="arrow "></span>
            </a>
            <ul class="sub-menu">

            <li >
            <a href="table_responsive.html">
            报名及查看作品控制</a>
            </li>
            <li >
            <a href="table_managed.html">
            排名控制</a>
            </li>
            <li >
            <a href="table_editable.html">
            审核参赛作品</a>
            </li>

            </ul>
            </li>

            <li class="">
            <a href="javascript:;">
            <i class="icon-th"></i>
            <span class="title">院校列表</span>
            <span class="arrow "></span>
            </a>
            <ul class="sub-menu">
            <li >
            <a href="table_basic.html">
            学校列表</a>
            </li>

            </ul>
            </li>

            <li class="">
            <a href="javascript:;">
            <i class="icon-th"></i>
            <span class="title">职业列表</span>
            <span class="arrow "></span>
            </a>
            <ul class="sub-menu">
            <li >
            <a href="table_basic.html">
            职业列表</a>
            </li>


            </ul>
            </li>


            </ul>
            <!-- END SIDEBAR MENU -->
            </div>
            <!-- END SIDEBAR -->
            <!-- BEGIN PAGE -->
            <div class="page-content">
            <!-- BEGIN SAMPLE PORTLET CONFIGURATION MODAL FORM-->
            <div class="modal fade" id="portlet-config" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
            <h4 class="modal-title">Modal title</h4>
            </div>
            <div class="modal-body">
            Widget settings form goes here
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-success">Save changes</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
            </div>
            <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
            </div>
            <!-- END SAMPLE PORTLET CONFIGURATION MODAL FORM-->
            <!-- BEGIN STYLE CUSTOMIZER -->
            <div class="theme-panel hidden-xs hidden-sm">
            <div class="toggler"><i class="icon-gear"></i></div>
            <div class="theme-options">
            <div class="theme-option theme-colors clearfix">
            <span>Theme Color</span>
            <ul>
            <li class="color-black current color-default tooltips" data-style="default" data-original-title="Default"></li>
            <li class="color-grey tooltips" data-style="grey" data-original-title="Grey"></li>
            <li class="color-blue tooltips" data-style="blue" data-original-title="Blue"></li>
            <li class="color-red tooltips" data-style="red" data-original-title="Red"></li>
            <li class="color-light tooltips" data-style="light" data-original-title="Light"></li>
            </ul>
            </div>
            <div class="theme-option">
            <span>Layout</span>
            <select class="layout-option form-control input-small">
            <option value="fluid" selected="selected">Fluid</option>
            <option value="boxed">Boxed</option>
            </select>
            </div>
            <div class="theme-option">
            <span>Header</span>
            <select class="header-option form-control input-small">
            <option value="fixed" selected="selected">Fixed</option>
            <option value="default">Default</option>
            </select>
            </div>
            <div class="theme-option">
            <span>Sidebar</span>
            <select class="sidebar-option form-control input-small">
            <option value="fixed">Fixed</option>
            <option value="default" selected="selected">Default</option>
            </select>
            </div>
            <div class="theme-option">
            <span>Footer</span>
            <select class="footer-option form-control input-small">
            <option value="fixed">Fixed</option>
            <option value="default" selected="selected">Default</option>
            </select>
            </div>
            </div>
            </div>
            <!-- END BEGIN STYLE CUSTOMIZER -->
            <!-- BEGIN PAGE HEADER-->
            <div class="row">
            <div class="col-md-12">
            <!-- BEGIN PAGE TITLE & BREADCRUMB-->
            <h3 class="page-title">
            赛事创建 <small></small>
            </h3>
            <ul class="page-breadcrumb breadcrumb">
            <li>
            <i class="icon-home"></i>
            <a href="index.html">首页</a>
            <i class="icon-angle-right"></i>
            </li>
            <li>
            <a href="#">赛事创建</a>

            </li>
            <li><a href="#"></a></li>
            </ul>
            <!-- END PAGE TITLE & BREADCRUMB-->
            </div>
            </div>
            <!-- END PAGE HEADER-->
            <!-- BEGIN PAGE CONTENT-->
            <div class="row">
            <div class="col-md-12">
            <!-- BEGIN PORTLET-->
            <div class="portlet">
            <div class="portlet-title">
            <div class="caption"><i class="icon-reorder"></i></div>
            <div class="tools">
            <a href="javascript:;" class="collapse"></a>
            <a href="#portlet-config" data-toggle="modal" class="config"></a>
            <a href="javascript:;" class="reload"></a>
            <a href="javascript:;" class="remove"></a>
            </div>
            </div>
            <div class="portlet-body form">
            <!-- BEGIN FORM-->
            <form action="#" class="form-horizontal form-bordered">
            <div class="form-body">
            <div class="form-group">
            <label class="control-label col-md-3">赛事截止时间</label>
            <div class="col-md-3">
            <input class="form-control form-control-inline input-medium date-picker"  size="16" type="text" value="" />
            <span class="help-block">赛事时间</span>
            </div>
            </div>

            <div class="form-group">
            <label class="control-label col-md-3">赛事名称</label>
            <div class="col-md-3">
            <input type="text" class="form-control" id="exampleInputEmail1" placeholder="赛事名称">
            </div>
            </div>


            <div class="form-group">
            <label class="control-label col-md-3">赛事地点</label>
            <div class="col-md-3">
            <input type="text" class="form-control" id="exampleInputEmail1" placeholder="赛事地点">
            </div>
            </div>

            <div class="form-group">
            <label class="control-label col-md-3">主办方</label>
            <div class="col-md-3">
            <input type="text" class="form-control" id="exampleInputEmail1" placeholder="主办方">
            </div>
            </div>

            <div class="form-group">
            <label class="control-label col-md-3">赛事状态</label>
            <div class="col-md-3">
            <input type="text" class="form-control" id="exampleInputEmail1" placeholder="默认填写false">
            </div>
            </div>

            <div class="form-group">
            <label class="control-label col-md-3">赛事海报地址</label>
            <div class="col-md-3">
            <input type="text" class="form-control" id="exampleInputEmail1" placeholder="图片链接地址">
            </div>
            </div>

            <div class="form-group">
            <label class="control-label col-md-3">院校列表</label>
            <div class="col-md-3">
            <select class="form-control">

            </select>
            </div>
            </div>

            <div class="form-group">
            <label class="control-label col-md-3">赛事介绍</label>
            <div class="col-md-3">
            <textarea class="form-control" rows="3"></textarea>
            </div>
            </div>


            </div>

            </form>
            <br>
            <button type="button" class="btn btn-primary btn-lg" style="margin-left: 250px">创建赛事</button>
            <div id="form_modal2" class="modal fade" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
            <h4 class="modal-title">Datepickers In Modal</h4>
            </div>
            <div class="modal-body">
            <form action="#" class="form-horizontal">
            <div class="form-group">
            <label class="control-label col-md-4">Default Datepicker</label>
            <div class="col-md-8">
            <input class="form-control date-picker"  size="16" type="text" value="" />
            </div>
            </div>
            <div class="form-group">
            <label class="control-label col-md-4">Start With Years</label>
            <div class="col-md-8">
            <div class="input-group date date-picker" data-date="12-02-2012" data-date-format="dd-mm-yyyy" data-date-viewmode="years">
            <input type="text" class="form-control" readonly>
            <span class="input-group-btn">
            <button class="btn btn-info" type="button"><i class="icon-calendar"></i></button>
            </span>
            </div>
            <!-- /input-group -->
            </div>
            </div>
            <div class="form-group">
            <label class="control-label col-md-4">Months Only</label>
            <div class="col-md-8">
            <div class="input-group date date-picker" data-date="10/2012" data-date-format="mm/yyyy" data-date-viewmode="years" data-date-minviewmode="months">
            <input type="text" class="form-control" readonly>
            <span class="input-group-btn">
            <button class="btn btn-info" type="button"><i class="icon-calendar"></i></button>
            </span>
            </div>
            <!-- /input-group -->
            </div>
            </div>
            <div class="form-group">
            <label class="control-label col-md-4">Date Range</label>
            <div class="col-md-8">
            <div class="input-group date-picker input-daterange" data-date="10/11/2012" data-date-format="mm/dd/yyyy">
            <input type="text" class="form-control" name="from">
            <span class="input-group-addon">to</span>
            <input type="text" class="form-control" name="to">
            </div>
            <!-- /input-group -->
            </div>
            </div>
            <div class="form-group">
            <label class="control-label col-md-4">Inline</label>
            <div class="col-md-8">
            <div class="date-picker" data-date-format="mm/dd/yyyy"></div>
            </div>
            </div>
            </form>
            </div>
            <div class="modal-footer">
            <button class="btn btn-default" data-dismiss="modal" aria-hidden="true">Close</button>
            <button class="btn btn-success" data-dismiss="modal">Save changes</button>
            </div>
            </div>
            </div>
            </div>
            <!-- END FORM-->
            </div>
            </div>
            <!-- END PORTLET-->
            </div>
            </div>

            <!-- END PAGE CONTENT-->
            </div>
            <!-- END PAGE -->
            </div>
            <!-- END CONTAINER -->
            <!-- BEGIN FOOTER -->
            <div class="footer">
            <div class="footer-inner">
            2013 &copy; Conquer by keenthemes.
            </div>
            <div class="footer-tools">
            <span class="go-top">
            <i class="icon-angle-up"></i>
            </span>
            </div>
            </div>
            <!-- END FOOTER -->
            <!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
            <!-- BEGIN CORE PLUGINS -->
            <!--[if lt IE 9]>
            <script src="assets/plugins/respond.min.js"></script>
            <script src="assets/plugins/excanvas.min.js"></script>
            <![endif]-->
            <script src="assets/plugins/jquery-1.10.2.min.js" type="text/javascript"></script>
            <script src="assets/plugins/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>
            <script src="assets/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
            <script src="assets/plugins/bootstrap/js/bootstrap2-typeahead.min.js" type="text/javascript"></script>
            <script src="assets/plugins/bootstrap-hover-dropdown/twitter-bootstrap-hover-dropdown.min.js" type="text/javascript" ></script>
            <script src="assets/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
            <script src="assets/plugins/jquery.blockui.min.js" type="text/javascript"></script>
            <script src="assets/plugins/jquery.cookie.min.js" type="text/javascript"></script>
            <script src="assets/plugins/uniform/jquery.uniform.min.js" type="text/javascript" ></script>
            <!-- END CORE PLUGINS -->
            <!-- BEGIN PAGE LEVEL PLUGINS -->
            <script type="text/javascript" src="assets/plugins/fuelux/js/spinner.min.js"></script>
            <script type="text/javascript" src="assets/plugins/ckeditor/ckeditor.js"></script>
            <script type="text/javascript" src="assets/plugins/bootstrap-fileupload/bootstrap-fileupload.js"></script>
            <script type="text/javascript" src="assets/plugins/select2/select2.min.js"></script>
            <script type="text/javascript" src="assets/plugins/bootstrap-wysihtml5/wysihtml5-0.3.0.js"></script>
            <script type="text/javascript" src="assets/plugins/bootstrap-wysihtml5/bootstrap-wysihtml5.js"></script>
            <script type="text/javascript" src="assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js"></script>
            <script type="text/javascript" src="assets/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js"></script>
            <script type="text/javascript" src="assets/plugins/clockface/js/clockface.js"></script>
            <script type="text/javascript" src="assets/plugins/bootstrap-daterangepicker/moment.min.js"></script>
            <script type="text/javascript" src="assets/plugins/bootstrap-daterangepicker/daterangepicker.js"></script>
            <script type="text/javascript" src="assets/plugins/bootstrap-colorpicker/js/bootstrap-colorpicker.js"></script>
            <script type="text/javascript" src="assets/plugins/bootstrap-timepicker/js/bootstrap-timepicker.js"></script>
            <script type="text/javascript" src="assets/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js"></script>
            <script type="text/javascript" src="assets/plugins/jquery.input-ip-address-control-1.0.min.js"></script>
            <script type="text/javascript" src="assets/plugins/jquery-multi-select/js/jquery.multi-select.js"></script>
            <script type="text/javascript" src="assets/plugins/jquery-multi-select/js/jquery.quicksearch.js"></script>
            <script src="assets/plugins/jquery.pwstrength.bootstrap/src/pwstrength.js" type="text/javascript" ></script>
            <script src="assets/plugins/bootstrap-switch/static/js/bootstrap-switch.min.js" type="text/javascript" ></script>
            <script src="assets/plugins/jquery-tags-input/jquery.tagsinput.min.js" type="text/javascript" ></script>
            <script src="assets/plugins/bootstrap-markdown/js/bootstrap-markdown.js" type="text/javascript" ></script>
            <script src="assets/plugins/bootstrap-markdown/lib/markdown.js" type="text/javascript" ></script>
            <script src="assets/plugins/bootstrap-maxlength/bootstrap-maxlength.min.js" type="text/javascript" ></script>
            <!-- END PAGE LEVEL PLUGINS -->
            <!-- BEGIN PAGE LEVEL SCRIPTS -->
            <script src="assets/scripts/app.js"></script>
            <script src="assets/scripts/form-components.js"></script>
            <!-- END PAGE LEVEL SCRIPTS -->
            <script>
            jQuery(document).ready(function() {
            // initiate layout and plugins
            App.init();
            FormComponents.init();
            });
            </script>
            <!-- BEGIN GOOGLE RECAPTCHA -->
            <script type="text/javascript">
            var RecaptchaOptions = {
            theme : 'custom',
            custom_theme_widget: 'recaptcha_widget'
            };
            </script>
            <script type="text/javascript" src="https://www.google.com/recaptcha/api/challenge?k=6LcrK9cSAAAAALEcjG9gTRPbeA0yAVsKd8sBpFpR"></script>
            <!-- END GOOGLE RECAPTCHA -->
            <!-- END JAVASCRIPTS -->
            </body>
            <!-- END BODY -->
            </html>

            */
          }),
          tpl47: heredoc(function () {
           /*
            <html><head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <title>去大赛</title>
            <link href="/tableList/css/reset.css" rel="stylesheet">
            <link href="/tableList/css/ad.css" rel="stylesheet">
            <link href="/tableList/css/main.css" rel="stylesheet">


            </head>
            <body>

             <p>没有权限</p>

            </body></html>
            */
          }),
          tpl48: heredoc(function () {
           /*
            <html><head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <title>去大赛</title>
            <link href="/tableList/css/reset.css" rel="stylesheet">
            <link href="/tableList/css/ad.css" rel="stylesheet">
            <link href="/tableList/css/main.css" rel="stylesheet">


            </head>
            <body>

            <p>你已经报名过了</p>

            </body></html>
            */
          })


}

