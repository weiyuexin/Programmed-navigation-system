package top.weiyuexin.controller;

import cn.hutool.core.date.DateUtil;
import cn.hutool.crypto.digest.DigestUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import top.weiyuexin.entity.User;
import top.weiyuexin.entity.vo.EmailModel;
import top.weiyuexin.entity.vo.MessageModel;
import top.weiyuexin.entity.vo.UserMessageModel;
import top.weiyuexin.factory.EmailCodeServiceFactory;
import top.weiyuexin.factory.UserServiceFactory;
import top.weiyuexin.service.EmailCodeService;
import top.weiyuexin.service.UserService;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller  //标识为控制层组件
@RequestMapping("/user")
public class UserController {
    /*显示登录页面用户登录控制器*/
    @RequestMapping("/login")
    public String loginPage() {
        return "login";
    }


    /*实现登录功能控制器*/
    @PostMapping(value = "/login", params = {"method=password"})
    @ResponseBody
    public Object login(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
        UserMessageModel model = new UserMessageModel();
        User user = new User();
        user.setUsername(request.getParameter("username"));
        user.setPassword(request.getParameter("password"));
        //调用用户工厂
        UserService service = UserServiceFactory.getInterfaceFactory();
        model = service.login(user);
        //将用户信息保存到session中
        session.setAttribute("user", model.getUser());
        //新建cookie对象
        Cookie c = new Cookie("userId", model.getUser().getId().toString());
        // 设置最大保存时间
        c.setMaxAge(60 * 60 * 24 * 7);
        //通过response对象将cookie设置到客户端
        response.addCookie(c);
        //System.out.println("查询到的id" + model.getUser().getId());
        return model;
    }


    /*
     * 邮箱验证码登录
     * */
    @PostMapping(value = "/login", params = {"method=email"})
    @ResponseBody
    public Object loginByEmail(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
        UserMessageModel model = new UserMessageModel();
        User user = new User();
        user.setEmail(request.getParameter("email"));
        Integer emailCode = Integer.parseInt(request.getParameter("emailcode"));
        if (emailCode == null) {
            model.setMsg("请输入验证码");
        } else {
            //调用用户工厂
            UserService service = UserServiceFactory.getInterfaceFactory();
            if (!session.getAttribute("emailCode").equals(emailCode)) {
                model.setMsg("验证码错误");
                model.setCode(201);
            } else {
                model = service.loginByEmail(user);
            }
            //将用户信息保存到session中
            session.setAttribute("user", model.getUser());
            //新建cookie对象
            Cookie c = new Cookie("userId", model.getUser().getId().toString());
            // 设置最大保存时间
            c.setMaxAge(60 * 60 * 24 * 7);
            //通过response对象将cookie设置到客户端
            response.addCookie(c);
        }
        return model;
    }

    /*
     * 显示注册页面的控制器
     * */
    @RequestMapping("/register")
    public String registerPage() {
        return "register";
    }

    /*
     * 显示忘记密码修改密码页面的控制器
     * */
    @RequestMapping("/forget")
    public String forget() {
        return "frogetPassword";
    }

    /*
     * 实现忘记密码后修改密码的功能
     * */
    @RequestMapping("/forget.do")
    @ResponseBody
    public Object changePasswordNotLogin(HttpSession session, HttpServletRequest request) {
        MessageModel model = new MessageModel();
        //获取参数
        User user = new User();
        user.setEmail(request.getParameter("email"));
        user.setPassword(DigestUtil.md5Hex(request.getParameter("password")));
        Integer emailCode = Integer.parseInt(request.getParameter("emailcode"));

        if (emailCode == null) {
            model.setMsg("请输入验证码");
        } else {
            //调用用户工厂
            UserService service = UserServiceFactory.getInterfaceFactory();
            model = service.changePasswordNotLogin(user);
        }
        return model;
    }


    /*
     * 实现注册功能的控制器
     * */
    @PostMapping("/register")
    @ResponseBody
    public Object register(HttpServletRequest request, HttpSession session) {
        UserMessageModel model = new UserMessageModel();
        User user = new User();
        user.setUsername(request.getParameter("username"));
        user.setPassword(request.getParameter("password"));
        user.setEmail(request.getParameter("email"));
        user.setTime(DateUtil.now());  //注册时间

        String check_password = request.getParameter("check_password");
        Integer emailcode = Integer.parseInt(request.getParameter("emailcode"));

        //调用用户工厂
        UserService service = UserServiceFactory.getInterfaceFactory();
        //1.校验验证码是否正确
        if (!session.getAttribute("emailCode").equals(emailcode)) {
            model.setMsg("验证码错误");
            model.setCode(201);
        } else if (!user.getPassword().equals(check_password)) {
            model.setMsg("两次输入的密码不一致，请重新输入");
            model.setCode(201);
        } else {
            //密码加密
            user.setPassword(DigestUtil.md5Hex(user.getPassword()));
            //执行注册
            model = service.register(user);
        }
        return model;
    }

