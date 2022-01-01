package top.weiyuexin.entity;

import org.springframework.web.multipart.MultipartFile;

import java.text.SimpleDateFormat;
import java.util.Date;

/*
 * 资源实体类
 * */
public class Resource {

    private int id;   //资源编号
    private String author;   //资源上传人
    private String type;   //资源类型
    private String title;  //资源标题
    private String content;  //资源简介
    private String link;   //资源链接
    private Integer star;  //资源点赞数
    private String time;  //发布时间
    //辅助图片上传属性
    private String icon;
    //文件属性
    private String file;

//    public Resource(  String title, String type, String icon, String file, String content ) {
//        this.id = 0;
//        this.author = "lwp";
//        this.link = "https://lep101.top";
//        this.star = 0;
//        this.type = type;
//        this.title = title;
//        this.content = content;
//        this.icon = icon;
//        this.file = file;
//
//        SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        Date date = new Date(System.currentTimeMillis());
//        System.out.println(formatter.format(date));
//        this.time = formatter.format(date);
//    }

//    public Resource(String title, String link, String type, String icon, String content,String file) {
//        this.id = 0;
//        this.author = "lwp";
//        this.title = title;
//        this.link = link;
//        this.type = type;
//        this.icon = icon;
//        this.content = content;
//        this.star = 0;
//        SimpleDateFormat formatter= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        Date date = new Date(System.currentTimeMillis());
//        System.out.println(formatter.format(date));
//        this.time = formatter.format(date);
//        this.file = file;
//    }

    public String  getFile() {
        return file;
    }

    public void setFile(String  file) {
        this.file = file;
    }

    public String getTime() {
        return time;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public int getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Integer getStar() {
        return star;
    }

    public void setStar(Integer star) {
        this.star = star;
    }
}
