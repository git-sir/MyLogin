var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var FormItem = UcsmyUI.Form.FormItem;
var Grid = require('../widget/other/grid');
var PermissionLink = require('../widget/other/permissionLink');

myPanel = React.createClass({
    _query: function() {
var me = this;
    	var keyWord = this.refs.keyWord.getValue();
    	var pageNum = this.refs.pageNum.getValue();
    	var pageSize = this.refs.pageSize.getValue();
    	var data = {
    		"keyWord":keyWord,
    		"pageNum":pageNum,
    		"pageSize":pageSize,
    	};
    	$.ajax({
    		url:'solr.solr.pgflow/moduleSearch',
    		data:data,
    		dataType:'json',
    		type:'post',
    		success:function(data)
    		{
    			me.refs.dataResult.value=JSON.stringify(data);
    		},
    		error:function()
    		{
    			UcsmyIndex.alert("失败", "网络异常");
    		}
    		
    		
    	});
    	
    	
    },
    _del:function()
    {
        $.get("solr.solr.pgflow/moduleDel", function(data){
        	if(data.success)
        	UcsmyIndex.alert("成功", data.msg);
        	else
        	UcsmyIndex.alert("失败", data.msg);
        	});
    },
    _add: function() {
    $.get("solr.solr.pgflow/moduleIndex", function(data){
    	UcsmyIndex.alert("成功", data.msg);
    	});
    },

	render:function() {
		return (
			<div>

                <h2 className="content-title">菜单检索示例</h2>
                <div className="panel">
                    <div className="panel-title">查询条件</div>
                    <div className="panel-content">
                        <FormItem label="关键字"><Input ref="keyWord"/></FormItem>
                        <FormItem label="第几页"><Input ref="pageNum"/></FormItem>
                        <FormItem label="页数"><Input ref="pageSize"/></FormItem>
                    </div>
                </div>
	            <div className="btn-panel">
	                <Button buttonType="bidnow" onClick={this._query}>搜索</Button>
	                <Button buttonType="bidnow" onClick={this._add}>建索引</Button>
	                <Button buttonType="bidnow" onClick={this._del}>删除索引</Button>
	            </div>
				<div className="table-panel">
				    <textarea ref="dataResult" style={{width:"100%",height:300 }}></textarea>
                </div>
			</div>
		);
	}
});