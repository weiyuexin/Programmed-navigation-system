package top.weiyuexin.service.impl;

import org.apache.ibatis.session.SqlSession;
import top.weiyuexin.entity.Article;
import top.weiyuexin.entity.Resource;
import top.weiyuexin.entity.vo.MessageModel;
import top.weiyuexin.mapper.ArticleMapper;
import top.weiyuexin.mapper.ResourceMapper;
import top.weiyuexin.service.ResourceService;
import top.weiyuexin.utils.GetSqlSession;

import java.util.ArrayList;
import java.util.List;

public class ResourceServiceImpl implements ResourceService {
    @Override
    public List<Resource> getResByType(String type) {

        List<Resource> resourceList = new ArrayList<Resource>();
        //获取sqlsession对象
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        ResourceMapper resourceMapper = session.getMapper(ResourceMapper.class);
        //调用查询方法，查询数据库
        resourceList = resourceMapper.getResByType(type);
        return resourceList;
    }

    @Override
    public Resource getResById(Resource resource) {
        //获取sqlsession对象
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        ResourceMapper resourceMapper = session.getMapper(ResourceMapper.class);
        resource = resourceMapper.getResById(resource);
        return resource;
    }

    @Override
    public List<Resource> getPopularResMore() {
        List<Resource> resourceList = new ArrayList<Resource>();
        //获取sqlsession对象
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        ResourceMapper resourceMapper = session.getMapper(ResourceMapper.class);
        //调用查询方法，查询数据库
        resourceList = resourceMapper.getPopularResMore();
        return resourceList;
    }

    @Override
    public List<Resource> getPopularRes() {
        List<Resource> resourceList = new ArrayList<Resource>();
        //获取sqlsession对象
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        ResourceMapper resourceMapper = session.getMapper(ResourceMapper.class);
        //调用查询方法，查询数据库
        resourceList = resourceMapper.getPopularResource();
        return resourceList;
    }

    @Override
    public List<Resource> getResByAuthor(String author) {
        List<Resource> resourceList = new ArrayList<Resource>();
        //获取sqlsession对象
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        ResourceMapper resourceMapper = session.getMapper(ResourceMapper.class);
        //调用查询方法，查询数据库
        resourceList = resourceMapper.getResByAuthor(author);
        return resourceList;
    }

    @Override
    public MessageModel deleteResById(Resource resource) {
        MessageModel model = new MessageModel();
        //获取sqlsession对象
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        ResourceMapper resourceMapper = session.getMapper(ResourceMapper.class);
        //删除数据库中指定id的文章
        Integer flag = resourceMapper.deleteResById(resource);
        session.commit();//修改、删除时一定要执行commit
        if (flag > 0) {
            model.setCode(200);
            model.setMsg("资源删除成功");
        } else {
            model.setCode(201);
            model.setMsg("资源删除失败，请稍后再试");
        }
        return model;
    }
}
