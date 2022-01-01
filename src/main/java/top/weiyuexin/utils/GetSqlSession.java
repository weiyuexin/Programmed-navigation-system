package top.weiyuexin.utils;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;

public class GetSqlSession {
    /*
     *获取SqlSession对象
     */
    public static SqlSession createSqlSession() {
        SqlSessionFactory sqlSessionFactory = null;
        InputStream inputStream = null;
        SqlSession session = null;
        try {
            //获取mybatis的环境配置文件
            String resource = "mybatis-config.xml";
            //以流的形式获取resource
            inputStream = Resources.getResourceAsStream(resource);
            //创建会话工厂
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
            //通过工厂得到sqlSession
            session = sqlSessionFactory.openSession();
            return session;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

   /* public static void main(String[] args) {
        System.out.println(createSqlSession());
    }*/
}