    /*发送邮箱验证码*/
    @RequestMapping("/sendEmailCode")
    @ResponseBody
    public Object sendEmailCode(String email, HttpSession session) {

        //调用邮箱工厂类，获取发送邮箱对象
        EmailCodeService emailCodeService = EmailCodeServiceFactory.getInterfaceFactory();
        //调用相应的方法，发送邮箱验证码
        EmailModel emailModel = emailModel = emailCodeService.sendEmailCode(email);
        //将发送的验证码保存到session作用域中，后续验证验证码时用到
        session.setAttribute("emailCode", emailModel.getEmailCode());
        //将消息模型中的验证码清空
        emailModel.setEmailCode(null);
        return emailModel;
    }

    /*
     * 判断用户登录状态
     * */
    @RequestMapping("/checkIsNotLogin")
    @ResponseBody
    public Object checkIsNotLogin(HttpSession session) {
        MessageModel message = new MessageModel();
        //获取session中保存的用户信息
        //获取session中保存答用户信息
        User user = (User) session.getAttribute("user");
        if (user == null) {
            message.setCode(201);  //未登录
            message.setMsg("您还没有登录，请前往登录");
        } else {
            message.setCode(200); //已登录
            message.setMsg("处于登录状态");
        }
        return message;
    }

    /*
     * 显示登录用户信息控制器
     * */
    @RequestMapping(value = "/account",params = "account")
    public String gotoAccountPage() {
        return "account";
    }

    @RequestMapping(value = "/account",params = "article")
    public String gotoMyArticlePage() {
        return "myarticle";
    }
    @RequestMapping(value = "/account",params = "res")
    public String gotoMyResPage() {
        return "myres";
    }


    /*
     * 获取登录用户的个人信息
     * */
    @RequestMapping("/getAccount")
    @ResponseBody
    public Object getAccount(HttpSession session) {
        //获取保存在session中的用户信息
        User user = (User) session.getAttribute("user");
        return user;
    }

    /*
     * 用户登录后修改密码控制器
     * */
    @RequestMapping("/changePasswordAfterLogin")
    @ResponseBody
    public Object changePasswordAfterLogin(HttpServletRequest request, HttpSession session) {
        MessageModel model = new MessageModel();
        String oldPassword = DigestUtil.md5Hex(request.getParameter("oldPassword"));
        String newPassword = DigestUtil.md5Hex(request.getParameter("newPassword"));
        //获取session中的用户信息
        User user = new User();
        user = (User) session.getAttribute("user");
        if (!user.getPassword().equals(oldPassword)) {
            model.setCode(201);
            model.setMsg("原密码输入错误，请重试");
        } else {
            user.setPassword(newPassword);
            //调用用户工厂
            UserService service = UserServiceFactory.getInterfaceFactory();
            model = service.changePassword(user);
            session.invalidate();
        }
        return model;
    }

    /*
     * 用户修改个人信息
     * */
    @RequestMapping("/changeAccount")
    @ResponseBody
    public Object changeAccount(HttpServletRequest request, HttpSession session) {
        UserMessageModel model = new UserMessageModel();
        //获取session中的用户信息
        User user = (User) session.getAttribute("user");
        //获取修改后的参数
        user.setPhoto(request.getParameter("photo"));
        user.setSex(request.getParameter("sex"));
        user.setSignature(request.getParameter("signature"));
        user.setAddress(request.getParameter("address"));
        user.setPhone(request.getParameter("phone"));
        if (user != null) {
            //调用用户工厂
            UserService service = UserServiceFactory.getInterfaceFactory();
            //修改信息
            model = service.changeInformation(user);
        }
        if (!model.getCode().equals(201)) {
            model.setUser(user);
            //修改session中的用户信息
            session.setAttribute("user", user);
        }
        return model;
    }

    /*
     * 退出登录控制器
     * */
    @RequestMapping("/logout")
    public String logout(HttpSession session) {
        //销毁session
        session.invalidate();
        //重新加载首页
        return "redirect:/";
    }

    /*
    * 查询数据库中文章作者的信息
    * */
    @RequestMapping("/getAuthorMessage/{authorId}")
    @ResponseBody
    public Object getAuthorMessage(@PathVariable("authorId") Integer authorId){
        User user=new User();
        user.setId(authorId);
        System.out.println(authorId);
        //调用用户工厂
        UserService service = UserServiceFactory.getInterfaceFactory();
        user = service.getAuthorMessage(user);
        return user;
    }

    /*
    * 通过用户名查询文章作者控制器
    * */
    @RequestMapping("/getAuthorMessageByUsername/{authorName}")
    @ResponseBody
    public Object getAuthorMessageByUsername(@PathVariable("authorName") String authorName){
        User user=new User();
        user.setUsername(authorName);
        //调用用户工厂
        UserService service = UserServiceFactory.getInterfaceFactory();
        user = service.getAuthorMessageByUsername(user);
        return user;
    }

    /*
    * 显示文章作者个人信息页面控制器
    * */
    @RequestMapping("/author/{authorName}")
    @ResponseBody
    public ModelAndView getAuthor(@PathVariable("authorName") String authorName){
       ModelAndView modelAndView = new ModelAndView();

        User user=new User();
        user.setUsername(authorName);
        //调用用户工厂
        UserService service = UserServiceFactory.getInterfaceFactory();
        user = service.getAuthorMessageByUsername(user);

        modelAndView.addObject("user",user);
        modelAndView.setViewName("author");

        return modelAndView;
    }
}
