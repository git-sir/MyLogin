package com.test.mylogin.shiro;

import com.test.utils.JsonUtils;

import javax.servlet.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * Created by Administrator on 2017/5/30.
 */
public class CookieFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest)servletRequest;
        System.out.println(getClass().getSimpleName()+"-doFilter方法：拦截到的url为:"+httpServletRequest.getRequestURL());
        Cookie[] cookies = httpServletRequest.getCookies();
        if(cookies == null){
            System.out.println(getClass().getSimpleName()+"-doFilter方法："+httpServletRequest.getRequestURL()+"所带的cookies是null");
        }else if(cookies.length == 0){
            System.out.println(getClass().getSimpleName()+"-doFilter方法："+httpServletRequest.getRequestURL()+"所带的cookies大小为0");
        }else{
            for(Cookie cookie : cookies){
                /**
                 * 浏览器传过来的cookie，只有name和value两个属性有值，像domain、path、maxAge这些属性，即使在服务端最初创建cookie时
                 * 有指定其值，浏览器传送过来的cookie也不会包含这些值，因为这些属性值只需给客户端用，例如客户端根据domain、path控制
                 * 当前发送请求时是否附带cookie，根据maxAge判断cookie在客户端的有效期。而服务端通常只需要用到cookie的name和value两
                 * 个属性值就够了。如果非要让浏览器发送cookie所有属性值，可以考虑在浏览器页面中通过js代码实现。
                 */
                System.out.println("cookie："+JsonUtils.formatObjectToJson(cookie));
            }
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {

    }
}
