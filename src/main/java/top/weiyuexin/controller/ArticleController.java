package top.weiyuexin.controller;

import cn.hutool.core.date.DateUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
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
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.sql.Array;
import java.util.ArrayList;
import java.util.List;

@Controller
public class ArticleController {
    /*显示写文章页面控制器*/
    @RequestMapping("write")
    public String writePage()
    {
        return "write";
    }
    /*
    * 保存文章
    * */
    @PostMapping("write.do")
    @ResponseBody
    public Object write(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        MessageModel model = new MessageModel();
        Article article = new Article();
        //获取session中保存答用户信息
        User user =(User)session.getAttribute("user");
        if(user==null){
            model.setCode(201);
            model.setMsg("您还没有登录，请前往登录");
        }else {
            article.setAuthor(user.getUsername());
            article.setType(request.getParameter("type"));
            article.setTitle(request.getParameter("title"));
            article.setContent(request.getParameter("content"));
            article.setTime(DateUtil.now());
            //调用工厂类
            ArticleService articleService = ArticleServiceFactory.getInterfaceFactory();
            UserService userService = UserServiceFactory.getInterfaceFactory();
            //保存文章
            model = articleService.saveArticle(article);
            //用户积分加5
            user.setPoints(user.getPoints()+5);
            userService.updateUserPoints(user);
        }
        return model;
    }

    /*markdown编辑文章*/
    @RequestMapping("/writemd")
    public String writePageMd(){
        return "write_md";
    }


    /*
    * 查看单篇文章内容
    * */
    @RequestMapping("/article/{id}")
    public ModelAndView getArticleById(@PathVariable("id") Integer id){
        /**
         * ModelAndView有Model和View的功能
         * Model主要用于向请求域共享数据
         * View主要用于设置视图，实现页面跳转
         */
        ModelAndView modelAndView = new ModelAndView();
        Article article = new Article();

        //调用工厂类
        ArticleService service = ArticleServiceFactory.getInterfaceFactory();
        article = service.getArticleById(id);
        service.addReadNum(article);
        //向请求域共享数据
        modelAndView.addObject("article",article);
        //设置视图，实现页面跳转
        modelAndView.setViewName("article");

        return modelAndView;
    }

    /*
    * 查询某一类型的所有文章
    * */
    @RequestMapping("/getAllArticlesByType/{type}")
    @ResponseBody
    public Object getAllArticlesByType(@PathVariable("type") String type){
        List<Article> articleList= new ArrayList<Article>();

        //调用工厂类
        ArticleService service = ArticleServiceFactory.getInterfaceFactory();
        articleList = service.getAllArticles(type);
        //过滤html标签
        for(int i=0;i<articleList.size();i++){
            String content = articleList.get(i).getContent();
            OutHtml outHtml = new OutHtml();
            content = outHtml.delHTMLTag(content);
            if(content.length()>160){
                content=content.substring(0,160);
            }
            articleList.get(i).setContent(content);
        }
        //返回数据
        return articleList;
    }

    /*
     * 查询所有文章
     * */
    @RequestMapping("/getAllArticle")
    @ResponseBody
    public Object getAllArticle(){
        List<Article> articleList= new ArrayList<Article>();

        //调用工厂类
        ArticleService service = ArticleServiceFactory.getInterfaceFactory();
        articleList = service.getAllArticle();
        //过滤html标签
        for(int i=0;i<articleList.size();i++){
            String content = articleList.get(i).getContent();
            OutHtml outHtml = new OutHtml();
            content = outHtml.delHTMLTag(content);
            if(content.length()>160){
                content=content.substring(0,160);
            }
            articleList.get(i).setContent(content);
        }
        //返回数据
        return articleList;
    }

