var TabItem=React.createClass({
    render:function(){
        return false;
    }
});

var TabBar=React.createClass({
    handleSelected:function(){

    },
    render:function(){
        return (<div>{this.props.tab}</div>);
    }
});

var TabPane=React.createClass({
    render:function(){
        return (<div>{this.props.content}</div>);
    }
});

var Tabs=React.createClass({
    propTypes:{
        defaultActiveKey:React.PropTypes.number
    },
    getDefaultProps:function(){
        return {
            defaultActiveKey:0
        }
    }
    ,
    getInitialState:function(){
        return {
            currentIndex : this.props.defaultActiveKey
        };
    },

    checkTitleIndex:function(index){
        if(this.state.currentIndex==-1){
            return "";
        }else{
            return index===this.state.currentIndex ? "ucs-tabs-active" : "";
        }
    },

    checkContentIndex:function(index){
        if(this.state.currentIndex==-1){
            return "none";
        }else{
            return index===this.state.currentIndex ? "block" : "none";
        }
    },

    _handleClick:function(index){
        this.setState({currentIndex : index});
        this.props.onChange && this.props.onChange(index);
    },

    render:function(){
        var _self=this;
        return(
            <div className="ucs-tabs">
                <div className="ucs-tabs-bar">
                    <ul>
                        { React.Children.map( this.props.children , function(element,index){
                            return(
                                <li onClick={ function(){_self._handleClick(index)} } className={ _self.checkTitleIndex(index) }>
                                    <TabBar tab={ element.props.tab }/>
                                </li>
                            );
                        }) }
                    </ul>
                </div>
                <div className="ucs-tabs-content">
                    {React.Children.map(this.props.children,function(element,index){
                        return(
                            <div className="ucs-tabs-tabpane" style={{ "display": _self.checkContentIndex(index) }}>
                                <TabPane content={ element.props.children }/>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
});

Tabs.TabBar=TabBar;
Tabs.TabPane=TabPane;
Tabs.TabItem=TabItem;
module.exports = Tabs;