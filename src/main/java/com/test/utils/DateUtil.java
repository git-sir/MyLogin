package com.test.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by ucs_xiaokailin on 2017/6/2.
 */
public class DateUtil {
    public static String format(Long millisecond){
        Date time = new Date(millisecond);
        SimpleDateFormat formatter;
        formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return formatter.format(time);
    }
}
