package top.weiyuexin.service;

import top.weiyuexin.entity.Article;
import top.weiyuexin.entity.Comment;
import top.weiyuexin.entity.vo.MessageModel;

import java.util.List;

/*
* 评论功能接口
* */
public interface CommentService {
    /*保存评论*/
    public MessageModel saveComment(Comment comment);

    /*查询某一篇文章的所有评论*/
    public List<Comment> getAllCommentByArticleId(Integer articleId);

    /*点赞评论*/
    public MessageModel starComment(Comment comment);

}
