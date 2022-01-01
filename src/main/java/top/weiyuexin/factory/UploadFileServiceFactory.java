package top.weiyuexin.factory;


import top.weiyuexin.service.UploadFileService;
import top.weiyuexin.service.impl.UploadFileServiceImpl;

/*
* 文件上传到oss工厂类
* author：weiyuexin
* */
public class UploadFileServiceFactory {
    public static UploadFileService getInterfaceFactory(){
        return new UploadFileServiceImpl();
    }
}
