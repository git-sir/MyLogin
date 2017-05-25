
var classnames = require('classnames');
var Input = React.createClass({
    getInitialState: function () {
        return {
            value: this.props.value,
            spanPlaceholder: true,
            className:classnames('ucs-input',this.props.className)
        }
    },
    getDefaultProps: function () {
        return {

        }
    },
    componentWillMount: function () {
        if (this.props.value) {
            this.setState({
                spanPlaceholder: false
            });
        }

    },
    componentWillReceiveProps:function (newProps) {
        this.setState({value:newProps.value,
                        spanPlaceholder: newProps.value ? false : true});
    },
    onChange: function (e) {
        this.setState({
            value: e.target.value,
            spanPlaceholder: e.target.value ? false : true
        });
        this.props.onChange ? this.props.onChange(e) : "";
    },
    onFucus: function (e) {
        //根据ie10的标准，获得焦点时提示是会消失的，因此失去焦点也要相应的处理
        this.setState({
            spanPlaceholder: false
        });
        this.props.onFocus ? this.props.onFocus(e) : "";
    },
    onBlur: function (e) {
        this.setState({
            spanPlaceholder: e.target.value ? false : true
        });
        this.props.onBlur ? this.props.onBlur(e) : "";
    },
    _handlePlaceholderClick: function () {

        //让文字框获得焦点
        this.refs.inputtext.focus();
    },
    //提供给父组件取赋值
    setValue: function (v) {
        this.setState({value: v});
    },
    getValue: function () {
        return this.state.value
    },
    render: function () {

        //value值不为空时，隐藏提示
        var spanPlaceholder = {
            display: this.state.spanPlaceholder ? "block" : "none"
        };
        var placeholder = "";
        //这里先是判断浏览器的支持，
        if (this.props.placeholder && !('placeholder' in document.createElement('input'))) {
            placeholder = (<span className="ucs-placeholder" style={spanPlaceholder}
                                 onClick={this._handlePlaceholderClick}>{this.props.placeholder}</span>);
        }
        return (
            <div className="ucs-input-control">
                <input type="text" {...this.props}
                       value={this.state.value}
                       className={this.state.className}
                       ref="inputtext" onChange={this.onChange} onFocus={this.onFucus} />
                {placeholder}
            </div>

        )
    }
});
module.exports = Input;