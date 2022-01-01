package top.weiyuexin.service;

import top.weiyuexin.entity.Article;
import top.weiyuexin.entity.Comment;
import top.weiyuexin.entity.vo.MessageModel;

import java.util.List;

/*
 * 文章功能接口
 * */
public interface ArticleService {
    /*保存文章*/
    public MessageModel saveArticle(Article article);

    //通过id查询文章
    public Article getArticleById(Integer id);

    //阅读文章后，阅读量加1
    public void addReadNum(Article article);

    /*查询某一类型的所有文章*/
    public List<Article> getAllArticles(String type);

    /*查询所有文章*/
    public List<Article> getAllArticle();

    /*查询某一作者的所有文章按时间排序*/
    public List<Article> getArticlesByAuthorRankByTime(String author);

    /*查询某一作者的所有文章按阅读量排序*/
    public List<Article> getArticlesByAuthorRankByReadNum(String author);

    /*查询某一作者的所有文章*/
    public List<Article> getArticlesByAuthor(String author);

    /*删除指定id的文章*/
    public MessageModel deleteArticlesById(Article article);

    /*保存文章*/
    public MessageModel updateArticle(Article article);

    /*点赞文章*/
    MessageModel starArticleById(Article article);

    /*获取首页热门文章排行榜*/
    List<Article> getPopularArticle();

    /*模糊查询*/
    List<Article> searchArticle(String search);

    /*获取热门文章(排行榜)*/
    List<Article> getPopularArticleMore();
}
