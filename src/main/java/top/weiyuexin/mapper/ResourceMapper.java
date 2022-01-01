package top.weiyuexin.mapper;

import top.weiyuexin.entity.Article;
import top.weiyuexin.entity.Resource;

import java.util.List;

public interface ResourceMapper {

    //保存资源
    Integer insertResource(Resource resource);

    //查询某一类型的资源
    List<Resource> getResByType(String type);

    //查询某一资源
    Resource getResById(Resource resource);

    /*获取热门文章(排行榜页面)*/
    List<Resource> getPopularResMore();

    /*获取热门文章*/
    List<Resource> getPopularResource();

    /*查询某一作者的资源*/
    List<Resource> getResByAuthor(String author);

    /*删除指定id的文章*/
    Integer deleteResById(Resource resource);

}
