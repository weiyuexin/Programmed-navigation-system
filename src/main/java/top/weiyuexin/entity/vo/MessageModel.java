package top.weiyuexin.entity.vo;
/*
* 消息模型
* author：weiyuexin
* */
public class MessageModel {
    private Integer code = 200;  //是否登录成功，200--是，201 --否
    private String msg = null;   //返回的消息

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
}
