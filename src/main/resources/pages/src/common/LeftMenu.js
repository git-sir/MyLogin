var Navigation = require('./Navigation.js');

var LeftMenu = React.createClass({
    getDefaultProps: function(){
		return{
            data : [
                {
                    name: '需求管理', childShow: true, href: "javascript:;", icon: { left: 'iconfont menu-left-span menu-left-icon1', right: 'iconfont menu-right-span'},
                    children: [
                        {name: '金融机构', id: 'menu1', href: "javascript:;", active: true},
                        {name: '企业', id: 'menu2', href: "javascript:;"},
                        {name: '个人客户', id: 'menu3', href: "javascript:;"}
                    ]
                },
                {
                    name: '设置管理', href: "javascript:;", icon: { left: 'iconfont menu-left-span menu-left-icon2', right: 'iconfont menu-right-span'},
                    children: [
                        {name: '权限', id: 'menu4', href: "javascript:;"},
                        {name: '设置分类', id: 'menu5', href: "javascript:;"}
                    ]
                }
            ]
		}
    },
    onClick:function(e){
        var id = e.id;
        var subchild = document.getElementsByClassName('leftMenu')[0].getElementsByClassName('children');
        for(var i= 0;i<subchild.length;i++){
            var subLen = subchild[i].getElementsByTagName('a');
            for(var j = 0; j< subLen.length;j++){
                subLen[j].className = '';
            }
        }
        document.getElementById(id).className = 'active';
    },
    render:function(){
    	return(
			<div className="leftMenu">
				<Navigation data={this.props.data} className="ucs-nav-top" onClick={this.onClick}></Navigation>
			</div>
		)
    }
})
module.exports = LeftMenu;