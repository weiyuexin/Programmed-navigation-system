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
    //首先需要根据作者的id查询到作者的信息
    var authorName = $(".authorName").html();//用户名
    var authorLogo = "";//头像
    var signature = "";
    $.ajax({
        url: "/pns/user/getAuthorMessageByUsername/" + authorName,//请求地址
        dataType: "json",//数据格式
        type: "POST",//请求方式
        async: false,//是否异步请求
        success: function (data) {   //如何发送成功
            //console.log(data);
            authorName = data.username;
            authorLogo = data.photo;
            signature = data.signature;
            if (authorLogo == "") {
                authorLogo = "https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112222148419.png";
            }
            $(".geyan").html(data.signature);
            $(".articleAuthorLogo").attr('src', authorLogo);
            authorLink = "/pns/user/author/" + data.username;
            $(".articleAuthorLink").attr('href', authorLink);
        },
        error: function (data) {
            layer.msg("服务器异常，请联系管理员!");
        }
    });


    /*发送获取积分排行请求*/
    $.ajax({
        url: "../indexUserPointsListRank",//请求地址
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
        url: "../indexPopularRes",//请求地址
        dataType: "json",//数据格式
        type: "POST",//请求方式
        async: false,//是否异步请求
        success: function (data) {   //如果发送成功
            var html = "";
            for (i = 0; i < data.length; i++) {
                var num = i + 1;
                var articleUrl = "/pns/resMessage/" + data[i].id;
                html+="<li class=\"layui-col-md12\">\n" +
                    "                            <span class=\"hot-list-id layui-col-md1\">"+num+".</span>\n" +
                    "                            <a href=\""+articleUrl+"\" target='_blank' class=\"hot-list-title layui-col-md10\">\n" +
                    "                                "+data[i].title+"\n" +
                    "                            </a><br>\n" +
                    "                        </li>";
            }
            $(".ResRank").html(html);
        },
        error: function (data) {
            layer.msg("服务器异常，请联系管理员!");
        }
    });
    /*发送获取热门文章请求*/
    $.ajax({
        url: "../indexPopularArticle",//请求地址
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

    //读取数据库中的评论
    getComment();

    addComment();


});

function addComment() {
    layui.use('layedit', function () {
        var layedit = layui.layedit;
        var index = layedit.build('comment', {
            tool: [
                'strong' //加粗
                , 'italic' //斜体
                , 'underline' //下划线
                , 'del' //删除线
                , '|' //分割线
                , 'left' //左对齐
                , 'center' //居中对齐
                , 'right' //右对齐
                , 'link' //超链接
                , 'unlink' //清除链接
                , 'face' //表情
            ]
            , height: 120 //设置编辑器高度
        });
        //点击提交评论按钮
        $(".comment_submit_btn").click(function () {
            //获取评论内容
            var comment = layedit.getContent(index);
            //获取文章的id
            var articleId = $("#articleId").val();
            // console.log(comment)
            // console.log(articleId)

            if (comment == "") {
                layer.msg("请输入评论内容");
            } else {
                $.ajax({
                    url: "/pns/saveComment",//请求地址
                    dataType: "json",//数据格式
                    type: "POST",//请求方式
                    async: false,//是否异步请求
                    data: {
                        "comment": comment,
                        "articleId": articleId,
                    },
                    success: function (data) {   //如何发送成功
                        if (data.code == 200) {//发布成功
                            layer.msg(data.msg);
                            $("#comment").val("");
                            getComment($(".comment-num").html());
                            $(".commentNumber").text(parseInt($(".commentNumber").html()) + 1);
                            layedit.setContent(index, "");
                        } else if (data.code == 201) {
                            layer.msg(data.msg);
                        }
                    },
                    error: function (data) {
                        layer.msg("服务器异常，请联系管理员!");
                    }
                });
            }
        });
    });

};

//获取当前文章的评论
function getComment() {
    //获取文章的id
    var articleId = $("#articleId").val();
    // alert(articleId)
    $.ajax({
        url: "/pns/getAllCommentByArticleId/" + articleId,//请求地址
        dataType: "json",//数据格式
        type: "POST",//请求方式
        async: false,//是否异步请求
        success: function (data) {   //如何发送成功
            console.log(data);
            if (data.length > 0) {
                $(".comment_number").html("(" + data.length + ")");
                //展示评论
                var html = "";
                for (var i = 0; i < data.length; i++) {
                    //首先需要根据作者的id查询到作者的信息
                    var authorName = "";
                    var authorLogo = "";//头像
                    $.ajax({
                        url: "/pns/user/getAuthorMessage/" + data[i].authorId,//请求地址
                        dataType: "json",//数据格式
                        type: "POST",//请求方式
                        async: false,//是否异步请求
                        success: function (data) {   //如何发送成功
                            //console.log(data);
                            authorName = data.username;
                            authorLogo = data.photo;
                        },
                        error: function (data) {
                            layer.msg("服务器异常，请联系管理员!");
                        }
                    });
                    // 判断头像是否为空
                    if (authorLogo == "") {
                        authorLogo = "https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112222148419.png";
                    }

                    html += "<li>\n" +
                        "                            <div class=\"author_message layui-col-md12\">\n" +
                        "                                <div class=\"comment_list_author_logo\">\n" +
                        "                                    <a href=\"\"><img src=\"" + authorLogo + "\" alt=\"\"></a>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"author_mess layui-col-md10\">\n" +
                        "                                    <div class=\"author_name\"><a href=\"\">" + authorName + "</a></div>\n" +
                        "                                    <div class=\"comment_time\">" + data[i].time + "</div>\n" +
                        "                                </div>\n" +
                        "                                <div class=\"comment_star\" onclick=\"starComment(" + data[i].id + ")\">\n" +
                        "                                    <i class=\"layui-icon layui-icon-praise\"></i><span id=\"comment_star_num\">" + data[i].star + "</span>\n" +
                        "                                </div>\n" +
                        "                            </div>\n" +
                        "                            <div class=\"comment_body layui-col-md12\">\n" +
                        "                                <span>" + data[i].content + "</span>\n" +
                        "                            </div>\n" +
                        "                        </li>";
                }
                $(".comment_list ul").html(html);
            }
        },
        error: function (data) {
            layer.msg("服务器异常，请联系管理员!");
        }
    });
};

//点赞评论
function starComment(id) {

    $.ajax({
        url: "/pns/starCommentById/" + id,//请求地址
        dataType: "json",//数据格式
        type: "POST",//请求方式
        async: false,//是否异步请求
        success: function (data) {   //如何点赞成功
            if (data.code == 200) {//点赞成功
                layer.msg(data.msg);
                getComment();
            } else if (data.code == 201) {
                layer.msg(data.msg);
            }
        },
        error: function (data) {
            layer.msg("服务器异常，请联系管理员!");
        }
    });
}

//点赞文章
function starArticle() {
    //获取文章的id
    var articleId = $("#articleId").val();
    $.ajax({
        url: "/pns/starArticleById/" + articleId,//请求地址
        dataType: "json",//数据格式
        type: "POST",//请求方式
        async: false,//是否异步请求
        success: function (data) {   //如何点赞成功
            if (data.code == 200) {//点赞成功
                layer.msg(data.msg);
                $(".star-num").text(parseInt($(".star-num").html()) + 1)
                $(".fa-thumbs-up").css("color", "#3e71f6");
            } else if (data.code == 201) {
                layer.msg(data.msg);
            }
        },
        error: function (data) {
            layer.msg("服务器异常，请联系管理员!");
        }
    });
}