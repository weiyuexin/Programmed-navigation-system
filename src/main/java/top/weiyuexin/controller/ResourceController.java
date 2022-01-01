package top.weiyuexin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import top.weiyuexin.entity.Article;
import top.weiyuexin.entity.Resource;
import top.weiyuexin.entity.vo.MessageModel;
import top.weiyuexin.factory.ArticleServiceFactory;
import top.weiyuexin.factory.ResourceServiceFactory;
import top.weiyuexin.service.ArticleService;
import top.weiyuexin.service.ResourceService;
import top.weiyuexin.utils.OutHtml;

import java.util.ArrayList;
import java.util.List;

@Controller
public class ResourceController {
    /*
     * 显示资源主页面
     * */
    @RequestMapping("/resources")
    public String getResourcesMenu() {
        return "resources";
    }

    /*
     * 显示资源详情页面
     * */
    @RequestMapping("/resMessage/{resId}")
    public ModelAndView getResourcePage(@PathVariable("resId") Integer resId) {
        ModelAndView modelAndView = new ModelAndView();
        Resource resource = new Resource();
        resource.setId(resId);
        ResourceService service = ResourceServiceFactory.getInterfaceFactory();
        resource= service.getResById(resource);
        modelAndView.setViewName("res");
        modelAndView.addObject("res",resource);

        return modelAndView;
    }
    /*
     * 显示上传资源主页面
     * */
    @RequestMapping("addRes")
    public String addRes() {
        return "addRes";
    }

    /*
    * 查询某一类型的资源
    * */
    @RequestMapping("/res/{type}")
    @ResponseBody
    public Object getResByType(@PathVariable("type") String type){

        List<Resource> resourceList = new ArrayList<Resource>();
        //调用工厂类
        ResourceService service = ResourceServiceFactory.getInterfaceFactory();

        resourceList = service.getResByType(type);

        return resourceList;
    }
    /*
     * 查询某一作者的资源
     * */
    @RequestMapping("getResByAuthor/{author}")
    @ResponseBody
    public Object getArticlesByAuthor(@PathVariable("author") String author){
        List<Resource> resourceList= new ArrayList<Resource>();

        //调用工厂类
        ResourceService service = ResourceServiceFactory.getInterfaceFactory();
        resourceList = service.getResByAuthor(author);
        //返回数据
        return resourceList;
    }
    /*
     * 删除指定id的资源
     * */
    @RequestMapping("deleteResById/{id}")
    @ResponseBody
    public Object deleteResById(@PathVariable("id") Integer id){
        MessageModel model = new MessageModel();

        Resource resource = new Resource();
        resource.setId(id);
        //调用工厂类
        ResourceService service = ResourceServiceFactory.getInterfaceFactory();
        model = service.deleteResById(resource);

        //返回结果
        return model;
    }

}
