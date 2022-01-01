import org.apache.ibatis.session.SqlSession;
import top.weiyuexin.entity.User;
import top.weiyuexin.mapper.UserMapper;
import top.weiyuexin.utils.GetSqlSession;

public class test {
    public static void main(String[] args) {
        User user = new User();
        user.setEmail("3022422894@qq.com");
        user.setUsername("weiyuexin");
        user.setPassword("hsfjhdjsfjsjf");
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        UserMapper userMapper = session.getMapper(UserMapper.class);
        //调用方法，返回用户对象
        Integer code = userMapper.insertUser(user);
        session.commit();
        System.out.println("返回结果:"+code);
    }

}
