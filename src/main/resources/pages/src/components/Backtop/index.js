/*
 * visibilityHeight: 自定义滚动高度，默认400
 * right: 距离右边的大小，默认20px
 * callback：  回调函数，默认为空
 */
var classnames = require('classnames');
var Backtop = React.createClass({   // 自定义宽高50
    getDefaultProps: function(){
        return {
            id: '',
            visibilityHeight: '400', //可配置滚动多高才出现，默认400
            right: '20'
        }
    },
    getInitialState: function(){
        return {
            right:'-120px',
            className: classnames('ucs-backtop',this.props.className)
        }
    },
    onClick: function(){
        document.body.scrollTop = 0;
        this.setState({right:'-120px'});
        this.props.onClick? this.props.onClick():null;
    },
    componentDidMount: function(){
        window.addEventListener('scroll',function(){
            var t = document.documentElement.scrollTop || document.body.scrollTop;
            if(t > this.props.visibilityHeight){
                this.setState({right:this.props.right+'px'});
            }else{
                this.setState({right:'-120px'});

            }
        }.bind(this))
    },
    render:function(){
        return(
            <div ref='backtop' {...this.props} style={{right:this.state.right}} className={this.state.className} onClick={this.onClick}>{this.props.children}</div>
        )
    }
})
module.exports = Backtop;



