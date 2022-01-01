$(document).ready(function () {
    /*
      * 判断用户是否登录
      * */
    $.ajax({
        url: "/pns/user/checkIsNotLogin",  //请求地址
        dataType: "json",  //数据格式
        type:"POST",  //请求方式
        async: false,
        success:function (data){
            if(data.code==200){ //处于登录状态
                //$(".account").css("display","block");
                $(".LoginAndRegister").css("display","none");
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
                        } else {
                            $(".account img").attr('src', 'https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112222148419.png');

                        }
                    },
                    error: function (data) {
                        layer.msg("服务异常，请联系管理员");
                    }
                });
            }else {  //没有处于登录状态
                $(".account").css("display","none");
                // $(".LoginAndRegister").css("display","block");
            }
        },
        error:function (data) {
            layer.msg("服务异常，请联系管理员");
        }

    })
    $(".accountMessage").css("display", "inline");
    $(".articleList").css("display", "none");
    $(".changePassword").css("display", "none");

    //点击显示个人信息页面
    $(".menu ul .li1").click(function () {
        //添加选中样式
        $(".menu ul li").removeClass("active");
        $(this).addClass("active");
        //显示对应页面
        $(".accountMessage").css("display", "inline");
        $(".articleList").css("display", "none");
        $(".changePassword").css("display", "none");
        $(".editAccountMessage").css("display", "none");
    });
    //点击显示文章列表页面
    $(".menu ul .li2").click(function () {
        //添加选中样式
        $(".menu ul li").removeClass("active");
        $(this).addClass("active");
        //显示对应页面
        $(".accountMessage").css("display", "none");
        $(".articleList").css("display", "inline");
        $(".changePassword").css("display", "none");
        $(".editAccountMessage").css("display", "none");
        //调用查询文章的函数
        getArticlesByAuthor();

    });
    //点击显示资源列表页面
    $(".menu ul .li3").click(function () {
        //添加选中样式
        $(".menu ul li").removeClass("active");
        $(this).addClass("active");
        //显示对应页面
        $(".accountMessage").css("display", "none");
        $(".articleList").css("display", "inline");
        $(".changePassword").css("display", "none");
        $(".editAccountMessage").css("display", "none");
    });

    //选择文章排序规则
    //按时间
    $("#RankByTime").click(function () {
        $("#RankByTime").addClass("RankActive");
        $("#RankByReadNum").removeClass("RankActive");
        getArticlesByAuthorRankByTime();
    });
    //按阅读量
    $("#RankByReadNum").click(function () {
        $("#RankByReadNum").addClass("RankActive");
        $("#RankByTime").removeClass("RankActive");
        getArticlesByAuthorRankByReadNum();
    });


});


//查询作者的文章
function getArticlesByAuthor() {
    var username;
    username = $("#username").html();

    //查询文章
    $.ajax({
        url: "/pns/getArticlesByAuthor/" + username,  //请求地址
        dataType: "json",  //数据格式
        type: "POST",  //请求方式
        async: false,
        success: function (data) {
            console.log(data);
            var html = "";
            for (var i = 0; i < data.length; i++) {
                //定义文章链接
                var articleUrl = "/pns/article/" + data[i].id;
                var articleEditUrl = "/pns/edit/" + data[i].id;
                html += " <li>\n" +
                    "                    <div class=\"layui-panel article\">\n" +
                    "                        <div class=\"article-left layui-col-md9\">\n" +
                    "                            <div class=\"article-title layui-col-md12\">\n" +
                    "                                <a href=\"" + articleUrl + "\" target='_blank'>" + data[i].title + "</a>\n" +
                    "                            </div>\n" +
                    "                            <div class=\"article-content\">\n" +
                    "                                摘要：\n" +
                    "                                <span>" + data[i].content + "</span>\n" +
                    "                            </div>\n" +
                    "                            <div class=\"article-num layui-col-md12\">\n" +
                    "                                <i class=\"fa fa-file-text-o\"></i> 阅读\n" +
                    "                                <span>" + data[i].readNum + "</span>&emsp;<i class=\"fa fa-thumbs-o-up\"></i>点赞\n" +
                    "                                <span>" + data[i].star + "</span>&emsp;<i class=\"fa fa-commenting-o\"></i>评论\n" +
                    "                                <span>" + data[i].commentNum + "</span>\n" +
                    "                            </div>\n" +
                    "                        </div>\n" +
                    "                        <div class=\"article-right layui-col-md3\">\n" +
                    "                            <div class=\"article-time layui-col-md12\">" + data[i].time + "</div>\n" +
                    "                            <div class=\"article-operation layui-col-md12\">\n" +
                    "                                <a href=\"" + articleUrl + "\" target='_blank'>浏览</a>\n" +
                    "                            </div>\n" +
                    "                        </div>\n" +
                    "                    </div>\n" +
                    "                </li>";
            }
            $("#myArticles").html(html);
            if (data.length > 0) {
                $(".el-empty").hide();
                $(".articleRank").show();
            } else {
                $(".el-empty").show();
                $(".articleRank").hide();
            }
        },
        error: function (data) {
            layer.msg("服务异常，请联系管理员");
        }
    })

}

