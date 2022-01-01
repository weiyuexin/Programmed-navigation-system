package top.weiyuexin.factory;

import top.weiyuexin.service.UploadFileService;
import top.weiyuexin.service.UserService;
import top.weiyuexin.service.impl.UploadFileServiceImpl;
import top.weiyuexin.service.impl.UserServiceImpl;

public class UserServiceFactory {
    public static UserService getInterfaceFactory(){
        return new UserServiceImpl();
    }
}
