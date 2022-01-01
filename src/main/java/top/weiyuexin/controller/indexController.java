package top.weiyuexin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import top.weiyuexin.entity.Article;
import top.weiyuexin.entity.Resource;
import top.weiyuexin.entity.User;
import top.weiyuexin.factory.ArticleServiceFactory;
import top.weiyuexin.factory.ResourceServiceFactory;
import top.weiyuexin.factory.UserServiceFactory;
import top.weiyuexin.service.ArticleService;
import top.weiyuexin.service.ResourceService;
import top.weiyuexin.service.UserService;
import top.weiyuexin.utils.OutHtml;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Controller  //标识为控制层组件
public class indexController {
    /*网站首页*/
    @RequestMapping("/")
    public String index() {
        return "index";
    }

    /*搜索结果页面*/
    @RequestMapping("/searchArticleResult")
    public String searchArticleResult() {
        return "searchArticleResult";
    }

    /*首页积分排行榜*/
    @RequestMapping("/indexUserPointsListRank")
    @ResponseBody
    public Object indexUserPointsListRank() {
        List<User> userPointsListRank = new ArrayList<>();
        UserService userService = UserServiceFactory.getInterfaceFactory();
        //获取积分前五的用户信息
        userPointsListRank = userService.getUserPointsRank();
        //返回排行榜数据
        return userPointsListRank;
    }

    /*首页热门文章推荐排行榜*/
    @RequestMapping("/indexPopularArticle")
    @ResponseBody
    public Object indexPopularArticle() {
        List<Article> popularArticle = new ArrayList<>();
        ArticleService articleService = ArticleServiceFactory.getInterfaceFactory();
        //获取排行前五的文章信息(0.4*阅读量+0.6*评论数)
        popularArticle = articleService.getPopularArticle();
        System.out.println(popularArticle.get(0).getTitle());
        //返回排行榜数据
        return popularArticle;
    }

    /*首页热门资源推荐排行榜*/
    @RequestMapping("/indexPopularRes")
    @ResponseBody
    public Object indexPopularRes() {
        List<Resource> popularRes = new ArrayList<>();
        ResourceService resourceService = ResourceServiceFactory.getInterfaceFactory();
        //获取排行前五的文章信息(0.4*阅读量+0.6*评论数)
        popularRes = resourceService.getPopularRes();

        //返回排行榜数据
        return popularRes;
    }

    /*首页积分排行榜(排行榜)*/
    @RequestMapping("/indexUserPointsListRankMore")
    @ResponseBody
    public Object indexUserPointsListRankMore() {
        List<User> userPointsListRank = new ArrayList<>();
        UserService userService = UserServiceFactory.getInterfaceFactory();
        //获取积分前五的用户信息
        userPointsListRank = userService.getUserPointsRankMore();
        //返回排行榜数据
        return userPointsListRank;
    }

    /*排行页面热门文章推荐排行榜*/
    @RequestMapping("/indexPopularArticleMore")
    @ResponseBody
    public Object indexPopularArticleMore() {
        List<Article> popularArticle = new ArrayList<>();
        ArticleService articleService = ArticleServiceFactory.getInterfaceFactory();
        //获取排行前五的文章信息(0.4*阅读量+0.6*评论数)
        popularArticle = articleService.getPopularArticleMore();
        System.out.println(popularArticle.get(0).getTitle());
        //过滤html标签
        for (int i = 0; i < popularArticle.size(); i++) {
            String content = popularArticle.get(i).getContent();
            OutHtml outHtml = new OutHtml();
            content = outHtml.delHTMLTag(content);
            if (content.length() > 180) {
                content = content.substring(0, 180);
            }
            popularArticle.get(i).setContent(content);
        }
        //返回排行榜数据
        return popularArticle;
    }
    /*排行页面热门文章推荐排行榜*/
    @RequestMapping("/indexPopularResMore")
    @ResponseBody
    public Object indexPopularResMore() {
        List<Resource> resourceList = new ArrayList<>();
        ResourceService resourceService = ResourceServiceFactory.getInterfaceFactory();
        //获取排行前五的文章信息(0.4*阅读量+0.6*评论数)
        resourceList = resourceService.getPopularResMore();

        //返回排行榜数据
        return resourceList;
    }

    /*根据搜索框参数模糊查询数据库数据并返回给前端(标题)*/
    @RequestMapping("/searchInformation")
    @ResponseBody
    public Object searchInformation(String search) {
        List<Article> searchArticle;
        ArticleService articleService = ArticleServiceFactory.getInterfaceFactory();
        //获取符合条件的文章集合
        searchArticle = articleService.searchArticle(search);

        //返回排行榜数据
        return searchArticle;
    }

    /*
     * 主页的搜索功能, 通过传入搜索框的key模糊查询返回搜索到的所有文章
     */
    /*@RequestMapping(value = "/searchArticle",method = RequestMethod.POST)
    @ResponseBody
    public Object searchArticle(@RequestParam("search") String key, HttpSession session){

        //调用工厂类
        ArticleService service = ArticleServiceFactory.getInterfaceFactory();

        return service.searchArticle(key);
    }*/


    /*
     * 进入搜索界面
     * */
    @RequestMapping("/search")
    @ResponseBody
    public ModelAndView search(HttpServletRequest request) {
        String key = request.getParameter("key");
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("searchArticleResult");
        modelAndView.addObject("key",key);

        return modelAndView;
    }

    /*
     * 主页的搜索功能, 通过传入搜索框的key模糊查询返回搜索到的所有文章
     */
    @RequestMapping(value = "/searchArticle", method = RequestMethod.POST)
    @ResponseBody
    public Object searchArticle(HttpServletRequest request, HttpSession session) {

        String key = request.getParameter("key");
        System.out.println(key);

        //调用工厂类
        ArticleService service = ArticleServiceFactory.getInterfaceFactory();

        List<Article> articles = service.searchArticle(key);
        //过滤html标签
        for (int i = 0; i < articles.size(); i++) {
            String content = articles.get(i).getContent();
            OutHtml outHtml = new OutHtml();
            content = outHtml.delHTMLTag(content);
            if (content.length() > 180) {
                content = content.substring(0, 180);
            }
            articles.get(i).setContent(content);
        }
        return articles;
    }

    /*
     * 显示排行主页面
     * */
    @RequestMapping("/ranking")
    public String ranking() {
        return "ranking";
    }

}
