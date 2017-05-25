var Header = React.createClass({
    getDefaultProps: function(){
		return{
			username:'ucser-aaaa',
			userImg:''
		}
    },
	componentDidMount:function () {
    },
	onchange:function (e) {
    },
    onClick: function (e) {

    },
    render:function(){
    	return(
			<div className="header">
				<div className="header-logo">
					<div className="ucserImg">
						<img src="../../images/logo.png" alt=""/>
					</div>
					<span className="header-name">网金决策方案管理系统</span>
				</div>
				<div className="header-mes">
					<ul>
						<li><img className="userImg" src={this.props.userImg}/>{this.props.username}，你好！ </li>
						<li><a className="btn-loginout" href="javascript:;" onClick={this.props.onClick}></a> </li>
					</ul>
				</div>
			</div>
		)
    }
})
module.exports = Header;