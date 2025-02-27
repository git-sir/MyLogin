var Header = React.createClass({
    getDefaultProps: function(){
        return{
            username: 'ucser-aaaa',
            userImg: '',
            InterNum: '',
            roleName: '',
            loginTime: ''
        }
    },
    componentDidMount:function () {
    },
    onchange:function (e) {
    },
    onClick: function (e) {
        this.props.onUserInfo();
    },
    render:function(){
        var myUser = {};
        myUser.name = "用户名称";
        myUser.orgName = "所属机构";
        myUser.roleName = "所属角色";
        myUser.loginTime = "登录时间";
        return(
			<div className="header">
				<div className="header-logo">
					<div className="ucserImg">
						<img src="images/logo.png" alt=""/>
					</div>
					<span className="header-name">统一认证管理系统</span>
				</div>
				<div className="header-mes">
					<ul>
						<li onClick={this.onClick} style={{"cursor": "pointer"}}>
							<img className="userImg" src="images/user_img.png"/>{myUser.name}
						</li>
						<li>机构：{myUser.orgName}</li>
						<li>角色：{myUser.roleName}</li>
						<li>登录日期：{myUser.loginTime}</li>
						<li><a className="btn-loginout" href="logout"> </a> </li>
					</ul>
				</div>
			</div>
        )
    }
})
module.exports = Header;