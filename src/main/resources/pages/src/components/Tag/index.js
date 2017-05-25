var classnames = require('classnames');
var Tag = React.createClass({
    getDefaultProps: function(){
        return{
            className: '',
            color:'',   //标签的背景颜色
            closable: false,   //是否出现关闭按钮,默认不显示
            onClose:'',  //点击关闭时的回调事件
            callback: ''  //点击关闭后的回调事件
        }
    },
    getInitialState:function () {
        return{
            className: classnames('ucs-tag',this.props.className)
        }
    },
    onClose: function(){
        this.componentEl = ReactDOM.findDOMNode(this);
        this.componentEl.remove();
        var eventClose = this.props.onClose;
        var afterClose = this.props.callback;
        if(eventClose){
            eventClose();
        }
        if(afterClose){
            afterClose();
        }
    },
    componentDidMount: function () {

    },
    render: function(){

        var closespan = this.props.closable? <span onClick={this.onClose}><i className="iconfont icon-close"></i> X</span> : '';
        return <div {...this.props} className={this.state.className} style={{backgroundColor:this.props.color}} >{this.props.children}{closespan}</div>
    }
})
module.exports = Tag;