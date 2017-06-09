package com.test.mylogin.shiro.csrf.TokenRepository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.test.mylogin.shiro.csrf.token.CsrfToken;
import com.test.mylogin.shiro.csrf.token.Token;
import com.test.utils.JsonUtils;
import com.test.utils.StringAndNumberUtil;
import org.slf4j.LoggerFactory;
import org.springframework.util.Assert;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.UUID;



public class HttpSessionCsrfTokenRepository implements CsrfTokenRepository {
	private static final String DEFAULT_CSRF_PARAMETER_NAME = "_csrf";
    private static final String DEFAULT_CSRF_HEADER_NAME = "X-CSRF-TOKEN";
    private static final String TOKEN_TYPE = "token_type";
    private static final String TYPE_ACCESS_TOKEN = "ACCESS";
    private static final String TYPE_LOCAL_TOKEN = "LOCAL";

    private static final String DEFAULT_CSRF_TOKEN_ATTR_NAME = HttpSessionCsrfTokenRepository.class.getName().concat(".CSRF_TOKEN");
    private String parameterName = DEFAULT_CSRF_PARAMETER_NAME;
    private String headerName = DEFAULT_CSRF_HEADER_NAME;
    private String token_type = TOKEN_TYPE;
    private String sessionAttributeName;

    public HttpSessionCsrfTokenRepository() {
        this.sessionAttributeName = DEFAULT_CSRF_TOKEN_ATTR_NAME;
    }
//    @Autowired
//    Oauth2Http oauth2Http;
//    @Autowired
//    ManageUserAccountService manageUserAccountService;
//    @Autowired
//    SysTokenManagerService sysTokenManagerService;
//
//    @Autowired
//    private LoginTypeConfig loginTypeConfig;
//
//    @Autowired
//    ManageUserOauth2RelMapper manageUserOauth2RelMapper;

