/**
 * Created by Administrator on 2017/2/10.
 */
var MonthPanel = React.createClass({
    getDefaultProps: function(){
        return {

        }
    },
    getInitialState: function () {
        return {
            curYear: this.props.curYear
        }
    },
    componentWillMount: function(){

    },
    componentDidMount: function(){
        this.monthChangeHandler();
    },
    componentDidUpdate: function(){
        this.monthChangeHandler();
    },
    monthChangeHandler: function(){
        var _this = this;
        var monthStrArr = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        _this.refs["ucs-calendar-month-panel-tbody"].innerHTML = "";
        for(var i = 0; i < monthStrArr.length; i=i+3){
            var tr = document.createElement('tr');
            tr.setAttribute("role","row");
            for(var j = 0; j < 3 ; j ++){
                var mon = i+j;
                var td = document.createElement('td');
                td.setAttribute("role","gridcell");
                td.setAttribute("title",monthStrArr[mon]);

                (function(mon){
                    td.onclick = function(){
                        _this.props.callBack(_this.state.curYear,mon);
                    };
                })(mon);

                if(_this.props.curMonth-1 == mon){
                    td.className = "ucs-calendar-month-panel-cell ucs-calendar-month-panel-selected-cell ucs-calendar-month-panel-current-cell";
                }else{
                    td.className = "ucs-calendar-month-panel-cell";
                }
                var a = document.createElement('a');
                a.className = "ucs-calendar-month-panel-month";
                a.innerHTML = monthStrArr[mon];
                td.appendChild(a);

                tr.appendChild(td);
            }
            _this.refs["ucs-calendar-month-panel-tbody"].appendChild(tr);
        }
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
            <div>
                <div className="ucs-calendar-month-panel-header">
                    <a className="ucs-calendar-month-panel-prev-year-btn" role="button" title="Last year (Control + left)" onClick={_this.prevYearHandler}></a>
                    <a className="ucs-calendar-month-panel-year-select" role="button" title="Choose a year">
                        <span className="ucs-calendar-month-panel-year-select-content">{_this.state.curYear}</span>
                        <span className="ucs-calendar-month-panel-year-select-arrow">x</span>
                    </a>
                    <a className="ucs-calendar-month-panel-next-year-btn" role="button" title="Next year (Control + right)" onClick={_this.nextYearHandler}></a>
                </div>
                <div className="ucs-calendar-month-panel-body">
                    <table className="ucs-calendar-month-panel-table" cellspacing="0" role="grid">
                        <tbody className="ucs-calendar-month-panel-tbody" ref="ucs-calendar-month-panel-tbody">
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
});

module.exports = MonthPanel;