/**
 * 2016-12-01 William
 * 分页器
 *
 * @param total 总页数
 * @param currentPage 初始化为第几页
 *
 */
var Pagination = React.createClass({
    getInitialState: function() {
        var current = parseInt(this.props.currentPage || 1);
        return {current: current, value : ''};
    },
    handClick : function(e){
        var sel = this;
        return function(){
            sel.setState({current : e});
            {sel.props.goCur ? sel.props.goCur(e) : ''}
        }
    },
    handChange : function(e){
        this.setState({value : e.target.value})
    },
    goNext : function(){
        var cur = this.state.current;
        if(cur < this.props.total){
            var _cur = parseInt(cur) + 1;
            this.setState({current : _cur});
            {this.props.goNext ? this.props.goNext(_cur) : ''}
        }
    },
    goPrev : function(){
        var cur = this.state.current;
        if(cur > 1){
            this.setState({current : cur - 1});
            {this.props.goPrev ? this.props.goPrev(cur - 1) : ''}
        }
    },
    goPage : function(){
        var val = this.state.value;
        if(!/^[1-9]\d*$/.test(val)){
            alert('页码只能输入大于1的正整数');
        }else if(parseInt(val) > parseInt(this.props.total)){
            alert('没有这么多页');
        }else{
            this.setState({current : val});
            {this.props.goCur ? this.props.goCur(val) : ''}
        }
    },
    //获取当前第几页
    getCurrentPage:function(){
        return this.state.current;
    },
    componentWillReceiveProps:function(nextProps){
        this.setState({current:nextProps.currentPage});
    },
    render : function(){
        var self = this;
        var total = this.props.total;
        var cur = this.state.current;
        var items = [];
        var begin;
        var len;
        if(total > 5){
            len = 5;
            if(cur >= (total-2)){
                begin = total - 4;
            }else if(cur <= 3){
                begin = 1;
            }else{
                begin = cur - 2;
            }
        }else{
            len = total;
            begin = 1;
        }
        for(var i = 0; i < len; i ++){
            var cur = this.state.current;
            var showI = begin + i;
            if(cur == showI){
                items.push({num : showI, cur : true});
            }else{
                items.push({num : showI, cur : false});
            }

        }
        return  <div className={"ucs-pagination" + (this.props.className ? (' ' + this.props.className) : '') }>
            <a className={this.state.current == 1? 'ucs-pagination-prev-disable' : 'ucs-pagination-prev'} onClick={this.goPrev}></a>
            <span className="ucs-pagination-cols">
                        {
                            items.map(function(item){
                                return <a onClick={self.handClick(item.num)} className={item.cur? 'ucs-pagination-num-current' : 'ucs-pagination-num'}>{item.num}</a>
                            })
                        }
                    </span>
            <a className={this.state.current == this.props.total? 'ucs-pagination-next-disable' : 'ucs-pagination-next'} onClick={this.goNext}></a>
            <div className="ucs-pagination-fl">
                共
                <span className="ucs-pagination-num-total">{total}</span>
                页，到第
                <input type="text" value={self.state.value} onChange={this.handChange} />
                页
            </div>
            <a onClick={this.goPage} className="page-go">确定</a>
        </div>
    }
});
module.exports = Pagination;