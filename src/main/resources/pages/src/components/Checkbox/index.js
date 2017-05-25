/**
 * Created by chenzefang on 2016/12/09.
 *
 *
 */
var classnames = require('classnames');
var Checkbox = React.createClass({
    getInitialState: function(){
        return {
            checked:this.props.checked?this.props.checked:false,
            className:classnames('ucs-checkbox-input',this.props.className),
            value: this.props.value,
            text:this.props.text
        }
    },
    onClick: function (e) {
        this.setState({checked:!this.state.checked});
        this.props.onClick ? this.props.onClick(e) : "";
    },
    getValue: function () {
        return this.state.value;
    },
    setValue: function (v) {
        this.setState({value:v})
    },
    getText: function () {
        return this.state.text;
    },
    setText: function (v) {
        this.setState({text:v})
    },
    componentWillReceiveProps:function (newProps) {
        this.setState({value:newProps.value,
                       checked:newProps.checked,
                       text:newProps.text});
    },
    componentDidMount: function(){
        var that = this;
        UEventHub.on(that.props.eventId ? that.props.eventId : 'checkAllEvent',function(bool){
            that.setState({checked: bool});
        });
    },
    render:function  () {

        return <label className="ucs-checkbox">
            <input type="checkbox" {...this.props} checked ={this.state.checked} className={this.state.className} onClick={this.onClick}   />
            <span className="ucs-checkbox-inner" onClick={this.handleClick}></span>
            <span className="ucs-checkbox-text">{this.state.text}</span>
        </label>
    }
})

module.exports = Checkbox;
