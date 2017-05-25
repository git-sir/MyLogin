package com.test.mylogin.shiro;

import org.apache.shiro.authc.*;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;

/**
 * Created by ucs_xiaokailin on 2017/5/16.
 */
public class MyShiroRealm extends AuthorizingRealm {
    private static final Logger logger = LoggerFactory.getLogger(MyShiroRealm.class);

    /**
     * 权限认证，为当前登录的Subject授予角色和权限。该方法只有当客户端访问的URL是需要特定的角色或权限时才会被调用
     *
     * 并且每次访问需授权资源时都会执行该方法中的逻辑，这表明本例中默认并未启用AuthorizationCache
     * 如果连续访问同一个URL（比如刷新），该方法不会被重复调用，Shiro有一个时间间隔（也就是cache时间，在ehcache-shiro.xml中配置），超过这个时间间隔再刷新页面，该方法会被执行
     */
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        logger.info(getClass()+"执行doGetAuthorizationInfo方法");
        SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();

        LoginUser loginUser = (LoginUser)principalCollection.getPrimaryPrincipal();
        String userName = loginUser.getUserName();//获取用户名
        logger.info("为用户"+userName+"授权");

		/*
		 * 为通过验证(登录)的用户授权,即为其指定角色(权限).哪些角色(权限)可以访问哪些网页,在ShiroConfig中
		 * 的shiroFilter这个bean的filterChainDefinitions属性已指定了权限规则
		 */
        if("admin".equals(userName)){
            info.addRole("admin");	//用户名为admin时，为该用户授权admin角色
        }
        if("manager".equals(userName)){
            info.addRole("manager");
        }

        info.addRole("user");	//为该用户授权user角色

        return info;
    }

    /**
     * 登录认证
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(
            AuthenticationToken token) throws AuthenticationException {
        logger.info(getClass()+"执行doGetAuthenticationInfo方法");
        logger.info("token类型: "+token.getClass());//在
        logger.info("Principal: "+token.getPrincipal());
        logger.info("Credentia: "+token.getCredentials());

        //1. 从 token 中获取登录的 username! 注意不需要获取 password.

        //2. 利用 username 查询数据库得到用户的信息.

        //3. 创建 SimpleAuthenticationInfo 对象并返回. 注意该对象的凭证式从数据库中查询得到的.
        //而不是页面输入的. 实际的密码校验可以交由 Shiro 来完成

        //4. 关于密码加密的事: shiro 的密码加密可以非常非常的复杂, 但实现起来却可以非常简单.
        //1). 可以选择加密方式: 在当前的 realm 中编写一个 public 类型的不带参数的方法, 使用 @PostConstruct
        //注解进行修饰, 在其中来设置密码的匹配方式.
        //2). 设置盐值: 盐值一般是从数据库中查询得到的.
        //3). 调用 new SimpleAuthenticationInfo(principal, credentials, credentialsSalt, realmName)
        //构造器返回 SimpleAuthenticationInfo 对象:  credentialsSalt 为
        //ByteSource credentialsSalt = new Md5Hash(source);

        //登陆的主要信息: 可以是一个实体类的对象, 但该实体类的对象一定是根据 token 的 username 查询得到的.
        Object principal = token.getPrincipal();
        //认证信息: 从数据库中查询出来的信息. 密码的比对交给 shiro 去进行比较
        String credentials = "68f3139a38b232392cc9d3b6ddd762f7";
        //设置盐值:
        String source = "abcd";
        ByteSource credentialsSalt = new Md5Hash(source);
        logger.info("盐值credentialsSalt: "+credentialsSalt);

        //当前 Realm 的 name
        String realmName = getName();
//		SimpleAuthenticationInfo info =
//				new SimpleAuthenticationInfo(principal, credentials , realmName);
		/*
		 * 构造方法传入的principal参数可以是任何数据，例如用户名、pojo对象、pojo对象的主键id等，与参数credentials不要求
		 * 有什么逻辑对应关系，它的主要作用是在授权方法doGetAuthorizationInfo中可以取出来，做一进步的业务处理。Shiro在验
		 * 证登录时，会将AuthenticationToken中的credentials和SimpleAuthenticationInfo的credentials比较，只有一致
		 * 才能允许登录
		 */
        SimpleAuthenticationInfo info =
                new SimpleAuthenticationInfo(
                        new LoginUser("123456",principal.toString(),"昵称"),
                        credentials, credentialsSalt, realmName);

        return info;
    }

    /**
     *  @PostConstruct注解 相当于spring的xml文件中bean节点的 init-method 配置。
     * 在MyShiroRealm类的setCredentialMatcher方法上声明该注解，则MyShiroRealm类在执行构造方法之后会调用此方法，从而
     * 证书加密器才能被设置，从而浏览器提交过来的密码才能被加密(浏览器提交过来的密码最先是在shiroController里接收到的)
     */
    @PostConstruct
    public void setCredentialMatcher(){
        HashedCredentialsMatcher credentialsMatcher = new HashedCredentialsMatcher();

        credentialsMatcher.setHashAlgorithmName("MD5");
        credentialsMatcher.setHashIterations(1024);

        setCredentialsMatcher(credentialsMatcher);
    }
}
