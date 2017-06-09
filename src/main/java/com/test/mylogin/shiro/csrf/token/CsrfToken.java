package com.test.mylogin.shiro.csrf.token;

import java.io.Serializable;

public interface CsrfToken extends Serializable {
	String getHeaderName();

    String getParameterName();

    String getToken();
    
    String getTokenType();
}
