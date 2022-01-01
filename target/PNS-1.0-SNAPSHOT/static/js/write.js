$(document).ready(function (){
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
})


$(function () {
    <!-- 实例化编辑器 -->
    var ue = UE.getEditor('container', {
        initialFrameWidth: 1300,
        initialFrameHeight: 550,
        maximumWords: 100000
    });
    ue.ready(function () {
        //保存文章
        $(".btn-publish").on('click', function () {
            //获取文章正文
            var content = ue.getContent();
            //获取文章标题
            var title = $(".title").val();
            console.log("标题"+title);
            //获取文章类型
            var type = $("#type").val();
            console.log(type)
            if(title==""){
                layer.msg("请输入文章标题");
            }else if(content==""){
                layer.msg("请输入文章正文")
            }else if(type==""){
                layer.msg("请选择文章类型")
            }else {
                layer.confirm('确认发布吗?', {icon: 3, title:'提示'}, function(index){
                    //do something
                    /*发送保存文章请求*/
                    $.ajax({
                        url: "write.do",//请求地址
                        dataType: "json",//数据格式
                        type: "POST",//请求方式
                        async: false,//是否异步请求
                        data: {
                            "title": title,
                            "type": type,
                            "content": content
                        },
                        success: function (data) {   //如何发送成功
                            if (data.code == 200) {//发布成功
                                layer.msg(data.msg);
                                /* window.setTimeout(function () {
                                     location.href = "login";
                                 }, 3000);*/
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
        });
    });

})