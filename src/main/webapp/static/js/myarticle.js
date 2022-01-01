$(document).ready(function () {
    //页面加载时获取用户的文章
    getArticlesByAuthor();
    getAccount();
    $(".accountMessage").css("display", "none");
    $(".articleList").css("display", "inline");
    $(".changePassword").css("display", "none");
    $(".editAccountMessage").css("display", "none");

    //点击修改个人信息后，显示修改个人信息页面
    $(".changeAccountMessage").click(function () {
        $(".accountMessage").css("display", "none");
        $(".articleList").css("display", "none");
        $(".changePassword").css("display", "none");
        $(".editAccountMessage").css("display", "inline");

    });
    //点击显示个人信息页面
    $(".menu ul .li1").click(function () {
        //查询用户信息
        getAccount();
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
    //点击显示修改密码页面
    $(".menu ul .li4").click(function () {
        //添加选中样式
        $(".menu ul li").removeClass("active");
        $(this).addClass("active");
        //显示对应页面
        $(".accountMessage").css("display", "none");
        $(".articleList").css("display", "none");
        $(".changePassword").css("display", "inline");
        $(".editAccountMessage").css("display", "none");
    });

    //选择文章排序规则
    //按时间
    $("#RankByTime").click(function (){
        $("#RankByTime").addClass("RankActive");
        $("#RankByReadNum").removeClass("RankActive");
        getArticlesByAuthorRankByTime();
    });
    //按阅读量
    $("#RankByReadNum").click(function (){
        $("#RankByReadNum").addClass("RankActive");
        $("#RankByTime").removeClass("RankActive");
        getArticlesByAuthorRankByReadNum();
    });



    /*修改密码 */
    changePassword();
    /*修改个人信息*/
    changeAccount();

});

/*获取用户信息*/
function getAccount() {
    //获取用户信息
    $.ajax({
        url: "getAccount",  //请求地址
        dataType: "json",  //数据格式
        type: "POST",  //请求方式
        async: false,
        success: function (data) {
            //判断数据库中可以为空的字段是否有值
            if (data.sex == null) {
                data.sex = "暂未选择";
            }
            if (data.phone == null) {
                data.phone = "暂未填写";
            }
            if (data.signature == null) {
                data.signature = "暂无";
            }
            if (data.address == null) {
                data.address = "暂无";
            }
            //打印个人信息
            var logoname = $(".home .logo-name");
            logoname.text(data.username);

            if (!data.photo == "") {
                $("#accountLogo").attr('src', data.photo);
            } else {
                $("#accountLogo").attr('src', 'https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112222148419.png');

            }
            var html = "";
            html += "<li>\n" +
                "                        <span class=\"account_name\">昵&emsp;&emsp;称:</span>\n" +
                "                        <ss>" + data.username + "</ss>\n" +
                "                    </li>\n" +
                "                    <li>\n" +
                "                        <span class=\"account_name\">邮&emsp;&emsp;箱:</span>\n" +
                "                        <ss>" + data.email + "</ss>\n" +
                "                    </li>\n" +
                "                    <li>\n" +
                "                        <span class=\"account_name\">性&emsp;&emsp;别:</span>\n" +
                "                        <ss>" + data.sex + "</ss>\n" +
                "                    </li>\n" +
                "                    <li>\n" +
                "                        <span class=\"account_name\">个人简介:</span>\n" +
                "                        <ss>" + data.signature + "</ss>\n" +
                "                    </li>\n" +
                "                    <li>\n" +
                "                        <span class=\"account_name\">注册时间:</span>\n" +
                "                        <ss>" + data.time + "</ss>\n" +
                "                    </li>\n" +
                "                    <li>\n" +
                "                        <span class=\"account_name\">积&emsp;&emsp;分:</span>\n" +
                "                        <ss>" + data.points + "</ss>\n" +
                "                    </li>\n" +
                "                    <li>\n" +
                "                        <span class=\"account_name\">电&emsp;&emsp;话:</span>\n" +
                "                        <ss>" + data.phone + "</ss>\n" +
                "                    </li>\n" +
                "                    <li>\n" +
                "                        <span class=\"account_name\">现&nbsp;&nbsp;居&nbsp;&nbsp;地:</span>\n" +
                "                        <ss>" + data.address + "</ss>\n" +
                "                    </li>";
            $(".home .content .accountMessage ul").html(html);
        },
        error: function (data) {
            layer.msg("服务异常，请联系管理员");
        }
    })
}

//修改密码函数
function changePassword() {
    //点击确认修改按钮
    $("#changePasswordBtn").click(function () {
        //原密码
        var oldPassword = $("#oldPassword").val();
        //新密码
        var newPassword = $("#newPassword").val();
        //确认密码
        var checkPassword = $("#checkPassword").val();

        //判断原密码
        if (oldPassword == "") {
            layer.msg("请输入原密码");
        } else if (newPassword == "") {
            layer.msg("请输入新密码");
        } else if (checkPassword == "") {
            layer.msg("请重新输入确认密码");
        } else if (newPassword == checkPassword) {
            //使用Ajax提交修改
            $.ajax({
                url: "changePasswordAfterLogin",  //请求地址
                dataType: "json",  //数据格式
                type: "POST",  //请求方式
                async: false,
                data: {"oldPassword": oldPassword, "newPassword": newPassword},
                success: function (data) {
                    if (data.code == 200) {//删除成功
                        layer.msg("密码修改成功,请重新登录。。。");
                        window.setTimeout(function () {
                            location.href = "login";
                        }, 2000);
                    } else {
                        layer.msg(data.msg)
                    }
                },
                error: function (data) {
                    layer.msg("服务异常，请联系管理员");
                }

            })
        } else {
            //两次输入的密码不同
            layer.msg("两次输入的密码不一致");
        }
    })
}


//修改个人信息函数
function changeAccount() {
    layui.use('upload', function () {
        var upload = layui.upload;

        //执行实例
        var uploadInst = upload.render({
            elem: '#fileBtn', //绑定元素
            url: '/pns/upload/', //上传接口
            accept: "images",
            done: function (res) {
                //上传完毕回调
                $("#accountHead").attr('src', res.url);
            },
            error: function () {
                //请求异常回调
            }
        });
    });
    $(".uploadChangeAccount").click(function () {
        var photo = $("#accountHead").attr('src');
        var sex = $('input[name="sex"]:checked').val();
        var signature = $("textarea[name='signature']").val();
        var phone = $("input[name='phone']").val();
        var address = $("#city").val();
        if(photo==""){
            layer.msg("请选择头像");
        }else if(sex==""){
            layer.msg("请选择性别")
        }else if(signature==""){
            layer.msg("请填写简介")
        }else if(phone==""){
            layer.msg("请填写联系方式")
        }else if(address==""){
            layer.msg("请填写地址")
        }else {
            //使用Ajax提交修改
            $.ajax({
                url: "changeAccount",  //请求地址
                dataType: "json",  //数据格式
                type: "POST",  //请求方式
                async: false,
                data: {"photo": photo, "sex": sex, "signature": signature, "phone": phone, "address": address},
                success: function (data) {
                    console.log(data);
                    if (data.code == 200) {
                        layer.msg(data.msg);
                    }
                },
                error: function (data) {
                    layer.msg("服务异常，请联系管理员");
                }

            })
        }

    });
}

//查询作者的文章
function getArticlesByAuthor() {
    var username;
    //1、获取session中的用户信息
    $.ajax({
        url: "getAccount",  //请求地址
        dataType: "json",  //数据格式
        type: "POST",  //请求方式
        async: false,
        success: function (data) {
            username = data.username;
        },
        error: function (data) {
            layer.msg("服务异常，请联系管理员");
        }
    });
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
                    "                                <a onclick=\"deleteArticleById(" + data[i].id + ")\">删除</a>\n" +
                    "                                <a href=\""+articleEditUrl+"\" target='_blank'>编辑</a>\n" +
                    "                            </div>\n" +
                    "                        </div>\n" +
                    "                    </div>\n" +
                    "                </li>";
            }
            $("#myArticles").html(html);
            if(data.length>0){
                $(".el-empty").hide();
                $(".articleRank").show();
            }else {
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
    //1、获取session中的用户信息
    $.ajax({
        url: "getAccount",  //请求地址
        dataType: "json",  //数据格式
        type: "POST",  //请求方式
        async: false,
        success: function (data) {
            username = data.username;
        },
        error: function (data) {
            layer.msg("服务异常，请联系管理员");
        }
    });
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
                    "                                <a href=\""+articleEditUrl+"\" target='_blank'>编辑</a>\n" +
                    "                            </div>\n" +
                    "                        </div>\n" +
                    "                    </div>\n" +
                    "                </li>";
            }
            $("#myArticles").html(html);
            if(data.length>0){
                $(".el-empty").hide();
                $(".articleRank").show();
            }else {
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
    //1、获取session中的用户信息
    $.ajax({
        url: "getAccount",  //请求地址
        dataType: "json",  //数据格式
        type: "POST",  //请求方式
        async: false,
        success: function (data) {
            username = data.username;
        },
        error: function (data) {
            layer.msg("服务异常，请联系管理员");
        }
    });
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
                    "                                <a href=\""+articleEditUrl+"\" target='_blank'>编辑</a>\n" +
                    "                            </div>\n" +
                    "                        </div>\n" +
                    "                    </div>\n" +
                    "                </li>";
            }
            $("#myArticles").html(html);
            if(data.length>0){
                $(".el-empty").hide();
                $(".articleRank").show();
            }else {
                $(".el-empty").show();
                $(".articleRank").hide();
            }
        },
        error: function (data) {
            layer.msg("服务异常，请联系管理员");
        }
    })

}

//删除指定id的文章
function deleteArticleById(id) {
    layer.confirm("删除后文章不可恢复，确认删除吗?", {icon: 3, title: '提示'}, function () {
        $.ajax({
            url: "/pns/deleteArticlesById/" + id,//请求地址
            dataType: "json",//数据格式
            type: "POST",//请求方式
            async: false,//是否异步请求
            success: function (data) {   //如何删除成功
                if (data.code == 200) {//删除成功
                    layer.msg(data.msg);
                    //重新获取文章
                    getArticlesByAuthor();
                } else if (data.code == 201) {
                    layer.msg(data.msg);
                }
            },
            error: function (data) {
                layer.msg("服务器异常，请联系管理员!");
            }
        });
        layer.close(index);
    });
}