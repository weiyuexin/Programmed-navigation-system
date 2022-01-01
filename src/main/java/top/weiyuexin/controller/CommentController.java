package top.weiyuexin.controller;

import cn.hutool.core.date.DateUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import top.weiyuexin.entity.Article;
import top.weiyuexin.entity.Comment;
import top.weiyuexin.entity.User;
import top.weiyuexin.entity.vo.MessageModel;
import top.weiyuexin.factory.ArticleServiceFactory;
import top.weiyuexin.factory.CommentServiceFactory;
import top.weiyuexin.factory.UserServiceFactory;
import top.weiyuexin.service.ArticleService;
import top.weiyuexin.service.CommentService;
import top.weiyuexin.service.UserService;
import top.weiyuexin.utils.OutHtml;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Controller
public class CommentController {
    /*
    * 保存评论控制器
    * */
    @RequestMapping("/saveComment")
    @ResponseBody
    public Object saveComment(HttpServletRequest request, HttpSession session) {
        MessageModel model=new MessageModel();

        Comment comment = new Comment();
        //获取session中保存答用户信息
        User user =(User)session.getAttribute("user");
        if(user==null){
            model.setCode(201);
            model.setMsg("您还没有登录，请前往登录");
        }else {
            comment.setContent(request.getParameter("comment"));
            comment.setArticleId(Integer.parseInt((request.getParameter("articleId"))));
            comment.setAuthorId(user.getId());
            comment.setTime(DateUtil.now());
            //调用工厂类
            CommentService commentService = CommentServiceFactory.getInterfaceFactory();
            UserService userService = UserServiceFactory.getInterfaceFactory();
            //保存评论
            model = commentService.saveComment(comment);
            //评论完成，用户积分加2
            user.setPoints(user.getPoints()+2);
            userService.updateUserPoints(user);
        }
        return model;
    }

    /*
     * 查询评论控制器
     * */
    @RequestMapping("/getAllCommentByArticleId/{articleId}")
    @ResponseBody
    public Object getAllArticlesByType(@PathVariable("articleId") Integer articleId){
        List<Comment> commentList= new ArrayList<Comment>();
        //调用工厂类
        CommentService service = CommentServiceFactory.getInterfaceFactory();
        commentList = service.getAllCommentByArticleId(articleId);
        //返回数据
        return commentList;
    }

    /*
    * 点赞评论的控制器
    * */
    @RequestMapping("/starCommentById/{id}")
    @ResponseBody
    public Object starCommentById(@PathVariable("id") Integer id,HttpSession session){
        MessageModel model = new MessageModel();
        Comment comment = new Comment();
        comment.setId(id);
        //获取session中保存答用户信息
        User user =(User)session.getAttribute("user");
        if(user==null){
            model.setCode(201);
            model.setMsg("您还没有登录，请前往登录");
        }else {
            //调用工厂类
            CommentService commentService = CommentServiceFactory.getInterfaceFactory();
            UserService userService = UserServiceFactory.getInterfaceFactory();
            //保存评论点赞
            model = commentService.starComment(comment);
            //点赞完成，用户积分加1
            user.setPoints(user.getPoints()+1);
            userService.updateUserPoints(user);
        }
        return model;
    }
}
