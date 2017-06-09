package com.test.mylogin.shiro.csrf.token;

import org.springframework.util.Assert;


public final class Token implements CsrfToken {
	private static final long serialVersionUID = 1L;
	private final String token;
    private final String parameterName;
    private final String headerName;
    private final String tokenType;
    //初始化无类型token
    public Token(String headerName, String parameterName, String token) {
      this(headerName,parameterName,token,"");
    }
    //初始化自定义类型token
    public Token(String headerName, String parameterName , String tokenType, String token) {
        Assert.hasLength(headerName, "headerName cannot be null or empty");
        Assert.hasLength(parameterName, "parameterName cannot be null or empty");
        Assert.hasLength(token, "token cannot be null or empty");
        this.headerName = headerName;
        this.parameterName = parameterName;
        this.token = token;
        this.tokenType = tokenType; 
    }

    public String getHeaderName() {
        return this.headerName;
    }

    public String getParameterName() {
        return this.parameterName;
    }

    public String getToken() {
        return this.token;
    }

	public String getTokenType() {
		return tokenType;
	}
	@Override
	public String toString() {
		return "DefaultCsrfToken [token=" + token + ", parameterName="
				+ parameterName + ", headerName=" + headerName + "]";
	}
}
