/**
 * Created by Administrator on 2017/2/16.
 */
var DecadePanel = React.createClass({
    getDefaultProps: function(){
        return {

        }
    },
    getInitialState: function () {
        var _this = this;
        var _curDecadeStart = parseInt(_this.props.decadeStart);
        var num = _curDecadeStart%100;
        var _decadeArrStart = _curDecadeStart-num-10;
        var _decadeArrEnd = _curDecadeStart + (100-num);
        return {
            curDecadeStart: _curDecadeStart,
            decadeArrStart: _decadeArrStart,
            decadeArrEnd: _decadeArrEnd
        }
    },
    componentWillMount: function(){

    },
    componentDidMount: function(){
        this.decadeChangeHandler();
    },
    componentDidUpdate: function(){
        this.decadeChangeHandler();
    },
    decadeChangeHandler: function(){
        var _this = this;
        _this.refs["ucs-calendar-decade-panel-tbody"].innerHTML = "";
        for(var i = _this.state.decadeArrStart; i <= _this.state.decadeArrEnd; i=i+30){
            var tr = document.createElement('tr');
            tr.setAttribute("role","row");
            for(var j = 0; j < 3 ; j ++){
                var dc = i+j*10;
                var td = document.createElement('td');
                td.setAttribute("role","gridcell");

                if(dc == _this.state.decadeArrStart){
                    td.className = "ucs-calendar-decade-panel-cell ucs-calendar-decade-panel-last-century-cell";
                    td.onclick = function(){
                        _this.prevDecadeHandler();
                    };
                }else if(dc == _this.state.decadeArrEnd){
                    td.className = "ucs-calendar-decade-panel-cell ucs-calendar-decade-panel-next-century-cell";
                    td.onclick = function(){
                        _this.nextDecadeHandler();
                    };
                }else{
                    if(dc == _this.state.curDecadeStart){
                        td.className = "ucs-calendar-decade-panel-cell ucs-calendar-decade-panel-selected-cell";
                    }else{
                        td.className = "ucs-calendar-decade-panel-cell";
                    }
                    (function(dc){
                        td.onclick = function(){
                            _this.props.decadeCallBack(dc);
                        };
                    })(dc);
                }

                var a = document.createElement('a');
                a.className = "ucs-calendar-decade-panel-decade";
                a.innerHTML = dc+"-"+(dc+9);
                td.appendChild(a);

                tr.appendChild(td);
            }
            _this.refs["ucs-calendar-decade-panel-tbody"].appendChild(tr);
        }
    },
    prevDecadeHandler: function(){
        this.setState({
            curDecadeStart: this.state.curDecadeStart-100,
            decadeArrStart: this.state.decadeArrStart-100,
            decadeArrEnd: this.state.decadeArrEnd-100
        });
    },
    nextDecadeHandler: function(){
        this.setState({
            curDecadeStart: this.state.curDecadeStart+100,
            decadeArrStart: this.state.decadeArrStart+100,
            decadeArrEnd: this.state.decadeArrEnd+100
        });
    },
    render: function(){
        var _this = this;
        return (
            <div>
                <div className="ucs-calendar-decade-panel-header">
                    <a className="ucs-calendar-decade-panel-prev-century-btn" role="button" title="Last century" onClick={_this.prevDecadeHandler}></a>
                    <div className="ucs-calendar-decade-panel-century">
                        {(_this.state.decadeArrStart+10)+"-"+(_this.state.decadeArrEnd-1)}
                    </div>
                    <a className="ucs-calendar-decade-panel-next-century-btn" role="button" title="Next century" onClick={_this.nextDecadeHandler}></a>
                </div>
                <div className="ucs-calendar-decade-panel-body">
                    <table className="ucs-calendar-decade-panel-table" cellspacing="0" role="grid">
                        <tbody className="ucs-calendar-decade-panel-tbody" ref="ucs-calendar-decade-panel-tbody">
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
});

module.exports = DecadePanel;