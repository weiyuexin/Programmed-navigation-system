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
    /*发送获取积分排行请求*/
    $.ajax({
        url: "indexUserPointsListRankMore",//请求地址
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
                    "                                <div class=\"mark-list-logo layui-col-md3\">\n" +
                    "                                  <a target='_blank' href=\"/pns/user/author/"+data[i].username+"\"><img\n" +
                    "                                        src=\""+data[i].photo+"\"\n" +
                    "                                        alt=\"\"></a>\n" +
                    "                                </div>\n" +
                    "                                <div class=\"mark-list-desc layui-col-md9\">\n" +
                    "                                     <a target='_blank' href=\"/pns/user/author/"+data[i].username+"\">\n" +
                    "                                    <div class=\"mark-list-desc-name layui-col-md12\">" + data[i].username + "</div>\n" +
                    "                                </a>\n" +
                    "                                    <div class=\"mark-list-desc-score layui-col-md12\">总积分：<span>"+data[i].points+"</span></div>\n" +
                    "                                </div>\n" +
                    "                            </li>";
            }
            $(".userRank ul").html(html);
        },
        error: function (data) {
            layer.msg("服务器异常，请联系管理员!");
        }
    });

    /*发送获取热门文章请求*/
    $.ajax({
        url: "indexPopularArticleMore",//请求地址
        dataType: "json",//数据格式
        type: "POST",//请求方式
        async: false,//是否异步请求
        success: function (data) {   //如果发送成功
            var html = "";
            for (i = 0; i < data.length; i++) {
                var num=i+1;
                var articleUrl = "/pns/article/" + data[i].id;
                html += "<li class=\"layui-col-md12\">\n" +
                    "                                <span class=\"hot-list-id layui-col-md1\">"+num+".</span>\n" +
                    "                                <a target='_blank' href=\""+articleUrl+"\" class=\"hot-list-title layui-col-md10\">\n" +
                    "                                    "+data[i].title+"" +
                    "                                </a><br>\n" +
                    "                            </li>";
            }
            $(".articleRank ul").html(html);
        },
        error: function (data) {
            layer.msg("服务器异常，请联系管理员!");
        }
    });
    /*发送获取热门资源请求*/
    $.ajax({
        url: "indexPopularResMore",//请求地址
        dataType: "json",//数据格式
        type: "POST",//请求方式
        async: false,//是否异步请求
        success: function (data) {   //如果发送成功
            var html = "";
            for (i = 0; i < data.length; i++) {
                var num=i+1;
                var resUrl = "/pns/resMessage/"+data[i].id;
                html += "<li class=\"layui-col-md12\">\n" +
                    "                                <span class=\"hot-list-id layui-col-md1\">"+num+".</span>\n" +
                    "                                <a target='_blank' href=\""+resUrl+"\" class=\"hot-list-title layui-col-md10\">\n" +
                    "                                    "+data[i].title+"" +
                    "                                </a><br>\n" +
                    "                            </li>";
            }
            $(".ResRank").html(html);
        },
        error: function (data) {
            layer.msg("服务器异常，请联系管理员!");
        }
    });
})

/*
* 排行榜页面
* */