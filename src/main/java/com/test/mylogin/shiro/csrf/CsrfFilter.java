package com.test.mylogin.shiro.csrf;

import com.test.mylogin.shiro.csrf.TokenRepository.CsrfTokenRepository;
import com.test.mylogin.shiro.csrf.token.CsrfToken;
import org.apache.shiro.SecurityUtils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;

public class CsrfFilter implements Filter {
	public static final RequiresCsrfMatcher DEFAULT_CSRF_MATCHER = new RequiresCsrfMatcher();

	private RequiresCsrfMatcher requiresCsrfMatcher;
	private CsrfTokenRepository tokenRepository;

	public CsrfFilter(CsrfTokenRepository tokenRepository) {
		this.requiresCsrfMatcher = DEFAULT_CSRF_MATCHER;
		this.tokenRepository = tokenRepository;
	}

	@Override
	public void init(FilterConfig paramFilterConfig) throws ServletException {
	}

	@Override
	public void destroy() {
	}
	
	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
			throws IOException, ServletException {
		//若接收到请求不是http请求则直接抛异常
		if (!(servletRequest instanceof HttpServletRequest && servletResponse instanceof HttpServletResponse)) {
			throw new ServletException("CsrfFilter just supports HTTP requests");
		}
		HttpServletRequest request = (HttpServletRequest) servletRequest;
		System.out.println(getClass().getSimpleName()+"-doFilter方法：拦截到的url为:"+request.getRequestURL());
		HttpServletResponse response = (HttpServletResponse) servletResponse;
		/**
		 * 若拦截到的URL中带有code参数，说明此URL是由统一认证中心重定向过来的。code参数表示oauth2认证中的授权码，即当前
		 * 应用向统一认证中心请求授权码，统一认证中心会将请求重定向到应用提供的回调URL并附带上code参数。
		 * 若拦截到的URL中没有code参数，说明当前URL不是统一认证中心发过来的，而是一条普通的URL请求
		 */
		String code = request.getParameter("code");
		if(code==null){
			System.out.println("拦截到的URL中没有code参数");
			/**
			 * 拦截到的URL中没有code参数，并且此时用户未登录，则请求往后传递
			 */
			if (!SecurityUtils.getSubject().isAuthenticated()) {
				System.out.println("拦截到的URL("+request.getRequestURL()+")中没有带code参数，并且此时用户未登录，将请求继续往后传递");
				filterChain.doFilter(servletRequest, servletResponse);
				return;
			}
			System.out.println("拦截到的URL("+request.getRequestURL()+")中没有带code参数，并且此时用户已登录");
		}
		/**
		 * 拦截到的URL中带有code参数，又或者code参数对应的值为null但是此时用户已登录，则执行以下代码
		 */
		//从session中取出csrfToken
		CsrfToken csrfToken = this.tokenRepository.loadToken(request);
		boolean missingToken = csrfToken == null;

		if(missingToken){
			System.out.println("从session中获取的csrfToken为null，现在创建一个新的csrfToken");
			//若csrfToken为null，则创建一个
			csrfToken = this.tokenRepository.generateToken(request);
			this.tokenRepository.saveToken(csrfToken, request, response);
		}
		//把csrfToken以指定的key存入request对象，从而在Thymeleaf模板文件中可以通过${key}方式取出
		request.setAttribute(CsrfToken.class.getName(), csrfToken);
		System.out.println("把csrfToken以"+CsrfToken.class.getName()+"为key存入request对象");
		request.setAttribute(csrfToken.getParameterName(), csrfToken);
		System.out.println("把csrfToken以"+csrfToken.getParameterName()+"为key存入request对象");
		request.setAttribute(csrfToken.getTokenType(), csrfToken);
		System.out.println("把csrfToken以"+csrfToken.getTokenType()+"为key存入request对象");

		//判断当前的http请求的类型是否属于需要被进行Csrf校验的类型(只有POST类型的请求才需要被进行Csrf校验)
		if (!this.requiresCsrfMatcher.matches(request)) {
			System.out.println("当前的Http请求的类型为"+request.getMethod()+",不需要被进行Csrf校验");
			filterChain.doFilter(servletRequest, servletResponse);
			return;
		}
		System.out.println("当前的Http请求的类型为"+request.getMethod()+",需要被进行Csrf校验");

		String actualToken = request.getHeader(csrfToken.getHeaderName());
		if (actualToken == null) {
			actualToken = request.getParameter(csrfToken.getParameterName());
			System.out.println("从请求头"+csrfToken.getHeaderName()+"中获取不到csrfToken,转而从请求参数"+csrfToken.getParameterName()+"中获取csrfToken="+actualToken);
		}else{
			System.out.println("从请求头"+csrfToken.getHeaderName()+"中获取csrfToken="+actualToken);
		}

		if (csrfToken.getToken().equals(actualToken)) {
			System.out.println("前端发送过来的请求中携带的csrfToken和后端session中存储的csrfToken相同，Csrf校验通过，请求继续往后传递");
			filterChain.doFilter(servletRequest, servletResponse);
			return;
		}

		System.out.println("前端发送过来的请求中携带的csrfToken和后端session中存储的csrfToken不同，Csrf校验不通过");
		//Csrf校验不通过
		if (missingToken) {
			System.out.println("Csrf校验不通过：当前后端的session已被销毁，所以重新创建了csrfToken，新建的csrfToken肯定和前端的csrfToken不同");
			//后端的csrfToken是由于此时session被销毁而重新创建的
			response.sendError(444, "Could not verify the provided CSRF token because your session was not found.");
		} else {
			System.out.println("Csrf校验不通过：后端从session中取出的csrfToken和前端的csrfToken不同，前端发送过来的csrfToken是一个无效的csrfToken");
			//后端的csrfToken是由于此时session被销毁而重新创建的
			response.sendError(444, "Invalid CSRF Token \'" + actualToken + "\' was found on the request parameter \'" + csrfToken.getParameterName() + "\' or header \'" + csrfToken.getHeaderName() + "\'.");
		}
	}

	private static final class RequiresCsrfMatcher {
        private final HashSet<String> allowedMethods;

        private RequiresCsrfMatcher() {
            this.allowedMethods = new HashSet<>(Arrays.asList(new String[]{"GET", "HEAD", "TRACE", "OPTIONS"}));
        }

        public boolean matches(HttpServletRequest request) {
            return !this.allowedMethods.contains(request.getMethod());
        }
    }
}
