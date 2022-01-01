package top.weiyuexin.mapper;

import top.weiyuexin.entity.Article;
import top.weiyuexin.entity.Comment;
import top.weiyuexin.entity.User;

import java.util.List;

/*
 * 评论接口类
 * */
public interface CommentMapper {

    /*添加评论*/
    Integer insertComment(Comment comment);

    /*查询某一篇文章的所有评论*/
    List<Comment> getAllCommentByArticleId(Integer articleId);

    /*点赞评论*/
    Integer starComment(Comment comment);
}
