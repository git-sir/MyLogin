package com.test.mylogin.shiro;

import com.test.utils.JsonUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.apache.shiro.web.util.WebUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


/**
 * 处理验证码，以及登录成功和失败操作
 * Created by ucs_zhongtingyuan on 2017/1/17.
 */
public class MyFormAuthenticationFilter extends FormAuthenticationFilter {
    private static final Logger log = LoggerFactory.getLogger(FormAuthenticationFilter.class);

    public static final String CAPTCHA = "captcha";

    private static final String BING_URL = "/bindAccount";

    private String captchaParam = CAPTCHA;
    @Autowired
//    private ManageModuleService manageModuleService;
//    private CsrfTokenRepository csrfTokenRepository;

    public MyFormAuthenticationFilter() {
    	super();
    }
//    public MyFormAuthenticationFilter(CsrfTokenRepository csrfTokenRepository) {
//        super();
//        this.csrfTokenRepository = csrfTokenRepository;
//    }

    /**
     * 若本类不重载onAccessDeniedcreateToken方法,则createToken方法是必须重载的。因为如果不重载即使用父类的onAccessDeniedcreateToken方法,
     * 则使用的是父类的onAccessDeniedcreateToken方法,查看父类的onAccessDeniedcreateToken方法调用的executeLogin方法,可以知道它将调用
     * createToken(ServletRequest var1, ServletResponse var2)这个抽象方法
     */
    protected AuthenticationToken createToken(ServletRequest request, ServletResponse response) {
        System.out.println(getClass().getSimpleName()+"-createToken方法：开始创建UsernamePasswordToken");
        String username = this.getUsername(request);
        String password = this.getPassword(request);
        boolean rememberMe = this.isRememberMe(request);
        String captcha = this.getCaptcha(request);
        String host = this.getHost(request);
//        return new MyUsernamePasswordToken(username, password, rememberMe, host, captcha);
        System.out.println(getClass().getSimpleName()+"-createToken方法：完成创建UsernamePasswordToken");
        return new UsernamePasswordToken(username, password);
    }

    /**
     * 登录成功操作
     */
    @Override
    protected boolean onLoginSuccess(AuthenticationToken token, Subject subject, ServletRequest request, ServletResponse response) throws Exception {
    	HttpServletResponse resp = (HttpServletResponse) response;
    	HttpServletRequest req = (HttpServletRequest)request;
        System.out.println(getClass().getSimpleName()+"-onLoginSuccess方法：验证通过，登录成功");
//        this.csrfTokenRepository.addUserOauthRel(subject);
        Map<String, Object> map = new HashMap<>();
//        if(csrfTokenRepository != null) {
//            CsrfToken _csrf = csrfTokenRepository.generateToken(req);
//            this.csrfTokenRepository.saveToken(_csrf, req, resp);
//            map.put("_csrf", _csrf);
//        }
    	map.put("success", true);
    	resp.setContentType("application/json;charset=UTF-8");
    	resp.getWriter().write(JsonUtils.formatObjectToJson(map));
        return false;
    }

    /**
     * 登录失败操作
     */
    @Override
    protected boolean onLoginFailure(AuthenticationToken token, AuthenticationException e, ServletRequest request, ServletResponse response) {
    	HttpServletResponse resp = (HttpServletResponse) response;
    	Map<String, Object> map = new HashMap<>();
    	map.put("success", false);
    	map.put("msg", getFailureMsg(e));
    	resp.setContentType("application/json;charset=UTF-8");
    	try {
			resp.getWriter().write(JsonUtils.formatObjectToJson(map));
		} catch (IOException e1) {
            log.error("MyFormAuthenticationFilter",e);
		}
    	return false;
    }

    /**
     * 设置登录失败信息
     */
    protected void setFailureAttribute(ServletRequest request, AuthenticationException ae) {
        request.setAttribute(this.getFailureKeyAttribute(), getFailureMsg(ae));
    }
    @Override
    protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) {
         return super.isAccessAllowed(request, response, mappedValue);
    }

//    @Override
//	protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
//    	if (isLoginRequest(request, response)) {
//			if (isLoginSubmission(request, response)) {
//				if (log.isTraceEnabled()) {
//					log.trace("Login submission detected.  Attempting to execute login.");
//				}
//				return executeLogin(request, response);
//			}
//			if (log.isTraceEnabled()) {
//				log.trace("Login page view.");
//			}
//
//			return true;
//		}
//
//    	HttpServletResponse resp = (HttpServletResponse) response;
//    	HttpServletRequest req = (HttpServletRequest)request;
//		resp.setContentType("text/html;charset=UTF-8");
//
//        if (csrfTokenRepository.isOauthLoginSuccess(req)){
//
//            resp.sendRedirect(req.getContextPath().concat(BING_URL));
//            return false;
//        }
//		resp.sendRedirect(req.getContextPath().concat(getLoginUrl()));
//		return false;
//	}


    @Override
    protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
        HttpServletRequest httpServletRequest = (HttpServletRequest)request;
        System.out.println(getClass().getSimpleName()+"-onAccessDenied：拦截"+httpServletRequest.getRequestURL()+",执行登录操作");
        return super.onAccessDenied(request, response);
    }

    private String getFailureMsg(AuthenticationException ae) {
    	String msg ;
        if(ae instanceof UnknownAccountException)
            msg = "账号不存在";
        else if(ae instanceof IncorrectCredentialsException)
            msg = "密码错误";
        else if(ae instanceof LockedAccountException)
            msg = "帐号被锁定";
        else if(ae instanceof DisabledAccountException)
            msg = "帐号被禁用";
        else if(ae instanceof ExcessiveAttemptsException)
            msg = "登录失败次数过多";
        else if(ae instanceof ExpiredCredentialsException)
            msg = "凭证过期";
        else
            msg = ae.getMessage();
        return msg;
    }

    protected String getCaptcha(ServletRequest request) {
        return WebUtils.getCleanParam(request, this.getCaptchaParam());
    }

    public String getCaptchaParam() {
        return captchaParam;
    }

    public void setCaptchaParam(String captchaParam) {
        this.captchaParam = captchaParam;
    }
}
