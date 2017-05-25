/*
 * 参数，带child开头的参数必须是要有子菜单才生效
 * （所有子导航的隐藏与显示都是通过添加和删除样式来控制）
 * className
 * data:[
 *    name:标题,
 *    href:链接地址,
 *    active:当前选中状态
 *    target：打开方式
 *    icon:默认不显示
 *    children：[子菜单，同样包括name,href,active,target
 *       //以下有子菜单才有效
 *       childShow:true/false 默认子菜单是否展开，默认为false
 *    ]
 *]
 * childShowType:click,mouseover,鼠标点击或经过显示
 * bodyClick:点击空白处允许菜单收起来，一般不设置
 * */
//obj为要绑定事件的元素，ev为要绑定的事件，fn为绑定事件的函数
function myAddEvent(obj, ev, fn) {
    if (obj.attachEvent) {
        obj.attachEvent("on" + ev, fn);
    }
    else {
        obj.addEventListener(ev, fn, false);
    }
}
function myRemoveEvent(obj, ev, fn) {
    if (obj.attachEvent) {
        obj.detachEvent("on" + ev, fn);
    }
    else {
        obj.removeEventListener(ev, fn, false);
    }
}
function findParentNode(elem, cls) {
    if (elem.nodeName.toUpperCase() === "BODY") {
        return false;
    } else if (elem.className.search(cls) > -1) {
        return elem;
    } else {
        return findParentNode(elem.parentNode, cls);
    }
}
var classnames = require("classnames");
var Nav = React.createClass({
    getInitialState: function () {
        return {}
    },
    getDefaultProps: function () {
        return {childShowType: 'click', bodyClick: true}
    },
    _handleClick: function (key) {
        var ref = this.refs['keyul' + key];
        if (ref.className == 'children') {
            ref.className = 'children show'
        } else {
            ref.className = 'children'
        }
        this.props.bodyClick ?
            myAddEvent(document, 'click', this._handleBodyClick.bind(this, key)) : ""
    },
    _handleBodyClick: function (key, e) {
        var a = findParentNode(e.srcElement, 'ucs-menu-li-' + key);
        if (a === false) {
            this.refs['keyul' + key].className = 'children'
        }
    },
    _handleMouseOver: function (key) {
        this.refs['keyul' + key].className = 'children show';
        this.refs['key' + key].className = 'hover has-child ucs-menu-li-' + key;
    },
    _handleMouseLeave: function (key) {
        this.refs['keyul' + key].className = 'children';
        this.refs['key' + key].className = 'has-child ucs-menu-li-' + key;
    },
    componentWillUnmount: function () {
        this.state.bodyClick ?
            myRemoveEvent(document, 'click', this._handleBodyClick) : "";
    },
    componentWillMount: function () {
        this.index = 0;
    },
    MenuMap: function (props) {
        return (
            props && props.map(function (child, index) {
                var event = '';
                this.index++;

                if (child.children && this.props.childShowType === 'click') {
                    event = 'click';
                } else if (child.children && this.props.childShowType === 'mouseover') {
                    event = 'mouseover';
                }
                var rli = '';
                if(child.children){rli='ucs-menu-li-' + this.index}
                var li = {
                        className: classnames({'active': child.active}, {'has-child': child.children}, rli),
                        onClick: event === 'click' ? this._handleClick.bind(this, this.index) : "",
                        onMouseOver: event === 'mouseover' ? this._handleMouseOver.bind(this, this.index) : "",
                        onMouseLeave: event === 'mouseover' ? this._handleMouseLeave.bind(this, this.index) : "",
                        ref: 'key' + this.index
                    }
                    ;
                return (
                    <li {...li}>
                        {child.icon ? <i className={child.icon}></i> : ""}
                        {child.href ?
                            <a href={child.href} target={child.target}
                               className={classnames({'active': child.active})}>{child.name}</a> :
                            <span className={classnames({'active': child.active})}>{child.name}</span>
                        }
                        {child.children ?
                            <ul className={classnames('children',{'show':child.childShow})}
                                ref={"keyul"+this.index}>
                                {this.MenuMap(child.children)}
                            </ul>
                            : ""}
                    </li>
                );
            }.bind(this))
        )
    },
    render: function () {
        return (
            <div className={classnames('ucs-nav clearfix',this.props.className)}>
                <ul>
                    {this.MenuMap(this.props.data)}
                </ul>
            </div>
        )
    }
});
module.exports = Nav;