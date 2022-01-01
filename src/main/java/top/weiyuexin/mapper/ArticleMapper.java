package top.weiyuexin.mapper;

import top.weiyuexin.entity.Article;
import top.weiyuexin.entity.Comment;

import java.security.SecureRandom;
import java.util.List;

/*
 * 文章接口类
 * */
public interface ArticleMapper {

    /*保存文章*/
    public Integer saveArticle(Article article);

    /*通过id查询文章*/
    public Article getArticleById(Integer id);

    /*文章阅读后，阅读量增加1*/
    public Integer addReadNum(Article article);

    /*查询某一分类的所有文章*/
    public List<Article> getAllArticles(String type);

    /*查询所有文章*/
    public List<Article> getAllArticle();

    /*查询某一作者的文章*/
    public List<Article> getArticleByAuthor(String author);

    /*删除指定id的文章*/
    public Integer deleteArticleById(Article article);

    /*修改文章*/
    public Integer updateArticle(Article article);

    /*查询某一作者的文章按照时间排序*/
    public List<Article> getArticleByAuthorOrderByTime(String author);

    /*查询某一作者的文章按照阅读量排序*/
    public List<Article> getArticleByAuthorOrderByReadNum(String author);

    /*点赞文章*/
    Integer starArticleById(Article article);

    /*评论文章后文章的评论数加1*/
    Integer addCommentNum(Article article);

    /*获取热门文章*/
    List<Article> getPopularArticle();

    /*模糊查询*/
    List<Article> searchArticle(String search);

    /*获取热门文章(排行榜页面)*/
    List<Article> getPopularArticleMore();
}