    public void saveToken(CsrfToken token, HttpServletRequest request, HttpServletResponse response) {
        try {
            System.out.println("HttpSessionCsrfTokenRepository-saveToken：csrfToken="+ JsonUtils.formatObjectToJson(token));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        HttpSession session;
        if(token == null) {
            session = request.getSession(false);
            if(session != null) {
                session.removeAttribute(this.sessionAttributeName);
            }
        } else {
            session = request.getSession();
            session.setAttribute(this.sessionAttributeName, token);
            System.out.println("HttpSessionCsrfTokenRepository-saveToken：把csrfToken以"+this.sessionAttributeName+"为key存入session对象");
        }

    }

    public CsrfToken loadToken(HttpServletRequest request) {
        System.out.println("HttpSessionCsrfTokenRepository-loadToken：从session中获取csrfToken");
        HttpSession session = request.getSession(false);
        if(session == null){
            System.out.println("HttpSessionCsrfTokenRepository-loadToken：当前session为null,无法从中获取csrfToken");
        }else{
            System.out.println("HttpSessionCsrfTokenRepository-loadToken：当前session不为null，从中获取到csrfToken");
        }
        /**
         * getSession(false)：如果找不到Session就返回null
         * getSession(true) <==> getSession()：如果找不到Session没有就创建一个Session并返回；
         */
        //sessionAttributeName的值为"HttpSessionCsrfTokenRepository类的全路径.CSRF_TOKEN"
        return session == null ? null : (CsrfToken)session.getAttribute(this.sessionAttributeName);
    }

	public CsrfToken generateToken(HttpServletRequest request) {

        Token token =  new Token(this.headerName, this.parameterName, TYPE_LOCAL_TOKEN, this.createNewToken());
        if (StringAndNumberUtil.isNull(request.getParameter(token_type))) {
            //拦截到的URL中没有带token_type参数
            System.out.println("HttpSessionCsrfTokenRepository：拦截到的URL("+request.getRequestURI()+")中没有带"+token_type+"参数");
//            token =this.getAccessToken(token, request);
        } else {
            System.out.println("HttpSessionCsrfTokenRepository：拦截到的URL("+request.getRequestURI()+")中有带"+token_type+"参数");
            //拦截到的URL中有带token_type参数，其值为LOCAL
            if (request.getParameter(token_type).equals(TYPE_LOCAL_TOKEN)) {
                System.out.println("token_type参数的值为"+TYPE_LOCAL_TOKEN+"，接下来创建CsrfToken");
                //创建CsrfToken
                token = new Token(this.headerName, this.parameterName, TYPE_LOCAL_TOKEN, this.createNewToken());
                try {
                    System.out.println("CsrfToken的内容："+ JsonUtils.formatObjectToJson(token));
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                }
            }
            //拦截到的URL中有带token_type参数，其值为ACCESS
            if (request.getParameter(token_type).equals(TYPE_ACCESS_TOKEN)){
                System.out.println("token_type参数的值为"+TYPE_ACCESS_TOKEN);
//                token =this.getAccessToken(token, request);
            }
        }

        return token;
	}


    public void setParameterName(String parameterName) {
        Assert.hasLength(parameterName, "parameterName cannot be null or empty");
        this.parameterName = parameterName;
    }

    public void setHeaderName(String headerName) {
        Assert.hasLength(headerName, "headerName cannot be null or empty");
        this.headerName = headerName;
    }

    public void setSessionAttributeName(String sessionAttributeName) {
        Assert.hasLength(sessionAttributeName, "sessionAttributename cannot be null or empty");
        this.sessionAttributeName = sessionAttributeName;
    }

  
	private String createNewToken() {
        return UUID.randomUUID().toString();
    }

//	public CsrfToken generateToken(HttpServletRequest request, String accessCode) {
//		 return new Token(this.headerName, this.parameterName,  TYPE_ACCESS_TOKEN,this.getoauth2Token(accessCode));
//	}

//    @Override
//	public String getoauth2Token(String accessCode) {
//
//        String token="";
//		try {
//              token =  oauth2Http.getAccessToken(accessCode);
//
//		} catch (Exception e) {
//            log.debug("HttpSessionCsrfTokenRepository",e);
//		}
//        return token;
//	}

    /****
     * 是否由统一认证登录成功回调
     * 1.来源有统一认证标识
     * 2.请求带code参数
     * @return
     */
//    @Override
//    public boolean isOauthLoginSuccess(HttpServletRequest request) {
//
//            if(loginTypeConfig.getLocalType())
//                return false;
//            String code = request.getParameter("code");
//            if(code!= null )
//                return true;
//                return false;
//
//    }

//    @Override
//    public void addUserOauthRel(Subject subject) {
//        if(loginTypeConfig.getLocalType())
//            return;
//        ShiroRealmImpl.LoginUser user = (ShiroRealmImpl.LoginUser) subject.getPrincipal();
//       String openId = sysTokenManagerService.getSysLoginToken("openId");
//        ManageUserOauth2Rel manageUserOauth2Rel = manageUserOauth2RelMapper.selectByOpenid(openId);
//        if (manageUserOauth2Rel==null)
//        {
//            manageUserOauth2Rel = new ManageUserOauth2Rel();
//            manageUserOauth2Rel.setOpenId(openId);
//            manageUserOauth2Rel.setUserId(user.getId());
//            manageUserOauth2Rel.setUuid(UUIDGenerator.generate());
//            manageUserOauth2RelMapper.insert(manageUserOauth2Rel);
//        }
//    }

    @Override
    public void removeToken( HttpServletRequest request) {
        HttpSession session = request.getSession(false);
         session.getAttribute(this.sessionAttributeName);
    }

    /**
     * 如果有授权码code，用授权码向统一认证中心申请accessToken
     */
//    public Token getAccessToken(Token token, HttpServletRequest request) {
//        String code = request.getParameter("code");
//        if (!(StringAndNumberUtil.isNull(code))){
//            Token accessToken = new Token(this.headerName, this.parameterName, TYPE_LOCAL_TOKEN, this.getoauth2Token(code));
//            String account = manageUserAccountService.getAccountByOprenid(sysTokenManagerService.getSysLoginToken("openId"));
//            if (accessToken!=null&& !(StringAndNumberUtil.isNull(account))
//                    && !accessToken.getToken().equals("false")) {
//                    Boolean bo = oauth2Http.userLogin(account);
//                    if (bo) {
//                        token = accessToken;
//                    }
//
//            }
//        }
//        return token;
//    }
}
