package com.test.mylogin.shiro;

import java.sql.Timestamp;

/**
 * Created by ucs_xiaokailin on 2017/5/19.
 */
public class LoginUser {
    private String id;
    private String userName;    //用户名
    private String nickName;    //昵称
    private Timestamp loginTime;


    public LoginUser(String id, String userName, String nickName) {
        this.id = id;
        this.userName = userName;
        this.nickName = nickName;
        this.loginTime = new Timestamp(System.currentTimeMillis());
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Timestamp getLoginTime() {
        return loginTime;
    }

    public void setLoginTime(Timestamp loginTime) {
        this.loginTime = loginTime;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }
}
