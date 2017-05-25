require('./other/commonFn');
var Left = require('./other/left');
var Top = require('./other/top');
var Home = require('./other/home');
var MessageBox = require('../widget/other/messageBox');
var ChildrenComponent = require('./other/childrenComponent');
var UserInfo = require('./other/userInfo');

var Root = React.createClass({
	getInitialState: function() {//react组件的初始化状态
		return ({
			centerPanel: Home
		});
	},
	_childrenComponent: [],
	componentDidMount: function() {
		resizeContent();// 处理滚动条

		var me = this;
		UcsmyIndex.alert = this.refs.messageBox.alert;
		UcsmyIndex.confirm = this.refs.messageBox.confirm;

		this._childrenComponent[0] = $(".content_component_sign")[0];
		UcsmyIndex.openChildrenPage = function(panel, fn) {
			$(".content_component_sign").hide();
			var component = document.createElement('div');
			component.className = "content_component_sign";
			$("#main_center_content_sign").append(component);
			var childrenComponent = <ChildrenComponent panel={panel} successFn={fn} />;
			ReactDOM.render(childrenComponent, component);
			me._childrenComponent.push(component);
		};
		UcsmyIndex.closeChildrenPage = function() {
			UcsmyIndex.resetContentClassName();
			
			if(me._childrenComponent.length < 1)
				return;
			$(me._childrenComponent.pop()).remove();
			$(me._childrenComponent[me._childrenComponent.length - 1]).show();
		};
		UcsmyIndex.returnMainComponent = function() {
			UcsmyIndex.resetContentClassName();
			
			$(".content_component_sign").hide();
			var i = 0;
			var array = [];
			me._childrenComponent.map(function(data) {
				if(i == 0) {
					array[0] = data;
					$(data).show();
				} else {
					$(data).remove();
				}
				i++;
			});
			me._childrenComponent = array;
		};
	},
	_userInfo: function() {
		this.refs.left.select(-1);
		UcsmyIndex.returnMainComponent();
		this.setState({
			centerPanel: UserInfo
		});
	},
	_onClick: function(url, id) {
		var me = this;
		UcsmyIndex.loadComponent(url, function(component) {
			UcsmyIndex.returnMainComponent();
			me.refs.left.select(id);
			me.setState({
				centerPanel: component
			});
		}, function() {
			UcsmyIndex.alert("失败", "加载页面失败");
		});
	},
	render: function() {
		return (
				<div>
					<Top onUserInfo={this._userInfo}/>
					<Left ref="left" onClick={this._onClick}/>
					<div className="content" id="main_center_content_sign">
						<div className="content_component_sign">
							<this.state.centerPanel />
						</div>
					</div>
				    <div>
				    	<MessageBox ref="messageBox"/>
				    </div>
				</div>
				);
	}
});
ReactDOM.render(<Root />, document.getElementById('main'));