//查询作者的文章，按照时间排序
function getArticlesByAuthorRankByTime() {
    var username;
    username = $("#username").html();
    //查询文章
    $.ajax({
        url: "/pns/getArticlesByAuthorRankByTime/" + username,  //请求地址
        dataType: "json",  //数据格式
        type: "POST",  //请求方式
        async: false,
        success: function (data) {
            console.log(data);
            var html = "";
            for (var i = 0; i < data.length; i++) {
                //定义文章链接
                var articleUrl = "/pns/article/" + data[i].id;
                var articleEditUrl = "/pns/edit/" + data[i].id;
                html += " <li>\n" +
                    "                    <div class=\"layui-panel article\">\n" +
                    "                        <div class=\"article-left layui-col-md9\">\n" +
                    "                            <div class=\"article-title layui-col-md12\">\n" +
                    "                                <a href=\"" + articleUrl + "\" target='_blank'>" + data[i].title + "</a>\n" +
                    "                            </div>\n" +
                    "                            <div class=\"article-content\">\n" +
                    "                                摘要：\n" +
                    "                                <span>" + data[i].content + "</span>\n" +
                    "                            </div>\n" +
                    "                            <div class=\"article-num layui-col-md12\">\n" +
                    "                                <i class=\"fa fa-file-text-o\"></i> 阅读\n" +
                    "                                <span>" + data[i].readNum + "</span>&emsp;<i class=\"fa fa-thumbs-o-up\"></i>点赞\n" +
                    "                                <span>" + data[i].star + "</span>&emsp;<i class=\"fa fa-commenting-o\"></i>评论\n" +
                    "                                <span>" + data[i].commentNum + "</span>\n" +
                    "                            </div>\n" +
                    "                        </div>\n" +
                    "                        <div class=\"article-right layui-col-md3\">\n" +
                    "                            <div class=\"article-time layui-col-md12\">" + data[i].time + "</div>\n" +
                    "                            <div class=\"article-operation layui-col-md12\">\n" +
                    "                                <a href=\"" + articleUrl + "\" target='_blank'>浏览</a>\n" +
                    "                                <a onclick=\"deleteArticleById(" + data[i].id + ")\">删除</a>\n" +
                    "                                <a href=\"" + articleEditUrl + "\" target='_blank'>编辑</a>\n" +
                    "                            </div>\n" +
                    "                        </div>\n" +
                    "                    </div>\n" +
                    "                </li>";
            }
            $("#myArticles").html(html);
            if (data.length > 0) {
                $(".el-empty").hide();
                $(".articleRank").show();
            } else {
                $(".el-empty").show();
                $(".articleRank").hide();
            }
        },
        error: function (data) {
            layer.msg("服务异常，请联系管理员");
        }
    })

}

//查询作者的文章，按照阅读量排序
function getArticlesByAuthorRankByReadNum() {
    var username;
    username = $("#username").html();
    //查询文章
    $.ajax({
        url: "/pns/getArticlesByAuthorRankByReadNum/" + username,  //请求地址
        dataType: "json",  //数据格式
        type: "POST",  //请求方式
        async: false,
        success: function (data) {
            console.log(data);
            var html = "";
            for (var i = 0; i < data.length; i++) {
                //定义文章链接
                var articleUrl = "/pns/article/" + data[i].id;
                var articleEditUrl = "/pns/edit/" + data[i].id;
                html += " <li>\n" +
                    "                    <div class=\"layui-panel article\">\n" +
                    "                        <div class=\"article-left layui-col-md9\">\n" +
                    "                            <div class=\"article-title layui-col-md12\">\n" +
                    "                                <a href=\"" + articleUrl + "\" target='_blank'>" + data[i].title + "</a>\n" +
                    "                            </div>\n" +
                    "                            <div class=\"article-content\">\n" +
                    "                                摘要：\n" +
                    "                                <span>" + data[i].content + "</span>\n" +
                    "                            </div>\n" +
                    "                            <div class=\"article-num layui-col-md12\">\n" +
                    "                                <i class=\"fa fa-file-text-o\"></i> 阅读\n" +
                    "                                <span>" + data[i].readNum + "</span>&emsp;<i class=\"fa fa-thumbs-o-up\"></i>点赞\n" +
                    "                                <span>" + data[i].star + "</span>&emsp;<i class=\"fa fa-commenting-o\"></i>评论\n" +
                    "                                <span>" + data[i].commentNum + "</span>\n" +
                    "                            </div>\n" +
                    "                        </div>\n" +
                    "                        <div class=\"article-right layui-col-md3\">\n" +
                    "                            <div class=\"article-time layui-col-md12\">" + data[i].time + "</div>\n" +
                    "                            <div class=\"article-operation layui-col-md12\">\n" +
                    "                                <a href=\"" + articleUrl + "\" target='_blank'>浏览</a>\n" +
                    "                                <a onclick=\"deleteArticleById(" + data[i].id + ")\">删除</a>\n" +
                    "                                <a href=\"" + articleEditUrl + "\" target='_blank'>编辑</a>\n" +
                    "                            </div>\n" +
                    "                        </div>\n" +
                    "                    </div>\n" +
                    "                </li>";
            }
            $("#myArticles").html(html);
            if (data.length > 0) {
                $(".el-empty").hide();
                $(".articleRank").show();
            } else {
                $(".el-empty").show();
                $(".articleRank").hide();
            }
        },
        error: function (data) {
            layer.msg("服务异常，请联系管理员");
        }
    })

}
