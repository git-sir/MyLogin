var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var FormItem = UcsmyUI.Form.FormItem;
var Checkbox = UcsmyUI.Checkbox;
var Grid = require('../../widget/other/grid');

module.exports = React.createClass({
	getInitialState: function() {
        return{
        	gridUrl: '',
			saveUrl: '',
			title: '',
			sign: '',
			data: {}
        }
    },
    init: function(sign, data, successFn) {// sign: bind or unbind
    	var title, gridUrl, saveUrl;
    	if(sign == "bind") {
    		title = "绑定用户";
    		gridUrl = "role/queryUnbindUserList?roleId=" + data.roleId;
    		saveUrl = "role/bindUser";
    	} else {
    		title = "解绑用户";
    		gridUrl = "role/queryBindUserList?roleId=" + data.roleId;
    		saveUrl = "role/unbindUser";
    	}
    	this.setState({
    		gridUrl: gridUrl,
    		saveUrl: saveUrl,
    		title: title,
    		data: data,
    		sign: sign
    	});
    },
	componentDidUpdate: function() {
		this.refs.grid.load();
	},
    _return: function(event) {
		UcsmyIndex.closeChildrenPage();
	},
	_onClick: function(event) {
		var me = this;
		var ids = [];
		var obj = document.getElementsByName("userRoleId");
		for(var i = 0; i < obj.length; i++) {
			if(obj[i].checked)
				ids.push(obj[i].value);
		}
		if (ids.length == 0){
			UcsmyIndex.alert("异常消息", "请选择要绑定的用户");
			return;
		}
		var d;
		if(this.state.sign == "bind") {
			d = {"roleId": this.state.data.roleId, "userIds": ids.join(",")};
    	} else {
    		d = {"ids": ids.join(",")};
    	}
		UcsmyIndex.confirm("确定", "是否确定操作选中的用户？", function(){
            _addButtonDisabled('save');
			$.post(me.state.saveUrl, d, function(data){
                _removeButtonDisabled('save');
				if(data.retcode == "0"){
					UcsmyIndex.alert("成功", data.retmsg);
					me._return();
				} else{
					UcsmyIndex.alert("失败", data.retmsg);
				}
			}, "json").error(function(xhr, errorText, errorType){
                _removeButtonDisabled('save');
				UcsmyIndex.alert("失败", "网络异常");
		    });
		});
	},
	render: function() {
		return (					
			<div>
	            <div className="btn-panel">
	                <Button id="save" buttonType="bidnow" onClick={this._onClick}>{this.state.title}</Button>
	                <Button buttonType="cancel" onClick={this._return}>返回</Button>
	            </div>
				<div className="table-panel">
		            <Grid
		            	url={this.state.gridUrl} ref="grid"
		                columns={[ {
							 name:'roleId',
							 header: "",
							 content: function(column) {
								 return (
									 <Checkbox value={this.state.sign == "bind" ? column.userId : column.id} name="userRoleId" eventId={this.state.eventId} />
								 );
							 }.bind(this)
						}, {
      						name: 'userAccount', header: '用户账号'
      					}, {
      						name: 'userName', header: '姓名'
      					} ]}
		            />
		            <div className="clearfix"></div>
		        </div>
			</div>
		);
	}
});