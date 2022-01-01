package top.weiyuexin.service;

import top.weiyuexin.entity.User;
import top.weiyuexin.entity.vo.MessageModel;
import top.weiyuexin.entity.vo.UserMessageModel;

import javax.servlet.http.HttpSession;
import java.util.List;

/*
 * 用户功能接口
 * */
public interface UserService {

    //用户注册
    public UserMessageModel register(User user);

    //用户登录
    public UserMessageModel login(User user);

    //邮箱登录
    public UserMessageModel loginByEmail(User user);

    //修改密码
    public MessageModel changePassword(User user);

    //忘记密码时修改密码
    public MessageModel changePasswordNotLogin(User user);

    //修改用户信息
    public UserMessageModel changeInformation(User user);

    //激发积分修改操作后，修改用户积分
    public void updateUserPoints(User user);

    //获取首页积分排行
    public List<User> getUserPointsRank();

    //获取首页积分排行(排行榜页面)
    List<User> getUserPointsRankMore();

    //查询文章作者的信息
    User getAuthorMessage(User user);
    //通过用户名查询文章作者的信息
    User getAuthorMessageByUsername(User user);
}
