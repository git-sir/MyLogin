/*
var Tree = UcsmyUI.Tree;
var Left = React.createClass({
    getDefaultProps: function(){
		return{

		}
    },
    getInitialState:function(){//react组件的初始化状态
		return ({
			data: myModules
		});
	},
	componentDidMount:function () {
    },
	onchange:function (e) {
    },
    onClick: function (data, e) {
    	if(data.url) {
    		this.props.onClick(data.url, data.id);
    		return;
    	}

    	// 点击打开
    	var parent = $(e.target).parent().parent();
    	var arrow = $(parent.find(".ucs-tree-arrow")[0]);
    	var children = $(parent.find(".ucs-tree-children")[0]);
    	if(arrow.hasClass("ucs-tree-arrow-collapsed")) {
    		arrow.removeClass("ucs-tree-arrow-collapsed");
        	children.removeClass("ucs-tree-children-collapsed");
    	} else {
    		arrow.addClass("ucs-tree-arrow-collapsed");
        	children.addClass("ucs-tree-children-collapsed");
    	}
    },
    select: function(id) {
    	var subchild = getElementsByClassName('ucs-tree-children', 'div');
		for(var i= 0; i < subchild.length; i++){
			for(var j = 0; j < subchild[i].getElementsByTagName('a').length; j++){
                subchild[i].getElementsByTagName('a')[j].className = '';
			}
		}
		var a = document.getElementById(id);
		if(a)
			a.className = 'current';
    },
    render:function(){
    	return(
			<div className="leftMenu">
				<Tree data={this.state.data} onClick = {this.onClick}/>
			</div>
		)
    }
})
module.exports = Left;
*/
var Navigation = require('./Navigation.js');
var Left = React.createClass({
    getDefaultProps: function(){
		return{
			
		}
    },
    getInitialState:function(){//react组件的初始化状态
		return ({
			data: myModules
		});
	},
    onClick:function(e){
        var id = e.id;
        var subchild = document.getElementsByClassName('leftMenu')[0].getElementsByClassName('children');
        for(var i= 0;i<subchild.length;i++){
            var subLen = subchild[i].getElementsByTagName('a');
            for(var j = 0; j< subLen.length;j++){
                subLen[j].className = '';
            }
        }
        document.getElementById(id).className = 'active';
        
        if(e.url) {
    		this.props.onClick(e.url, e.id);
    		return;
    	}
    },
    select: function(id) {
    	
    },
    render:function(){
    	return(
			<div className="leftMenu">
				<Navigation data={this.state.data} className="ucs-nav-top" onClick={this.onClick}></Navigation>
			</div>
		)
    }
})
module.exports = Left;