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
         <title>参赛时间 </title>
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

         <form  method = 'post' action = '/information/<%= id%>' class="form-horizontal" role="form">


         <div class="weui_cells weui_cells_form">
         <div class="weui_cell">
         <div class="weui_cell_hd">
         <label class="weui_label">赛事编号</label>
         </div>
         <div class="weui_cell_bd weui_cell_primary">
         <input name="lab"  class="weui_input" type="text" placeholder="团队名" value = "<%= id%>" readonly>
         </div>
         </div>
         </div>


         <div class="weui_cells weui_cells_form">
         <div class="weui_cell">
         <div class="weui_cell_hd">
         <label class="weui_label">团队名</label>
         </div>
         <div class="weui_cell_bd weui_cell_primary">
         <input name="username"  class="weui_input" type="text" placeholder="团队名">
         </div>
         </div>
         </div>

         <div class="weui_cells weui_cells_form">
         <div class="weui_cell">
         <div class="weui_cell_hd">
         <label class="weui_label">队长</label>
         </div>
         <div class="weui_cell_bd weui_cell_primary">
         <input name="capital"  class="weui_input" type="text" placeholder="队长名">
         </div>
         </div>
         </div>

         <div class="weui_cells weui_cells_form">
         <div class="weui_cell">
         <div class="weui_cell_hd">
         <label class="weui_label">小组成员数</label>
         </div>
         <div class="weui_cell_bd weui_cell_primary">
         <input name="number"  class="weui_input" type="number" placeholder="输入小组成员数">
         </div>
         </div>
         </div>



         <div class="weui_cells weui_cells_form">
         <div class="weui_cell">
         <div class="weui_cell_hd">
         <label class="weui_label">项目名字</label>
         </div>
         <div class="weui_cell_bd weui_cell_primary">
         <input name="project"  class="weui_input" type="text" placeholder=输入项目名字>
         </div>
         </div>
         </div>


         <div class="weui_cells weui_cells_form">
         <div class="weui_cell">
         <div class="weui_cell_bd weui_cell_primary">
         <textarea name="comment" class="weui_textarea" placeholder="项目简介" rows="3"></textarea>
         <div class="weui_textarea_counter"><span>0</span>/200</div>
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


              <form method = 'post' action = '/inputList' >
               <div class="panel panel-info">
               <div class="panel-heading">
               <h3 class="panel-title">导入比赛</h3>
               </div>
               <div class="panel-body">
               <p>比赛时间: </p><div class="input-append date form_datetime">
               <input size="16" type="text" name="time" value="" readonly>

               <span class="add-on"><i class="icon-th"></i></span>


               </div>

               </div>

               <div class="panel-body">
               <p>报名状态: </p><input type="text" name= "status" class="form-control" id="lastname">
               </div>

               <div class="panel-body">
               <p>比赛海报: </p><input type="text" name= "pic" class="form-control" id="lastname">
               </div>

               <div class="panel-body">
               <p>比赛名字: </p><input type="text" name= "name" class="form-control" id="lastname">
               </div>
               <div class="panel-body">
               <p>比赛地点: </p><input type="text" name= "place" class="form-control" id="lastname">
               </div>
               <div class="panel-body">
               <p>主办方: </p><input type="text" name= "part" class="form-control" id="lastname">
               </div>
               </div>
               <div class="col-sm-offset-2 col-sm-10">
               <button type="submit" class="weui_btn weui_btn_primary">提交</button>
               </div>
              </form>


               <script src="http://zeptojs.com/zepto-docs.min.js"></script>
               <script type="text/javascript">
               $(".form_datetime").datetimepicker({format: 'yyyy-mm-dd hh:ii'});
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
                             <span class="label label-info">没有权限</span>
                             <script src="http://zeptojs.com/zepto-docs.min.js"></script>
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
                              <input id="text" type="hidden" value="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd58fb049ed02ac45&redirect_uri=http://martinbo.s1.natapp.cc/list&response_type=code&scope=snsapi_userinfo&#wechat_redirect" style="width:80%" /><br />
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

                              var myCode = '';
                              var url = ''


                              function poll() {
                              $.ajax({
                              url: '/Getcode',
                              type: 'get',
                              success: function(data) {
                              if(data.code == null || data.code== '/list') {
                              poll()
                              }else {
                              myCode = data.code
                              alert(myCode);
                              url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxd58fb049ed02ac45&secret=4b8fbe4c34f99bce3af9a0c5911a5bee&code='+myCode+'&grant_type=authorization_code'

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
                              <option value="58c665c8ed4d7be94fb9f87b">微信</option>
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
                              <span class="label label-info"><%= url%></span>
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
                            <title>赛事</title>
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
                            <%for(var i = 0; i < len; i++ ) {%>

                            <div class="twitter_widget_1">
                            <div class="twit_1_banner">
                            <div class="twit_1_img"><a href="#"><img style="width: 320px; height: 193px" src="<%= data[i].pic%>" alt="" /></a></div>
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
                        <title>赛事</title>
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
                        <div class="twit_1_img"><a href="#"><img src='<%= data.projects[i].Userpic%>' style="width: 100px; height: 100px" alt="" /></a></div>
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
                         <!DOCTYPE HTML>
                         <html>
                         <head>
                         <title>赛事</title>
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
                         <%for(var i = 0 ; i < len; i++) {%>

                         <div class="twitter_widget_1">
                         <div class="twit_1_banner">
                         <div class="twit_1_img"><a href="#"><img style="width:140px; height: 140px" src = "<%= data[i].Userpic%>" alt="" /></a></div>
                         </div>
                         <ul class="twit_nav">
                         <li><a href="#" class="twit_1"><p><span>名次</span><br> 第<%= i+1%>名</p></a></li>
                         <li><a href="#" class="twit_2"><p><span>队名</span><br><%= data[i].username%></p></a></li>
                         <li><a href="#" class="twit_3"><p><span>票数</span><br><%= data[i].PV%></p></a></li>
                         </ul>


                         </div>
                         <%}%>

                         </body>
                         </html>

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
                 })

}

