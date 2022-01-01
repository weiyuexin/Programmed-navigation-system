$(function () {
    //点击发送验证码
    $(".tel-code").click(function () {
        var email = $("#email").val();
        if(email==""){
            layer.msg("请输入邮箱账号!");
        }else {
            /*发送验证码请求*/
            $.ajax({
                url: "sendEmailCode",//请求地址
                dataType: "json",//数据格式
                type: "post",//请求方式
                async: true,//是否异步请求
                data: {"email": email},
                success: function (data) {   //如何发送成功
                    console.log(data);
                    layer.msg(data.msg);
                },
                error: function (data) {
                    layer.msg("服务器异常，请联系管理员!");
                }
            })
            //获取短信验证码
            var validCode = true;
            $(".tel-code").click(function () {
                var time = 50;
                var code = $(this);
                if (validCode) {
                    validCode = false;
                    code.addClass("msgs1");
                    var t = setInterval(function () {
                        time--;
                        code.html(time + "秒");
                        if (time == 0) {
                            clearInterval(t);
                            code.html("重新获取");
                            validCode = true;
                            code.removeClass("msgs1");
                        }
                    }, 1000)
                }
            })
        }
    });

    //注册
    $("#submit").click(function () {
        var email = $("#email").val();
        var username = $("#username").val();
        var password = $("#password").val();
        var check_password = $("#check-password").val();
        var emailcode = $("#emailcode").val();

        if (email == "") {
            layer.msg("请输入邮箱账号");
        } else if (username == "") {
            layer.msg("请输入昵称");
        } else if (password == "" || check_password == "") {
            layer.msg("密码不能为空");
        } else if (emailcode == "") {
            layer.msg("验证码不能为空");
        } else {
            /*发送验证注册请求*/
            $.ajax({
                url: "register",//请求地址
                dataType: "json",//数据格式
                type: "POST",//请求方式
                async: false,//是否异步请求
                data: {
                    "username": username,
                    "password": password,
                    "check_password": check_password,
                    "email": email,
                    "emailcode": emailcode
                },
                success: function (data) {   //如何发送成功
                    layer.msg(data.msg);
                    // console.log(data);
                    //$(location).attr("href", "login");
                    layer.msg("正在跳转到登录页面。。。");
                    window.setTimeout(function () {
                        location.href = "login";
                    }, 3000);
                },
                error: function (data) {
                    layer.msg("服务器异常，请联系管理员!");
                }
            })
        }
    });
})


/*验证码时间*/
/*
$(function () {
    //获取短信验证码
    var validCode = true;
    $(".tel-code").click(function () {
        var time = 50;
        var code = $(this);
        if (validCode) {
            validCode = false;
            code.addClass("msgs1");
            var t = setInterval(function () {
                time--;
                code.html(time + "秒");
                if (time == 0) {
                    clearInterval(t);
                    code.html("重新获取");
                    validCode = true;
                    code.removeClass("msgs1");
                }
            }, 1000)
        }
    })
});
*/


