/*
 * title 标题
 * type 三种特殊情况text,success,failure
 * width 窗口宽
 * height 窗口高
 * className 样式名
 * showClose 显示关闭按钮，默认为true
 * closeBack 关闭回调
 * autoClose 是否自动关闭窗口，数值型，单位为秒，默认为0不自动关闭；
 * position　css样式位置，默认为fixed；只有absolute和fixed两种；
 * confirm　确定按钮文本，默认为空即不显示；
 * confirmBack　点击确定按钮后执行的函数，仅当confirm不为空时才会触发回调confirmback函数；当回调为空时，点击确定后默认关闭窗口；
 * cancel　取消按钮文本，默认为空即不显示；
 * cancelBack　取消回调，跟确定一样
 * afterBack　窗口加载完时执行的函数
 * move　允许窗口拖动，默认为true；
 * maskLayer　显示遮罩层
 * shadeClose　默认为flase;点击遮罩关闭 false不关闭
 * animation　弹出层css3动画效果，仅在支持的浏览器，默认为1。动画序号对应animation样式的layer-anim-*
 * id 窗口id
 * 
 */
var Button = require('../Button/index');
var classnames = require("classnames");
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
var Layer = React.createClass({
    getInitialState: function () {
        return {
            display: this.props.display,
            width: this.props.width,
            height: this.props.height,
            left: "",
            top: "",
            autoClose: this.props.autoClose,
            contentHeight: "", //内容区域高
            animation: this.props.animation
        }
    },
    getDefaultProps: function () {
        return {
            display: false,
            type: "",
            width: "",
            height: "",
            className: "",
            showClose: true,
            closeBack: "",
            position: "fixed",
            confirm: "",
            confirmBack: "",
            cancel: "",
            cancelBack: "",
            afterBack: "",
            animation: "layer-anim-1",
            maskLayer: true,
            shadeClose: false,
            move: true,
            autoClose: 0,
            id: ""
        }
    },
    componentWillMount: function () {
        //console.log("will");
    },
    componentDidMount: function () {
        //window.addEventListener("resize", this._handleResize);
        myAddEvent(window, 'resize', this._handleResize);
    },
    componentWillUnmount: function () {
        //this.props.shadeClose ?
        //  this.divEL.removeEventListener('click', this._handleMaskLayerClick) : "";
        //window.removeEventListener("resize", this._handleResize);
        //document.removeEventListener("mousemove", this._handleMouseMove);
        //document.removeEventListener("mouseup", this._handleMouseUp);
        this.props.shadeClose ?
            myRemoveEvent(this.divEL, 'resize', this._handleMaskLayerClick) : "";
        myRemoveEvent(window, 'resize', this._handleResize);
        myRemoveEvent(document, 'mousemove', this._handleMouseMove);
        myRemoveEvent(document, 'mouseup', this._handleMouseUp);
    },
    layerOpen: function () {
        this.setState({display: "block", animation: this.props.animation}, function () {
            this._setPosition();
        });
        //添加遮罩层
        //console.log(this.props.maskLayer);
        this.props.maskLayer ?
            this._maskLayer() : "";
        //窗口加载完回调
        this.props.afterBack ? this.props.afterBack() : "";
        //计算倒计时
        this.props.autoClose > 0 ?
            this._handleCountdown() : "";
    },
    layerClose: function () {
        this.setState({display: false, animation: ""});
        //移除遮罩层
        document.body.removeChild(this.divEL);
        if (this.props.shadeClose) {
            myRemoveEvent(this.divEL, 'click', this._handleMaskLayerClick);
            //this.divEL.removeEventListener('click', this._handleMaskLayerClick);
        }
        this.props.closeBack ? this.props.closeBack() : "";
        clearInterval(this.timer);
    },
    _handleResize: function () {
        //console.log("窗口改变");//传个参数进去，浏览器窗口缩放时不修改弹出层的宽高，只调整位置保持居中
        //确保窗口在显示状态才执行缩放，隐藏下取不到高
        this.state.display === "block" ?
            this._setPosition("resize") : "";
    },
    _handleCountdown: function () {
        //倒计时
        this.setState({autoClose: this.props.autoClose});
        clearInterval(this.timer);
        var i = this.props.autoClose;
        this.timer = setInterval(function () {
            i--;
            this.setState({autoClose: i});
            if (i == 0) {
                this.layerClose();
            }
        }.bind(this), 1000);
    },
    _maskLayer: function () {
        this.divEL = document.createElement('div');
        this.divEL.className = "layer-background";
        document.body.appendChild(this.divEL);
        this.props.shadeClose ?
            myAddEvent(this.divEL, 'click', this._handleMaskLayerClick) : "";
        //this.divEL.addEventListener("click", this._handleMaskLayerClick) : "";
    },
    _handleMaskLayerClick: function () {
        //遮罩层点击
        this.layerClose();
    },
    _setPosition: function (t) {
        /*this.windowWidth = window.innerWidth;//浏览器窗口宽
         this.windowHeight = window.innerHeight;//浏览器窗口高*/
        //浏览器窗口宽高兼容写法
        this.windowWidth = (document.documentElement.scrollWidth > document.documentElement.clientWidth) ? document.documentElement.scrollWidth : document.documentElement.scrollWidth;
        this.windowHeight = (document.documentElement.scrollHeight > document.documentElement.clientHeight) ? document.documentElement.scrollHeight : document.documentElement.clientHeight;

        //如果设定了高宽，则使用设定的
        this.layerWidth = this.state.width ? this.state.width : this.refs.ucslayer.offsetWidth;
        this.layerHeight = this.state.height ? this.state.height : this.refs.ucslayer.offsetHeight;
        this.layerHeight = this.layerHeight > this.windowHeight ? this.windowHeight : this.layerHeight;//如果弹层高度大于浏览器窗口高，则使用浏览器窗口高
        var scrollTop = 0;// 滚动条的高度
        if (this.props.position == "absolute") {
            if (document.documentElement && document.documentElement.scrollTop) {
                scrollTop = document.documentElement.scrollTop;
            }
            else if (document.body) {
                scrollTop = document.body.scrollTop;
            }
        }
        var left = (parseInt(this.windowWidth) - parseInt(this.layerWidth)) / 2;
        var top = (parseInt(this.windowHeight) - parseInt(this.layerHeight)) / 2 + scrollTop;
        if (t !== "resize") {
            this.setState({
                width: this.layerWidth,
                height: this.layerHeight
            });
        }
        this.setState({
            left: left,
            top: top < 0 ? 0 : top,
            contentHeight: parseInt(this.layerHeight) - parseInt(this.refs.layerHeader.offsetHeight)
        })
        ;
        //console.log(this.layerHeight);
    },
    _handleCloseClick: function () {
        //点击关闭时
        this.props.closeBack ? this.props.closeBack() : this.layerClose();
    },
    _handleConfirmClick: function () {
        //确认按钮点击时
        this.props.confirmBack ? this.props.confirmBack() : this.layerClose();
    },
    _handleCancelClick: function () {
        //取消按钮点击时
        this.props.cancelBack ? this.props.cancelBack() : this.layerClose();
    },
    _handleMousedown: function (e) {
        //console.log("mousedown");
        if (this.props.move) {
            this.mx = e.pageX - parseInt(this.state.left);
            this.my = e.pageY - parseInt(this.state.top);
            this.move = true;
            /*document.addEventListener("mousemove", this._handleMouseMove);
             document.addEventListener("mouseup", this._handleMouseUp);*/
            myAddEvent(document, 'mousemove', this._handleMouseMove);
            myAddEvent(document, 'mouseup', this._handleMouseUp);
        }
    },
    _handleMouseMove: function (e) {
        if (this.move) {
            e = event || window.event;
            /*var x = e.pageX - parseInt(this.mx);
             var y = e.pageY - parseInt(this.my);*/
            var x = e.clientX - parseInt(this.mx);
            var y = e.clientY - parseInt(this.my);

              //var documentHeight = document.body.scrollHeight;
             var documentHeight = document.documentElement.clientHeight;
             if (x <= 0) {
             x = 0
             } else if (x > parseInt(this.windowWidth) - parseInt(this.layerWidth)) {
             //window窗口宽－弹层宽
             x = parseInt(this.windowWidth) - parseInt(this.layerWidth)
             }
             if (y <= 0) {
             y = 0
             } else if (y > documentHeight - parseInt(this.layerHeight)) {
             y = documentHeight - parseInt(this.layerHeight)
             }
             this.setState({
             left: x,
             top: y
             });
             return false;
        }
    },
    _handleMouseUp: function () {
        this.move = false;
        /*document.removeEventListener("mousemove", this._handleMouseMove);
         document.removeEventListener("mouseup", this._handleMouseUp);*/
        myRemoveEvent(document, 'mousemove', this._handleMouseMove);
        myRemoveEvent(document, 'mouseup', this._handleMouseUp);

    },
    render: function () {
        var props = this.props;
        var style = {
            width: this.state.width,
            height: this.state.height,
            display: this.state.display ? "block" : "none",
            position: props.position,
            left: this.state.left,
            top: this.state.top
        };
        var bodyClass = classnames("ucs-layer-body", {"ucs-layer-text": props.type});
        var bodyContent = "";
        if (props.type === "text") {
            //纯文字
            bodyContent = (<div className="ucs-layer-txt">{props.children}</div>);
        } else if (props.type === "success") {
            //成功时
            bodyContent = (
                <div className="ucs-layer-success">
                    <i className="iconfont icon-success icon"></i>
                    {props.children}
                </div>
            )
        }
        else if (props.type === "failure") {
            //失败时
            bodyContent = (
                <div className="ucs-layer-failure">
                    <i className="iconfont icon-failure icon"></i>
                    {props.children}
                </div>
            )
        } else {
            //其它
            bodyContent = props.children
        }
        var close = (
                props.showClose ?
                    <a href="javascript:;" className="ucs-layer-close" onClick={this._handleCloseClick}></a> : ""
            )
            ;
        var button = "";
        if (props.confirm || props.cancel) {
            button = (
                <div className="ucs-layer-footer">
                    {props.confirm ?
                        <Button onClick={this._handleConfirmClick} buttonType="confirm">{props.confirm}</Button> : ""}
                    {props.cancel ?
                        <Button onClick={this._handleCancelClick} buttonType="cancel">{props.cancel}</Button> : ""}
                </div>
            );
        }
        var autoClose = (
            this.props.autoClose > 0 ?
                <div className="ucs-autoclose"><span>{this.state.autoClose}</span>秒后自动关闭!</div> : ""
        );
        var moveStyle = {cursor: this.props.move ? "move" : ""};
        return (
            <div className={classnames("ucs-layer",props.className,this.state.animation)} style={style}
                 ref="ucslayer" id={this.props.id}>
                {close}
                {props.title ?
                    <div className="ucs-layer-header" onMouseDown={this._handleMousedown}
                         ref="layerHeader" style={moveStyle}>{props.title}</div> : ""}
                {autoClose}
                <div className="ucs-layer-content" style={{height:this.state.contentHeight}}>
                    <div className={bodyClass}>{bodyContent}</div>
                    {button}
                </div>
            </div>
        )
    }
});
module.exports = Layer;