package top.weiyuexin.service.impl;

import cn.hutool.core.util.RandomUtil;
import cn.hutool.extra.mail.MailUtil;
import top.weiyuexin.entity.vo.EmailModel;
import top.weiyuexin.service.EmailCodeService;

import javax.servlet.http.HttpSession;

/*
* 发送邮件验证码实现类
* author：weiyuexin
* */
public class EmailCodeServiceImpl implements EmailCodeService {
    @Override
    public EmailModel sendEmailCode(String email) {
        //随机产生验证码
        Integer emailCode = RandomUtil.randomInt(10000,99999);
        //信息标题
        String title = "验证你的邮箱";
        //信息内容
        String emailCodeContent = "您的验证码是 "+ emailCode + ", 请在五分钟内完成验证。";
        //调用HuTool中的发送验证码的方法，发送验证码
        MailUtil.send(email,title,emailCodeContent,false);
        //发送成功
        EmailModel emailModel = new EmailModel();
        //将验证码保存到消息模型中
        System.out.println(emailCode);
        emailModel.setEmailCode(emailCode);
        //返回消息模型
        return emailModel;
    }
}
