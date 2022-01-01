package top.weiyuexin.entity.vo;

/*
* 发送邮箱验证码消息模型
* author：weiyuexin
* */
public class EmailModel {
    private Integer code = 200;  //是否发送成功标识，200--成功；201--失败
    private String msg = "验证码发送成功,请前往邮箱查收";  //消息
    private Integer emailCode;  //发送的邮箱验证码

    public Integer getEmailCode() {
        return emailCode;
    }

    public void setEmailCode(Integer emailCode) {
        this.emailCode = emailCode;
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
}
