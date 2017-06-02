package com.test.mylogin.shiro;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by ucs_xiaokailin on 2017/5/26.
 */
public class SpecCharFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        //System.out.println("Class="+servletRequest.getClass());//ShiroHttpServletRequest
        HttpServletRequest httpServletRequest = (HttpServletRequest)servletRequest;
        System.out.println(getClass().getSimpleName()+"-doFilter方法：拦截到的url为:"+httpServletRequest.getRequestURL());
        /**
         * servletRequest.getParameterMap()中包含本次请求中全部非null的参数,其中每一个参数值都被封装成数组
         * 由于servletRequest.getParameterMap()中的值不允许被直接修改，所以这里重新创建Map保存参数值再对其进行修改
         */
        Map<String, String[]> parameterMap = new HashMap(servletRequest.getParameterMap());
        System.out.println("以下打印请求中包含的所有请求参数：");
        //将请求参数中的前后空格去掉。servletRequest.getParameterMap()中所有参数的值都以String[]形式保存
        for (String key : parameterMap.keySet()) {
            System.out.println("key = "+ key + " and value = " + Arrays.toString(parameterMap.get(key)));
            String[] values = parameterMap.get(key);
            if(values.length > 0){
                values[0] = values[0].trim();
            }

        }
        //将请求继续传递
        filterChain.doFilter(new ParameterRequestWrapper(httpServletRequest,parameterMap), servletResponse);
    }

    @Override
    public void destroy() {

    }

    /**
     * 自定义请求类，若要处理loginURL的请求参数(例如username、password等)则重写getParameter方法。
     * 若要处理处理普通URL(非loginURL)的请求参数，则重写getParameterValues方法
     */
    public class ParameterRequestWrapper extends HttpServletRequestWrapper {

        private Map paramsMap;

        public ParameterRequestWrapper(HttpServletRequest request, Map paramsMap) {
            super(request);
            this.paramsMap = paramsMap;
        }

        /**
         * 当shiro拦截到的URL是非loginURL时，会调用此方法获取请求参数里的值
         * @param name
         * @return
         */
        public String[] getParameterValues(String name) {
            System.out.println(getClass().getSimpleName()+"-getParameterValues方法：参数"+name+"传递给getParameterValues");
            Object v = paramsMap.get(name);
            if (v == null) {
                return null;
            } else if (v instanceof String[]) {
                return (String[]) v;
            } else if (v instanceof String) {
                return new String[] { (String) v };
            } else {
                return new String[] { v.toString() };
            }
        }

        /**
         * 当shiro拦截到的URL是loginURL并且是用post方式提交的时，会调用此方法获取请求里的参数值
         * @param name
         * @return
         */
        public String getParameter(String name) {
            System.out.println(getClass().getSimpleName()+"-getParameter方法：参数"+name+"传递给getParameter");
//            String value = getRequest().getParameter(name);
//            if(value != null){
//                System.out.println("参数值："+value);
//            }else{
//                System.out.println("参数"+name+"对应的值为null");
//            }
//            return value;
            Object v = paramsMap.get(name);
            if (v == null) {
                return null;
            } else if (v instanceof String[]) {
                String[] strArr = (String[]) v;
                if (strArr.length > 0) {
                    return strArr[0];
                } else {
                    return null;
                }
            } else if (v instanceof String) {
                return (String) v;
            } else {
                return v.toString();
            }
        }
    }
}
