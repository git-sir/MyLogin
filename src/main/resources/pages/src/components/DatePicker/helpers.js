/**
 * Created by Administrator on 2017/2/10.
 */
Date.prototype.format = function (format) {
    var o =
    {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

var jeDt = {}, doc = document, ymdMacth = /\w+|d+/g;

//判断类型
jeDt.isType = function(obj, type) {
    type = type.replace(/\b(\w)|\s(\w)/g, function(m) {
        return m.toUpperCase();
    });
    return Object.prototype.toString.call(obj) === "[object " + type + "]";
};
//循环
jeDt.each = function(obj, fn) {
    if (jeDt.isType(obj, "array")) {
        for (var i = 0, len = obj.length; i < len; i++) {
            if (fn.call(obj[i], i, obj[i]) === false) break;
        }
    } else {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (fn.call(obj[key], key, obj[key]) === false) break;
            }
        }
    }
};
//获取与设置自定义属性
jeDt.attr = function(elem, key, val) {
    if (typeof key === "string" && typeof val === "undefined") {
        return elem.getAttribute(key);
    } else {
        elem.setAttribute(key, val);
    }
    return this;
};
jeDt.stopmp = function(e) {
    e = e || window.event;
    e.stopPropagation ? e.stopPropagation() :e.cancelBubble = true;
    return this;
};
//查询样式是否存在
jeDt.hasClass = function(elem, cls) {
    elem = elem || {};
    return new RegExp("\\b" + cls + "\\b").test(elem.className);
};
//添加样式
jeDt.addClass = function(elem, cls) {
    elem = elem || {};
    jeDt.hasClass(elem, cls) || (elem.className += " " + cls);
    elem.className = elem.className.replace(/^\s|\s$/g, "").replace(/\s+/g, " ");
    return this;
};
//删除样式
jeDt.removeClass = function(elem, cls) {
    elem = elem || {};
    if (jeDt.hasClass(elem, cls)) {
        elem.className = elem.className.replace(new RegExp("(\\s|^)" + cls + "(\\s|$)"), "");
    }
    return this;
};
//获取样式
jeDt.getStyle = function(elem, style) {
    var cssVal = document.defaultView ? window.getComputedStyle(elem, null)[style] : elem.currentStyle[style];
    return cssVal;
}
jeDt.isShow = function(elem, bool) {
    elem.style.display = bool != true ? "none" :"block";
};
//获取与设置HTML
jeDt.html = function(elem, value) {
    if (typeof value != "undefined" || value !== undefined && elem.nodeType === 1) {
        elem.innerHTML = value;
    } else {
        return elem.innerHTML;
    }
    return this;
};
//获取与设置文本
jeDt.text = function(elem, value) {
    if (value !== undefined && elem.nodeType === 1) {
        document.all ? elem.innerText = value :elem.textContent = value;
    } else {
        var emText = document.all ? elem.innerText :elem.textContent;
        return jeDt.trim(emText);
    }
    return this;
};
//获取与设置value
jeDt.val = function(elem, value) {
    if (value !== undefined && elem.nodeType === 1) {
        elem.value = value;
    } else {
        return jeDt.trim(elem.value);
    }
    return this;
};
jeDt.bind = function(elObj, type, fn) {
    type = type.toLowerCase();
    var bindevent = function (elem) {
        elem.attachEvent ? elem.attachEvent("on" + type, function() {
            fn.call(elem, window.type);
        }) :elem.addEventListener(type, fn, false);
    }
    return elObj == document ? bindevent(document) :jeDt.each(elObj, function(i, elem) {
        bindevent(elem);
    });
};
jeDt.docScroll = function(type) {
    type = type ? "scrollLeft" :"scrollTop";
    return doc.body[type] | doc.documentElement[type];
};
jeDt.winarea = function(type) {
    return doc.documentElement[type ? "clientWidth" :"clientHeight"];
};
//判断是否闰年
jeDt.isLeap = function(y) {
    return (y % 100 !== 0 && y % 4 === 0) || (y % 400 === 0);
}
//获取本月的总天数
jeDt.getDaysNum = function(y, m) {
    var num = 31;
    switch (parseInt(m)) {
        case 2:
            num = jeDt.isLeap(y) ? 29 : 28; break;
        case 4: case 6: case 9: case 11:
        num = 30; break;
    }
    return num;
}
//获取月与年
jeDt.getYM = function(y, m, n) {
    var nd = new Date(y, m - 1);
    nd.setMonth(m - 1 + n);
    return {
        y: nd.getFullYear(),
        m: nd.getMonth() + 1
    };
}
//获取上个月
jeDt.getPrevMonth = function(y, m, n) {
    return  jeDt.getYM(y, m, 0 - (n || 1));
}
//获取下个月
jeDt.getNextMonth = function(y, m, n) {
    return jeDt.getYM(y, m, n || 1);
}
//补齐数位
jeDt.digit = function(num) {
    return num < 10 ? "0" + (num | 0) :num;
};
//判断是否为数字
jeDt.IsNum = function(str){
    return (str!=null && str!="") ? !isNaN(str) : false;
};
jeDt.getLocalTime = function (timestamp, formatStr) {
    var date;
    var str;
    if (timestamp != null) {
        date = new Date(timestamp);
    } else {
        date = new Date();
    }
    if (formatStr == null) {
        str = Date.parse(date);
    } else {
        str = date.format(formatStr);
    }
    return str;
}
//计算距离指定日期diff天的日期
jeDt.getDiffDate = function (date, diff) {
    var number = null;
    var curdate = null;
    if (diff == null || diff == 0) {
        number = 0;
    } else {
        number = diff;
    }

    if (date == null) {
        curdate = new Date();
    } else {
        curdate = new Date(date);
    }

    var myday_milliseconds = curdate.getTime() + 1000 * 60 * 60 * 24 * number;
    var targetdate = jeDt.getLocalTime(myday_milliseconds, 'yyyy/MM/dd');
    return targetdate;
};
//获取date1~date2之间的日期数组
jeDt.getDateArr = function (date1, date2) {
    var dateArr = [];
    var diff = 0;

    var aDate, oDate1, oDate2, iDays, startDate, endDate;
    aDate = date1.split("/");
    oDate1 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]);  //转换为yyyy-MM-dd格式
    aDate = date2.split("-");
    oDate2 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]);
    iDays = parseInt((oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数

    if (iDays >= 0) {//date1大于date2情况
        startDate = date2;
        endDate = date1;
    } else {
        startDate = date1;
        endDate = date2;
    }

    while (jeDt.getDiffDate(startDate, diff) != endDate) {
        dateArr.push(jeDt.getDiffDate(startDate, diff));
        diff++;
    }
    dateArr.push(endDate);

    return dateArr;
}
//转换日期格式
jeDt.parse = function(ymd, hms, format) {
    ymd = ymd.concat(hms);
    var hmsCheck = jeDt.parseCheck(format, false).substring(0, 5) == "hh:mm", num = 2;
    return format.replace(/YYYY|MM|DD|hh|mm|ss/g, function(str, index) {
        var idx = hmsCheck ? ++num :ymd.index = ++ymd.index | 0;
        return jeDt.digit(ymd[idx]);
    });
};
jeDt.parseCheck = function(format, bool) {
    var ymdhms = [];
    format.replace(/YYYY|MM|DD|hh|mm|ss/g, function(str, index) {
        ymdhms.push(str);
    });
    return ymdhms.join(bool == true ? "-" :":");
};
jeDt.checkFormat = function(format) {
    var ymdhms = [];
    format.replace(/YYYY|MM|DD|hh|mm|ss/g, function(str, index) {
        ymdhms.push(str);
    });
    return ymdhms.join("-");
};
jeDt.parseMatch = function(str) {
    var timeArr = str.split(" ");
    return timeArr[0].match(ymdMacth);
};
//验证日期
jeDt.checkDate = function (date) {
    var dateArr = date.match(ymdMacth);
    if (isNaN(dateArr[0]) || isNaN(dateArr[1]) || isNaN(dateArr[2])) return false;
    if (dateArr[1] > 12 || dateArr[1] < 1) return false;
    if (dateArr[2] < 1 || dateArr[2] > 31) return false;
    if ((dateArr[1] == 4 || dateArr[1] == 6 || dateArr[1] == 9 || dateArr[1] == 11) && dateArr[2] > 30) return false;
    if (dateArr[1] == 2) {
        if (dateArr[2] > 29) return false;
        if ((dateArr[0] % 100 == 0 && dateArr[0] % 400 != 0 || dateArr[0] % 4 != 0) && dateArr[2] > 28) return false;
    }
    return true;
}
jeDt.trim = function(text) {
    return text.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}
//初始化日期
jeDt.nowDate = function(num, format) {
    format = format || 'YYYY-MM-DD hh:mm:ss';
    if(typeof num === "string"){
        var newDate = new Date(parseInt(num) * 1e3);
    }else{
        num = num | 0;
        var newDate = new Date(), todayTime = newDate.getTime() + 1000*60*60*24*num;
        newDate.setTime(todayTime);
    }
    var years = newDate.getFullYear(), months = newDate.getMonth() + 1, days = newDate.getDate(), hh = newDate.getHours(), mm = newDate.getMinutes(), ss = newDate.getSeconds();
    return jeDt.parse([ years, jeDt.digit(months), jeDt.digit(days) ], [ jeDt.digit(hh), jeDt.digit(mm), jeDt.digit(ss) ], format);
};
jeDt.montharr = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
jeDt.montharrs = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
jeDt.weeks = [ "日", "一", "二", "三", "四", "五", "六" ];
//判断元素类型
jeDt.isValHtml = function(that) {
    return /textarea|input/.test(that.tagName.toLocaleLowerCase());
};
//节日
jeDt.festival = function(md, n) {
    var str = "";
    switch (md) {
        case "1.1": str = "元旦"; break;
        case "2.14": str = "情人"; break;
        case "3.8": str = "妇女"; break;
        case "5.1": str = "劳动"; break;
        case "6.1": str = "儿童"; break;
        case "8.1": str = "建军"; break;
        case "9.10": str = "教师"; break;
        case "10.1": str = "国庆"; break;
        case "12.24": str = "平安"; break;
        case "12.25": str = "圣诞"; break;
        default: str = n; break;
    }
    return str;
};

module.exports = jeDt;