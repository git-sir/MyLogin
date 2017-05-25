var classnames = require('classnames');
var Table = require('../Table/index.js');
var Pagination = require('../Pagination/index.js');
var SelectDropDown = require('../SelectDropDown/index.js');
var Input = require('../Input/index.js');
var Button = require('../Button/index.js');
/*

 Props:
 id: 组件的div的id
 data:数据源
 className: 组件的div的class
 itemsPerPage: 表格每页显示多少条
 crrentPage: 设置初始化时显示第几页
 isSetItemsPerPageDisplay 是否显示 每页显示数据条数下拉框
 isFilterDisplay 是否显示 过滤
 isSortDisplay 是否显示 排序
 getData 获取新数据

 State:
 gridData: 数据源放到state
 currentPage：当前页
 totalPage: 总页数
 itemsPerPage：每页几条
 filterInputValue：搜索文字
 sortColumn：排序列名
 sortStatus：排序方向

 */

var selectDropDownOptions1 = [{ option: "5" }, { option: "10" }, { option: "15" }, { option: "20" }, { option: "25" }, { option: "30" } ];

var gridTable = React.createClass({
    getDefaultProps:function() {
        return {
            id:'',
            data: [],
            classNames: {
                rootDiv: '',
                itemsPerPage: '',
                table: '',
                pagination: '',
                filter: ''
            },
            itemsPerPage: 10,
            currentPage: 1,
            isSetItemsPerPageDisplay: false,
            isFilterDisplay: false,
            isSortDisplay: false
        }
    },
    getInitialState:function() {
        return {
            gridData: this.props.gridData,
            currentPage:this.props.currentPage,
            totalPage: this.props.totalPage,
            itemsPerPage:this.props.itemsPerPage,
            filterInputValue:'',
            sortColumn:'',
            sortStatus:''
        }
    },

    //提供给父组件设值
    setValue: function (obj) {
        var _obj = {};
        obj.gridData && (_obj.gridData = obj.gridData);
        obj.currentPage && (_obj.currentPage = obj.currentPage);
        obj.totalPage && (_obj.totalPage = obj.totalPage);
        obj.itemsPerPage && (_obj.itemsPerPage = obj.itemsPerPage);
        obj.filterInputValue && (_obj.filterInputValue = obj.filterInputValue);
        obj.sortColumn && (_obj.sortColumn = obj.sortColumn);
        obj.sortStatus && (_obj.sortStatus = obj.sortStatus);
        this.setState(_obj);
    },
    //提供给父组件取值
    getValue: function () {
        return this.state.gridData;
    },
    //跳页
    goCur:function(cur){
        var itemsPerPage = this.props.isSetItemsPerPageDisplay ? parseInt(this.refs.refItemsPerPageSelectDropDown.getValue()) : 10;
        var paramObj = {
            currentPage: parseInt(cur),
            itemsPerPage: itemsPerPage
        };
        this.props.isFilterDisplay && (paramObj.filterInputValue = this.state.filterInputValue);
        this.props.isSortDisplay && (this.state.sortColumn !== '' ? paramObj.sortColumn = this.state.sortColumn : '');
        this.props.isSortDisplay && (this.state.sortStatus !== '' ? paramObj.sortStatus = this.state.sortStatus : '');
        this.props.getData(paramObj);
    },
    //每页显示条数
    setItemsPerPageOnChange:function(e){
        var paramObj = {
            currentPage: 1,
            itemsPerPage: parseInt(e.option)
        };
        this.props.isFilterDisplay && (paramObj.filterInputValue = this.state.filterInputValue);
        this.props.isSortDisplay && (this.state.sortColumn !== '' ? paramObj.sortColumn = this.state.sortColumn : '');
        this.props.isSortDisplay && (this.state.sortStatus !== '' ? paramObj.sortStatus = this.state.sortStatus : '');
        this.props.getData(paramObj);
    },
    //排序
    sortHandle:function(column, status){
        var paramObj = {
            sortColumn: column,
            sortStatus: status,
            currentPage:1,
            itemsPerPage:this.state.itemsPerPage
        }
        this.state.filterInputValue !== '' ? paramObj.filterInputValue = this.state.filterInputValue : '';
        this.props.getData(paramObj);
        this.props.sortHandle && this.props.sortHandle(column, status);
    },
    //搜索
    searchHandle:function(){
        var filterInputValue = this.refs.refFilterInput.getValue() || '';
        if(filterInputValue.trim() === ''){
            alert("请输入搜索文字");
            return;
        }
        var itemsPerPage = this.props.isSetItemsPerPageDisplay ? parseInt(this.refs.refItemsPerPageSelectDropDown.getValue()) : 10;
        var paramObj = {
            currentPage: 1,
            itemsPerPage: itemsPerPage,
            filterInputValue: filterInputValue
        };
        this.props.isSortDisplay && (this.state.sortColumn !== '' ? paramObj.sortColumn = this.state.sortColumn : '');
        this.props.isSortDisplay && (this.state.sortStatus !== '' ? paramObj.sortStatus = this.state.sortStatus : '');
        this.props.getData(paramObj);
    },
    //搜索框改变
    filterOnChange:function(e){
        this.setValue({
            filterInputValue:e.target.value
        });
    },
    render:function() {
        return (
            <div id={this.props.id} className={classnames("ucs-gridTable", this.props.classNames.rootDiv)}>
                { this.props.isSetItemsPerPageDisplay &&
                <div ref="itemsPerPage"
                     className={classnames("ucs-gridTable-setItemsPerPage", this.props.classNames.itemsPerPage)}>
                    每页显示
                    <SelectDropDown
                        ref="refItemsPerPageSelectDropDown"
                        option={selectDropDownOptions1}
                        defaultText={this.state.itemsPerPage}
                        value={this.state.itemsPerPage}
                        onChange={this.setItemsPerPageOnChange}
                    ></SelectDropDown>
                    条
                </div>
                }
                { this.props.isFilterDisplay &&
                <div ref="filter"
                     className={classnames("ucs-gridTable-filter", this.props.classNames.filter)}>
                    搜索文字：
                    <Input
                        ref="refFilterInput"
                        placeholder="请输入搜索文字"
                        onChange={this.filterOnChange}
                        value={this.state.filterInputValue}
                    ></Input>
                    <Button buttonType="confirm" onClick={this.searchHandle}>搜索</Button>
                </div>
                }
                <Table
                    ref="refTable"
                    className={classnames("ucs-gridTable-table", this.props.classNames.table)}
                    columns={this.props.columns}
                    data={this.state.gridData}
                    bordered={true}
                    isSortDisplay={this.props.isSortDisplay}
                    sortHandle={this.sortHandle}
                >
                </Table>
                <Pagination
                    ref="refPagination"
                    className={classnames("ucs-gridTable-pagination", this.props.classNames.pagination)}
                    total={this.state.totalPage}
                    currentPage={this.state.currentPage}
                    goNext={this.goCur}
                    goPrev={this.goCur}
                    goCur={this.goCur}
                />
            </div>
        )
    }
});


module.exports = gridTable;