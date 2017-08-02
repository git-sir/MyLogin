require('../../common/function.jsx')
var Left = require('../main/other/left');
var Top = require('../main/other/top');
var LifeCycle = require('../testLifeCycle/lifecycle');
var Root = React.createClass({
	getInitialState: function() {//react组件的初始化状态
		return ({
			lifedata:'生命周期标题'
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
	_updateProps: function(){
		//触发子组件LifeCycle更新prop属性
		this.setState({lifedata:'改变标题'})
		console.log("call Root\'s setState")
	},
	render: function() {
		return (
				<div>
					<button onClick={this._updateProps}>父组件修改子组件Props属性</button>
					{console.log("call Root\'s render")}
					<LifeCycle title={this.state.lifedata} />
					{/*要显示测生命周期的组件，必须注释掉以下Top组件*/}
					{/*<Top onUserInfo={this._userInfo}/>*/}
					{/*<Left ref="left" onClick={this._onClick}/>*/}
					{/*console.log("left")*/}
				</div>
				);
	}
});
ReactDOM.render(<Root />, document.getElementById('main'));