$(document).ready(function () {
    /*
   * 判断用户是否登录
   * */
    $.ajax({
        url: "/pns/user/checkIsNotLogin",  //请求地址
        dataType: "json",  //数据格式
        type: "POST",  //请求方式
        async: false,
        success: function (data) {
            if (data.code == 200) { //处于登录状态
                //$(".account").css("visibility", "visible");
                $(".LoginAndRegister").css("display", "none");
                //获取session中的用户信息
                $.ajax({
                    url: "/pns/user/getAccount",  //请求地址
                    dataType: "json",  //数据格式
                    type: "POST",  //请求方式
                    async: false,
                    success: function (data) {
                        //显示用户头像
                        if (!data.photo == "") {
                            $(".account img").attr('src', data.photo);
                            $(".comment_author_logo img").attr('src', data.photo);
                        } else {
                            $(".account img").attr('src', 'https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112222148419.png');
                            $(".comment_author_logo img").attr('src', 'https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112222148419.png');

                        }
                    },
                    error: function (data) {
                        layer.msg("服务异常，请联系管理员");
                    }
                });
            } else {  //没有处于登录状态
                $(".account").css("visibility", "hidden");
                $(".LoginAndRegister").css({"visibility": "visible", "margin-left": "-40px"});
                $(".comment_author_logo img").attr('src', 'https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112222148419.png');
            }
        },
        error: function (data) {
            layer.msg("服务异常，请联系管理员");
        }

    });
    /*发送获取积分排行请求*/
    $.ajax({
        url: "/pns/indexUserPointsListRank",//请求地址
        dataType: "json",//数据格式
        type: "POST",//请求方式
        async: false,//是否异步请求
        success: function (data) {   //如何发送成功
            var html = "";
            for (i = 0; i < data.length; i++) {
                if(data[i].photo==""){
                    data[i].photo="https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112222148419.png";
                }
                html += "<li class=\"layui-col-md12\">\n" +
                    "                            <div class=\"mark-list-logo layui-col-md3\">\n" +
                    "                                <a href=\"\"><img\n" +
                    "                                        src=\""+data[i].photo+"\"\n" +
                    "                                        alt=\"\"></a>\n" +
                    "                            </div>\n" +
                    "                            <div class=\"mark-list-desc layui-col-md9\">\n" +
                    "                                <a href=\"\">\n" +
                    "                                    <div class=\"mark-list-desc-name layui-col-md12\">" + data[i].username + "</div>\n" +
                    "                                </a>\n" +
                    "                                <div class=\"mark-list-desc-score layui-col-md12\">总积分：<span>" + data[i].points + "</span></div>\n" +
                    "                            </div>\n" +
                    "                        </li>";
            }
            $(".userRank").html(html);
        },
        error: function (data) {
            layer.msg("服务器异常，请联系管理员!");
        }
    });
    /*发送获取热门文章请求*/
    $.ajax({
        url: "/pns/indexPopularArticle",//请求地址
        dataType: "json",//数据格式
        type: "POST",//请求方式
        async: false,//是否异步请求
        success: function (data) {   //如果发送成功
            var html = "";
            for (i = 0; i < data.length; i++) {
                var num = i + 1;
                var articleUrl = "/pns/article/" + data[i].id;
                html += "<li class=\"layui-col-md12\">\n" +
                    "                            <span class=\"hot-list-id layui-col-md1\">" + num + ".</span>\n" +
                    "                            <a href=\"" + articleUrl + "\" target='_blank' class=\"hot-list-title layui-col-md10\">\n" +
                    "                                " + data[i].title + "\n" +
                    "                            </a><br>\n" +
                    "                        </li>";
            }
            $(".articleRank").html(html);
        },
        error: function (data) {
            layer.msg("服务器异常，请联系管理员!");
        }
    });


});

$(function() {

    $(".resLink").hide();
    layui.use('form', function() {
        var form = layui.form;
        var type = $('input[name="type"]:checked').val();
        form.on('radio(type)', function(data) {
            type = $('input[name="type"]:checked').val();
            if (type == "file") {
                $(".resLink").hide();
                $(".resFile").show();
            } else if (type == "link") {
                $(".resFile").hide();
                $(".resLink").show();
            }
        });
        form.on('select', function(data){
            //点击提交按钮
            $(".submit-res").click(function (){
                var title = $("input[name='resName']").val();
                var resIntro = $("textarea[name='resIntro']").val();
                var resLogo = $("#resLogo").attr('src');
                if(type=="link"){
                    var link = $("input[name='link']").val();
                }else {
                    var link = $("#fileLink").attr('href');
                }
                var tag = data.value;
                if(title==""){
                    layer.msg("请输入资源名称");
                }else if(resIntro==""){
                    layer.msg("请选择上传资源Logo");
                }else if(resIntro==""){
                    layer.msg("请填写资源简介");
                }else if(type==""){
                    layer.msg("请选择资源类型");
                }else if(tag==""){
                    layer.msg("请选择资源标签");
                }else {
                    $.ajax({
                        url: "/pns/addResources",  //请求地址
                        dataType: "json",  //数据格式
                        type: "POST",  //请求方式
                        async: false,
                        data:{"title":title,"resIntro":resIntro,"resLogo":resLogo,"type":type,"link":link,"tag":tag},
                        success: function (data) {
                            if(data.code==200){
                                layer.msg("资源上传成功");
                            }else {
                                layer.msg(data.msg);
                            }
                        },
                        error: function (data) {
                            layer.msg("服务异常，请联系管理员");
                        }

                    });
                }

            });
        });
    });


})