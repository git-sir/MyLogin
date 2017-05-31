package com.test.mylogin.shiro;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by ucs_xiaokailin on 2017/5/17.
 */
@Controller
public class ShiroController {
    private static final Logger logger = LoggerFactory.getLogger(ShiroController.class);
    private static final String LOGIN_PAGE = "login/index";
    @RequestMapping(value = "login")
    public String login (HttpServletRequest httpRequest, Model model) {
        logger.info(getClass().getSimpleName()+"拦截到"+httpRequest.getRequestURI());
        /**
         * 这里拼接出服务器的地址，然后以"ctx"为key将其放入Model中，前端HTML页面就可以通过${ctx}获取该值。
         * 前端HTML获取服务器地址,是为了在其js代码中通过window.location.href = ctx + "index"的方式
         * 请求主页
         */
        String ctx = httpRequest.getScheme()+"://"+httpRequest.getServerName() //服务器地址
                + ":"
                + httpRequest.getServerPort()           //端口号
                + httpRequest.getContextPath()     //项目名称
                + "/";
        model.addAttribute("ctx", ctx);
        logger.info("服务器地址-> ctx = "+ctx);

        if(SecurityUtils.getSubject().isAuthenticated()){
            return "redirect:index";
        }
        return LOGIN_PAGE;
    }

    @RequestMapping("logout")
    public String logout(){
        ShiroUtil.logoutCurUser();
        return "redirect:loginPage";
    }
    //这个URL用于：在用户已登录的情况下，再次访问登录页面时重定向到成功页面
    @RequestMapping("index")
    public String index(){
        return "home/index";
    }

    private void generatePwd(){
        String saltSource = "abcd";		//盐值

        String hashAlgorithmName = "MD5";	//使用MD5算法
        String credentials = "123456";		//需要加密的数据
        Object salt = new Md5Hash(saltSource);
        int hashIterations = 1024;		//迭代加密的次数

        Object result = new SimpleHash(hashAlgorithmName, credentials, salt, hashIterations);
        logger.info("加密后的数据："+result.toString());
    }

//    @RequiresRoles("manager")//@RequiresRoles用于指定可以访问managerPage这个URL的角色,也可以在ShiroConfig中配置过滤器来实现
    @RequestMapping("managerPage")
    public String managerPage(){
        logger.info("访问managerPage");
		/*
		 * 注：这里的"managerPage"页面没有指定访问权限的话,则用户登录后便可以直接打开
		 */
        return "managerPage";
    }

    @RequestMapping("testFunc")
    public String testFunc(String para1,String para2){
        return "home/index";
    }

    @RequestMapping("testRedirect")
    public void testRedirect(HttpServletRequest request, HttpServletResponse response) throws IOException {
//        response.setStatus(302); //重定向的响应头为302
//        response.setHeader("Location","http://www.baidu.com"); //Location指定要跳转的URL

        //sendRedirect方法是上面两条代码的结合
        response.sendRedirect("http://www.baidu.com");
    }

    //"redirect:xxx"也是一种重定向的方式
//    @RequestMapping("testRedirect2")
//    public String testRedirect2(HttpServletRequest request, HttpServletResponse response) throws IOException {
//        return "redirect:testRedirect";
//    }

    @RequestMapping("testCookie")
    public void testCookie(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Cookie cookie = new Cookie("lastAccessTime",System.currentTimeMillis()+"");
        /**
         * 若有设置有效期(单位是秒)，cookie将被浏览器写到硬盘上，到期后会自动删除
         * 若不设置有效期，默认值是-1，则表示cookie的有效期是会话范围，即cookie仅存储在浏览器缓存中，浏览器一关闭cookie就没了。
         */
        cookie.setMaxAge(300);
        //把cookie发回给客户端
        response.addCookie(cookie);
    }
}
