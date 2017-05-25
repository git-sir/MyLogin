/**
 * Created by Administrator on 2017/2/10.
 */
var MyDate = require("./helpers");
var MonthPanel = require("./monthPanel");
var YearPanel = require("./yearPanel");
var CalendarPanel = React.createClass({
    getDefaultProps: function(){
        return {
            curDate : new Date()
        }
    },
    getInitialState: function () {
        return {
            curDay: this.props.curDate.getDate(),
            curMonth: this.props.curDate.getMonth()+1,
            curMonthStr: MyDate.montharrs[this.props.curDate.getMonth()],
            curYear: this.props.curDate.getFullYear()
        }
    },
    componentWillMount: function(){

    },
    componentDidMount: function(){
        this.dateChangeHandler();
    },
    componentWillUnmount: function componentWillUnmount() {
        this._unrenderMonthPanel();
        this.refs["ucs-calendar-header"].removeChild(this._monthPanel);
    },
    componentDidUpdate: function(){
        this.dateChangeHandler();
    },
    dateChangeHandler: function(){
        var _this = this;
        var firstDay = _this.state.curYear+"/"+MyDate.digit(_this.state.curMonth)+"/1";//当前月的的第一天
        var diff = parseInt(new Date(_this.state.curYear+"/"+MyDate.digit(_this.state.curMonth)+"/1").getDay())==0?-7:-parseInt(new Date(_this.state.curYear+"/"+MyDate.digit(_this.state.curMonth)+"/1").getDay());
        var startDate = MyDate.getDiffDate(firstDay,diff);  //当前日历的开始日期
        //var endDate = MyDate.getDiffDate(lastDay,6-parseInt(new Date(lastDay).getDay()));   //当前日历的结束日期
        var endDate = MyDate.getDiffDate(startDate,41);   //当前日历的结束日期
        var dateArr = MyDate.getDateArr(startDate,endDate);   //当前显示日期数组
        _this.refs["ucs-calendar-tbody"].innerHTML = "";
        for(var i = 0; i < dateArr.length; i=i+7){
            var tr = document.createElement('tr');
            tr.setAttribute("role","row");
            for(var j = 0; j < 7 ; j ++){
                var dd = i+j;
                var ndate = new Date(dateArr[dd]);
                var div = document.createElement('div');
                div.className = "ucs-calendar-date";
                div.setAttribute("aria-selected","false");
                div.setAttribute("aria-disabled","false");
                div.innerHTML = ndate.getDate();

                var td = document.createElement('td');
                td.setAttribute("role","gridcell");
                td.setAttribute("title",dateArr[dd]);
                (function(dd){
                    td.onclick = function(){
                        _this.props.callBack(dateArr[dd]);
                    };
                })(dd);
                if(ndate.getMonth()+2 == _this.state.curMonth || (ndate.getMonth()+2)%12 == _this.state.curMonth){
                    td.className = "ucs-calendar-cell ucs-calendar-last-month-cell";
                }else if(ndate.getMonth()+1 == _this.state.curMonth){
                    if(ndate.getDate()==_this.state.curDay){
                        td.className = "ucs-calendar-cell ucs-calendar-selected-day";
                    }else{
                        td.className = "ucs-calendar-cell";
                    }
                }else if(ndate.getMonth() == _this.state.curMonth || ndate.getMonth() == _this.state.curMonth%12){
                    td.className = "ucs-calendar-cell ucs-calendar-next-month-btn-day";
                }

                td.appendChild(div);

                tr.appendChild(td);
            }
            _this.refs["ucs-calendar-tbody"].appendChild(tr);
        }
    },
    renderMonthPanel: function(){
        return (
            <MonthPanel curYear={this.state.curYear} curMonth={this.state.curMonth} callBack={this.callBack}/>
        );
    },
    renderYearPanel: function(){
        return (
            <YearPanel curYear={this.state.curYear} yearCallBack={this.yearCallBack} yearPanel={this._yearPanel}/>
        );
    },
    _renderMonthPanel: function(){
        var monthPanelElement = this.renderMonthPanel();

        if (monthPanelElement === null) {
            ReactDOM.render(<noscript />, this._monthPanel);
        } else {
            ReactDOM.render(monthPanelElement, this._monthPanel);
        }
    },
    _renderYearPanel: function(){
        var monthPanelElement = this.renderYearPanel();

        if (monthPanelElement === null) {
            ReactDOM.render(<noscript />, this._yearPanel);
        } else {
            ReactDOM.render(monthPanelElement, this._yearPanel);
        }
    },
    _unrenderMonthPanel: function() {
        /*if (this.layerWillUnmount) {
         this.layerWillUnmount(this._layer);
         }*/

        ReactDOM.unmountComponentAtNode(this._layer);
    },
    monthClickHandler: function(){
        this._monthPanel = document.createElement('div');
        this._monthPanel.className = "ucs-calendar-month-panel";
        this.refs["ucs-calendar-header"].appendChild(this._monthPanel);

        this._renderMonthPanel();
    },
    yearClickHandler: function(){
        this._yearPanel = document.createElement('div');
        this._yearPanel.className = "ucs-calendar-year-panel";
        this.refs["ucs-calendar-header"].appendChild(this._yearPanel);

        this._renderYearPanel();
    },
    callBack: function(curYear,curMonth){
        this.setState({
            curMonth: curMonth+1,
            curMonthStr: MyDate.montharrs[curMonth],
            curYear: curYear
        });
        this.refs["ucs-calendar-header"].removeChild(this._monthPanel);
    },
    yearCallBack: function(curYear){
        this.setState({
            curYear: curYear
        });
        this.refs["ucs-calendar-header"].removeChild(this._yearPanel);
    },
    todayClickHandler: function(){
        var nDate = new Date();
        var today = nDate.getFullYear()+"/"+MyDate.digit(nDate.getMonth()+1)+"/"+MyDate.digit(nDate.getDate());
        this.props.callBack(today);
    },
    prevMonthHandler: function(){
        var prevMonth = this.state.curMonth == 1 ? 12 : this.state.curMonth-1;
        var nYear = this.state.curMonth == 1 ? this.state.curYear-1 : this.state.curYear;
        this.setState({
            curMonth: prevMonth,
            curMonthStr: MyDate.montharrs[prevMonth-1],
            curYear: nYear
        });
    },
    nextMonthHandler: function(){
        var nextMonth = this.state.curMonth == 12 ? 1 : this.state.curMonth+1;
        var nYear = this.state.curMonth == 12 ? this.state.curYear+1 : this.state.curYear;
        this.setState({
            curMonth: nextMonth,
            curMonthStr: MyDate.montharrs[nextMonth-1],
            curYear: nYear
        });
    },
    prevYearHandler: function(){
        this.setState({
            curYear: this.state.curYear-1
        });
    },
    nextYearHandler: function(){
        this.setState({
            curYear: this.state.curYear+1
        });
    },
    render: function(){
        var _this = this;
        return (
            <div className="ucs-calendar-panel">
                <div className="ucs-calendar-input-wrap">
                    <div className="ucs-calendar-date-input-wrap">
                        <input className="ucs-calendar-input " value="" placeholder="Select date" />
                    </div>
                    <a className="ucs-calendar-clear-btn" role="button" title="Clear"></a>
                </div>
                <div className="ucs-calendar-date-panel">
                    <div className="ucs-calendar-header" ref="ucs-calendar-header">
                        <div style={{position: "relative"}}>
                            <a className="ucs-calendar-prev-year-btn" role="button" title="Last year (Control + left)" onClick={_this.prevYearHandler}></a>
                            <a className="ucs-calendar-prev-month-btn" role="button" title="Previous month (PageUp)" onClick={_this.prevMonthHandler}></a>
                                    <span className="ucs-calendar-my-select">
                                        <a className="ucs-calendar-month-select" role="button" title="Choose a month" onClick={_this.monthClickHandler}>{_this.state.curMonthStr}</a>
                                        <a className="ucs-calendar-year-select" role="button" title="Choose a year" onClick={_this.yearClickHandler}>{_this.state.curYear}</a>
                                    </span>
                            <a className="ucs-calendar-next-month-btn" title="Next month (PageDown)" onClick={_this.nextMonthHandler}></a>
                            <a className="ucs-calendar-next-year-btn" title="Next year (Control + right)" onClick={_this.nextYearHandler}></a>
                        </div>
                    </div>
                    <div className="ucs-calendar-body">
                        <table className="ucs-calendar-table" cellspacing="0" role="grid">
                            <thead>
                            <tr role="row">
                                <th role="columnheader" title="Sun" className="ucs-calendar-column-header">
                                    <span className="ucs-calendar-column-header-inner">Su</span>
                                </th>
                                <th role="columnheader" title="Mon" className="ucs-calendar-column-header">
                                    <span className="ucs-calendar-column-header-inner">Mo</span>
                                </th>
                                <th role="columnheader" title="Tue" className="ucs-calendar-column-header">
                                    <span className="ucs-calendar-column-header-inner">Tu</span>
                                </th>
                                <th role="columnheader" title="Wed" className="ucs-calendar-column-header">
                                    <span className="ucs-calendar-column-header-inner">We</span>
                                </th>
                                <th role="columnheader" title="Thu" className="ucs-calendar-column-header">
                                    <span className="ucs-calendar-column-header-inner">Th</span>
                                </th>
                                <th role="columnheader" title="Fri" className="ucs-calendar-column-header">
                                    <span className="ucs-calendar-column-header-inner">Fr</span>
                                </th>
                                <th role="columnheader" title="Sat" className="ucs-calendar-column-header">
                                    <span className="ucs-calendar-column-header-inner">Sa</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="ucs-calendar-tbody" ref="ucs-calendar-tbody">
                            </tbody>
                        </table>
                    </div>
                    <div className="ucs-calendar-footer">
                        <span className="ucs-calendar-footer-btn">
                            <a className="ucs-calendar-today-btn " role="button" title="2017-2-10" onClick={_this.todayClickHandler}>Today</a>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = CalendarPanel;