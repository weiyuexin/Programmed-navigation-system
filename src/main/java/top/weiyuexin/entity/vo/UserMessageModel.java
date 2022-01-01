package top.weiyuexin.entity.vo;

import top.weiyuexin.entity.User;

/*
* 用户消息模型
* */
public class UserMessageModel {
    private Integer code=200;  //成功
    private String msg = "";  //消息
    private User user;   //用户信息

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
