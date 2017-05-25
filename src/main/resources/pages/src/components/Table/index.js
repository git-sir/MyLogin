var classnames = require('classnames');

var Table = React.createClass({
    getDefaultProps:function() {
        return {
            id:'',
            data: [],
            className: '',
            bordered: false,  //是否显示边框
            striped: false,   //是否隔行变色
            hover: false,     //是否悬浮变色
            hasThead: true,    //是否有头部
            isSortDisplay:false //是否显示排序
        }
    },
    getInitialState:function() {
        return {
            stateData: this.props.data,     //数据列表
            sortColumn: '',                 //排序列
            sortStatus: ''                  //排序方向
        }
    },
    sortHandle:function(column, status){
        this.setState({
            sortColumn:column,
            sortStatus:status
        });
        {this.props.sortHandle && this.props.sortHandle(column, status)}
    },
    renderHeader:function(columns) {
        var RootThis = this;
        var headers = [];
        //遍历表头columns
        columns.forEach(function(header, i) {
            if(header.hidden) {
                return;
            }
            headers.push(
                <Header
                    header={header.header}
                    name={header.name}
                    subHeader={header.subHeader}
                    width={header.width}
                    isSortDisplay={RootThis.props.isSortDisplay}
                    sort={header.sort}
                    sortColumn={RootThis.state.sortColumn}
                    sortStatus={RootThis.state.sortStatus}
                    sortHandle={RootThis.sortHandle}
                    key={header.name || i} />
            );
        })
        return <thead><tr>{headers}</tr></thead>;
    },
    renderBody:function(columns) {
        if (!columns) {
            return;
        }
        var data = this.state.stateData;
        var hasThead = this.props.hasThead;
        //如果data不是数组，直接显示data内容，可用于列表为空的情况
        if (!Array.isArray(data)) {
            return (
                <tbody>
                <tr>
                    <td colSpan={columns.length}>{data}</td>
                </tr>
                </tbody>
            )
        }
        //如果data数组长度是0
        if (data.length == 0) {
            return (
                <tbody>
                <tr>
                    <td colSpan={columns.length}>暂无数据</td>
                </tr>
                </tbody>
            )
        }
        //遍历data
        var trs = data.map(function(d, i) {
            return (
                <Tr key={d.id}
                    columns={columns}
                    data={d}
                    id={d.id}
                    trIndex={i}
                    hasThead={hasThead}
                />
            )
        });
        return <tbody>{trs}</tbody>;
    },
    //提供给父组件设值
    setValue: function (v) {
        this.setState({stateData: v});
    },
    //提供给父组件取值
    getValue: function () {
        return this.state.stateData
    },
    componentWillReceiveProps:function(nextProps){
        this.setState({stateData:nextProps.data});
    },
    render:function() {
        var hover = this.props.hover;
        var bordered = this.props.bordered;
        var striped = this.props.striped;
        var columns = this.props.columns;

        var className = classnames(
            'ucs-table',
            hover && 'ucs-table-hover',
            bordered && 'ucs-table-bordered',
            striped && 'ucs-table-striped',
            this.props.className
        );

        return (
            <div className={className}>
                <table id={this.props.id}>
                    { columns && this.props.hasThead ? this.renderHeader(columns) : '' }
                    { columns && this.renderBody(columns) }
                </table>
            </div>
        )
    }
});

var Header = React.createClass({
    //获取排序图标的class
    getClassName:function(base, name, status) {
        return classnames(
            base,
            this.props.sortColumn === name && this.props.sortStatus === status && 'active'
        )
    },
    sortClick:function(t, sortStatus) {
        var name = t.props.name;
        if(name === this.props.sortColumn && sortStatus === this.props.sortStatus) return;
        this.props.sortHandle(name, sortStatus);
    },
    render:function() {
        var header = this.props.header;
        var name = this.props.name;
        var width = this.props.width;
        var subHeader = this.props.subHeader;
        var isSortDisplay = this.props.isSortDisplay;
        var sort = this.props.sort;
        var sortIcons = [
            <a key="up" className={this.getClassName('sort-up', name, 'asc')} onClick={this.sortClick.bind(this, this, 'asc')} />,
            <a key="down" className={this.getClassName("sort-down", name, 'desc')}  onClick={this.sortClick.bind(this, this, 'desc')} />
        ]
        return <th style={{width:width, maxWidth: width}}>
            <span className="th-header">{header}</span>
            {subHeader && <span className="th-subheader">{subHeader}</span>}
            {isSortDisplay && sort && sortIcons}
        </th>
    }
});

var Tr = React.createClass({
    render:function() {
        var columns = this.props.columns;
        var data = this.props.data;
        var trIndex = this.props.trIndex;
        var hasThead = this.props.hasThead;
        var tds = [];
        columns.map(function(h, j){
            if (h.hidden) return;

            var content = h.content;
            if(h.width !== undefined || h.width !== 'auto'){
                var width = h.width;
            }
            if (typeof content === 'function') {
                content = content(data);
            } else {
                var hName = data[h.name]
                if(typeof hName == 'string'){
                    content = hName;
                }
                if(Array.isArray(hName)){
                    var tempContent = [];
                    hName.map(function(item){
                        for(var i in item){
                            var key = i,
                                value = item[i];
                            tempContent.push(<span className={"td-"+key}>{value}</span>);
                        }
                    });
                    content = tempContent;
                }
            }
            if(!hasThead && trIndex == 0){
                tds.push(<Td width={width} key={j}>{content}</Td>);
            }else{
                tds.push(<Td key={j}>{content}</Td>);
            }
        })
        if(trIndex % 2){
            var trClassName = 'odd-bg';
        }else{
            var trClassName = 'even-bg';
        }
        return <tr className={trClassName} key={this.props.id}>{tds}</tr>
    }
});

var Td = React.createClass({
    render:function() {
        var width = this.props.width;
        if(width !== undefined) {
            return <td style={{width: width, maxWidth: width}}>
                {this.props.children}
            </td>
        }else{
            return <td>
                {this.props.children}
            </td>
        }
    }
});

module.exports = Table;