package top.weiyuexin.service;

import top.weiyuexin.entity.Article;
import top.weiyuexin.entity.Resource;
import top.weiyuexin.entity.vo.MessageModel;

import java.util.List;

public interface ResourceService {
    //查询某一类型的所有资源
    List<Resource> getResByType(String type);

    //通过id查询资源
    Resource getResById(Resource resource);

    /*获取热门文章(排行榜)*/
    List<Resource> getPopularResMore();

    /*获取首页热门资源排行榜*/
    List<Resource> getPopularRes();

    /*查询某一作者的所有文章*/
    List<Resource> getResByAuthor(String author);

    /*删除指定id的文章*/
    MessageModel deleteResById(Resource resource);
}
