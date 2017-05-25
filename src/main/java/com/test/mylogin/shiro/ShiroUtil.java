package com.test.mylogin.shiro;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.SimplePrincipalCollection;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.subject.support.DefaultSubjectContext;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.apache.shiro.web.session.mgt.DefaultWebSessionManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collection;

/**
 * Created by ucs_xiaokailin on 2017/5/19.
 */
public class ShiroUtil {

    private static final Logger logger = LoggerFactory.getLogger(ShiroUtil.class);
    public static LoginUser getContextUser() {
        return (LoginUser) SecurityUtils.getSubject().getPrincipal();
    }


    public static boolean hasRolePermission(String permissionName) {
        return SecurityUtils.getSubject().hasRole(permissionName);
    }

    public static boolean login(String username,String password) {
        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken(username, password);
        try {
            //执行认证操作. 会触发MyRealm的 doGetAuthenticationInfo 方法
            subject.login(token);
        }catch (AuthenticationException ae) {
            System.out.println(username+"登陆失败: " + ae.getMessage());
            return false;
        }
        return true;
    }

    /**
     * 当前用户退出
     */
    public static void logoutCurUser(){
        Subject subject = SecurityUtils.getSubject();
        if (subject.isAuthenticated()) {
            logger.info("当前用户"+getContextUser().getUserName()+"退出登录");
            subject.logout(); // session 会销毁，在SessionListener监听session销毁，清理权限缓存
        }
    }

    /**
     * 指定帐号登出操作；
     * current为TRUE时，表示若userName刚好为当前正在操作的这个账号，也同样执行登出操作
     */
    public static void logout(String userName, boolean current) {
        // 处理session
        DefaultWebSecurityManager securityManager = (DefaultWebSecurityManager) SecurityUtils.getSecurityManager();
        DefaultWebSessionManager sessionManager = (DefaultWebSessionManager) securityManager.getSessionManager();
        Collection<Session> sessions = sessionManager.getSessionDAO().getActiveSessions();// 获取当前已登录的用户session列表

        Session currentSession = SecurityUtils.getSubject().getSession();
        for (Session session : sessions) {
            Object key = session.getAttribute(DefaultSubjectContext.PRINCIPALS_SESSION_KEY);
            if (key == null)
                continue;
            SimplePrincipalCollection principal = (SimplePrincipalCollection) key;
           LoginUser loginUser = (LoginUser) principal.getPrimaryPrincipal();
            if (!userName.equals(loginUser.getUserName()))
                continue;
            if (!current && session.getId() == currentSession.getId())
                continue;
            session.setTimeout(0);
            //sessionManager.getSessionDAO().delete(session);
        }
    }

}
