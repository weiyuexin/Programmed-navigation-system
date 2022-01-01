package top.weiyuexin.factory;

import top.weiyuexin.service.ArticleService;
import top.weiyuexin.service.impl.ArticleServiceImpl;

/*
* 文章工厂类
* */
public class ArticleServiceFactory {
    public static ArticleService getInterfaceFactory(){
        return new ArticleServiceImpl();
    }
}
