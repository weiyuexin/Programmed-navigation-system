# 编程导航系统

### 开发工具

IntelliJ IDEA 2021.2.2

MySQL8.0

tomcat9

### 系统演示地址：

[https://pns.weiyuexin.top/pns/](https://pns.weiyuexin.top/pns/)

### 功能简介

一、前端UI：

（1）、用户方面：

1、可以查询阅览各种技术、软件的资料

2、对编程技术进行了一系列划分，每个分类都包含技术博客、学习资料等内容，便于用户理解学习。

3、社交功能，不同用户之间可以互动

4、个人页面，对个人资料的一些整理，收藏，心愿记录，消息通知等，且用户可以在此编辑修改自己的头像、昵称、学校、联系方式、地址等信息。

5、用户可以分享技术博客以及学习资料，首页会展示精选的博客、学习资料以及热点技术信息等。

6、设有全局搜索功能，用户可以自定义搜索自己想要查看的内容。

7、设有心愿墙模块，用户可以在心愿墙发布自己想要寻找的资料或者想要解决的问题，其他用户看到后可以联系帮助实现心愿，实现心愿可以获得一定的积分。

 

（2）、管理员方面：

基于用户的基础上增添了一部分功能：

1、对社区交流具有管理权力，能对用户的不正当发言进行调整

2、对用户上传的资源有审核通过上架的权力，例如用户上传了关于Docker的知识资料卡，需提交经管理员审核通过后才能显示与前台；

二、后台管理系统：

  1、普通用户方面：可以浏览个人的数据，修改与个人相关的数据，没有实际的大的操作权力，可以查看修改自己的信息，查看已发布的博客文章和学习资料。

  2、管理员方面：管理整个系统的用户，实现CURD功能，查看并操作系统日志，用户管理、内容审核、后台维护等，管理员分为普通管理员和超级管理员，超级管理员权限最高。

![image-20211217225934435](https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112172259580.png)

![image-20211217225958298](https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112172259352.png)

![image-20211217230007619](https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112172300677.png)

### 采用的技术

前端拟采用的技术有：

HTML、CSS、JavaScript、JQuery、Vue、Vue-route、Vuex、Ajax、Bootstrap 、layui、element ui等。

后端拟采用的技术有：

  JDBC、JavaBean、Socket通信、表现层SpringMVC、持久层MyBatis、

整体即使用SSM框架。数据库采用MySQL。

### 程序运行截图

首页（未登录）

![image-20211227105604010](https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112271056218.png)

首页分类展示文章：

![image-20211229002406983](https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112290024166.png)

文章详情页：

![image-20211229002029391](https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112290020727.png)

文章详情页后的评论：

![image-20211229002107482](https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112290021617.png)

文章点赞：

![image-20211229003435731](https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112290034052.png)

文章评论：

![image-20211229003501709](https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112290035917.png)

![image-20211229003538245](https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112290035370.png)

积分排行榜：

![image-20211229002132025](https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112290021091.png)

文章&资源排行榜：

![image-20211229002151381](https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112290021445.png)

密码登录界面：

![image-20211229002209418](https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112290022258.png)

邮箱登录界面：

![image-20211229002224929](https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112290022835.png)

邮箱注册界面：

![image-20211229002247013](https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112290022890.png)

登录后的效果：

![image-20211229002439782](https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112290024884.png)

个人信息：

![image-20211229002500460](https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112290025587.png)

我的文章：

![image-20211229002815926](https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112290028038.png)

我的资源：

![image-20211229003059458](https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112290030567.png)

修改密码：

![image-20211229002523147](https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112290025273.png)

发表文章页面：

![image-20211229002623885](https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112290026039.png)

![image-20211229002634302](https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112290026554.png)

发布资源：

![image-20211229003216506](https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112290032623.png)

资源列表：

![image-20211229003335662](https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112290033816.png)

资源详情：

![image-20211229003317572](https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112290033718.png)

排行榜：

![image-20211229003353720](https://cdn.jsdelivr.net/gh/weiyuexin/blogimg@latest/img/202112290033880.png)

### 代码开源地址

[https://gitee.com/weiyuexin/programming-navigation-system](https://gitee.com/weiyuexin/programming-navigation-system)
[https://github.com/weiyuexin/Programmed-navigation-system](https://github.com/weiyuexin/Programmed-navigation-system)
