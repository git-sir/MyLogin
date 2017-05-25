<<<<<<< Updated upstream
/*
 *     showLine :是否显示虚线
 *      showIcon：是否显示icon
 *      expandAll:是否展开
 *      column：表头数据
 *      data:表格数据
 */

var classnames = require('classnames');
var _treeTableIcons ={};
var treeTableIndex = 0;
var treeNodeIndex = 0;
var TreeTable = React.createClass({
    getDefaultProps: function () {
        return{
            showLine:true,
            showIcon:true,
            expandAll:true
=======
var RsuiteTable = require('rsuite-table');
var Table = RsuiteTable.Table;
var Column = RsuiteTable.Column;
var Cell = RsuiteTable.Cell;
var HeaderCell = RsuiteTable.HeaderCell;
var Checkbox = require('../Checkbox');
var CheckboxCell = function(data){
        var dataKey = data.dataKey;
        var dataStr = data.rowData[dataKey];
        var dataChecked = data.dataKey+'_checked';

        function onClick() {
            UEventHub.emit('CellEvent',data.rowData[data.id],data.rowData[data.pid])
>>>>>>> Stashed changes
        }
        return(
            <Cell {...data} >
                {dataStr? <Checkbox value={dataStr} text={dataStr} id={data.rowData[data.id]} pid ={data.rowData[data.pid]} checked={data.rowData[dataChecked]} onClick={onClick} />:''}
            </Cell>
        )
    }
var Cells = function(data){
    var dataKey = data.dataKey;
    var dataStr = data.rowData[dataKey];
    var dataId = data.dataKey+'_id';

    return(
        <Cell {...data} >
            <span id={data.rowData[dataId]} data-pid ={data.rowData[data.pid]} >{dataStr}</span>
        </Cell>
    )
}

var TreeTable = React.createClass({
    getInitialState: function() {
        return {
<<<<<<< Updated upstream
            data: this.props.data,
            column:this.props.column,
            showLine: this.props.showLine,
            showIcon: this.props.showIcon,
            _treeIndPrefix:'treeTable_',
            instants:{},
            mapping: {},
            TreeNode:function (item) {
                this.item = item;
                this.nodes = [];
            }
        };
    },
    onClick:function () {
        this.props.onClick? this.props.onClick:''
    },
    componentWillMount:function () {
        if(this.props.showLine){
            _treeTableIcons['empty'] = 'ucs-treeTableImg-empty';
            _treeTableIcons['folder'] = 'ucs-treeTableImg-folder';
            _treeTableIcons['folderopen'] = 'ucs-treeTableImg-folderopen';
            _treeTableIcons['join'] = 'ucs-treeTableImg-join';
            _treeTableIcons['joinbottom'] = 'ucs-treeTableImg-joinbottom';
            _treeTableIcons['line'] = 'ucs-treeTableImg-line';
            _treeTableIcons['minus'] = 'ucs-treeTableImg-minus';
            _treeTableIcons['minusbottom'] = 'ucs-treeTableImg-minusbottom';
            _treeTableIcons['nolines_minus'] = 'ucs-treeTableImg-nolines-minus';
            _treeTableIcons['nolines_plus'] = 'ucs-treeTableImg-nolines-plus';
            _treeTableIcons['page'] = 'ucs-treeTableImg-page';
            _treeTableIcons['plus'] = 'ucs-treeTableImg-plus';
            _treeTableIcons['plusbottom'] = 'ucs-treeTableImg-plusbottom';
        }else {
            _treeTableIcons['empty'] = 'ucs-treeTableImg-empty';
            _treeTableIcons['folder'] = 'ucs-treeTableImg-folder';
            _treeTableIcons['folderopen'] = 'ucs-treeTableImg-folderopen';
            _treeTableIcons['join'] = 'ucs-treeTableImg-empty';
            _treeTableIcons['joinbottom'] = 'ucs-treeTableImg-empty';
            _treeTableIcons['line'] = 'ucs-treeTableImg-empty';
            _treeTableIcons['minus'] = 'ucs-treeTableImg-nolines-minus';
            _treeTableIcons['minusbottom'] = 'ucs-treeTableImg-nolines-minus';
            _treeTableIcons['nolines_minus'] = 'ucs-treeTableImg-nolines-minus';
            _treeTableIcons['nolines_plus'] = 'ucs-treeTableImg-nolines-plus';
            _treeTableIcons['page'] = 'ucs-treeTableImg-page';
            _treeTableIcons['plus'] = 'ucs-treeTableImg-nolines-plus';
            _treeTableIcons['plusbottom'] = 'ucs-treeTableImg-nolines-plus';
        }
        this.state.instants[this.state._treeIndPrefix + treeTableIndex++ ] = this;
=======
            data: this.props.data

        };
    },
    onChange:function (id,pid) {
        console.log(id+'|'+pid)
>>>>>>> Stashed changes
    },
    componentWillReceiveProps:function (newProps) {
        this.setState(
            {
                data: newProps.data,
                column:newProps.column,
                showLine: newProps.showLine,
                showIcon: newProps.showIcon
            }
        )
    },
    componentDidMount:function () {
<<<<<<< Updated upstream
        this.state.instants[this.id = this.props.id
            ? this.props.id
            : this.state._treeIndPrefix + treeTableIndex++] = this;
        this.expandAll(this.props.expandAll);
    },
    //添加节点
    addNode:function (parentNode,childNode) {
        if(parentNode){
            childNode.parentId = parentNode.id;
            childNode.id = parentNode.id + '_' + treeNodeIndex++;
            parentNode.nodes[parentNode.nodes.length] = childNode;
            childNode.parent = parentNode;
        }else {
            childNode.id = this.props.id + '_' + treeNodeIndex++;
        }
        childNode.isOpened = true;
        this.state.mapping[childNode.id] = childNode;
    },
    getRoot:function () {
        return this.rootNode;
    },
    setRoot:function (rootNode) {
        this.addNode(null,rootNode);
        this.rootNode = rootNode;
    },
    traverseModel:function (parentNode,item) {
        if(item){
            var treeNode = new this.state.TreeNode(item);
            this.addNode(parentNode,treeNode);
            var children = item.children;
            if(children && children.constructor == Array){
                for(var i = 0; i < children.length; i++){
                    this.traverseModel(treeNode,children[i]);
                }
            }
            if(!parentNode){
                this.setRoot(treeNode);
            }
        }
    },
    makeupTbody:function (layout,rootNode,treeNode,indexs,count,indent) {
        var that = this;
        var trStr = [];
        if(treeNode && treeNode.item){
            var isFolderNode = (treeNode.nodes.length > 0);
            {/*<tr id = {treeNode.id} className="ucs-treeTableRow">*/}
            var tdStr = [];
            {layout.map(function (item,index) {
                var tdText = item.get
                    ? item.get(treeNode.item,index,treeNode)
                    : that.get(treeNode.item,index,treeNode);
                var className = item.className;
                var icon = item.getIcon
                    ? item.getIcon(treeNode.item, index, treeNode, true)
                    : that.getIcon(treeNode.item, index, treeNode, true);
                var iconElement;
                if(icon && icon != ''){
                    iconElement = <span className = {icon} ></span>;
                }
                if(index == 0){
                    var imageStr = '';
                    var eventStr = '';
                    if(indexs == count - 1) {
                        imageStr = _treeTableIcons[isFolderNode ? 'minusbottom' : 'joinbottom'];
                    }else {
                        imageStr = _treeTableIcons[isFolderNode ? (treeNode == rootNode ? 'nolines_minus' : 'minus') : 'join'];
                    }
                    if(!that.props.showIcon){
                        iconElement = null;
                    }
                    var imgClass = classnames('ucs-treeTableImg',imageStr);
                    if(isFolderNode){
                        var folderId = 'folder_'+treeNode.id;
                        tdText = <span>{indent}<span className={imgClass} id={folderId} onClick={that.handleNodeClick.bind(that,folderId)}></span>{iconElement}{tdText}</span>;
                    }else {
                        tdText = <span>{indent}<span className={imgClass}></span>{iconElement}{tdText}</span> ;

                    }

                }else {
                    tdText = <span>{iconElement}{tdText}</span>;
                }
                className = classnames('ucs-treeTableCell',className ? className : '');
                tdStr.push(
                    <td className={className}>{tdText}</td>
                )
            })}
            trStr.push( <tr id = {treeNode.id} className='ucs-treeTableRow'>{tdStr} </tr>);
            {treeNode.nodes.map(function (item,i) {
                var fillImg = (indexs != -1 && indexs != count - 1) ? classnames('ucs-treeTableImg',_treeTableIcons['line']): classnames('ucs-treeTableImg',_treeTableIcons['empty']);
                var nextIndent = <span>{indent}<span className={fillImg}></span></span>;
                trStr.push(that.makeupTbody(layout, rootNode, item, i, treeNode.nodes.length,nextIndent));
            })}

        }
        return trStr;
    },
    get:function (item,column,treeNode,treeTable) {
        var layout = this.props.column;
        return treeNode.item[layout[column].field]
    },
    getIcon: function (item,column,treeNode,isOpened) {
        if(column == 0){
            if(treeNode.nodes.length > 0){
                return 'ucs-treeTableImg '+_treeTableIcons[isOpened ? 'folderopen' : 'folder'];
            }else {
                return 'ucs-treeTableImg '+_treeTableIcons['page'];
            }
        }
        return '';
    },
    expandNode: function (treeNode,isOpened) {
        this.expand(treeNode,isOpened,false)
    },
    expandAll: function (isOpened) {
        var rootNode = this.getRoot();
        if(rootNode){
            this.expand(rootNode,isOpened,true)
        }
    },
    expand: function (treeNode,isOpened,isOpenAll) {
        var _self = this;
        if(!treeNode){
            return;
        }
        var subTreeNodes = treeNode.nodes;
        if(subTreeNodes && subTreeNodes.length > 0){
            var source = document.getElementById('folder_'+treeNode.id);
            var trNode = source.parentNode.parentNode;
            var folderNode = source.nextSibling;
            var itemId = trNode.id;
            var parentNode = source.parentNode;
            while (parentNode.tagName.toLowerCase() != 'table'){
                parentNode = parentNode.parentNode;
            }
            if(_self.props.showIcon){
                folderNode.setAttribute('class','ucs-treeTableImg '+_treeTableIcons[isOpened ? 'folderopen' : 'folder']);
            }
            var isRootNode = treeNode == _self.getRoot();
            if(isRootNode){
                source.setAttribute('class','ucs-treeTableImg '+_treeTableIcons[isOpened ? 'nolines_minus' : 'nolines_plus']);
            }else {
                var isLastTreeNode = treeNode.parent.nodes[treeNode.parent.nodes.length - 1] == treeNode ? true : false;
                if (isLastTreeNode) {
                    source.setAttribute('class', 'ucs-treeTableImg '+_treeTableIcons[isOpened ? 'minusbottom' : 'plusbottom']);
                } else {
                    source.setAttribute('class', 'ucs-treeTableImg '+_treeTableIcons[isOpened ? 'minus' : 'plus']);
=======

    },
    render: function() {
        var data = this.props.data;
        var formatData = [];
        var finalData = [];
        for(var i=0,len=data.length;i<len;i++){
            data[i].children = [];
            for(var j=0;j<len;j++){
                var module_id = data[i].module_id;
                var parent_id = data[j].parent_id;
                if(module_id == parent_id){
                    data[i].children.push(data[j]);
>>>>>>> Stashed changes
                }
            }
            formatData.push(data[i]);
        }
        finalData = formatData[0].children;
        return (
            <div>
                <Table  height={400} data={finalData} isTree expand>
                    {this.props.column.map(function (item,index) {

<<<<<<< Updated upstream
        for (var i = 0; i < subTreeNodes.length; i++){
            var subTreeNode = subTreeNodes[i];
            var subTrNode = document.getElementById(subTreeNode.id);
            if (subTrNode) {
                subTrNode.style.display = isOpened ? 'table-row' : 'none';
            }
            if (!isOpenAll && isOpened && !subTreeNode.isOpened) {
                continue;
            }
            if (isOpenAll) {
                treeNode.isOpened = isOpened;
            }
            _self.expand(subTreeNode, isOpened, isOpenAll);
        }
    },
    handleNodeClick: function (id) {
        var _self = this;
        // var source = event.currentTarget || event.srcElement;
        var source = document.getElementById(id);
        var trNode = source.parentNode.parentNode.parentNode;
        var itemId = trNode.id;
        var parentNode = source.parentNode;
        while (parentNode.tagName.toLowerCase() != 'table') {
            parentNode = parentNode.parentNode;
        }
        var treeTable = _self.state.instants[parentNode.id];
        var treeNode = treeTable.state.mapping[itemId];
        var isOpened = treeNode.isOpened;
        treeTable.expandNode(treeNode, !isOpened);
        treeNode.isOpened = !isOpened;
    },
    render: function() {
        var layout = this.state.column;
        var data = this.state.data;
        if(layout && layout.constructor == Array && layout.length > 0){
            if(this.props.data){
                this.traverseModel(null,data)
            }
            return(
                <table id={this.props.id} className="ucs-treeTable">
                    <thead className="ucs-treeTableHeader">
                    <tr>
                        {layout.map(function (item) {
                            var headerClass = item.headerClass ? item.headerClass : '';
=======
                        if(item.checkable){
>>>>>>> Stashed changes
                            return(
                                <Column width={item.width} ref={index}>
                                    <HeaderCell>{item.title}</HeaderCell>
                                    <CheckboxCell dataKey={item.dataIndex} id={item.id} pid={item.pid} />
                                </Column>
                            )
                        }else {
                            return(
                                <Column width={item.width} ref={index}>
                                    <HeaderCell>{item.title}</HeaderCell>
                                    <Cells dataKey={item.dataIndex} id={item.id} pid={item.pid}/>
                                </Column>
                                )

                        }

                    })}


                </Table>
            </div>
        );
    }
});

module.exports = TreeTable;
