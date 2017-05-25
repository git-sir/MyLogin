var classNames=require('classnames');

var Button = React.createClass({
    propTypes:{
        onClick: React.PropTypes.func
    },
    getInitialState:function(){
        return {
            currentClassName : ''
        };
    },
    _handleClick:function(e){
        var _self=this;
        _self.setState({currentClassName : 'ucs-btn-clicked'});
        setTimeout(function(){
            _self.setState({currentClassName : ''});
        },200);
    },
    getClassName:function(){
        var defaultClassName='ucs-btn';
        var currentClassName=this.state.currentClassName;
        var customClassNameArr=this.props.buttonType?this.props.buttonType.split(' '):'';
        var customClassName='';
        if(customClassNameArr.length>0){
            for(var i=0;i<customClassNameArr.length;i++){
                customClassName='ucs-btn-'+customClassNameArr[i]+' '+customClassName;
            }
        }
        if(this.props.className){
            customClassName=customClassName+this.props.className;
        }
        var className=classNames(defaultClassName,customClassName,currentClassName);
        return (className);
    },

    getSize:function () {
        var size=this.props.size;
    },
    render:function(){
        var html;
        // var displayType=this.props.display?'ucs-btn-block':'';
        if(this.props.HtmlType=='link'){
            html=<a id={this.props.id} href={this.props.href} className={this.getClassName()} onClick={this.props.onClick? this.props.onClick:this._handleClick}>{this.props.children}</a>;
        }else{
            html=<button type="button" id={this.props.id} className={this.getClassName()} onClick={this.props.onClick? this.props.onClick:this._handleClick}>{this.props.children}</button>;
        }
        return (html);
    }
});
module.exports = Button;