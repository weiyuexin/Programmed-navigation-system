$(document).ready(function () {



});

$(function () {
    /*
    * 图片上传
    * */
    layui.use('upload', function(){
        var $ = layui.jquery
            ,upload = layui.upload;

        //图片上传
        var uploadInst = upload.render({
            elem: '#uploadImage'
            ,url: '/pns/upload/'
            ,accept:'images'
            ,size:50000
            //预读本地文件
            ,before: function(obj){

                obj.preview(function(index, file, result){

                    $('#uploadImage_img').attr('src', result);
                });
            }
            ,done: function(res){
                //如果上传失败
                if(res.code > 0){
                    return layer.msg('上传失败');
                }
                //上传成功
                //打印后台传回的地址: 把地址放入一个隐藏的input中, 和表单一起提交到后台, 此处略..
                // console.log(res.data.src);
                var demoText = $('#demoText');
                demoText.html('<span style="color: #4cae4c;">上传成功</span>');

                //res.data.src是获取后端传过来的图片的url,之后给表单的隐藏图片输入框赋值即可。
                var fileUpload = $(".image");
                fileUpload.attr("value",res.data.src);
                console.log(fileUpload.attr("value"));
            }
            ,error: function(){
                //演示失败状态，并实现重传
                var demoText = $('#demoText');
                demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
                demoText.find('.demo-reload').on('click', function(){
                    uploadInst.upload();
                });
            }
        });

        //图片上传
        var uploadInst2 = upload.render({
            elem: '#uploadImage2'
            ,url: '/pns/upload/'
            ,accept:'images'
            ,size:50000
            //预读本地文件
            ,before: function(obj){

                obj.preview(function(index, file, result){

                    $('#uploadImage_img_2').attr('src', result);
                });
            }
            ,done: function(res){
                //如果上传失败
                if(res.code > 0){
                    return layer.msg('上传失败');
                }
                //上传成功
                //打印后台传回的地址: 把地址放入一个隐藏的input中, 和表单一起提交到后台, 此处略..
                // console.log(res.data.src);
                var demoText2 = $('#demoText2');
                demoText2.html('<span style="color: #4cae4c;">上传成功</span>');

                //res.data.src是获取后端传过来的图片的url,之后给表单的隐藏图片输入框赋值即可。
                var fileUpload = $(".image");
                fileUpload.attr("value",res.data.src);

                // console.log(fileUpload.attr("value"));
            }
            ,error: function(){
                //演示失败状态，并实现重传
                var demoText2 = $('#demoText2');
                demoText2.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
                demoText2.find('.demo-reload').on('click', function(){
                    uploadInst2.upload();
                });
            }
        });

        //文件上传
        var uploadFile = upload.render({
            elem: '#uploadFile'
            ,url: '/pns/uploadFile/'
            ,accept:'file'
            ,size:50000
            //预读本地文件
            ,before: function(obj){

                obj.preview(function(index, file, result){

                });
            }
            ,done: function(res){
                //如果上传失败
                if(res.code > 0){
                    return layer.msg('上传失败');
                }
                //上传成功
                //打印后台传回的地址: 把地址放入一个隐藏的input中, 和表单一起提交到后台, 此处略..
                console.log(res.data.src);
                var fileText = $('#fileText');
                var fileName = $("#fileName");
                fileName.html(res.data.src);
                fileText.html('<span style="color: #4cae4c;">上传成功</span>');

                //res.data.src是获取后端传过来的图片的url,之后给表单的隐藏图片输入框赋值即可。
                var fileUpload = $(".file");
                fileUpload.attr("value",res.data.src);
                console.log(fileUpload.attr("value"));
            }
            ,error: function(){
                //演示失败状态，并实现重传
                var fileText = $('#fileText');
                fileText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
                fileText.find('.demo-reload').on('click', function(){
                    uploadFile.upload();
                });
            }
        });

    });

});

