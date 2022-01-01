$(document).ready(function() {

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
                    url: "user/getAccount",  //请求地址
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

    //页面加载时，显示类型为书籍的资源

    $.ajax({
        url: "/pns/res/书籍",  //请求地址
        dataType: "json",  //数据格式
        type: "POST",  //请求方式
        async: false,
        success: function (data) {
            var html="";
            for (i = 0; i < data.length; i++) {
                var resUrl = "/pns/resMessage/"+data[i].id;
                html+="<a href=\""+resUrl+"\" target='_blank'>\n" +
                    "                <div class=\"layui-col-md4 box layui-col-md3\">\n" +
                    "                    <div class=\"layui-col-md12 logo\">\n" +
                    "                        <img src=\""+data[i].icon+"\">\n" +
                    "                    </div>\n" +
                    "                    <div class=\"layui-col-md12 title\">"+data[i].title+"</div>\n" +
                    "                    <div class=\"layui-col-md12 jianjie\">"+data[i].content+"</div>\n" +
                    "                </div>\n" +
                    "            </a>";
                $(".reslist").html(html);
            }
        },
        error: function (data) {
            layer.msg("服务异常，请联系管理员");
        }

    });

    $("#book").click(function (){
        $.ajax({
            url: "/pns/res/书籍",  //请求地址
            dataType: "json",  //数据格式
            type: "POST",  //请求方式
            async: false,
            success: function (data) {
                var html="";
                for (i = 0; i < data.length; i++) {
                    var resUrl = "/pns/resMessage/"+data[i].id;
                    html+="<a href=\""+resUrl+"\" target='_blank'>\n" +
                        "                <div class=\"layui-col-md4 box layui-col-md3\">\n" +
                        "                    <div class=\"layui-col-md12 logo\">\n" +
                        "                        <img src=\""+data[i].icon+"\">\n" +
                        "                    </div>\n" +
                        "                    <div class=\"layui-col-md12 title\">"+data[i].title+"</div>\n" +
                        "                    <div class=\"layui-col-md12 jianjie\">"+data[i].content+"</div>\n" +
                        "                </div>\n" +
                        "            </a>";
                    $(".reslist").html(html);
                }
                if(data==0){
                    $(".reslist").html("<div id=\"empty\">\n" +
                        "                <el-empty description=\"该分类下暂时还没有资源\"></el-empty>\n" +
                        "            </div>\n" +
                        "            <script type=\"text/javascript\">\n" +
                        "                new Vue({\n" +
                        "                    el: '#empty',\n" +
                        "                })\n" +
                        "            </script>");
                    // $(".empty").show();
                }
            },
            error: function (data) {
                layer.msg("服务异常，请联系管理员");
            }

        });
    });
    $("#course").click(function (){
        $.ajax({
            url: "/pns/res/教程",  //请求地址
            dataType: "json",  //数据格式
            type: "POST",  //请求方式
            async: false,
            success: function (data) {
                var html="";
                for (i = 0; i < data.length; i++) {
                    var resUrl = "/pns/resMessage/"+data[i].id;
                    html+="<a href=\""+resUrl+"\" target='_blank'>\n" +
                        "                <div class=\"layui-col-md4 box layui-col-md3\">\n" +
                        "                    <div class=\"layui-col-md12 logo\">\n" +
                        "                        <img src=\""+data[i].icon+"\">\n" +
                        "                    </div>\n" +
                        "                    <div class=\"layui-col-md12 title\">"+data[i].title+"</div>\n" +
                        "                    <div class=\"layui-col-md12 jianjie\">"+data[i].content+"</div>\n" +
                        "                </div>\n" +
                        "            </a>";
                    $(".reslist").html(html);
                }
                if(data==0){
                    $(".reslist").html("<div id=\"empty\">\n" +
                        "                <el-empty description=\"该分类下暂时还没有资源\"></el-empty>\n" +
                        "            </div>\n" +
                        "            <script type=\"text/javascript\">\n" +
                        "                new Vue({\n" +
                        "                    el: '#empty',\n" +
                        "                })\n" +
                        "            </script>");
                    // $(".empty").show();
                }
            },
            error: function (data) {
                layer.msg("服务异常，请联系管理员");
            }

        });
    });
    $("#tool").click(function (){
        $.ajax({
            url: "/pns/res/工具",  //请求地址
            dataType: "json",  //数据格式
            type: "POST",  //请求方式
            async: false,
            success: function (data) {
                var html="";
                for (i = 0; i < data.length; i++) {
                    var resUrl = "/pns/resMessage/"+data[i].id;
                    html+="<a href=\""+resUrl+"\" target='_blank'>\n" +
                        "                <div class=\"layui-col-md4 box layui-col-md3\">\n" +
                        "                    <div class=\"layui-col-md12 logo\">\n" +
                        "                        <img src=\""+data[i].icon+"\">\n" +
                        "                    </div>\n" +
                        "                    <div class=\"layui-col-md12 title\">"+data[i].title+"</div>\n" +
                        "                    <div class=\"layui-col-md12 jianjie\">"+data[i].content+"</div>\n" +
                        "                </div>\n" +
                        "            </a>";
                    $(".reslist").html(html);
                }
                if(data==0){
                    $(".reslist").html("<div id=\"empty\">\n" +
                        "                <el-empty description=\"该分类下暂时还没有资源\"></el-empty>\n" +
                        "            </div>\n" +
                        "            <script type=\"text/javascript\">\n" +
                        "                new Vue({\n" +
                        "                    el: '#empty',\n" +
                        "                })\n" +
                        "            </script>");
                    // $(".empty").show();
                }
            },
            error: function (data) {
                layer.msg("服务异常，请联系管理员");
            }

        });
    });
    $("#cpp").click(function (){
        $.ajax({
            url: "/pns/res/cpp",  //请求地址
            dataType: "json",  //数据格式
            type: "POST",  //请求方式
            async: false,
            success: function (data) {
                var html="";
                for (i = 0; i < data.length; i++) {
                    var resUrl = "/pns/resMessage/"+data[i].id;
                    html+="<a href=\""+resUrl+"\" target='_blank'>\n" +
                        "                <div class=\"layui-col-md4 box layui-col-md3\">\n" +
                        "                    <div class=\"layui-col-md12 logo\">\n" +
                        "                        <img src=\""+data[i].icon+"\">\n" +
                        "                    </div>\n" +
                        "                    <div class=\"layui-col-md12 title\">"+data[i].title+"</div>\n" +
                        "                    <div class=\"layui-col-md12 jianjie\">"+data[i].content+"</div>\n" +
                        "                </div>\n" +
                        "            </a>";
                    $(".reslist").html(html);
                }
                if(data==0){
                    $(".reslist").html("<div id=\"empty\">\n" +
                        "                <el-empty description=\"该分类下暂时还没有资源\"></el-empty>\n" +
                        "            </div>\n" +
                        "            <script type=\"text/javascript\">\n" +
                        "                new Vue({\n" +
                        "                    el: '#empty',\n" +
                        "                })\n" +
                        "            </script>");
                    // $(".empty").show();
                }
            },
            error: function (data) {
                layer.msg("服务异常，请联系管理员");
            }

        });
    });
    $("#Java").click(function (){
        $.ajax({
            url: "/pns/res/Java",  //请求地址
            dataType: "json",  //数据格式
            type: "POST",  //请求方式
            async: false,
            success: function (data) {
                var html="";
                for (i = 0; i < data.length; i++) {
                    var resUrl = "/pns/resMessage/"+data[i].id;
                    html+="<a href=\""+resUrl+"\" target='_blank'>\n" +
                        "                <div class=\"layui-col-md4 box layui-col-md3\">\n" +
                        "                    <div class=\"layui-col-md12 logo\">\n" +
                        "                        <img src=\""+data[i].icon+"\">\n" +
                        "                    </div>\n" +
                        "                    <div class=\"layui-col-md12 title\">"+data[i].title+"</div>\n" +
                        "                    <div class=\"layui-col-md12 jianjie\">"+data[i].content+"</div>\n" +
                        "                </div>\n" +
                        "            </a>";
                    $(".reslist").html(html);
                }
                if(data==0){
                    $(".reslist").html("<div id=\"empty\">\n" +
                        "                <el-empty description=\"该分类下暂时还没有资源\"></el-empty>\n" +
                        "            </div>\n" +
                        "            <script type=\"text/javascript\">\n" +
                        "                new Vue({\n" +
                        "                    el: '#empty',\n" +
                        "                })\n" +
                        "            </script>");
                    // $(".empty").show();
                }
            },
            error: function (data) {
                layer.msg("服务异常，请联系管理员");
            }

        });
    });
    $("#Python").click(function (){
        $.ajax({
            url: "/pns/res/Python",  //请求地址
            dataType: "json",  //数据格式
            type: "POST",  //请求方式
            async: false,
            success: function (data) {
                var html="";
                for (i = 0; i < data.length; i++) {
                    var resUrl = "/pns/resMessage/"+data[i].id;
                    html+="<a href=\""+resUrl+"\" target='_blank'>\n" +
                        "                <div class=\"layui-col-md4 box layui-col-md3\">\n" +
                        "                    <div class=\"layui-col-md12 logo\">\n" +
                        "                        <img src=\""+data[i].icon+"\">\n" +
                        "                    </div>\n" +
                        "                    <div class=\"layui-col-md12 title\">"+data[i].title+"</div>\n" +
                        "                    <div class=\"layui-col-md12 jianjie\">"+data[i].content+"</div>\n" +
                        "                </div>\n" +
                        "            </a>";
                    $(".reslist").html(html);
                }
                if(data==0){
                    $(".reslist").html("<div id=\"empty\">\n" +
                        "                <el-empty description=\"该分类下暂时还没有资源\"></el-empty>\n" +
                        "            </div>\n" +
                        "            <script type=\"text/javascript\">\n" +
                        "                new Vue({\n" +
                        "                    el: '#empty',\n" +
                        "                })\n" +
                        "            </script>");
                    // $(".empty").show();
                }
            },
            error: function (data) {
                layer.msg("服务异常，请联系管理员");
            }

        });
    });
    $("#JavaScript").click(function (){
        $.ajax({
            url: "/pns/res/JavaScript",  //请求地址
            dataType: "json",  //数据格式
            type: "POST",  //请求方式
            async: false,
            success: function (data) {
                var html="";
                for (i = 0; i < data.length; i++) {
                    var resUrl = "/pns/resMessage/"+data[i].id;
                    html+="<a href=\""+resUrl+"\" target='_blank'>\n" +
                        "                <div class=\"layui-col-md4 box layui-col-md3\">\n" +
                        "                    <div class=\"layui-col-md12 logo\">\n" +
                        "                        <img src=\""+data[i].icon+"\">\n" +
                        "                    </div>\n" +
                        "                    <div class=\"layui-col-md12 title\">"+data[i].title+"</div>\n" +
                        "                    <div class=\"layui-col-md12 jianjie\">"+data[i].content+"</div>\n" +
                        "                </div>\n" +
                        "            </a>";
                    $(".reslist").html(html);
                }
                if(data==0){
                    $(".reslist").html("<div id=\"empty\">\n" +
                        "                <el-empty description=\"该分类下暂时还没有资源\"></el-empty>\n" +
                        "            </div>\n" +
                        "            <script type=\"text/javascript\">\n" +
                        "                new Vue({\n" +
                        "                    el: '#empty',\n" +
                        "                })\n" +
                        "            </script>");
                    // $(".empty").show();
                }
            },
            error: function (data) {
                layer.msg("服务异常，请联系管理员");
            }

        });
    });
    $("#GO").click(function (){
        $.ajax({
            url: "/pns/res/GO",  //请求地址
            dataType: "json",  //数据格式
            type: "POST",  //请求方式
            async: false,
            success: function (data) {
                var html="";
                for (i = 0; i < data.length; i++) {
                    var resUrl = "/pns/resMessage/"+data[i].id;
                    html+="<a href=\""+resUrl+"\" target='_blank'>\n" +
                        "                <div class=\"layui-col-md4 box layui-col-md3\">\n" +
                        "                    <div class=\"layui-col-md12 logo\">\n" +
                        "                        <img src=\""+data[i].icon+"\">\n" +
                        "                    </div>\n" +
                        "                    <div class=\"layui-col-md12 title\">"+data[i].title+"</div>\n" +
                        "                    <div class=\"layui-col-md12 jianjie\">"+data[i].content+"</div>\n" +
                        "                </div>\n" +
                        "            </a>";
                    $(".reslist").html(html);
                }
                if(data==0){
                    $(".reslist").html("<div id=\"empty\">\n" +
                        "                <el-empty description=\"该分类下暂时还没有资源\"></el-empty>\n" +
                        "            </div>\n" +
                        "            <script type=\"text/javascript\">\n" +
                        "                new Vue({\n" +
                        "                    el: '#empty',\n" +
                        "                })\n" +
                        "            </script>");
                    // $(".empty").show();
                }
            },
            error: function (data) {
                layer.msg("服务异常，请联系管理员");
            }

        });
    });
    $("#PHP").click(function (){
        $.ajax({
            url: "/pns/res/PHP",  //请求地址
            dataType: "json",  //数据格式
            type: "POST",  //请求方式
            async: false,
            success: function (data) {
                var html="";
                for (i = 0; i < data.length; i++) {
                    var resUrl = "/pns/resMessage/"+data[i].id;
                    html+="<a href=\""+resUrl+"\" target='_blank'>\n" +
                        "                <div class=\"layui-col-md4 box layui-col-md3\">\n" +
                        "                    <div class=\"layui-col-md12 logo\">\n" +
                        "                        <img src=\""+data[i].icon+"\">\n" +
                        "                    </div>\n" +
                        "                    <div class=\"layui-col-md12 title\">"+data[i].title+"</div>\n" +
                        "                    <div class=\"layui-col-md12 jianjie\">"+data[i].content+"</div>\n" +
                        "                </div>\n" +
                        "            </a>";
                    $(".reslist").html(html);
                }
                if(data==0){
                    $(".reslist").html("<div id=\"empty\">\n" +
                        "                <el-empty description=\"该分类下暂时还没有资源\"></el-empty>\n" +
                        "            </div>\n" +
                        "            <script type=\"text/javascript\">\n" +
                        "                new Vue({\n" +
                        "                    el: '#empty',\n" +
                        "                })\n" +
                        "            </script>");
                    // $(".empty").show();
                }
            },
            error: function (data) {
                layer.msg("服务异常，请联系管理员");
            }

        });
    });
    $("#AI").click(function (){
        $.ajax({
            url: "/pns/res/人工智能",  //请求地址
            dataType: "json",  //数据格式
            type: "POST",  //请求方式
            async: false,
            success: function (data) {
                var html="";
                for (i = 0; i < data.length; i++) {
                    var resUrl = "/pns/resMessage/"+data[i].id;
                    html+="<a href=\""+resUrl+"\" target='_blank'>\n" +
                        "                <div class=\"layui-col-md4 box layui-col-md3\">\n" +
                        "                    <div class=\"layui-col-md12 logo\">\n" +
                        "                        <img src=\""+data[i].icon+"\">\n" +
                        "                    </div>\n" +
                        "                    <div class=\"layui-col-md12 title\">"+data[i].title+"</div>\n" +
                        "                    <div class=\"layui-col-md12 jianjie\">"+data[i].content+"</div>\n" +
                        "                </div>\n" +
                        "            </a>";
                    $(".reslist").html(html);
                }
                if(data==0){
                    $(".reslist").html("<div id=\"empty\">\n" +
                        "                <el-empty description=\"该分类下暂时还没有资源\"></el-empty>\n" +
                        "            </div>\n" +
                        "            <script type=\"text/javascript\">\n" +
                        "                new Vue({\n" +
                        "                    el: '#empty',\n" +
                        "                })\n" +
                        "            </script>");
                    // $(".empty").show();
                }
            },
            error: function (data) {
                layer.msg("服务异常，请联系管理员");
            }

        });
    });
    $("#HarmonyOS").click(function (){
        $.ajax({
            url: "/pns/res/鸿蒙",  //请求地址
            dataType: "json",  //数据格式
            type: "POST",  //请求方式
            async: false,
            success: function (data) {
                var html="";
                for (i = 0; i < data.length; i++) {
                    var resUrl = "/pns/resMessage/"+data[i].id;
                    html+="<a href=\""+resUrl+"\" target='_blank'>\n" +
                        "                <div class=\"layui-col-md4 box layui-col-md3\">\n" +
                        "                    <div class=\"layui-col-md12 logo\">\n" +
                        "                        <img src=\""+data[i].icon+"\">\n" +
                        "                    </div>\n" +
                        "                    <div class=\"layui-col-md12 title\">"+data[i].title+"</div>\n" +
                        "                    <div class=\"layui-col-md12 jianjie\">"+data[i].content+"</div>\n" +
                        "                </div>\n" +
                        "            </a>";
                    $(".reslist").html(html);
                }
                if(data==0){
                    $(".reslist").html("<div id=\"empty\">\n" +
                        "                <el-empty description=\"该分类下暂时还没有资源\"></el-empty>\n" +
                        "            </div>\n" +
                        "            <script type=\"text/javascript\">\n" +
                        "                new Vue({\n" +
                        "                    el: '#empty',\n" +
                        "                })\n" +
                        "            </script>");
                    // $(".empty").show();
                }
            },
            error: function (data) {
                layer.msg("服务异常，请联系管理员");
            }

        });
    });
    $("#yun").click(function (){
        $.ajax({
            url: "/pns/res/云计算",  //请求地址
            dataType: "json",  //数据格式
            type: "POST",  //请求方式
            async: false,
            success: function (data) {
                var html="";
                for (i = 0; i < data.length; i++) {
                    var resUrl = "/pns/resMessage/"+data[i].id;
                    html+="<a href=\""+resUrl+"\" target='_blank'>\n" +
                        "                <div class=\"layui-col-md4 box layui-col-md3\">\n" +
                        "                    <div class=\"layui-col-md12 logo\">\n" +
                        "                        <img src=\""+data[i].icon+"\">\n" +
                        "                    </div>\n" +
                        "                    <div class=\"layui-col-md12 title\">"+data[i].title+"</div>\n" +
                        "                    <div class=\"layui-col-md12 jianjie\">"+data[i].content+"</div>\n" +
                        "                </div>\n" +
                        "            </a>";
                    $(".reslist").html(html);
                }
                if(data==0){
                    $(".reslist").html("<div id=\"empty\">\n" +
                        "                <el-empty description=\"该分类下暂时还没有资源\"></el-empty>\n" +
                        "            </div>\n" +
                        "            <script type=\"text/javascript\">\n" +
                        "                new Vue({\n" +
                        "                    el: '#empty',\n" +
                        "                })\n" +
                        "            </script>");
                    // $(".empty").show();
                }
            },
            error: function (data) {
                layer.msg("服务异常，请联系管理员");
            }

        });
    });
    $("#dataStructure").click(function (){
        $.ajax({
            url: "/pns/res/数据结构",  //请求地址
            dataType: "json",  //数据格式
            type: "POST",  //请求方式
            async: false,
            success: function (data) {
                var html="";
                for (i = 0; i < data.length; i++) {
                    var resUrl = "/pns/resMessage/"+data[i].id;
                    html+="<a href=\""+resUrl+"\" target='_blank'>\n" +
                        "                <div class=\"layui-col-md4 box layui-col-md3\">\n" +
                        "                    <div class=\"layui-col-md12 logo\">\n" +
                        "                        <img src=\""+data[i].icon+"\">\n" +
                        "                    </div>\n" +
                        "                    <div class=\"layui-col-md12 title\">"+data[i].title+"</div>\n" +
                        "                    <div class=\"layui-col-md12 jianjie\">"+data[i].content+"</div>\n" +
                        "                </div>\n" +
                        "            </a>";
                    $(".reslist").html(html);
                }
                if(data==0){
                    $(".reslist").html("<div id=\"empty\">\n" +
                        "                <el-empty description=\"该分类下暂时还没有资源\"></el-empty>\n" +
                        "            </div>\n" +
                        "            <script type=\"text/javascript\">\n" +
                        "                new Vue({\n" +
                        "                    el: '#empty',\n" +
                        "                })\n" +
                        "            </script>");
                    // $(".empty").show();
                }
            },
            error: function (data) {
                layer.msg("服务异常，请联系管理员");
            }

        });
    });
    $("#os").click(function (){
        $.ajax({
            url: "/pns/res/操作系统",  //请求地址
            dataType: "json",  //数据格式
            type: "POST",  //请求方式
            async: false,
            success: function (data) {
                var html="";
                for (i = 0; i < data.length; i++) {
                    var resUrl = "/pns/resMessage/"+data[i].id;
                    html+="<a href=\""+resUrl+"\" target='_blank'>\n" +
                        "                <div class=\"layui-col-md4 box layui-col-md3\">\n" +
                        "                    <div class=\"layui-col-md12 logo\">\n" +
                        "                        <img src=\""+data[i].icon+"\">\n" +
                        "                    </div>\n" +
                        "                    <div class=\"layui-col-md12 title\">"+data[i].title+"</div>\n" +
                        "                    <div class=\"layui-col-md12 jianjie\">"+data[i].content+"</div>\n" +
                        "                </div>\n" +
                        "            </a>";
                    $(".reslist").html(html);
                }
                if(data==0){
                    $(".reslist").html("<div id=\"empty\">\n" +
                        "                <el-empty description=\"该分类下暂时还没有资源\"></el-empty>\n" +
                        "            </div>\n" +
                        "            <script type=\"text/javascript\">\n" +
                        "                new Vue({\n" +
                        "                    el: '#empty',\n" +
                        "                })\n" +
                        "            </script>");
                    // $(".empty").show();
                }
            },
            error: function (data) {
                layer.msg("服务异常，请联系管理员");
            }

        });
    });
    $("#net").click(function (){
        $.ajax({
            url: "/pns/res/计算机网络",  //请求地址
            dataType: "json",  //数据格式
            type: "POST",  //请求方式
            async: false,
            success: function (data) {
                var html="";
                for (i = 0; i < data.length; i++) {
                    var resUrl = "/pns/resMessage/"+data[i].id;
                    html+="<a href=\""+resUrl+"\" target='_blank'>\n" +
                        "                <div class=\"layui-col-md4 box layui-col-md3\">\n" +
                        "                    <div class=\"layui-col-md12 logo\">\n" +
                        "                        <img src=\""+data[i].icon+"\">\n" +
                        "                    </div>\n" +
                        "                    <div class=\"layui-col-md12 title\">"+data[i].title+"</div>\n" +
                        "                    <div class=\"layui-col-md12 jianjie\">"+data[i].content+"</div>\n" +
                        "                </div>\n" +
                        "            </a>";
                    $(".reslist").html(html);
                }
                if(data==0){
                    $(".reslist").html("<div id=\"empty\">\n" +
                        "                <el-empty description=\"该分类下暂时还没有资源\"></el-empty>\n" +
                        "            </div>\n" +
                        "            <script type=\"text/javascript\">\n" +
                        "                new Vue({\n" +
                        "                    el: '#empty',\n" +
                        "                })\n" +
                        "            </script>");
                    // $(".empty").show();
                }
            },
            error: function (data) {
                layer.msg("服务异常，请联系管理员");
            }

        });
    });
    $("#jcjc").click(function (){
        $.ajax({
            url: "/pns/res/基础教程",  //请求地址
            dataType: "json",  //数据格式
            type: "POST",  //请求方式
            async: false,
            success: function (data) {
                var html="";
                for (i = 0; i < data.length; i++) {
                    var resUrl = "/pns/resMessage/"+data[i].id;
                    html+="<a href=\""+resUrl+"\" target='_blank'>\n" +
                        "                <div class=\"layui-col-md4 box layui-col-md3\">\n" +
                        "                    <div class=\"layui-col-md12 logo\">\n" +
                        "                        <img src=\""+data[i].icon+"\">\n" +
                        "                    </div>\n" +
                        "                    <div class=\"layui-col-md12 title\">"+data[i].title+"</div>\n" +
                        "                    <div class=\"layui-col-md12 jianjie\">"+data[i].content+"</div>\n" +
                        "                </div>\n" +
                        "            </a>";
                    $(".reslist").html(html);
                }
                if(data==0){
                    $(".reslist").html("<div id=\"empty\">\n" +
                        "                <el-empty description=\"该分类下暂时还没有资源\"></el-empty>\n" +
                        "            </div>\n" +
                        "            <script type=\"text/javascript\">\n" +
                        "                new Vue({\n" +
                        "                    el: '#empty',\n" +
                        "                })\n" +
                        "            </script>");
                    // $(".empty").show();
                }
            },
            error: function (data) {
                layer.msg("服务异常，请联系管理员");
            }

        });
    });
    $("#kuangjia").click(function (){
        $.ajax({
            url: "/pns/res/开发框架",  //请求地址
            dataType: "json",  //数据格式
            type: "POST",  //请求方式
            async: false,
            success: function (data) {
                var html="";
                for (i = 0; i < data.length; i++) {
                    var resUrl = "/pns/resMessage/"+data[i].id;
                    html+="<a href=\""+resUrl+"\" target='_blank'>\n" +
                        "                <div class=\"layui-col-md4 box layui-col-md3\">\n" +
                        "                    <div class=\"layui-col-md12 logo\">\n" +
                        "                        <img src=\""+data[i].icon+"\">\n" +
                        "                    </div>\n" +
                        "                    <div class=\"layui-col-md12 title\">"+data[i].title+"</div>\n" +
                        "                    <div class=\"layui-col-md12 jianjie\">"+data[i].content+"</div>\n" +
                        "                </div>\n" +
                        "            </a>";
                    $(".reslist").html(html);
                }
                if(data==0){
                    $(".reslist").html("<div id=\"empty\">\n" +
                        "                <el-empty description=\"该分类下暂时还没有资源\"></el-empty>\n" +
                        "            </div>\n" +
                        "            <script type=\"text/javascript\">\n" +
                        "                new Vue({\n" +
                        "                    el: '#empty',\n" +
                        "                })\n" +
                        "            </script>");
                    // $(".empty").show();
                }
            },
            error: function (data) {
                layer.msg("服务异常，请联系管理员");
            }

        });
    });
    $("#lib").click(function (){
        $.ajax({
            url: "/pns/res/常用库",  //请求地址
            dataType: "json",  //数据格式
            type: "POST",  //请求方式
            async: false,
            success: function (data) {
                var html="";
                for (i = 0; i < data.length; i++) {
                    var resUrl = "/pns/resMessage/"+data[i].id;
                    html+="<a href=\""+resUrl+"\" target='_blank'>\n" +
                        "                <div class=\"layui-col-md4 box layui-col-md3\">\n" +
                        "                    <div class=\"layui-col-md12 logo\">\n" +
                        "                        <img src=\""+data[i].icon+"\">\n" +
                        "                    </div>\n" +
                        "                    <div class=\"layui-col-md12 title\">"+data[i].title+"</div>\n" +
                        "                    <div class=\"layui-col-md12 jianjie\">"+data[i].content+"</div>\n" +
                        "                </div>\n" +
                        "            </a>";
                    $(".reslist").html(html);
                }
                if(data==0){
                    $(".reslist").html("<div id=\"empty\">\n" +
                        "                <el-empty description=\"该分类下暂时还没有资源\"></el-empty>\n" +
                        "            </div>\n" +
                        "            <script type=\"text/javascript\">\n" +
                        "                new Vue({\n" +
                        "                    el: '#empty',\n" +
                        "                })\n" +
                        "            </script>");
                    // $(".empty").show();
                }
            },
            error: function (data) {
                layer.msg("服务异常，请联系管理员");
            }

        });
    });
    $("#pack").click(function (){
        $.ajax({
            url: "/pns/res/打包工具",  //请求地址
            dataType: "json",  //数据格式
            type: "POST",  //请求方式
            async: false,
            success: function (data) {
                var html="";
                for (i = 0; i < data.length; i++) {
                    var resUrl = "/pns/resMessage/"+data[i].id;
                    html+="<a href=\""+resUrl+"\" target='_blank'>\n" +
                        "                <div class=\"layui-col-md4 box layui-col-md3\">\n" +
                        "                    <div class=\"layui-col-md12 logo\">\n" +
                        "                        <img src=\""+data[i].icon+"\">\n" +
                        "                    </div>\n" +
                        "                    <div class=\"layui-col-md12 title\">"+data[i].title+"</div>\n" +
                        "                    <div class=\"layui-col-md12 jianjie\">"+data[i].content+"</div>\n" +
                        "                </div>\n" +
                        "            </a>";
                    $(".reslist").html(html);
                }
                if(data==0){
                    $(".reslist").html("<div id=\"empty\">\n" +
                        "                <el-empty description=\"该分类下暂时还没有资源\"></el-empty>\n" +
                        "            </div>\n" +
                        "            <script type=\"text/javascript\">\n" +
                        "                new Vue({\n" +
                        "                    el: '#empty',\n" +
                        "                })\n" +
                        "            </script>");
                    // $(".empty").show();
                }
            },
            error: function (data) {
                layer.msg("服务异常，请联系管理员");
            }

        });
    });
    $("#fwq").click(function (){
        $.ajax({
            url: "/pns/res/云服务器",  //请求地址
            dataType: "json",  //数据格式
            type: "POST",  //请求方式
            async: false,
            success: function (data) {
                var html="";
                for (i = 0; i < data.length; i++) {
                    var resUrl = "/pns/resMessage/"+data[i].id;
                    html+="<a href=\""+resUrl+"\" target='_blank'>\n" +
                        "                <div class=\"layui-col-md4 box layui-col-md3\">\n" +
                        "                    <div class=\"layui-col-md12 logo\">\n" +
                        "                        <img src=\""+data[i].icon+"\">\n" +
                        "                    </div>\n" +
                        "                    <div class=\"layui-col-md12 title\">"+data[i].title+"</div>\n" +
                        "                    <div class=\"layui-col-md12 jianjie\">"+data[i].content+"</div>\n" +
                        "                </div>\n" +
                        "            </a>";
                    $(".reslist").html(html);
                }
                if(data==0){
                    $(".reslist").html("<div id=\"empty\">\n" +
                        "                <el-empty description=\"该分类下暂时还没有资源\"></el-empty>\n" +
                        "            </div>\n" +
                        "            <script type=\"text/javascript\">\n" +
                        "                new Vue({\n" +
                        "                    el: '#empty',\n" +
                        "                })\n" +
                        "            </script>");
                    // $(".empty").show();
                }
            },
            error: function (data) {
                layer.msg("服务异常，请联系管理员");
            }

        });
    });
    $("#sjk").click(function (){
        $.ajax({
            url: "/pns/res/数据库",  //请求地址
            dataType: "json",  //数据格式
            type: "POST",  //请求方式
            async: false,
            success: function (data) {
                var html="";
                for (i = 0; i < data.length; i++) {
                    var resUrl = "/pns/resMessage/"+data[i].id;
                    html+="<a href=\""+resUrl+"\" target='_blank'>\n" +
                        "                <div class=\"layui-col-md4 box layui-col-md3\">\n" +
                        "                    <div class=\"layui-col-md12 logo\">\n" +
                        "                        <img src=\""+data[i].icon+"\">\n" +
                        "                    </div>\n" +
                        "                    <div class=\"layui-col-md12 title\">"+data[i].title+"</div>\n" +
                        "                    <div class=\"layui-col-md12 jianjie\">"+data[i].content+"</div>\n" +
                        "                </div>\n" +
                        "            </a>";
                    $(".reslist").html(html);
                }
                if(data==0){
                    $(".reslist").html("<div id=\"empty\">\n" +
                        "                <el-empty description=\"该分类下暂时还没有资源\"></el-empty>\n" +
                        "            </div>\n" +
                        "            <script type=\"text/javascript\">\n" +
                        "                new Vue({\n" +
                        "                    el: '#empty',\n" +
                        "                })\n" +
                        "            </script>");
                    // $(".empty").show();
                }
            },
            error: function (data) {
                layer.msg("服务异常，请联系管理员");
            }

        });
    });
    $("#doc").click(function (){
        $.ajax({
            url: "/pns/res/开发文档",  //请求地址
            dataType: "json",  //数据格式
            type: "POST",  //请求方式
            async: false,
            success: function (data) {
                var html="";
                for (i = 0; i < data.length; i++) {
                    var resUrl = "/pns/resMessage/"+data[i].id;
                    html+="<a href=\""+resUrl+"\" target='_blank'>\n" +
                        "                <div class=\"layui-col-md4 box layui-col-md3\">\n" +
                        "                    <div class=\"layui-col-md12 logo\">\n" +
                        "                        <img src=\""+data[i].icon+"\">\n" +
                        "                    </div>\n" +
                        "                    <div class=\"layui-col-md12 title\">"+data[i].title+"</div>\n" +
                        "                    <div class=\"layui-col-md12 jianjie\">"+data[i].content+"</div>\n" +
                        "                </div>\n" +
                        "            </a>";
                    $(".reslist").html(html);
                }
                if(data==0){
                    $(".reslist").html("<div id=\"empty\">\n" +
                        "                <el-empty description=\"该分类下暂时还没有资源\"></el-empty>\n" +
                        "            </div>\n" +
                        "            <script type=\"text/javascript\">\n" +
                        "                new Vue({\n" +
                        "                    el: '#empty',\n" +
                        "                })\n" +
                        "            </script>");
                    // $(".empty").show();
                }
            },
            error: function (data) {
                layer.msg("服务异常，请联系管理员");
            }

        });
    });
    $("#data").click(function (){
        $.ajax({
            url: "/pns/res/大数据",  //请求地址
            dataType: "json",  //数据格式
            type: "POST",  //请求方式
            async: false,
            success: function (data) {
                var html="";
                for (i = 0; i < data.length; i++) {
                    var resUrl = "/pns/resMessage/"+data[i].id;
                    html+="<a href=\""+resUrl+"\" target='_blank'>\n" +
                        "                <div class=\"layui-col-md4 box layui-col-md3\">\n" +
                        "                    <div class=\"layui-col-md12 logo\">\n" +
                        "                        <img src=\""+data[i].icon+"\">\n" +
                        "                    </div>\n" +
                        "                    <div class=\"layui-col-md12 title\">"+data[i].title+"</div>\n" +
                        "                    <div class=\"layui-col-md12 jianjie\">"+data[i].content+"</div>\n" +
                        "                </div>\n" +
                        "            </a>";
                    $(".reslist").html(html);
                }
                if(data==0){
                    $(".reslist").html("<div id=\"empty\">\n" +
                        "                <el-empty description=\"该分类下暂时还没有资源\"></el-empty>\n" +
                        "            </div>\n" +
                        "            <script type=\"text/javascript\">\n" +
                        "                new Vue({\n" +
                        "                    el: '#empty',\n" +
                        "                })\n" +
                        "            </script>");
                    // $(".empty").show();
                }
            },
            error: function (data) {
                layer.msg("服务异常，请联系管理员");
            }

        });
    });
    $("#zcyl").click(function (){
        $.ajax({
            url: "/pns/res/计算机组成原理",  //请求地址
            dataType: "json",  //数据格式
            type: "POST",  //请求方式
            async: false,
            success: function (data) {
                var html="";
                for (i = 0; i < data.length; i++) {
                    var resUrl = "/pns/resMessage/"+data[i].id;
                    html+="<a href=\""+resUrl+"\" target='_blank'>\n" +
                        "                <div class=\"layui-col-md4 box layui-col-md3\">\n" +
                        "                    <div class=\"layui-col-md12 logo\">\n" +
                        "                        <img src=\""+data[i].icon+"\">\n" +
                        "                    </div>\n" +
                        "                    <div class=\"layui-col-md12 title\">"+data[i].title+"</div>\n" +
                        "                    <div class=\"layui-col-md12 jianjie\">"+data[i].content+"</div>\n" +
                        "                </div>\n" +
                        "            </a>";
                    $(".reslist").html(html);
                }
                if(data==0){
                    $(".reslist").html("<div id=\"empty\">\n" +
                        "                <el-empty description=\"该分类下暂时还没有资源\"></el-empty>\n" +
                        "            </div>\n" +
                        "            <script type=\"text/javascript\">\n" +
                        "                new Vue({\n" +
                        "                    el: '#empty',\n" +
                        "                })\n" +
                        "            </script>");
                    // $(".empty").show();
                }
            },
            error: function (data) {
                layer.msg("服务异常，请联系管理员");
            }

        });
    });






    //分页
    layui.use('laypage', function() {
        var laypage = layui.laypage;

        //执行一个laypage实例
        laypage.render({
            elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号

            count: 500 //数据总数，从服务端得到
        });
    });
});