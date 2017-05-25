var Layer = UcsmyUI.Layer;
var Button = UcsmyUI.Button;
var MessageBox = React.createClass({
	getInitialState: function(){
		return {
			isOpen: false,
			cancelButShow: true,
			title: 'title',
			msg: 'msg',
			okFn: function() {
			},
			cancelFn: function() {
			}
		}
	},
	alert: function(title, msg, okFn) {
		if(this.state.isOpen)
			this._layerClose();// 执行关闭操作，防止多次弹出阴影层
		okFn = okFn ? okFn : function(){};
		this.setState({
			isOpen: true,
			cancelButShow: false,
			title: title,
			msg: msg,
			okFn: okFn,
			cancelFn: function(){}
		});
		this._layerOpen();
	},
	confirm: function(title, msg, okFn, cancelFn){
		if(this.state.isOpen)
			this._layerClose();// 执行关闭操作，防止多次弹出阴影层
		okFn = okFn ? okFn : function(){};
		cancelFn = cancelFn ? cancelFn : function(){};
		this.setState({
			isOpen: true,
			cancelButShow: true,
			title: title,
			msg: msg,
			okFn: okFn,
			cancelFn: cancelFn
		});
		this._layerOpen();
	},
	_layerOpen: function() {
		this.refs.layerMessageBox.layerOpen();
		var background = $(".layer-background");
		$(background[background.length - 1]).addClass("layerMessageBoxBackground");
	},
	_layerClose: function() {
		this.setState({
			isOpen: false
		});
		this.refs.layerMessageBox.layerClose();
	},
	_okFn: function() {
		this._layerClose();
		this.state.okFn();
	},
	_cancelFn: function() {
		this._layerClose();
		this.state.cancelFn();
	},
	render: function() {
		return(
			<div>
				<Layer ref="layerMessageBox" className="layerMessageBox" title={this.state.title} width="350" showClose={false}>
					<label>{this.state.msg}</label>
					<br/>
					<br/>
					<div className="ucs-layer-footer">
						<Button buttonType="bidnow" onClick={this._okFn}>确认</Button>
		                {this.state.cancelButShow ? <Button buttonType="cancel" onClick={this._cancelFn}>取消</Button> : ""}
		            </div>
				</Layer>
			</div>
		)
	}
});

module.exports = MessageBox;