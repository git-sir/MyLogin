package com.test.mylogin.shiro;

import com.test.utils.DateUtil;
import com.test.utils.JsonUtils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Enumeration;

/**
 * Created by ucs_xiaokailin on 2017/6/2.
 */
public class SessionFilter  implements Filter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest)servletRequest;
        System.out.println(getClass().getSimpleName()+"-doFilter方法：拦截到的url为:"+httpServletRequest.getRequestURL());
        HttpSession httpSession = httpServletRequest.getSession();
        System.out.println("HttpSession实际类型："+httpSession.getClass());
        System.out.println("session的Id(32位)："+httpSession.getId());  //32位的ID
        System.out.println("session的创建时间(CreationTime)："+ DateUtil.format(httpSession.getCreationTime()));
        System.out.println("session的最后活动时间(LastAccessedTime)："+DateUtil.format(httpSession.getLastAccessedTime()));
        System.out.println("session的最大不活动时间(秒),默认为30分钟(MaxInactiveInterval)："+httpSession.getMaxInactiveInterval());
        //httpSession.setMaxInactiveInterval(10);//单位秒，表示session如果连续10秒没有活动，它将自动销毁
        //httpSession.invalidate(); //立刻销毁session
        String attribute = "user_name";
        if(httpSession.getAttribute(attribute) == null){
            System.out.println("session中没有"+attribute+"这个属性");
            String attrValue = httpServletRequest.getParameter("username");
            /**
             * 保存数据到session中.
             * 注意：只有属性值不为null的属性，才能够保存到session中
             */
//            httpSession.setAttribute(attribute,"非空");
            httpSession.setAttribute(attribute,attrValue);//若attrValue为null,则setAttribute实际并没有把属性保存到session里
            if(attrValue != null){
                System.out.println("添加"+attribute+"这个属性到session中,属性值为"+attrValue);
            }else{
                System.out.println("添加"+attribute+"这个属性到session中,但是由于其属性值为null,所以添加不成功");
            }
        }else{
            System.out.println("session中已有"+attribute+"这个属性,它的值为"+httpSession.getAttribute(attribute));
        }
        Enumeration<String> attributeNames = httpSession.getAttributeNames();//返回捆绑到当前会话的所有属性名的枚举值
        System.out.println("以下打印session当前保存的所有属性及其对应的属性值：");
        /**
         * 由于只有属性值不为null的属性才能够保存到session中.所以getAttributeNames方法得到的所有属性,其属性值肯定都不为null
          */
        while (attributeNames.hasMoreElements()) {
            String attrName = attributeNames.nextElement();
            Object attrValue = httpSession.getAttribute(attrName);
            System.out.println("{"+attrName+" : "+attrValue.toString()+"}");
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }
    @Override
    public void destroy() {

    }
}
