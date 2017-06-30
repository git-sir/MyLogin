require('../../common/function.jsx')
var Left = require('../main/other/left');
var Top = require('../main/other/top');
var Root = React.createClass({
	getInitialState: function() {//react组件的初始化状态
		return ({
		});
	},
	_userInfo: function() {
		alert("点击Top");
		//this.refs.left.select(-1);
		//UcsmyIndex.returnMainComponent();
		//this.setState({
		//	centerPanel: UserInfo
		//});
	},
	_onClick: function(url, id) {
		alert("点击Left");
		//var me = this;
		//UcsmyIndex.loadComponent(url, function(component) {
		//	UcsmyIndex.returnMainComponent();
		//	me.refs.left.select(id);
		//	me.setState({
		//		centerPanel: component
		//	});
		//}, function() {
		//	UcsmyIndex.alert("失败", "加载页面失败");
		//});
	},
	render: function() {
		return (
				<div>
					<Top onUserInfo={this._userInfo}/>
					{/*<Left ref="left" onClick={this._onClick}/>*/}
					{console.log("left")}
				</div>
				);
	}
});
ReactDOM.render(<Root />, document.getElementById('main'));