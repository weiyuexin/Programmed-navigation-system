package top.weiyuexin.entity.vo;

import java.net.URL;

public class FileModel {
    private Integer code =200;  //是否上传成功，200-成功，201--失败
    private String msg = "文件上传成功";  //消息
    private String url = null;   //文件链接

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
