var classnames = require('classnames');
var nodeTree = [];
var Tree = React.createClass({
    getDefaultProps: function(){
        return{
            id:'',
            className:'',
            defaultCollapsed:'false'
        }
    },
    getInitialState:function () {
        return{
            collapsed: this.props.defaultCollapsed,
            nodeTree: [],
            nodeCheck:[]

        }
    },
    getNodeTree: function (data,ranks) {
        for(var i = 0,len=data.length; i< len ;i++){
            nodeTree.push({id:data[i].id,pid:ranks,title:data[i].title});
            if(data[i].child){
                for (var j=0,len2 = data[i].child.length;j < len2; j++) {
                    nodeTree.push({id:data[i].child[j].id,pid:data[i].id,title:data[i].child[j].title})
                    if (data[i].child[j].child) {
                        ranks = data[i].child[j].id;
                        this.getNodeTree(data[i].child[j].child,ranks);
                    }
                }

            }
        }
    },
    componentDidMount:function () {
        this.getNodeTree(this.props.data,-1);
    },
    _getTreeDom:function (menuObj) {
        var collapsed = this.state.collapsed;
        var vdom = [];
        var that = this;
        var arrowClass = 'ucs-tree-arrow';
        var childrenClass = 'ucs-tree-children';
        if(collapsed){
            arrowClass += ' ucs-tree-arrow-collapsed';
            childrenClass += ' ucs-tree-children-collapsed';
        }

        var arrow = <div className={arrowClass} ref={menuObj.id} onClick={that._handleArrow.bind(that,menuObj.id)}/>;
        //判断是否为数组
        if(menuObj instanceof Array){
            var list = [];
            menuObj.map(function(node){
                if(node.child){
                    list.push(that._getTreeDom(node))
                }else{
                    list.push(
                        <div><a id={node.id} href='javascript:;' onClick={that.onClick.bind(that,node.id)} >{node.title}</a></div>
                    ) ;
                }
            })

            vdom.push(
                <div>
                    {list}
                </div>
            )
        }else{
            var childDom;
            if(menuObj.child){
                childDom = this._getTreeDom(menuObj.child)
            }
            vdom.push(
                <div className="ucs-tree" id={this.props.id}>
                    <div className={'ucs-tree-item'}>
                        {arrow}
                        <span id={menuObj.id} onClick={this.onClick.bind(that,menuObj.id)}>{menuObj.title}</span>

                    </div>
                    <div className={childrenClass}>
                        {childDom}
                    </div>
                </div>
            )
        }
        return vdom;
    },
    _handleArrow:function (arrowId) {
        var arrowCurrent = this.refs[arrowId];
        var arrowclass = arrowCurrent.className;
        var childCurrent = arrowCurrent.parentNode.nextSibling;
        if(arrowclass.indexOf('ucs-tree-arrow-collapsed') == -1){
            arrowCurrent.classList ='ucs-tree-arrow ucs-tree-arrow-collapsed';
            childCurrent.classList ='ucs-tree-children ucs-tree-children-collapsed';
        }else{
            arrowCurrent.classList ='ucs-tree-arrow';
            childCurrent.classList ='ucs-tree-children';

        }
    },
    onClick:function (args) {
        UEventHub.emit('NodeClick',args);

    },
    render: function(){
        return  <div>
            {this._getTreeDom(this.props.data)}
        </div>
    }
})
module.exports = Tree;