package top.weiyuexin.factory;

import top.weiyuexin.service.ArticleService;
import top.weiyuexin.service.CommentService;
import top.weiyuexin.service.impl.ArticleServiceImpl;
import top.weiyuexin.service.impl.CommentServiceImpl;

/*
* 文章工厂类
* */
public class CommentServiceFactory {
    public static CommentService getInterfaceFactory(){
        return new CommentServiceImpl();
    }
}
