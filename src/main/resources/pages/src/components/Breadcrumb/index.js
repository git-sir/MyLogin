var Breadcrumb = React.createClass({
    getDefaultProps: function(){
        return{
            separator:'>'   //分隔符
        }
    },
    render: function(){
        var that = this;
        var len = React.Children.count(this.props.children);
        return <div className='ucs-breadcrumb'>
            {
                React.Children.map(this.props.children, function (child,index) {
                    console.log(index);
                    if(index == len-1){
                        return <span className='ucs-breadcrumb-link-last'>{child}</span>;
                    }else{
                        return <span><a className='ucs-breadcrumb-link' href={child.props.href}>{child}</a>
                            {that.props.separator}</span>;
                    }
                })
            }
        </div>
    }
});

Breadcrumb.Item = React.createClass({
    getDefaultProps: function  () {
        return{
            href:'javascript:;'
        }
    },
    render: function () {
        return <span>{this.props.children}</span>
    }
})

module.exports = Breadcrumb;