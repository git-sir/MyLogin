window.UcsmyIndex = window.UcsmyIndex || {};

UcsmyIndex.printLog = function(msg){
    console.log("打印日志："+msg);
}
/**
 * 模拟form表单的提交
 */
UcsmyIndex.Post = function (url, paramters) {
    //创建form表单
    var form = $("<form method='post'></form>");
    form.attr('action', url)
    //添加参数
    for (var i in paramters) {
        if (!paramters.hasOwnProperty(i))
            continue;
        var value = paramters[i];
        form.append($("<input/>").attr('name', i).attr('value', value));
    }
    $("body").append(form);
    form.submit()
};


