// UcsmyIndex参数在html上定义

// 动态加载组件
var timestamp = Date.parse(new Date());
UcsmyIndex.loadComponent = function(url, successFn, errorFn) {
	$.ajax({
		url: url + "?_=" + timestamp,
		dataType: "script",
		cache: true,
		success: function() {
			if (successFn) {
				successFn(myPanel);
			}
		},
		error: function() {
			if (errorFn) {
				errorFn();
			}
		}
	});
}

//增加csrf到默认header
var meta = document.getElementsByTagName('meta');
var csrf = meta['_csrf'].getAttribute("content");
var csrfHeader = meta['_csrf_header'].getAttribute("content");
//var tokenType = meta['token_type'].getAttribute("content");
/** 重写jqery ajax post get方法 */
var _ajax = $.ajax;
$.ajax = function(opt) {
	// 备份opt中error和success方法
	var fn = {
		error: function(XMLHttpRequest, textStatus, errorThrown) {
		},
		success: function(data, textStatus) {
		}
	}
	if (opt.error) {
		fn.error = opt.error;
	}
	if (opt.success) {
		fn.success = opt.success;
	}
	
	if(!opt.headers) {
		opt.headers = {};
	}
	opt.headers[csrfHeader] = csrf;
	opt.headers['token_type']="LOCAL";
	// 扩展增强处理
	var _opt = $.extend(opt, {
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			// 错误方法增强处理
			_error(XMLHttpRequest, function(){
				fn.error(XMLHttpRequest, textStatus, errorThrown);
			});
		},
		success: function(data, textStatus) {
			// 成功回调方法增强处理
			fn.success(data, textStatus);
		}
	});
	return _ajax(_opt);
};

var _post = $.post;
$.post = function(a, c, d, e) {
	var me = this;
	this._error;
	this._ppp = {
		error: function(fn){
			me._ppp._error = fn;
			return me._ppp;
		},
		_error: function() {}
	};
	_post(a, c, d, e).error(function(xhr, errorText, errorType) {
		_error(xhr, function(){
			me._ppp._error(xhr, errorText, errorType);
		});
	});
	return this._ppp;
};

var _get = $.get;
$.get = function(a, c, d, e) {
	var me = this;
	this._error;
	this._ppp = {
		error: function(fn){
			me._ppp._error = fn;
			return me._ppp;
		},
		_error: function() {}
	};
	_get(a, c, d, e).error(function(xhr, errorText, errorType) {
		_error(xhr, function(){
			me._ppp._error(xhr, errorText, errorType);
		});
	});
	return this._ppp;
};

_error = function(XMLHttpRequest, bfn) {
	if(XMLHttpRequest.status == 401) {
		UcsmyIndex.alert("失败", "权限不足");
	} else if(XMLHttpRequest.status == 403) {
		UcsmyIndex.confirm("登录异常", "登录失效，是否重新登录？", function() {
			window.location.reload();
		});
	} else if(XMLHttpRequest.status == 444) {
		UcsmyIndex.confirm("登录异常", "登录信息失效，是否刷新或重新登录？", function() {
			window.location.reload();
		});
	} else {
		bfn();
	}
}

$(window).resize(function () {
	//resizeContent();
});

UcsmyIndex.fn = {};
UcsmyIndex.fn.isEmpty = function(valueStr) {
	if(valueStr == null || valueStr == undefined || valueStr == "") {
		return true;
	}
	return false;
}

// 在content上增加class
UcsmyIndex.addContentClassName = function(className) {
	$(".content").addClass(className);
};
// 重置content的class
UcsmyIndex.resetContentClassName = function() {
	var content = $(".content");
	content.removeClass();
	content.addClass("content");
}
