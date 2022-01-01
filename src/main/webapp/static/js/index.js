$(document).ready(function () {
    /*
    * 判断用户是否登录
    * */
    $.ajax({
        url: "user/checkIsNotLogin",  //请求地址
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


    /*发送获取积分排行请求*/
    $.ajax({
        url: "indexUserPointsListRank",//请求地址
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
                    "                                <a target='_blank' href=\"/pns/user/author/"+data[i].username+"\"><img\n" +
                    "                                        src=\""+data[i].photo+"\"\n" +
                    "                                        alt=\"\"></a>\n" +
                    "                            </div>\n" +
                    "                            <div class=\"mark-list-desc layui-col-md9\">\n" +
                    "                                <a target='_blank' href=\"/pns/user/author/"+data[i].username+"\">\n" +
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
        url: "indexPopularArticle",//请求地址
        dataType: "json",//数据格式
        type: "POST",//请求方式
        async: false,//是否异步请求
        success: function (data) {   //如果发送成功
            var html = "";
            for (i = 0; i < data.length; i++) {
                var num=i+1;
                var articleUrl = "/pns/article/" + data[i].id;
                html+="<li class=\"layui-col-md12\">\n" +
                    "                            <span class=\"hot-list-id layui-col-md1\">"+num+".</span>\n" +
                    "                            <a href=\""+articleUrl+"\" target='_blank' class=\"hot-list-title layui-col-md10\">\n" +
                    "                                "+data[i].title+"\n" +
                    "                            </a><br>\n" +
                    "                        </li>";
            }
            $(".articleRank").html(html);
        },
        error: function (data) {
            layer.msg("服务器异常，请联系管理员!");
        }
    });
    /*发送获取热门资源请求*/
    $.ajax({
        url: "indexPopularRes",//请求地址
        dataType: "json",//数据格式
        type: "POST",//请求方式
        async: false,//是否异步请求
        success: function (data) {   //如果发送成功
            var html = "";
            for (i = 0; i < data.length; i++) {
                var num=i+1;
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

    /*
    * 记载页面时显示推荐内容
    * */
    /*发送获取文章请求*/
    $.ajax({
        url: "getAllArticle/",//请求地址
        dataType: "json",//数据格式
        type: "POST",//请求方式
        async: true,//是否异步请求
        success: function (data) {   //如何发送成功
            var html = "";
            for (var i = 0; i < data.length; i++) {
                //定义文章链接
                var articleUrl = window.location.href + "article/" + data[i].id;
                html += " <li>\n" +
                    "                                    <div class=\"article\">\n" +
                    "                                        <div class=\"articleTitle layui-col-md12\">\n" +
                    "                                            <a href=\"" + articleUrl + "\" target='_blank'>\n" +
                    "                                                <h2>" + data[i].title + "</h2>\n" +
                    "                                            </a>\n" +
                    "                                        </div>\n" +
                    "                                        <div class=\"articleContent layui-col-md12\">\n" +
                    "                                            <div class=\"articleDesc layui-col-md12\">\n" +
                    "                                                <a href=\"" + articleUrl + "\" target='_blank'>\n" +
                    "                                                    <p>" + data[i].content + "</p>\n" +
                    "                                                </a>\n" +
                    "                                            </div>\n" +
                    "                                            <div class=\"articleOperation layui-col-md12\">\n" +
                    "                                                <div class=\"author layui-col-md2\">\n" +
                    "                                                    <a href=\"/pns/user/author/"+data[i].author+"\" target='_blank'>" + data[i].author + "</a>\n" +
                    "                                                </div>\n" +
                    "                                                <div class=\"star layui-col-md2\">\n" +
                    "                                                    <a href=\"\">\n" +
                    "                                                        <img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAe9JREFUWEft1j1oFEEUB/D/m82dgqhnEUEQJKKIhVhaqmChKXPeQxvDys5sbeEX2IqITdrb2WCRIrCXFCmEiFhoqY2IhYLkghCwtRCMcvPkCkWS3WN3yWUat915+//N7HwRPD/kOR+1AfPzK/sHg82nIFwWwRpB3Tbm6vOqHaoNSGz2TATTfwKJSBTJdBTxahVELUCS9q6Jk8WcoPXY8NRYASKibNr7JIITeUGBwsko4s9lEZVHwNrejBNZLgrYuwdHZ2d5Y2yAJMleCHApP4A2D7XkADP/HAsgTZePOXF9EckfOaKXse4U4ArIZaXDdl2b3YPgUVGNItzRmp9U+WalOdBNsncAzo4I2CDC9xHvBwK8V8B9rbk/bFcaYG025QRrVXo3ou2XZmPyVBhe/LENYO3S9bxCIXdYHOZ2CACawAVzk19tA3STTPJCSNFjcXJ3pwCBCs5HUfu1N0CzgSNhyF99Ab7Fhlu5k3A3fgER3hjN5/wBgAVj+IY3AAgPYs0PvQEUoaM1L3kDBGriTBTNfPAFcM3G5L7hLugFQIS+0Xz871Vu68429mVIWI01X/EIoLlYd255A/y7AnZ9DhDRSuugtJl5UDwCaa+Te+IF8pF+qdN1TkNRIhSodRO2326tL30hqRNcpuY/wPsI/AaGBu4h5/R1CgAAAABJRU5ErkJggg==\">\n" +
                    "                                                        <p><span>" + data[i].star + "</span>赞</p>\n" +
                    "                                                    </a>\n" +
                    "                                                </div>\n" +
                    "                                                <div class=\"unstar layui-col-md1\">\n" +
                    "                                                    <a href=\"\"><img\n" +
                    "                                                            src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAhxJREFUWEftlj9oFEEUxt+bOU0gaC4EgwQE0cLSQtFC7EKEK5ObsREC680samEZQUSw8E9rEbjdIyRw1+zFpBEhERuxVhLEwjQRFUHbXA4Pbp/MygXR3WT3jtw0Tjs73/dj3jfvLYLlhZb94T/APzdQ9gKKKwsyfEIhzfZQsi2G7J5SxeqfGv0EML4hZ+x8qVR814HoN4AJ3QOt5X17AIiBVuKqTYANrcRZawAA0NRKDCFiFPa+Z8CYcsZPlkrTn6wBAMcr7nWxZg8A2W1XFZ9aA0DAOa3FLWsAgPjKVWLCGgAiftFKnLAGYIxH8nBESrlt5RlGTSjHz7nO9Ns4gJXYiYe4DkS7PbyHqRgdZQiTSsmXqX9IKpVnl9ph+02vxlHdEVoDh+HUzIz8mhqAiJjnL30DoLEeIZoIcFNruRAbwr3Ey34wBwQ3kr4xo5bz3HLSPhG0x8cHNwuFws/EYbQXgO/XL4dErxMBEGtaiWtZbih1CYwoEaHn1zcB4HS8CX7Xqni8M+nSgGQCMIKeV58loMdJ4odyMOY48kca88wZMAdqtecjjZ2dz0QwFGeCkDuj9dTHAwMwwmU/eAQEd/42QYRGfhiOSSmbBwpQrb442mhuvweCqJ/vLsSHrhJ305p3VYKOeKUSXAgJV4ko/zt0NJ8fBldK2e4LgDFZXFwebbXCi5yHW44jP2Qx7qoPdGOw35nMz3A/waz7vwCyr+8hoL9gPwAAAABJRU5ErkJggg==\">\n" +
                    "                                                        <p>踩</p>\n" +
                    "                                                    </a>\n" +
                    "                                                </div>\n" +
                    "                                                <div class=\"more layui-col-md1\">\n" +
                    "                                                    <i class=\"layui-icon layui-icon-more\"></i>\n" +
                    "                                                </div>\n" +
                    "                                            </div>\n" +
                    "                                        </div>\n" +
                    "                                    </div>\n" +
                    "                                    <hr>\n" +
                    "                                </li>";
            }
            $(".tuijian").html(html);
            // console.log(data)
        },
        error: function (data) {
            layer.msg("服务器异常，请联系管理员!");
        }
    });
   /* layui.use('flow', function(){
        var $ = layui.jquery; //不用额外加载jQuery，flow模块本身是有依赖jQuery的，直接用即可。
        var flow = layui.flow;
        flow.load({
            elem: '#demo' //指定列表容器
            ,done: function(page, next){ //到达临界点（默认滚动触发），触发下一页
                var lis = [];
                //以jQuery的Ajax请求为例，请求下一页数据（注意：page是从2开始返回）
                $.get('/api/list?page='+page, function(res){
                    //假设你的列表返回在data集合中
                    layui.each(res.data, function(index, item){
                        lis.push('<li>'+ item.title +'</li>');
                    });

                    //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
                    //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
                    next(lis.join(''), page < res.pages);
                });
            }
        });
    });*/
    /*点击搜索时展示搜索结果*/
    /*$("#searchArticle").click(function () {
        //获取搜索框的值
        var search = $('#Search').val();
        if (!search) {
            $("#Search").css('borderColor','red');
        } else {
            $("#Search").css('borderColor','');
            /!*搜索*!/
            $.ajax({
                url: "searchArticle",//请求地址
                data:{"search" : search},//搜索值
                dataType: "json",//数据格式
                type: "POST",//请求方式
                async: true,//是否异步请求
                success: function (data) {   //如何发送成功
                    console.log(data)
                    var html = "";
                    for (var i = 0; i < data.length; i++) {
                        //定义文章链接
                        var articleUrl = window.location.href + "article/" + data[i].id;
                        html += " <li>\n" +
                            "                                    <div class=\"article\">\n" +
                            "                                        <div class=\"articleTitle layui-col-md12\">\n" +
                            "                                            <a href=\"" + articleUrl + "\" target='_blank'>\n" +
                            "                                                <h2>" + data[i].title + "</h2>\n" +
                            "                                            </a>\n" +
                            "                                        </div>\n" +
                            "                                        <div class=\"articleContent layui-col-md12\">\n" +
                            "                                            <div class=\"articleDesc layui-col-md12\">\n" +
                            "                                                <a href=\"" + articleUrl + "\" target='_blank'>\n" +
                            "                                                    <p>" + data[i].content + "</p>\n" +
                            "                                                </a>\n" +
                            "                                            </div>\n" +
                            "                                            <div class=\"articleOperation layui-col-md12\">\n" +
                            "                                                <div class=\"author layui-col-md2\">\n" +
                            "                                                    <a href=\"\">" + data[i].author + "</a>\n" +
                            "                                                </div>\n" +
                            "                                                <div class=\"star layui-col-md2\">\n" +
                            "                                                    <a href=\"\">\n" +
                            "                                                        <img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAe9JREFUWEft1j1oFEEUB/D/m82dgqhnEUEQJKKIhVhaqmChKXPeQxvDys5sbeEX2IqITdrb2WCRIrCXFCmEiFhoqY2IhYLkghCwtRCMcvPkCkWS3WN3yWUat915+//N7HwRPD/kOR+1AfPzK/sHg82nIFwWwRpB3Tbm6vOqHaoNSGz2TATTfwKJSBTJdBTxahVELUCS9q6Jk8WcoPXY8NRYASKibNr7JIITeUGBwsko4s9lEZVHwNrejBNZLgrYuwdHZ2d5Y2yAJMleCHApP4A2D7XkADP/HAsgTZePOXF9EckfOaKXse4U4ArIZaXDdl2b3YPgUVGNItzRmp9U+WalOdBNsncAzo4I2CDC9xHvBwK8V8B9rbk/bFcaYG025QRrVXo3ou2XZmPyVBhe/LENYO3S9bxCIXdYHOZ2CACawAVzk19tA3STTPJCSNFjcXJ3pwCBCs5HUfu1N0CzgSNhyF99Ab7Fhlu5k3A3fgER3hjN5/wBgAVj+IY3AAgPYs0PvQEUoaM1L3kDBGriTBTNfPAFcM3G5L7hLugFQIS+0Xz871Vu68429mVIWI01X/EIoLlYd255A/y7AnZ9DhDRSuugtJl5UDwCaa+Te+IF8pF+qdN1TkNRIhSodRO2326tL30hqRNcpuY/wPsI/AaGBu4h5/R1CgAAAABJRU5ErkJggg==\">\n" +
                            "                                                        <p><span>" + data[i].star + "</span>赞</p>\n" +
                            "                                                    </a>\n" +
                            "                                                </div>\n" +
                            "                                                <div class=\"unstar layui-col-md1\">\n" +
                            "                                                    <a href=\"\"><img\n" +
                            "                                                            src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAhxJREFUWEftlj9oFEEUxt+bOU0gaC4EgwQE0cLSQtFC7EKEK5ObsREC680samEZQUSw8E9rEbjdIyRw1+zFpBEhERuxVhLEwjQRFUHbXA4Pbp/MygXR3WT3jtw0Tjs73/dj3jfvLYLlhZb94T/APzdQ9gKKKwsyfEIhzfZQsi2G7J5SxeqfGv0EML4hZ+x8qVR814HoN4AJ3QOt5X17AIiBVuKqTYANrcRZawAA0NRKDCFiFPa+Z8CYcsZPlkrTn6wBAMcr7nWxZg8A2W1XFZ9aA0DAOa3FLWsAgPjKVWLCGgAiftFKnLAGYIxH8nBESrlt5RlGTSjHz7nO9Ns4gJXYiYe4DkS7PbyHqRgdZQiTSsmXqX9IKpVnl9ph+02vxlHdEVoDh+HUzIz8mhqAiJjnL30DoLEeIZoIcFNruRAbwr3Ey34wBwQ3kr4xo5bz3HLSPhG0x8cHNwuFws/EYbQXgO/XL4dErxMBEGtaiWtZbih1CYwoEaHn1zcB4HS8CX7Xqni8M+nSgGQCMIKeV58loMdJ4odyMOY48kca88wZMAdqtecjjZ2dz0QwFGeCkDuj9dTHAwMwwmU/eAQEd/42QYRGfhiOSSmbBwpQrb442mhuvweCqJ/vLsSHrhJ305p3VYKOeKUSXAgJV4ko/zt0NJ8fBldK2e4LgDFZXFwebbXCi5yHW44jP2Qx7qoPdGOw35nMz3A/waz7vwCyr+8hoL9gPwAAAABJRU5ErkJggg==\">\n" +
                            "                                                        <p>踩</p>\n" +
                            "                                                    </a>\n" +
                            "                                                </div>\n" +
                            "                                                <div class=\"more layui-col-md1\">\n" +
                            "                                                    <i class=\"layui-icon layui-icon-more\"></i>\n" +
                            "                                                </div>\n" +
                            "                                            </div>\n" +
                            "                                        </div>\n" +
                            "                                    </div>\n" +
                            "                                    <hr>\n" +
                            "                                </li>";
                    }
                    $(".tuijian").html(html);
                    // console.log(data)
                },
                error: function (data) {
                    layer.msg("服务器异常，请联系管理员!");
                }
            });
        }
    })*/
    // $("#searchArticle").click(function (){
    //     //获取搜索框的值
    //     var search = $('#Search').val();
    //     if (!search) {
    //         $("#Search").css('borderColor','red');
    //     } else {
    //         $("#Search").css('borderColor', '');
    //         $.ajax({
    //             url: "searchArticle",//请求地址
    //             data: {"search": search},//搜索值
    //             dataType: "json",//数据格式
    //             type: "POST",//请求方式
    //             async: true,//是否异步请求
    //             success: function (data) {
    //
    //             },error:function (data){
    //                 layer.msg("服务器异常，请联系管理员!");
    //             }
    //         })
    //     }
    // })


});
$(function () {
//注意：选项卡 依赖 element 模块，否则无法进行功能性操作
    layui.use('element', function () {
        var element = layui.element;

        /*搜索框元素改变时发送获取对应数据集请求*/
       /* $("#Search").bind("input propertychange", function () {
            //获取搜索框的值
            var search = $('#Search').val();
            /!*发送模糊查询请求*!/
            $.ajax({
                url: "searchInformation",//请求地址
                dataType: "json",//数据格式
                type: "POST",//请求方式
                async: false,//是否异步请求
                data:{"search" : search},
                success: function (data) {   //发送成功
                    //让搜索框展开下拉框并显示搜索结果列表    data[i].title
                    console.log(123)
                    var html = "";
                    for (i = 0; i < data.length; i++) {
                        html += "<option>" +
                            data[i].title
                        "</option>";
                    }
                    $(".searchRank").html(html);
                },
                error: function (data) {
                    layer.msg("服务器异常，请联系管理员!");
                }
            });
        });*/

        //点击Java选项卡时的操作
        $("#Java").click(function () {
            var type = "Java";
            /*发送保存文章请求*/
            $.ajax({
                url: "getAllArticlesByType/" + type,//请求地址
                dataType: "json",//数据格式
                type: "POST",//请求方式
                async: true,//是否异步请求
                success: function (data) {   //如何发送成功
                    var html = "";
                    for (var i = 0; i < data.length; i++) {
                        //定义文章链接
                        var articleUrl = window.location.href + "article/" + data[i].id;
                        html += " <li>\n" +
                            "                                    <div class=\"article\">\n" +
                            "                                        <div class=\"articleTitle layui-col-md12\">\n" +
                            "                                            <a href=\"" + articleUrl + "\" target='_blank'>\n" +
                            "                                                <h2>" + data[i].title + "</h2>\n" +
                            "                                            </a>\n" +
                            "                                        </div>\n" +
                            "                                        <div class=\"articleContent layui-col-md12\">\n" +
                            "                                            <div class=\"articleDesc layui-col-md12\">\n" +
                            "                                                <a href=\"" + articleUrl + "\" target='_blank'>\n" +
                            "                                                    <p>" + data[i].content + "</p>\n" +
                            "                                                </a>\n" +
                            "                                            </div>\n" +
                            "                                            <div class=\"articleOperation layui-col-md12\">\n" +
                            "                                                <div class=\"author layui-col-md2\">\n" +
                            "                                                    <a href=\"/pns/user/author/"+data[i].author+"\" target='_blank'>" + data[i].author + "</a>\n" +
                            "                                                </div>\n" +
                            "                                                <div class=\"star layui-col-md2\">\n" +
                            "                                                    <a href=\"\">\n" +
                            "                                                        <img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAe9JREFUWEft1j1oFEEUB/D/m82dgqhnEUEQJKKIhVhaqmChKXPeQxvDys5sbeEX2IqITdrb2WCRIrCXFCmEiFhoqY2IhYLkghCwtRCMcvPkCkWS3WN3yWUat915+//N7HwRPD/kOR+1AfPzK/sHg82nIFwWwRpB3Tbm6vOqHaoNSGz2TATTfwKJSBTJdBTxahVELUCS9q6Jk8WcoPXY8NRYASKibNr7JIITeUGBwsko4s9lEZVHwNrejBNZLgrYuwdHZ2d5Y2yAJMleCHApP4A2D7XkADP/HAsgTZePOXF9EckfOaKXse4U4ArIZaXDdl2b3YPgUVGNItzRmp9U+WalOdBNsncAzo4I2CDC9xHvBwK8V8B9rbk/bFcaYG025QRrVXo3ou2XZmPyVBhe/LENYO3S9bxCIXdYHOZ2CACawAVzk19tA3STTPJCSNFjcXJ3pwCBCs5HUfu1N0CzgSNhyF99Ab7Fhlu5k3A3fgER3hjN5/wBgAVj+IY3AAgPYs0PvQEUoaM1L3kDBGriTBTNfPAFcM3G5L7hLugFQIS+0Xz871Vu68429mVIWI01X/EIoLlYd255A/y7AnZ9DhDRSuugtJl5UDwCaa+Te+IF8pF+qdN1TkNRIhSodRO2326tL30hqRNcpuY/wPsI/AaGBu4h5/R1CgAAAABJRU5ErkJggg==\">\n" +
                            "                                                        <p><span>" + data[i].star + "</span>赞</p>\n" +
                            "                                                    </a>\n" +
                            "                                                </div>\n" +
                            "                                                <div class=\"unstar layui-col-md1\">\n" +
                            "                                                    <a href=\"\"><img\n" +
                            "                                                            src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAhxJREFUWEftlj9oFEEUxt+bOU0gaC4EgwQE0cLSQtFC7EKEK5ObsREC680samEZQUSw8E9rEbjdIyRw1+zFpBEhERuxVhLEwjQRFUHbXA4Pbp/MygXR3WT3jtw0Tjs73/dj3jfvLYLlhZb94T/APzdQ9gKKKwsyfEIhzfZQsi2G7J5SxeqfGv0EML4hZ+x8qVR814HoN4AJ3QOt5X17AIiBVuKqTYANrcRZawAA0NRKDCFiFPa+Z8CYcsZPlkrTn6wBAMcr7nWxZg8A2W1XFZ9aA0DAOa3FLWsAgPjKVWLCGgAiftFKnLAGYIxH8nBESrlt5RlGTSjHz7nO9Ns4gJXYiYe4DkS7PbyHqRgdZQiTSsmXqX9IKpVnl9ph+02vxlHdEVoDh+HUzIz8mhqAiJjnL30DoLEeIZoIcFNruRAbwr3Ey34wBwQ3kr4xo5bz3HLSPhG0x8cHNwuFws/EYbQXgO/XL4dErxMBEGtaiWtZbih1CYwoEaHn1zcB4HS8CX7Xqni8M+nSgGQCMIKeV58loMdJ4odyMOY48kca88wZMAdqtecjjZ2dz0QwFGeCkDuj9dTHAwMwwmU/eAQEd/42QYRGfhiOSSmbBwpQrb442mhuvweCqJ/vLsSHrhJ305p3VYKOeKUSXAgJV4ko/zt0NJ8fBldK2e4LgDFZXFwebbXCi5yHW44jP2Qx7qoPdGOw35nMz3A/waz7vwCyr+8hoL9gPwAAAABJRU5ErkJggg==\">\n" +
                            "                                                        <p>踩</p>\n" +
                            "                                                    </a>\n" +
                            "                                                </div>\n" +
                            "                                                <div class=\"more layui-col-md1\">\n" +
                            "                                                    <i class=\"layui-icon layui-icon-more\"></i>\n" +
                            "                                                </div>\n" +
                            "                                            </div>\n" +
                            "                                        </div>\n" +
                            "                                    </div>\n" +
                            "                                    <hr>\n" +
                            "                                </li>";
                    }
                    $(".Java").html(html);
                    // console.log(data)
                },
                error: function (data) {
                    layer.msg("服务器异常，请联系管理员!");
                }
            });
        })
        //点击CPP选项卡时的操作
        $("#cpp").click(function () {
            var type = "Cpp";
            /*发送保存文章请求*/
            $.ajax({
                url: "getAllArticlesByType/" + type,//请求地址
                dataType: "json",//数据格式
                type: "POST",//请求方式
                async: true,//是否异步请求
                success: function (data) {   //如何发送成功
                    var html = "";
                    for (var i = 0; i < data.length; i++) {
                        //定义文章链接
                        var articleUrl = window.location.href + "article/" + data[i].id;
                        html += " <li>\n" +
                            "                                    <div class=\"article\">\n" +
                            "                                        <div class=\"articleTitle layui-col-md12\">\n" +
                            "                                            <a href=\"" + articleUrl + "\" target='_blank'>\n" +
                            "                                                <h2>" + data[i].title + "</h2>\n" +
                            "                                            </a>\n" +
                            "                                        </div>\n" +
                            "                                        <div class=\"articleContent layui-col-md12\">\n" +
                            "                                            <div class=\"articleDesc layui-col-md12\">\n" +
                            "                                                <a href=\"" + articleUrl + "\" target='_blank'>\n" +
                            "                                                    <p>" + data[i].content + "</p>\n" +
                            "                                                </a>\n" +
                            "                                            </div>\n" +
                            "                                            <div class=\"articleOperation layui-col-md12\">\n" +
                            "                                                <div class=\"author layui-col-md2\">\n" +
                            "                                                    <a href=\"/pns/user/author/"+data[i].author+"\" target='_blank'>" + data[i].author + "</a>\n" +
                            "                                                </div>\n" +
                            "                                                <div class=\"star layui-col-md2\">\n" +
                            "                                                    <a href=\"\">\n" +
                            "                                                        <img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAe9JREFUWEft1j1oFEEUB/D/m82dgqhnEUEQJKKIhVhaqmChKXPeQxvDys5sbeEX2IqITdrb2WCRIrCXFCmEiFhoqY2IhYLkghCwtRCMcvPkCkWS3WN3yWUat915+//N7HwRPD/kOR+1AfPzK/sHg82nIFwWwRpB3Tbm6vOqHaoNSGz2TATTfwKJSBTJdBTxahVELUCS9q6Jk8WcoPXY8NRYASKibNr7JIITeUGBwsko4s9lEZVHwNrejBNZLgrYuwdHZ2d5Y2yAJMleCHApP4A2D7XkADP/HAsgTZePOXF9EckfOaKXse4U4ArIZaXDdl2b3YPgUVGNItzRmp9U+WalOdBNsncAzo4I2CDC9xHvBwK8V8B9rbk/bFcaYG025QRrVXo3ou2XZmPyVBhe/LENYO3S9bxCIXdYHOZ2CACawAVzk19tA3STTPJCSNFjcXJ3pwCBCs5HUfu1N0CzgSNhyF99Ab7Fhlu5k3A3fgER3hjN5/wBgAVj+IY3AAgPYs0PvQEUoaM1L3kDBGriTBTNfPAFcM3G5L7hLugFQIS+0Xz871Vu68429mVIWI01X/EIoLlYd255A/y7AnZ9DhDRSuugtJl5UDwCaa+Te+IF8pF+qdN1TkNRIhSodRO2326tL30hqRNcpuY/wPsI/AaGBu4h5/R1CgAAAABJRU5ErkJggg==\">\n" +
                            "                                                        <p><span>" + data[i].star + "</span>赞</p>\n" +
                            "                                                    </a>\n" +
                            "                                                </div>\n" +
                            "                                                <div class=\"unstar layui-col-md1\">\n" +
                            "                                                    <a href=\"\"><img\n" +
                            "                                                            src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAhxJREFUWEftlj9oFEEUxt+bOU0gaC4EgwQE0cLSQtFC7EKEK5ObsREC680samEZQUSw8E9rEbjdIyRw1+zFpBEhERuxVhLEwjQRFUHbXA4Pbp/MygXR3WT3jtw0Tjs73/dj3jfvLYLlhZb94T/APzdQ9gKKKwsyfEIhzfZQsi2G7J5SxeqfGv0EML4hZ+x8qVR814HoN4AJ3QOt5X17AIiBVuKqTYANrcRZawAA0NRKDCFiFPa+Z8CYcsZPlkrTn6wBAMcr7nWxZg8A2W1XFZ9aA0DAOa3FLWsAgPjKVWLCGgAiftFKnLAGYIxH8nBESrlt5RlGTSjHz7nO9Ns4gJXYiYe4DkS7PbyHqRgdZQiTSsmXqX9IKpVnl9ph+02vxlHdEVoDh+HUzIz8mhqAiJjnL30DoLEeIZoIcFNruRAbwr3Ey34wBwQ3kr4xo5bz3HLSPhG0x8cHNwuFws/EYbQXgO/XL4dErxMBEGtaiWtZbih1CYwoEaHn1zcB4HS8CX7Xqni8M+nSgGQCMIKeV58loMdJ4odyMOY48kca88wZMAdqtecjjZ2dz0QwFGeCkDuj9dTHAwMwwmU/eAQEd/42QYRGfhiOSSmbBwpQrb442mhuvweCqJ/vLsSHrhJ305p3VYKOeKUSXAgJV4ko/zt0NJ8fBldK2e4LgDFZXFwebbXCi5yHW44jP2Qx7qoPdGOw35nMz3A/waz7vwCyr+8hoL9gPwAAAABJRU5ErkJggg==\">\n" +
                            "                                                        <p>踩</p>\n" +
                            "                                                    </a>\n" +
                            "                                                </div>\n" +
                            "                                                <div class=\"more layui-col-md1\">\n" +
                            "                                                    <i class=\"layui-icon layui-icon-more\"></i>\n" +
                            "                                                </div>\n" +
                            "                                            </div>\n" +
                            "                                        </div>\n" +
                            "                                    </div>\n" +
                            "                                    <hr>\n" +
                            "                                </li>";
                    }
                    $(".CPP").html(html);
                    // console.log(data)
                },
                error: function (data) {
                    layer.msg("服务器异常，请联系管理员!");
                }
            });
        })
        //点击Python选项卡时的操作
        $("#Python").click(function () {
            var type = "Python";
            /*发送保存文章请求*/
            $.ajax({
                url: "getAllArticlesByType/" + type,//请求地址
                dataType: "json",//数据格式
                type: "POST",//请求方式
                async: true,//是否异步请求
                success: function (data) {   //如何发送成功
                    var html = "";
                    for (var i = 0; i < data.length; i++) {
                        //定义文章链接
                        var articleUrl = window.location.href + "article/" + data[i].id;
                        html += " <li>\n" +
                            "                                    <div class=\"article\">\n" +
                            "                                        <div class=\"articleTitle layui-col-md12\">\n" +
                            "                                            <a href=\"" + articleUrl + "\" target='_blank'>\n" +
                            "                                                <h2>" + data[i].title + "</h2>\n" +
                            "                                            </a>\n" +
                            "                                        </div>\n" +
                            "                                        <div class=\"articleContent layui-col-md12\">\n" +
                            "                                            <div class=\"articleDesc layui-col-md12\">\n" +
                            "                                                <a href=\"" + articleUrl + "\" target='_blank'>\n" +
                            "                                                    <p>" + data[i].content + "</p>\n" +
                            "                                                </a>\n" +
                            "                                            </div>\n" +
                            "                                            <div class=\"articleOperation layui-col-md12\">\n" +
                            "                                                <div class=\"author layui-col-md2\">\n" +
                            "                                                    <a href=\"/pns/user/author/"+data[i].author+"\" target='_blank'>" + data[i].author + "</a>\n" +
                            "                                                </div>\n" +
                            "                                                <div class=\"star layui-col-md2\">\n" +
                            "                                                    <a href=\"\">\n" +
                            "                                                        <img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAe9JREFUWEft1j1oFEEUB/D/m82dgqhnEUEQJKKIhVhaqmChKXPeQxvDys5sbeEX2IqITdrb2WCRIrCXFCmEiFhoqY2IhYLkghCwtRCMcvPkCkWS3WN3yWUat915+//N7HwRPD/kOR+1AfPzK/sHg82nIFwWwRpB3Tbm6vOqHaoNSGz2TATTfwKJSBTJdBTxahVELUCS9q6Jk8WcoPXY8NRYASKibNr7JIITeUGBwsko4s9lEZVHwNrejBNZLgrYuwdHZ2d5Y2yAJMleCHApP4A2D7XkADP/HAsgTZePOXF9EckfOaKXse4U4ArIZaXDdl2b3YPgUVGNItzRmp9U+WalOdBNsncAzo4I2CDC9xHvBwK8V8B9rbk/bFcaYG025QRrVXo3ou2XZmPyVBhe/LENYO3S9bxCIXdYHOZ2CACawAVzk19tA3STTPJCSNFjcXJ3pwCBCs5HUfu1N0CzgSNhyF99Ab7Fhlu5k3A3fgER3hjN5/wBgAVj+IY3AAgPYs0PvQEUoaM1L3kDBGriTBTNfPAFcM3G5L7hLugFQIS+0Xz871Vu68429mVIWI01X/EIoLlYd255A/y7AnZ9DhDRSuugtJl5UDwCaa+Te+IF8pF+qdN1TkNRIhSodRO2326tL30hqRNcpuY/wPsI/AaGBu4h5/R1CgAAAABJRU5ErkJggg==\">\n" +
                            "                                                        <p><span>" + data[i].star + "</span>赞</p>\n" +
                            "                                                    </a>\n" +
                            "                                                </div>\n" +
                            "                                                <div class=\"unstar layui-col-md1\">\n" +
                            "                                                    <a href=\"\"><img\n" +
                            "                                                            src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAhxJREFUWEftlj9oFEEUxt+bOU0gaC4EgwQE0cLSQtFC7EKEK5ObsREC680samEZQUSw8E9rEbjdIyRw1+zFpBEhERuxVhLEwjQRFUHbXA4Pbp/MygXR3WT3jtw0Tjs73/dj3jfvLYLlhZb94T/APzdQ9gKKKwsyfEIhzfZQsi2G7J5SxeqfGv0EML4hZ+x8qVR814HoN4AJ3QOt5X17AIiBVuKqTYANrcRZawAA0NRKDCFiFPa+Z8CYcsZPlkrTn6wBAMcr7nWxZg8A2W1XFZ9aA0DAOa3FLWsAgPjKVWLCGgAiftFKnLAGYIxH8nBESrlt5RlGTSjHz7nO9Ns4gJXYiYe4DkS7PbyHqRgdZQiTSsmXqX9IKpVnl9ph+02vxlHdEVoDh+HUzIz8mhqAiJjnL30DoLEeIZoIcFNruRAbwr3Ey34wBwQ3kr4xo5bz3HLSPhG0x8cHNwuFws/EYbQXgO/XL4dErxMBEGtaiWtZbih1CYwoEaHn1zcB4HS8CX7Xqni8M+nSgGQCMIKeV58loMdJ4odyMOY48kca88wZMAdqtecjjZ2dz0QwFGeCkDuj9dTHAwMwwmU/eAQEd/42QYRGfhiOSSmbBwpQrb442mhuvweCqJ/vLsSHrhJ305p3VYKOeKUSXAgJV4ko/zt0NJ8fBldK2e4LgDFZXFwebbXCi5yHW44jP2Qx7qoPdGOw35nMz3A/waz7vwCyr+8hoL9gPwAAAABJRU5ErkJggg==\">\n" +
                            "                                                        <p>踩</p>\n" +
                            "                                                    </a>\n" +
                            "                                                </div>\n" +
                            "                                                <div class=\"more layui-col-md1\">\n" +
                            "                                                    <i class=\"layui-icon layui-icon-more\"></i>\n" +
                            "                                                </div>\n" +
                            "                                            </div>\n" +
                            "                                        </div>\n" +
                            "                                    </div>\n" +
                            "                                    <hr>\n" +
                            "                                </li>";
                    }
                    $(".Python").html(html);
                    // console.log(data)
                },
                error: function (data) {
                    layer.msg("服务器异常，请联系管理员!");
                }
            });
        })
        //点击前端选项卡时的操作
        $("#qianduan").click(function () {
            var type = "前端";
            /*发送保存文章请求*/
            $.ajax({
                url: "getAllArticlesByType/" + type,//请求地址
                dataType: "json",//数据格式
                type: "POST",//请求方式
                async: true,//是否异步请求
                success: function (data) {   //如何发送成功
                    var html = "";
                    for (var i = 0; i < data.length; i++) {
                        //定义文章链接
                        var articleUrl = window.location.href + "article/" + data[i].id;
                        html += " <li>\n" +
                            "                                    <div class=\"article\">\n" +
                            "                                        <div class=\"articleTitle layui-col-md12\">\n" +
                            "                                            <a href=\"" + articleUrl + "\" target='_blank'>\n" +
                            "                                                <h2>" + data[i].title + "</h2>\n" +
                            "                                            </a>\n" +
                            "                                        </div>\n" +
                            "                                        <div class=\"articleContent layui-col-md12\">\n" +
                            "                                            <div class=\"articleDesc layui-col-md12\">\n" +
                            "                                                <a href=\"" + articleUrl + "\" target='_blank'>\n" +
                            "                                                    <p>" + data[i].content + "</p>\n" +
                            "                                                </a>\n" +
                            "                                            </div>\n" +
                            "                                            <div class=\"articleOperation layui-col-md12\">\n" +
                            "                                                <div class=\"author layui-col-md2\">\n" +
                            "                                                    <a href=\"/pns/user/author/"+data[i].author+"\" target='_blank'>" + data[i].author + "</a>\n" +
                            "                                                </div>\n" +
                            "                                                <div class=\"star layui-col-md2\">\n" +
                            "                                                    <a href=\"\">\n" +
                            "                                                        <img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAe9JREFUWEft1j1oFEEUB/D/m82dgqhnEUEQJKKIhVhaqmChKXPeQxvDys5sbeEX2IqITdrb2WCRIrCXFCmEiFhoqY2IhYLkghCwtRCMcvPkCkWS3WN3yWUat915+//N7HwRPD/kOR+1AfPzK/sHg82nIFwWwRpB3Tbm6vOqHaoNSGz2TATTfwKJSBTJdBTxahVELUCS9q6Jk8WcoPXY8NRYASKibNr7JIITeUGBwsko4s9lEZVHwNrejBNZLgrYuwdHZ2d5Y2yAJMleCHApP4A2D7XkADP/HAsgTZePOXF9EckfOaKXse4U4ArIZaXDdl2b3YPgUVGNItzRmp9U+WalOdBNsncAzo4I2CDC9xHvBwK8V8B9rbk/bFcaYG025QRrVXo3ou2XZmPyVBhe/LENYO3S9bxCIXdYHOZ2CACawAVzk19tA3STTPJCSNFjcXJ3pwCBCs5HUfu1N0CzgSNhyF99Ab7Fhlu5k3A3fgER3hjN5/wBgAVj+IY3AAgPYs0PvQEUoaM1L3kDBGriTBTNfPAFcM3G5L7hLugFQIS+0Xz871Vu68429mVIWI01X/EIoLlYd255A/y7AnZ9DhDRSuugtJl5UDwCaa+Te+IF8pF+qdN1TkNRIhSodRO2326tL30hqRNcpuY/wPsI/AaGBu4h5/R1CgAAAABJRU5ErkJggg==\">\n" +
                            "                                                        <p><span>" + data[i].star + "</span>赞</p>\n" +
                            "                                                    </a>\n" +
                            "                                                </div>\n" +
                            "                                                <div class=\"unstar layui-col-md1\">\n" +
                            "                                                    <a href=\"\"><img\n" +
                            "                                                            src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAhxJREFUWEftlj9oFEEUxt+bOU0gaC4EgwQE0cLSQtFC7EKEK5ObsREC680samEZQUSw8E9rEbjdIyRw1+zFpBEhERuxVhLEwjQRFUHbXA4Pbp/MygXR3WT3jtw0Tjs73/dj3jfvLYLlhZb94T/APzdQ9gKKKwsyfEIhzfZQsi2G7J5SxeqfGv0EML4hZ+x8qVR814HoN4AJ3QOt5X17AIiBVuKqTYANrcRZawAA0NRKDCFiFPa+Z8CYcsZPlkrTn6wBAMcr7nWxZg8A2W1XFZ9aA0DAOa3FLWsAgPjKVWLCGgAiftFKnLAGYIxH8nBESrlt5RlGTSjHz7nO9Ns4gJXYiYe4DkS7PbyHqRgdZQiTSsmXqX9IKpVnl9ph+02vxlHdEVoDh+HUzIz8mhqAiJjnL30DoLEeIZoIcFNruRAbwr3Ey34wBwQ3kr4xo5bz3HLSPhG0x8cHNwuFws/EYbQXgO/XL4dErxMBEGtaiWtZbih1CYwoEaHn1zcB4HS8CX7Xqni8M+nSgGQCMIKeV58loMdJ4odyMOY48kca88wZMAdqtecjjZ2dz0QwFGeCkDuj9dTHAwMwwmU/eAQEd/42QYRGfhiOSSmbBwpQrb442mhuvweCqJ/vLsSHrhJ305p3VYKOeKUSXAgJV4ko/zt0NJ8fBldK2e4LgDFZXFwebbXCi5yHW44jP2Qx7qoPdGOw35nMz3A/waz7vwCyr+8hoL9gPwAAAABJRU5ErkJggg==\">\n" +
                            "                                                        <p>踩</p>\n" +
                            "                                                    </a>\n" +
                            "                                                </div>\n" +
                            "                                                <div class=\"more layui-col-md1\">\n" +
                            "                                                    <i class=\"layui-icon layui-icon-more\"></i>\n" +
                            "                                                </div>\n" +
                            "                                            </div>\n" +
                            "                                        </div>\n" +
                            "                                    </div>\n" +
                            "                                    <hr>\n" +
                            "                                </li>";
                    }
                    $(".qianduan").html(html);
                    // console.log(data)
                },
                error: function (data) {
                    layer.msg("服务器异常，请联系管理员!");
                }
            });
        })
        //点击数据库选项卡时的操作
        $("#database").click(function () {
            var type = "数据库";
            /*发送保存文章请求*/
            $.ajax({
                url: "getAllArticlesByType/" + type,//请求地址
                dataType: "json",//数据格式
                type: "POST",//请求方式
                async: true,//是否异步请求
                success: function (data) {   //如何发送成功
                    var html = "";
                    for (var i = 0; i < data.length; i++) {
                        //定义文章链接
                        var articleUrl = window.location.href + "article/" + data[i].id;
                        html += " <li>\n" +
                            "                                    <div class=\"article\">\n" +
                            "                                        <div class=\"articleTitle layui-col-md12\">\n" +
                            "                                            <a href=\"" + articleUrl + "\" target='_blank'>\n" +
                            "                                                <h2>" + data[i].title + "</h2>\n" +
                            "                                            </a>\n" +
                            "                                        </div>\n" +
                            "                                        <div class=\"articleContent layui-col-md12\">\n" +
                            "                                            <div class=\"articleDesc layui-col-md12\">\n" +
                            "                                                <a href=\"" + articleUrl + "\" target='_blank'>\n" +
                            "                                                    <p>" + data[i].content + "</p>\n" +
                            "                                                </a>\n" +
                            "                                            </div>\n" +
                            "                                            <div class=\"articleOperation layui-col-md12\">\n" +
                            "                                                <div class=\"author layui-col-md2\">\n" +
                            "                                                    <a href=\"/pns/user/author/"+data[i].author+"\" target='_blank'>" + data[i].author + "</a>\n" +
                            "                                                </div>\n" +
                            "                                                <div class=\"star layui-col-md2\">\n" +
                            "                                                    <a href=\"\">\n" +
                            "                                                        <img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAe9JREFUWEft1j1oFEEUB/D/m82dgqhnEUEQJKKIhVhaqmChKXPeQxvDys5sbeEX2IqITdrb2WCRIrCXFCmEiFhoqY2IhYLkghCwtRCMcvPkCkWS3WN3yWUat915+//N7HwRPD/kOR+1AfPzK/sHg82nIFwWwRpB3Tbm6vOqHaoNSGz2TATTfwKJSBTJdBTxahVELUCS9q6Jk8WcoPXY8NRYASKibNr7JIITeUGBwsko4s9lEZVHwNrejBNZLgrYuwdHZ2d5Y2yAJMleCHApP4A2D7XkADP/HAsgTZePOXF9EckfOaKXse4U4ArIZaXDdl2b3YPgUVGNItzRmp9U+WalOdBNsncAzo4I2CDC9xHvBwK8V8B9rbk/bFcaYG025QRrVXo3ou2XZmPyVBhe/LENYO3S9bxCIXdYHOZ2CACawAVzk19tA3STTPJCSNFjcXJ3pwCBCs5HUfu1N0CzgSNhyF99Ab7Fhlu5k3A3fgER3hjN5/wBgAVj+IY3AAgPYs0PvQEUoaM1L3kDBGriTBTNfPAFcM3G5L7hLugFQIS+0Xz871Vu68429mVIWI01X/EIoLlYd255A/y7AnZ9DhDRSuugtJl5UDwCaa+Te+IF8pF+qdN1TkNRIhSodRO2326tL30hqRNcpuY/wPsI/AaGBu4h5/R1CgAAAABJRU5ErkJggg==\">\n" +
                            "                                                        <p><span>" + data[i].star + "</span>赞</p>\n" +
                            "                                                    </a>\n" +
                            "                                                </div>\n" +
                            "                                                <div class=\"unstar layui-col-md1\">\n" +
                            "                                                    <a href=\"\"><img\n" +
                            "                                                            src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAhxJREFUWEftlj9oFEEUxt+bOU0gaC4EgwQE0cLSQtFC7EKEK5ObsREC680samEZQUSw8E9rEbjdIyRw1+zFpBEhERuxVhLEwjQRFUHbXA4Pbp/MygXR3WT3jtw0Tjs73/dj3jfvLYLlhZb94T/APzdQ9gKKKwsyfEIhzfZQsi2G7J5SxeqfGv0EML4hZ+x8qVR814HoN4AJ3QOt5X17AIiBVuKqTYANrcRZawAA0NRKDCFiFPa+Z8CYcsZPlkrTn6wBAMcr7nWxZg8A2W1XFZ9aA0DAOa3FLWsAgPjKVWLCGgAiftFKnLAGYIxH8nBESrlt5RlGTSjHz7nO9Ns4gJXYiYe4DkS7PbyHqRgdZQiTSsmXqX9IKpVnl9ph+02vxlHdEVoDh+HUzIz8mhqAiJjnL30DoLEeIZoIcFNruRAbwr3Ey34wBwQ3kr4xo5bz3HLSPhG0x8cHNwuFws/EYbQXgO/XL4dErxMBEGtaiWtZbih1CYwoEaHn1zcB4HS8CX7Xqni8M+nSgGQCMIKeV58loMdJ4odyMOY48kca88wZMAdqtecjjZ2dz0QwFGeCkDuj9dTHAwMwwmU/eAQEd/42QYRGfhiOSSmbBwpQrb442mhuvweCqJ/vLsSHrhJ305p3VYKOeKUSXAgJV4ko/zt0NJ8fBldK2e4LgDFZXFwebbXCi5yHW44jP2Qx7qoPdGOw35nMz3A/waz7vwCyr+8hoL9gPwAAAABJRU5ErkJggg==\">\n" +
                            "                                                        <p>踩</p>\n" +
                            "                                                    </a>\n" +
                            "                                                </div>\n" +
                            "                                                <div class=\"more layui-col-md1\">\n" +
                            "                                                    <i class=\"layui-icon layui-icon-more\"></i>\n" +
                            "                                                </div>\n" +
                            "                                            </div>\n" +
                            "                                        </div>\n" +
                            "                                    </div>\n" +
                            "                                    <hr>\n" +
                            "                                </li>";
                    }
                    $(".database").html(html);
                    // console.log(data)
                },
                error: function (data) {
                    layer.msg("服务器异常，请联系管理员!");
                }
            });
        })
        //点击人工智能选项卡时的操作
        $("#ai").click(function () {
            var type = "人工智能";
            /*发送保存文章请求*/
            $.ajax({
                url: "getAllArticlesByType/" + type,//请求地址
                dataType: "json",//数据格式
                type: "POST",//请求方式
                async: true,//是否异步请求
                success: function (data) {   //如何发送成功
                    var html = "";
                    for (var i = 0; i < data.length; i++) {
                        //定义文章链接
                        var articleUrl = window.location.href + "article/" + data[i].id;
                        html += " <li>\n" +
                            "                                    <div class=\"article\">\n" +
                            "                                        <div class=\"articleTitle layui-col-md12\">\n" +
                            "                                            <a href=\"" + articleUrl + "\" target='_blank'>\n" +
                            "                                                <h2>" + data[i].title + "</h2>\n" +
                            "                                            </a>\n" +
                            "                                        </div>\n" +
                            "                                        <div class=\"articleContent layui-col-md12\">\n" +
                            "                                            <div class=\"articleDesc layui-col-md12\">\n" +
                            "                                                <a href=\"" + articleUrl + "\" target='_blank'>\n" +
                            "                                                    <p>" + data[i].content + "</p>\n" +
                            "                                                </a>\n" +
                            "                                            </div>\n" +
                            "                                            <div class=\"articleOperation layui-col-md12\">\n" +
                            "                                                <div class=\"author layui-col-md2\">\n" +
                            "                                                    <a href=\"/pns/user/author/"+data[i].author+"\" target='_blank'>" + data[i].author + "</a>\n" +
                            "                                                </div>\n" +
                            "                                                <div class=\"star layui-col-md2\">\n" +
                            "                                                    <a href=\"\">\n" +
                            "                                                        <img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAe9JREFUWEft1j1oFEEUB/D/m82dgqhnEUEQJKKIhVhaqmChKXPeQxvDys5sbeEX2IqITdrb2WCRIrCXFCmEiFhoqY2IhYLkghCwtRCMcvPkCkWS3WN3yWUat915+//N7HwRPD/kOR+1AfPzK/sHg82nIFwWwRpB3Tbm6vOqHaoNSGz2TATTfwKJSBTJdBTxahVELUCS9q6Jk8WcoPXY8NRYASKibNr7JIITeUGBwsko4s9lEZVHwNrejBNZLgrYuwdHZ2d5Y2yAJMleCHApP4A2D7XkADP/HAsgTZePOXF9EckfOaKXse4U4ArIZaXDdl2b3YPgUVGNItzRmp9U+WalOdBNsncAzo4I2CDC9xHvBwK8V8B9rbk/bFcaYG025QRrVXo3ou2XZmPyVBhe/LENYO3S9bxCIXdYHOZ2CACawAVzk19tA3STTPJCSNFjcXJ3pwCBCs5HUfu1N0CzgSNhyF99Ab7Fhlu5k3A3fgER3hjN5/wBgAVj+IY3AAgPYs0PvQEUoaM1L3kDBGriTBTNfPAFcM3G5L7hLugFQIS+0Xz871Vu68429mVIWI01X/EIoLlYd255A/y7AnZ9DhDRSuugtJl5UDwCaa+Te+IF8pF+qdN1TkNRIhSodRO2326tL30hqRNcpuY/wPsI/AaGBu4h5/R1CgAAAABJRU5ErkJggg==\">\n" +
                            "                                                        <p><span>" + data[i].star + "</span>赞</p>\n" +
                            "                                                    </a>\n" +
                            "                                                </div>\n" +
                            "                                                <div class=\"unstar layui-col-md1\">\n" +
                            "                                                    <a href=\"\"><img\n" +
                            "                                                            src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAhxJREFUWEftlj9oFEEUxt+bOU0gaC4EgwQE0cLSQtFC7EKEK5ObsREC680samEZQUSw8E9rEbjdIyRw1+zFpBEhERuxVhLEwjQRFUHbXA4Pbp/MygXR3WT3jtw0Tjs73/dj3jfvLYLlhZb94T/APzdQ9gKKKwsyfEIhzfZQsi2G7J5SxeqfGv0EML4hZ+x8qVR814HoN4AJ3QOt5X17AIiBVuKqTYANrcRZawAA0NRKDCFiFPa+Z8CYcsZPlkrTn6wBAMcr7nWxZg8A2W1XFZ9aA0DAOa3FLWsAgPjKVWLCGgAiftFKnLAGYIxH8nBESrlt5RlGTSjHz7nO9Ns4gJXYiYe4DkS7PbyHqRgdZQiTSsmXqX9IKpVnl9ph+02vxlHdEVoDh+HUzIz8mhqAiJjnL30DoLEeIZoIcFNruRAbwr3Ey34wBwQ3kr4xo5bz3HLSPhG0x8cHNwuFws/EYbQXgO/XL4dErxMBEGtaiWtZbih1CYwoEaHn1zcB4HS8CX7Xqni8M+nSgGQCMIKeV58loMdJ4odyMOY48kca88wZMAdqtecjjZ2dz0QwFGeCkDuj9dTHAwMwwmU/eAQEd/42QYRGfhiOSSmbBwpQrb442mhuvweCqJ/vLsSHrhJ305p3VYKOeKUSXAgJV4ko/zt0NJ8fBldK2e4LgDFZXFwebbXCi5yHW44jP2Qx7qoPdGOw35nMz3A/waz7vwCyr+8hoL9gPwAAAABJRU5ErkJggg==\">\n" +
                            "                                                        <p>踩</p>\n" +
                            "                                                    </a>\n" +
                            "                                                </div>\n" +
                            "                                                <div class=\"more layui-col-md1\">\n" +
                            "                                                    <i class=\"layui-icon layui-icon-more\"></i>\n" +
                            "                                                </div>\n" +
                            "                                            </div>\n" +
                            "                                        </div>\n" +
                            "                                    </div>\n" +
                            "                                    <hr>\n" +
                            "                                </li>";
                    }
                    $(".ai").html(html);
                    // console.log(data)
                },
                error: function (data) {
                    layer.msg("服务器异常，请联系管理员!");
                }
            });
        })
        //点击系统/运维选项卡时的操作
        $("#os").click(function () {
            var type = "系统运维";
            /*发送保存文章请求*/
            $.ajax({
                url: "getAllArticlesByType/" + type,//请求地址
                dataType: "json",//数据格式
                type: "POST",//请求方式
                async: true,//是否异步请求
                success: function (data) {   //如何发送成功
                    var html = "";
                    for (var i = 0; i < data.length; i++) {
                        //定义文章链接
                        var articleUrl = window.location.href + "article/" + data[i].id;
                        html += " <li>\n" +
                            "                                    <div class=\"article\">\n" +
                            "                                        <div class=\"articleTitle layui-col-md12\">\n" +
                            "                                            <a href=\"" + articleUrl + "\" target='_blank'>\n" +
                            "                                                <h2>" + data[i].title + "</h2>\n" +
                            "                                            </a>\n" +
                            "                                        </div>\n" +
                            "                                        <div class=\"articleContent layui-col-md12\">\n" +
                            "                                            <div class=\"articleDesc layui-col-md12\">\n" +
                            "                                                <a href=\"" + articleUrl + "\" target='_blank'>\n" +
                            "                                                    <p>" + data[i].content + "</p>\n" +
                            "                                                </a>\n" +
                            "                                            </div>\n" +
                            "                                            <div class=\"articleOperation layui-col-md12\">\n" +
                            "                                                <div class=\"author layui-col-md2\">\n" +
                            "                                                    <a href=\"/pns/user/author/"+data[i].author+"\" target='_blank'>" + data[i].author + "</a>\n" +
                            "                                                </div>\n" +
                            "                                                <div class=\"star layui-col-md2\">\n" +
                            "                                                    <a href=\"\">\n" +
                            "                                                        <img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAe9JREFUWEft1j1oFEEUB/D/m82dgqhnEUEQJKKIhVhaqmChKXPeQxvDys5sbeEX2IqITdrb2WCRIrCXFCmEiFhoqY2IhYLkghCwtRCMcvPkCkWS3WN3yWUat915+//N7HwRPD/kOR+1AfPzK/sHg82nIFwWwRpB3Tbm6vOqHaoNSGz2TATTfwKJSBTJdBTxahVELUCS9q6Jk8WcoPXY8NRYASKibNr7JIITeUGBwsko4s9lEZVHwNrejBNZLgrYuwdHZ2d5Y2yAJMleCHApP4A2D7XkADP/HAsgTZePOXF9EckfOaKXse4U4ArIZaXDdl2b3YPgUVGNItzRmp9U+WalOdBNsncAzo4I2CDC9xHvBwK8V8B9rbk/bFcaYG025QRrVXo3ou2XZmPyVBhe/LENYO3S9bxCIXdYHOZ2CACawAVzk19tA3STTPJCSNFjcXJ3pwCBCs5HUfu1N0CzgSNhyF99Ab7Fhlu5k3A3fgER3hjN5/wBgAVj+IY3AAgPYs0PvQEUoaM1L3kDBGriTBTNfPAFcM3G5L7hLugFQIS+0Xz871Vu68429mVIWI01X/EIoLlYd255A/y7AnZ9DhDRSuugtJl5UDwCaa+Te+IF8pF+qdN1TkNRIhSodRO2326tL30hqRNcpuY/wPsI/AaGBu4h5/R1CgAAAABJRU5ErkJggg==\">\n" +
                            "                                                        <p><span>" + data[i].star + "</span>赞</p>\n" +
                            "                                                    </a>\n" +
                            "                                                </div>\n" +
                            "                                                <div class=\"unstar layui-col-md1\">\n" +
                            "                                                    <a href=\"\"><img\n" +
                            "                                                            src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAhxJREFUWEftlj9oFEEUxt+bOU0gaC4EgwQE0cLSQtFC7EKEK5ObsREC680samEZQUSw8E9rEbjdIyRw1+zFpBEhERuxVhLEwjQRFUHbXA4Pbp/MygXR3WT3jtw0Tjs73/dj3jfvLYLlhZb94T/APzdQ9gKKKwsyfEIhzfZQsi2G7J5SxeqfGv0EML4hZ+x8qVR814HoN4AJ3QOt5X17AIiBVuKqTYANrcRZawAA0NRKDCFiFPa+Z8CYcsZPlkrTn6wBAMcr7nWxZg8A2W1XFZ9aA0DAOa3FLWsAgPjKVWLCGgAiftFKnLAGYIxH8nBESrlt5RlGTSjHz7nO9Ns4gJXYiYe4DkS7PbyHqRgdZQiTSsmXqX9IKpVnl9ph+02vxlHdEVoDh+HUzIz8mhqAiJjnL30DoLEeIZoIcFNruRAbwr3Ey34wBwQ3kr4xo5bz3HLSPhG0x8cHNwuFws/EYbQXgO/XL4dErxMBEGtaiWtZbih1CYwoEaHn1zcB4HS8CX7Xqni8M+nSgGQCMIKeV58loMdJ4odyMOY48kca88wZMAdqtecjjZ2dz0QwFGeCkDuj9dTHAwMwwmU/eAQEd/42QYRGfhiOSSmbBwpQrb442mhuvweCqJ/vLsSHrhJ305p3VYKOeKUSXAgJV4ko/zt0NJ8fBldK2e4LgDFZXFwebbXCi5yHW44jP2Qx7qoPdGOw35nMz3A/waz7vwCyr+8hoL9gPwAAAABJRU5ErkJggg==\">\n" +
                            "                                                        <p>踩</p>\n" +
                            "                                                    </a>\n" +
                            "                                                </div>\n" +
                            "                                                <div class=\"more layui-col-md1\">\n" +
                            "                                                    <i class=\"layui-icon layui-icon-more\"></i>\n" +
                            "                                                </div>\n" +
                            "                                            </div>\n" +
                            "                                        </div>\n" +
                            "                                    </div>\n" +
                            "                                    <hr>\n" +
                            "                                </li>";
                    }
                    $(".os").html(html);
                    // console.log(data)
                },
                error: function (data) {
                    layer.msg("服务器异常，请联系管理员!");
                }
            });
        })
        //点击HarmonyOS选项卡时的操作
        $("#HarmonyOS").click(function () {
            var type = "HarmonyOS";
            /*发送保存文章请求*/
            $.ajax({
                url: "getAllArticlesByType/" + type,//请求地址
                dataType: "json",//数据格式
                type: "POST",//请求方式
                async: true,//是否异步请求
                success: function (data) {   //如何发送成功
                    var html = "";
                    for (var i = 0; i < data.length; i++) {
                        //定义文章链接
                        var articleUrl = window.location.href + "article/" + data[i].id;
                        html += " <li>\n" +
                            "                                    <div class=\"article\">\n" +
                            "                                        <div class=\"articleTitle layui-col-md12\">\n" +
                            "                                            <a href=\"" + articleUrl + "\" target='_blank'>\n" +
                            "                                                <h2>" + data[i].title + "</h2>\n" +
                            "                                            </a>\n" +
                            "                                        </div>\n" +
                            "                                        <div class=\"articleContent layui-col-md12\">\n" +
                            "                                            <div class=\"articleDesc layui-col-md12\">\n" +
                            "                                                <a href=\"" + articleUrl + "\" target='_blank'>\n" +
                            "                                                    <p>" + data[i].content + "</p>\n" +
                            "                                                </a>\n" +
                            "                                            </div>\n" +
                            "                                            <div class=\"articleOperation layui-col-md12\">\n" +
                            "                                                <div class=\"author layui-col-md2\">\n" +
                            "                                                    <a href=\"/pns/user/author/"+data[i].author+"\" target='_blank'>" + data[i].author + "</a>\n" +
                            "                                                </div>\n" +
                            "                                                <div class=\"star layui-col-md2\">\n" +
                            "                                                    <a href=\"\">\n" +
                            "                                                        <img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAe9JREFUWEft1j1oFEEUB/D/m82dgqhnEUEQJKKIhVhaqmChKXPeQxvDys5sbeEX2IqITdrb2WCRIrCXFCmEiFhoqY2IhYLkghCwtRCMcvPkCkWS3WN3yWUat915+//N7HwRPD/kOR+1AfPzK/sHg82nIFwWwRpB3Tbm6vOqHaoNSGz2TATTfwKJSBTJdBTxahVELUCS9q6Jk8WcoPXY8NRYASKibNr7JIITeUGBwsko4s9lEZVHwNrejBNZLgrYuwdHZ2d5Y2yAJMleCHApP4A2D7XkADP/HAsgTZePOXF9EckfOaKXse4U4ArIZaXDdl2b3YPgUVGNItzRmp9U+WalOdBNsncAzo4I2CDC9xHvBwK8V8B9rbk/bFcaYG025QRrVXo3ou2XZmPyVBhe/LENYO3S9bxCIXdYHOZ2CACawAVzk19tA3STTPJCSNFjcXJ3pwCBCs5HUfu1N0CzgSNhyF99Ab7Fhlu5k3A3fgER3hjN5/wBgAVj+IY3AAgPYs0PvQEUoaM1L3kDBGriTBTNfPAFcM3G5L7hLugFQIS+0Xz871Vu68429mVIWI01X/EIoLlYd255A/y7AnZ9DhDRSuugtJl5UDwCaa+Te+IF8pF+qdN1TkNRIhSodRO2326tL30hqRNcpuY/wPsI/AaGBu4h5/R1CgAAAABJRU5ErkJggg==\">\n" +
                            "                                                        <p><span>" + data[i].star + "</span>赞</p>\n" +
                            "                                                    </a>\n" +
                            "                                                </div>\n" +
                            "                                                <div class=\"unstar layui-col-md1\">\n" +
                            "                                                    <a href=\"\"><img\n" +
                            "                                                            src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAhxJREFUWEftlj9oFEEUxt+bOU0gaC4EgwQE0cLSQtFC7EKEK5ObsREC680samEZQUSw8E9rEbjdIyRw1+zFpBEhERuxVhLEwjQRFUHbXA4Pbp/MygXR3WT3jtw0Tjs73/dj3jfvLYLlhZb94T/APzdQ9gKKKwsyfEIhzfZQsi2G7J5SxeqfGv0EML4hZ+x8qVR814HoN4AJ3QOt5X17AIiBVuKqTYANrcRZawAA0NRKDCFiFPa+Z8CYcsZPlkrTn6wBAMcr7nWxZg8A2W1XFZ9aA0DAOa3FLWsAgPjKVWLCGgAiftFKnLAGYIxH8nBESrlt5RlGTSjHz7nO9Ns4gJXYiYe4DkS7PbyHqRgdZQiTSsmXqX9IKpVnl9ph+02vxlHdEVoDh+HUzIz8mhqAiJjnL30DoLEeIZoIcFNruRAbwr3Ey34wBwQ3kr4xo5bz3HLSPhG0x8cHNwuFws/EYbQXgO/XL4dErxMBEGtaiWtZbih1CYwoEaHn1zcB4HS8CX7Xqni8M+nSgGQCMIKeV58loMdJ4odyMOY48kca88wZMAdqtecjjZ2dz0QwFGeCkDuj9dTHAwMwwmU/eAQEd/42QYRGfhiOSSmbBwpQrb442mhuvweCqJ/vLsSHrhJ305p3VYKOeKUSXAgJV4ko/zt0NJ8fBldK2e4LgDFZXFwebbXCi5yHW44jP2Qx7qoPdGOw35nMz3A/waz7vwCyr+8hoL9gPwAAAABJRU5ErkJggg==\">\n" +
                            "                                                        <p>踩</p>\n" +
                            "                                                    </a>\n" +
                            "                                                </div>\n" +
                            "                                                <div class=\"more layui-col-md1\">\n" +
                            "                                                    <i class=\"layui-icon layui-icon-more\"></i>\n" +
                            "                                                </div>\n" +
                            "                                            </div>\n" +
                            "                                        </div>\n" +
                            "                                    </div>\n" +
                            "                                    <hr>\n" +
                            "                                </li>";
                    }
                    $(".HarmonyOS").html(html);
                    // console.log(data)
                },
                error: function (data) {
                    layer.msg("服务器异常，请联系管理员!");
                }
            });
        })
    });
});
