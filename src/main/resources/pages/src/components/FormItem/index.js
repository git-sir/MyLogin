var classnames = require("classnames");
var Input = require('../Input/index');
var ValidateRules = require("./validaterules");
var FormItem = React.createClass({
    getInitialState: function () {
        return {explainresult: "", explaintype: ""}
    },
    _handleChange: function (e) {
        var v = e.target.value;
        if (this.props.rules) {
            var results = ValidateRules(v, this.props.rules);
            if (results === "") {
                this.setState({explainresult: "", explaintype: true})
            }
            else {
                this.setState({explainresult: results, explaintype: false})
            }
        }

        //这个name还有问题，target.name是可以修改的，这里传出去的应该是不能修改的page_model里面的,还要多传个传？
        //UEventHub.emit("FORMITEM_INPUT_CHANGE", e.target.name, e.target.value);
        UEventHub.emit("FORMITEM_INPUT_CHANGE", this.props.id, e.target.value);
    },

    setExplain: function (type, v) {
        this.setState({explainresult: v, explaintype: type})
    },
    render: function () {
        var tips = "";
        if (this.state.explaintype) {
            tips = (<div className="ucs-form-explain success"><i className="iconfont icon-success"></i></div>);
        } else if (this.state.explainresult) {
            tips = (<div className="ucs-form-explain"><i
                className="iconfont icon-failure"></i>{this.state.explainresult}</div>);
        }
        return (
            <div className={classnames("ucs-form-group",this.props.className)}>
                {this.props.label ? <label className="label">{this.props.label}</label> : ""}
                {
                    React.Children.map(this.props.children, function (child) {
                        //输入框时绑定事件，不需要为每个input添加onchange之类的
                        if (child.type === Input) {
                            return React.cloneElement(child, {onChange: this._handleChange})
                        }
                        else {
                            return child;
                        }
                    }.bind(this))
                }
                {tips}
            </div>
        )
    }
});
FormItem.ValidateRules=ValidateRules;
//在表单页单独设置提示解释
window.setExplain = function (key, value) {
    UEventHub.emit('FORMITEM_SET_EXPLAIN_VALUE', key, value)
};
module.exports = FormItem;
