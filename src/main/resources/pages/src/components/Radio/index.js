var Radio = React.createClass({
    getInitialState: function () {
        return {}
    },
    handleChange: function (e) {
        this.props.onChange ? this.props.onChange(e) : "";
    },
    getValue: function () {
        return this.refs.radio.checked
    },
    setValue: function (bool) {
        this.refs.radio.checked = true;
    },
    render: function () {
        var props = {
                name: this.props.name,
                value: this.props.value,
                onChange: this.handleChange,
                disabled: this.props.disabled ? "disabled" : "",
                className: "ucs-radio-input",
                checked: this.props.checked
            }
            ;
        return (
            <label className="ucs-radio">
                <input type="radio" {...props} ref="radio"/>
                <span className="ucs-radio-inner"></span>
                <span>{this.props.children}</span>
            </label>
        )
    }
});
Radio.RadioGroup = require('./RadioGroup');
module.exports = Radio;
