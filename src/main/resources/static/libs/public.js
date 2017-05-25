/**
 * Created by Administrator on 2017/3/2.
 */
(function() {
    if (!document.getElementsByClassName) {
        var indexOf = [].indexOf || function(prop) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i] === prop) return i;
                }
                return -1;
            };
        _getElementsByClassName_ = function(className, context) {
            var elems = document.querySelectorAll ? context.querySelectorAll("." + className) : (function() {
                var all = context.getElementsByTagName("*"),
                    elements = [],
                    i = 0;
                for (; i < all.length; i++) {
                    if (all[i].className && (" " + all[i].className + " ").indexOf(" " + className + " ") > -1 && indexOf.call(elements, all[i]) === -1) elements.push(all[i]);
                }
                return elements;
            })();
            return elems;
        };
        document.getElementsByClassName = function(className) {
            return _getElementsByClassName_(className, document);
        };

        if(Element) {
            Element.prototype.getElementsByClassName = function(className) {
                return _getElementsByClassName_(className, this);
            };
        }
    }
})();

function getElementsByClassName(classStr,tagName){
    if (document.getElementsByClassName) {
        return document.getElementsByClassName(classStr);
    }else {
        var nodes = document.getElementsByTagName(tagName),ret = [];
        for(var i = 0; i < nodes.length; i++) {
            if(hasClass(nodes[i],classStr)){
                ret.push(nodes[i])
            }
        }
        return ret;
    }
}
function hasClass(tagStr,classStr){
    var arr=tagStr.className.split(/\s+/ ); //这个正则表达式是因为class可以有多个,判断是否包含
    for (var i=0;i<arr.length;i++){
        if (arr[i]==classStr){
            return true ;
        }
    }
    return false ;
}

function resize() {
    if (window.innerHeight){
        winHeight = window.innerHeight;
    }else if ((document.body) && (document.body.clientHeight)){
        winHeight = document.body.clientHeight;
    }
    var paneloffsetTop = document.getElementsByClassName('ucs-tabs-tabpane')[0].offsetTop;
    var panelHeight = winHeight-paneloffsetTop-107;
    document.getElementsByClassName('ucs-tabs-content')[0].setAttribute('style', 'height:'+panelHeight+'px');
};

function resizeContent() {
    if (window.innerHeight){
        winHeight = window.innerHeight;
    }else if ((document.body) && (document.body.clientHeight)){
        winHeight = document.body.clientHeight;
    }
    var contentoffsetTop = document.getElementsByClassName('content')[0].offsetTop;
    var contentHeight = winHeight-contentoffsetTop-40;
    document.getElementsByClassName('content')[0].setAttribute('style', 'height:'+contentHeight+'px');
    document.getElementsByClassName('leftMenu')[0].setAttribute('style', 'height:'+(contentHeight+40)+'px');
};

function _addButtonDisabled (id) {
    $("#"+id).attr('disabled', 'disabled');
    $("#"+id).removeClass('ucs-btn-bidnow');
    $("#"+id).addClass('ucs-btn-cancel');
    $("#"+id).attr('style', 'cursor: not-allowed');
};

function _removeButtonDisabled (id) {
    $("#"+id).removeAttr('disabled');
    $("#"+id).removeAttr('style');
    $("#"+id).removeClass('ucs-btn-cancel');
    $("#"+id).addClass('ucs-btn-bidnow');
};
