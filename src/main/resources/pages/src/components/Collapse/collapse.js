/**
 * Created by Administrator on 2016/12/9.
 */
var Collapse = React.createClass({
    getDefaultProps: function(){
        console.log("collapse getDefaultProps");
        return {
            afterCallBack: function(){

            }
        }
    },
    getInitialState: function () {
        console.log("collapse getInitialState");
        var _this = this;
        return {
            panelChildren: React.Children.map(_this.props.children,function(o,i){
                return React.cloneElement(o, {
                    key: i ,
                    panelKey:i,
                    active : i==0?true:false,
                    animClassName : "",
                    arrowContent : i==0?o.props.arrow.openContent:o.props.arrow.closeContent,
                    height: i==0?46:0,
                    callback: _this.callback
                });
            })
        }
    },
    componentWillMount: function(){
        console.log("collapse componentWillMount");
    },
    componentDidMount: function(){
        console.log("collapse componentDidMount");
    },
    componentDidUpdate: function(){
        this.props.afterCallBack();
    },
    callback: function(key){
        var _this = this;
        _this.setState({
            panelChildren: React.Children.map(_this.props.children,function(o,i){
                if(_this.props.accordion){//判断是否是手风琴
                    return i == key ? React.cloneElement(o, {
                        key: i ,
                        panelKey:i,
                        active : !_this.state.panelChildren[i].props.active,
                        animClassName : "ucs-collapse-anim-active",
                        arrowContent : _this.state.panelChildren[i].props.active?o.props.arrow.closeContent:o.props.arrow.openContent,
                        //height: _this.state.panelChildren[i].props.active?0:46,
                        callback: _this.callback
                    }):React.cloneElement(o, {
                        key: i ,
                        panelKey:i,
                        active : false,
                        animClassName : "ucs-collapse-anim-active",
                        arrowContent : o.props.arrow.closeContent,
                        //height:0,
                        callback: _this.callback
                    });
                }else{
                    return i == key ? React.cloneElement(o, {
                        key: i ,
                        panelKey:i,
                        active : !_this.state.panelChildren[i].props.active,
                        animClassName : "ucs-collapse-anim-active",
                        arrowContent : _this.state.panelChildren[i].props.active?o.props.arrow.closeContent:o.props.arrow.openContent,
                        //height: _this.state.panelChildren[i].props.active?0:46,
                        callback: _this.callback
                    }):React.cloneElement(o, {
                        key: i ,
                        panelKey:i,
                        active : _this.state.panelChildren[i].props.active,
                        animClassName : "",
                        arrowContent : _this.state.panelChildren[i].props.active?o.props.arrow.openContent:o.props.arrow.closeContent,
                        //height: _this.state.panelChildren[i].props.height,
                        callback: _this.callback
                    });
                }

            })
        });
        /*setTimeout(function(){
            _this.setState({
                panelChildren: React.Children.map(_this.props.children,function(o,i){
                    return React.cloneElement(o, {
                        key: i ,
                        panelKey:i,
                        active : _this.state.panelChildren[i].props.active,
                        animClassName : "",
                        callback: _this.callback
                    });
                })
            });
        },200);*/
    },
    render: function(){
        console.log("collapse render");
        var _this = this;
        var children = _this.state.panelChildren;
        return (
            <div className="ucs-collapse">{children}</div>
        );
    }
});

module.exports = Collapse;