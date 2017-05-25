/*
 * min 最小值
 * max　最大值
 * value 初始值
 * step 每次改变的步数
 * onChange 变化回调
 * disabled 禁用
 * className 样式
 * id   id
 * */
var Input = require('../Input/index');
var classnames = require('classnames');
var InputNumber = React.createClass({
    handelAdd: function () {
        var v = parseInt(this.refs.inputnumber.getValue()) + parseInt(this.props.step);
        this.setState({classNameLess: ""});
        this.refs.inputnumber.setValue(v);
        if (v >= parseInt(this.props.max)) {
            this.setState({classNameAdd: "disabled"});
            this.refs.inputnumber.setValue(this.props.max);
        }
    },
    handelLess: function () {
        var v = parseInt(this.refs.inputnumber.getValue()) - parseInt(this.props.step);
        this.setState({classNameAdd: ""});
        this.refs.inputnumber.setValue(v);
        if (v <= parseInt(this.props.min)) {
            this.setState({classNameLess: "disabled"});
            this.refs.inputnumber.setValue(this.props.min);
        }
    },
    getInitialState: function () {
        return {
            value: this.props.value,
            classNameAdd: "",
            classNameLess: ""
        }
    },
    getDefaultProps: function () {
        return {
            min: "",
            max: "",
            value: "",
            step: "",
            onChange: "",
            disabled: "",
            className: "",
            id: ""
        }
    },
    handleChange: function (e) {
        var v = e.target.value;
        if (v > parseInt(this.props.max)) {
            v = this.props.max;
        } else if (v < parseInt(this.props.min)) {
            v = this.props.min;
        }
        if (!isNaN(v)) {
            //this.setState({value: v});
            this.refs.inputnumber.setValue(v);
        } else {
            this.refs.inputnumber.setValue("");
        }
        this.props.onChange ? this.props.onChange(e) : "";
    },
    getVlaue:function () {
      return this.refs.inputnumber.getValue();
    },
    render: function () {
        return (
            <div className={classnames("ucs-input-number",this.props.className)} id={this.props.id}>
                <a className={classnames(this.state.classNameLess,"less")} onClick={this.handelLess}></a>
                <Input onChange={this.handleChange} value={this.state.value} ref="inputnumber"
                       disabled={this.props.disabled?"disabled":""}/>
                <a className={classnames(this.state.classNameAdd,"add")} onClick={this.handelAdd}></a>
            </div>
        )
    }
});
module.exports = InputNumber;
