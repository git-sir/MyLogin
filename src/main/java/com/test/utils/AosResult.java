package com.test.utils;

/**
 * Created by ucs_liyuan on 2017/4/11.
 */
public class AosResult {
    private String retcode;
    private Object data;
    private String retmsg;


    public AosResult() {

    }

    public AosResult(int retcode) {
        this.retcode = String.valueOf(retcode);
    }

    public AosResult(int retcode, Object data, String retmsg) {
        this.data = data;
        this.retmsg = retmsg;
        this.retcode = String.valueOf(retcode);
    }
    public AosResult(String retcode, Object data, String retmsg) {
        this.data = data;
        this.retmsg = retmsg;
        this.retcode = retcode;
    }
    public String getRetcode() {
        return retcode;
    }

    public void setRetcode(String retcode) {
        this.retcode = retcode;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getRetmsg() {
        return retmsg;
    }

    public void setRetmsg(String retmsg) {
        this.retmsg = retmsg;
    }

    public static AosResult retSuccessMsg(String retmsg, Object data) {
        return new AosResult(0, data, retmsg);
    }
    
    public static AosResult retSuccessMsg(String retmsg) {
        return new AosResult(0, null, retmsg);
    }
    
    public static AosResult retFailureMsg(String retmsg, Object data) {
        return new AosResult(-1, data, retmsg);
    }
    
    public static AosResult retFailureMsg(String retmsg) {
        return new AosResult(-1, null, retmsg);
    }
}
