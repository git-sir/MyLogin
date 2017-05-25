/**
 * Created by Administrator on 2017/2/10.
 */
var CalendarPanel = require("./calendarPanel");
var Calendar = React.createClass({
    getDefaultProps: function(){
        return {

        }
    },
    getInitialState: function () {
        return {

        }
    },
    componentWillMount: function(){

    },
    componentDidMount: function(){

    },
    componentDidUpdate: function(){
    },
    render: function(){
        var _this = this;
        var _curDate = _this.props.curDate == "" ? new Date() : new Date(_this.props.curDate);
        return (
            <div className="ucs-calendar-picker-container ucs-calendar-picker-container-placement-topLeft" style={{left: "30px", top: "30px"}}>
                <div className="ucs-calendar" tabindex="0">
                    <CalendarPanel curDate={_curDate} callBack={_this.props.callBack}/>
                </div>
            </div>
        );
    }
});

module.exports = Calendar;