    /*
    * 查询某一作者的文章
    * */
    @RequestMapping("getArticlesByAuthor/{author}")
    @ResponseBody
    public Object getArticlesByAuthor(@PathVariable("author") String author){
        List<Article> articleList= new ArrayList<Article>();

        //调用工厂类
        ArticleService service = ArticleServiceFactory.getInterfaceFactory();
        articleList = service.getArticlesByAuthor(author);
        //过滤html标签
        for(int i=0;i<articleList.size();i++){
            String content = articleList.get(i).getContent();
            OutHtml outHtml = new OutHtml();
            content = outHtml.delHTMLTag(content);
            if(content.length()>50){
                content=content.substring(0,50);
            }
            articleList.get(i).setContent(content);
        }
        //返回数据
        return articleList;
    }
    /*
     * 查询某一作者的文章,按照时间排序
     * */
    @RequestMapping("getArticlesByAuthorRankByTime/{author}")
    @ResponseBody
    public Object getArticlesByAuthorRankByTime(@PathVariable("author") String author){
        List<Article> articleList= new ArrayList<Article>();

        //调用工厂类
        ArticleService service = ArticleServiceFactory.getInterfaceFactory();
        articleList = service.getArticlesByAuthorRankByTime(author);
        //过滤html标签
        for(int i=0;i<articleList.size();i++){
            String content = articleList.get(i).getContent();
            OutHtml outHtml = new OutHtml();
            content = outHtml.delHTMLTag(content);
            if(content.length()>50){
                content=content.substring(0,50);
            }
            articleList.get(i).setContent(content);
        }
        //返回数据
        return articleList;
    }
    /*
     * 查询某一作者的文章,按照时间排序
     * */
    @RequestMapping("getArticlesByAuthorRankByReadNum/{author}")
    @ResponseBody
    public Object getArticlesByAuthorRankByReadNum(@PathVariable("author") String author){
        List<Article> articleList= new ArrayList<Article>();

        //调用工厂类
        ArticleService service = ArticleServiceFactory.getInterfaceFactory();
        articleList = service.getArticlesByAuthorRankByReadNum(author);
        //过滤html标签
        for(int i=0;i<articleList.size();i++){
            String content = articleList.get(i).getContent();
            OutHtml outHtml = new OutHtml();
            content = outHtml.delHTMLTag(content);
            if(content.length()>50){
                content=content.substring(0,50);
            }
            articleList.get(i).setContent(content);
        }
        //返回数据
        return articleList;
    }
    /*
    * 删除指定id的文章
    * */
    @RequestMapping("deleteArticlesById/{id}")
    @ResponseBody
    public Object deleteArticlesById(@PathVariable("id") Integer id){
        MessageModel model = new MessageModel();

        Article article = new Article();
        article.setId(id);
        //调用工厂类
        ArticleService service = ArticleServiceFactory.getInterfaceFactory();
        model = service.deleteArticlesById(article);

        //返回结果
        return model;
    }
    /*
    * 进入编辑文章界面并查询文章信息
    * */
    @RequestMapping("/edit/{id}")
    public ModelAndView editPage(@PathVariable("id") Integer id){
        /**
         * ModelAndView有Model和View的功能
         * Model主要用于向请求域共享数据
         * View主要用于设置视图，实现页面跳转
         */
        ModelAndView modelAndView = new ModelAndView();
        Article article = new Article();

        //调用工厂类
        ArticleService service = ArticleServiceFactory.getInterfaceFactory();
        article = service.getArticleById(id);
        //service.addReadNum(article);
        //向请求域共享数据
        modelAndView.addObject("article",article);
        //设置视图，实现页面跳转
        modelAndView.setViewName("editArticle");

        return modelAndView;
    }

    /*
     * 保存文章
     * */
    @PostMapping("/edit/edit.do")
    @ResponseBody
    public Object editArticle(HttpServletRequest request, HttpServletResponse response, HttpSession session){
        MessageModel model = new MessageModel();
        Article article = new Article();
        //获取session中保存答用户信息
        User user =(User)session.getAttribute("user");
        if(user==null){
            model.setCode(201);
            model.setMsg("您还没有登录，请前往登录");
        }else {
            article.setId(Integer.parseInt(request.getParameter("id")));
            article.setAuthor(user.getUsername());
            article.setType(request.getParameter("type"));
            article.setTitle(request.getParameter("title"));
            article.setContent(request.getParameter("content"));
            article.setTime(DateUtil.now());
            //调用工厂类
            ArticleService articleService = ArticleServiceFactory.getInterfaceFactory();
            UserService userService = UserServiceFactory.getInterfaceFactory();
            //保存文章
            model = articleService.updateArticle(article);
        }
        return model;
    }
    /*
     * 点赞文章的控制器
     * */
    @RequestMapping("/starArticleById/{id}")
    @ResponseBody
    public Object starCommentById(@PathVariable("id") Integer id,HttpSession session){
        MessageModel model = new MessageModel();
       Article article = new Article();
        article.setId(id);
        //获取session中保存答用户信息
        User user =(User)session.getAttribute("user");
        if(user==null){
            model.setCode(201);
            model.setMsg("您还没有登录，请前往登录");
        }else {
            //调用工厂类
            ArticleService commentService = ArticleServiceFactory.getInterfaceFactory();
            UserService userService = UserServiceFactory.getInterfaceFactory();
            //保存评论点赞
            model = commentService.starArticleById(article);
            //点赞完成，用户积分加1
            user.setPoints(user.getPoints()+1);
            userService.updateUserPoints(user);
        }
        return model;
    }

}
