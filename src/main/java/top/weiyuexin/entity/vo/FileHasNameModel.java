package top.weiyuexin.entity.vo;

public class FileHasNameModel {
    private Integer code =200;  //是否上传成功，200-成功，201--失败
    private String msg = "文件上传成功";  //消息
    private String url = null;   //文件链接
    private String filename = null; //文件名

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

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
