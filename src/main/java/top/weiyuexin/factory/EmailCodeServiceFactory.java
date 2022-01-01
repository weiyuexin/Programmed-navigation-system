package top.weiyuexin.factory;

import top.weiyuexin.service.EmailCodeService;
import top.weiyuexin.service.impl.EmailCodeServiceImpl;

/*
* 邮箱工厂类
* author：韦月鑫
* */
public class EmailCodeServiceFactory {
    public static EmailCodeService getInterfaceFactory(){
        return new EmailCodeServiceImpl();
    }
}
