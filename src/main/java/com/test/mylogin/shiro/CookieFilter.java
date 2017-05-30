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
                System.out.println("cookie:"+JsonUtils.formatObjectToJson(cookie));
            }
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {

    }
}
