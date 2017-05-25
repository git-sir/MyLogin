/**
 * Created by Administrator on 2016/12/9.
 */
var classnames = require('classnames');
var Panel = React.createClass({
    getDefaultProps: function(){
        console.log("Panel getDefaultProps");
        return {
            arrow : {
                style : {
                    top: "0",
                    left: "16px"
                }
            },
            headerCanClick: true,
            arrowCanClick: true
        };
    },
    getInitialState: function () {
        console.log("Panel getInitialState");
        return {

        }
    },
    componentWillMount: function(){
        console.log("Panel componentWillMount");
    },
    componentDidMount: function(){
        console.log("Panel componentDidMount");
    },
    handlerShow: function(canClick,e){
        var evt = e ? e : window.event;
        if (evt.stopPropagation) {
            //W3C
            evt.stopPropagation();
        } else {
            //IE
            evt.cancelBubble = true;
        }
        var _this = this;
        if(canClick){
            _this.props.callback(_this.props.panelKey);
        }else{
            return;
        }
    },
    componentDidUpdate: function(){

    },
    render: function(){
        console.log("Panel render");
        var _this = this;
        var panelClassName = classnames('ucs-collapse-item',{
            'ucs-collapse-item-active': _this.props.active
        });
        var conClassName = classnames('ucs-collapse-content',{
            'ucs-collapse-content-inactive': !_this.props.active
        },{
            'ucs-collapse-content-active': _this.props.active
        },_this.props.animClassName);
        return (
            <div className={panelClassName}>
                <div className="ucs-collapse-header" role="tab" aria-expanded={_this.props.active} onClick={_this.handlerShow.bind(_this,_this.props.headerCanClick)}>
                    <i className="arrow" style={_this.props.arrow.style} onClick={_this.handlerShow.bind(_this,_this.props.arrowCanClick)}>{_this.props.arrowContent}</i>
                    {_this.props.title}
                </div>
                <div className={conClassName} role="tabpanel">
                    <div className="ucs-collapse-content-box">
                        {_this.props.children}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Panel;