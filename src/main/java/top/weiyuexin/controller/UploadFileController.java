package top.weiyuexin.controller;

import cn.hutool.core.date.DateUtil;
import org.springframework.beans.Mergeable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import top.weiyuexin.entity.Resource;
import top.weiyuexin.entity.User;
import top.weiyuexin.entity.vo.FileHasNameModel;
import top.weiyuexin.entity.vo.FileModel;
import top.weiyuexin.entity.vo.MessageModel;
import top.weiyuexin.factory.UploadFileServiceFactory;
import top.weiyuexin.factory.UserServiceFactory;
import top.weiyuexin.service.UploadFileService;
import top.weiyuexin.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.security.PrivateKey;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Controller
public class UploadFileController {

    @RequestMapping("uploadResource")
    public String uploadResource() {
        return "uploadResource";
    }

    //图片上传到服务器
    @ResponseBody
    @RequestMapping("upload")
    public Object upload(MultipartFile file,HttpSession session){

        String prefix="";
        String dateStr="";
        //保存上传
        OutputStream out = null;
        InputStream fileInput=null;
        FileModel model = new FileModel();
        try{
            if(file!=null){
                String originalName = file.getOriginalFilename();
                prefix=originalName.substring(originalName.lastIndexOf(".")+1);
                Date date = new Date();
                String uuid = UUID.randomUUID()+"";
                SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
                dateStr = simpleDateFormat.format(date);
                String filepath = session.getServletContext().getRealPath("/static/upload/") + dateStr+"/"+uuid+"." + prefix;


                File files=new File(filepath);
                //打印查看上传路径
                System.out.println(filepath);
                if(!files.getParentFile().exists()){
                    files.getParentFile().mkdirs();
                }
                file.transferTo(files);
                System.out.println("files:"+files);

                //向前端传一个json串，json串里包括图片的url地址
                model.setMsg("文件上传成功");
                model.setCode(200);
                model.setUrl("/pns/static/upload/"+ dateStr+"/"+uuid+"." + prefix);
                return model;
            }

        }catch (Exception e){
        }finally{
            try {
                if(out!=null){
                    out.close();
                }
                if(fileInput!=null){
                    fileInput.close();
                }
            } catch (IOException e) {
            }
        }
        model.setCode(200);
        model.setMsg("文件上传失败，请稍后重试");
        return model;

    }

    @ResponseBody
    @RequestMapping("uploadFile")
    public Object uploadFile(MultipartFile file,HttpSession session){

        String prefix="";
        String dateStr="";
        //保存上传
        OutputStream out = null;
        InputStream fileInput=null;
        FileHasNameModel model = new FileHasNameModel();
        try{
            if(file!=null){
                String originalName = file.getOriginalFilename();
                prefix=originalName.substring(originalName.lastIndexOf(".")+1);
                Date date = new Date();
                String uuid = UUID.randomUUID()+"";
                SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
                dateStr = simpleDateFormat.format(date);
                String filepath = session.getServletContext().getRealPath("/static/upload/") + dateStr+"/"+uuid+"." + prefix;


                File files=new File(filepath);
                //打印查看上传路径
                System.out.println(filepath);
                if(!files.getParentFile().exists()){
                    files.getParentFile().mkdirs();
                }
                file.transferTo(files);
                System.out.println("files:"+files);

                //向前端传一个json串，json串里包括图片的url地址
                model.setMsg("文件上传成功");
                model.setCode(200);
                model.setFilename(originalName);
                model.setUrl("/pns/static/upload/"+ dateStr+"/"+uuid+"." + prefix);
                return model;
            }

        }catch (Exception e){
        }finally{
            try {
                if(out!=null){
                    out.close();
                }
                if(fileInput!=null){
                    fileInput.close();
                }
            } catch (IOException e) {
            }
        }
        model.setCode(200);
        model.setMsg("文件上传失败，请稍后重试");
        return model;
    }

