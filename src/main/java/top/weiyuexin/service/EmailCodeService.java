package top.weiyuexin.service;

import top.weiyuexin.entity.vo.EmailModel;

/*
* 发送邮件验证码服务层接口
* author：weiyuexin
* */
public interface EmailCodeService {
    /*发送邮箱验证码，返回消息模型*/
    public EmailModel sendEmailCode(String email);
}
