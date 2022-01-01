package top.weiyuexin.service.impl;

import cn.hutool.crypto.digest.DigestUtil;
import org.apache.ibatis.session.SqlSession;
import top.weiyuexin.entity.User;
import top.weiyuexin.entity.vo.MessageModel;
import top.weiyuexin.entity.vo.UserMessageModel;
import top.weiyuexin.mapper.ArticleMapper;
import top.weiyuexin.mapper.UserMapper;
import top.weiyuexin.service.UserService;
import top.weiyuexin.utils.GetSqlSession;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

/*
 * 用户service实现类
 * */
public class UserServiceImpl implements UserService {

    @Override
    public UserMessageModel register(User user) {
        UserMessageModel model = new UserMessageModel();
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        UserMapper userMapper = session.getMapper(UserMapper.class);
        //调用方法，返回用户对象
        Integer code = userMapper.insertUser(user);
        session.commit();
        if (code == 1) {
            model.setMsg("注册成功");
            model.setCode(200);
        } else {
            model.setMsg("注册失败");
            model.setCode(201);
        }
        return model;
    }

    @Override
    public UserMessageModel login(User user) {
        UserMessageModel model = new UserMessageModel();
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        UserMapper userMapper = session.getMapper(UserMapper.class);
        //调用方法，查询数据库中是否包含该用户返回用户对象
        User queryUser = userMapper.queryUserByName(user);
        if (queryUser == null) {
            model.setCode(201);
            model.setMsg("该账号还未注册，请先前往注册或使用其他账号登录");
        } else if (!queryUser.getPassword().equals(DigestUtil.md5Hex(user.getPassword()))) {
            model.setCode(201);
            model.setMsg("密码输入错误,请重试");
        } else {
            model.setCode(200);
            model.setMsg("登录成功");
            model.setUser(queryUser);
        }
        return model;
    }

    @Override
    public UserMessageModel loginByEmail(User user) {
        UserMessageModel model = new UserMessageModel();
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        UserMapper userMapper = session.getMapper(UserMapper.class);
        //调用方法，查询数据库中是否包含该用户返回用户对象
        User queryUser = userMapper.queryUserByEmail(user);
        if (queryUser == null) {
            model.setMsg("该邮箱没有注册");
            model.setCode(201);
        } else {
            model.setCode(200);
            model.setMsg("登录成功");
            model.setUser(queryUser);
        }
        return model;
    }

    @Override
    public MessageModel changePassword(User user) {
        MessageModel model = new MessageModel();
        //获取sqlsession对象
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        UserMapper userMapper = session.getMapper(UserMapper.class);
        //调用DAO层接口，更新积分
        Integer flag = userMapper.changePassword(user);
        session.commit();
        if (flag > 0) {
            model.setCode(200);
            model.setMsg("密码修改成功");
        } else {
            model.setCode(201);
            model.setMsg("密码修改失败");
        }

        return model;
    }

    public MessageModel changePasswordNotLogin(User user) {
        MessageModel model = new MessageModel();
        //获取sqlsession对象
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        UserMapper userMapper = session.getMapper(UserMapper.class);
        //调用DAO层接口，更新积分
        Integer flag = userMapper.changePasswordNotLogin(user);
        session.commit();
        if (flag > 0) {
            model.setCode(200);
            model.setMsg("密码修改成功");
        } else {
            model.setCode(201);
            model.setMsg("密码修改失败");
        }

        return model;
    }

    @Override
    public UserMessageModel changeInformation(User user) {
        UserMessageModel model = new UserMessageModel();

        //获取sqlsession对象
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        UserMapper userMapper = session.getMapper(UserMapper.class);
        //调用DAO层接口，更新积分
        Integer flag = userMapper.changeAccountMessage(user);
        session.commit();
        if (flag > 0) {
            model.setCode(200);
            model.setMsg("个人信息更新成功");
        } else {
            model.setCode(201);
            model.setMsg("个人信息更新失败");
        }
        return model;
    }

    @Override
    public void updateUserPoints(User user) {
        //获取sqlsession对象
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        UserMapper userMapper = session.getMapper(UserMapper.class);
        //调用DAO层接口，更新积分
        userMapper.addPoints(user);
        session.commit();
    }

    @Override
    public List<User> getUserPointsRank() {
        List<User> userPointsListRank = new ArrayList<>();
        //获取sqlsession对象
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        UserMapper userMapper = session.getMapper(UserMapper.class);
        //查询数据
        userPointsListRank = userMapper.getUserPointsRank();
        return userPointsListRank;
    }

    @Override
    public List<User> getUserPointsRankMore() {
        List<User> userPointsListRank= new ArrayList<>();
        //获取sqlsession对象
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        UserMapper userMapper = session.getMapper(UserMapper.class);
        //查询数据
        userPointsListRank = userMapper.getUserPointsRankMore();
        return userPointsListRank;
    }

    @Override
    public User getAuthorMessage(User user) {

        //获取sqlsession对象
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        UserMapper userMapper = session.getMapper(UserMapper.class);
        //调用查询方法，查询数据库
        user = userMapper.queryUserById(user);
        return user;
    }

    @Override
    public User getAuthorMessageByUsername(User user) {
        //获取sqlsession对象
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        UserMapper userMapper = session.getMapper(UserMapper.class);
        //调用查询方法，查询数据库
        user = userMapper.queryUserByName(user);
        return user;
    }
}
