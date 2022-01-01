package top.weiyuexin.service.impl;

import org.apache.ibatis.session.SqlSession;
import top.weiyuexin.entity.Article;
import top.weiyuexin.entity.Comment;
import top.weiyuexin.entity.vo.MessageModel;
import top.weiyuexin.mapper.ArticleMapper;
import top.weiyuexin.mapper.CommentMapper;
import top.weiyuexin.service.CommentService;
import top.weiyuexin.utils.GetSqlSession;

import java.util.ArrayList;
import java.util.List;

public class CommentServiceImpl implements CommentService {
    @Override
    public MessageModel saveComment(Comment comment) {
        MessageModel model = new MessageModel();

        //获取sqlsession对象
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        CommentMapper commentMapper = session.getMapper(CommentMapper.class);
        ArticleMapper articleMapper = session.getMapper(ArticleMapper.class);
        //调用方法，返回执行结果
        Integer code = commentMapper.insertComment(comment);
        session.commit();
        if (code > 0) {
            model.setMsg("评论成功!");
            model.setCode(200);
            //文章的评论数加1
            Article article = new Article();
            article.setId(comment.getArticleId());

            Integer flag = articleMapper.addCommentNum(article);
            session.commit();//好家伙，又忘记这个了，卡了好久

        } else {
            model.setMsg("评论失败!");
            model.setCode(201);
        }
        return model;
    }

    @Override
    public List<Comment> getAllCommentByArticleId(Integer articleId) {
        List<Comment> commentList = new ArrayList<Comment>();
        //获取sqlsession对象
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        CommentMapper commentMapper = session.getMapper(CommentMapper.class);
        //调用查询方法，查询数据库
        commentList = commentMapper.getAllCommentByArticleId(articleId);

        return commentList;

    }

    @Override
    public MessageModel starComment(Comment comment) {
        MessageModel model = new MessageModel();

        //获取sqlsession对象
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        CommentMapper commentMapper = session.getMapper(CommentMapper.class);
        //调用方法，返回执行结果
        Integer code = commentMapper.starComment(comment);
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
}
