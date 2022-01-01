package top.weiyuexin.service.impl;

import org.apache.ibatis.session.SqlSession;
import top.weiyuexin.entity.Article;
import top.weiyuexin.entity.vo.MessageModel;
import top.weiyuexin.mapper.ArticleMapper;
import top.weiyuexin.mapper.CommentMapper;
import top.weiyuexin.mapper.UserMapper;
import top.weiyuexin.service.ArticleService;
import top.weiyuexin.utils.GetSqlSession;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class ArticleServiceImpl implements ArticleService {

    @Override
    public MessageModel saveArticle(Article article) {
        MessageModel model = new MessageModel();
        //获取sqlsession对象
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        ArticleMapper articleMapper = session.getMapper(ArticleMapper.class);
        //调用方法，返回用户对象
        Integer code = articleMapper.saveArticle(article);
        session.commit();
        if(code==1){
            model.setMsg("文章发布成功!");
            model.setCode(200);
        }else {
            model.setMsg("文章发布失败!");
            model.setCode(201);
        }
        return model;
    }

    @Override
    public Article getArticleById(Integer id) {
        Article article = new Article();
        //获取sqlsession对象
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        ArticleMapper articleMapper = session.getMapper(ArticleMapper.class);
        //调用查询方法，查询数据库
        article = articleMapper.getArticleById(id);
        System.out.println(article);
        return article;
    }

    @Override
    public void addReadNum(Article article) {
        article.setReadNum(article.getReadNum()+1);//阅读量+1
        //获取sqlsession对象
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        ArticleMapper articleMapper = session.getMapper(ArticleMapper.class);
        Integer code = articleMapper.addReadNum(article);
        session.commit();
    }

    @Override
    public List<Article> getAllArticles(String type) {
        List<Article> articleList = new ArrayList<Article>();
        //获取sqlsession对象
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        ArticleMapper articleMapper = session.getMapper(ArticleMapper.class);
        //调用查询方法，查询数据库
        articleList = articleMapper.getAllArticles(type);
        return articleList;
    }

    @Override
    public List<Article> getAllArticle() {
        List<Article> articleList = new ArrayList<Article>();
        //获取sqlsession对象
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        ArticleMapper articleMapper = session.getMapper(ArticleMapper.class);
        //调用查询方法，查询数据库
        articleList = articleMapper.getAllArticle();
        return articleList;
    }

    @Override
    public List<Article> getArticlesByAuthorRankByTime(String author) {
        List<Article> articleList = new ArrayList<Article>();
        //获取sqlsession对象
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        ArticleMapper articleMapper = session.getMapper(ArticleMapper.class);
        //调用查询方法，查询数据库
        articleList = articleMapper.getArticleByAuthorOrderByTime(author);
        return articleList;
    }

    @Override
    public List<Article> getArticlesByAuthorRankByReadNum(String author) {
        List<Article> articleList = new ArrayList<Article>();
        //获取sqlsession对象
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        ArticleMapper articleMapper = session.getMapper(ArticleMapper.class);
        //调用查询方法，查询数据库
        articleList = articleMapper.getArticleByAuthorOrderByReadNum(author);
        return articleList;
    }

    @Override
    public List<Article> getArticlesByAuthor(String author) {
        List<Article> articleList = new ArrayList<Article>();
        //获取sqlsession对象
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        ArticleMapper articleMapper = session.getMapper(ArticleMapper.class);
        //调用查询方法，查询数据库
        articleList = articleMapper.getArticleByAuthor(author);
        return articleList;
    }

    @Override
    public MessageModel deleteArticlesById(Article article) {
        MessageModel model = new MessageModel();
        //获取sqlsession对象
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        ArticleMapper articleMapper = session.getMapper(ArticleMapper.class);
        //删除数据库中指定id的文章
        Integer flag = articleMapper.deleteArticleById(article);
        session.commit();//修改、删除时一定要执行commit
        if(flag>0){
            model.setCode(200);
            model.setMsg("文章删除成功");
        }else {
            model.setCode(201);
            model.setMsg("文章删除失败，请稍后再试");
        }
        return model;
    }

    @Override
    public MessageModel updateArticle(Article article) {
        MessageModel model = new MessageModel();
        //获取sqlsession对象
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        ArticleMapper articleMapper = session.getMapper(ArticleMapper.class);
        //调用方法，返回用户对象
        Integer code = articleMapper.updateArticle(article);
        session.commit();
        if(code==1){
            model.setMsg("文章修改成功!");
            model.setCode(200);
        }else {
            model.setMsg("文章修改失败，请重试!");
            model.setCode(201);
        }
        return model;
    }

    @Override
    public MessageModel starArticleById(Article article) {
        MessageModel model = new MessageModel();

        //获取sqlsession对象
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        ArticleMapper articleMapper = session.getMapper(ArticleMapper.class);
        //调用方法，返回执行结果
        Integer code = articleMapper.starArticleById(article);
        session.commit();
        if (code > 0) {
            model.setMsg("点赞成功!");
            model.setCode(200);
        } else {
            model.setMsg("点赞失败,请稍后重试!");
            model.setCode(201);
        }
        return model;
    }

    @Override
    public List<Article> getPopularArticle() {
        List<Article> articleList = new ArrayList<Article>();
        //获取sqlsession对象
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        ArticleMapper articleMapper = session.getMapper(ArticleMapper.class);
        //调用查询方法，查询数据库
        articleList = articleMapper.getPopularArticle();
        return articleList;
    }

    /*获取热门文章（排行榜）*/
    @Override
    public List<Article> getPopularArticleMore() {
        List<Article> articleList = new ArrayList<Article>();
        //获取sqlsession对象
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        ArticleMapper articleMapper = session.getMapper(ArticleMapper.class);
        //调用查询方法，查询数据库
        articleList = articleMapper.getPopularArticleMore();
        return articleList;
    }

    /*模糊查询*/
    @Override
    public List<Article> searchArticle(String search) {
        List<Article> articleList = new ArrayList<Article>();
        //获取sqlsession对象
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        ArticleMapper articleMapper = session.getMapper(ArticleMapper.class);
        //调用查询方法，查询数据库
        articleList = articleMapper.searchArticle(search);
        return articleList;
    }
}