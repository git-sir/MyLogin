require('../../common/function.jsx')
var Left = require('../main/other/left');
var Top = require('../main/other/top');
var Root = React.createClass({
	getInitialState: function() {//react组件的初始化状态
		return ({
		});
	},
	_userInfo: function() {
		alert("点击");
		//this.refs.left.select(-1);
		//UcsmyIndex.returnMainComponent();
		//this.setState({
		//	centerPanel: UserInfo
		//});
	},
	render: function() {
		return (
				<div>
					以下是头部
					<Top onUserInfo={this._userInfo}/>
				</div>
				);
	}
});
ReactDOM.render(<Root />, document.getElementById('main'));