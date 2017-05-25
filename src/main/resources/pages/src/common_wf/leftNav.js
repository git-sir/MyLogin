/*var Menu = require('../components/Menu');
 var MenuItem = Menu.MenuItem;
 var SubMenu = Menu.SubMenu;*/
var Navigation = require('../components/Navigation/index');
var data = [
    {
        name: '需求管理', icon: "icon-1",
        children: [
            {name: '银行', href: "/", active: true},
            {name: '企业', href: "/"},
            {name: '个人', href: "/"}
        ]
    },
    {
        name: '文档管理', icon: "icon-2",
        children: [{name: '已完成', href: "/"}]
    },
    {
        name: '设置管理', icon: "icon-3", children: [
        {name: '权限', href: "/"},
        {name: '设置分类', href: "/"}
    ]
    }
];
var LeftNav = React.createClass({
    render: function () {
        return (
            <Navigation className="silder-bar" data={data}></Navigation>
        )
    }
});
module.exports = LeftNav;