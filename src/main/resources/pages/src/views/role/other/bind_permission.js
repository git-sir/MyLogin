var Button = UcsmyUI.Button;
var TreeTable = UcsmyUI.TreeTable; 
var Checkbox =UcsmyUI.Checkbox;

var BindPermissionPanel = React.createClass({
	getInitialState:function(){//react组件的初始化状态
		return {
			column:[
			        {name: '功能菜单', field: 'name', headerClass: 'id_col', className: 'id_col'},
			        {name: '操作权限', field: 'name', headerClass: 'value_col', className: 'value_col',setContent:this.operatorValue}
			       ],
			treeData:"",        
			roleId : "",
			name:""
		};
	},
	componentDidMount:function(){
		
	},
	
    moduleName: function (item) {
    	var astr =[];
    	astr.push(<a href='javascript:;' >{item.value}</a>)
    	return astr;
    },   
    operatorValue: function (item) {
    	var astr =[];
    	if(item.permissionList){
    		item.permissionList.map(function (permission) {
    			astr.push(<Checkbox text={permission.permissionName} value={item.id +"_" + permission.permissionId} checked={permission.cheched} name="rolePermissionID"/>)
    		})
    	}else {
    		astr.push('')
    	}
    	return astr;
    },
    
    /**
     * 只能有一个根节点的json树对象
     * 如果有多个根节点或没有数据会报错
     */
	load:function(id,name){
		var that = this;
		
		$.post("rolePermission/queryRolePermission", {"roleId":id}, function(data) {
			if(!data.success){
				UcsmyIndex.alert("失败", data.msg);
			}else{
				that.setState({
	    	 		roleId:id,
	    	 		name:name,
	    	 		treeData:data.rolePermissions[0]
	    	 	});
			}
 		}, "json").error(function(xhr, errorText, errorType){
 			UcsmyIndex.alert("失败", "网络异常");
 	    });
	},
	
	_backClick:function(){
		UcsmyIndex.closeChildrenPage();
	},
	_addPermission:function(){
		var that = this;
		var ids = [];
		var obj = document.getElementsByName("rolePermissionID");
	    for(let k in obj){
	        if(obj[k].checked)
	        	ids.push(obj[k].value);
	    }
	    UcsmyIndex.confirm("确定", "你真的要为角色分配权限吗？", function() {
            _addButtonDisabled('save');
	    	$.post("rolePermission/addRolePermission", {"roleId": that.state.roleId,"permissionsId": ids.join(","),"name": that.state.name}, function(data) {
                _removeButtonDisabled('save');
	    		if(data.success){
					UcsmyIndex.alert("消息", data.msg);
					that.load(data.role_id,data.name);
				}else{
					UcsmyIndex.alert("异常消息", data.msg);
				}
	 		}, "json").error(function(){
                _removeButtonDisabled('save');
	 			UcsmyIndex.alert("失败", "网络异常");
	 	    });
		});
	    
	    
	},
	render:function(){
		var that = this;
		return (
				<div className={this.props.className}>
		            <div className="form-group mar-r15">
						<h2 className="content-title">角色：{this.state.name}</h2>
						<div className="btn-panel">
							<Button id="save" buttonType="bidnow" onClick={this._addPermission}>添加权限</Button>
							<Button buttonType="cancel" onClick={this._backClick}>返回</Button>
						</div>
                    </div>
		            <div>
	                	<TreeTable data={that.state.treeData} column={that.state.column} id="tabletest" />
		            </div>
				</div>
		);
	}
});
module.exports = BindPermissionPanel;