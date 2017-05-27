package com.test.mylogin.shiro;


import org.apache.shiro.cache.CacheManager;
import org.apache.shiro.cache.MemoryConstrainedCacheManager;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.spring.LifecycleBeanPostProcessor;
import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.aop.framework.autoproxy.DefaultAdvisorAutoProxyCreator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * shiro配置
 */
@Configuration
public class ShiroConfig {
    private static Map<String, String> filterChainDefinitionMap = new LinkedHashMap<>();

    @Bean(name = "myShiroRealm")
    public AuthorizingRealm getShiroRealm() {
        return new MyShiroRealm();
    }

    @Bean(name = "cacheManager")
    public CacheManager getCacheManager() {
        return new MemoryConstrainedCacheManager();
    }

//    @Bean(name = "csrfTokenRepository")
//    public CsrfTokenRepository getHttpSessionCsrfTokenRepository() {
//        return new HttpSessionCsrfTokenRepository();
//    }
//
//    @Bean(name = "csrfAuthenticationStrategy")
//    public CsrfAuthenticationStrategy getCsrfAuthenticationStrategy() {
//        CsrfAuthenticationStrategy cas = new CsrfAuthenticationStrategy();
//        cas.setCsrfTokenRepository(getHttpSessionCsrfTokenRepository());
//        return cas;
//    }


    @Bean(name = "lifecycleBeanPostProcessor")
    public LifecycleBeanPostProcessor getLifecycleBeanPostProcessor() {
        return new LifecycleBeanPostProcessor();
    }

    @Bean
    public DefaultAdvisorAutoProxyCreator getDefaultAdvisorAutoProxyCreator() {
        DefaultAdvisorAutoProxyCreator daap = new DefaultAdvisorAutoProxyCreator();
        daap.setProxyTargetClass(true);
        return daap;
    }

    @Bean(name = "securityManager")
    public DefaultWebSecurityManager getDefaultWebSecurityManager() {
        DefaultWebSecurityManager dwsm = new DefaultWebSecurityManager();
        dwsm.setRealm(getShiroRealm());
        //用户授权/认证信息Cache
        dwsm.setCacheManager(getCacheManager());
        return dwsm;
    }

    @Bean
    public AuthorizationAttributeSourceAdvisor getAuthorizationAttributeSourceAdvisor() {
        AuthorizationAttributeSourceAdvisor aasa = new AuthorizationAttributeSourceAdvisor();
        aasa.setSecurityManager(getDefaultWebSecurityManager());
        return new AuthorizationAttributeSourceAdvisor();
    }

    /**
     * 注册DelegatingFilterProxy（Shiro）
     * 集成Shiro有2种方法：
     * 1. 按这个方法自己组装一个FilterRegistrationBean（这种方法更为灵活，可以自己定义UrlPattern，
     * 在项目使用中你可能会因为一些很但疼的问题最后采用它， 想使用它你可能需要看官网或者已经很了解Shiro的处理原理了）
     * 2. 直接使用ShiroFilterFactoryBean（这种方法比较简单，其内部对ShiroFilter做了组装工作，无法自己定义UrlPattern，
     * 默认拦截 /*）
     */
    @Bean(name = "shiroFilter")//这个bean名称必须为"shiroFilter",因为shiro的Filter类DelegatingFilterProxy会查找这个名称的bean
    public ShiroFilterFactoryBean getShiroFilterFactoryBean() {
        ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
        shiroFilterFactoryBean.setSecurityManager(getDefaultWebSecurityManager());
        //添加自定义的authc过滤器
        shiroFilterFactoryBean.getFilters().put("authc", new MyFormAuthenticationFilter());
        //添加自定义的特殊字符过滤器
        shiroFilterFactoryBean.getFilters().put("spec", new SpecCharFilter());

        shiroFilterFactoryBean.setLoginUrl("/login");
        filterChainDefinitionMap.put("/shiro-logout", "logout");
        //managerPage这个URL用roles过滤器拦截,只有拥有manager这个角色的用户才可以访问
        filterChainDefinitionMap.put("/managerPage", "roles[manager]");
        //该URL用于用户在登录页面输入账号密码后向后台发送请求验证时的URL，所以不需要拦截
        filterChainDefinitionMap.put("/shiroLogin/**", "anon");
        //资源文件全部不拦截
        filterChainDefinitionMap.put("/css/**", "anon");
        filterChainDefinitionMap.put("/images/**", "anon");
        filterChainDefinitionMap.put("/Javascript/**", "anon");
        filterChainDefinitionMap.put("/libs/**", "anon");
        //登录页面引用的js文件"/pages/login/index.js"不能拦截
        filterChainDefinitionMap.put("/pages/login/**", "anon");
        //除了上述URL外，其余URL都需要经过验证
        filterChainDefinitionMap.put("/**", "spec,authc");//自定义的过滤器需要放在authc过滤器之前

        shiroFilterFactoryBean.setFilterChainDefinitionMap(filterChainDefinitionMap);
        return shiroFilterFactoryBean;
    }

}
