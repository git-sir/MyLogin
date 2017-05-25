/*组参数
 * id
 * name 组名称
 * onChange　回调
 * */
var RadioGroup = React.createClass({
    getInitialState: function () {
        return {value: this.props.value}
    },
    _handleChange: function (e) {
        this.setState({value: e.target.value});
        this.props.onChange ? this.props.onChange(e) : "";
    },
    getValue: function () {
        return this.state.value;
    },
    setValue:function (v) {
      this.setState({value:v});
    },
    render: function () {
        var that = this;
        return (
            <div className="radio-group" id={this.props.id}>
                {
                    React.Children.map(this.props.children, function (child, index) {
                        return React.cloneElement(child, {
                            name: this.props.name,
                            onChange: this._handleChange,
                            checked: this.state.value == child.props.value ? true : false
                        });
                    }.bind(this))
                }
            </div>
        )
    }
});
module.exports = RadioGroup;