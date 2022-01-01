package top.weiyuexin.service.impl;

import com.aliyun.oss.OSSClient;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.ibatis.session.SqlSession;
import top.weiyuexin.entity.Resource;
import top.weiyuexin.entity.vo.FileModel;
import top.weiyuexin.entity.vo.MessageModel;
import top.weiyuexin.mapper.ResourceMapper;
import top.weiyuexin.service.UploadFileService;
import top.weiyuexin.utils.GetSqlSession;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.net.URL;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

public class UploadFileServiceImpl implements UploadFileService {

    @Override
    public MessageModel uploadResource(Resource resource) {
        MessageModel model = new MessageModel();
        //获取sqlsession对象
        SqlSession session = GetSqlSession.createSqlSession();
        //得到对应的mapper
        ResourceMapper resourceMapper = session.getMapper(ResourceMapper.class);
        //调用插入方法，将资源属性插入数据库
        Integer flog = resourceMapper.insertResource(resource);
        if (flog > 0) {
            model.setCode(200);
            model.setMsg("资源上传成功!");
        }
        session.commit();
        return model;
    }
}
