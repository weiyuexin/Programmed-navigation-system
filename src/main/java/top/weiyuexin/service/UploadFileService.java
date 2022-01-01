package top.weiyuexin.service;

import top.weiyuexin.entity.Resource;
import top.weiyuexin.entity.vo.FileModel;
import top.weiyuexin.entity.vo.MessageModel;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/*
* 上传文件到阿里云oss接口
* */
public interface UploadFileService {

    //文件上传接口
    MessageModel uploadResource(Resource resource);
}
