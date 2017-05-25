/*
 * 参数
 * icon　图标
 * title　标题
 * description　描述
 * className 类名
 * */
var classnames = require("classnames");
var Steps = React.createClass({
    getDefaultProps: function () {
        return {
            icon: "",
            title: "",
            description: ""
        }
    },
    render: function () {
        var that = this;
        return (
            <div className={classnames("ucs-steps",this.props.className)}>
                {React.Children.map(this.props.children, function (el, index) {
                    return (
                        <div className={classnames("ucs-steps-item",{"ucs-steps-active":this.props.current>index})}>
                            {el.props.icon ?
                                <i className={"iconfont icon-"+el.props.icon}></i> : ""
                            }
                            {el.props.title ?
                                <div className="ucs-steps-title">{el.props.title}</div>
                                : ""}
                            {el.props.description ?
                                <div className="ucs-steps-description">{el.props.description}</div>
                                : ""}
                            <div className="ucs-steps-line"></div>
                            {el.props.children}
                        </div>
                    )
                }.bind(this))
                }
            </div>
        )
    }
});
Steps.Step = React.createClass({
    render: function () {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
});
module.exports = Steps;