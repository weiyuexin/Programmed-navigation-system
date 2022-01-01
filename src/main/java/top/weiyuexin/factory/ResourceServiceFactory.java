package top.weiyuexin.factory;

import top.weiyuexin.service.ArticleService;
import top.weiyuexin.service.ResourceService;
import top.weiyuexin.service.impl.ArticleServiceImpl;
import top.weiyuexin.service.impl.ResourceServiceImpl;

public class ResourceServiceFactory {
    public static ResourceService getInterfaceFactory(){
        return new ResourceServiceImpl();
    }
}
