/**
 * Created by Administrator on 2017/2/10.
 */
var DecadePanel = require("./decadePanel");
var YearPanel = React.createClass({
    getDefaultProps: function(){
        return {

        }
    },
    getInitialState: function () {
        var _this = this;
        var _curYear = parseInt(_this.props.curYear);
        var num = _curYear%10;
        var _decadeStart = _curYear-num-1;
        var _decadeEnd = _curYear + (10-num);
        return {
            curYear: _curYear,
            decadeStart: _decadeStart,
            decadeEnd: _decadeEnd
        }
    },
    componentWillMount: function(){

    },
    componentDidMount: function(){
        this.yearChangeHandler();
    },
    componentDidUpdate: function(){
        this.yearChangeHandler();
    },
    componentWillUnmount: function componentWillUnmount() {
        this._unrenderDecadePanel();
        this.props.yearPanel.removeChild(this._decadePanel);
    },
    yearChangeHandler: function(){
        var _this = this;
        _this.refs["ucs-calendar-year-panel-tbody"].innerHTML = "";
        for(var i = _this.state.decadeStart; i <= _this.state.decadeEnd; i=i+3){
            var tr = document.createElement('tr');
            tr.setAttribute("role","row");
            for(var j = 0; j < 3 ; j ++){
                var year = i+j;
                var td = document.createElement('td');
                td.setAttribute("role","gridcell");
                td.setAttribute("title",year+"");

                if(year == _this.state.decadeStart){
                    td.className = "ucs-calendar-year-panel-cell ucs-calendar-year-panel-last-decade-cell";
                    td.onclick = function(){
                        _this.prevDecadeHandler();
                    };
                }else if(year == _this.state.decadeEnd){
                    td.className = "ucs-calendar-year-panel-cell ucs-calendar-year-panel-next-decade-cell";
                    td.onclick = function(){
                        _this.nextDecadeHandler();
                    };
                }else{
                    if(year == _this.state.curYear){
                        td.className = "ucs-calendar-year-panel-cell ucs-calendar-year-panel-selected-cell";
                    }else{
                        td.className = "ucs-calendar-year-panel-cell";
                    }
                    (function(year){
                        td.onclick = function(){
                            _this.props.yearCallBack(year);
                        };
                    })(year);
                }

                var a = document.createElement('a');
                a.className = "ucs-calendar-year-panel-year";
                a.innerHTML = year;
                td.appendChild(a);

                tr.appendChild(td);
            }
            _this.refs["ucs-calendar-year-panel-tbody"].appendChild(tr);
        }
    },
    prevDecadeHandler: function(){
        this.setState({
            curYear: this.state.curYear-10,
            decadeStart: this.state.decadeStart-10,
            decadeEnd: this.state.decadeEnd-10
        });
    },
    nextDecadeHandler: function(){
        this.setState({
            curYear: this.state.curYear+10,
            decadeStart: this.state.decadeStart+10,
            decadeEnd: this.state.decadeEnd+10
        });
    },
    renderDecadePanel: function(){
        return (
            <DecadePanel decadeStart={this.state.decadeStart+1} decadeCallBack={this.decadeCallBack}/>
        );
    },
    _renderDecadePanel: function(){
        var decadePanelElement = this.renderDecadePanel();

        if (decadePanelElement === null) {
            ReactDOM.render(<noscript />, this._decadePanel);
        } else {
            ReactDOM.render(decadePanelElement, this._decadePanel);
        }
    },
    _unrenderDecadePanel: function() {
        /*if (this.layerWillUnmount) {
         this.layerWillUnmount(this._layer);
         }*/

        ReactDOM.unmountComponentAtNode(this._decadePanel);
    },
    decadeClickHandler: function(){
        this._decadePanel = document.createElement('div');
        this._decadePanel.className = "ucs-calendar-decade-panel";
        this.props.yearPanel.appendChild(this._decadePanel);

        this._renderDecadePanel();
    },
    decadeCallBack: function(curYear){
        this.setState({
            curYear: curYear,
            decadeStart: curYear-1,
            decadeEnd: curYear+10
        });
        this.props.yearPanel.removeChild(this._decadePanel);
    },
    render: function(){
        var _this = this;
        return (
            <div>
                <div className="ucs-calendar-year-panel-header">
                    <a className="ucs-calendar-year-panel-prev-decade-btn" role="button" title="Last decade" onClick={_this.prevDecadeHandler}></a>
                    <a className="ucs-calendar-year-panel-decade-select" role="button" title="Choose a decade" onClick={_this.decadeClickHandler}>
                        <span className="ucs-calendar-year-panel-decade-select-content">
                            {(_this.state.decadeStart+1)+"-"+(_this.state.decadeEnd-1)}
                        </span>
                        <span className="ucs-calendar-year-panel-decade-select-arrow">x</span>
                    </a>
                    <a className="ucs-calendar-year-panel-next-decade-btn" role="button" title="Next decade" onClick={_this.nextDecadeHandler}></a>
                </div>
                <div className="ucs-calendar-year-panel-body">
                    <table className="ucs-calendar-year-panel-table" cellspacing="0" role="grid">
                        <tbody className="ucs-calendar-year-panel-tbody" ref="ucs-calendar-year-panel-tbody">

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
});

module.exports = YearPanel;