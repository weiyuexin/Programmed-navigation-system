$(document).ready(function() {

    /* 返回顶部功能 */
    //首先将#btn隐藏
    $(".toTop").hide();
    //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
    $(function() {
        $(window).scroll(function() {
            if ($(window).scrollTop() > 100) {
                $(".toTop").fadeIn(200);
            } else {
                $(".toTop").fadeOut(200);
            }
        });
        //当点击跳转链接后，回到页面顶部位置
        $(".toTop").click(function() {
            $('body,html').animate({
                    scrollTop: 0
                },
                500);
            return false;
        });
        $("#toTopTitle").hide();
        // 鼠标位于 div标签上方时发生 mouseover 事件
        $(".toTop").mouseover(function(e) {
            $(".toTop").css({ "line-height": "25px" });
            $("#toTopTitle").show();
            $(".toTop .layui-icon").hide();
        }).mouseout(function() { //鼠标指针从 a标签 上离开时 发生mouseout 事件
            $(".toTop").css("line-height", "50px");
            $("#toTopTitle").hide();
            $(".toTop .layui-icon").show();
        });
    });
});



//查询名字为findCookieName的cookie值
function getCookie(cookieName) {
    //获取所有的Cookie,在strCookie是一个包含所有cookie的字符串。
    var strCookie = document.cookie;
    //以;为分隔符将所有的cookie进行分割。将获得的所有cookie切割成数组
    var arrCookie = strCookie.split("; ");
    //通过for循环进行遍历arrCookie数组。
    for(var i = 0; i < arrCookie.length; i++){
        //通过=进行分割，将本次循环的cookie分割为名字（等于号前），值（等于号后面）
        var arr = arrCookie[i].split("=");
        //将本次循环的cookie名字与需要查找的cookie进行比较
        if(cookieName == arr[0]){
            //返回指定cookie的值
            return arr[1];
        }
    }
    //未查找到指定的cookie返回空。
    return "";
}
$(function () {
//注意：选项卡 依赖 element 模块，否则无法进行功能性操作
    layui.use('element', function () {
        var element = layui.element;

        /*搜索框元素改变时发送获取对应数据集请求*/
        $("#Search").bind("input propertychange", function () {
            //获取搜索框的值
            var search = $('#Search').val();
            /*发送模糊查询请求*/
            $.ajax({
                url: "/pns/searchInformation",//请求地址
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
        });
    });
});