    @ResponseBody
    @RequestMapping("/addResources")
    public Object addRes(HttpServletRequest request,HttpSession session){
        MessageModel model = new MessageModel();
        Resource resource = new Resource();
        //获取session中保存答用户信息
        User user =(User)session.getAttribute("user");
        if(user==null){
            model.setCode(201);
            model.setMsg("您还没有登录，请前往登录");
        }else {
            resource.setTitle(request.getParameter("title"));
            resource.setIcon(request.getParameter("resLogo"));
            resource.setContent(request.getParameter("resIntro"));
            resource.setType(request.getParameter("tag"));
            resource.setLink(request.getParameter("link"));
            resource.setTime(DateUtil.now());
            resource.setAuthor(user.getUsername());

            //调用用户工厂
            UploadFileService service = UploadFileServiceFactory.getInterfaceFactory();
            model = service.uploadResource(resource);
        }
        return model;
    }


/*

    //文件上传到服务器
    @ResponseBody
    @RequestMapping("uploadFile")
    public Map uploadFile(MultipartFile file,HttpSession session){

        String prefix="";
        String dateStr="";
        //保存上传
        OutputStream out = null;
        InputStream fileInput=null;
        try{
            if(file!=null){
                String originalName = file.getOriginalFilename();
                prefix=originalName.substring(originalName.lastIndexOf(".")+1);
                Date date = new Date();
                String uuid = UUID.randomUUID()+"";
                SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
                dateStr = simpleDateFormat.format(date);
                String filepath = session.getServletContext().getRealPath("/static/upload")+ "\\" + dateStr+"\\"+uuid+"." + prefix;


                File files=new File(filepath);
                //打印查看上传路径
                System.out.println(filepath);
                if(!files.getParentFile().exists()){
                    files.getParentFile().mkdirs();
                }
                file.transferTo(files);

                //向前端传一个json串，json串里包括图片的url地址
                Map<String,Object> map2=new HashMap<>();
                Map<String,Object> map=new HashMap<>();
                map.put("code",0);
                map.put("msg","");
                map.put("data",map2);
                map2.put("src",originalName);
                return map;
            }

        }catch (Exception e){
        }finally{
            try {
                if(out!=null){
                    out.close();
                }
                if(fileInput!=null){
                    fileInput.close();
                }
            } catch (IOException e) {
            }
        }
        Map<String,Object> map=new HashMap<>();
        map.put("code",1);
        map.put("msg","");
        return map;

    }


    //资源上传(文件上传)
    @RequestMapping(value = "uploadAll",method = RequestMethod.POST)
    public String uploadAll(HttpServletRequest request){

        Resource resource = new Resource();
        resource.setAuthor("wyx");
        resource.setType(request.getParameter("type"));
        resource.setTitle(request.getParameter("title"));
        resource.setContent(request.getParameter("describe"));
        resource.setFile(request.getParameter("file"));
        resource.setIcon(request.getParameter("image"));



//        System.out.println(title+" "+type+" "+image+" "+file+" "+describe);
        //通过resource构造器方法创建一个resource对象,将resource对象作为参数,调用Service对象的方法，将该对象的属性存放到数据库resource表中
//        Resource resource = new Resource(title,type,image,file,describe);

        UploadFileService interfaceFactory = UploadFileServiceFactory.getInterfaceFactory();

        interfaceFactory.uploadResource(resource);

        return "index";
    }

    //资源上传(文件上传)
    @RequestMapping(value = "uploadAll2",method = RequestMethod.POST)
    public String uploadAll(String title,String link,String type,String image,String describe,String file){
        System.out.println(title+" "+link+ " " +type+" "+image+" "+file+" "+describe);
        //通过resource构造器方法创建一个resource对象,将resource对象作为参数,调用Service对象的方法，将该对象的属性存放到数据库resource表中
        //Resource resource = new Resource(title,link,type,image,describe,file);

        Resource resource = new Resource();
        UploadFileService interfaceFactory = UploadFileServiceFactory.getInterfaceFactory();

        interfaceFactory.uploadResource(resource);

        return "index";
    }
*/

}
