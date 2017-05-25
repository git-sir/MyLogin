//太多if了，得优化，
//只定义几个规则作测试

/*
 * 验证不通过时返回错误提示信息，成功时返回空
 * */
var Validaterules = function (v, rules) {
        var digits = /^[0-9]*[1-9][0-9]*$/;
        var rules = {
            digits:/^[0-9]*[1-9][0-9]*$/,
            number:/^\d+(\.\d+)?$/,
            mobile:/^1[3|4|5|7|8]\d{9}$/,
            mail:/^[a-z0-9._%-]+@([a-z0-9-]+\.)+[a-z]{2,4}$|^1[3|4|5|7|8]\d{9}$/

        };
        var results = [];
        for (var i = 0; i < rules.length; i++) {
            var r = rules[i];
            var type = r.type;
            if (type === "required" && v === "") {
                results = rules[i].msg;
                break;
            }
            else if (type === "maxlength" && v !== "" && parseInt(v.length) > parseInt(r.maxlength)) {
                results = r.msg;
                break;
            }
            else if (type === "digits" && v !== "") {
                //整数
                var m = /^[0-9]*[1-9][0-9]*$/;
                if (!m.test(v)) {
                    results = r.msg;
                    break;
                } else {
                    results = "";
                }
            }
            else if (type === "number" && v !== "") {
                var m = /^\d+(\.\d+)?$/;
                if (!m.test(v)) {
                    results = r.msg;
                    break;
                } else {
                    results = "";
                }
            }
            else if (type === "mobile" && v !== "") {
                var m = /^1[3|4|5|7|8]\d{9}$/;
                if (!m.test(v)) {
                    results = r.msg;
                    break;
                } else {
                    results = "";
                }
            }
            else if (type === "mail" && v !== "") {
                var m = /^[a-z0-9._%-]+@([a-z0-9-]+\.)+[a-z]{2,4}$|^1[3|4|5|7|8]\d{9}$/;
                if (!m.test(v)) {
                    results = r.msg;
                    break;
                } else {
                    results = "";
                }
            }
            else if (type === "rule" && v !== "") {
                var m = eval(r.rule);
                if (!m.test(v)) {
                    results = r.msg;
                    break;
                } else {
                    results = "";
                }
            }
            else if (type === "fn") {
                // console.log(!rules[i].validator(v));
                if (!rules[i].validator(v)) {
                    results = r.msg;
                    break;
                } else {
                    results = "";
                }
            }

            else {
                results = "";
            }
        }
        return results;
    }
    ;
module.exports = Validaterules;