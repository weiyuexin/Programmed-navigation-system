package top.weiyuexin.mapper;

import top.weiyuexin.entity.Article;
import top.weiyuexin.entity.User;

import java.util.List;

/*
* 用户接口类
* */
public interface UserMapper {
    /*根据用户名查询*/
    public User queryUserByName(User user);
    /*根据用户名查询*/
    public User queryUserById(User user);
    /*根据邮箱查询*/
    public User queryUserByEmail(User user);
    /*用户注册*/
    public int insertUser(User user);
    /*
    * 发表文章或评论等可加积分操作进行后，增加用户的积分数量，
    * 增加的积分保存在user中的points字段中
    * */
    public void addPoints(User user);

    /*首页积分排行榜*/
    public List<User> getUserPointsRank();
    /*首页积分排行榜(排行榜)*/
    List<User> getUserPointsRankMore();

    /*用户修改密码*/
    public Integer changePassword(User user);
    /*用户忘记密码时修改密码*/
    public Integer changePasswordNotLogin(User user);
    /*用户修改个人信息*/
    public Integer changeAccountMessage(User user);
}
