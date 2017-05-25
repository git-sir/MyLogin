(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["UcsmyUI"] = factory();
	else
		root["UcsmyUI"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
		Input:__webpack_require__(1),
		Button:__webpack_require__(3),
		Backtop:__webpack_require__(4),
		Breadcrumb:__webpack_require__(5),
		Checkbox:__webpack_require__(6),
		Tag:__webpack_require__(7),
		Tree:__webpack_require__(8),
		Layer:__webpack_require__(9),
		Menu:__webpack_require__(10),
		Progress:__webpack_require__(11),
		InputNumber:__webpack_require__(12),
		Steps:__webpack_require__(13),
		SelectDropDown:__webpack_require__(14),
		RingProgress:__webpack_require__(15),
	    BankCard:__webpack_require__(16),
	    Table:__webpack_require__(17),
		Grid:__webpack_require__(19),
		Tabs:__webpack_require__(20),
		Tips:__webpack_require__(21),
	    Badge:__webpack_require__(22),
	    SeamlessScroll:__webpack_require__(23),
	    Share:__webpack_require__(24),
	    TreeTable:__webpack_require__(25),
	    Pagination:__webpack_require__(26),
	    Radio:__webpack_require__(27),
		DatePicker:__webpack_require__(29),
	    Textarea:__webpack_require__(37),
	    Autocomplete:__webpack_require__(38),
	    Cascader:__webpack_require__(39),
	    GridTable:__webpack_require__(40),
	    Upload:__webpack_require__(41),
	    Form:__webpack_require__(46),
	    Tooltip:__webpack_require__(18),
	    Slider:__webpack_require__(50),
	    Navigation:__webpack_require__(51),
		Spin:__webpack_require__(52),
		Switch:__webpack_require__(53),
		Collapse:__webpack_require__(54)
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var classnames = __webpack_require__(2);
	/**
	 * Input组件
	 *
	 * 示例:
	 *
	 *     @example
	 *     <Input placeholder="default" id="name" ref="ddd" value="333" onChange={this.onchange}/>
	 */
	var Input = React.createClass({displayName: "Input",
	    getInitialState: function () {
	        return {
	            value: this.props.value,
	            spanPlaceholder: true,
	            className:classnames('ucs-input',this.props.className,this.props.disabled ? 'disabled' : '')
	        }
	    },
	    getDefaultProps: function () {
	        return {

	        }
	    },
	    componentWillMount: function () {
	        if (this.props.value) {
	            this.setState({
	                spanPlaceholder: false
	            });
	        }

	    },
	    componentWillReceiveProps:function (nextProps) {
	        if(this.props.value !== nextProps.value){
	            this.setState({
	                value: nextProps.value,
	                spanPlaceholder: nextProps.value ? false : true
	            });
	        }else {
	            //console.log('不用')
	        }

	    },
	    /**
	     * Input的value改变时执行的事件
	     * @param e
	     *
	     * */
	    onChange: function (e) {
	        this.setState({
	            value: e.target.value,
	            spanPlaceholder: e.target.value ? false : true
	        });
	        this.props.onChange ? this.props.onChange(e) : "";
	    },
	    /**
	    * Input获取焦点时执行的事件
	    * @param e
	    *
	    * */
	    onFucus: function (e) {
	        //根据ie10的标准，获得焦点时提示是会消失的，因此失去焦点也要相应的处理
	        this.setState({
	            spanPlaceholder: false
	        });
	        this.props.onFocus ? this.props.onFocus(e) : "";
	    },
	    /**
	     * Input失去焦点时执行的事件
	     * @param e
	     *
	     * */
	    onBlur: function (e) {
	        this.setState({
	            spanPlaceholder: e.target.value ? false : true
	        });
	        this.props.onBlur ? this.props.onBlur(e) : "";
	    },
	    _handlePlaceholderClick: function () {

	        //让文字框获得焦点
	        this.refs.inputtext.focus();
	    },
	    /**
	     * 设置Input的value
	     * @param {string} v
	     * Input的value
	     *
	     * */
	    setValue: function (v) {
	        this.setState({value: v});
	    },
	    /**
	     * 获取Input的值
	     * @return {string}
	     * */
	    getValue: function () {
	        return this.state.value
	    },
	    render: function () {

	        //value值不为空时，隐藏提示
	        var spanPlaceholder = {
	            display: this.state.spanPlaceholder ? "block" : "none"
	        };
	        var placeholder = "";
	        //这里先是判断浏览器的支持，
	        if (this.props.placeholder && !('placeholder' in document.createElement('input'))) {
	            placeholder = (React.createElement("span", {className: "ucs-placeholder", style: spanPlaceholder, 
	                                 onClick: this._handlePlaceholderClick}, this.props.placeholder));
	        }
	        return (
	            React.createElement("div", {className: "ucs-input-control"}, 
	                React.createElement("input", React.__spread({type: "text"},  this.props, 
	                       {value: this.state.value, 
	                       className: this.state.className, 
	                       ref: "inputtext", onChange: this.onChange, onFocus: this.onFucus})), 
	                placeholder
	            )

	        )
	    }
	});
	module.exports = Input;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var classNames=__webpack_require__(2);
	/**
	 * Button组件
	 * @author phy <yao.qianfeng@ucsmy.com>
	 *
	 * 示例：
	 *
	 *      @example
	 *      <Button buttonType="cancel">取消</Button>
	 *
	 */
	var Button = React.createClass({displayName: "Button",
	    propTypes:{
	        onClick: React.PropTypes.func
	    },
	    getInitialState:function(){
	        return {
	            currentClassName : ''
	        };
	    },

	    /**
	     *点击事件处理程序
	     *
	     * @param e
	     */
	    _handleClick:function(e){
	        var _self=this;
	        _self.setState({currentClassName : 'ucs-btn-clicked'});
	        setTimeout(function(){
	            _self.setState({currentClassName : ''});
	        },200);
	    },

	    /**
	     * 获取class类名
	     * @returns {Object}
	     *
	     */
	    getClassName:function(){
	        var defaultClassName='ucs-btn';
	        var customClassNameArr=this.props.buttonType?this.props.buttonType.split(' '):'';
	        var customClassName='';
	        if(customClassNameArr.length>0){
	            for(var i=0;i<customClassNameArr.length;i++){
	                customClassName='ucs-btn-'+customClassNameArr[i]+' '+customClassName;
	            }
	        }
	        var className=classNames(defaultClassName,customClassName,this.props.className);
	        return (className);
	    },

	    /**
	     * 获取按钮尺寸大小
	     *
	     */
	    getSize:function () {
	        var size=this.props.size;
	    },

	    render:function(){
	        var html;
	        // var displayType=this.props.display?'ucs-btn-block':'';
	        if(this.props.HtmlType=='link'){
	            html=React.createElement("a", React.__spread({},  this.props, {className: this.getClassName(), onClick: this.props.onClick? this.props.onClick:this._handleClick}), this.props.children);
	        }else{
	            html=React.createElement("button", React.__spread({},  this.props, {className: this.getClassName(), type: "button", onClick: this.props.onClick? this.props.onClick:this._handleClick}), this.props.children);
	        }
	        return (html);
	    }
	});
	module.exports = Button;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	
	var classnames = __webpack_require__(2);
	    /**
	     * 回到顶部组件
	     * 
	     * @param  [visibilityHeight] 自定义滚动高度，默认400
	     * 
	     * @param [right] 距离右边的大小，默认20px
	     * 
	     * @param [onClick]  点击事件，默认为空，自定义点击后执行的事件
	     *
	     * 
	     * @author chenzefang
	     * 
	     * 示例： 
	     * 
	     *     @example
	     *     <Backtop visibilityHeight='100' right='100' />
	     */
	var Backtop = React.createClass({displayName: "Backtop",   // 自定义宽高50
	    getDefaultProps: function(){
	        return {
	            id: '',
	            visibilityHeight: '400', //可配置滚动多高才出现，默认400
	            right: '20'
	        }
	    },
	    getInitialState: function(){
	        return {
	            right:'-120px',
	            className: classnames('ucs-backtop',this.props.className)
	        }
	    },
	    onClick: function(){
	        document.body.scrollTop = 0;
	        this.setState({right:'-120px'});
	        this.props.onClick? this.props.onClick():null;
	    },
	    componentDidMount: function(){
	        if(document.addEventListener){
	            window.addEventListener('scroll',function(){
	                var t = document.documentElement.scrollTop || document.body.scrollTop;
	                if(t > this.props.visibilityHeight){
	                    this.setState({right:this.props.right+'px'});
	                }else{
	                    this.setState({right:'-120px'});

	                }
	            }.bind(this))
	        }else {
	            window.attachEvent('onscroll',function(){
	                var t = document.documentElement.scrollTop || document.body.scrollTop;
	                if(t > this.props.visibilityHeight){
	                    this.setState({right:this.props.right+'px'});
	                }else{
	                    this.setState({right:'-120px'});

	                }
	            }.bind(this))
	        }

	    },
	    render:function(){
	        return(
	            React.createElement("div", React.__spread({ref: "backtop"},  this.props, {style: {right:this.state.right}, className: this.state.className, onClick: this.onClick}), this.props.children)
	        )
	    }
	})
	module.exports = Backtop;





/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 *
	 * @author chenzefang
	 *
	 * 面包屑组件
	 *
	 * @param [separator ">" 默认分隔符
	 *
	 * 示例：
	 *
	 *     @example
	 *     <Breadcrumb	separator='/' >
	 *     <Breadcrumb.Item>首页</Breadcrumb.Item>
	 *     <Breadcrumb.Item href="baidu.com">我的账户</Breadcrumb.Item>
	 *     <Breadcrumb.Item href="baidu.com">个人信息</Breadcrumb.Item>
	 *     </Breadcrumb>
	 *
	 */
	var Breadcrumb = React.createClass({displayName: "Breadcrumb",
	    getDefaultProps: function(){
	        return{
	            separator:'>'   //分隔符
	        }
	    },
	    render: function(){
	        var that = this;
	        var len = React.Children.count(this.props.children);
	        return React.createElement("div", {className: "ucs-breadcrumb"}, 
	            
	                React.Children.map(this.props.children, function (child,index) {
	                    console.log(index);
	                    if(index == len-1){
	                        return React.createElement("span", {className: "ucs-breadcrumb-link-last"}, child);
	                    }else{
	                        return React.createElement("span", null, React.createElement("a", {className: "ucs-breadcrumb-link", href: child.props.href}, child), 
	                            that.props.separator);
	                    }
	                })
	            
	        )
	    }
	});

	Breadcrumb.Item = React.createClass({displayName: "Breadcrumb.Item",
	    getDefaultProps: function  () {
	        return{
	            href:'javascript:;'
	        }
	    },
	    render: function () {
	        return React.createElement("span", null, this.props.children)
	    }
	})

	module.exports = Breadcrumb;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var classnames = __webpack_require__(2);
	    /**
	     * Checkbox组件
	     *
	     * @param [checked] 是否选中
	     * @param value value值
	     * @param [text] 显示的文案
	     * @param [disabled] 是否禁用
	     *
	     * 示例:
	     *
	     *     @example
	     *     <Checkbox ref="checkref" id="11" value="复选框1"  text="自定义内容" eventId="first"/>
	     */
	var Checkbox = React.createClass({displayName: "Checkbox",
	    getInitialState: function(){
	        return {
	            checked:this.props.checked ? this.props.checked : false,
	            disabled:this.props.disabled,
	            className:classnames('ucs-checkbox-input',this.props.className),
	            value: this.props.value,
	            text:this.props.text
	        }
	    },
	        /**
	         * Checkbox点击事件
	         * @param {object} args
	         * 返回组件的state值
	         * */
	    onClick: function (args) {
	        this.setState({checked:!this.state.checked});
	        args.checked = !this.state.checked;
	        this.props.onClick ? this.props.onClick(args) : "";
	    },
	       /**
	        * 获取Checkbox的值
	        * @return {string}
	        * */
	    getValue: function () {
	        return this.state.value;
	    },
	        /**
	         * 设置Checkbox的value
	         * @param {string} v
	         * Checkbox的value
	         *
	         * */
	    setValue: function (v) {
	        this.setState({value:v})
	    },
	        /**
	         * 获取Checkbox的显示文字
	         * @return {string}
	         * */
	    getText: function () {
	        return this.state.text;
	    },
	        /**
	         * 设置Checkbox的显示文字
	         * @param {string} v
	         *
	         * */

	    setText: function (v) {
	        this.setState({text:v})
	    },
	        /**
	         * 获取Checkbox的checked值
	         * @return {string}
	         * */
	    getChecked:function () {
	        return this.state.checked;
	    },
	        /**
	         * 设置Checkbox的value
	         * @param {string} v
	         * Checkbox的checked值
	         *
	         * */
	    setChecked:function (v) {
	        this.setState({checked:v});
	    },
	    componentWillReceiveProps:function (nextProps) {
	        if(this.props.value !== nextProps.value){
	            this.setState({
	                value:nextProps.value,
	                checked:nextProps.checked,
	                text:nextProps.text});
	        }else {
	            //console.log('不用')
	        }

	    },
	    componentDidMount: function(){
	        var that = this;
	        UEventHub.on(that.props.eventId ? that.props.eventId : 'checkAllEvent',function(bool){
	            that.setState({checked: bool});
	        });
	    },
	    render:function  () {
	        var that = this;
	        var lt8 = true;
	        if ('borderRadius' in document.createElement('div').style) {
	            lt8 = false;
	        }
	        return React.createElement("label", {className: classnames('ucs-checkbox',{'checked':this.state.checked},{'disabled':this.state.disabled},{'lt8':lt8})}, 
	            React.createElement("input", React.__spread({type: "checkbox"},  this.props, {checked: this.state.checked, className: this.state.className, name: this.props.name, onClick: that.onClick.bind(that,that.state)})), 
	            React.createElement("span", {className: "ucs-checkbox-inner", onClick: this.handleClick}), 
	            React.createElement("span", {className: "ucs-checkbox-text", title: this.state.text}, this.state.text)
	        )
	    }
	})

	module.exports = Checkbox;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var classnames = __webpack_require__(2);
	/**
	 * 标签组件
	 *
	 * @param [color] 标签的背景样式
	 *
	 * @param [closable] 是否可以关闭
	 *
	 * @param {function} onClose 点击关闭时的回调事件
	 *
	 * Tag组件
	 * 示例:
	 *
	 *     @example
	 *     <Tag color="#4db6ac" closable >标签2</Tag>
	 */
	var Tag = React.createClass({displayName: "Tag",
	    getDefaultProps: function(){
	        return{
	            className: '',
	            color:'',   //标签的背景颜色
	            closable: false,   //是否出现关闭按钮,默认不显示
	            onClose:'',  //点击关闭时的回调事件
	        }
	    },
	    getInitialState:function () {
	        return{
	            className: classnames('ucs-tag',this.props.className)
	        }
	    },
	    onClose: function(){
	        this.componentEl = ReactDOM.findDOMNode(this);
	        this.componentEl.remove();
	        var eventClose = this.props.onClose;
	        if(eventClose){
	            eventClose();
	        }
	    },
	    componentDidMount: function () {

	    },
	    render: function(){

	        var closespan = this.props.closable? React.createElement("span", {onClick: this.onClose}, React.createElement("i", {className: "iconfont icon-close"}), " X") : '';
	        return React.createElement("div", React.__spread({},  this.props, {className: this.state.className, style: {backgroundColor:this.props.color}}), this.props.children, closespan)
	    }
	})
	module.exports = Tag;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var classnames = __webpack_require__(2);
	var nodeTree = [];
	/**
	 *
	 *
	 * @param [defaultCollapsed] 是否收起，默认展开
	 * @param  {object} data 树节点数据
	 *
	 * Tree组件
	 *
	 * 示例:
	 *
	 *     @example
	 *     var data=[{
	 *          name:"广东省",
	 *           id:"gd",
	 *           children:[
	 *               {name:"广州",id:'gz',href:'www.baidu.com'},
	 *              {name:"深圳",id:'sz',href:'www.baidu.com'},
	 *               {name:"珠海",id:'zh',href:'www.baidu.com'}]
	 *       },{
	 *           name:"广西省",
	 *           id:"gx",
	 *           children:[
	 *               {name:"桂林",id:'gl',
	 *                   children:[{name:"阳朔",id:'ys',href:'www.baidu.com'},
	 *                       {name:"溶洞",id:'rd',href:'www.baidu.com'},
	 *                       {name:"山水",id:'ss',href:'www.baidu.com',
	 *                           children:[{name:"阳朔",id:'ys',href:'www.baidu.com'},
	 *                               {name:"溶洞",id:'rd',href:'www.baidu.com'},
	 *                               {name:"山水",id:'ss',href:'www.baidu.com'}]
	 *                       }]},
	 *               {name:"北海",id:'bh',href:'www.baidu.com'},
	 *               {name:"南宁",id:'nn',href:'www.baidu.com'}]
	 *       }];
	 *     <Tree data={data} defaultCollapsed={false} onClick = {this.onClick}/>
	 */
	var Tree = React.createClass({displayName: "Tree",
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
	            nodeTree.push({id:data[i].id,pid:ranks,name:data[i].name});
	            if(data[i].children){
	                for (var j=0,len2 = data[i].children.length;j < len2; j++) {
	                    nodeTree.push({id:data[i].children[j].id,pid:data[i].id,name:data[i].children[j].name})
	                    if (data[i].children[j].children) {
	                        ranks = data[i].children[j].id;
	                        this.getNodeTree(data[i].children[j].children,ranks);
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

	        var arrow = React.createElement("div", {className: arrowClass, ref: menuObj.id, onClick: that._handleArrow.bind(that,menuObj.id)});
	        //判断是否为数组
	        if(menuObj instanceof Array){
	            var list = [];
	            menuObj.map(function(node){
	                if(node.children){
	                    list.push(that._getTreeDom(node))
	                }else{
	                    list.push(
	                        React.createElement("div", null, React.createElement("a", {id: node.id, href: "javascript:;", onClick: that.onClick.bind(that,node)}, node.name))
	                    ) ;
	                }
	            })

	            vdom.push(
	                React.createElement("div", null, 
	                    list
	                )
	            )
	        }else{
	            var childDom;
	            if(menuObj.children){
	                childDom = this._getTreeDom(menuObj.children)
	            }
	            vdom.push(
	                React.createElement("div", {className: "ucs-tree", id: this.props.id}, 
	                    React.createElement("div", {className: 'ucs-tree-item'}, 
	                        arrow, 
	                        React.createElement("span", {id: menuObj.id, onClick: this.onClick.bind(that,menuObj)}, menuObj.name)

	                    ), 
	                    React.createElement("div", {className: childrenClass}, 
	                        childDom
	                    )
	                )
	            )
	        }
	        return vdom;
	    },
	    _handleArrow:function (arrowId) {
	        var arrowCurrent = this.refs[arrowId];
	        var arrowclass = arrowCurrent.className;
	        var childCurrent = arrowCurrent.parentNode.nextSibling;
	        if(arrowclass.indexOf('ucs-tree-arrow-collapsed') == -1){
	            arrowCurrent.className ='ucs-tree-arrow ucs-tree-arrow-collapsed';
	            childCurrent.className ='ucs-tree-children ucs-tree-children-collapsed';
	        }else{
	            arrowCurrent.className ='ucs-tree-arrow';
	            childCurrent.className ='ucs-tree-children';

	        }
	    },
	    /**
	     * 节点的点击事件，返回当前节点数据，e 事件
	     * @param {object} args
	     * @param {object} e
	     *
	     * */
	    onClick:function (args,e) { //args 当前节点数据  e  点击事件
	        this.props.onClick(args,e);

	    },
	    render: function(){
	        return  React.createElement("div", null, 
	            this._getTreeDom(this.props.data)
	        )
	    }
	})
	module.exports = Tree;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Button = __webpack_require__(3);
	var classnames = __webpack_require__(2);
	//obj为要绑定事件的元素，ev为要绑定的事件，fn为绑定事件的函数
	function myAddEvent(obj, ev, fn) {
	    if (obj.attachEvent) {
	        obj.attachEvent("on" + ev, fn);
	    }
	    else {
	        obj.addEventListener(ev, fn, false);
	    }
	}
	function myRemoveEvent(obj, ev, fn) {
	    if (obj.attachEvent) {
	        obj.detachEvent("on" + ev, fn);
	    }
	    else {
	        obj.removeEventListener(ev, fn, false);
	    }
	}
	    /**
	     * Layer组件
	     *
	     * @param [title] 标题
	     * @param [type] 三种特殊情况text,success,failure
	     * @param [width] 窗口宽
	     * @param [height] 窗口高
	     * @param [className] 窗口类名
	     * @param [showClose] 显示关闭按钮，默认为true
	     * @param [closeBack] 关闭回调
	     * @param [autoClose] 是否自动关闭窗口，数值型，单位为秒，默认为0不自动关闭；
	     * @param [position] css样式位置，默认为fixed；只有absolute和fixed两种；
	     * @param [confirm] 确定按钮文本，默认为空即不显示；
	     * @param [confirmBack] 点击确定按钮后执行的函数，仅当confirm不为空时才会触发回调confirmback函数；当回调为空时，点击确定后默认关闭窗口；
	     * @param [cancel] 取消按钮文本，默认为空即不显示；
	     * @param [cancelBack] 取消回调，跟确定一样
	     * @param [afterBack] 窗口加载完时执行的函数
	     * @param [move] 允许窗口拖动，默认为true；
	     * @param [maskLayer] 显示遮罩层
	     * @param [shadeClose] 默认为false;点击遮罩关闭 false不关闭
	     * @param [animation] 弹出层css3动画效果，仅在支持的浏览器，默认为1。动画序号对应animation样式的layer-anim-*
	     *
	     * 示例:
	     *
	     *     @example
	     *      <Layer ref="layer" title=""/>content</Layer>
	     * */
	var Layer = React.createClass({displayName: "Layer",
	    getInitialState: function () {
	        return {
	            display: this.props.display,
	            width: this.props.width,
	            height: this.props.height,
	            left: "",
	            top: "",
	            autoClose: this.props.autoClose,
	            contentHeight: "", //内容区域高
	            animation: this.props.animation
	        }
	    },
	    getDefaultProps: function () {
	        return {
	            display: false,
	            type: "",
	            width: "",
	            height: "",
	            className: "",
	            showClose: true,
	            closeBack: "",
	            position: "fixed",
	            confirm: "",
	            confirmBack: "",
	            cancel: "",
	            cancelBack: "",
	            afterBack: "",
	            animation: "layer-anim-1",
	            maskLayer: true,
	            shadeClose: false,
	            move: true,
	            autoClose: 0,
	            id: ""
	        }
	    },
	    componentWillMount: function () {
	        //console.log("will");
	    },
	    componentDidMount: function () {
	        //window.addEventListener("resize", this._handleResize);
	        myAddEvent(window, 'resize', this._handleResize);
	    },
	    componentWillUnmount: function () {
	        //this.props.shadeClose ?
	        //  this.divEL.removeEventListener('click', this._handleMaskLayerClick) : "";
	        //window.removeEventListener("resize", this._handleResize);
	        //document.removeEventListener("mousemove", this._handleMouseMove);
	        //document.removeEventListener("mouseup", this._handleMouseUp);
	        this.props.shadeClose ?
	            myRemoveEvent(this.divEL, 'resize', this._handleMaskLayerClick) : "";
	        myRemoveEvent(window, 'resize', this._handleResize);
	        myRemoveEvent(document, 'mousemove', this._handleMouseMove);
	        myRemoveEvent(document, 'mouseup', this._handleMouseUp);
	    },
	        /**
	         * Layer弹出
	         * this.refs.layer.layerOpen();
	         * */
	    layerOpen: function () {
	        this.setState({display: "block", animation: this.props.animation}, function () {
	            this._setPosition();
	        });
	        //添加遮罩层
	        //console.log(this.props.maskLayer);
	        this.props.maskLayer ?
	            this._maskLayer() : "";
	        //窗口加载完回调
	        this.props.afterBack ? this.props.afterBack() : "";
	        //计算倒计时
	        this.props.autoClose > 0 ?
	            this._handleCountdown() : "";
	    },
	        /**
	         * Layer关闭
	         * this.refs.layer.layerＣlose();
	         * */
	    layerClose: function () {
	        this.setState({display: false, animation: ""});
	        //移除遮罩层
	        document.body.removeChild(this.divEL);
	        if (this.props.shadeClose) {
	            myRemoveEvent(this.divEL, 'click', this._handleMaskLayerClick);
	            //this.divEL.removeEventListener('click', this._handleMaskLayerClick);
	        }
	        //this.props.closeBack ? this.props.closeBack() : "";
	        clearInterval(this.timer);
	    },
	    _handleResize: function () {
	        //console.log("窗口改变");//传个参数进去，浏览器窗口缩放时不修改弹出层的宽高，只调整位置保持居中
	        //确保窗口在显示状态才执行缩放，隐藏下取不到高
	        this.state.display === "block" ?
	            this._setPosition("resize") : "";
	    },
	    _handleCountdown: function () {
	        //倒计时
	        this.setState({autoClose: this.props.autoClose});
	        clearInterval(this.timer);
	        var i = this.props.autoClose;
	        this.timer = setInterval(function () {
	            i--;
	            this.setState({autoClose: i});
	            if (i == 0) {
	                this.layerClose();
	            }
	        }.bind(this), 1000);
	    },
	    _maskLayer: function () {
	        this.divEL = document.createElement('div');
	        this.divEL.className = "layer-background";
	        document.body.appendChild(this.divEL);
	        this.props.shadeClose ?
	            myAddEvent(this.divEL, 'click', this._handleMaskLayerClick) : "";
	        //this.divEL.addEventListener("click", this._handleMaskLayerClick) : "";
	    },
	    _handleMaskLayerClick: function () {
	        //遮罩层点击
	        this.layerClose();
	    },
	    _setPosition: function (t) {
	        /*this.windowWidth = window.innerWidth;//浏览器窗口宽
	         this.windowHeight = window.innerHeight;//浏览器窗口高*/
	        //浏览器窗口宽高兼容写法
	        this.windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
	        this.windowHeight = document.documentElement.clientHeight || document.body.clientHeight;

	        //如果设定了高宽，则使用设定的
	        this.layerWidth = this.state.width ? this.state.width : this.refs.ucslayer.offsetWidth;
	        this.layerHeight = this.state.height ? this.state.height : this.refs.ucslayer.offsetHeight;
	        this.layerHeight = this.layerHeight > this.windowHeight ? this.windowHeight : this.layerHeight;//如果弹层高度大于浏览器窗口高，则使用浏览器窗口高
	        var scrollTop = 0;// 滚动条的高度
	        if (this.props.position == "absolute") {
	            if (document.documentElement && document.documentElement.scrollTop) {
	                scrollTop = document.documentElement.scrollTop;
	            }
	            else if (document.body) {
	                scrollTop = document.body.scrollTop;
	            }
	        }
	        var left = (parseInt(this.windowWidth) - parseInt(this.layerWidth)) / 2;
	        var top = (parseInt(this.windowHeight) - parseInt(this.layerHeight)) / 2 + scrollTop;
	        if (t !== "resize") {
	            this.setState({
	                width: this.layerWidth,
	                height: this.layerHeight
	            });
	        }
	        this.setState({
	            left: left,
	            top: top < 0 ? 0 : top,
	            contentHeight: parseInt(this.layerHeight) - parseInt(this.refs.layerHeader.offsetHeight)
	        })
	        ;
	        //console.log(this.layerHeight);
	    },
	    _handleCloseClick: function () {
	        //点击关闭时
	        this.props.closeBack ? this.props.closeBack() : this.layerClose();
	    },
	    _handleConfirmClick: function () {
	        //确认按钮点击时
	        this.props.confirmBack ? this.props.confirmBack() : this.layerClose();
	    },
	    _handleCancelClick: function () {
	        //取消按钮点击时
	        this.props.cancelBack ? this.props.cancelBack() : this.layerClose();
	    },
	    _handleMousedown: function (e) {
	        //console.log("mousedown");
	        if (this.props.move) {
	            this.mx = e.pageX - parseInt(this.state.left);
	            this.my = e.pageY - parseInt(this.state.top);
	            this.move = true;
	            /*document.addEventListener("mousemove", this._handleMouseMove);
	             document.addEventListener("mouseup", this._handleMouseUp);*/
	            myAddEvent(document, 'mousemove', this._handleMouseMove);
	            myAddEvent(document, 'mouseup', this._handleMouseUp);
	        }
	    },
	    _handleMouseMove: function (e) {
	        if (this.move) {
	            e = event || window.event;
	            /*var x = e.pageX - parseInt(this.mx);
	             var y = e.pageY - parseInt(this.my);*/
	            var x = e.clientX - parseInt(this.mx);
	            var y = e.clientY - parseInt(this.my);

	              //var documentHeight = document.body.scrollHeight;
	             var documentHeight = document.documentElement.clientHeight;
	             if (x <= 0) {
	             x = 0
	             } else if (x > parseInt(this.windowWidth) - parseInt(this.layerWidth)) {
	             //window窗口宽－弹层宽
	             x = parseInt(this.windowWidth) - parseInt(this.layerWidth)
	             }
	             if (y <= 0) {
	             y = 0
	             } else if (y > documentHeight - parseInt(this.layerHeight)) {
	             y = documentHeight - parseInt(this.layerHeight)
	             }
	             this.setState({
	             left: x,
	             top: y
	             });
	             return false;
	        }
	    },
	    _handleMouseUp: function () {
	        this.move = false;
	        /*document.removeEventListener("mousemove", this._handleMouseMove);
	         document.removeEventListener("mouseup", this._handleMouseUp);*/
	        myRemoveEvent(document, 'mousemove', this._handleMouseMove);
	        myRemoveEvent(document, 'mouseup', this._handleMouseUp);

	    },
	    render: function () {
	        var props = this.props;
	        var style = {
	            width: this.state.width,
	            height: this.state.height,
	            display: this.state.display ? "block" : "none",
	            position: props.position,
	            left: this.state.left,
	            top: this.state.top
	        };
	        var bodyClass = classnames("ucs-layer-body", {"ucs-layer-text": props.type});
	        var bodyContent = "";
	        if (props.type === "text") {
	            //纯文字
	            bodyContent = (React.createElement("div", {className: "ucs-layer-txt"}, props.children));
	        } else if (props.type === "success") {
	            //成功时
	            bodyContent = (
	                React.createElement("div", {className: "ucs-layer-success"}, 
	                    React.createElement("i", {className: "iconfont icon-success icon"}), 
	                    props.children
	                )
	            )
	        }
	        else if (props.type === "failure") {
	            //失败时
	            bodyContent = (
	                React.createElement("div", {className: "ucs-layer-failure"}, 
	                    React.createElement("i", {className: "iconfont icon-failure icon"}), 
	                    props.children
	                )
	            )
	        } else {
	            //其它
	            bodyContent = props.children
	        }
	        var close = (
	                props.showClose ?
	                    React.createElement("a", {href: "javascript:;", className: "ucs-layer-close", onClick: this._handleCloseClick}) : ""
	            )
	            ;
	        var button = "";
	        if (props.confirm || props.cancel) {
	            button = (
	                React.createElement("div", {className: "ucs-layer-footer"}, 
	                    props.confirm ?
	                        React.createElement(Button, {onClick: this._handleConfirmClick, buttonType: "confirm"}, props.confirm) : "", 
	                    props.cancel ?
	                        React.createElement(Button, {onClick: this._handleCancelClick, buttonType: "cancel"}, props.cancel) : ""
	                )
	            );
	        }
	        var autoClose = (
	            this.props.autoClose > 0 ?
	                React.createElement("div", {className: "ucs-autoclose"}, React.createElement("span", null, this.state.autoClose), "秒后自动关闭!") : ""
	        );
	        var moveStyle = {cursor: this.props.move ? "move" : ""};
	        return (
	            React.createElement("div", {className: classnames("ucs-layer",props.className,this.state.animation), style: style, 
	                 ref: "ucslayer", id: this.props.id}, 
	                close, 
	                props.title ?
	                    React.createElement("div", {className: "ucs-layer-header", onMouseDown: this._handleMousedown, 
	                         ref: "layerHeader", style: moveStyle}, props.title) : "", 
	                autoClose, 
	                React.createElement("div", {className: "ucs-layer-content", style: {height:this.state.contentHeight}}, 
	                    React.createElement("div", {className: bodyClass}, bodyContent), 
	                    button
	                )
	            )
	        )
	    }
	});
	module.exports = Layer;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var setClass = __webpack_require__(2);

	/**
	 * @author DuHuiling
	 *
	 * 导航菜单 Mene : 为页面和功能提供导航的菜单列表。
	 *
	 * @param [mode] {"horizontal"|"inline"|"vertical"}
	 * 	菜单类型，现在支持水平、内嵌和垂直模式三种
	 *
	 * @param [disabled]
	 * 是否禁用
	 *
	 * @param [title] {string|ReactNode}
	 * 分组标题
	 *
	 * @param [visible] {boolean}
	 * 子菜单初始是否可见
	 *
	 * 示例：
	 *
	 *  需要引入：
	 *
	 *     @example
	 *		var Menu = UcsmyUI.Menu;
	 *		var MenuItem = Menu.MenuItem;
	 *		var SubMenu = Menu.SubMenu;
	 *
	 * 水平模式：
	 *
	 *		<Menu id="abc" className = 'menu-test'>
	 *		    <MenuItem className = 'menu-active'>
	 *		        <a href="">首页</a>
	 *			</MenuItem>
	 *			<MenuItem disabled>禁用样式</MenuItem>
	 *			<MenuItem>
	 *				<a href="">链接</a>
	 *			</MenuItem>
	 *			<SubMenu className="sub-classname" title = { <a href="http://www.baidu.com">可点击title</a> } visible = {true}>
	 *				<MenuItem><a href="">二级目录1</a></MenuItem>
	 *				<MenuItem>二级目录2</MenuItem>
	 *			</SubMenu>
	 *		</Menu>
	 *
	 * 内嵌模式：
	 *
	 * 		<Menu mode = 'inline'>
	 * 		    <MenuItem className = 'menu-active'>
	 * 		        <a href="">首页</a>
	 *			</MenuItem>
	 *			<MenuItem disabled>禁用样式</MenuItem>
	 * 			<MenuItem>
	 * 				<a href="">链接</a>
	 * 			</MenuItem>
	 * 			<SubMenu title = '点击title显示子导航' visible = {false}>
	 * 				<MenuItem>二级目录1</MenuItem>
	 *				<MenuItem>二级目录2</MenuItem>
	 * 			</SubMenu>
	 * 		</Menu>
	 *
	 * 垂直模式：
	 *
	 * 		<Menu mode = 'vertical'>
	 * 	    	<MenuItem>首页</MenuItem>
	 * 	    	<MenuItem disabled>禁用样式</MenuItem>
	 * 	    	<MenuItem>
	 * 	        	<a href="">链接</a>
	 * 	        </MenuItem>
	 * 	        <SubMenu title = '鼠标移上title显示子导航'>
	 * 	            <MenuItem>二级目录1</MenuItem>
	 * 	            <MenuItem>二级目录2</MenuItem>
	 * 			</SubMenu>
	 * 		</Menu>
	 */
	var Menu = React.createClass({displayName: "Menu",
	    getDefaultProps: function () {
	        return {
	            mode: 'horizontal'
	        }
	    },
	    componentDidMount: function () {
	        var _children = this.props.children,
	            len = _children.length;
	    },
	    render: function () {
	        var self = this;
	        var menuClass = setClass('ucs-menu', 'menu-' + this.props.mode, this.props.className);
	        return (
	            React.createElement("div", {className: menuClass, id: this.props.id}, 
	                React.createElement("ul", null, 
	                    
	                        React.Children.map(self.props.children, function (child) {
	                            return React.cloneElement(child, {mode: self.props.mode});
	                        })
	                    
	                )
	            )
	        )
	    }
	});

	Menu.MenuItem = React.createClass({displayName: "Menu.MenuItem",
	    render: function () {
	        var itemClass = setClass(this.props.className, {'menu-disabled': this.props.disabled});
	        return (
	            React.createElement("li", {className: itemClass, className: itemClass},  this.props.children)
	        )
	    }
	});

	Menu.SubMenu = React.createClass({displayName: "Menu.SubMenu",
	    getDefaultProps: function () {
	        return {
	            visible: false
	        }
	    },
	    getInitialState: function () {
	        return {
	            subVisible: this.props.visible,
	            subClass: this.props.className
	        }
	    },
	    componentDidMount: function () {
	        var self = this;

	        var node = ReactDOM.findDOMNode(this);
	        if (this.props.mode == 'horizontal' || this.props.mode == 'vertical') {
	            node.onmouseenter = function (e) {
	                self.setState({
	                    subVisible: true
	                })
	            };
	            node.onmouseleave = function (e) {
	                self.setState({
	                    subVisible: false
	                })
	            };
	        } else if (this.props.mode == 'inline') {
	            node.onclick = function (e) {
	                self.setState({
	                    subVisible: !self.state.subVisible
	                })
	            }
	        }

	    },
	    render: function () {
	        var submenuClass = setClass(
	            'sub-menu',
	            'sub-menu-' + this.props.mode
	        );
	        var dropdown = setClass('ucs-dropdown', {'down': this.state.subVisible}, this.state.subClass);
	        return (
	            React.createElement("li", {className: dropdown}, 
	                React.createElement("div", {className: "menu-title"},  this.props.title), 
	                React.createElement("ul", {className:  submenuClass }, 
	                     this.props.children
	                )
	            )
	        )
	    }
	});

	module.exports = Menu;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by DuHuiling on 2017/2/6.
	 */

	var setClass = __webpack_require__(2);
	/**
	 *	@author DuHuiling
	 *
	 * @param [percent] {number}
	 * 	百分比
	 *
	 * @param [format] {string | ReactDom}
	 *	提示文本
	 *
	 * @param [showInfo] {boolean}
	 *	是否显示进度数值或状态图标
	 *
	 * @param [infoPosition]
	 *  文本位置
	 *
	 * 实例：
	 *
	 * 		@example
	 *
	 * 1.默认显示百分比
	 *
	 * 		<Progress type = "line" percent = {30}></Progress>
	 *
	 * 2.format可修改显示文案,showInfo:true(默认)时才生效
	 *
	 * 		<Progress type = "line" percent = {30} format = '满标'></Progress>
	 *
	 * 3.format可以是字体图标/元素
	 *
	 * 		<Progress type = "line" percent = {70} format = {<i style={{'width':'20px','height':'20px','background':'red','display':'inline-block'}}></i>}></Progress>
	 *
	 * 4.不显示文案
	 *
	 * 		<Progress type = "line" percent = {50} showInfo = {false}></Progress>
	 *
	 * 	5.如果需要修改文案位置,请自行在className中添加class修改,infoPosition可设置progress-text的style
	 *
	 * 		<Progress className = "top" type = "line" percent = {30} format = "top"></Progress>
	 * 		<Progress className = "top" type = "line" percent = {40} format = "infoPosition" infoPosition></Progress>
	 * 		<Progress className = "top" type = "line" percent = {40} format = "infoPosition" infoPosition={{'left':'40%','margin-left':'-40px'}}></Progress>
	 */
	var Progress = React.createClass({displayName: "Progress",
	    getDefaultProps: function() {
	        return {
	            type: 'line',
	            showInfo: true,
	            percent: 0
	        };
	    },
	    render: function(){
	        var showInfo = this.props.showInfo;
	        var info;
	        var infoPos = this.props.infoPosition;
	        var textProps = {};

	        if(showInfo){
	            if(infoPos){
	                typeof (infoPos) == 'object'? (
	                    textProps.style = infoPos
	                ):(
	                    textProps.style = {'left':this.props.percent + '%'}
	                )
	            }
	            textProps.className = 'ucs-progress-text';
	            if("format" in this.props){
	                info = React.createElement("span", {className: textProps.className, style: textProps.style}, this.props.format);
	            }else{
	                info = React.createElement("span", {className: textProps.className, style: textProps.style}, this.props.percent, "%");
	            }
	        }
	        var pClass = setClass('ucs-progress',this.props.className);
	        return (
	            React.createElement("div", {className: pClass, id: this.props.id}, 
	                React.createElement("div", {className: "ucs-progress-inner"}, 
	                    React.createElement("span", {className: "ucs-progress-bg", style: {'width': this.props.percent + '%'}})
	                ), 
	                info
	            )
	        )
	    }
	});

	module.exports = Progress;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * min 最小值
	 * max　最大值
	 * value 初始值
	 * step 每次改变的步数
	 * onChange 变化回调
	 * disabled 禁用
	 * className 样式
	 * id   id
	 * */
	var Input = __webpack_require__(1);
	var classnames = __webpack_require__(2);
	/**
	 * InputNumber组件
	 *
	 * @param [min] 最小值
	 * @param [max] 最大值
	 * @param [value] 初始值
	 * @param [onChange] 变化回调
	 * @param [step] 每次改变的步数
	 * @param [disabled] 是否禁用
	 * @param [className] 样式
	 * @param [id]
	 *
	 * 示例:
	 *
	 *     @example
	 *     <InputNumber step="500" max="5000" min="1" value="2000" ref="inputnumber"></InputNumber>
	 */
	var InputNumber = React.createClass({displayName: "InputNumber",
	    handelAdd: function () {
	        var v = parseInt(this.refs.inputnumber.getValue()) + parseInt(this.props.step);
	        this.setState({classNameLess: ""});
	        this.refs.inputnumber.setValue(v);
	        if (v >= parseInt(this.props.max)) {
	            this.setState({classNameAdd: "disabled"});
	            this.refs.inputnumber.setValue(this.props.max);
	        }
	    },
	    handelLess: function () {
	        var v = parseInt(this.refs.inputnumber.getValue()) - parseInt(this.props.step);
	        this.setState({classNameAdd: ""});
	        this.refs.inputnumber.setValue(v);
	        if (v <= parseInt(this.props.min)) {
	            this.setState({classNameLess: "disabled"});
	            this.refs.inputnumber.setValue(this.props.min);
	        }
	    },
	    getInitialState: function () {
	        return {
	            value: this.props.value,
	            classNameAdd: "",
	            classNameLess: ""
	        }
	    },
	    getDefaultProps: function () {
	        return {
	            min: "",
	            max: "",
	            value: "",
	            step: "",
	            onChange: "",
	            disabled: "",
	            className: "",
	            id: ""
	        }
	    },
	    handleChange: function (e) {
	        var v = e.target.value;
	        if (v > parseInt(this.props.max)) {
	            v = this.props.max;
	        } else if (v < parseInt(this.props.min)) {
	            v = this.props.min;
	        }
	        if (!isNaN(v)) {
	            //this.setState({value: v});
	            this.refs.inputnumber.setValue(v);
	        } else {
	            this.refs.inputnumber.setValue("");
	        }
	        this.props.onChange ? this.props.onChange(e) : "";
	    },
	    /**
	     * 获取InputNumber的值
	     * @return {string}
	     * */
	    getVlaue:function () {
	      return this.refs.inputnumber.getValue();
	    },
	    render: function () {
	        return (
	            React.createElement("div", {className: classnames("ucs-input-number",this.props.className), id: this.props.id}, 
	                React.createElement("a", {className: classnames(this.state.classNameLess,"less"), onClick: this.handelLess}), 
	                React.createElement(Input, {onChange: this.handleChange, value: this.state.value, ref: "inputnumber", 
	                       disabled: this.props.disabled?"disabled":""}), 
	                React.createElement("a", {className: classnames(this.state.classNameAdd,"add"), onClick: this.handelAdd})
	            )
	        )
	    }
	});
	module.exports = InputNumber;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * 参数
	 * icon　图标
	 * title　标题
	 * description　描述
	 * className 类名
	 * */
	var classnames = __webpack_require__(2);
	    /**
	     * Steps组件
	     *
	     * @param [icon] 图标
	     * @param [title] 标题
	     * @param [description] 描述
	     * @param [className] 类名
	     *
	     * 示例
	     *
	     *     @example
	     *     var Steps = UcsmyUI.Steps;
	     *     var Step=Steps.Step;
	     *     <Steps current="3">
	     *      <Step title="找回方式" description="1" icon="icon图">这里也可以有内容</Step>
	     *      <Step title="验证账号" description="2" icon="icon图">能适应多种要求</Step>
	     *      <Step title="重围密码" description="3" icon="icon图">3</Step>
	     *      <Step title="找回成功" description="4" icon="icon图">4</Step>
	     *     </Steps>
	     *
	     */
	var Steps = React.createClass({displayName: "Steps",
	    getDefaultProps: function () {
	        return {
	            icon: "",
	            title: "",
	            description: ""
	        }
	    },
	    render: function () {
	        var that = this;
	        return (
	            React.createElement("div", {className: classnames("ucs-steps",this.props.className)}, 
	                React.Children.map(this.props.children, function (el, index) {
	                    return (
	                        React.createElement("div", {className: classnames("ucs-steps-item",{"ucs-steps-active":this.props.current>index})}, 
	                            el.props.icon ?
	                                React.createElement("i", {className: "iconfont icon-"+el.props.icon}) : "", 
	                            
	                            el.props.title ?
	                                React.createElement("div", {className: "ucs-steps-title"}, el.props.title)
	                                : "", 
	                            el.props.description ?
	                                React.createElement("div", {className: "ucs-steps-description"}, el.props.description)
	                                : "", 
	                            React.createElement("div", {className: "ucs-steps-line"}), 
	                            el.props.children
	                        )
	                    )
	                }.bind(this))
	                
	            )
	        )
	    }
	});
	Steps.Step = React.createClass({displayName: "Steps.Step",
	    render: function () {
	        return (
	            React.createElement("div", null, 
	                this.props.children
	            )
	        )
	    }
	});
	module.exports = Steps;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var Input = __webpack_require__(1);
	var classnames = __webpack_require__(2);
	function findParentNode(elem, cls) {
	    if (elem.nodeName.toUpperCase() === "BODY") {
	        return false;
	    } else if (elem.className.search(cls) > -1) {
	        return elem;
	    } else {
	        return findParentNode(elem.parentNode, cls);
	    }
	}
	//obj为要绑定事件的元素，ev为要绑定的事件，fn为绑定事件的函数
	function myAddEvent(obj, ev, fn) {
	    if (obj.attachEvent) {
	        obj.attachEvent("on" + ev, fn);
	    }
	    else {
	        obj.addEventListener(ev, fn, false);
	    }
	}
	function myRemoveEvent(obj, ev, fn) {
	    if (obj.attachEvent) {
	        obj.detachEvent("on" + ev, fn);
	    }
	    else {
	        obj.removeEventListener(ev, fn, false);
	    }
	}
	    /**
	     * SelectDropDown组件
	     *
	     * @param [value] 默认值
	     * @param [name] 每个下拉里增加一个隐藏input，方便序列化表单取值
	     * @param [className] 样式名
	     * @param [type] 下拉类型　默认为空，可选bank search
	     * @param [showNum] 显示下拉个数，超出显示滚动条
	     * @param [option] 下拉选项数据　option选项　value选项对应的值(缺省时引用选项值)
	     * @param [onChange] 下拉选择后回调
	     * @param [disabled] 禁止点击下拉，默认false
	     * @param [placeholder] 是否显示placeholder样式，默认true，下拉改变后为false
	     * @param [bankLogo] 银行名称仅type为bank时有效
	     * @param [url] 异步请求数据，会覆盖默认传进来的option
	     * @param [defaultText] 默认选项，会增加到下拉的第一项
	     * @param [defaultValue] 默认值，不填写时取defaultText的值
	     * @param [searchPlaceholder] 仅对搜索有效，搜索输入框placeholder提示语
	     * @param [searchButton] 仅对搜索有效，搜索按钮名
	     * @param [searchChange] 仅对搜索有效，搜索输入回调
	     * @param [searchClick] 仅对搜索有效，搜索按钮回调
	     *
	     * 示例:
	     *
	     *     @example
	     *     <SelectDropDown ref="checkref" />
	     */
	var SelectDropDown = React.createClass({displayName: "SelectDropDown",
	    getInitialState: function () {
	        return {
	            value: this.props.value,
	            display: false,//true时展开添加样式open
	            option: this.props.option ? this.props.option.slice(0) : "",
	            randomId: Math.random().toString(36).substr(2, 10),
	            placeholder: this.props.placeholder,
	            showText: '',//显示的文本值
	            showBankLogo: '', //选中的银行
	            activeLi: 0// 当前选中的li
	        }
	    },
	    getDefaultProps: function () {
	        return {
	            value: "",//默认初始值
	            name: '',
	            className: "",
	            type: "", //三种类型，bank,search
	            showNum: "",
	            option: "",
	            placeholder: true,
	            disabled: false, //禁止下拉点击*/
	            searchPlaceholder: '',//搜索输入框提示
	            searchButton: '', //搜索按钮
	            searchChange: '', //搜索输入回调
	            searchClick: ''// 搜索回调
	        }
	    },
	    _handleBodyClick: function (evt) {
	        if (this.state.display) {
	            var a = findParentNode(evt.srcElement ? evt.srcElement : evt.target, this.state.randomId);
	            if (a === false) {
	                this.setState({display: false});
	            }
	        } else {
	            myRemoveEvent(document.body, 'click', this._handleBodyClick);
	        }
	    },
	    componentWillUnmount: function () {
	        myRemoveEvent(document.body, 'click', this._handleBodyClick);
	    },
	    _handleChange: function (e) {
	        if (!this.props.disabled) {
	            this.setState({display: !this.state.display}, function () {
	                this._setUlHeight();
	                myAddEvent(document.body, 'click', this._handleBodyClick);
	            });
	            e.preventDefault();
	            e.stopPropagation();
	        }
	    },
	    _handleInputChange: function (e) {
	        //搜索输入框改变时
	        this.props.searchChange ? this.props.searchChange(e) : "";
	    },
	    _handleSearchClick: function () {
	        //搜索按钮点击
	        this.props.searchClick ? this.props.searchClick() : "";
	    },
	        /**
	         * 获取SelectDropDown的值
	         * @return {string}
	         * */
	    getValue: function () {
	        return this.state.value
	    },
	        /**
	         * 设置SelectDropDown的value
	         * @param {string}
	         *
	         * */
	    setValue: function (value, option) {
	        this.setState({
	            value: value,
	            option: option ? option.slice(0) : this.state.option
	        }, function () {
	            this._addDefaultOption();
	            this._setInputValue();
	        });
	    },
	    componentWillReceiveProps: function (newProps) {
	        if (this.props.option != newProps.option || this.props.value != newProps.value) {
	            this.setState({
	                option: newProps.option ? newProps.option.slice(0) : "",
	                value: newProps.value
	            }, function () {
	                this._addDefaultOption();
	                this._setInputValue();
	            });
	        }
	    },
	    _setUlHeight: function () {
	        var ul = this.refs.dropdownul;
	        ul.style.height='';
	        if (this.state.display && this.refs.dropdownul.children.length) {
	            var liheight = this.refs.dropdownul.getElementsByTagName("li")[0].offsetHeight;
	            //如果下拉个数大于要显示的个数
	            if (parseInt(this.state.option.length) > parseInt(this.props.showNum) && this.props.showNum) {
	                ul.style.height = liheight * this.props.showNum + "px";
	            }
	        }
	    },
	    _handleLiClick: function (el, index) {
	        //下拉项点击
	        if (!el.disabled) {
	            var v = typeof(el.value) !== 'undefined' ? el.value : el.option;
	            this.setState({
	                bankLogo: el.bankLogo,
	                display: false,
	                placeholder: false,
	                value: v,
	                showText: el.option,
	                showBankLogo: el.bankLogo,
	                activeLi: index
	            });
	            this.props.onChange ? this.props.onChange(v) : "";
	        }
	    },
	    componentWillMount: function () {
	        this._addDefaultOption();
	        this._setInputValue();
	    },
	    componentDidMount: function () {
	        var th = this;
	        if (this.props.url) {
	            UAjax.ajax({
	                method: 'get',
	                url: this.props.url,
	                data: '',
	                async: true,
	                cache: true,
	                success: function (res) {
	                    var arry = eval(res);
	                    if (th.props.defaultText != undefined) {
	                        arry.unshift({
	                            option: th.props.defaultText,
	                            value: th.props.defaultValue !== undefined ? th.props.defaultValue : th.props.defaultText
	                        });
	                    }
	                    th.setState({
	                        value: th.props.value,
	                        option: arry
	                    }, function () {
	                        this._setInputValue();
	                    });
	                },
	                failure: function (res) {
	                    console.log(res);
	                }
	            });
	        }
	    },
	    _setInputValue: function () {
	        //如果值为空，提取数据选项的第一项为默认显示项
	        var option = this.state.option;
	        if (this.state.value) {
	            //根据传入的值在数据里查找对应的选项
	            var index = 0;
	            for (var i in option) {
	                var name = option[i];
	                if (name.value == this.state.value) {
	                    this.setState({
	                        value: this.state.value,
	                        showText: name.option,
	                        showBankLogo: name.bankLogo,
	                        activeLi: index
	                    });
	                    break;
	                } else if (name.option == this.state.value) {
	                    this.setState({
	                        value: name.option,
	                        showText: name.option,
	                        showBankLogo: name.bankLogo,
	                        activeLi: index
	                    });
	                    break;
	                } else {
	                    this.setState({
	                        value: '',
	                        showText: '',
	                        showBankLogo: ''
	                    });
	                }
	                index++;
	            }
	        } else {
	            if (option && typeof (option[0]) !== 'undefined') {
	                if (typeof (option[0].value) !== 'undefined') {
	                    this.setState({
	                        value: option[0].value,
	                        showText: option[0].option,
	                        showBankLogo: option[0].bankLogo
	                    });
	                } else {
	                    this.setState({
	                        value: option[0].option,
	                        showText: option[0].option,
	                        showBankLogo: option[0].bankLogo
	                    });
	                }
	            } else {
	                //没下拉选项时
	                var name = '';
	                var v = '';
	                if (this.props.defaultText) {
	                    name = this.props.defaultText;
	                    if (this.props.defaultValue) {
	                        v = this.props.defaultValue;
	                    } else {
	                        v = this.props.defaultText
	                    }
	                }
	                this.setState({
	                    value: v,
	                    showText: name,
	                    showBankLogo: ''
	                });
	            }
	        }
	    },
	    _addDefaultOption: function () {
	        var option = this.state.option;
	        if (option && this.props.defaultText && option[0]!==undefined && option[0].option != this.props.defaultText) {
	            this.state.option.unshift({
	                option: this.props.defaultText,
	                value: this.props.defaultValue !== undefined ? this.props.defaultValue : this.props.defaultText
	            });
	        }
	    },
	    render: function () {
	        var mainClass = classnames(
	            "ucs-select-dropdown",
	            "ucs-select-" + this.state.randomId,
	            this.props.className,
	            {"open": this.state.display},
	            {"ucs-select-search": this.props.type == "search"},
	            {"ucs-select-bank": this.props.type == "bank"}
	        );
	        var inputClass = classnames(
	            "ucs-input",
	            {"placeholder": this.state.placeholder},
	            {'disabled': this.props.disabled}
	        );
	        var bankdefalut = "";
	        if (this.props.type == "bank") {
	            bankdefalut = React.createElement("span", {className: classnames("bank-logo","bank-"+this.state.showBankLogo)});
	        }
	        var searchtype = "";
	        if (this.props.type == "search") {
	            searchtype = (
	                React.createElement("div", {className: "ucs-search-box"}, 
	                    React.createElement(Input, {className: "select-dropdown-input", onChange: this._handleInputChange, 
	                           placeholder: this.props.searchPlaceholder}), 
	                    React.createElement("button", {className: "ucs-btn ucs-btn-confirm", 
	                            onClick: this._handleSearchClick}, this.props.searchButton)
	                )
	            )
	        }
	        var bankLi = "";
	        return (
	            React.createElement("div", {className: mainClass, id: this.props.id}, 
	                React.createElement("div", {className: "ucs-select-control", onClick: this._handleChange}, 
	                    React.createElement("div", {className: inputClass, ref: "ucsInput", "data-value": this.state.value}, 
	                        bankdefalut, 
	                        React.createElement("span", null, this.state.showText), 
	                        React.createElement("i", {className: "ucs-icon"})
	                    ), 
	                    React.createElement("input", {type: "hidden", name: this.props.name, value: this.state.value})
	                ), 
	                React.createElement("div", {className: "ucs-dropdown"}, 
	                    React.createElement("div", {className: "ucs-dropdown-border"}, 
	                        React.createElement("ul", {ref: "dropdownul"}, 
	                            this.state.option && this.state.option.map(function (el, index) {
	                                return (
	                                    React.createElement("li", {"data-value": el.value!==undefined?el.value:el.option, 
	                                        onClick: this._handleLiClick.bind(this,el,index), 
	                                        className: classnames({'disabled':el.disabled},{'active':this.state.activeLi==index})}, 
	                                        this.props.type == "bank" ?
	                                            React.createElement("span", {className: classnames("bank-logo","bank-"+el.bankLogo)}) : "", 
	                                        React.createElement("span", {title: el.option}, el.option))
	                                );
	                            }.bind(this))
	                        )
	                    )
	                )
	            )
	        )
	    }
	});

	module.exports = SelectDropDown;


/***/ },
/* 15 */
/***/ function(module, exports) {

	    /**
	     * RingProgress组件
	     * @param [radius] 半径
	     * @param [border] 边框
	     * @param [color] 颜色，背影色，过渡色，最终色
	     * @param [speed] 速度
	     * @param [value] 值
	     * 示例:
	     *
	     *     @example
	     *     <RingProgress radius=100 border=10 color=["#ccc", "#000", "#f00"] value=50/>
	     *
	　　　*/
	var RingProgress = React.createClass({displayName: "RingProgress",
	    getDefaultProps: function () {
	        return {
	            radius: 100, //半径
	            border: 10, //边框
	            color: ["#ccc", "#000", "#f00"], //颜色，背影色，过渡色，最终色
	            speed: 1000,//速度
	            value: 0
	        }
	    },
	    componentDidMount: function () {
	        this._drawCircle();
	    },
	    _drawCircle: function () {
	        var id = ReactDOM.findDOMNode(this);
	        var opt = {
	            r: this.props.radius, //半径
	            b: this.props.border, //边框
	            color: this.props.color, //颜色，背影色，过渡色，最终色
	            speed: this.props.speed,//速度
	            perentvalue: this.props.value
	        };
	        if (!isNaN(opt.perentvalue)) {
	            var r = Raphael(id, 2 * opt.r, 2 * opt.r), R = opt.r - (opt.b / 2);
	        }
	        r.customAttributes.arc = function (value, R) {
	            if (value == 100) {
	                value = 99.999
	            }
	            var alpha = 3.6 * value, a = (90 - alpha) * Math.PI / 180, x = opt.r + R * Math.cos(a), y = opt.r - R * Math.sin(a), path;
	            path = [["M", opt.r, opt.r - R], ["A", R, R, 0, +(alpha > 180), 1, x, y]];
	            return {path: path}
	        };
	        r.path().attr({stroke: opt.color[0], "stroke-width": opt.b}).attr({arc: [100, R]});
	        if (opt.perentvalue > 0) {
	            var c = r.path().attr({
	                stroke: opt.color[1],
	                "stroke-width": opt.b,
	                "stroke-linecap": "round"
	            }).attr({arc: [0.01, R]});
	            setTimeout(function () {
	                c.animate({stroke: opt.color[2], arc: [opt.perentvalue, R]}, opt.speed)
	            })
	        }
	    },
	    render: function () {
	        return (
	            React.createElement("div", {className: "ucs-ring-progress"})
	        )
	    }
	});
	module.exports = RingProgress;

/***/ },
/* 16 */
/***/ function(module, exports) {

	
	/**
	 *删除数组指定下标或指定对象
	 */
	Array.prototype.removeArr=function(obj){
	    for(var i =0;i <this.length;i++){
	        var temp = this[i];
	        if(!isNaN(obj)){
	            temp=i;
	        }
	        if(temp == obj){
	            for(var j = i;j <this.length;j++){
	                this[j]=this[j+1];
	            }
	            this.length = this.length-1;
	        }
	    }
	}
	/**
	 * 
	 * @constructs 
	 */
	var BankCard = React.createClass({displayName: "BankCard",
	    getInitialState: function () {
	        return {
	            cardArr: this.props.cards,
	            cardLogoClassName: "",
	            bankName: "开户行",
	            province: "请选择",
	            city: "请选择",
	            branch: "请选择",
	            delIndex: -1
	        };
	    },
	    getDefaultProps: function () {
	        return {
	            cardType: {
	                "1": "储蓄卡",
	                "2": "信用卡",
	                "3": "记忆卡"
	            },
	            bankName: {
	                "cmb": "招商银行",
	                "icbc": "建设银行",
	                "boc": "中国银行",
	                "abc": "中国农业银行",
	                "comm": "交通银行",
	                "pingan": "平安银行",
	                "psbc": "邮政银行",
	                "shbc": "上海银行",
	                "wzbc": "温州银行",
	                "spdb": "浦发银行",
	                "ecitic": "中信银行",
	                "cgbchina": "广发银行",
	                "cmbc": "民生银行",
	                "cib": "兴业银行",
	                "cebbank": "光大银行",
	                "srcb": "上海农商银行",
	                "bankofbeijing": "北京银行",
	                "bjrcb": "北京农商银行",
	                "szfz": "深圳发展银行",
	                "nbcb": "宁波银行",
	                "hzbank": "杭州银行",
	                "dongguanbank": "东莞银行",
	                "hsbc": "汇丰银行",
	                "hkbea": "东亚银行",
	                "961111": "广州农商银行",
	                "hxb": "华夏银行",
	                "crbank": "华润银行",
	                "lanzhou": "兰州银行",
	                "hebbank": "河北银行",
	                "hsbank": "微商银行",
	                "qdccb": "青岛银行",
	                "ydnsh": "尧都农商",
	                "zheshang": "浙商银行",
	                "nccbank": "南昌银行",
	                "cbhb": "渤海银行",
	                "egbank": "恒丰银行",
	                "yhrcbank": "颍淮农村商业银行"
	            }
	        };
	    },
	    componentDidMount: function(){
	        for(var key in this.props.bankName){
	            var li = document.createElement('li');
	            li.onclick = this.changeHandler.bind(this,"branch",this.props.bankName[key]);
	            li.innerHTML = this.props.bankName[key];
	            this.refs["f-bank-name"].appendChild(li);
	        }
	    },
	    removeCardItem: function(index){
	        this.state.cardArr.removeArr(index);
	        this.setState({
	            cardArr : this.state.cardArr,
	            delIndex: -1
	        });
	        this.hideHandler("ucs-delbank-layer");
	    },
	    showHandler: function(elm){
	        this.refs[elm].style.display = "block";
	    },
	    hideHandler: function(elm){
	        this.refs[elm].style.display = "none";
	    },
	    submitHandler: function(e){
	        e.preventDefault();
	        var card = {
	            "bankName": this.state.branch,
	            "cardLogoClassName": "bank-"+this.state.cardLogoClassName,
	            "cardNumber": ReactDOM.findDOMNode(this.refs["f-card-num"]).value
	        }
	        this.state.cardArr.push(card);
	        this.setState({
	            cardArr : this.state.cardArr
	        });
	        this.hideHandler("ucs-addbank-layer");
	    },
	    resetHandler: function(){
	        ReactDOM.findDOMNode(this.refs["f-card-num"]).value = "";
	        this.setState({
	            bankName: "开户行",
	            province: "请选择",
	            city: "请选择",
	            branch: "请选择"
	        });
	    },
	    dropDownHandler: function(elm,box){
	        if(this.refs[elm].style.display == "block"){
	            this.refs[elm].style.display = "none";
	            if(this.refs[box].className.indexOf("on-focus")){
	                this.refs[box].className = this.refs[box].className.replace(" on-focus","");
	            }
	        }else{
	            this.refs[elm].style.display = "block";
	            if(this.refs[box].className.indexOf("on-focus") == -1){
	                this.refs[box].className = this.refs[box].className + " on-focus";
	            }
	        }
	    },
	    changeHandler: function(key,value){
	        if(key == "bankName"){
	            this.setState({
	                bankName : value
	            });
	        }else if(key == "province"){
	            this.setState({
	                province : value
	            });
	        }else if(key == "city"){
	            this.setState({
	                city : value
	            });
	        }else if(key == "branch"){
	            var cardLogo = "";
	            for(var kk in this.props.bankName){
	                if(this.props.bankName[kk] == value){
	                    cardLogo = kk;
	                }
	            }
	            this.setState({
	                branch : value,
	                cardLogoClassName : cardLogo
	            });
	        }
	    },
	    onMouseEnterHandler: function(elm){
	        this.showHandler(elm);
	    },
	    onMouseLeaveHandler: function(elm){
	        this.hideHandler(elm);
	    },
	    delBankCardHandler: function(index){
	        this.showHandler("ucs-delbank-layer");
	        this.setState({
	            delIndex: index
	        });
	    },
	    onFocusHandler: function(e){
	        e.target.className = e.target.className + " on-focus";
	    },
	    onBlurHandler: function(e){
	        e.target.className = e.target.className.replace(" on-focus","");
	    },
	    render: function(){
	        var _this = this;
	        return (
	            React.createElement("div", {className: "ucs-bank-card"}, 
	                React.createElement("div", {className: "ucs-card-list", ref: "ucs-card-list"}, 
	                    
	                        _this.state.cardArr.map(function(card,index){
	                            return (
	                                React.createElement("div", {className: "ucs-card-item", ref: "card-item-"+index, onMouseEnter: _this.onMouseEnterHandler.bind(_this,"del-bank-card"+index), onMouseLeave: _this.onMouseLeaveHandler.bind(_this,"del-bank-card"+index)}, 
	                                    React.createElement("span", {className: "bank-logo "+card.cardLogoClassName}), 
	                                    React.createElement("div", {className: "card-num"}, card.cardNumber), 
	                                    React.createElement("p", {className: "del-bank-card", ref: "del-bank-card"+index, style: {display: "none"}}, 
	                                        React.createElement("a", {href: "javascript:;", className: "icon-del icon-delete", onClick: _this.delBankCardHandler.bind(_this,index)}, "X")
	                                    )
	                                )
	                            );
	                        }), 
	                    
	                    React.createElement("div", {className: "ucs-card-item add-bank-card"}, 
	                        React.createElement("a", {href: "javascript:void(0);", className: "fc-link", onClick: _this.showHandler.bind(_this,"ucs-addbank-layer")}, 
	                            React.createElement("i", {className: "icon-add icon-addbank"}, "+"), 
	                            "添加银行卡"
	                        )
	                    )
	                ), 
	                React.createElement("div", {ref: "ucs-addbank-layer", className: "ucs-addbank-layer ucs-alert-layer", style: {width:"700px",display:"none",height:"620px", left:"50%", top:"50%",marginLeft:"-350px",marginTop:"-310px", position:"absolute"}}, 
	                    React.createElement("a", {className: "close ucs-layer-close icon-close", href: "javascript:void(0)", onClick: _this.hideHandler.bind(_this,"ucs-addbank-layer")}, "X"), 
	                    React.createElement("h3", {className: "ucs-layer-title"}, React.createElement("b", null), "添加账户"), 
	                    React.createElement("div", {className: "ucs-layer-content"}, 
	                        React.createElement("div", {className: "ucs-card-note add-bank-note"}, React.createElement("i", {className: "icon-note icon-bids"}), "您所添加的银行账户将用于收取投资本金及收益，请认真填写以下内容，确保其真实性。"), 
	                        React.createElement("div", {className: "ucs-add-bank"}, 
	                            React.createElement("div", {className: "ui-input", style: {margin:0}}, " ", React.createElement("span", {className: "name"}, React.createElement("b", {className: "fcred"}, "* "), "开户姓名："), 
	                                "刘**"
	                            ), 
	                            React.createElement("div", {className: "ui-input", style: {margin:0}}, " ", React.createElement("span", {className: "name"}, React.createElement("b", {className: "fcred"}, "* "), "身份证："), 
	                                "440*************19"
	                            ), 
	                            React.createElement("div", {className: "ui-input"}, " ", React.createElement("span", {className: "name"}, React.createElement("b", {className: "fcred"}, "* "), "账号："), 
	                                React.createElement("input", {type: "text", className: "cell-input formatnum", onselect: "return false", ref: "f-card-num", onFocus: _this.onFocusHandler, onBlur: _this.onBlurHandler}), 
	                                React.createElement("div", {className: "ui-tips"}, 
	                                    React.createElement("div", {className: "note"}, React.createElement("i", {className: "icon-note icon-bids"}), "输入提示"), 
	                                    React.createElement("div", {className: "error"}, React.createElement("i", {className: "icon-error icon-cuowu"}), "输入错误提示"), 
	                                    React.createElement("div", {className: "correct"}, React.createElement("i", {className: "icon-correct icon-zhengque"}))
	                                )
	                            ), 
	                            React.createElement("div", {className: "ui-input"}, React.createElement("span", {className: "name"}, React.createElement("b", {className: "fcred"}, "* "), "确认账号："), 
	                                React.createElement("input", {type: "text", className: "cell-input formatnum on-error", onFocus: _this.onFocusHandler, onBlur: _this.onBlurHandler}), 
	                                React.createElement("div", {className: "ui-tips"}, 
	                                    React.createElement("div", {className: "note"}, React.createElement("i", {className: "icon-note icon-bids"}), "输入提示"), 
	                                    React.createElement("div", {className: "error"}, React.createElement("i", {className: "icon-error icon-cuowu"}), "输入错误提示"), 
	                                    React.createElement("div", {className: "correct"}, React.createElement("i", {className: "icon-correct icon-zhengque"}))
	                                )
	                            ), 
	                            React.createElement("div", {className: "ui-input", style: {zIndex: 12}}, " ", React.createElement("span", {className: "name"}, React.createElement("b", {className: "fcred"}, "* "), "开户行："), 
	                                React.createElement("div", {className: "selectdrapdown selectdrapdowndemo"}, 
	                                    React.createElement("div", {className: "cell-input", ref: "oneDropDownBox", onClick: _this.dropDownHandler.bind(_this,"oneDropDown","oneDropDownBox")}, _this.state.bankName, React.createElement("i", {className: "icon-adown"})), 
	                                    React.createElement("div", {className: "drapdown", ref: "oneDropDown", onClick: _this.dropDownHandler.bind(_this,"oneDropDown","oneDropDownBox")}, 
	                                        React.createElement("ul", null, 
	                                            React.createElement("li", {onClick: _this.changeHandler.bind(_this,"bankName","银行1")}, "银行1"), 
	                                            React.createElement("li", {onClick: _this.changeHandler.bind(_this,"bankName","银行2")}, "银行2")
	                                        )
	                                    )
	                                ), 
	                                React.createElement("div", {className: "ui-tips"}, 
	                                    React.createElement("div", {className: "note"}, React.createElement("i", {className: "icon-note icon-bids"}), "输入提示"), 
	                                    React.createElement("div", {className: "error"}, React.createElement("i", {className: "icon-error icon-cuowu"}), "输入错误提示"), 
	                                    React.createElement("div", {className: "correct"}, React.createElement("i", {className: "icon-correct icon-zhengque"}))
	                                )
	                            ), 
	                            React.createElement("div", {className: "ui-input", style: {zIndex: 11}}, " ", React.createElement("span", {className: "name"}, React.createElement("b", {className: "fcred"}, "* "), "开户省市："), 
	                                React.createElement("div", {className: "selectdrapdown selectdrapdowndemo"}, 
	                                    React.createElement("div", {className: "cell-input", ref: "twoDropDownBox", style: {width:"115px"}, onClick: _this.dropDownHandler.bind(_this,"twoDropDown","twoDropDownBox")}, _this.state.province, React.createElement("i", {className: "icon-adown"})), 
	                                    React.createElement("div", {className: "drapdown", ref: "twoDropDown", onClick: _this.dropDownHandler.bind(_this,"twoDropDown","twoDropDownBox")}, 
	                                        React.createElement("ul", null, 
	                                            React.createElement("li", {onClick: _this.changeHandler.bind(_this,"province","省份1")}, "省份1"), 
	                                            React.createElement("li", {onClick: _this.changeHandler.bind(_this,"province","省份2")}, "省份2"), 
	                                            React.createElement("li", {onClick: _this.changeHandler.bind(_this,"province","省份3")}, "省份3"), 
	                                            React.createElement("li", {onClick: _this.changeHandler.bind(_this,"province","省份4")}, "省份4")
	                                        )
	                                    )
	                                ), 
	                                React.createElement("div", {className: "selectdrapdown selectdrapdowndemo"}, 
	                                    React.createElement("div", {className: "cell-input", ref: "threeDropDownBox", style: {width:"115px"}, onClick: _this.dropDownHandler.bind(_this,"threeDropDown","threeDropDownBox")}, _this.state.city, React.createElement("i", {className: "icon-adown"})), 
	                                    React.createElement("div", {className: "drapdown", ref: "threeDropDown", onClick: _this.dropDownHandler.bind(_this,"threeDropDown","threeDropDownBox")}, 
	                                        React.createElement("ul", null, 
	                                            React.createElement("li", {onClick: _this.changeHandler.bind(_this,"city","城市1")}, "城市1"), 
	                                            React.createElement("li", {onClick: _this.changeHandler.bind(_this,"city","城市2")}, "城市2"), 
	                                            React.createElement("li", {onClick: _this.changeHandler.bind(_this,"city","城市3")}, "城市3"), 
	                                            React.createElement("li", {onClick: _this.changeHandler.bind(_this,"city","城市4")}, "城市4")
	                                        )
	                                    )
	                                ), 
	                                React.createElement("div", {className: "ui-tips"}, 
	                                    React.createElement("div", {className: "note"}, React.createElement("i", {className: "icon-note icon-bids"}), "输入提示"), 
	                                    React.createElement("div", {className: "error"}, React.createElement("i", {className: "icon-error icon-cuowu"}), "输入错误提示"), 
	                                    React.createElement("div", {className: "correct"}, React.createElement("i", {className: "icon-correct icon-zhengque"}))
	                                )
	                            ), 
	                            React.createElement("div", {className: "ui-input", style: {zIndex: 10}}, " ", React.createElement("span", {className: "name"}, React.createElement("b", {className: "fcred"}, "* "), "支行名称："), 
	                                React.createElement("div", {className: "selectdrapdown branchselect"}, 
	                                    React.createElement("div", {className: "cell-input", ref: "fourDropDownBox", onClick: _this.dropDownHandler.bind(_this,"fourDropDown","fourDropDownBox")}, _this.state.branch, React.createElement("i", {className: "icon-adown"})), 
	                                    React.createElement("div", {className: "drapdown", ref: "fourDropDown", onClick: _this.dropDownHandler.bind(_this,"fourDropDown","fourDropDownBox")}, 
	                                        React.createElement("ul", {ref: "f-bank-name"}), 
	                                        React.createElement("p", {className: "search"}, 
	                                            React.createElement("input", {type: "text", className: "input"}), 
	                                            React.createElement("input", {type: "button", className: "btn-ok", value: ""})
	                                        )
	                                    )
	                                )
	                            ), 
	                            React.createElement("div", {className: "ui-input ui-button-2"}, 
	                                React.createElement("button", {className: "cell-btn-orange", onClick: _this.submitHandler}, "确　认"), 
	                                React.createElement("button", {className: "cell-btn-gray", onClick: _this.resetHandler}, "取　消")
	                            )
	                        )
	                    )
	                ), 
	                React.createElement("div", {className: "ucs-delbank-layer ucs-alert-layer", ref: "ucs-delbank-layer", style: {width: "622px",display: "none", minHeight:"360px", left:"50%", top:"50%",marginLeft:"-311px",marginTop:"-180px"}}, 
	                    React.createElement("a", {className: "close ucs-layer-close icon-close", href: "javascript:void(0)", onClick: _this.hideHandler.bind(_this,"ucs-delbank-layer")}, "X"), 
	                    React.createElement("h3", {className: "ucs-layer-title"}, React.createElement("b", null), "删除卡"), 
	                    React.createElement("div", {className: "ucs-layer-content"}, 
	                        React.createElement("div", {className: "sck"}, 
	                            React.createElement("p", null, 
	                                React.createElement("span", {className: "span-1"}, React.createElement("i", {className: "icon-note icon-bids"}), "是否确定删除该回款账户？"), 
	                                React.createElement("span", {className: "span-2"}, "删除银行卡后不会影响已有的投资回款"), 
	                                React.createElement("a", {href: "javascript:void(0);", onClick: _this.removeCardItem.bind(_this,_this.state.delIndex)}, "确定"), 
	                                React.createElement("a", {className: "a-1", href: "javascript:void(0);"}, "取消")
	                            )
	                        )
	                    )
	                ), 
	                React.createElement("div", {className: "ucs-addbank-greybackground"})
	            )
	        );
	    }
	});

	module.exports = BankCard;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var Tooltip = __webpack_require__(18);
	var classnames = __webpack_require__(2);

	/**
	 *
	 * 初级表格
	 *
	 * @param [data] 数据源
	 *
	 * @param [className] 组件的div的class
	 *
	 * @param [bordered]  是否显示边框
	 *
	 * @param [striped]  是否隔行变色
	 *
	 * @param [hover]  是否悬浮变色
	 *
	 * @param [hasThead]  是否有头部
	 *
	 * @param [isSortDisplay]  是否显示 排序
	 *
	 * @param [isTextOverflowHidden]  文本是否超出一行隐藏
	 *
	 * @constructs
	 * @author huangdebin
	 * Table
	 *
	 * 示例:
	 *
	 *     @example
	 *     <Table id="mytable" ref="mytable" bordered={true} striped={false} hover={true} hasThead={true} isTextOverflowHidden={true} data={data} columns={columns} />
	 */
	var Table = React.createClass({displayName: "Table",
	    getDefaultProps:function() {
	        return {
	            id:'',
	            data: [],
	            className: '',
	            bordered: false,
	            striped: false,
	            hover: false,
	            hasThead: true,
	            isSortDisplay:false,
	            isTextOverflowHidden: false
	        }
	    },
	    getInitialState:function() {
	        return {
	            stateData: this.props.data,     //数据列表
	            sortColumn: '',                 //排序列
	            sortStatus: ''                  //排序方向
	        }
	    },
	    /**
	     * 排序当前点击列
	     * @param {string} column
	     * 要排序的列名
	     * @param {string} status
	     * 排序方向，升序或降序
	     * */
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
	                React.createElement(Header, {
	                    header: header.header, 
	                    name: header.name, 
	                    subHeader: header.subHeader, 
	                    width: header.width, 
	                    isSortDisplay: RootThis.props.isSortDisplay, 
	                    sort: header.sort, 
	                    sortColumn: RootThis.state.sortColumn, 
	                    sortStatus: RootThis.state.sortStatus, 
	                    sortHandle: RootThis.sortHandle, 
	                    key: header.name || i})
	            );
	        })
	        return React.createElement("thead", null, React.createElement("tr", null, headers));
	    },
	    getTextWidth:function(v) {
	        var _div = document.getElementById('textWidthTempWrap');
	        if(_div === null){
	            var _div = document.createElement('div');
	            _div.id = 'textWidthTempWrap';
	            document.body.appendChild(_div);
	        }
	        _div.innerHTML = v;
	        return { width: _div.offsetWidth, height: _div.offsetHeight };
	    },
	    renderBody:function(columns) {
	        if (!columns) return;
	        var data = this.state.stateData;
	        var hasThead = this.props.hasThead;
	        var that = this;
	        //如果data不是数组，直接显示data内容，可用于列表为空的情况
	        if (!Array.isArray(data)) {
	            return (
	                React.createElement("tbody", null, 
	                React.createElement("tr", null, 
	                    React.createElement("td", {colSpan: columns.length}, data)
	                )
	                )
	            )
	        }
	        //如果data数组长度是0
	        if (data.length == 0) {
	            return (
	                React.createElement("tbody", null, 
	                React.createElement("tr", null, 
	                    React.createElement("td", {colSpan: columns.length}, "暂无数据")
	                )
	                )
	            )
	        }
	        //遍历data
	        var trs = data.map(function(data, trIndex) {
	            var tds = [];
	            columns.map(function(columnItem, j){
	                var name = columnItem.name;
	                var content = columnItem.content !== undefined ? columnItem.content : '';
	                var hidden = columnItem.hidden ? true : false;
	                var width = columnItem.width !== undefined ? columnItem.width : 'auto';

	                //当前列有hidden属性，不渲染
	                if (hidden) return;

	                var tdContent = columnItem.content ? columnItem.content(data, trIndex, j) : data[name];

	                if(!hasThead && trIndex == 0){
	                    //如果没有表头，第一行需定义宽度
	                    tds.push(
	                        React.createElement("td", {key: j, style: {width: width, maxWidth: width}}, 
	                            tdContent
	                        )
	                    );
	                }else{
	                    //有表头
	                    var _TextWidth = that.getTextWidth(tdContent).width;
	                    if(that.props.isTextOverflowHidden){
	                        if(_TextWidth > width){
	                            tds.push(
	                                React.createElement("td", {key: j}, 
	                                    React.createElement(Tooltip, {title: tdContent}, React.createElement("div", {className: "text-auto", style: {width: width}}, tdContent))
	                                )
	                            )
	                        }else{
	                            tds.push(
	                                React.createElement("td", {key: j}, tdContent)
	                            );
	                        }
	                    }else{
	                        tds.push(
	                            React.createElement("td", {key: j}, tdContent)
	                        );
	                    }
	                }
	            })
	            if(trIndex % 2){
	                var trClassName = 'odd-bg';
	            }else{
	                var trClassName = 'even-bg';
	            }
	            return React.createElement("tr", {className: trClassName, key: data.id}, tds)
	        });
	        return React.createElement("tbody", null, trs);
	    },
	    /**
	     * 设置Table的数据
	     * @param {object} obj
	     * GridTable的数据源
	     *
	     * */
	    setValue: function (v) {
	        this.setState({stateData: v});
	    },
	    /**
	     * 获取Table的值
	     * @return {string}
	     * */
	    getValue: function () {
	        return this.state.stateData
	    },
	    /**
	     * 获取Table里的组件的ref值
	     * @return {object}
	     * */
	    getChildrenRefs:function(){
	        return this.refs;
	    },
	    componentWillReceiveProps:function(nextProps){
	        if(this.props.data !== nextProps.data){
	            this.setState({stateData:nextProps.data});
	        }
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
	            React.createElement("div", {className: className}, 
	                React.createElement("table", {id: this.props.id}, 
	                     columns && this.props.hasThead ? this.renderHeader(columns) : '', 
	                     columns && this.renderBody(columns)
	                )
	            )
	        )
	    }
	});

	var Header = React.createClass({displayName: "Header",
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
	            React.createElement("a", {key: "up", className: this.getClassName('sort-up', name, 'asc'), onClick: this.sortClick.bind(this, this, 'asc')}),
	            React.createElement("a", {key: "down", className: this.getClassName("sort-down", name, 'desc'), onClick: this.sortClick.bind(this, this, 'desc')})
	        ]
	        return React.createElement("th", {style: {width:width, maxWidth: width}}, 
	            React.createElement("span", {className: "th-header"}, header), 
	            subHeader && React.createElement("span", {className: "th-subheader"}, subHeader), 
	            isSortDisplay && sort && sortIcons
	        )
	    }
	});

	module.exports = Table;


/***/ },
/* 18 */
/***/ function(module, exports) {

	/**
	 * Tooltip组件
	 * @param container 插入的位置，默认是document.body
	 * @param position 位置 top:上面; left:左边; right:右边; bottom: 下面;
	 * @param fixed 是否固定，true 固定 false 随鼠标移动;
	 * @param space 距离
	 *
	 * @constructs
	 *
	 * 示例:
	 *
	 *     @example
	 *     <Tooltip title="确定删除" fixed = {false}>删除</Tooltip>
	 *
	 */
	var Tooltip = React.createClass({displayName: "Tooltip",
	    _addEventListener:function(obj,ev,fn){
			obj.addEventListener ? obj.addEventListener(ev,fn,false) : obj.attachEvent("on" + ev,fn)
	    },
	    _removeEventListener: function (obj, ev, fn) {
	        obj.removeEventListener ? obj.removeEventListener(ev, fn, false) : obj.detachEvent("on" + ev, fn)
	    },
		getDefaultProps: function() {
			return {
				container: document.body,
				position: 'top',
				fixed: true,
				space: 5
			}
		},
		componentDidMount: function() {
			this.container = this.props.container || document.body;
			this.componentEl = ReactDOM.findDOMNode(this);
			this.tooltipEl = document.createElement('div');

			var tooltipArrowEl = document.createElement('div');
			tooltipArrowEl.className = 'ucs-tooltip-arrow';

			var tooltipContentEl = document.createElement('div');
			tooltipContentEl.className = 'ucs-tooltip-inner';
			tooltipContentEl.textContent = this.props.title;

			this.tooltipEl.appendChild(tooltipArrowEl);
			this.tooltipEl.appendChild(tooltipContentEl);
			this.tooltipEl.className = 'ucs-tooltip ' + this.props.position;
			this.container.appendChild(this.tooltipEl);
			this.resetTooltip();
			var _componentEl =  this.componentEl;
			this._addEventListener(_componentEl, this.props.fixed ? 'mouseenter' : 'mousemove', this.handleMouseMove);
			this._addEventListener(_componentEl, 'mouseleave', this.handleMouseOut);
		},

		componentDidUpdate: function() {
			this.tooltipEl.className = 'ucs-tooltip ' + this.props.position;
			this.tooltipEl.childNodes[1].textContent = this.props.title;
		},

		componentWillUnmount: function() {
	    	var _componentEl = this.componentEl;
			this._removeEventListener(_componentEl, this.props.fixed ? 'mouseenter' : 'mousemove', this.handleMouseMove);
			this._removeEventListener(_componentEl, 'mouseleave', this.handleMouseOut);
			this.container.removeChild(this.tooltipEl);
		},

		resetTooltip: function() {
			this.tooltipEl.style.transition = 'opacity 0.4s';
			this.tooltipEl.style.left = '-500px';
			this.tooltipEl.style.top = '-500px';
			this.tooltipEl.style.opacity = 0;
		},

		handleMouseMove: function(e) {
			if(this.props.title === '') {
				return;
			}

			var tooltipPosition = this.getTooltipPosition(e);
			var tooltipOffset = this.getTooltipOffset();

			this.tooltipEl.style.left = tooltipPosition.x + tooltipOffset.x + 'px';
			this.tooltipEl.style.top = tooltipPosition.y + tooltipOffset.y + 'px';
			this.tooltipEl.style.opacity = 1;
		},

		handleMouseOut: function() {
			this.resetTooltip();
		},
		//定位到标签的位置
		getTooltipPosition: function(e) {
			var pointX;
			var pointY;
			var bodyRect = document.body.getBoundingClientRect();
			var containerRect = this.container.getBoundingClientRect();
			var containerOffsetX = containerRect.left - bodyRect.left;
			var containerOffsetY = containerRect.top - bodyRect.top;
			if(this.props.fixed) {
				var componentRect = this.componentEl.getBoundingClientRect();
				var componentOffsetX = componentRect.left - containerOffsetX;
				var componentOffsetY = componentRect.top - containerOffsetY;
				var componentWidth = this.componentEl.offsetWidth;
				var componentHeight = this.componentEl.offsetHeight;
				var cOffsetX = 0;
				var cOffsetY = 0;
				switch(this.props.position) {
					case 'top':
						cOffsetX = componentWidth / 2;
						cOffsetY = 0;
						break;
					case 'right':
						cOffsetX = componentWidth;
						cOffsetY = componentHeight / 2;
						break;
					case 'bottom':
						cOffsetX = componentWidth / 2;
						cOffsetY = componentHeight;
						break;
					case 'left':
						cOffsetX = 0;
						cOffsetY = componentHeight / 2;
						break;
				}
				pointX = componentOffsetX + cOffsetX + (window.scrollX || window.pageXOffset);
				pointY = componentOffsetY + cOffsetY + (window.scrollY || window.pageYOffset);
			} else {
				var clientX = e.clientX;
				var clientY = e.clientY;
				pointX = clientX - containerOffsetX + (window.scrollX || window.pageXOffset);
				pointY = clientY - containerOffsetY + (window.scrollY || window.pageYOffset);
			}
			return {
				x: pointX,
				y: pointY
			};
		},
		//获取偏移量
		getTooltipOffset: function() {
			var tooltipW = this.tooltipEl.offsetWidth;
			var tooltipH = this.tooltipEl.offsetHeight;
			var offsetX = 0;
			var offsetY = 0;
			switch(this.props.position) {
				case 'top':
					offsetX = -(tooltipW / 2);
					offsetY = -(tooltipH + Number(this.props.space));
					break;
				case 'right':
					offsetX = Number(this.props.space);
					offsetY = -(tooltipH / 2);
					break;
				case 'bottom':
					offsetX = -(tooltipW / 2);
					offsetY = Number(this.props.space);
					break;
				case 'left':
					offsetX = -(tooltipW + Number(this.props.space));
					offsetY = -(tooltipH / 2);
					break;
			}
			return {
				x: offsetX,
				y: offsetY
			};
		},
		render: function() {
			return (
			    React.createElement("div", null, this.props.children)
	        )
		}
	});

	module.exports = Tooltip;

/***/ },
/* 19 */
/***/ function(module, exports) {

	/**
	 * 栅格布局
	 * @constructs
	 *
	 * Row
	 * @param {object} flex 可传参数
	 *
	 *
	 *     	    flex={{ type: 'flex', justify: 'start'}}
	 *
	 *     	    type	布局模式，可选 flex，现代浏览器 下有效
	 *
	 *     	    align	flex 布局下的垂直对齐方式：top middle bottom
	 *
	 *     	    justify	flex 布局下的水平排列方式：start end center space-around space-between
	 *
	 *
	 * Col
	 * @param {object} col 设置列的参数
	 * @param {object} xs 超小屏幕
	 * @param {object} sm 小屏幕
	 * @param {object} lg 大屏幕
	 *
	 *
	 *     		col={{ span: 8, order: 3 }}
	 *
	 *     		span	栅格占位格数，为 0 时相当于 display: none	number
	 *
	 *     		order	栅格顺序，flex 布局模式下有效	number	0
	 *
	 *     	    offset	栅格左侧的间隔格数，间隔内不可以有栅格	number	0
	 *
	 *     	    push	栅格向右移动格数	number	0
	 *
	 *     	    pull	栅格向左移动格数	number	0
	 *
	 *     	    xs	<768px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-
	 *
	 *     	    sm	≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-
	 *
	 *     	    md	≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象	number|object	-
	 *
	 *     		lg	≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象
	 *
	 * 示例：
	 *
	 *     @example
	 *     var Grid = UcsmyUI.Grid;
	 *     var Row = Grid.Row;
	 *     var Col = Grid.Col;
	 *     <Row>
	 *         <Col col={{ span: 6 }}>
	 *         		<p>2-1</p>
	 *         </Col>
	 *         <Col col={{ span: 6, offset: 6 }}>
	 *         		<p>2-2</p>
	 *         </Col>
	 *         <Col col={{ span: 6 }}>
	 *         		<p>2-3</p>
	 *         </Col>
	 *     </Row>
	 *
	 *
	 *
	 *
	 */

	var Row = React.createClass({displayName: "Row",
		render:function(){
			var cols = this.props.children;
			var className = '', flexClassName = '';
			if(this.props.flex){
				var type = '', justify = '', align = '';
				if(this.props.flex.type){
					type = 'ucs-row-' + this.props.flex.type
				}
				if(this.props.flex.justify){
					justify = ' ucs-row-flex-' + this.props.flex.justify
				}
				if(this.props.flex.align){
					align = ' ucs-row-flex-' + this.props.flex.align
				}
				flexClassName = type + justify + align + ' '
			}
			className = flexClassName == '' ? 'ucs-row' : flexClassName
			return (
				React.createElement("div", {className: className}, cols)
			)
		}
	})

	var Col = React.createClass({displayName: "Col",
		render:function(){
			var colsChildren = this.props.children;
			var className = '',colClassName = '',xsClassName = '',smClassName = '',mdClassName = '',lgClassName = '';
			if(this.props.col){
				var span = '', offset = '', push = '', pull = '', order = '';
				if(this.props.col.span){
					span = 'ucs-col-' + this.props.col.span
				}
				if(this.props.col.offset){
					offset = ' ucs-col-offset-' + this.props.col.offset
				}
				if(this.props.col.push){
					push = ' ucs-col-push-' + this.props.col.push
				}
				if(this.props.col.pull){
					pull = ' ucs-col-pull-' + this.props.col.pull
				}
				if(this.props.col.order){
					pull = ' ucs-col-order-' + this.props.col.order
				}
				colClassName = span + offset + push + pull + order + ' '
			}
			if(this.props.xs){
				var span = '', offset = '', push = '', pull = '';
				if(this.props.xs.span){
					span = 'ucs-col-xs-' + this.props.xs.span
				}
				if(this.props.xs.offset){
					offset = ' ucs-col-xs-offset-' + this.props.xs.offset
				}
				if(this.props.xs.push){
					push = ' ucs-col-xs-push-' + this.props.xs.push
				}
				if(this.props.xs.pull){
					pull = ' ucs-col-xs-pull-' + this.props.xs.pull
				}
				xsClassName = span + offset + push + pull + ' '
			}
			if(this.props.sm){
				var span = '', offset = '', push = '', pull = '';
				if(this.props.sm.span){
					span = 'ucs-col-sm-' + this.props.sm.span
				}
				if(this.props.sm.offset){
					offset = ' ucs-col-sm-offset-' + this.props.sm.offset
				}
				if(this.props.sm.push){
					push = ' ucs-col-sm-push-' + this.props.sm.push
				}
				if(this.props.sm.pull){
					pull = ' ucs-col-sm-pull-' + this.props.sm.pull
				}
				smClassName = span + offset + push + pull + ' '
			}
			if(this.props.md){
				var span = '', offset = '', push = '', pull = '';
				if(this.props.md.span){
					span = 'ucs-col-md-' + this.props.md.span
				}
				if(this.props.md.offset){
					offset = ' ucs-col-md-offset-' + this.props.md.offset
				}
				if(this.props.md.push){
					push = ' ucs-col-md-push-' + this.props.md.push
				}
				if(this.props.md.pull){
					pull = ' ucs-col-md-pull-' + this.props.md.pull
				}
				mdClassName = span + offset + push + pull + ' '
			}
			if(this.props.lg){
				var span = '', offset = '', push = '', pull = '';
				if(this.props.lg.span){
					span = 'ucs-col-lg-' + this.props.lg.span
				}
				if(this.props.lg.offset){
					offset = ' ucs-col-lg-offset-' + this.props.lg.offset
				}
				if(this.props.lg.push){
					push = ' ucs-col-lg-push-' + this.props.lg.push
				}
				if(this.props.lg.pull){
					pull = ' ucs-col-lg-pull-' + this.props.lg.pull
				}
				lgClassName = span + offset + push + pull
			}
			className = (colClassName == '' ? '' : colClassName) + (xsClassName == '' ? '' : xsClassName) + (smClassName == '' ? '' : smClassName) + (mdClassName == '' ? '' : mdClassName) + (lgClassName == '' ? '' : lgClassName);
			return (
				React.createElement("div", {className: className}, colsChildren)
			)
		}
	})

	var Grid = {
		Row:Row,
		Col:Col
	}

	module.exports = Grid

/***/ },
/* 20 */
/***/ function(module, exports) {

	var TabItem=React.createClass({displayName: "TabItem",
	    render:function(){
	        return (this.props.children);
	    }
	});

	/**
	 * 标签页组件
	 * @author phy <yao.qianfeng@ucsmy.com>
	 *
	 *     @example
	 *     <Tabs defaultActiveKey={0} onClick={callback}>
	 *          <TabItem tab="Tab 1">Content of Tab Pane 1</TabItem>
	 *          <TabItem tab="Tab 2">Content of Tab Pane 2</TabItem>
	 *          <TabItem tab="Tab 3">Content of Tab Pane 3</TabItem>
	 *          <TabItem tab="Tab 4">Content of Tab Pane 4</TabItem>
	 *     </Tabs>
	 */
	var Tabs=React.createClass({displayName: "Tabs",
	    propTypes:{
	        defaultActiveKey:React.PropTypes.number
	    },

	    getDefaultProps:function(){
	        return {
	            disabled:false,
	            defaultActiveKey:0
	        }
	    },

	    getInitialState:function(){
	        return {
	            currentIndex : this.props.defaultActiveKey
	        };
	    },

	    /**
	     * 检查标题的索引号
	     * @param index
	     * @returns {*}
	     */
	    checkTitleIndex:function(index){
	        if(this.state.currentIndex==-1){
	            return "";
	        }else{
	            return index===this.state.currentIndex ? "ucs-tabs-active" : "";
	        }
	    },

	    /**
	     * 检查内容项容器的索引号
	     * @param index
	     * @returns {*}
	     */
	    checkContentIndex:function(index){
	        if(this.state.currentIndex==-1){
	            return "none";
	        }else{
	            return index===this.state.currentIndex ? "block" : "none";
	        }
	    },

	    /**
	     * 点击事件处理函数
	     * @param index
	     * @param disabled
	     * @private
	     */
	    _handleClick:function(index,disabled){
	        if(!disabled){
	            this.setState({currentIndex : index})
	        }
	    },

	    render:function(){
	        var _self=this;
	        return(
	            React.createElement("div", {className: "ucs-tabs"}, 
	                React.createElement("div", {className: "ucs-tabs-bar"}, 
	                    React.createElement("ul", null, 
	                         React.Children.map( this.props.children , function(element,index){
	                            var disabled=element.props.disabled?'disabled':'';
	                            return(
	                                React.createElement("li", {onClick:  function(){_self._handleClick(index,element.props.disabled)}, className: disabled+" "+_self.checkTitleIndex(index)}, 
	                                     element.props.tab
	                                )
	                            );
	                        }) 
	                    )
	                ), 
	                React.createElement("div", {className: "ucs-tabs-content"}, 
	                    React.Children.map(this.props.children,function(element,index){
	                        return(
	                            React.createElement("div", {className: "ucs-tabs-tabpane", style: { "display": _self.checkContentIndex(index)}}, 
	                                element.props.children
	                            )
	                        );
	                    })
	                )
	            )
	        );
	    }
	});

	Tabs.TabItem=TabItem;
	module.exports = Tabs;

/***/ },
/* 21 */
/***/ function(module, exports) {

	/**
	     * Tips组件
	     *
	     * @param message 提示文本内容
	     * @param icon icon图标
	     * @param close 关闭按钮，不传则不显示
	     * @param position 提示框位置，leftTop，middleTop，rightTop，leftMiddle，middle，rightMiddle，leftBottom，middleBottom，rightBottom
	     *
	     * 示例:
	     *
	     *     @example
	     *     <Tips id="tips" name="tipsName" message="警告提示文字内容" icon="warning"  position="middle"/>
	     */
	var Tips = React.createClass({displayName: "Tips",
	            getDefaultProps:function (){
	                return {
	                    message:"",
	                    icon:"",
	                    close:"",
	                    position:"middle",
	                    id:"",
	                    name:""
	                }   
	            },
	            closeHandle:function(){
	                this.refs.ucsTips.style.display = "none";
	            },
	            componentDidMount:function(){
	                /*var that = this.refs.ucsTips;
	                setTimeout(function(){that.style.display = 'none'}, 3000);*/
	            },
	            render:function (){
	                var showIcon = this.props.icon?"inline-block":"none";
	                var showClose = this.props.close?"block":"none";

	                return (
	                    React.createElement("div", {id: this.props.id, name: this.props.name, className: 'ucs-tips '+this.props.position, ref: "ucsTips"}, 
	                        React.createElement("i", {className: 'ucs-tips-icon iconfont icon-'+this.props.icon, style: {display:showIcon}}), 
	                        React.createElement("span", {className: "ucs-tips-message"}, this.props.message), 
	                        React.createElement("span", {className: "ucs-tips-close", style: {display:showClose}, onClick: this.closeHandle}, this.props.close)
	                    )
	                )       
	            }
	        });

	module.exports = Tips;




/***/ },
/* 22 */
/***/ function(module, exports) {

	/**
	 * Badge组件
	 *
	 * @param count 传入的数值,若不传,默认为小红点
	 *
	 * 示例:
	 *
	 *     @example
	 *     <Badge id="badge" name="badgeName" count="8" />
	 *
	 */
	var Badge = React.createClass({displayName: "Badge",
		getDefaultProps:function (){
			return {
				count:"",
				id:"",
				name:""
			}	
		},
		render:function (){
			return (
				React.createElement("span", {id: this.props.id, name: this.props.name, className: "ucs-badge"}, 
					React.createElement("sup", {className: "ucs-badge-number", ref: "ucsBadgeNumber"}, this.props.count)
				)
				)		
		},
		componentDidMount:function(){
	 		this.props.count==""?(this.refs.ucsBadgeNumber.className=this.refs.ucsBadgeNumber.className+" ucs-badge-dot"):null;
		}
	});

	module.exports = Badge;





/***/ },
/* 23 */
/***/ function(module, exports) {

	/**
	 *
	 * 无缝滚动
	 *
	 * @param [config] 配置信息。包含：a: dataType：数据类型：1：文本；2：图片；3：文字+图片; b: direction:滚动方向：up, down, left, right; c:speed:滚动速度：1-100：数字越大，滚动越快；负数：同0；d:scrollType:滚动类型：1：无缝滚动；2：间歇滚动;e:stopTime:间歇滚动停顿时间
	 *
	 * @param [dataSource]  数据源：数组格式
	 *
	 * @constructs
	 * @author huangdebin
	 * SeamlessScroll
	 *
	 * 示例:
	 *
	 *     @example
	 *     <SeamlessScroll id="seamlessScrollId" config={CONFIG} dataSource={DATASOURCE} />
	 */
	var SeamlessScroll = React.createClass({displayName: "SeamlessScroll",
	    getDefaultProps: function(){
	        return {
	            config:{
	                dataType: '1',
	                direction: 'up',
	                speed:'5',        //滚动速度
	                scrollType: '2',  //1：无缝滚动，2：间歇滚动:只有向上滚动的场景
	                stopTime:'1500'    //间歇滚动停顿时间
	            }
	        }
	    },
	    getInitialState: function(){
	        return null;
	    },
	//获取一个特定元素(elem)的样式属性(name)
	    getStyle: function( elem, name ) {
	        //如果该属性存在于 style[]中，则它最近被设置过(且就是当前的)
	        if (elem.style[name])
	            return elem.style[name];
	        //否则，尝试 IE 的方式
	        else if (elem.currentStyle)
	            return elem.currentStyle[name];
	        //或者 W3C 的方法，如果存在的话
	        else if (document.defaultView && document.defaultView.getComputedStyle) {
	            //它使用传统的"text-Align"风格的规则书写方式，而不是"textAlign"
	            name = name.replace(/([A-Z])/g,"-$1");
	            name = name.toLowerCase();
	            //获取 style 对象并取得属性的值(如果存在的话)
	            var s = document.defaultView.getComputedStyle(elem,"");
	            return s && s.getPropertyValue(name);
	            //否则，就是在使用其它的浏览器
	        } else
	            return null;
	    },
	    getElementOffsetLeft:function(ele){
	        var actualLeft = ele.offsetLeft;
	        var current = ele.offsetParent;
	        while (current !== null){
	            actualLeft += current.offsetLeft;
	            current = current.offsetParent;
	        }
	        if (document.compatMode == "BackCompat"){
	            var elementScrollLeft=document.body.scrollLeft;
	        } else {
	            var elementScrollLeft=document.documentElement.scrollLeft;
	        }
	        return actualLeft-elementScrollLeft;
	    },
	    myAddEvent: function(element, type, fn){
	        if(element.attachEvent){
	            element.attachEvent("on" + type, fn);
	        }else if(element.addEventListener){
	            element.addEventListener(type, fn, false);
	        }else{
	            element['on' + type] = fn;
	        }
	    },
	    componentDidMount: function(){
	        //getElementsByClassName 兼容ie7
	        if(!document.getElementsByClassName){
	            document.getElementsByClassName = function(className, element){
	                var children = (element || document).getElementsByTagName('*');
	                var elements = new Array();
	                for (var i=0; i<children.length; i++){
	                    var child = children[i];
	                    var classNames = child.className.split(' ');
	                    for (var j=0; j<classNames.length; j++){
	                        if (classNames[j] == className){
	                            elements.push(child);
	                            break;
	                        }
	                    }
	                }
	                return elements;
	            };
	        }

	        var reactThis = this;
	        var _wrap = this.refs.ucsSeamlessScroll;
	        var _wrapIn = this.refs.ucsSeamlessScrollIn;
	        var _block1 = this.refs.seamlessScrollList1;
	        var _block2 = this.refs.seamlessScrollList2;
	        var _ul = _block1.getElementsByTagName('ul')[0];
	        var _speed = this.props.config.speed;
	        var _stopTime = this.props.config.stopTime;
	        var _direction = this.props.config.direction;
	        var _scrollType = this.props.config.scrollType;
	        if(_direction == 'up' || _direction == 'down'){
	            if(_block1.offsetHeight < _wrap.offsetHeight){
	                return;
	            }else{
	                _block2.innerHTML = _block1.innerHTML;
	            }
	        }
	        if(_direction == 'left' || _direction == 'right'){
	            //设置ul的宽度
	            var _ulWidth = 0;
	            for(var i = 0, len = _ul.children.length; i < len; i++){
	                var w = parseFloat(_ul.children[i].offsetWidth) +
	                    parseFloat(this.getStyle(_ul.children[i], 'marginLeft')) +
	                    parseFloat(this.getStyle(_ul.children[i], 'marginRight'));
	                _ulWidth += w;
	            }
	            if(_ulWidth < _wrap.offsetWidth){
	                return;
	            }else{
	                _block2.innerHTML = _block1.innerHTML;
	                _block2.getElementsByTagName('ul')[0].style.width = _ul.style.width = _ulWidth + 'px';
	                _wrapIn.style.width = _ulWidth * 2 + 'px';
	            }
	        }
	        //无缝滚动
	        if(_scrollType == '1'){
	            //启动定时器
	            var timer = setInterval(marquee, _speed);
	            //滚动函数
	            function marquee(){
	                if(_direction == 'up'){
	                    if(_block2.offsetTop - _wrapIn.scrollTop <= 0){
	                        _wrapIn.scrollTop -= _block2.offsetHeight;
	                    }else{
	                        _wrapIn.scrollTop++;
	                    }
	                }else if(_direction == 'down'){
	                    if(_block1.offsetTop >= _wrapIn.scrollTop){
	                        _wrapIn.scrollTop = _block1.offsetHeight;
	                    }else{
	                        _wrapIn.scrollTop--;
	                    }
	                }else if(_direction == 'left'){
	                    if(_block2.offsetWidth <= _wrap.scrollLeft){
	                        _wrap.scrollLeft -= _block1.offsetWidth;
	                    }else{
	                        _wrap.scrollLeft++;
	                    }
	                }else if(_direction == 'right'){

	                    //由于offsetLeft在ie和其他浏览器获取的值不同，用getElementMargin函数兼容
	                    var _block1OffsetLeft = reactThis.getElementOffsetLeft(_block1);
	                    if(_block1OffsetLeft > _wrap.scrollLeft){
	                        _wrap.scrollLeft = _block2.offsetWidth;
	                    }else{
	                        _wrap.scrollLeft--;
	                    }
	                }
	            }
	        }

	        //间歇滚动
	        if(_scrollType == '2'){
	            var timer2 = setTimeout(startScroll,_stopTime);
	            var timer2_1;
	            function startScroll(){
	                timer2_1=setInterval(function(){scrollUp()}, _speed);
	                _wrapIn.scrollTop++;
	            }
	            function scrollUp(){
	                var unitHeight = parseInt(_ul.children[0].offsetHeight) +
	                    parseInt(reactThis.getStyle(_ul.children[0], 'paddingTop')) +
	                    parseInt(reactThis.getStyle(_ul.children[0], 'paddingBottom')) +
	                    parseInt(reactThis.getStyle(_ul.children[0], 'marginTop')) +
	                    parseInt(reactThis.getStyle(_ul.children[0], 'marginBottom'));
	                if(_wrapIn.scrollTop % unitHeight==0){
	                    clearInterval(timer2_1);
	                    setTimeout(startScroll, _stopTime);
	                }else{
	                    if(_direction == 'up') { //根据实际应用场景，目前只预留向上滚动的情况
	                        _wrapIn.scrollTop++;
	                        if (_wrapIn.scrollTop >= _wrapIn.scrollHeight / 2) {
	                            _wrapIn.scrollTop = 0;
	                        }
	                    }
	                }
	            }
	        }
	        //滚动 鼠标事件监听
	        this.myAddEvent(_wrapIn, 'mouseenter', handleMouseIn);
	        this.myAddEvent(_wrapIn, 'mouseleave', handleMouseOut);
	        //鼠标悬浮
	        function handleMouseIn(){
	            if(_scrollType == '1'){
	                clearInterval(timer);
	            }
	            if(_scrollType == '2'){
	            }
	        }
	        //鼠标离开
	        function handleMouseOut(){
	            if(_scrollType == '1') {
	                timer = setInterval(marquee, _speed);
	            }
	            if(_scrollType == '2'){
	            }
	        }
	    },
	    render:function(){
	        var _config = this.props.config;
	        var _direction = _config.direction;
	        if(_direction == 'up' || _direction == "down"){
	            var _wrapClassName = 'ucs-seamless-scroll ucs-seamless-scroll-vertical';
	        }
	        if(_direction == 'left' || _direction == 'right'){
	            var _wrapClassName = 'ucs-seamless-scroll ucs-seamless-scroll-horizontal';
	        }
	        return (
	            React.createElement("div", {id: this.props.id, className: _wrapClassName, ref: "ucsSeamlessScroll"}, 
	                React.createElement("div", {className: "ucs-seamless-scroll-in", ref: "ucsSeamlessScrollIn"}, 
	                    React.createElement("div", {className: "ucs-seamless-scroll-list1", ref: "seamlessScrollList1"}, 
	                        React.createElement("ul", null, 
	                            
	                                this.props.dataSource.map(function(item, index){
	                                    return React.createElement(SeamlessScrollItem, {config: _config, item: item, index: index, key: index})
	                                })
	                            
	                        )
	                    ), 
	                    React.createElement("div", {className: "ucs-seamless-scroll-list2", ref: "seamlessScrollList2"}

	                    )
	                )
	            )
	        );
	    }
	});
	var SeamlessScrollItem = React.createClass({displayName: "SeamlessScrollItem",
	    render: function(){
	        var _anchor = this.props.item.anchor;
	        var _title = this.props.item.title;
	        var _image = this.props.item.image;
	        var _index = this.props.index;
	        var _dataType = this.props.config.dataType;
	        if(_dataType == 1){
	            if(_anchor.trim() !== ''){
	                return (
	                    React.createElement("li", {className: "type-text", key: _index}, React.createElement("a", {href: _anchor}, React.createElement("span", {dangerouslySetInnerHTML: {__html: _title}})))
	                );
	            }else{
	                return (
	                    React.createElement("li", {className: "type-text", key: _index}, React.createElement("span", {dangerouslySetInnerHTML: {__html: _title}}))
	                );
	            }
	        }else if(_dataType == 2){
	            if(_anchor.trim() !== ''){
	                return (
	                    React.createElement("li", {className: "type-image", key: _index}, React.createElement("a", {href: _anchor}, React.createElement("img", {src: _image})))
	                );
	            }else{
	                return (
	                    React.createElement("li", {className: "type-image", key: _index}, React.createElement("img", {src: _image}))
	                );
	            }
	        }else if(_dataType == 3){
	            if(_anchor.trim() !== ''){
	                return (
	                    React.createElement("li", {className: "type-text-image", key: _index}, React.createElement("a", {href: _anchor}, React.createElement("img", {src: _image}), React.createElement("span", {dangerouslySetInnerHTML: {__html: _title}})))
	                );
	            }else{
	                return (
	                    React.createElement("li", {className: "type-text-image", key: _index}, React.createElement("img", {src: _image}), React.createElement("span", {dangerouslySetInnerHTML: {__html: _title}}))
	                );
	            }
	        }else{
	            console.log('请检查参数dataType是否正确！参考值：1：文本；2：图片；3：图文');
	        }
	    }
	});
	module.exports = SeamlessScroll;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var classnames = __webpack_require__(2);
	/**
	 *
	 * 分享
	 *
	 * @param [className] class名
	 *
	 * @param [openType] 打开方式 新标签 newTab 或 新窗口 newWindow
	 *
	 * @param [title] 分享标题
	 *
	 * @param [image]  分享图片
	 *
	 * @param [url]  分享链接
	 *
	 * @param [description]  分享描述
	 *
	 * @param [sites]  分享站点
	 *
	 * @constructs
	 * @author huangdebin
	 * Share
	 *
	 * 示例:
	 *
	 *     @example
	 *     <Share id="share1" className="clearfix" openType="newWindow" title="【华润银行】资产交易平台" image="http://thrbank.ucsmy.com/Content/Images/1.jpg" url="http://thrbank.ucsmy.com" description="我今天看到了华润银行的票据投资项目，预期年化利率6到8个点，比同行产品收益增加40个百分点，而且门槛低周期短，我很有冲动购买，求大家帮忙分析分析！" sites={[ "qzone", "weibo", "wechat", "tencent", "douban", "renren", "xianguo", "mail", "qq", "163", "tianya", "ifeng" ]} />
	 */
	var Share = React.createClass({displayName: "Share",
	    getDefaultProps:function() {
	        function getMetaContentByName(name){
	            return (document.getElementsByName(name)[0] || 0).content;
	        }
	        return {
	            id:"",
	            className: "",
	            openType: "newWindow",  // newWindow: 新窗口打开， newTab: 新标签打开
	            sites: [ "qzone", "qq", "weibo" ],
	            url: location.href
	            || "http://www.ucsmy.com/",
	            image: (document.images[0] || 0).src
	            || "http://www.ucsmy.com/images/logo.png",
	            title: getMetaContentByName('title')
	            || getMetaContentByName('Title')
	            || document.title
	            || " 广东网金控股股份有限公司",
	            description: getMetaContentByName('description')
	            || getMetaContentByName('Description')
	            || "广东网金控股股份有限公司，专业互联网技术解决方案提供商，基于ICT融合技术、云计算、大数据和区块链等技术，为通信、金融、企事业等行业客户提供安全、高效的UCS互联网技术解决方案。",
	            wechatQrcodeTitle: "微信扫一扫：分享",
	            wechatQrcodeText: "微信扫一扫二维码，便可将本文分享至朋友圈。",
	            wechatQrcodeImg: "http://www.ucsmy.com/images/logo.png"
	        }
	    },
	    shareInNewWindow:function(link){
	        window.open(link, "_blank");
	    },
	    render:function() {
	        var RootThis = this;

	        var sites = this.props.sites;
	        var openType = this.props.openType;
	        var url = encodeURIComponent(this.props.url);
	        var image = encodeURIComponent(this.props.image);
	        var title = encodeURIComponent(this.props.title);
	        var description = encodeURIComponent(this.props.description);
	        var source = encodeURIComponent(document.title);
	        var origin = encodeURIComponent(location.origin);

	        var className = classnames(
	            'ucs-share',
	            this.props.className
	        );

	        var shareTemplates = {
	            qzone: { "title":"qq空间", "name":"qzone", "link":"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+ url +"&title="+ title +"&pics="+ image +"&desc="+ description +"&summary="+ description },
	            weibo: { "title":"新浪", "name":"sina", "link":"http://service.weibo.com/share/share.php?url="+ url +"&appkey=610475664&title="+ description +"&pic="+ image },
	            baidu: { "title":"百度", "name":"baidu", "link":"http://cang.baidu.com/do/add?it="+ title +"&iu="+ url +"&fr=ien#nw=1" },
	            googlebuzz: { "title":"谷歌", "name":"googlebuzz", "link":"http://www.google.com/buzz/post?url="+ url +"&imageurl="+ image },
	            douban: { "title":"豆瓣", "name":"douban", "link":"http://www.douban.com/share/service?image="+ image +"&href="+ url +"&name="+ title +"&text="+ description },
	            renren: { "title":"人人", "name":"renren", "link":"http://widget.renren.com/dialog/share?resourceUrl="+ url +"&srcUrl="+ url +"&title="+ title +"&pic="+ image +"&description="+ description },
	            xianguo: { "title":"鲜果", "name":"xianguo", "link":"http://xianguo.com/service/submitdigg/?link="+ url +"&title="+ title },
	            mail: { "title":"邮箱", "name":"mail", "link":"mailto:?subject="+ title +"&body="+ encodeURIComponent('这是我看到了一篇很不错的文章，分享给你看看！\r\n\r\n') + title + encodeURIComponent('\r\n') + url },
	            tencent: { "title":"腾讯微博" , "name":"tencent", "link":"http://v.t.qq.com/share/share.php?c=share&a=index&title="+ description +"&appkey=5153746&url="+ url +"&pic="+ image },
	            163: { "title":"163", "name":"163", "link":"http://t.163.com/article/user/checkLogin.do?source="+ source +"&info="+ description +"&images="+ image },
	            tianya: { "title":"天涯", "name":"tianya", "link":"http://open.tianya.cn/widget/send_for.php?action=send-html&shareTo=2&url="+ url +"&title="+ description +"&relateTYUserName="+ description +"&picUrl="+ image },
	            ifeng: { "title":"凤凰", "name":"ifeng", "link":"http://t.ifeng.com/interface.php?_c=share&_a=share&sourceUrl="+ source +"&title="+ description +"&pic="+ image },
	            linkedin: { "title":"领英", "name":"linkedin", "link":"http://www.linkedin.com/shareArticle?mini=true&ro=true&title="+ title +"&url="+ url +"&summary="+ description +"&source="+ source +"&armin=armin" },
	            facebook: { "title":"脸书", "name":"facebook", "link":"https://www.facebook.com/sharer/sharer.php?u="+ url },
	            twitter: { "title":"推特", "name":"twitter", "link":"https://twitter.com/intent/tweet?text="+ title +"&url="+ url +"&via="+ origin },
	            google: { "title":"谷歌", "name":"google", "link":"https://plus.google.com/share?url="+ url },
	            wechat: { "title":"微信", "name":"wechat" },
	            qq: { "title":"qq好友", "name":"qq", "link": "http://connect.qq.com/widget/shareqq/index.html?url="+ url +"&title="+ title +"&source="+ source +"&desc="+ description }
	        };

	        var wechat = function(site){
	            var wechatQrcodeTitle = RootThis.props.wechatQrcodeTitle;
	            var wechatQrcodeText = RootThis.props.wechatQrcodeText;
	            var wechatQrcodeImg = RootThis.props.wechatQrcodeImg;
	            return (
	                React.createElement("li", null, 
	                    React.createElement("a", {
	                        className: "share-button share-button-wechat", 
	                        href: "javascript:", 
	                        title: shareTemplates[site]["title"]}, 
	                        shareTemplates[site]["title"], 
	                        React.createElement("div", {className: "wechat-qrcode"}, 
	                            React.createElement("h4", null, wechatQrcodeTitle), 
	                            React.createElement("div", {className: "qrcode"}, 
	                                React.createElement("img", {src: wechatQrcodeImg, width: 100})
	                            ), 
	                            React.createElement("div", {className: "help"}, 
	                                React.createElement("p", null, wechatQrcodeText)
	                            )
	                        )
	                    )
	                )
	            )
	        }

	        if(openType == "newWindow"){
	            //newWindow
	            var html = sites.map(function(site, i){
	                if(site === "wechat"){
	                    return wechat(site);
	                }else{
	                    return (
	                        React.createElement("li", null, 
	                            React.createElement("a", {
	                                className: "share-button share-button-"+ shareTemplates[site]["name"], 
	                                id: "", 
	                                href: "javascript:void(0);", 
	                                title: shareTemplates[site]["title"], 
	                                onClick: RootThis.shareInNewWindow.bind(this, shareTemplates[site]["link"])}, 
	                                shareTemplates[site]["title"]
	                            )
	                        )
	                    )
	                }
	            });
	        }else{
	            // newTab
	            var html = sites.map(function(site, i){
	                if(site === "wechat"){
	                    return wechat(site);
	                }else{
	                    return (
	                        React.createElement("li", null, 
	                            React.createElement("a", {className: "share-button share-button-" + shareTemplates[site]["name"], 
	                               id: "", 
	                               href: shareTemplates[site]["link"], 
	                               title: shareTemplates[site]["title"], 
	                               target: "_blank"}, 
	                                shareTemplates[site]["title"]
	                            )
	                        )
	                    )
	                }
	            });
	        }

	        return (
	            React.createElement("div", {className: className}, 
	                React.createElement("ul", null, 
	                    React.createElement("li", null, "分享到："), 
	                    html
	                )
	            )
	        )
	    }
	});


	module.exports = Share;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * @author John Doe <john@example.com>
	 *
	 * @class TreeTable
	 *
	 * 树表
	 *
	 *
	 *
	 *
	 * @param [showLine] 是否显示虚线
	 *
	 * @param  [showIcon] 是否显示icon
	 *
	 * @param  [expandAll] 是否展开
	 *
	 * @param {object} column 表头数据
	 *
	 *          name: 对应
	 *
	 *          field: 对应data中的每列的项
	 *
	 *          headerClass: 设置表头的className
	 *
	 *          className:  设置单元格的className
	 *
	 *          width: 设置列宽
	 *
	 *          setContent: 设置单元格中标签内容
	 *
	 *          setIcon: 设置单元格的icon
	 *
	 * @param {object} data 表格数据
	 *
	 * TreeTable组件
	 *
	 * 示例:
	 *
	 *     @example
	 *     var column =[
	 *                   {name: 'Id', field: 'id', headerClass: 'id_col', className: 'id_col',width:'30%'},
	 *                   {name: 'Name', field: 'name', headerClass: 'name_col', className: 'name_col',setContent:this.testGetName,setIcon:''},
	 *                   {name: 'Value', field: 'value', headerClass: 'value_col', className: 'value_col',setContent:this.testGetValue}
	 *                   ];
	 *     var data ={
	 *       id: 'root',
	 *       name: 'root__node',
	 *       value: 'root_value',
	 *       children: [
	 *                  {
	 *                   id: 'node_0',
	 *                   name: 'node_0_name',
	 *                   value: 'node_0_value',
	 *                   children: [
	 *                           {
	 *                           id: 'node_0_0',
	 *                           name: 'node_0_0_name',
	 *                           value: 'node_0_0_value',
	 *                           children: [
	 *                                   {
	 *                                   id: 'node_0_0',
	 *                                   name: 'node_0_0_name',
	 *                                   value: 'node_0_0_value',
	 *                                   children: [
	 *                                           {
	 *                                           id: 'node_0_0_0',
	 *                                           name: 'node_0_0_0_name',
	 *                                           value: 'node_0_0_0_value'
	 *                                          }
	 *                                       ]
	 *                                  }
	 *                              ]
	 *                          }
	 *                      ]
	 *                  }
	 *              ]
	 *     };
	 *     <TreeTable data={data} column={column}  showLine={true}  />
	 */
	var classnames = __webpack_require__(2);
	var _treeTableIcons ={};
	var treeTableIndex = 0;
	var treeNodeIndex = 0;
	var TreeTable = React.createClass({displayName: "TreeTable",
	    getDefaultProps: function () {
	        return{
	            showLine:true,
	            showIcon:true,
	            expandAll:true,
	            id:'treetable'
	        }
	    },
	    getInitialState: function() {
	        return {
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
	    },
	    componentWillReceiveProps:function (newProps) {
	        this.setState(
	            {
	                data: newProps.data,
	                column:newProps.column,
	                showLine: newProps.showLine,
	                showIcon: newProps.showIcon
	            }
	        );

	    },
	    componentDidUpdate:function () {
	        this.expandAll(this.props.expandAll);
	    },
	    componentDidMount:function () {
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
	                var tdText = item.setContent
	                    ? item.setContent(treeNode.item,index,treeNode)
	                    : that.setContent(treeNode.item,index,treeNode);
	                var className = item.className;
	                var icon = item.setIcon
	                    ? item.setIcon(treeNode.item, index, treeNode, true)
	                    : that.setIcon(treeNode.item, index, treeNode, true);

	                var iconElement;
	                if(icon && icon != ''){
	                    iconElement = React.createElement("span", {className: icon});
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
	                        tdText = React.createElement("span", null, indent, React.createElement("span", {className: imgClass, id: folderId, onClick: that.handleNodeClick.bind(that,folderId)}), iconElement, tdText);
	                    }else {
	                        tdText = React.createElement("span", null, indent, React.createElement("span", {className: imgClass}), iconElement, tdText) ;

	                    }

	                }else {
	                    tdText = React.createElement("span", null, iconElement, tdText);
	                }
	                className = classnames('ucs-treeTableCell',className ? className : '');
	                tdStr.push(
	                    React.createElement("td", {className: className}, tdText)
	                )
	            })}
	            trStr.push( React.createElement("tr", {id: treeNode.id, className: "ucs-treeTableRow"}, tdStr, " "));
	            {treeNode.nodes.map(function (item,i) {
	                var fillImg = (indexs != -1 && indexs != count - 1) ? classnames('ucs-treeTableImg',_treeTableIcons['line']): classnames('ucs-treeTableImg',_treeTableIcons['empty']);
	                var nextIndent = React.createElement("span", null, indent, React.createElement("span", {className: fillImg}));
	                trStr.push(that.makeupTbody(layout, rootNode, item, i, treeNode.nodes.length,nextIndent));
	            })}

	        }
	        return trStr;
	    },
	    setContent:function (item,column,treeNode,treeTable) {
	        var layout = this.props.column;
	        return treeNode.item[layout[column].field]
	    },
	    setIcon: function (item,column,treeNode,isOpened) {
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
	    //点击展开
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
	                }
	            }
	        }

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
	                React.createElement("table", {id: this.props.id, className: "ucs-treeTable"}, 
	                    React.createElement("thead", {className: "ucs-treeTableHeader"}, 
	                    React.createElement("tr", null, 
	                        layout.map(function (item) {
	                            var headerClass = item.headerClass ? item.headerClass : '';
	                            return(
	                                React.createElement("td", {style: {width: item.width, maxWidth: item.width}, className: headerClass}, item.name)
	                            )
	                        })
	                    )
	                    ), 
	                    React.createElement("tbody", null, 
	                    this.makeupTbody(layout,this.getRoot(),this.getRoot(), -1, -1, null)
	                    )

	                )


	            )
	        }


	    }
	});

	module.exports = TreeTable;


/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 * 2016-12-01 William
	 * 分页器
	 *
	 * @param {string} total 总页数
	 * @param {string} currentPage 初始化为第几页
	 * @param {function} goCur 点击页数后的回调事件
	 * 示例:
	 *
	 *     @example
	 *     <Pagination total="20"/>
	 *
	 */
	var Pagination = React.createClass({displayName: "Pagination",
	    getInitialState: function() {
	        var current = parseInt(this.props.currentPage || 1);
	        return {current: current, value : ''};
	    },
	    handClick : function(e){
	        var sel = this;
	        return function(){
	            sel.setState({current : e});
	            {sel.props.goCur ? sel.props.goCur(e) : ''}
	        }
	    },
	    handChange : function(e){
	        this.setState({value : e.target.value})
	    },
	    goNext : function(){
	        var cur = this.state.current;
	        if(cur < this.props.total){
	            var _cur = parseInt(cur) + 1;
	            this.setState({current : _cur});
	            {this.props.goNext ? this.props.goNext(_cur) : ''}
	        }
	    },
	    goPrev : function(){
	        var cur = this.state.current;
	        if(cur > 1){
	            this.setState({current : cur - 1});
	            {this.props.goPrev ? this.props.goPrev(cur - 1) : ''}
	        }
	    },
	    goPage : function(){
	        var val = this.state.value;
	        if(!/^[1-9]\d*$/.test(val)){
	            alert('页码只能输入大于1的正整数');
	        }else if(parseInt(val) > parseInt(this.props.total)){
	            alert('没有这么多页');
	        }else{
	            this.setState({current : val});
	            {this.props.goCur ? this.props.goCur(val) : ''}
	        }
	    },
	    /**
	     * 获取当前选中的是第几页
	     * @return {string}
	     * */
	    getCurrentPage:function(){
	        return this.state.current;
	    },
	    componentWillReceiveProps:function(nextProps){
	        this.setState({current:nextProps.currentPage});
	    },
	    render : function(){
	        var self = this;
	        var total = this.props.total;
	        var cur = this.state.current;
	        var items = [];
	        var begin;
	        var len;
	        if(total > 5){
	            len = 5;
	            if(cur >= (total-2)){
	                begin = total - 4;
	            }else if(cur <= 3){
	                begin = 1;
	            }else{
	                begin = cur - 2;
	            }
	        }else{
	            len = total;
	            begin = 1;
	        }
	        for(var i = 0; i < len; i ++){
	            var cur = this.state.current;
	            var showI = begin + i;
	            if(cur == showI){
	                items.push({num : showI, cur : true});
	            }else{
	                items.push({num : showI, cur : false});
	            }

	        }
	        return  React.createElement("div", {className: "ucs-pagination" + (this.props.className ? (' ' + this.props.className) : '') }, 
	            React.createElement("a", {className: (this.state.current == 1 || this.props.total == 0) ? 'ucs-pagination-prev-disable' : 'ucs-pagination-prev', onClick: this.goPrev}), 
	            React.createElement("span", {className: "ucs-pagination-cols"}, 
	                        
	                            items.map(function(item){
	                                return React.createElement("a", {onClick: self.handClick(item.num), className: item.cur? 'ucs-pagination-num-current' : 'ucs-pagination-num'}, item.num)
	                            })
	                        
	                    ), 
	            React.createElement("a", {className: (this.state.current == this.props.total || this.props.total == 0) ? 'ucs-pagination-next-disable' : 'ucs-pagination-next', onClick: this.goNext}), 
	            React.createElement("div", {className: "ucs-pagination-fl"}, 
	                "共", 
	                React.createElement("span", {className: "ucs-pagination-num-total"}, total), 
	                "页，到第", 
	                React.createElement("input", {type: "text", value: self.state.value, onChange: this.handChange}), 
	                "页"
	            ), 
	            React.createElement("a", {onClick: this.goPage, className: "page-go"}, "确定")
	        )
	    }
	});
	module.exports = Pagination;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var classnames = __webpack_require__(2);
	    /**
	     * Radio组件
	     *
	     * @param [checked] 是否选中
	     * @param [disabled] 是否禁用
	     *
	     * 示例:
	     *
	     *     @example
	     *     <Radio/>
	     */
	var Radio = React.createClass({displayName: "Radio",
	    getInitialState: function () {
	        return {
	            disabled: this.props.disabled,
	            checked: this.props.checked
	        }
	    },
	    getDefaultProps: function () {
	        return {
	            disabled: false,
	            checked: false
	        }
	    },
	    componentWillReceiveProps: function (nextProps) {
	        if(this.props !== nextProps) {
	            this.setState({
	                disabled: nextProps.disabled,
	                checked: nextProps.checked
	            });
	        // }else {

	        }
	    },
	    handleChange: function (e) {
	        var t = e.target.value;
	        this.setState({checked: !this.state.checked},function () {
	            this.props.onChange ? this.props.onChange(t,this.state.checked) : "";
	        });


	    },
	    /**
	     * 获取Radio的值
	     * @return {string}
	     * */
	    getValue: function () {
	        return this.refs.radio.checked
	    },
	    /**
	     * 设置Radio的value
	     * @param {string} v
	     * Radio的value
	     *
	     * */
	    setValue: function (bool) {
	        this.setState({checked:bool});
	        this.props.checked = bool;
	    },
	    render: function () {
	        var props = {
	                name: this.props.name,
	                value: this.props.value,
	                onChange: this.handleChange,
	                disabled: this.state.disabled ? "disabled" : "",
	                className: "ucs-radio-input",
	                checked: this.state.checked
	            }
	            ;
	        var lt8 = true;
	        if ('borderRadius' in document.createElement('div').style) {
	            lt8 = false;
	        }
	        return (
	            React.createElement("label", {className: classnames('ucs-radio',{'checked':this.state.checked},{'disabled':this.state.disabled},{'lt8':lt8})}, 
	                React.createElement("input", React.__spread({type: "radio"},  props, {ref: "radio"})), 
	                React.createElement("span", {className: "ucs-radio-inner"}), 
	                React.createElement("span", {className: "text"}, this.props.children)
	            )
	        )
	    }
	});
	Radio.RadioGroup = __webpack_require__(28);
	module.exports = Radio;


/***/ },
/* 28 */
/***/ function(module, exports) {

	    /**
	     * RadioGroup组件
	     * @param [name] 组名
	     * @param [onChange] 回调
	     *
	     * 示例
	     *
	     *     @example
	     *     <RadioGroup value={this.state.value} onChange={this.onChange} name="abc" ref="radioGroup" id="optional">
	     *      <Radio value="1" disabled>选项1</Radio>
	     *      <Radio value="2">选项2</Radio>
	     *      <Radio value="3">选项3</Radio>
	     *      <Radio value="4">选项4</Radio>
	     *      <Radio value="5">选项5</Radio>
	     *     </RadioGroup>
	     *
	    　*/
	var RadioGroup = React.createClass({displayName: "RadioGroup",
	    getInitialState: function () {
	        return {value: this.props.value}
	    },
	    componentWillReceiveProps: function (nextProps) {
	        if(this.props.value !== nextProps.value) {
	            this.setState({value: nextProps.value});
	        // }else {

	        }
	    },
	    _handleChange: function (e) {
	        this.setState({value: e});
	        this.props.onChange ? this.props.onChange(e) : "";
	    },
	    getValue: function () {
	        return this.state.value;
	    },
	    setValue: function (v) {
	        this.setState({value: v});
	    },
	    render: function () {
	        var that = this;

	        return (
	            React.createElement("div", {className: "radio-group", id: this.props.id}, 
	                
	                    React.Children.map(this.props.children, function (child, index) {
	                        return React.cloneElement(child, {
	                            name: this.props.name,
	                            onChange: this._handleChange,
	                            checked: this.state.value == child.props.value ? true : false
	                        });
	                    }.bind(this))
	                
	            )
	        )
	    }
	});
	module.exports = RadioGroup;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	
	module.exports = __webpack_require__(30);

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	
	var Calendar = __webpack_require__(31);
	/*
	 * Created by Administrator on 2017/2/15.
	 */
	/**
	 * DatePicker组件
	 *
	 * @param [curDate] 当前日期
	 * @param [placeholder] 日期输入框提示语
	 * @param [name] 日期输入框name值
	 * @param [format] 日期显示格式
	 * @param [time] 是否显示时间hh:mm:ss
	 *
	 * 示例:
	 *
	 *     @example
	 *     <DatePicker curDate={curDate} placeholder={placeholder} name={name} format={format} time={time}/>
	 */
	var DatePicker = React.createClass({displayName: "DatePicker",
	    getDefaultProps: function(){
	        return {
	            curDate: "",
	            placeholder: "Select date",
	            name: "",
	            format: "yyyy-mm-dd",
	            time: false
	        }
	    },
	    getInitialState: function () {
	        return {

	        }
	    },
	    componentWillMount: function(){

	    },
	    componentDidMount: function(){
	        if (document.addEventListener) {
	            document.addEventListener('click', this.onDocumentClick);
	        } else {
	            document.attachEvent('click', this.onDocumentClick);
	        }
	    },
	    componentWillUnmount: function componentWillUnmount() {
	        this._unrenderLayer();
	        document.body.removeChild(this._layer);

	        if (document.addEventListener) {
	            document.removeEventListener('click', this.onDocumentClick);
	        } else {
	            document.detachEvent('click', this.onDocumentClick);
	        }
	    },
	    componentDidUpdate: function(){
	        if(this._layer){
	            this._renderLayer();
	        }
	    },
	    renderLayer: function(){
	        var scrollTop=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;
	        var scrollLeft=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0;
	        var style = {
	            "top": (this.refs["ucs-calendar-picker-input"].getBoundingClientRect().top+scrollTop)+"px",
	            "left": (this.refs["ucs-calendar-picker-input"].getBoundingClientRect().left+scrollLeft)+"px"
	        }
	        return (
	            React.createElement("div", null, 
	                React.createElement(Calendar, {curDate: this.refs["ucs-calendar-picker-input"].value, callBack: this.callBack, style: style, time: this.props.time})
	            )
	        );
	    },
	    _renderLayer: function() {
	        var layerElement = this.renderLayer();

	        if (layerElement === null) {
	            ReactDOM.render(React.createElement("noscript", null), this._layer);
	        } else {
	            ReactDOM.render(layerElement, this._layer);
	        }
	        /*if (this.layerDidMount) {
	         this.layerDidMount(this._layer);
	         }*/
	    },
	    _unrenderLayer: function() {
	        /*if (this.layerWillUnmount) {
	         this.layerWillUnmount(this._layer);
	         }*/

	        ReactDOM.unmountComponentAtNode(this._layer);
	    },
	    onDocumentClick: function(){
	        /*if(this._layer){
	            document.body.removeChild(this._layer);
	            this._layer = null;
	        }*/
	        if(document.getElementById("datePickerLayerId")){
	            document.body.removeChild(document.getElementById("datePickerLayerId"));
	            this._layer = null;
	        }
	    },
	    clickHandler: function(e){
	        e.nativeEvent.stopImmediatePropagation();
	        if(document.getElementById("datePickerLayerId")){
	            document.body.removeChild(document.getElementById("datePickerLayerId"));
	        }
	        this._layer = document.createElement('div');
	        this._layer.id = "datePickerLayerId";
	        document.body.appendChild(this._layer);

	        this._renderLayer();
	    },
	    callBack: function(curDate,curTime){
	        if(this.props.format.indexOf("-")>0){
	            if(this.props.time){
	                this.refs["ucs-calendar-picker-input"].value = curDate.replace(/\//g,"-")+" "+curTime;
	            }else{
	                this.refs["ucs-calendar-picker-input"].value = curDate.replace(/\//g,"-");
	            }
	        }else{
	            if(this.props.time){
	                this.refs["ucs-calendar-picker-input"].value = curDate+" "+curTime;
	            }else{
	                this.refs["ucs-calendar-picker-input"].value = curDate;
	            }
	        }
	        if(this._layer){
	            document.body.removeChild(this._layer);
	            this._layer = null;
	        }
	    },
	    /**
	     * DatePicker
	     * @return {string}
	     * */
	    getValue: function(){
	        return this.refs['ucs-calendar-picker-input'].value;
	    },
	    render: function(){
	        var _this = this;
	        return (
	            React.createElement("span", {className: "ucs-calendar-picker"}, 
	                React.createElement("span", null, 
	                    React.createElement("input", {value: _this.props.curDate, placeholder: _this.props.placeholder, ref: "ucs-calendar-picker-input", name: _this.props.name, className: "ucs-calendar-picker-input", onClick: _this.clickHandler}), 
	                    React.createElement("span", {className: "ucs-calendar-picker-icon"})
	                )
	            )
	        );
	    }
	});

	module.exports = DatePicker;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Created by Administrator on 2017/2/10.
	 */
	var CalendarPanel = __webpack_require__(32);
	var Calendar = React.createClass({displayName: "Calendar",
	    getDefaultProps: function(){
	        return {

	        }
	    },
	    getInitialState: function () {
	        return {

	        }
	    },
	    componentWillMount: function(){

	    },
	    componentDidMount: function(){

	    },
	    componentDidUpdate: function(){
	    },
	    clickHandler: function(e){
	        e.nativeEvent.stopImmediatePropagation();
	    },
	    render: function(){
	        var _this = this;
	        var _curDate = _this.props.curDate == "" ? new Date() : new Date(_this.props.curDate);
	        return (
	            React.createElement("div", {className: "ucs-calendar-picker-container ucs-calendar-picker-container-placement-topLeft", style: this.props.style, onClick: _this.clickHandler}, 
	                React.createElement("div", {className: "ucs-calendar", tabindex: "0"}, 
	                    React.createElement(CalendarPanel, {curDate: _curDate, callBack: _this.props.callBack, time: _this.props.time})
	                )
	            )
	        );
	    }
	});

	module.exports = Calendar;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	
	var MyDate = __webpack_require__(33);
	var MonthPanel = __webpack_require__(34);
	var YearPanel = __webpack_require__(35);
	var CalendarPanel = React.createClass({displayName: "CalendarPanel",
	    getDefaultProps: function(){
	        return {
	            curDate : new Date()
	        }
	    },
	    getInitialState: function () {
	        return {
	            curDay: this.props.curDate.getDate(),
	            curMonth: this.props.curDate.getMonth()+1,
	            curMonthStr: MyDate.montharrs[this.props.curDate.getMonth()],
	            curYear: this.props.curDate.getFullYear(),
	            curHour: MyDate.digit(this.props.curDate.getHours()),
	            curMinute: MyDate.digit(this.props.curDate.getMinutes()),
	            curSecond: MyDate.digit(this.props.curDate.getSeconds())
	        }
	    },
	    componentWillMount: function(){

	    },
	    componentDidMount: function(){
	        this.dateChangeHandler();
	        if(this.props.time){
	            this.timeChangeHandler();
	        }
	    },
	    componentWillUnmount: function componentWillUnmount() {
	        this._unrenderMonthPanel();
	        this.refs["ucs-calendar-header"].removeChild(this._monthPanel);
	    },
	    componentDidUpdate: function(){
	        this.dateChangeHandler();
	    },
	    dateChangeHandler: function(){
	        var _this = this;
	        var firstDay = _this.state.curYear+"/"+MyDate.digit(_this.state.curMonth)+"/1";//当前月的的第一天
	        var diff = parseInt(new Date(_this.state.curYear+"/"+MyDate.digit(_this.state.curMonth)+"/1").getDay())==0?-7:-parseInt(new Date(_this.state.curYear+"/"+MyDate.digit(_this.state.curMonth)+"/1").getDay());
	        var startDate = MyDate.getDiffDate(firstDay,diff);  //当前日历的开始日期
	        //var endDate = MyDate.getDiffDate(lastDay,6-parseInt(new Date(lastDay).getDay()));   //当前日历的结束日期
	        var endDate = MyDate.getDiffDate(startDate,41);   //当前日历的结束日期
	        var dateArr = MyDate.getDateArr(startDate,endDate);   //当前显示日期数组
	        _this.refs["ucs-calendar-tbody"].innerHTML = "";
	        for(var i = 0; i < dateArr.length; i=i+7){
	            var tr = document.createElement('tr');
	            tr.setAttribute("role","row");
	            for(var j = 0; j < 7 ; j ++){
	                var dd = i+j;
	                var ndate = new Date(dateArr[dd]);
	                var div = document.createElement('div');
	                div.className = "ucs-calendar-date";
	                div.setAttribute("aria-selected","false");
	                div.setAttribute("aria-disabled","false");
	                div.innerHTML = ndate.getDate();

	                var td = document.createElement('td');
	                td.setAttribute("role","gridcell");
	                td.setAttribute("title",dateArr[dd]);
	                (function(dd){
	                    td.onclick = function(e){
	                        if(e&&e.stopPropagation){
	                            //因此它支持W3C的stopPropagation()方法
	                            e.stopPropagation();
	                        }else{
	                            //否则我们使用ie的方法来取消事件冒泡
	                            window.event.cancelBubble = true;
	                        }
	                        if(_this.props.time){
	                            _this.selectHandler(this,dateArr[dd]);
	                        }else{
	                            _this.props.callBack(dateArr[dd],"00:00:00");
	                        }
	                    };
	                })(dd);
	                if(ndate.getMonth()+2 == _this.state.curMonth || (ndate.getMonth()+2)%12 == _this.state.curMonth){
	                    td.className = "ucs-calendar-cell ucs-calendar-last-month-cell";
	                }else if(ndate.getMonth()+1 == _this.state.curMonth){
	                    if(ndate.getDate()==_this.state.curDay){
	                        td.className = "ucs-calendar-cell ucs-calendar-selected-day";
	                    }else{
	                        td.className = "ucs-calendar-cell";
	                    }
	                }else if(ndate.getMonth() == _this.state.curMonth || ndate.getMonth() == _this.state.curMonth%12){
	                    td.className = "ucs-calendar-cell ucs-calendar-next-month-btn-day";
	                }

	                td.appendChild(div);

	                tr.appendChild(td);
	            }
	            _this.refs["ucs-calendar-tbody"].appendChild(tr);
	        }
	    },
	    timeChangeHandler: function(){
	        var _this = this;
	        for(var i = 0; i < 24; i ++){
	            var opt = document.createElement('option');
	            opt.setAttribute("value",MyDate.digit(i));
	            opt.innerHTML = MyDate.digit(i);
	            if(_this.state.curHour == i){
	                opt.setAttribute("selected","selected");
	            }
	            _this.refs['select-hour'].appendChild(opt);
	        }

	        for(var i = 0; i < 60; i ++){
	            var opt = document.createElement('option');
	            opt.setAttribute("value",MyDate.digit(i));
	            opt.innerHTML = MyDate.digit(i);
	            if(_this.state.curMinute == i){
	                opt.setAttribute("selected","selected");
	            }
	            _this.refs['select-minute'].appendChild(opt);
	        }

	        for(var i = 0; i < 60; i ++){
	            var opt = document.createElement('option');
	            opt.setAttribute("value",MyDate.digit(i));
	            opt.innerHTML = MyDate.digit(i);
	            if(_this.state.curSecond == i){
	                opt.setAttribute("selected","selected");
	            }
	            _this.refs['select-second'].appendChild(opt);
	        }
	    },
	    renderMonthPanel: function(){
	        return (
	            React.createElement(MonthPanel, {curYear: this.state.curYear, curMonth: this.state.curMonth, callBack: this.callBack, monthPanel: this._monthPanel})
	        );
	    },
	    renderYearPanel: function(){
	        return (
	            React.createElement(YearPanel, {curYear: this.state.curYear, yearCallBack: this.yearCallBack, yearPanel: this._yearPanel})
	        );
	    },
	    _renderMonthPanel: function(){
	        var monthPanelElement = this.renderMonthPanel();

	        if (monthPanelElement === null) {
	            ReactDOM.render(React.createElement("noscript", null), this._monthPanel);
	        } else {
	            ReactDOM.render(monthPanelElement, this._monthPanel);
	        }
	    },
	    _renderYearPanel: function(){
	        var yearPanelElement = this.renderYearPanel();

	        if (yearPanelElement === null) {
	            ReactDOM.render(React.createElement("noscript", null), this._yearPanel);
	        } else {
	            ReactDOM.render(yearPanelElement, this._yearPanel);
	        }
	    },
	    _unrenderMonthPanel: function() {
	        /*if (this.layerWillUnmount) {
	         this.layerWillUnmount(this._layer);
	         }*/

	        ReactDOM.unmountComponentAtNode(this._layer);
	    },
	    monthClickHandler: function(){
	        this._monthPanel = document.createElement('div');
	        this._monthPanel.className = "ucs-calendar-month-panel";
	        this.refs["ucs-calendar-header"].appendChild(this._monthPanel);

	        this._renderMonthPanel();
	    },
	    yearClickHandler: function(){
	        this._yearPanel = document.createElement('div');
	        this._yearPanel.className = "ucs-calendar-year-panel";
	        this.refs["ucs-calendar-header"].appendChild(this._yearPanel);

	        this._renderYearPanel();
	    },
	    callBack: function(curYear,curMonth){
	        this.setState({
	            curMonth: curMonth+1,
	            curMonthStr: MyDate.montharrs[curMonth],
	            curYear: curYear
	        });
	        this.refs["ucs-calendar-header"].removeChild(this._monthPanel);
	    },
	    yearCallBack: function(curYear){
	        this.setState({
	            curYear: curYear
	        });
	        this.refs["ucs-calendar-header"].removeChild(this._yearPanel);
	    },
	    todayClickHandler: function(){
	        var nDate = new Date();
	        var today = nDate.getFullYear()+"/"+MyDate.digit(nDate.getMonth()+1)+"/"+MyDate.digit(nDate.getDate());
	        this.props.callBack(today,this.state.curHour+":"+this.state.curMinute+":"+this.state.curSecond);
	    },
	    prevMonthHandler: function(){
	        var prevMonth = this.state.curMonth == 1 ? 12 : this.state.curMonth-1;
	        var nYear = this.state.curMonth == 1 ? this.state.curYear-1 : this.state.curYear;
	        this.setState({
	            curMonth: prevMonth,
	            curMonthStr: MyDate.montharrs[prevMonth-1],
	            curYear: nYear
	        });
	    },
	    nextMonthHandler: function(){
	        var nextMonth = this.state.curMonth == 12 ? 1 : parseInt(this.state.curMonth)+1;
	        var nYear = this.state.curMonth == 12 ? parseInt(this.state.curYear)+1 : this.state.curYear;
	        this.setState({
	            curMonth: nextMonth,
	            curMonthStr: MyDate.montharrs[nextMonth-1],
	            curYear: nYear
	        });
	    },
	    prevYearHandler: function(){
	        this.setState({
	            curYear: this.state.curYear-1
	        });
	    },
	    nextYearHandler: function(){
	        this.setState({
	            curYear: parseInt(this.state.curYear)+1
	        });
	    },
	    selectHandler: function($this,curDateStr){
	        var trArr = this.refs['ucs-calendar-tbody'].childNodes;
	        for(var i = 0; i < trArr.length; i ++){
	            for(var j = 0; j < trArr[i].childNodes.length; j ++){
	                MyDate.removeClass(trArr[i].childNodes[j],"ucs-calendar-selected-day");
	            }
	        }
	        MyDate.addClass($this,"ucs-calendar-selected-day");
	        this.setState({
	            curDay: curDateStr.split("/")[2],
	            curMonth: curDateStr.split("/")[1],
	            curYear: curDateStr.split("/")[0],
	            curMonthStr: MyDate.montharrs[curDateStr.split("/")[1]-1]
	        });
	    },
	    hourHandler: function(){
	        this.setState({
	            curHour: this.refs['select-hour'].value
	        });
	    },
	    minuteHandler: function(){
	        this.setState({
	            curMinute: this.refs['select-minute'].value
	        });
	    },
	    secondHandler: function(){
	        this.setState({
	            curSecond: this.refs['select-second'].value
	        });
	    },
	    confirmBtnHandler: function(){
	        this.props.callBack(this.state.curYear+"/"+this.state.curMonth+"/"+this.state.curDay,this.state.curHour+":"+this.state.curMinute+":"+this.state.curSecond);
	    },
	    render: function(){
	        var _this = this;
	        var footer = "";
	        if(_this.props.time){
	            footer = (
	                React.createElement("span", {className: "ucs-calendar-footer-btn"}, 
	                    React.createElement("a", {className: "ucs-calendar-today-btn ucs-calendar-today-btn2", role: "button", title: "2017-2-10", onClick: _this.todayClickHandler}, "Today"), 
	                    React.createElement("a", {className: "ucs-calendar-time-box"}, 
	                        React.createElement("select", {ref: "select-hour", onChange: _this.hourHandler}
	                        ), 
	                        React.createElement("i", null, ":"), 
	                        React.createElement("select", {ref: "select-minute", onChange: _this.minuteHandler}
	                        ), 
	                        React.createElement("i", null, ":"), 
	                        React.createElement("select", {ref: "select-second", onChange: _this.secondHandler}
	                        )
	                    ), 
	                    React.createElement("a", {className: "ucs-calendar-confirm-btn", onClick: _this.confirmBtnHandler}, "确定")
	                )
	            );
	        }else{
	            footer = (React.createElement("span", {className: "ucs-calendar-footer-btn"}, React.createElement("a", {className: "ucs-calendar-today-btn", role: "button", title: "2017-2-10", onClick: _this.todayClickHandler}, "Today")));
	        }
	        return (
	            React.createElement("div", {className: "ucs-calendar-panel"}, 
	                React.createElement("div", {className: "ucs-calendar-input-wrap"}, 
	                    React.createElement("div", {className: "ucs-calendar-date-input-wrap"}, 
	                        React.createElement("input", {className: "ucs-calendar-input ", value: "", placeholder: "Select date"})
	                    ), 
	                    React.createElement("a", {className: "ucs-calendar-clear-btn", role: "button", title: "Clear"})
	                ), 
	                React.createElement("div", {className: "ucs-calendar-date-panel"}, 
	                    React.createElement("div", {className: "ucs-calendar-header", ref: "ucs-calendar-header"}, 
	                        React.createElement("div", {style: {position: "relative"}}, 
	                            React.createElement("a", {className: "ucs-calendar-prev-year-btn", role: "button", title: "Last year (Control + left)", onClick: _this.prevYearHandler}), 
	                            React.createElement("a", {className: "ucs-calendar-prev-month-btn", role: "button", title: "Previous month (PageUp)", onClick: _this.prevMonthHandler}), 
	                                    React.createElement("span", {className: "ucs-calendar-my-select"}, 
	                                        React.createElement("a", {className: "ucs-calendar-month-select", role: "button", title: "Choose a month", onClick: _this.monthClickHandler}, _this.state.curMonthStr), 
	                                        React.createElement("a", {className: "ucs-calendar-year-select", role: "button", title: "Choose a year", onClick: _this.yearClickHandler}, _this.state.curYear)
	                                    ), 
	                            React.createElement("a", {className: "ucs-calendar-next-month-btn", title: "Next month (PageDown)", onClick: _this.nextMonthHandler}), 
	                            React.createElement("a", {className: "ucs-calendar-next-year-btn", title: "Next year (Control + right)", onClick: _this.nextYearHandler})
	                        )
	                    ), 
	                    React.createElement("div", {className: "ucs-calendar-body"}, 
	                        React.createElement("table", {className: "ucs-calendar-table", cellspacing: "0", role: "grid"}, 
	                            React.createElement("thead", null, 
	                            React.createElement("tr", {role: "row"}, 
	                                React.createElement("th", {role: "columnheader", title: "Sun", className: "ucs-calendar-column-header"}, 
	                                    React.createElement("span", {className: "ucs-calendar-column-header-inner"}, "Su")
	                                ), 
	                                React.createElement("th", {role: "columnheader", title: "Mon", className: "ucs-calendar-column-header"}, 
	                                    React.createElement("span", {className: "ucs-calendar-column-header-inner"}, "Mo")
	                                ), 
	                                React.createElement("th", {role: "columnheader", title: "Tue", className: "ucs-calendar-column-header"}, 
	                                    React.createElement("span", {className: "ucs-calendar-column-header-inner"}, "Tu")
	                                ), 
	                                React.createElement("th", {role: "columnheader", title: "Wed", className: "ucs-calendar-column-header"}, 
	                                    React.createElement("span", {className: "ucs-calendar-column-header-inner"}, "We")
	                                ), 
	                                React.createElement("th", {role: "columnheader", title: "Thu", className: "ucs-calendar-column-header"}, 
	                                    React.createElement("span", {className: "ucs-calendar-column-header-inner"}, "Th")
	                                ), 
	                                React.createElement("th", {role: "columnheader", title: "Fri", className: "ucs-calendar-column-header"}, 
	                                    React.createElement("span", {className: "ucs-calendar-column-header-inner"}, "Fr")
	                                ), 
	                                React.createElement("th", {role: "columnheader", title: "Sat", className: "ucs-calendar-column-header"}, 
	                                    React.createElement("span", {className: "ucs-calendar-column-header-inner"}, "Sa")
	                                )
	                            )
	                            ), 
	                            React.createElement("tbody", {className: "ucs-calendar-tbody", ref: "ucs-calendar-tbody"}
	                            )
	                        )
	                    ), 
	                    React.createElement("div", {className: "ucs-calendar-footer"}, 
	                        footer
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = CalendarPanel;

/***/ },
/* 33 */
/***/ function(module, exports) {

	/*
	 * Created by Administrator on 2017/2/10.
	 */
	Date.prototype.format = function (format) {
	    var o =
	    {
	        "M+": this.getMonth() + 1, //month
	        "d+": this.getDate(), //day
	        "h+": this.getHours(), //hour
	        "m+": this.getMinutes(), //minute
	        "s+": this.getSeconds(), //second
	        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
	        "S": this.getMilliseconds() //millisecond
	    }

	    if (/(y+)/.test(format)) {
	        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    }

	    for (var k in o) {
	        if (new RegExp("(" + k + ")").test(format)) {
	            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	        }
	    }
	    return format;
	};

	var jeDt = {}, doc = document, ymdMacth = /\w+|d+/g;

	//判断类型
	jeDt.isType = function(obj, type) {
	    type = type.replace(/\b(\w)|\s(\w)/g, function(m) {
	        return m.toUpperCase();
	    });
	    return Object.prototype.toString.call(obj) === "[object " + type + "]";
	};
	//循环
	jeDt.each = function(obj, fn) {
	    if (jeDt.isType(obj, "array")) {
	        for (var i = 0, len = obj.length; i < len; i++) {
	            if (fn.call(obj[i], i, obj[i]) === false) break;
	        }
	    } else {
	        for (var key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                if (fn.call(obj[key], key, obj[key]) === false) break;
	            }
	        }
	    }
	};
	//获取与设置自定义属性
	jeDt.attr = function(elem, key, val) {
	    if (typeof key === "string" && typeof val === "undefined") {
	        return elem.getAttribute(key);
	    } else {
	        elem.setAttribute(key, val);
	    }
	    return this;
	};
	jeDt.stopmp = function(e) {
	    e = e || window.event;
	    e.stopPropagation ? e.stopPropagation() :e.cancelBubble = true;
	    return this;
	};
	//查询样式是否存在
	jeDt.hasClass = function(elem, cls) {
	    elem = elem || {};
	    return new RegExp("\\b" + cls + "\\b").test(elem.className);
	};
	//添加样式
	jeDt.addClass = function(elem, cls) {
	    elem = elem || {};
	    jeDt.hasClass(elem, cls) || (elem.className += " " + cls);
	    elem.className = elem.className.replace(/^\s|\s$/g, "").replace(/\s+/g, " ");
	    return this;
	};
	//删除样式
	jeDt.removeClass = function(elem, cls) {
	    elem = elem || {};
	    if (jeDt.hasClass(elem, cls)) {
	        elem.className = elem.className.replace(new RegExp("(\\s|^)" + cls + "(\\s|$)"), "");
	    }
	    return this;
	};
	//获取样式
	jeDt.getStyle = function(elem, style) {
	    var cssVal = document.defaultView ? window.getComputedStyle(elem, null)[style] : elem.currentStyle[style];
	    return cssVal;
	}
	jeDt.isShow = function(elem, bool) {
	    elem.style.display = bool != true ? "none" :"block";
	};
	//获取与设置HTML
	jeDt.html = function(elem, value) {
	    if (typeof value != "undefined" || value !== undefined && elem.nodeType === 1) {
	        elem.innerHTML = value;
	    } else {
	        return elem.innerHTML;
	    }
	    return this;
	};
	//获取与设置文本
	jeDt.text = function(elem, value) {
	    if (value !== undefined && elem.nodeType === 1) {
	        document.all ? elem.innerText = value :elem.textContent = value;
	    } else {
	        var emText = document.all ? elem.innerText :elem.textContent;
	        return jeDt.trim(emText);
	    }
	    return this;
	};
	//获取与设置value
	jeDt.val = function(elem, value) {
	    if (value !== undefined && elem.nodeType === 1) {
	        elem.value = value;
	    } else {
	        return jeDt.trim(elem.value);
	    }
	    return this;
	};
	jeDt.bind = function(elObj, type, fn) {
	    type = type.toLowerCase();
	    var bindevent = function (elem) {
	        elem.attachEvent ? elem.attachEvent("on" + type, function() {
	            fn.call(elem, window.type);
	        }) :elem.addEventListener(type, fn, false);
	    }
	    return elObj == document ? bindevent(document) :jeDt.each(elObj, function(i, elem) {
	        bindevent(elem);
	    });
	};
	jeDt.docScroll = function(type) {
	    type = type ? "scrollLeft" :"scrollTop";
	    return doc.body[type] | doc.documentElement[type];
	};
	jeDt.winarea = function(type) {
	    return doc.documentElement[type ? "clientWidth" :"clientHeight"];
	};
	//判断是否闰年
	jeDt.isLeap = function(y) {
	    return (y % 100 !== 0 && y % 4 === 0) || (y % 400 === 0);
	}
	//获取本月的总天数
	jeDt.getDaysNum = function(y, m) {
	    var num = 31;
	    switch (parseInt(m)) {
	        case 2:
	            num = jeDt.isLeap(y) ? 29 : 28; break;
	        case 4: case 6: case 9: case 11:
	        num = 30; break;
	    }
	    return num;
	}
	//获取月与年
	jeDt.getYM = function(y, m, n) {
	    var nd = new Date(y, m - 1);
	    nd.setMonth(m - 1 + n);
	    return {
	        y: nd.getFullYear(),
	        m: nd.getMonth() + 1
	    };
	}
	//获取上个月
	jeDt.getPrevMonth = function(y, m, n) {
	    return  jeDt.getYM(y, m, 0 - (n || 1));
	}
	//获取下个月
	jeDt.getNextMonth = function(y, m, n) {
	    return jeDt.getYM(y, m, n || 1);
	}
	//补齐数位
	jeDt.digit = function(num) {
	    return num < 10 ? "0" + (num | 0) :num;
	};
	//判断是否为数字
	jeDt.IsNum = function(str){
	    return (str!=null && str!="") ? !isNaN(str) : false;
	};
	jeDt.getLocalTime = function (timestamp, formatStr) {
	    var date;
	    var str;
	    if (timestamp != null) {
	        date = new Date(timestamp);
	    } else {
	        date = new Date();
	    }
	    if (formatStr == null) {
	        str = Date.parse(date);
	    } else {
	        str = date.format(formatStr);
	    }
	    return str;
	}
	//计算距离指定日期diff天的日期
	jeDt.getDiffDate = function (date, diff) {
	    var number = null;
	    var curdate = null;
	    if (diff == null || diff == 0) {
	        number = 0;
	    } else {
	        number = diff;
	    }

	    if (date == null) {
	        curdate = new Date();
	    } else {
	        curdate = new Date(date);
	    }

	    var myday_milliseconds = curdate.getTime() + 1000 * 60 * 60 * 24 * number;
	    var targetdate = jeDt.getLocalTime(myday_milliseconds, 'yyyy/MM/dd');
	    return targetdate;
	};
	//获取date1~date2之间的日期数组
	jeDt.getDateArr = function (date1, date2) {
	    var dateArr = [];
	    var diff = 0;

	    var aDate, oDate1, oDate2, iDays, startDate, endDate;
	    aDate = date1.split("/");
	    oDate1 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]);  //转换为yyyy-MM-dd格式
	    aDate = date2.split("/");
	    oDate2 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]);
	    iDays = parseInt((oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数

	    if (iDays >= 0) {//date1大于date2情况
	        startDate = date2;
	        endDate = date1;
	    } else {
	        startDate = date1;
	        endDate = date2;
	    }

	    while (jeDt.getDiffDate(startDate, diff) != endDate) {
	        dateArr.push(jeDt.getDiffDate(startDate, diff));
	        diff++;
	    }
	    dateArr.push(endDate);

	    return dateArr;
	}
	//转换日期格式
	jeDt.parse = function(ymd, hms, format) {
	    ymd = ymd.concat(hms);
	    var hmsCheck = jeDt.parseCheck(format, false).substring(0, 5) == "hh:mm", num = 2;
	    return format.replace(/YYYY|MM|DD|hh|mm|ss/g, function(str, index) {
	        var idx = hmsCheck ? ++num :ymd.index = ++ymd.index | 0;
	        return jeDt.digit(ymd[idx]);
	    });
	};
	jeDt.parseCheck = function(format, bool) {
	    var ymdhms = [];
	    format.replace(/YYYY|MM|DD|hh|mm|ss/g, function(str, index) {
	        ymdhms.push(str);
	    });
	    return ymdhms.join(bool == true ? "-" :":");
	};
	jeDt.checkFormat = function(format) {
	    var ymdhms = [];
	    format.replace(/YYYY|MM|DD|hh|mm|ss/g, function(str, index) {
	        ymdhms.push(str);
	    });
	    return ymdhms.join("-");
	};
	jeDt.parseMatch = function(str) {
	    var timeArr = str.split(" ");
	    return timeArr[0].match(ymdMacth);
	};
	//验证日期
	jeDt.checkDate = function (date) {
	    var dateArr = date.match(ymdMacth);
	    if (isNaN(dateArr[0]) || isNaN(dateArr[1]) || isNaN(dateArr[2])) return false;
	    if (dateArr[1] > 12 || dateArr[1] < 1) return false;
	    if (dateArr[2] < 1 || dateArr[2] > 31) return false;
	    if ((dateArr[1] == 4 || dateArr[1] == 6 || dateArr[1] == 9 || dateArr[1] == 11) && dateArr[2] > 30) return false;
	    if (dateArr[1] == 2) {
	        if (dateArr[2] > 29) return false;
	        if ((dateArr[0] % 100 == 0 && dateArr[0] % 400 != 0 || dateArr[0] % 4 != 0) && dateArr[2] > 28) return false;
	    }
	    return true;
	}
	jeDt.trim = function(text) {
	    return text.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
	}
	//初始化日期
	jeDt.nowDate = function(num, format) {
	    format = format || 'YYYY-MM-DD hh:mm:ss';
	    if(typeof num === "string"){
	        var newDate = new Date(parseInt(num) * 1e3);
	    }else{
	        num = num | 0;
	        var newDate = new Date(), todayTime = newDate.getTime() + 1000*60*60*24*num;
	        newDate.setTime(todayTime);
	    }
	    var years = newDate.getFullYear(), months = newDate.getMonth() + 1, days = newDate.getDate(), hh = newDate.getHours(), mm = newDate.getMinutes(), ss = newDate.getSeconds();
	    return jeDt.parse([ years, jeDt.digit(months), jeDt.digit(days) ], [ jeDt.digit(hh), jeDt.digit(mm), jeDt.digit(ss) ], format);
	};
	jeDt.montharr = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
	jeDt.montharrs = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
	jeDt.weeks = [ "日", "一", "二", "三", "四", "五", "六" ];
	//判断元素类型
	jeDt.isValHtml = function(that) {
	    return /textarea|input/.test(that.tagName.toLocaleLowerCase());
	};
	//节日
	jeDt.festival = function(md, n) {
	    var str = "";
	    switch (md) {
	        case "1.1": str = "元旦"; break;
	        case "2.14": str = "情人"; break;
	        case "3.8": str = "妇女"; break;
	        case "5.1": str = "劳动"; break;
	        case "6.1": str = "儿童"; break;
	        case "8.1": str = "建军"; break;
	        case "9.10": str = "教师"; break;
	        case "10.1": str = "国庆"; break;
	        case "12.24": str = "平安"; break;
	        case "12.25": str = "圣诞"; break;
	        default: str = n; break;
	    }
	    return str;
	};

	module.exports = jeDt;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Created by Administrator on 2017/2/10.
	 */
	var YearPanel = __webpack_require__(35);
	var MonthPanel = React.createClass({displayName: "MonthPanel",
	    getDefaultProps: function(){
	        return {

	        }
	    },
	    getInitialState: function () {
	        return {
	            curYear: this.props.curYear
	        }
	    },
	    componentWillMount: function(){

	    },
	    componentDidMount: function(){
	        this.monthChangeHandler();
	    },
	    componentDidUpdate: function(){
	        this.monthChangeHandler();
	    },
	    monthChangeHandler: function(){
	        var _this = this;
	        var monthStrArr = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	        _this.refs["ucs-calendar-month-panel-tbody"].innerHTML = "";
	        for(var i = 0; i < monthStrArr.length; i=i+3){
	            var tr = document.createElement('tr');
	            tr.setAttribute("role","row");
	            for(var j = 0; j < 3 ; j ++){
	                var mon = i+j;
	                var td = document.createElement('td');
	                td.setAttribute("role","gridcell");
	                td.setAttribute("title",monthStrArr[mon]);

	                (function(mon){
	                    td.onclick = function(){
	                        _this.props.callBack(_this.state.curYear,mon);
	                    };
	                })(mon);

	                if(_this.props.curMonth-1 == mon){
	                    td.className = "ucs-calendar-month-panel-cell ucs-calendar-month-panel-selected-cell ucs-calendar-month-panel-current-cell";
	                }else{
	                    td.className = "ucs-calendar-month-panel-cell";
	                }
	                var a = document.createElement('a');
	                a.className = "ucs-calendar-month-panel-month";
	                a.innerHTML = monthStrArr[mon];
	                td.appendChild(a);

	                tr.appendChild(td);
	            }
	            _this.refs["ucs-calendar-month-panel-tbody"].appendChild(tr);
	        }
	    },
	    prevYearHandler: function(){
	        this.setState({
	            curYear: this.state.curYear-1
	        });
	    },
	    nextYearHandler: function(){
	        this.setState({
	            curYear: this.state.curYear+1
	        });
	    },
	    renderYearPanel: function(){
	        return (
	            React.createElement(YearPanel, {curYear: this.state.curYear, yearCallBack: this.yearCallBack, yearPanel: this._yearPanel})
	        );
	    },
	    _renderYearPanel: function(){
	        var yearPanelElement = this.renderYearPanel();

	        if (yearPanelElement === null) {
	            ReactDOM.render(React.createElement("noscript", null), this._yearPanel);
	        } else {
	            ReactDOM.render(yearPanelElement, this._yearPanel);
	        }
	    },
	    yearClickHandler: function(){
	        this._yearPanel = document.createElement('div');
	        this._yearPanel.className = "ucs-calendar-year-panel";
	        this.props.monthPanel.appendChild(this._yearPanel);

	        this._renderYearPanel();
	    },
	    yearCallBack: function(curYear){
	        this.setState({
	            curYear: curYear
	        });
	        this.props.monthPanel.removeChild(this._yearPanel);
	    },
	    clickHandler: function(e){
	        e.nativeEvent.stopImmediatePropagation();
	    },
	    render: function(){
	        var _this = this;
	        return (
	            React.createElement("div", {onClick: _this.clickHandler}, 
	                React.createElement("div", {className: "ucs-calendar-month-panel-header"}, 
	                    React.createElement("a", {className: "ucs-calendar-month-panel-prev-year-btn", role: "button", title: "Last year (Control + left)", onClick: _this.prevYearHandler}), 
	                    React.createElement("a", {className: "ucs-calendar-month-panel-year-select", role: "button", title: "Choose a year", onClick: _this.yearClickHandler}, 
	                        React.createElement("span", {className: "ucs-calendar-month-panel-year-select-content"}, _this.state.curYear), 
	                        React.createElement("span", {className: "ucs-calendar-month-panel-year-select-arrow"}, "x")
	                    ), 
	                    React.createElement("a", {className: "ucs-calendar-month-panel-next-year-btn", role: "button", title: "Next year (Control + right)", onClick: _this.nextYearHandler})
	                ), 
	                React.createElement("div", {className: "ucs-calendar-month-panel-body"}, 
	                    React.createElement("table", {className: "ucs-calendar-month-panel-table", cellspacing: "0", role: "grid"}, 
	                        React.createElement("tbody", {className: "ucs-calendar-month-panel-tbody", ref: "ucs-calendar-month-panel-tbody"}
	                        )
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = MonthPanel;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Created by Administrator on 2017/2/10.
	 */
	var DecadePanel = __webpack_require__(36);
	var YearPanel = React.createClass({displayName: "YearPanel",
	    getDefaultProps: function(){
	        return {

	        }
	    },
	    getInitialState: function () {
	        var _this = this;
	        var _curYear = parseInt(_this.props.curYear);
	        var num = _curYear%10;
	        var _decadeStart = _curYear-num-1;
	        var _decadeEnd = _curYear + (10-num);
	        return {
	            curYear: _curYear,
	            decadeStart: _decadeStart,
	            decadeEnd: _decadeEnd
	        }
	    },
	    componentWillMount: function(){

	    },
	    componentDidMount: function(){
	        this.yearChangeHandler();
	    },
	    componentDidUpdate: function(){
	        this.yearChangeHandler();
	    },
	    componentWillUnmount: function componentWillUnmount() {
	        this._unrenderDecadePanel();
	        this.props.yearPanel.removeChild(this._decadePanel);
	    },
	    yearChangeHandler: function(){
	        var _this = this;
	        _this.refs["ucs-calendar-year-panel-tbody"].innerHTML = "";
	        for(var i = _this.state.decadeStart; i <= _this.state.decadeEnd; i=i+3){
	            var tr = document.createElement('tr');
	            tr.setAttribute("role","row");
	            for(var j = 0; j < 3 ; j ++){
	                var year = i+j;
	                var td = document.createElement('td');
	                td.setAttribute("role","gridcell");
	                td.setAttribute("title",year+"");

	                if(year == _this.state.decadeStart){
	                    td.className = "ucs-calendar-year-panel-cell ucs-calendar-year-panel-last-decade-cell";
	                    td.onclick = function(e){
	                        if(e&&e.stopPropagation){
	                            //因此它支持W3C的stopPropagation()方法
	                            e.stopPropagation();
	                        }else{
	                            //否则我们使用ie的方法来取消事件冒泡
	                            window.event.cancelBubble = true;
	                        }
	                        _this.prevDecadeHandler();
	                    };
	                }else if(year == _this.state.decadeEnd){
	                    td.className = "ucs-calendar-year-panel-cell ucs-calendar-year-panel-next-decade-cell";
	                    td.onclick = function(e){
	                        if(e&&e.stopPropagation){
	                            //因此它支持W3C的stopPropagation()方法
	                            e.stopPropagation();
	                        }else{
	                            //否则我们使用ie的方法来取消事件冒泡
	                            window.event.cancelBubble = true;
	                        }
	                        _this.nextDecadeHandler();
	                    };
	                }else{
	                    if(year == _this.state.curYear){
	                        td.className = "ucs-calendar-year-panel-cell ucs-calendar-year-panel-selected-cell";
	                    }else{
	                        td.className = "ucs-calendar-year-panel-cell";
	                    }
	                    (function(year){
	                        td.onclick = function(){
	                            _this.props.yearCallBack(year);
	                        };
	                    })(year);
	                }

	                var a = document.createElement('a');
	                a.className = "ucs-calendar-year-panel-year";
	                a.innerHTML = year;
	                td.appendChild(a);

	                tr.appendChild(td);
	            }
	            _this.refs["ucs-calendar-year-panel-tbody"].appendChild(tr);
	        }
	    },
	    prevDecadeHandler: function(){
	        this.setState({
	            curYear: this.state.curYear-10,
	            decadeStart: this.state.decadeStart-10,
	            decadeEnd: this.state.decadeEnd-10
	        });
	    },
	    nextDecadeHandler: function(){
	        this.setState({
	            curYear: this.state.curYear+10,
	            decadeStart: this.state.decadeStart+10,
	            decadeEnd: this.state.decadeEnd+10
	        });
	    },
	    renderDecadePanel: function(){
	        return (
	            React.createElement(DecadePanel, {decadeStart: this.state.decadeStart+1, decadeCallBack: this.decadeCallBack})
	        );
	    },
	    _renderDecadePanel: function(){
	        var decadePanelElement = this.renderDecadePanel();

	        if (decadePanelElement === null) {
	            ReactDOM.render(React.createElement("noscript", null), this._decadePanel);
	        } else {
	            ReactDOM.render(decadePanelElement, this._decadePanel);
	        }
	    },
	    _unrenderDecadePanel: function() {
	        /*if (this.layerWillUnmount) {
	         this.layerWillUnmount(this._layer);
	         }*/

	        ReactDOM.unmountComponentAtNode(this._decadePanel);
	    },
	    decadeClickHandler: function(){
	        this._decadePanel = document.createElement('div');
	        this._decadePanel.className = "ucs-calendar-decade-panel";
	        this.props.yearPanel.appendChild(this._decadePanel);

	        this._renderDecadePanel();
	    },
	    decadeCallBack: function(curYear){
	        this.setState({
	            curYear: curYear,
	            decadeStart: curYear-1,
	            decadeEnd: curYear+10
	        });
	        this.props.yearPanel.removeChild(this._decadePanel);
	    },
	    clickHandler: function(e){
	        e.nativeEvent.stopImmediatePropagation();
	    },
	    render: function(){
	        var _this = this;
	        return (
	            React.createElement("div", {onClick: _this.clickHandler}, 
	                React.createElement("div", {className: "ucs-calendar-year-panel-header"}, 
	                    React.createElement("a", {className: "ucs-calendar-year-panel-prev-decade-btn", role: "button", title: "Last decade", onClick: _this.prevDecadeHandler}), 
	                    React.createElement("a", {className: "ucs-calendar-year-panel-decade-select", role: "button", title: "Choose a decade", onClick: _this.decadeClickHandler}, 
	                        React.createElement("span", {className: "ucs-calendar-year-panel-decade-select-content"}, 
	                            (_this.state.decadeStart+1)+"-"+(_this.state.decadeEnd-1)
	                        ), 
	                        React.createElement("span", {className: "ucs-calendar-year-panel-decade-select-arrow"}, "x")
	                    ), 
	                    React.createElement("a", {className: "ucs-calendar-year-panel-next-decade-btn", role: "button", title: "Next decade", onClick: _this.nextDecadeHandler})
	                ), 
	                React.createElement("div", {className: "ucs-calendar-year-panel-body"}, 
	                    React.createElement("table", {className: "ucs-calendar-year-panel-table", cellspacing: "0", role: "grid"}, 
	                        React.createElement("tbody", {className: "ucs-calendar-year-panel-tbody", ref: "ucs-calendar-year-panel-tbody"}

	                        )
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = YearPanel;

/***/ },
/* 36 */
/***/ function(module, exports) {

	/*
	 * Created by Administrator on 2017/2/16.
	 */
	var DecadePanel = React.createClass({displayName: "DecadePanel",
	    getDefaultProps: function(){
	        return {

	        }
	    },
	    getInitialState: function () {
	        var _this = this;
	        var _curDecadeStart = parseInt(_this.props.decadeStart);
	        var num = _curDecadeStart%100;
	        var _decadeArrStart = _curDecadeStart-num-10;
	        var _decadeArrEnd = _curDecadeStart + (100-num);
	        return {
	            curDecadeStart: _curDecadeStart,
	            decadeArrStart: _decadeArrStart,
	            decadeArrEnd: _decadeArrEnd
	        }
	    },
	    componentWillMount: function(){

	    },
	    componentDidMount: function(){
	        this.decadeChangeHandler();
	    },
	    componentDidUpdate: function(){
	        this.decadeChangeHandler();
	    },
	    decadeChangeHandler: function(){
	        var _this = this;
	        _this.refs["ucs-calendar-decade-panel-tbody"].innerHTML = "";
	        for(var i = _this.state.decadeArrStart; i <= _this.state.decadeArrEnd; i=i+30){
	            var tr = document.createElement('tr');
	            tr.setAttribute("role","row");
	            for(var j = 0; j < 3 ; j ++){
	                var dc = i+j*10;
	                var td = document.createElement('td');
	                td.setAttribute("role","gridcell");

	                if(dc == _this.state.decadeArrStart){
	                    td.className = "ucs-calendar-decade-panel-cell ucs-calendar-decade-panel-last-century-cell";
	                    td.onclick = function(e){
	                        if(e&&e.stopPropagation){
	                            //因此它支持W3C的stopPropagation()方法
	                            e.stopPropagation();
	                        }else{
	                            //否则我们使用ie的方法来取消事件冒泡
	                            window.event.cancelBubble = true;
	                        }
	                        _this.prevDecadeHandler();
	                    };
	                }else if(dc == _this.state.decadeArrEnd){
	                    td.className = "ucs-calendar-decade-panel-cell ucs-calendar-decade-panel-next-century-cell";
	                    td.onclick = function(e){
	                        if(e&&e.stopPropagation){
	                            //因此它支持W3C的stopPropagation()方法
	                            e.stopPropagation();
	                        }else{
	                            //否则我们使用ie的方法来取消事件冒泡
	                            window.event.cancelBubble = true;
	                        }
	                        _this.nextDecadeHandler();
	                    };
	                }else{
	                    if(dc == _this.state.curDecadeStart){
	                        td.className = "ucs-calendar-decade-panel-cell ucs-calendar-decade-panel-selected-cell";
	                    }else{
	                        td.className = "ucs-calendar-decade-panel-cell";
	                    }
	                    (function(dc){
	                        td.onclick = function(){
	                            _this.props.decadeCallBack(dc);
	                        };
	                    })(dc);
	                }

	                var a = document.createElement('a');
	                a.className = "ucs-calendar-decade-panel-decade";
	                a.innerHTML = dc+"-"+(dc+9);
	                td.appendChild(a);

	                tr.appendChild(td);
	            }
	            _this.refs["ucs-calendar-decade-panel-tbody"].appendChild(tr);
	        }
	    },
	    prevDecadeHandler: function(){
	        this.setState({
	            curDecadeStart: this.state.curDecadeStart-100,
	            decadeArrStart: this.state.decadeArrStart-100,
	            decadeArrEnd: this.state.decadeArrEnd-100
	        });
	    },
	    nextDecadeHandler: function(){
	        this.setState({
	            curDecadeStart: this.state.curDecadeStart+100,
	            decadeArrStart: this.state.decadeArrStart+100,
	            decadeArrEnd: this.state.decadeArrEnd+100
	        });
	    },
	    clickHandler: function(e){
	        e.nativeEvent.stopImmediatePropagation();
	    },
	    render: function(){
	        var _this = this;
	        return (
	            React.createElement("div", {onClick: _this.clickHandler}, 
	                React.createElement("div", {className: "ucs-calendar-decade-panel-header"}, 
	                    React.createElement("a", {className: "ucs-calendar-decade-panel-prev-century-btn", role: "button", title: "Last century", onClick: _this.prevDecadeHandler}), 
	                    React.createElement("div", {className: "ucs-calendar-decade-panel-century"}, 
	                        (_this.state.decadeArrStart+10)+"-"+(_this.state.decadeArrEnd-1)
	                    ), 
	                    React.createElement("a", {className: "ucs-calendar-decade-panel-next-century-btn", role: "button", title: "Next century", onClick: _this.nextDecadeHandler})
	                ), 
	                React.createElement("div", {className: "ucs-calendar-decade-panel-body"}, 
	                    React.createElement("table", {className: "ucs-calendar-decade-panel-table", cellspacing: "0", role: "grid"}, 
	                        React.createElement("tbody", {className: "ucs-calendar-decade-panel-tbody", ref: "ucs-calendar-decade-panel-tbody"}
	                        )
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = DecadePanel;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	
	var classnames = __webpack_require__(2);
	/**
	 * 文本域组件
	 *
	 * 示例:
	 *
	 *     @example
	 *     <Textarea placeholder="default" id="name" ref="ddd" value="333" onChange={this.onchange}/>
	 */
	var Textarea = React.createClass({displayName: "Textarea",
	    getInitialState: function () {
	        return {
	            value: this.props.value,
	            spanPlaceholder: true,
	            className:classnames('ucs-input ucs-textarea',this.props.className,this.props.disabled ? 'disabled' : '')
	        }
	    },
	    componentWillMount: function () {
	        if (this.props.value) {
	            this.setState({
	                spanPlaceholder: false
	            });
	        }

	    },
	    componentWillReceiveProps:function (nextProps) {
	        if(this.props.value !== nextProps.value) {
	            this.setState({
	                value: nextProps.value,
	                spanPlaceholder: nextProps.value ? false : true
	            });
	        }else {

	        }
	    },
	    /**
	     * Textarea的value改变时执行的事件
	     * @param e
	     *
	     * */
	    onChange: function (e) {
	        this.setState({
	            value: e.target.value,
	            spanPlaceholder: e.target.value ? false : true
	        });
	        this.props.onChange ? this.props.onChange(e) : "";
	    },
	    /**
	     * Textarea获取焦点时执行的事件
	     * @param e
	     *
	     * */
	    onFucus: function (e) {
	        //根据ie10的标准，获得焦点时提示是会消失的，因此失去焦点也要相应的处理
	        this.setState({
	            spanPlaceholder: false
	        });
	        this.props.onFocus ? this.props.onFocus(e) : "";
	    },
	    /**
	     * Textarea失去焦点时执行的事件
	     * @param e
	     *
	     * */
	    onBlur: function (e) {
	        this.setState({
	            spanPlaceholder: e.target.value ? false : true
	        });
	        this.props.onBlur ? this.props.onBlur(e) : "";
	    },
	    _handlePlaceholderClick: function () {

	        //让文字框获得焦点
	        // this.refs.inputtext.focus();
	        // this.focus();
	    },
	    /**
	     * 设置Textarea的value
	     * @param {string} v
	     * Checkbox的value
	     *
	     * */
	    setValue: function (v) {
	        this.setState({value: v});
	    },
	    /**
	     * 获取Textarea的值
	     * @return {string}
	     * */
	    getValue: function () {
	        return this.state.value
	    },
	    render: function () {

	        //value值不为空时，隐藏提示
	        var spanPlaceholder = {
	            display: this.state.spanPlaceholder ? "block" : "none"
	        };
	        var placeholder = "";
	        //这里先是判断浏览器的支持，
	        if (this.props.placeholder && !('placeholder' in document.createElement('textarea'))) {
	            placeholder = (React.createElement("span", {className: "ucs-placeholder", style: spanPlaceholder, 
	                                 onClick: this._handlePlaceholderClick}, this.props.placeholder));
	        }
	        return (
	            React.createElement("div", {className: "ucs-textarea-control"}, 
	                React.createElement("textarea", React.__spread({},   this.props, 
	                           {value: this.state.value, 
	                           className: this.state.className, 
	                           ref: "textarea", onChange: this.onChange, onFocus: this.onFucus})), 
	                placeholder
	            )

	        )
	    }
	});
	module.exports = Textarea;

/***/ },
/* 38 */
/***/ function(module, exports) {

	 /**
	  *
	  * 自动补全
	  *
	  * @param [className] class名
	  *
	  * @param [placeholder] 提示文字
	  *
	  * @param [value] 文本值
	  *
	  * @constructs
	  * @author huangdebin
	  * Autocomplete
	  *
	  * 示例:
	  *
	  *     @example
	  *     <Autocomplete ref="autocomplete1" value="" onChange={this.handleChange} onSelect={this.handleSelect} classNames={classNames} placeholder="请输入" />
	  */
	var Autocomplete = React.createClass({displayName: "Autocomplete",
	    getDefaultProps:function(){
	        return {
	            value: '',
	            placeholder: '',
	            classNames: {}
	        }
	    },
	    getInitialState:function(){
	        return {
	            value: this.props.value,
	            autocompleteItems: [],
	            itemsActiveIndex:'-1'
	        }
	    },
	     /**
	      * 设置value
	      * @param {string} value
	      *
	      * */
	    setValue: function(value){
	        this.setState({
	            value: value
	        });
	    },
	     /**
	      * 获取值
	      * @return {string}
	      * */
	    getValue: function(){
	        return this.state.value;
	    },
	     /**
	      * value改变时执行的事件
	      * @param event
	      *
	      * */
	    handleInputChange:function(event) {
	        var rootThis = this;
	        var value = event.target.value;
	        if (!value) {
	            this.clearAutocomplete();
	        }
	        this.setState({
	            value: value
	        })
	        this.props.onChange && this.props.onChange(value,function(items){
	            rootThis.setState({
	                autocompleteItems: items
	            });
	        })
	    },
	    //确认选择
	    handleInputSelect:function(value) {
	        this.setState({
	            value: value
	        }, function(){
	            this.props.onSelect && this.props.onSelect(value);
	            this.clearAutocomplete();
	        });

	    },
	     /**
	      * 输入框focus触发的事件
	      * @param event
	      *
	      * */
	    handleInputFocus:function(event) {
	        this.handleInputChange(event);
	    },
	     /**
	      * 输入框blur触发的事件
	      * @param event
	      *
	      * */
	    handleInputBlur:function(event) {
	        setTimeout(function(){
	            this.clearAutocomplete();
	        }.bind(this),200);
	    },
	     /**
	      * 键盘点击触发的事件
	      * @param event
	      *
	      * */
	    handleInputKeyDown:function(event) {
	        var ARROW_UP = 38;
	        var ARROW_DOWN = 40;
	        var ENTER_KEY = 13;
	        var ESC_KEY = 27;
	        switch (event.keyCode) {
	            case ENTER_KEY:
	                event.preventDefault();
	                this.handleEnterKey();
	                break;
	            case ARROW_DOWN:
	                event.preventDefault();
	                this.handleDownKey();
	                break;
	            case ARROW_UP:
	                event.preventDefault();
	                this.handleUpKey();
	                break;
	            case ESC_KEY:
	                this.clearAutocomplete();
	                break;
	        }
	    },
	    //向上键
	    handleUpKey:function(){
	        if(this.refs.refAutocompleteItems === undefined) return;
	        var activeItem = this.getActiveItem();
	        var prevIndex;
	        if (activeItem === undefined) {
	            prevIndex = this.state.autocompleteItems.length - 1;
	        } else {
	            if(activeItem.activeItemIndex == 0){
	                prevIndex = this.state.autocompleteItems.length - 1;
	            }else{
	                prevIndex = (activeItem.activeItemIndex - 1) % this.state.autocompleteItems.length;
	            }
	        }
	        this.selectActiveItemAtIndex(prevIndex);
	    },
	    //向下键
	    handleDownKey:function(){
	        if(this.refs.refAutocompleteItems === undefined) return;
	        var activeItem = this.getActiveItem();
	        if (activeItem === undefined) {
	            this.selectActiveItemAtIndex(0);
	        } else {
	            var nextIndex = (activeItem.activeItemIndex + 1) % this.state.autocompleteItems.length;
	            this.selectActiveItemAtIndex(nextIndex);
	        }
	    },
	    //enter键
	    handleEnterKey:function() {
	        var activeItem = this.getActiveItem();
	        this.clearAutocomplete();
	        if (activeItem !== undefined) {
	            var text;
	            if(this.refs.refAutocompleteItems !== undefined) {
	                var itemsArr = this.refs.refAutocompleteItems.getElementsByTagName('a');
	                for(var i = 0; i < itemsArr.length; i++){
	                    if(activeItem.activeItemIndex == i){
	                        text = itemsArr[i].innerHTML;
	                    }
	                }
	            }
	            this.handleInputSelect(text);
	        }
	    },
	    //获取当前active的索引
	    getActiveItem:function() {
	        if(this.refs.refAutocompleteItems !== undefined){
	            var a = this.state.itemsActiveIndex;
	        }
	        if(a === '-1'){
	            return undefined;
	        }else{
	            return {
	                activeItemIndex: a
	            }
	        }
	    },
	    //改变当前active的索引
	    selectActiveItemAtIndex:function(index){
	        if(this.refs.refAutocompleteItems !== undefined) {
	            var itemsArr = this.refs.refAutocompleteItems.getElementsByTagName('a');
	        }
	        for(var i = 0; i < itemsArr.length; i++){
	            if(index == i){
	                itemsArr[i].setAttribute('class', 'active');
	                this.setState({
	                    itemsActiveIndex: index
	                });
	            }
	        }
	    },
	    //隐藏下拉项
	    clearAutocomplete:function() {
	        this.setState({ autocompleteItems: [] });
	    },
	    renderInput:function() {
	        var classNames = this.props.classNames;
	        var placeholder = this.props.placeholder;
	        var value = this.state.value;
	        return (
	            React.createElement("div", {className: "ucs-autocomplete-input-wrap"}, 
	                React.createElement("input", {
	                    type: "text", 
	                    placeholder: placeholder, 
	                    className: 'ucs-autocomplete-input' + ( classNames.input ? (' '+ classNames.input) : ''), 
	                    value: value, 
	                    onChange: this.handleInputChange, 
	                    onKeyDown: this.handleInputKeyDown, 
	                    onFocus: this.handleInputFocus, 
	                    onBlur: this.handleInputBlur}
	                )
	            )
	        )
	    },
	    renderAutocomplete:function() {
	        var rootThis = this;
	        var addActiveClass = function(t, e, idx){
	            rootThis.setState({
	                itemsActiveIndex: idx
	            });
	        }
	        var removeActiveClass = function(e, idx){
	            rootThis.setState({
	                itemsActiveIndex: idx
	            });
	        }
	        var autocompleteItems = this.state.autocompleteItems;
	        if (autocompleteItems.length === 0) { return null }
	        return (
	            React.createElement("div", {
	                ref: "refAutocompleteItems", 
	                className: 'ucs-autocomplete-items-wrap' + ( this.props.classNames.autocompleteContainer ? (' '+ this.props.classNames.autocompleteContainer) : '')}, 

	                React.createElement("ul", null, 
	                    autocompleteItems.map(function(p, idx) {
	                        return (
	                            React.createElement("li", null, 
	                                React.createElement("a", {href: "javascript:;", 
	                                   className: rootThis.state.itemsActiveIndex == idx ? 'active' : '', 
	                                   onClick: rootThis.handleInputSelect.bind(this, p), 
	                                   onMouseEnter: addActiveClass.bind(this, this, event, idx), 
	                                   onMouseLeave: removeActiveClass.bind(this, event, idx)
	                                }, p)
	                            )
	                        )
	                    })
	                )
	            )
	        )
	    },
	    render:function() {
	        var classNames = this.props.classNames;
	        return (
	            React.createElement("div", {
	                className: 'ucs-autocomplete' +  ( classNames.root ? (' '+ classNames.root) : '')}, 
	                this.renderInput(), 
	                this.renderAutocomplete()
	            )
	        )
	    }
	})

	module.exports = Autocomplete;




/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var classnames = __webpack_require__(2);
	var Address = [
	    {
	        "value": "北京市",
	        "code": "110000",
	        "children": [
	            {
	                "value": "市辖区",
	                "code": "110100",
	                "children": [
	                    {
	                        "value": "东城区",
	                        "code": "110101"
	                    },
	                    {
	                        "value": "西城区",
	                        "code": "110102"
	                    },
	                    {
	                        "value": "朝阳区",
	                        "code": "110105"
	                    },
	                    {
	                        "value": "丰台区",
	                        "code": "110106"
	                    },
	                    {
	                        "value": "石景山区",
	                        "code": "110107"
	                    },
	                    {
	                        "value": "海淀区",
	                        "code": "110108"
	                    },
	                    {
	                        "value": "门头沟区",
	                        "code": "110109"
	                    },
	                    {
	                        "value": "房山区",
	                        "code": "110111"
	                    },
	                    {
	                        "value": "通州区",
	                        "code": "110112"
	                    },
	                    {
	                        "value": "顺义区",
	                        "code": "110113"
	                    },
	                    {
	                        "value": "昌平区",
	                        "code": "110114"
	                    },
	                    {
	                        "value": "大兴区",
	                        "code": "110115"
	                    },
	                    {
	                        "value": "怀柔区",
	                        "code": "110116"
	                    },
	                    {
	                        "value": "平谷区",
	                        "code": "110117"
	                    },
	                    {
	                        "value": "密云区",
	                        "code": "110118"
	                    },
	                    {
	                        "value": "延庆区",
	                        "code": "110119"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "天津市",
	        "code": "120000",
	        "children": [
	            {
	                "value": "市辖区",
	                "code": "120100",
	                "children": [
	                    {
	                        "value": "和平区",
	                        "code": "120101"
	                    },
	                    {
	                        "value": "河东区",
	                        "code": "120102"
	                    },
	                    {
	                        "value": "河西区",
	                        "code": "120103"
	                    },
	                    {
	                        "value": "南开区",
	                        "code": "120104"
	                    },
	                    {
	                        "value": "河北区",
	                        "code": "120105"
	                    },
	                    {
	                        "value": "红桥区",
	                        "code": "120106"
	                    },
	                    {
	                        "value": "东丽区",
	                        "code": "120110"
	                    },
	                    {
	                        "value": "西青区",
	                        "code": "120111"
	                    },
	                    {
	                        "value": "津南区",
	                        "code": "120112"
	                    },
	                    {
	                        "value": "北辰区",
	                        "code": "120113"
	                    },
	                    {
	                        "value": "武清区",
	                        "code": "120114"
	                    },
	                    {
	                        "value": "宝坻区",
	                        "code": "120115"
	                    },
	                    {
	                        "value": "滨海新区",
	                        "code": "120116"
	                    },
	                    {
	                        "value": "宁河区",
	                        "code": "120117"
	                    },
	                    {
	                        "value": "静海区",
	                        "code": "120118"
	                    },
	                    {
	                        "value": "蓟州区",
	                        "code": "120119"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "河北省",
	        "code": "130000",
	        "children": [
	            {
	                "value": "石家庄市",
	                "code": "130100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "130101"
	                    },
	                    {
	                        "value": "长安区",
	                        "code": "130102"
	                    },
	                    {
	                        "value": "桥西区",
	                        "code": "130104"
	                    },
	                    {
	                        "value": "新华区",
	                        "code": "130105"
	                    },
	                    {
	                        "value": "井陉矿区",
	                        "code": "130107"
	                    },
	                    {
	                        "value": "裕华区",
	                        "code": "130108"
	                    },
	                    {
	                        "value": "藁城区",
	                        "code": "130109"
	                    },
	                    {
	                        "value": "鹿泉区",
	                        "code": "130110"
	                    },
	                    {
	                        "value": "栾城区",
	                        "code": "130111"
	                    },
	                    {
	                        "value": "井陉县",
	                        "code": "130121"
	                    },
	                    {
	                        "value": "正定县",
	                        "code": "130123"
	                    },
	                    {
	                        "value": "行唐县",
	                        "code": "130125"
	                    },
	                    {
	                        "value": "灵寿县",
	                        "code": "130126"
	                    },
	                    {
	                        "value": "高邑县",
	                        "code": "130127"
	                    },
	                    {
	                        "value": "深泽县",
	                        "code": "130128"
	                    },
	                    {
	                        "value": "赞皇县",
	                        "code": "130129"
	                    },
	                    {
	                        "value": "无极县",
	                        "code": "130130"
	                    },
	                    {
	                        "value": "平山县",
	                        "code": "130131"
	                    },
	                    {
	                        "value": "元氏县",
	                        "code": "130132"
	                    },
	                    {
	                        "value": "赵县",
	                        "code": "130133"
	                    },
	                    {
	                        "value": "晋州市",
	                        "code": "130183"
	                    },
	                    {
	                        "value": "新乐市",
	                        "code": "130184"
	                    }
	                ]
	            },
	            {
	                "value": "唐山市",
	                "code": "130200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "130201"
	                    },
	                    {
	                        "value": "路南区",
	                        "code": "130202"
	                    },
	                    {
	                        "value": "路北区",
	                        "code": "130203"
	                    },
	                    {
	                        "value": "古冶区",
	                        "code": "130204"
	                    },
	                    {
	                        "value": "开平区",
	                        "code": "130205"
	                    },
	                    {
	                        "value": "丰南区",
	                        "code": "130207"
	                    },
	                    {
	                        "value": "丰润区",
	                        "code": "130208"
	                    },
	                    {
	                        "value": "曹妃甸区",
	                        "code": "130209"
	                    },
	                    {
	                        "value": "滦县",
	                        "code": "130223"
	                    },
	                    {
	                        "value": "滦南县",
	                        "code": "130224"
	                    },
	                    {
	                        "value": "乐亭县",
	                        "code": "130225"
	                    },
	                    {
	                        "value": "迁西县",
	                        "code": "130227"
	                    },
	                    {
	                        "value": "玉田县",
	                        "code": "130229"
	                    },
	                    {
	                        "value": "遵化市",
	                        "code": "130281"
	                    },
	                    {
	                        "value": "迁安市",
	                        "code": "130283"
	                    }
	                ]
	            },
	            {
	                "value": "秦皇岛市",
	                "code": "130300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "130301"
	                    },
	                    {
	                        "value": "海港区",
	                        "code": "130302"
	                    },
	                    {
	                        "value": "山海关区",
	                        "code": "130303"
	                    },
	                    {
	                        "value": "北戴河区",
	                        "code": "130304"
	                    },
	                    {
	                        "value": "抚宁区",
	                        "code": "130306"
	                    },
	                    {
	                        "value": "青龙满族自治县",
	                        "code": "130321"
	                    },
	                    {
	                        "value": "昌黎县",
	                        "code": "130322"
	                    },
	                    {
	                        "value": "卢龙县",
	                        "code": "130324"
	                    }
	                ]
	            },
	            {
	                "value": "邯郸市",
	                "code": "130400",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "130401"
	                    },
	                    {
	                        "value": "邯山区",
	                        "code": "130402"
	                    },
	                    {
	                        "value": "丛台区",
	                        "code": "130403"
	                    },
	                    {
	                        "value": "复兴区",
	                        "code": "130404"
	                    },
	                    {
	                        "value": "峰峰矿区",
	                        "code": "130406"
	                    },
	                    {
	                        "value": "邯郸县",
	                        "code": "130421"
	                    },
	                    {
	                        "value": "临漳县",
	                        "code": "130423"
	                    },
	                    {
	                        "value": "成安县",
	                        "code": "130424"
	                    },
	                    {
	                        "value": "大名县",
	                        "code": "130425"
	                    },
	                    {
	                        "value": "涉县",
	                        "code": "130426"
	                    },
	                    {
	                        "value": "磁县",
	                        "code": "130427"
	                    },
	                    {
	                        "value": "肥乡县",
	                        "code": "130428"
	                    },
	                    {
	                        "value": "永年县",
	                        "code": "130429"
	                    },
	                    {
	                        "value": "邱县",
	                        "code": "130430"
	                    },
	                    {
	                        "value": "鸡泽县",
	                        "code": "130431"
	                    },
	                    {
	                        "value": "广平县",
	                        "code": "130432"
	                    },
	                    {
	                        "value": "馆陶县",
	                        "code": "130433"
	                    },
	                    {
	                        "value": "魏县",
	                        "code": "130434"
	                    },
	                    {
	                        "value": "曲周县",
	                        "code": "130435"
	                    },
	                    {
	                        "value": "武安市",
	                        "code": "130481"
	                    }
	                ]
	            },
	            {
	                "value": "邢台市",
	                "code": "130500",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "130501"
	                    },
	                    {
	                        "value": "桥东区",
	                        "code": "130502"
	                    },
	                    {
	                        "value": "桥西区",
	                        "code": "130503"
	                    },
	                    {
	                        "value": "邢台县",
	                        "code": "130521"
	                    },
	                    {
	                        "value": "临城县",
	                        "code": "130522"
	                    },
	                    {
	                        "value": "内丘县",
	                        "code": "130523"
	                    },
	                    {
	                        "value": "柏乡县",
	                        "code": "130524"
	                    },
	                    {
	                        "value": "隆尧县",
	                        "code": "130525"
	                    },
	                    {
	                        "value": "任县",
	                        "code": "130526"
	                    },
	                    {
	                        "value": "南和县",
	                        "code": "130527"
	                    },
	                    {
	                        "value": "宁晋县",
	                        "code": "130528"
	                    },
	                    {
	                        "value": "巨鹿县",
	                        "code": "130529"
	                    },
	                    {
	                        "value": "新河县",
	                        "code": "130530"
	                    },
	                    {
	                        "value": "广宗县",
	                        "code": "130531"
	                    },
	                    {
	                        "value": "平乡县",
	                        "code": "130532"
	                    },
	                    {
	                        "value": "威县",
	                        "code": "130533"
	                    },
	                    {
	                        "value": "清河县",
	                        "code": "130534"
	                    },
	                    {
	                        "value": "临西县",
	                        "code": "130535"
	                    },
	                    {
	                        "value": "南宫市",
	                        "code": "130581"
	                    },
	                    {
	                        "value": "沙河市",
	                        "code": "130582"
	                    }
	                ]
	            },
	            {
	                "value": "保定市",
	                "code": "130600",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "130601"
	                    },
	                    {
	                        "value": "竞秀区",
	                        "code": "130602"
	                    },
	                    {
	                        "value": "莲池区",
	                        "code": "130606"
	                    },
	                    {
	                        "value": "满城区",
	                        "code": "130607"
	                    },
	                    {
	                        "value": "清苑区",
	                        "code": "130608"
	                    },
	                    {
	                        "value": "徐水区",
	                        "code": "130609"
	                    },
	                    {
	                        "value": "涞水县",
	                        "code": "130623"
	                    },
	                    {
	                        "value": "阜平县",
	                        "code": "130624"
	                    },
	                    {
	                        "value": "定兴县",
	                        "code": "130626"
	                    },
	                    {
	                        "value": "唐县",
	                        "code": "130627"
	                    },
	                    {
	                        "value": "高阳县",
	                        "code": "130628"
	                    },
	                    {
	                        "value": "容城县",
	                        "code": "130629"
	                    },
	                    {
	                        "value": "涞源县",
	                        "code": "130630"
	                    },
	                    {
	                        "value": "望都县",
	                        "code": "130631"
	                    },
	                    {
	                        "value": "安新县",
	                        "code": "130632"
	                    },
	                    {
	                        "value": "易县",
	                        "code": "130633"
	                    },
	                    {
	                        "value": "曲阳县",
	                        "code": "130634"
	                    },
	                    {
	                        "value": "蠡县",
	                        "code": "130635"
	                    },
	                    {
	                        "value": "顺平县",
	                        "code": "130636"
	                    },
	                    {
	                        "value": "博野县",
	                        "code": "130637"
	                    },
	                    {
	                        "value": "雄县",
	                        "code": "130638"
	                    },
	                    {
	                        "value": "涿州市",
	                        "code": "130681"
	                    },
	                    {
	                        "value": "安国市",
	                        "code": "130683"
	                    },
	                    {
	                        "value": "高碑店市",
	                        "code": "130684"
	                    }
	                ]
	            },
	            {
	                "value": "张家口市",
	                "code": "130700",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "130701"
	                    },
	                    {
	                        "value": "桥东区",
	                        "code": "130702"
	                    },
	                    {
	                        "value": "桥西区",
	                        "code": "130703"
	                    },
	                    {
	                        "value": "宣化区",
	                        "code": "130705"
	                    },
	                    {
	                        "value": "下花园区",
	                        "code": "130706"
	                    },
	                    {
	                        "value": "万全区",
	                        "code": "130708"
	                    },
	                    {
	                        "value": "崇礼区",
	                        "code": "130709"
	                    },
	                    {
	                        "value": "张北县",
	                        "code": "130722"
	                    },
	                    {
	                        "value": "康保县",
	                        "code": "130723"
	                    },
	                    {
	                        "value": "沽源县",
	                        "code": "130724"
	                    },
	                    {
	                        "value": "尚义县",
	                        "code": "130725"
	                    },
	                    {
	                        "value": "蔚县",
	                        "code": "130726"
	                    },
	                    {
	                        "value": "阳原县",
	                        "code": "130727"
	                    },
	                    {
	                        "value": "怀安县",
	                        "code": "130728"
	                    },
	                    {
	                        "value": "怀来县",
	                        "code": "130730"
	                    },
	                    {
	                        "value": "涿鹿县",
	                        "code": "130731"
	                    },
	                    {
	                        "value": "赤城县",
	                        "code": "130732"
	                    }
	                ]
	            },
	            {
	                "value": "承德市",
	                "code": "130800",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "130801"
	                    },
	                    {
	                        "value": "双桥区",
	                        "code": "130802"
	                    },
	                    {
	                        "value": "双滦区",
	                        "code": "130803"
	                    },
	                    {
	                        "value": "鹰手营子矿区",
	                        "code": "130804"
	                    },
	                    {
	                        "value": "承德县",
	                        "code": "130821"
	                    },
	                    {
	                        "value": "兴隆县",
	                        "code": "130822"
	                    },
	                    {
	                        "value": "平泉县",
	                        "code": "130823"
	                    },
	                    {
	                        "value": "滦平县",
	                        "code": "130824"
	                    },
	                    {
	                        "value": "隆化县",
	                        "code": "130825"
	                    },
	                    {
	                        "value": "丰宁满族自治县",
	                        "code": "130826"
	                    },
	                    {
	                        "value": "宽城满族自治县",
	                        "code": "130827"
	                    },
	                    {
	                        "value": "围场满族蒙古族自治县",
	                        "code": "130828"
	                    }
	                ]
	            },
	            {
	                "value": "沧州市",
	                "code": "130900",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "130901"
	                    },
	                    {
	                        "value": "新华区",
	                        "code": "130902"
	                    },
	                    {
	                        "value": "运河区",
	                        "code": "130903"
	                    },
	                    {
	                        "value": "沧县",
	                        "code": "130921"
	                    },
	                    {
	                        "value": "青县",
	                        "code": "130922"
	                    },
	                    {
	                        "value": "东光县",
	                        "code": "130923"
	                    },
	                    {
	                        "value": "海兴县",
	                        "code": "130924"
	                    },
	                    {
	                        "value": "盐山县",
	                        "code": "130925"
	                    },
	                    {
	                        "value": "肃宁县",
	                        "code": "130926"
	                    },
	                    {
	                        "value": "南皮县",
	                        "code": "130927"
	                    },
	                    {
	                        "value": "吴桥县",
	                        "code": "130928"
	                    },
	                    {
	                        "value": "献县",
	                        "code": "130929"
	                    },
	                    {
	                        "value": "孟村回族自治县",
	                        "code": "130930"
	                    },
	                    {
	                        "value": "泊头市",
	                        "code": "130981"
	                    },
	                    {
	                        "value": "任丘市",
	                        "code": "130982"
	                    },
	                    {
	                        "value": "黄骅市",
	                        "code": "130983"
	                    },
	                    {
	                        "value": "河间市",
	                        "code": "130984"
	                    }
	                ]
	            },
	            {
	                "value": "廊坊市",
	                "code": "131000",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "131001"
	                    },
	                    {
	                        "value": "安次区",
	                        "code": "131002"
	                    },
	                    {
	                        "value": "广阳区",
	                        "code": "131003"
	                    },
	                    {
	                        "value": "固安县",
	                        "code": "131022"
	                    },
	                    {
	                        "value": "永清县",
	                        "code": "131023"
	                    },
	                    {
	                        "value": "香河县",
	                        "code": "131024"
	                    },
	                    {
	                        "value": "大城县",
	                        "code": "131025"
	                    },
	                    {
	                        "value": "文安县",
	                        "code": "131026"
	                    },
	                    {
	                        "value": "大厂回族自治县",
	                        "code": "131028"
	                    },
	                    {
	                        "value": "霸州市",
	                        "code": "131081"
	                    },
	                    {
	                        "value": "三河市",
	                        "code": "131082"
	                    }
	                ]
	            },
	            {
	                "value": "衡水市",
	                "code": "131100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "131101"
	                    },
	                    {
	                        "value": "桃城区",
	                        "code": "131102"
	                    },
	                    {
	                        "value": "冀州区",
	                        "code": "131103"
	                    },
	                    {
	                        "value": "枣强县",
	                        "code": "131121"
	                    },
	                    {
	                        "value": "武邑县",
	                        "code": "131122"
	                    },
	                    {
	                        "value": "武强县",
	                        "code": "131123"
	                    },
	                    {
	                        "value": "饶阳县",
	                        "code": "131124"
	                    },
	                    {
	                        "value": "安平县",
	                        "code": "131125"
	                    },
	                    {
	                        "value": "故城县",
	                        "code": "131126"
	                    },
	                    {
	                        "value": "景县",
	                        "code": "131127"
	                    },
	                    {
	                        "value": "阜城县",
	                        "code": "131128"
	                    },
	                    {
	                        "value": "深州市",
	                        "code": "131182"
	                    }
	                ]
	            },
	            {
	                "value": "省直辖县级行政区划",
	                "code": "139000",
	                "children": [
	                    {
	                        "value": "定州市",
	                        "code": "139001"
	                    },
	                    {
	                        "value": "辛集市",
	                        "code": "139002"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "山西省",
	        "code": "140000",
	        "children": [
	            {
	                "value": "太原市",
	                "code": "140100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "140101"
	                    },
	                    {
	                        "value": "小店区",
	                        "code": "140105"
	                    },
	                    {
	                        "value": "迎泽区",
	                        "code": "140106"
	                    },
	                    {
	                        "value": "杏花岭区",
	                        "code": "140107"
	                    },
	                    {
	                        "value": "尖草坪区",
	                        "code": "140108"
	                    },
	                    {
	                        "value": "万柏林区",
	                        "code": "140109"
	                    },
	                    {
	                        "value": "晋源区",
	                        "code": "140110"
	                    },
	                    {
	                        "value": "清徐县",
	                        "code": "140121"
	                    },
	                    {
	                        "value": "阳曲县",
	                        "code": "140122"
	                    },
	                    {
	                        "value": "娄烦县",
	                        "code": "140123"
	                    },
	                    {
	                        "value": "古交市",
	                        "code": "140181"
	                    }
	                ]
	            },
	            {
	                "value": "大同市",
	                "code": "140200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "140201"
	                    },
	                    {
	                        "value": "城区",
	                        "code": "140202"
	                    },
	                    {
	                        "value": "矿区",
	                        "code": "140203"
	                    },
	                    {
	                        "value": "南郊区",
	                        "code": "140211"
	                    },
	                    {
	                        "value": "新荣区",
	                        "code": "140212"
	                    },
	                    {
	                        "value": "阳高县",
	                        "code": "140221"
	                    },
	                    {
	                        "value": "天镇县",
	                        "code": "140222"
	                    },
	                    {
	                        "value": "广灵县",
	                        "code": "140223"
	                    },
	                    {
	                        "value": "灵丘县",
	                        "code": "140224"
	                    },
	                    {
	                        "value": "浑源县",
	                        "code": "140225"
	                    },
	                    {
	                        "value": "左云县",
	                        "code": "140226"
	                    },
	                    {
	                        "value": "大同县",
	                        "code": "140227"
	                    }
	                ]
	            },
	            {
	                "value": "阳泉市",
	                "code": "140300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "140301"
	                    },
	                    {
	                        "value": "城区",
	                        "code": "140302"
	                    },
	                    {
	                        "value": "矿区",
	                        "code": "140303"
	                    },
	                    {
	                        "value": "郊区",
	                        "code": "140311"
	                    },
	                    {
	                        "value": "平定县",
	                        "code": "140321"
	                    },
	                    {
	                        "value": "盂县",
	                        "code": "140322"
	                    }
	                ]
	            },
	            {
	                "value": "长治市",
	                "code": "140400",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "140401"
	                    },
	                    {
	                        "value": "城区",
	                        "code": "140402"
	                    },
	                    {
	                        "value": "郊区",
	                        "code": "140411"
	                    },
	                    {
	                        "value": "长治县",
	                        "code": "140421"
	                    },
	                    {
	                        "value": "襄垣县",
	                        "code": "140423"
	                    },
	                    {
	                        "value": "屯留县",
	                        "code": "140424"
	                    },
	                    {
	                        "value": "平顺县",
	                        "code": "140425"
	                    },
	                    {
	                        "value": "黎城县",
	                        "code": "140426"
	                    },
	                    {
	                        "value": "壶关县",
	                        "code": "140427"
	                    },
	                    {
	                        "value": "长子县",
	                        "code": "140428"
	                    },
	                    {
	                        "value": "武乡县",
	                        "code": "140429"
	                    },
	                    {
	                        "value": "沁县",
	                        "code": "140430"
	                    },
	                    {
	                        "value": "沁源县",
	                        "code": "140431"
	                    },
	                    {
	                        "value": "潞城市",
	                        "code": "140481"
	                    }
	                ]
	            },
	            {
	                "value": "晋城市",
	                "code": "140500",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "140501"
	                    },
	                    {
	                        "value": "城区",
	                        "code": "140502"
	                    },
	                    {
	                        "value": "沁水县",
	                        "code": "140521"
	                    },
	                    {
	                        "value": "阳城县",
	                        "code": "140522"
	                    },
	                    {
	                        "value": "陵川县",
	                        "code": "140524"
	                    },
	                    {
	                        "value": "泽州县",
	                        "code": "140525"
	                    },
	                    {
	                        "value": "高平市",
	                        "code": "140581"
	                    }
	                ]
	            },
	            {
	                "value": "朔州市",
	                "code": "140600",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "140601"
	                    },
	                    {
	                        "value": "朔城区",
	                        "code": "140602"
	                    },
	                    {
	                        "value": "平鲁区",
	                        "code": "140603"
	                    },
	                    {
	                        "value": "山阴县",
	                        "code": "140621"
	                    },
	                    {
	                        "value": "应县",
	                        "code": "140622"
	                    },
	                    {
	                        "value": "右玉县",
	                        "code": "140623"
	                    },
	                    {
	                        "value": "怀仁县",
	                        "code": "140624"
	                    }
	                ]
	            },
	            {
	                "value": "晋中市",
	                "code": "140700",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "140701"
	                    },
	                    {
	                        "value": "榆次区",
	                        "code": "140702"
	                    },
	                    {
	                        "value": "榆社县",
	                        "code": "140721"
	                    },
	                    {
	                        "value": "左权县",
	                        "code": "140722"
	                    },
	                    {
	                        "value": "和顺县",
	                        "code": "140723"
	                    },
	                    {
	                        "value": "昔阳县",
	                        "code": "140724"
	                    },
	                    {
	                        "value": "寿阳县",
	                        "code": "140725"
	                    },
	                    {
	                        "value": "太谷县",
	                        "code": "140726"
	                    },
	                    {
	                        "value": "祁县",
	                        "code": "140727"
	                    },
	                    {
	                        "value": "平遥县",
	                        "code": "140728"
	                    },
	                    {
	                        "value": "灵石县",
	                        "code": "140729"
	                    },
	                    {
	                        "value": "介休市",
	                        "code": "140781"
	                    }
	                ]
	            },
	            {
	                "value": "运城市",
	                "code": "140800",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "140801"
	                    },
	                    {
	                        "value": "盐湖区",
	                        "code": "140802"
	                    },
	                    {
	                        "value": "临猗县",
	                        "code": "140821"
	                    },
	                    {
	                        "value": "万荣县",
	                        "code": "140822"
	                    },
	                    {
	                        "value": "闻喜县",
	                        "code": "140823"
	                    },
	                    {
	                        "value": "稷山县",
	                        "code": "140824"
	                    },
	                    {
	                        "value": "新绛县",
	                        "code": "140825"
	                    },
	                    {
	                        "value": "绛县",
	                        "code": "140826"
	                    },
	                    {
	                        "value": "垣曲县",
	                        "code": "140827"
	                    },
	                    {
	                        "value": "夏县",
	                        "code": "140828"
	                    },
	                    {
	                        "value": "平陆县",
	                        "code": "140829"
	                    },
	                    {
	                        "value": "芮城县",
	                        "code": "140830"
	                    },
	                    {
	                        "value": "永济市",
	                        "code": "140881"
	                    },
	                    {
	                        "value": "河津市",
	                        "code": "140882"
	                    }
	                ]
	            },
	            {
	                "value": "忻州市",
	                "code": "140900",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "140901"
	                    },
	                    {
	                        "value": "忻府区",
	                        "code": "140902"
	                    },
	                    {
	                        "value": "定襄县",
	                        "code": "140921"
	                    },
	                    {
	                        "value": "五台县",
	                        "code": "140922"
	                    },
	                    {
	                        "value": "代县",
	                        "code": "140923"
	                    },
	                    {
	                        "value": "繁峙县",
	                        "code": "140924"
	                    },
	                    {
	                        "value": "宁武县",
	                        "code": "140925"
	                    },
	                    {
	                        "value": "静乐县",
	                        "code": "140926"
	                    },
	                    {
	                        "value": "神池县",
	                        "code": "140927"
	                    },
	                    {
	                        "value": "五寨县",
	                        "code": "140928"
	                    },
	                    {
	                        "value": "岢岚县",
	                        "code": "140929"
	                    },
	                    {
	                        "value": "河曲县",
	                        "code": "140930"
	                    },
	                    {
	                        "value": "保德县",
	                        "code": "140931"
	                    },
	                    {
	                        "value": "偏关县",
	                        "code": "140932"
	                    },
	                    {
	                        "value": "原平市",
	                        "code": "140981"
	                    }
	                ]
	            },
	            {
	                "value": "临汾市",
	                "code": "141000",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "141001"
	                    },
	                    {
	                        "value": "尧都区",
	                        "code": "141002"
	                    },
	                    {
	                        "value": "曲沃县",
	                        "code": "141021"
	                    },
	                    {
	                        "value": "翼城县",
	                        "code": "141022"
	                    },
	                    {
	                        "value": "襄汾县",
	                        "code": "141023"
	                    },
	                    {
	                        "value": "洪洞县",
	                        "code": "141024"
	                    },
	                    {
	                        "value": "古县",
	                        "code": "141025"
	                    },
	                    {
	                        "value": "安泽县",
	                        "code": "141026"
	                    },
	                    {
	                        "value": "浮山县",
	                        "code": "141027"
	                    },
	                    {
	                        "value": "吉县",
	                        "code": "141028"
	                    },
	                    {
	                        "value": "乡宁县",
	                        "code": "141029"
	                    },
	                    {
	                        "value": "大宁县",
	                        "code": "141030"
	                    },
	                    {
	                        "value": "隰县",
	                        "code": "141031"
	                    },
	                    {
	                        "value": "永和县",
	                        "code": "141032"
	                    },
	                    {
	                        "value": "蒲县",
	                        "code": "141033"
	                    },
	                    {
	                        "value": "汾西县",
	                        "code": "141034"
	                    },
	                    {
	                        "value": "侯马市",
	                        "code": "141081"
	                    },
	                    {
	                        "value": "霍州市",
	                        "code": "141082"
	                    }
	                ]
	            },
	            {
	                "value": "吕梁市",
	                "code": "141100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "141101"
	                    },
	                    {
	                        "value": "离石区",
	                        "code": "141102"
	                    },
	                    {
	                        "value": "文水县",
	                        "code": "141121"
	                    },
	                    {
	                        "value": "交城县",
	                        "code": "141122"
	                    },
	                    {
	                        "value": "兴县",
	                        "code": "141123"
	                    },
	                    {
	                        "value": "临县",
	                        "code": "141124"
	                    },
	                    {
	                        "value": "柳林县",
	                        "code": "141125"
	                    },
	                    {
	                        "value": "石楼县",
	                        "code": "141126"
	                    },
	                    {
	                        "value": "岚县",
	                        "code": "141127"
	                    },
	                    {
	                        "value": "方山县",
	                        "code": "141128"
	                    },
	                    {
	                        "value": "中阳县",
	                        "code": "141129"
	                    },
	                    {
	                        "value": "交口县",
	                        "code": "141130"
	                    },
	                    {
	                        "value": "孝义市",
	                        "code": "141181"
	                    },
	                    {
	                        "value": "汾阳市",
	                        "code": "141182"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "内蒙古自治区",
	        "code": "150000",
	        "children": [
	            {
	                "value": "呼和浩特市",
	                "code": "150100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "150101"
	                    },
	                    {
	                        "value": "新城区",
	                        "code": "150102"
	                    },
	                    {
	                        "value": "回民区",
	                        "code": "150103"
	                    },
	                    {
	                        "value": "玉泉区",
	                        "code": "150104"
	                    },
	                    {
	                        "value": "赛罕区",
	                        "code": "150105"
	                    },
	                    {
	                        "value": "土默特左旗",
	                        "code": "150121"
	                    },
	                    {
	                        "value": "托克托县",
	                        "code": "150122"
	                    },
	                    {
	                        "value": "和林格尔县",
	                        "code": "150123"
	                    },
	                    {
	                        "value": "清水河县",
	                        "code": "150124"
	                    },
	                    {
	                        "value": "武川县",
	                        "code": "150125"
	                    }
	                ]
	            },
	            {
	                "value": "包头市",
	                "code": "150200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "150201"
	                    },
	                    {
	                        "value": "东河区",
	                        "code": "150202"
	                    },
	                    {
	                        "value": "昆都仑区",
	                        "code": "150203"
	                    },
	                    {
	                        "value": "青山区",
	                        "code": "150204"
	                    },
	                    {
	                        "value": "石拐区",
	                        "code": "150205"
	                    },
	                    {
	                        "value": "白云鄂博矿区",
	                        "code": "150206"
	                    },
	                    {
	                        "value": "九原区",
	                        "code": "150207"
	                    },
	                    {
	                        "value": "土默特右旗",
	                        "code": "150221"
	                    },
	                    {
	                        "value": "固阳县",
	                        "code": "150222"
	                    },
	                    {
	                        "value": "达尔罕茂明安联合旗",
	                        "code": "150223"
	                    }
	                ]
	            },
	            {
	                "value": "乌海市",
	                "code": "150300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "150301"
	                    },
	                    {
	                        "value": "海勃湾区",
	                        "code": "150302"
	                    },
	                    {
	                        "value": "海南区",
	                        "code": "150303"
	                    },
	                    {
	                        "value": "乌达区",
	                        "code": "150304"
	                    }
	                ]
	            },
	            {
	                "value": "赤峰市",
	                "code": "150400",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "150401"
	                    },
	                    {
	                        "value": "红山区",
	                        "code": "150402"
	                    },
	                    {
	                        "value": "元宝山区",
	                        "code": "150403"
	                    },
	                    {
	                        "value": "松山区",
	                        "code": "150404"
	                    },
	                    {
	                        "value": "阿鲁科尔沁旗",
	                        "code": "150421"
	                    },
	                    {
	                        "value": "巴林左旗",
	                        "code": "150422"
	                    },
	                    {
	                        "value": "巴林右旗",
	                        "code": "150423"
	                    },
	                    {
	                        "value": "林西县",
	                        "code": "150424"
	                    },
	                    {
	                        "value": "克什克腾旗",
	                        "code": "150425"
	                    },
	                    {
	                        "value": "翁牛特旗",
	                        "code": "150426"
	                    },
	                    {
	                        "value": "喀喇沁旗",
	                        "code": "150428"
	                    },
	                    {
	                        "value": "宁城县",
	                        "code": "150429"
	                    },
	                    {
	                        "value": "敖汉旗",
	                        "code": "150430"
	                    }
	                ]
	            },
	            {
	                "value": "通辽市",
	                "code": "150500",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "150501"
	                    },
	                    {
	                        "value": "科尔沁区",
	                        "code": "150502"
	                    },
	                    {
	                        "value": "科尔沁左翼中旗",
	                        "code": "150521"
	                    },
	                    {
	                        "value": "科尔沁左翼后旗",
	                        "code": "150522"
	                    },
	                    {
	                        "value": "开鲁县",
	                        "code": "150523"
	                    },
	                    {
	                        "value": "库伦旗",
	                        "code": "150524"
	                    },
	                    {
	                        "value": "奈曼旗",
	                        "code": "150525"
	                    },
	                    {
	                        "value": "扎鲁特旗",
	                        "code": "150526"
	                    },
	                    {
	                        "value": "霍林郭勒市",
	                        "code": "150581"
	                    }
	                ]
	            },
	            {
	                "value": "鄂尔多斯市",
	                "code": "150600",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "150601"
	                    },
	                    {
	                        "value": "东胜区",
	                        "code": "150602"
	                    },
	                    {
	                        "value": "康巴什区",
	                        "code": "150603"
	                    },
	                    {
	                        "value": "达拉特旗",
	                        "code": "150621"
	                    },
	                    {
	                        "value": "准格尔旗",
	                        "code": "150622"
	                    },
	                    {
	                        "value": "鄂托克前旗",
	                        "code": "150623"
	                    },
	                    {
	                        "value": "鄂托克旗",
	                        "code": "150624"
	                    },
	                    {
	                        "value": "杭锦旗",
	                        "code": "150625"
	                    },
	                    {
	                        "value": "乌审旗",
	                        "code": "150626"
	                    },
	                    {
	                        "value": "伊金霍洛旗",
	                        "code": "150627"
	                    }
	                ]
	            },
	            {
	                "value": "呼伦贝尔市",
	                "code": "150700",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "150701"
	                    },
	                    {
	                        "value": "海拉尔区",
	                        "code": "150702"
	                    },
	                    {
	                        "value": "扎赉诺尔区",
	                        "code": "150703"
	                    },
	                    {
	                        "value": "阿荣旗",
	                        "code": "150721"
	                    },
	                    {
	                        "value": "莫力达瓦达斡尔族自治旗",
	                        "code": "150722"
	                    },
	                    {
	                        "value": "鄂伦春自治旗",
	                        "code": "150723"
	                    },
	                    {
	                        "value": "鄂温克族自治旗",
	                        "code": "150724"
	                    },
	                    {
	                        "value": "陈巴尔虎旗",
	                        "code": "150725"
	                    },
	                    {
	                        "value": "新巴尔虎左旗",
	                        "code": "150726"
	                    },
	                    {
	                        "value": "新巴尔虎右旗",
	                        "code": "150727"
	                    },
	                    {
	                        "value": "满洲里市",
	                        "code": "150781"
	                    },
	                    {
	                        "value": "牙克石市",
	                        "code": "150782"
	                    },
	                    {
	                        "value": "扎兰屯市",
	                        "code": "150783"
	                    },
	                    {
	                        "value": "额尔古纳市",
	                        "code": "150784"
	                    },
	                    {
	                        "value": "根河市",
	                        "code": "150785"
	                    }
	                ]
	            },
	            {
	                "value": "巴彦淖尔市",
	                "code": "150800",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "150801"
	                    },
	                    {
	                        "value": "临河区",
	                        "code": "150802"
	                    },
	                    {
	                        "value": "五原县",
	                        "code": "150821"
	                    },
	                    {
	                        "value": "磴口县",
	                        "code": "150822"
	                    },
	                    {
	                        "value": "乌拉特前旗",
	                        "code": "150823"
	                    },
	                    {
	                        "value": "乌拉特中旗",
	                        "code": "150824"
	                    },
	                    {
	                        "value": "乌拉特后旗",
	                        "code": "150825"
	                    },
	                    {
	                        "value": "杭锦后旗",
	                        "code": "150826"
	                    }
	                ]
	            },
	            {
	                "value": "乌兰察布市",
	                "code": "150900",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "150901"
	                    },
	                    {
	                        "value": "集宁区",
	                        "code": "150902"
	                    },
	                    {
	                        "value": "卓资县",
	                        "code": "150921"
	                    },
	                    {
	                        "value": "化德县",
	                        "code": "150922"
	                    },
	                    {
	                        "value": "商都县",
	                        "code": "150923"
	                    },
	                    {
	                        "value": "兴和县",
	                        "code": "150924"
	                    },
	                    {
	                        "value": "凉城县",
	                        "code": "150925"
	                    },
	                    {
	                        "value": "察哈尔右翼前旗",
	                        "code": "150926"
	                    },
	                    {
	                        "value": "察哈尔右翼中旗",
	                        "code": "150927"
	                    },
	                    {
	                        "value": "察哈尔右翼后旗",
	                        "code": "150928"
	                    },
	                    {
	                        "value": "四子王旗",
	                        "code": "150929"
	                    },
	                    {
	                        "value": "丰镇市",
	                        "code": "150981"
	                    }
	                ]
	            },
	            {
	                "value": "兴安盟",
	                "code": "152200",
	                "children": [
	                    {
	                        "value": "乌兰浩特市",
	                        "code": "152201"
	                    },
	                    {
	                        "value": "阿尔山市",
	                        "code": "152202"
	                    },
	                    {
	                        "value": "科尔沁右翼前旗",
	                        "code": "152221"
	                    },
	                    {
	                        "value": "科尔沁右翼中旗",
	                        "code": "152222"
	                    },
	                    {
	                        "value": "扎赉特旗",
	                        "code": "152223"
	                    },
	                    {
	                        "value": "突泉县",
	                        "code": "152224"
	                    }
	                ]
	            },
	            {
	                "value": "锡林郭勒盟",
	                "code": "152500",
	                "children": [
	                    {
	                        "value": "二连浩特市",
	                        "code": "152501"
	                    },
	                    {
	                        "value": "锡林浩特市",
	                        "code": "152502"
	                    },
	                    {
	                        "value": "阿巴嘎旗",
	                        "code": "152522"
	                    },
	                    {
	                        "value": "苏尼特左旗",
	                        "code": "152523"
	                    },
	                    {
	                        "value": "苏尼特右旗",
	                        "code": "152524"
	                    },
	                    {
	                        "value": "东乌珠穆沁旗",
	                        "code": "152525"
	                    },
	                    {
	                        "value": "西乌珠穆沁旗",
	                        "code": "152526"
	                    },
	                    {
	                        "value": "太仆寺旗",
	                        "code": "152527"
	                    },
	                    {
	                        "value": "镶黄旗",
	                        "code": "152528"
	                    },
	                    {
	                        "value": "正镶白旗",
	                        "code": "152529"
	                    },
	                    {
	                        "value": "正蓝旗",
	                        "code": "152530"
	                    },
	                    {
	                        "value": "多伦县",
	                        "code": "152531"
	                    }
	                ]
	            },
	            {
	                "value": "阿拉善盟",
	                "code": "152900",
	                "children": [
	                    {
	                        "value": "阿拉善左旗",
	                        "code": "152921"
	                    },
	                    {
	                        "value": "阿拉善右旗",
	                        "code": "152922"
	                    },
	                    {
	                        "value": "额济纳旗",
	                        "code": "152923"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "辽宁省",
	        "code": "210000",
	        "children": [
	            {
	                "value": "沈阳市",
	                "code": "210100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "210101"
	                    },
	                    {
	                        "value": "和平区",
	                        "code": "210102"
	                    },
	                    {
	                        "value": "沈河区",
	                        "code": "210103"
	                    },
	                    {
	                        "value": "大东区",
	                        "code": "210104"
	                    },
	                    {
	                        "value": "皇姑区",
	                        "code": "210105"
	                    },
	                    {
	                        "value": "铁西区",
	                        "code": "210106"
	                    },
	                    {
	                        "value": "苏家屯区",
	                        "code": "210111"
	                    },
	                    {
	                        "value": "浑南区",
	                        "code": "210112"
	                    },
	                    {
	                        "value": "沈北新区",
	                        "code": "210113"
	                    },
	                    {
	                        "value": "于洪区",
	                        "code": "210114"
	                    },
	                    {
	                        "value": "辽中区",
	                        "code": "210115"
	                    },
	                    {
	                        "value": "康平县",
	                        "code": "210123"
	                    },
	                    {
	                        "value": "法库县",
	                        "code": "210124"
	                    },
	                    {
	                        "value": "新民市",
	                        "code": "210181"
	                    }
	                ]
	            },
	            {
	                "value": "大连市",
	                "code": "210200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "210201"
	                    },
	                    {
	                        "value": "中山区",
	                        "code": "210202"
	                    },
	                    {
	                        "value": "西岗区",
	                        "code": "210203"
	                    },
	                    {
	                        "value": "沙河口区",
	                        "code": "210204"
	                    },
	                    {
	                        "value": "甘井子区",
	                        "code": "210211"
	                    },
	                    {
	                        "value": "旅顺口区",
	                        "code": "210212"
	                    },
	                    {
	                        "value": "金州区",
	                        "code": "210213"
	                    },
	                    {
	                        "value": "普兰店区",
	                        "code": "210214"
	                    },
	                    {
	                        "value": "长海县",
	                        "code": "210224"
	                    },
	                    {
	                        "value": "瓦房店市",
	                        "code": "210281"
	                    },
	                    {
	                        "value": "庄河市",
	                        "code": "210283"
	                    }
	                ]
	            },
	            {
	                "value": "鞍山市",
	                "code": "210300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "210301"
	                    },
	                    {
	                        "value": "铁东区",
	                        "code": "210302"
	                    },
	                    {
	                        "value": "铁西区",
	                        "code": "210303"
	                    },
	                    {
	                        "value": "立山区",
	                        "code": "210304"
	                    },
	                    {
	                        "value": "千山区",
	                        "code": "210311"
	                    },
	                    {
	                        "value": "台安县",
	                        "code": "210321"
	                    },
	                    {
	                        "value": "岫岩满族自治县",
	                        "code": "210323"
	                    },
	                    {
	                        "value": "海城市",
	                        "code": "210381"
	                    }
	                ]
	            },
	            {
	                "value": "抚顺市",
	                "code": "210400",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "210401"
	                    },
	                    {
	                        "value": "新抚区",
	                        "code": "210402"
	                    },
	                    {
	                        "value": "东洲区",
	                        "code": "210403"
	                    },
	                    {
	                        "value": "望花区",
	                        "code": "210404"
	                    },
	                    {
	                        "value": "顺城区",
	                        "code": "210411"
	                    },
	                    {
	                        "value": "抚顺县",
	                        "code": "210421"
	                    },
	                    {
	                        "value": "新宾满族自治县",
	                        "code": "210422"
	                    },
	                    {
	                        "value": "清原满族自治县",
	                        "code": "210423"
	                    }
	                ]
	            },
	            {
	                "value": "本溪市",
	                "code": "210500",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "210501"
	                    },
	                    {
	                        "value": "平山区",
	                        "code": "210502"
	                    },
	                    {
	                        "value": "溪湖区",
	                        "code": "210503"
	                    },
	                    {
	                        "value": "明山区",
	                        "code": "210504"
	                    },
	                    {
	                        "value": "南芬区",
	                        "code": "210505"
	                    },
	                    {
	                        "value": "本溪满族自治县",
	                        "code": "210521"
	                    },
	                    {
	                        "value": "桓仁满族自治县",
	                        "code": "210522"
	                    }
	                ]
	            },
	            {
	                "value": "丹东市",
	                "code": "210600",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "210601"
	                    },
	                    {
	                        "value": "元宝区",
	                        "code": "210602"
	                    },
	                    {
	                        "value": "振兴区",
	                        "code": "210603"
	                    },
	                    {
	                        "value": "振安区",
	                        "code": "210604"
	                    },
	                    {
	                        "value": "宽甸满族自治县",
	                        "code": "210624"
	                    },
	                    {
	                        "value": "东港市",
	                        "code": "210681"
	                    },
	                    {
	                        "value": "凤城市",
	                        "code": "210682"
	                    }
	                ]
	            },
	            {
	                "value": "锦州市",
	                "code": "210700",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "210701"
	                    },
	                    {
	                        "value": "古塔区",
	                        "code": "210702"
	                    },
	                    {
	                        "value": "凌河区",
	                        "code": "210703"
	                    },
	                    {
	                        "value": "太和区",
	                        "code": "210711"
	                    },
	                    {
	                        "value": "黑山县",
	                        "code": "210726"
	                    },
	                    {
	                        "value": "义县",
	                        "code": "210727"
	                    },
	                    {
	                        "value": "凌海市",
	                        "code": "210781"
	                    },
	                    {
	                        "value": "北镇市",
	                        "code": "210782"
	                    }
	                ]
	            },
	            {
	                "value": "营口市",
	                "code": "210800",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "210801"
	                    },
	                    {
	                        "value": "站前区",
	                        "code": "210802"
	                    },
	                    {
	                        "value": "西市区",
	                        "code": "210803"
	                    },
	                    {
	                        "value": "鲅鱼圈区",
	                        "code": "210804"
	                    },
	                    {
	                        "value": "老边区",
	                        "code": "210811"
	                    },
	                    {
	                        "value": "盖州市",
	                        "code": "210881"
	                    },
	                    {
	                        "value": "大石桥市",
	                        "code": "210882"
	                    }
	                ]
	            },
	            {
	                "value": "阜新市",
	                "code": "210900",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "210901"
	                    },
	                    {
	                        "value": "海州区",
	                        "code": "210902"
	                    },
	                    {
	                        "value": "新邱区",
	                        "code": "210903"
	                    },
	                    {
	                        "value": "太平区",
	                        "code": "210904"
	                    },
	                    {
	                        "value": "清河门区",
	                        "code": "210905"
	                    },
	                    {
	                        "value": "细河区",
	                        "code": "210911"
	                    },
	                    {
	                        "value": "阜新蒙古族自治县",
	                        "code": "210921"
	                    },
	                    {
	                        "value": "彰武县",
	                        "code": "210922"
	                    }
	                ]
	            },
	            {
	                "value": "辽阳市",
	                "code": "211000",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "211001"
	                    },
	                    {
	                        "value": "白塔区",
	                        "code": "211002"
	                    },
	                    {
	                        "value": "文圣区",
	                        "code": "211003"
	                    },
	                    {
	                        "value": "宏伟区",
	                        "code": "211004"
	                    },
	                    {
	                        "value": "弓长岭区",
	                        "code": "211005"
	                    },
	                    {
	                        "value": "太子河区",
	                        "code": "211011"
	                    },
	                    {
	                        "value": "辽阳县",
	                        "code": "211021"
	                    },
	                    {
	                        "value": "灯塔市",
	                        "code": "211081"
	                    }
	                ]
	            },
	            {
	                "value": "盘锦市",
	                "code": "211100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "211101"
	                    },
	                    {
	                        "value": "双台子区",
	                        "code": "211102"
	                    },
	                    {
	                        "value": "兴隆台区",
	                        "code": "211103"
	                    },
	                    {
	                        "value": "大洼区",
	                        "code": "211104"
	                    },
	                    {
	                        "value": "盘山县",
	                        "code": "211122"
	                    }
	                ]
	            },
	            {
	                "value": "铁岭市",
	                "code": "211200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "211201"
	                    },
	                    {
	                        "value": "银州区",
	                        "code": "211202"
	                    },
	                    {
	                        "value": "清河区",
	                        "code": "211204"
	                    },
	                    {
	                        "value": "铁岭县",
	                        "code": "211221"
	                    },
	                    {
	                        "value": "西丰县",
	                        "code": "211223"
	                    },
	                    {
	                        "value": "昌图县",
	                        "code": "211224"
	                    },
	                    {
	                        "value": "调兵山市",
	                        "code": "211281"
	                    },
	                    {
	                        "value": "开原市",
	                        "code": "211282"
	                    }
	                ]
	            },
	            {
	                "value": "朝阳市",
	                "code": "211300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "211301"
	                    },
	                    {
	                        "value": "双塔区",
	                        "code": "211302"
	                    },
	                    {
	                        "value": "龙城区",
	                        "code": "211303"
	                    },
	                    {
	                        "value": "朝阳县",
	                        "code": "211321"
	                    },
	                    {
	                        "value": "建平县",
	                        "code": "211322"
	                    },
	                    {
	                        "value": "喀喇沁左翼蒙古族自治县",
	                        "code": "211324"
	                    },
	                    {
	                        "value": "北票市",
	                        "code": "211381"
	                    },
	                    {
	                        "value": "凌源市",
	                        "code": "211382"
	                    }
	                ]
	            },
	            {
	                "value": "葫芦岛市",
	                "code": "211400",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "211401"
	                    },
	                    {
	                        "value": "连山区",
	                        "code": "211402"
	                    },
	                    {
	                        "value": "龙港区",
	                        "code": "211403"
	                    },
	                    {
	                        "value": "南票区",
	                        "code": "211404"
	                    },
	                    {
	                        "value": "绥中县",
	                        "code": "211421"
	                    },
	                    {
	                        "value": "建昌县",
	                        "code": "211422"
	                    },
	                    {
	                        "value": "兴城市",
	                        "code": "211481"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "吉林省",
	        "code": "220000",
	        "children": [
	            {
	                "value": "长春市",
	                "code": "220100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "220101"
	                    },
	                    {
	                        "value": "南关区",
	                        "code": "220102"
	                    },
	                    {
	                        "value": "宽城区",
	                        "code": "220103"
	                    },
	                    {
	                        "value": "朝阳区",
	                        "code": "220104"
	                    },
	                    {
	                        "value": "二道区",
	                        "code": "220105"
	                    },
	                    {
	                        "value": "绿园区",
	                        "code": "220106"
	                    },
	                    {
	                        "value": "双阳区",
	                        "code": "220112"
	                    },
	                    {
	                        "value": "九台区",
	                        "code": "220113"
	                    },
	                    {
	                        "value": "农安县",
	                        "code": "220122"
	                    },
	                    {
	                        "value": "榆树市",
	                        "code": "220182"
	                    },
	                    {
	                        "value": "德惠市",
	                        "code": "220183"
	                    }
	                ]
	            },
	            {
	                "value": "吉林市",
	                "code": "220200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "220201"
	                    },
	                    {
	                        "value": "昌邑区",
	                        "code": "220202"
	                    },
	                    {
	                        "value": "龙潭区",
	                        "code": "220203"
	                    },
	                    {
	                        "value": "船营区",
	                        "code": "220204"
	                    },
	                    {
	                        "value": "丰满区",
	                        "code": "220211"
	                    },
	                    {
	                        "value": "永吉县",
	                        "code": "220221"
	                    },
	                    {
	                        "value": "蛟河市",
	                        "code": "220281"
	                    },
	                    {
	                        "value": "桦甸市",
	                        "code": "220282"
	                    },
	                    {
	                        "value": "舒兰市",
	                        "code": "220283"
	                    },
	                    {
	                        "value": "磐石市",
	                        "code": "220284"
	                    }
	                ]
	            },
	            {
	                "value": "四平市",
	                "code": "220300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "220301"
	                    },
	                    {
	                        "value": "铁西区",
	                        "code": "220302"
	                    },
	                    {
	                        "value": "铁东区",
	                        "code": "220303"
	                    },
	                    {
	                        "value": "梨树县",
	                        "code": "220322"
	                    },
	                    {
	                        "value": "伊通满族自治县",
	                        "code": "220323"
	                    },
	                    {
	                        "value": "公主岭市",
	                        "code": "220381"
	                    },
	                    {
	                        "value": "双辽市",
	                        "code": "220382"
	                    }
	                ]
	            },
	            {
	                "value": "辽源市",
	                "code": "220400",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "220401"
	                    },
	                    {
	                        "value": "龙山区",
	                        "code": "220402"
	                    },
	                    {
	                        "value": "西安区",
	                        "code": "220403"
	                    },
	                    {
	                        "value": "东丰县",
	                        "code": "220421"
	                    },
	                    {
	                        "value": "东辽县",
	                        "code": "220422"
	                    }
	                ]
	            },
	            {
	                "value": "通化市",
	                "code": "220500",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "220501"
	                    },
	                    {
	                        "value": "东昌区",
	                        "code": "220502"
	                    },
	                    {
	                        "value": "二道江区",
	                        "code": "220503"
	                    },
	                    {
	                        "value": "通化县",
	                        "code": "220521"
	                    },
	                    {
	                        "value": "辉南县",
	                        "code": "220523"
	                    },
	                    {
	                        "value": "柳河县",
	                        "code": "220524"
	                    },
	                    {
	                        "value": "梅河口市",
	                        "code": "220581"
	                    },
	                    {
	                        "value": "集安市",
	                        "code": "220582"
	                    }
	                ]
	            },
	            {
	                "value": "白山市",
	                "code": "220600",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "220601"
	                    },
	                    {
	                        "value": "浑江区",
	                        "code": "220602"
	                    },
	                    {
	                        "value": "江源区",
	                        "code": "220605"
	                    },
	                    {
	                        "value": "抚松县",
	                        "code": "220621"
	                    },
	                    {
	                        "value": "靖宇县",
	                        "code": "220622"
	                    },
	                    {
	                        "value": "长白朝鲜族自治县",
	                        "code": "220623"
	                    },
	                    {
	                        "value": "临江市",
	                        "code": "220681"
	                    }
	                ]
	            },
	            {
	                "value": "松原市",
	                "code": "220700",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "220701"
	                    },
	                    {
	                        "value": "宁江区",
	                        "code": "220702"
	                    },
	                    {
	                        "value": "前郭尔罗斯蒙古族自治县",
	                        "code": "220721"
	                    },
	                    {
	                        "value": "长岭县",
	                        "code": "220722"
	                    },
	                    {
	                        "value": "乾安县",
	                        "code": "220723"
	                    },
	                    {
	                        "value": "扶余市",
	                        "code": "220781"
	                    }
	                ]
	            },
	            {
	                "value": "白城市",
	                "code": "220800",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "220801"
	                    },
	                    {
	                        "value": "洮北区",
	                        "code": "220802"
	                    },
	                    {
	                        "value": "镇赉县",
	                        "code": "220821"
	                    },
	                    {
	                        "value": "通榆县",
	                        "code": "220822"
	                    },
	                    {
	                        "value": "洮南市",
	                        "code": "220881"
	                    },
	                    {
	                        "value": "大安市",
	                        "code": "220882"
	                    }
	                ]
	            },
	            {
	                "value": "延边朝鲜族自治州",
	                "code": "222400",
	                "children": [
	                    {
	                        "value": "延吉市",
	                        "code": "222401"
	                    },
	                    {
	                        "value": "图们市",
	                        "code": "222402"
	                    },
	                    {
	                        "value": "敦化市",
	                        "code": "222403"
	                    },
	                    {
	                        "value": "珲春市",
	                        "code": "222404"
	                    },
	                    {
	                        "value": "龙井市",
	                        "code": "222405"
	                    },
	                    {
	                        "value": "和龙市",
	                        "code": "222406"
	                    },
	                    {
	                        "value": "汪清县",
	                        "code": "222424"
	                    },
	                    {
	                        "value": "安图县",
	                        "code": "222426"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "黑龙江省",
	        "code": "230000",
	        "children": [
	            {
	                "value": "哈尔滨市",
	                "code": "230100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "230101"
	                    },
	                    {
	                        "value": "道里区",
	                        "code": "230102"
	                    },
	                    {
	                        "value": "南岗区",
	                        "code": "230103"
	                    },
	                    {
	                        "value": "道外区",
	                        "code": "230104"
	                    },
	                    {
	                        "value": "平房区",
	                        "code": "230108"
	                    },
	                    {
	                        "value": "松北区",
	                        "code": "230109"
	                    },
	                    {
	                        "value": "香坊区",
	                        "code": "230110"
	                    },
	                    {
	                        "value": "呼兰区",
	                        "code": "230111"
	                    },
	                    {
	                        "value": "阿城区",
	                        "code": "230112"
	                    },
	                    {
	                        "value": "双城区",
	                        "code": "230113"
	                    },
	                    {
	                        "value": "依兰县",
	                        "code": "230123"
	                    },
	                    {
	                        "value": "方正县",
	                        "code": "230124"
	                    },
	                    {
	                        "value": "宾县",
	                        "code": "230125"
	                    },
	                    {
	                        "value": "巴彦县",
	                        "code": "230126"
	                    },
	                    {
	                        "value": "木兰县",
	                        "code": "230127"
	                    },
	                    {
	                        "value": "通河县",
	                        "code": "230128"
	                    },
	                    {
	                        "value": "延寿县",
	                        "code": "230129"
	                    },
	                    {
	                        "value": "尚志市",
	                        "code": "230183"
	                    },
	                    {
	                        "value": "五常市",
	                        "code": "230184"
	                    }
	                ]
	            },
	            {
	                "value": "齐齐哈尔市",
	                "code": "230200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "230201"
	                    },
	                    {
	                        "value": "龙沙区",
	                        "code": "230202"
	                    },
	                    {
	                        "value": "建华区",
	                        "code": "230203"
	                    },
	                    {
	                        "value": "铁锋区",
	                        "code": "230204"
	                    },
	                    {
	                        "value": "昂昂溪区",
	                        "code": "230205"
	                    },
	                    {
	                        "value": "富拉尔基区",
	                        "code": "230206"
	                    },
	                    {
	                        "value": "碾子山区",
	                        "code": "230207"
	                    },
	                    {
	                        "value": "梅里斯达斡尔族区",
	                        "code": "230208"
	                    },
	                    {
	                        "value": "龙江县",
	                        "code": "230221"
	                    },
	                    {
	                        "value": "依安县",
	                        "code": "230223"
	                    },
	                    {
	                        "value": "泰来县",
	                        "code": "230224"
	                    },
	                    {
	                        "value": "甘南县",
	                        "code": "230225"
	                    },
	                    {
	                        "value": "富裕县",
	                        "code": "230227"
	                    },
	                    {
	                        "value": "克山县",
	                        "code": "230229"
	                    },
	                    {
	                        "value": "克东县",
	                        "code": "230230"
	                    },
	                    {
	                        "value": "拜泉县",
	                        "code": "230231"
	                    },
	                    {
	                        "value": "讷河市",
	                        "code": "230281"
	                    }
	                ]
	            },
	            {
	                "value": "鸡西市",
	                "code": "230300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "230301"
	                    },
	                    {
	                        "value": "鸡冠区",
	                        "code": "230302"
	                    },
	                    {
	                        "value": "恒山区",
	                        "code": "230303"
	                    },
	                    {
	                        "value": "滴道区",
	                        "code": "230304"
	                    },
	                    {
	                        "value": "梨树区",
	                        "code": "230305"
	                    },
	                    {
	                        "value": "城子河区",
	                        "code": "230306"
	                    },
	                    {
	                        "value": "麻山区",
	                        "code": "230307"
	                    },
	                    {
	                        "value": "鸡东县",
	                        "code": "230321"
	                    },
	                    {
	                        "value": "虎林市",
	                        "code": "230381"
	                    },
	                    {
	                        "value": "密山市",
	                        "code": "230382"
	                    }
	                ]
	            },
	            {
	                "value": "鹤岗市",
	                "code": "230400",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "230401"
	                    },
	                    {
	                        "value": "向阳区",
	                        "code": "230402"
	                    },
	                    {
	                        "value": "工农区",
	                        "code": "230403"
	                    },
	                    {
	                        "value": "南山区",
	                        "code": "230404"
	                    },
	                    {
	                        "value": "兴安区",
	                        "code": "230405"
	                    },
	                    {
	                        "value": "东山区",
	                        "code": "230406"
	                    },
	                    {
	                        "value": "兴山区",
	                        "code": "230407"
	                    },
	                    {
	                        "value": "萝北县",
	                        "code": "230421"
	                    },
	                    {
	                        "value": "绥滨县",
	                        "code": "230422"
	                    }
	                ]
	            },
	            {
	                "value": "双鸭山市",
	                "code": "230500",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "230501"
	                    },
	                    {
	                        "value": "尖山区",
	                        "code": "230502"
	                    },
	                    {
	                        "value": "岭东区",
	                        "code": "230503"
	                    },
	                    {
	                        "value": "四方台区",
	                        "code": "230505"
	                    },
	                    {
	                        "value": "宝山区",
	                        "code": "230506"
	                    },
	                    {
	                        "value": "集贤县",
	                        "code": "230521"
	                    },
	                    {
	                        "value": "友谊县",
	                        "code": "230522"
	                    },
	                    {
	                        "value": "宝清县",
	                        "code": "230523"
	                    },
	                    {
	                        "value": "饶河县",
	                        "code": "230524"
	                    }
	                ]
	            },
	            {
	                "value": "大庆市",
	                "code": "230600",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "230601"
	                    },
	                    {
	                        "value": "萨尔图区",
	                        "code": "230602"
	                    },
	                    {
	                        "value": "龙凤区",
	                        "code": "230603"
	                    },
	                    {
	                        "value": "让胡路区",
	                        "code": "230604"
	                    },
	                    {
	                        "value": "红岗区",
	                        "code": "230605"
	                    },
	                    {
	                        "value": "大同区",
	                        "code": "230606"
	                    },
	                    {
	                        "value": "肇州县",
	                        "code": "230621"
	                    },
	                    {
	                        "value": "肇源县",
	                        "code": "230622"
	                    },
	                    {
	                        "value": "林甸县",
	                        "code": "230623"
	                    },
	                    {
	                        "value": "杜尔伯特蒙古族自治县",
	                        "code": "230624"
	                    }
	                ]
	            },
	            {
	                "value": "伊春市",
	                "code": "230700",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "230701"
	                    },
	                    {
	                        "value": "伊春区",
	                        "code": "230702"
	                    },
	                    {
	                        "value": "南岔区",
	                        "code": "230703"
	                    },
	                    {
	                        "value": "友好区",
	                        "code": "230704"
	                    },
	                    {
	                        "value": "西林区",
	                        "code": "230705"
	                    },
	                    {
	                        "value": "翠峦区",
	                        "code": "230706"
	                    },
	                    {
	                        "value": "新青区",
	                        "code": "230707"
	                    },
	                    {
	                        "value": "美溪区",
	                        "code": "230708"
	                    },
	                    {
	                        "value": "金山屯区",
	                        "code": "230709"
	                    },
	                    {
	                        "value": "五营区",
	                        "code": "230710"
	                    },
	                    {
	                        "value": "乌马河区",
	                        "code": "230711"
	                    },
	                    {
	                        "value": "汤旺河区",
	                        "code": "230712"
	                    },
	                    {
	                        "value": "带岭区",
	                        "code": "230713"
	                    },
	                    {
	                        "value": "乌伊岭区",
	                        "code": "230714"
	                    },
	                    {
	                        "value": "红星区",
	                        "code": "230715"
	                    },
	                    {
	                        "value": "上甘岭区",
	                        "code": "230716"
	                    },
	                    {
	                        "value": "嘉荫县",
	                        "code": "230722"
	                    },
	                    {
	                        "value": "铁力市",
	                        "code": "230781"
	                    }
	                ]
	            },
	            {
	                "value": "佳木斯市",
	                "code": "230800",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "230801"
	                    },
	                    {
	                        "value": "向阳区",
	                        "code": "230803"
	                    },
	                    {
	                        "value": "前进区",
	                        "code": "230804"
	                    },
	                    {
	                        "value": "东风区",
	                        "code": "230805"
	                    },
	                    {
	                        "value": "郊区",
	                        "code": "230811"
	                    },
	                    {
	                        "value": "桦南县",
	                        "code": "230822"
	                    },
	                    {
	                        "value": "桦川县",
	                        "code": "230826"
	                    },
	                    {
	                        "value": "汤原县",
	                        "code": "230828"
	                    },
	                    {
	                        "value": "同江市",
	                        "code": "230881"
	                    },
	                    {
	                        "value": "富锦市",
	                        "code": "230882"
	                    },
	                    {
	                        "value": "抚远市",
	                        "code": "230883"
	                    }
	                ]
	            },
	            {
	                "value": "七台河市",
	                "code": "230900",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "230901"
	                    },
	                    {
	                        "value": "新兴区",
	                        "code": "230902"
	                    },
	                    {
	                        "value": "桃山区",
	                        "code": "230903"
	                    },
	                    {
	                        "value": "茄子河区",
	                        "code": "230904"
	                    },
	                    {
	                        "value": "勃利县",
	                        "code": "230921"
	                    }
	                ]
	            },
	            {
	                "value": "牡丹江市",
	                "code": "231000",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "231001"
	                    },
	                    {
	                        "value": "东安区",
	                        "code": "231002"
	                    },
	                    {
	                        "value": "阳明区",
	                        "code": "231003"
	                    },
	                    {
	                        "value": "爱民区",
	                        "code": "231004"
	                    },
	                    {
	                        "value": "西安区",
	                        "code": "231005"
	                    },
	                    {
	                        "value": "林口县",
	                        "code": "231025"
	                    },
	                    {
	                        "value": "绥芬河市",
	                        "code": "231081"
	                    },
	                    {
	                        "value": "海林市",
	                        "code": "231083"
	                    },
	                    {
	                        "value": "宁安市",
	                        "code": "231084"
	                    },
	                    {
	                        "value": "穆棱市",
	                        "code": "231085"
	                    },
	                    {
	                        "value": "东宁市",
	                        "code": "231086"
	                    }
	                ]
	            },
	            {
	                "value": "黑河市",
	                "code": "231100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "231101"
	                    },
	                    {
	                        "value": "爱辉区",
	                        "code": "231102"
	                    },
	                    {
	                        "value": "嫩江县",
	                        "code": "231121"
	                    },
	                    {
	                        "value": "逊克县",
	                        "code": "231123"
	                    },
	                    {
	                        "value": "孙吴县",
	                        "code": "231124"
	                    },
	                    {
	                        "value": "北安市",
	                        "code": "231181"
	                    },
	                    {
	                        "value": "五大连池市",
	                        "code": "231182"
	                    }
	                ]
	            },
	            {
	                "value": "绥化市",
	                "code": "231200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "231201"
	                    },
	                    {
	                        "value": "北林区",
	                        "code": "231202"
	                    },
	                    {
	                        "value": "望奎县",
	                        "code": "231221"
	                    },
	                    {
	                        "value": "兰西县",
	                        "code": "231222"
	                    },
	                    {
	                        "value": "青冈县",
	                        "code": "231223"
	                    },
	                    {
	                        "value": "庆安县",
	                        "code": "231224"
	                    },
	                    {
	                        "value": "明水县",
	                        "code": "231225"
	                    },
	                    {
	                        "value": "绥棱县",
	                        "code": "231226"
	                    },
	                    {
	                        "value": "安达市",
	                        "code": "231281"
	                    },
	                    {
	                        "value": "肇东市",
	                        "code": "231282"
	                    },
	                    {
	                        "value": "海伦市",
	                        "code": "231283"
	                    }
	                ]
	            },
	            {
	                "value": "大兴安岭地区",
	                "code": "232700",
	                "children": [
	                    {
	                        "value": "呼玛县",
	                        "code": "232721"
	                    },
	                    {
	                        "value": "塔河县",
	                        "code": "232722"
	                    },
	                    {
	                        "value": "漠河县",
	                        "code": "232723"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "上海市",
	        "code": "310000",
	        "children": [
	            {
	                "value": "市辖区",
	                "code": "310100",
	                "children": [
	                    {
	                        "value": "黄浦区",
	                        "code": "310101"
	                    },
	                    {
	                        "value": "徐汇区",
	                        "code": "310104"
	                    },
	                    {
	                        "value": "长宁区",
	                        "code": "310105"
	                    },
	                    {
	                        "value": "静安区",
	                        "code": "310106"
	                    },
	                    {
	                        "value": "普陀区",
	                        "code": "310107"
	                    },
	                    {
	                        "value": "虹口区",
	                        "code": "310109"
	                    },
	                    {
	                        "value": "杨浦区",
	                        "code": "310110"
	                    },
	                    {
	                        "value": "闵行区",
	                        "code": "310112"
	                    },
	                    {
	                        "value": "宝山区",
	                        "code": "310113"
	                    },
	                    {
	                        "value": "嘉定区",
	                        "code": "310114"
	                    },
	                    {
	                        "value": "浦东新区",
	                        "code": "310115"
	                    },
	                    {
	                        "value": "金山区",
	                        "code": "310116"
	                    },
	                    {
	                        "value": "松江区",
	                        "code": "310117"
	                    },
	                    {
	                        "value": "青浦区",
	                        "code": "310118"
	                    },
	                    {
	                        "value": "奉贤区",
	                        "code": "310120"
	                    },
	                    {
	                        "value": "崇明区",
	                        "code": "310151"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "江苏省",
	        "code": "320000",
	        "children": [
	            {
	                "value": "南京市",
	                "code": "320100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "320101"
	                    },
	                    {
	                        "value": "玄武区",
	                        "code": "320102"
	                    },
	                    {
	                        "value": "秦淮区",
	                        "code": "320104"
	                    },
	                    {
	                        "value": "建邺区",
	                        "code": "320105"
	                    },
	                    {
	                        "value": "鼓楼区",
	                        "code": "320106"
	                    },
	                    {
	                        "value": "浦口区",
	                        "code": "320111"
	                    },
	                    {
	                        "value": "栖霞区",
	                        "code": "320113"
	                    },
	                    {
	                        "value": "雨花台区",
	                        "code": "320114"
	                    },
	                    {
	                        "value": "江宁区",
	                        "code": "320115"
	                    },
	                    {
	                        "value": "六合区",
	                        "code": "320116"
	                    },
	                    {
	                        "value": "溧水区",
	                        "code": "320117"
	                    },
	                    {
	                        "value": "高淳区",
	                        "code": "320118"
	                    }
	                ]
	            },
	            {
	                "value": "无锡市",
	                "code": "320200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "320201"
	                    },
	                    {
	                        "value": "锡山区",
	                        "code": "320205"
	                    },
	                    {
	                        "value": "惠山区",
	                        "code": "320206"
	                    },
	                    {
	                        "value": "滨湖区",
	                        "code": "320211"
	                    },
	                    {
	                        "value": "梁溪区",
	                        "code": "320213"
	                    },
	                    {
	                        "value": "新吴区",
	                        "code": "320214"
	                    },
	                    {
	                        "value": "江阴市",
	                        "code": "320281"
	                    },
	                    {
	                        "value": "宜兴市",
	                        "code": "320282"
	                    }
	                ]
	            },
	            {
	                "value": "徐州市",
	                "code": "320300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "320301"
	                    },
	                    {
	                        "value": "鼓楼区",
	                        "code": "320302"
	                    },
	                    {
	                        "value": "云龙区",
	                        "code": "320303"
	                    },
	                    {
	                        "value": "贾汪区",
	                        "code": "320305"
	                    },
	                    {
	                        "value": "泉山区",
	                        "code": "320311"
	                    },
	                    {
	                        "value": "铜山区",
	                        "code": "320312"
	                    },
	                    {
	                        "value": "丰县",
	                        "code": "320321"
	                    },
	                    {
	                        "value": "沛县",
	                        "code": "320322"
	                    },
	                    {
	                        "value": "睢宁县",
	                        "code": "320324"
	                    },
	                    {
	                        "value": "新沂市",
	                        "code": "320381"
	                    },
	                    {
	                        "value": "邳州市",
	                        "code": "320382"
	                    }
	                ]
	            },
	            {
	                "value": "常州市",
	                "code": "320400",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "320401"
	                    },
	                    {
	                        "value": "天宁区",
	                        "code": "320402"
	                    },
	                    {
	                        "value": "钟楼区",
	                        "code": "320404"
	                    },
	                    {
	                        "value": "新北区",
	                        "code": "320411"
	                    },
	                    {
	                        "value": "武进区",
	                        "code": "320412"
	                    },
	                    {
	                        "value": "金坛区",
	                        "code": "320413"
	                    },
	                    {
	                        "value": "溧阳市",
	                        "code": "320481"
	                    }
	                ]
	            },
	            {
	                "value": "苏州市",
	                "code": "320500",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "320501"
	                    },
	                    {
	                        "value": "虎丘区",
	                        "code": "320505"
	                    },
	                    {
	                        "value": "吴中区",
	                        "code": "320506"
	                    },
	                    {
	                        "value": "相城区",
	                        "code": "320507"
	                    },
	                    {
	                        "value": "姑苏区",
	                        "code": "320508"
	                    },
	                    {
	                        "value": "吴江区",
	                        "code": "320509"
	                    },
	                    {
	                        "value": "常熟市",
	                        "code": "320581"
	                    },
	                    {
	                        "value": "张家港市",
	                        "code": "320582"
	                    },
	                    {
	                        "value": "昆山市",
	                        "code": "320583"
	                    },
	                    {
	                        "value": "太仓市",
	                        "code": "320585"
	                    }
	                ]
	            },
	            {
	                "value": "南通市",
	                "code": "320600",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "320601"
	                    },
	                    {
	                        "value": "崇川区",
	                        "code": "320602"
	                    },
	                    {
	                        "value": "港闸区",
	                        "code": "320611"
	                    },
	                    {
	                        "value": "通州区",
	                        "code": "320612"
	                    },
	                    {
	                        "value": "海安县",
	                        "code": "320621"
	                    },
	                    {
	                        "value": "如东县",
	                        "code": "320623"
	                    },
	                    {
	                        "value": "启东市",
	                        "code": "320681"
	                    },
	                    {
	                        "value": "如皋市",
	                        "code": "320682"
	                    },
	                    {
	                        "value": "海门市",
	                        "code": "320684"
	                    }
	                ]
	            },
	            {
	                "value": "连云港市",
	                "code": "320700",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "320701"
	                    },
	                    {
	                        "value": "连云区",
	                        "code": "320703"
	                    },
	                    {
	                        "value": "海州区",
	                        "code": "320706"
	                    },
	                    {
	                        "value": "赣榆区",
	                        "code": "320707"
	                    },
	                    {
	                        "value": "东海县",
	                        "code": "320722"
	                    },
	                    {
	                        "value": "灌云县",
	                        "code": "320723"
	                    },
	                    {
	                        "value": "灌南县",
	                        "code": "320724"
	                    }
	                ]
	            },
	            {
	                "value": "淮安市",
	                "code": "320800",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "320801"
	                    },
	                    {
	                        "value": "淮安区",
	                        "code": "320803"
	                    },
	                    {
	                        "value": "淮阴区",
	                        "code": "320804"
	                    },
	                    {
	                        "value": "清江浦区",
	                        "code": "320812"
	                    },
	                    {
	                        "value": "洪泽区",
	                        "code": "320813"
	                    },
	                    {
	                        "value": "涟水县",
	                        "code": "320826"
	                    },
	                    {
	                        "value": "盱眙县",
	                        "code": "320830"
	                    },
	                    {
	                        "value": "金湖县",
	                        "code": "320831"
	                    }
	                ]
	            },
	            {
	                "value": "盐城市",
	                "code": "320900",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "320901"
	                    },
	                    {
	                        "value": "亭湖区",
	                        "code": "320902"
	                    },
	                    {
	                        "value": "盐都区",
	                        "code": "320903"
	                    },
	                    {
	                        "value": "大丰区",
	                        "code": "320904"
	                    },
	                    {
	                        "value": "响水县",
	                        "code": "320921"
	                    },
	                    {
	                        "value": "滨海县",
	                        "code": "320922"
	                    },
	                    {
	                        "value": "阜宁县",
	                        "code": "320923"
	                    },
	                    {
	                        "value": "射阳县",
	                        "code": "320924"
	                    },
	                    {
	                        "value": "建湖县",
	                        "code": "320925"
	                    },
	                    {
	                        "value": "东台市",
	                        "code": "320981"
	                    }
	                ]
	            },
	            {
	                "value": "扬州市",
	                "code": "321000",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "321001"
	                    },
	                    {
	                        "value": "广陵区",
	                        "code": "321002"
	                    },
	                    {
	                        "value": "邗江区",
	                        "code": "321003"
	                    },
	                    {
	                        "value": "江都区",
	                        "code": "321012"
	                    },
	                    {
	                        "value": "宝应县",
	                        "code": "321023"
	                    },
	                    {
	                        "value": "仪征市",
	                        "code": "321081"
	                    },
	                    {
	                        "value": "高邮市",
	                        "code": "321084"
	                    }
	                ]
	            },
	            {
	                "value": "镇江市",
	                "code": "321100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "321101"
	                    },
	                    {
	                        "value": "京口区",
	                        "code": "321102"
	                    },
	                    {
	                        "value": "润州区",
	                        "code": "321111"
	                    },
	                    {
	                        "value": "丹徒区",
	                        "code": "321112"
	                    },
	                    {
	                        "value": "丹阳市",
	                        "code": "321181"
	                    },
	                    {
	                        "value": "扬中市",
	                        "code": "321182"
	                    },
	                    {
	                        "value": "句容市",
	                        "code": "321183"
	                    }
	                ]
	            },
	            {
	                "value": "泰州市",
	                "code": "321200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "321201"
	                    },
	                    {
	                        "value": "海陵区",
	                        "code": "321202"
	                    },
	                    {
	                        "value": "高港区",
	                        "code": "321203"
	                    },
	                    {
	                        "value": "姜堰区",
	                        "code": "321204"
	                    },
	                    {
	                        "value": "兴化市",
	                        "code": "321281"
	                    },
	                    {
	                        "value": "靖江市",
	                        "code": "321282"
	                    },
	                    {
	                        "value": "泰兴市",
	                        "code": "321283"
	                    }
	                ]
	            },
	            {
	                "value": "宿迁市",
	                "code": "321300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "321301"
	                    },
	                    {
	                        "value": "宿城区",
	                        "code": "321302"
	                    },
	                    {
	                        "value": "宿豫区",
	                        "code": "321311"
	                    },
	                    {
	                        "value": "沭阳县",
	                        "code": "321322"
	                    },
	                    {
	                        "value": "泗阳县",
	                        "code": "321323"
	                    },
	                    {
	                        "value": "泗洪县",
	                        "code": "321324"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "浙江省",
	        "code": "330000",
	        "children": [
	            {
	                "value": "杭州市",
	                "code": "330100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "330101"
	                    },
	                    {
	                        "value": "上城区",
	                        "code": "330102"
	                    },
	                    {
	                        "value": "下城区",
	                        "code": "330103"
	                    },
	                    {
	                        "value": "江干区",
	                        "code": "330104"
	                    },
	                    {
	                        "value": "拱墅区",
	                        "code": "330105"
	                    },
	                    {
	                        "value": "西湖区",
	                        "code": "330106"
	                    },
	                    {
	                        "value": "滨江区",
	                        "code": "330108"
	                    },
	                    {
	                        "value": "萧山区",
	                        "code": "330109"
	                    },
	                    {
	                        "value": "余杭区",
	                        "code": "330110"
	                    },
	                    {
	                        "value": "富阳区",
	                        "code": "330111"
	                    },
	                    {
	                        "value": "桐庐县",
	                        "code": "330122"
	                    },
	                    {
	                        "value": "淳安县",
	                        "code": "330127"
	                    },
	                    {
	                        "value": "建德市",
	                        "code": "330182"
	                    },
	                    {
	                        "value": "临安市",
	                        "code": "330185"
	                    }
	                ]
	            },
	            {
	                "value": "宁波市",
	                "code": "330200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "330201"
	                    },
	                    {
	                        "value": "海曙区",
	                        "code": "330203"
	                    },
	                    {
	                        "value": "江东区",
	                        "code": "330204"
	                    },
	                    {
	                        "value": "江北区",
	                        "code": "330205"
	                    },
	                    {
	                        "value": "北仑区",
	                        "code": "330206"
	                    },
	                    {
	                        "value": "镇海区",
	                        "code": "330211"
	                    },
	                    {
	                        "value": "鄞州区",
	                        "code": "330212"
	                    },
	                    {
	                        "value": "象山县",
	                        "code": "330225"
	                    },
	                    {
	                        "value": "宁海县",
	                        "code": "330226"
	                    },
	                    {
	                        "value": "余姚市",
	                        "code": "330281"
	                    },
	                    {
	                        "value": "慈溪市",
	                        "code": "330282"
	                    },
	                    {
	                        "value": "奉化市",
	                        "code": "330283"
	                    }
	                ]
	            },
	            {
	                "value": "温州市",
	                "code": "330300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "330301"
	                    },
	                    {
	                        "value": "鹿城区",
	                        "code": "330302"
	                    },
	                    {
	                        "value": "龙湾区",
	                        "code": "330303"
	                    },
	                    {
	                        "value": "瓯海区",
	                        "code": "330304"
	                    },
	                    {
	                        "value": "洞头区",
	                        "code": "330305"
	                    },
	                    {
	                        "value": "永嘉县",
	                        "code": "330324"
	                    },
	                    {
	                        "value": "平阳县",
	                        "code": "330326"
	                    },
	                    {
	                        "value": "苍南县",
	                        "code": "330327"
	                    },
	                    {
	                        "value": "文成县",
	                        "code": "330328"
	                    },
	                    {
	                        "value": "泰顺县",
	                        "code": "330329"
	                    },
	                    {
	                        "value": "瑞安市",
	                        "code": "330381"
	                    },
	                    {
	                        "value": "乐清市",
	                        "code": "330382"
	                    }
	                ]
	            },
	            {
	                "value": "嘉兴市",
	                "code": "330400",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "330401"
	                    },
	                    {
	                        "value": "南湖区",
	                        "code": "330402"
	                    },
	                    {
	                        "value": "秀洲区",
	                        "code": "330411"
	                    },
	                    {
	                        "value": "嘉善县",
	                        "code": "330421"
	                    },
	                    {
	                        "value": "海盐县",
	                        "code": "330424"
	                    },
	                    {
	                        "value": "海宁市",
	                        "code": "330481"
	                    },
	                    {
	                        "value": "平湖市",
	                        "code": "330482"
	                    },
	                    {
	                        "value": "桐乡市",
	                        "code": "330483"
	                    }
	                ]
	            },
	            {
	                "value": "湖州市",
	                "code": "330500",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "330501"
	                    },
	                    {
	                        "value": "吴兴区",
	                        "code": "330502"
	                    },
	                    {
	                        "value": "南浔区",
	                        "code": "330503"
	                    },
	                    {
	                        "value": "德清县",
	                        "code": "330521"
	                    },
	                    {
	                        "value": "长兴县",
	                        "code": "330522"
	                    },
	                    {
	                        "value": "安吉县",
	                        "code": "330523"
	                    }
	                ]
	            },
	            {
	                "value": "绍兴市",
	                "code": "330600",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "330601"
	                    },
	                    {
	                        "value": "越城区",
	                        "code": "330602"
	                    },
	                    {
	                        "value": "柯桥区",
	                        "code": "330603"
	                    },
	                    {
	                        "value": "上虞区",
	                        "code": "330604"
	                    },
	                    {
	                        "value": "新昌县",
	                        "code": "330624"
	                    },
	                    {
	                        "value": "诸暨市",
	                        "code": "330681"
	                    },
	                    {
	                        "value": "嵊州市",
	                        "code": "330683"
	                    }
	                ]
	            },
	            {
	                "value": "金华市",
	                "code": "330700",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "330701"
	                    },
	                    {
	                        "value": "婺城区",
	                        "code": "330702"
	                    },
	                    {
	                        "value": "金东区",
	                        "code": "330703"
	                    },
	                    {
	                        "value": "武义县",
	                        "code": "330723"
	                    },
	                    {
	                        "value": "浦江县",
	                        "code": "330726"
	                    },
	                    {
	                        "value": "磐安县",
	                        "code": "330727"
	                    },
	                    {
	                        "value": "兰溪市",
	                        "code": "330781"
	                    },
	                    {
	                        "value": "义乌市",
	                        "code": "330782"
	                    },
	                    {
	                        "value": "东阳市",
	                        "code": "330783"
	                    },
	                    {
	                        "value": "永康市",
	                        "code": "330784"
	                    }
	                ]
	            },
	            {
	                "value": "衢州市",
	                "code": "330800",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "330801"
	                    },
	                    {
	                        "value": "柯城区",
	                        "code": "330802"
	                    },
	                    {
	                        "value": "衢江区",
	                        "code": "330803"
	                    },
	                    {
	                        "value": "常山县",
	                        "code": "330822"
	                    },
	                    {
	                        "value": "开化县",
	                        "code": "330824"
	                    },
	                    {
	                        "value": "龙游县",
	                        "code": "330825"
	                    },
	                    {
	                        "value": "江山市",
	                        "code": "330881"
	                    }
	                ]
	            },
	            {
	                "value": "舟山市",
	                "code": "330900",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "330901"
	                    },
	                    {
	                        "value": "定海区",
	                        "code": "330902"
	                    },
	                    {
	                        "value": "普陀区",
	                        "code": "330903"
	                    },
	                    {
	                        "value": "岱山县",
	                        "code": "330921"
	                    },
	                    {
	                        "value": "嵊泗县",
	                        "code": "330922"
	                    }
	                ]
	            },
	            {
	                "value": "台州市",
	                "code": "331000",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "331001"
	                    },
	                    {
	                        "value": "椒江区",
	                        "code": "331002"
	                    },
	                    {
	                        "value": "黄岩区",
	                        "code": "331003"
	                    },
	                    {
	                        "value": "路桥区",
	                        "code": "331004"
	                    },
	                    {
	                        "value": "玉环县",
	                        "code": "331021"
	                    },
	                    {
	                        "value": "三门县",
	                        "code": "331022"
	                    },
	                    {
	                        "value": "天台县",
	                        "code": "331023"
	                    },
	                    {
	                        "value": "仙居县",
	                        "code": "331024"
	                    },
	                    {
	                        "value": "温岭市",
	                        "code": "331081"
	                    },
	                    {
	                        "value": "临海市",
	                        "code": "331082"
	                    }
	                ]
	            },
	            {
	                "value": "丽水市",
	                "code": "331100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "331101"
	                    },
	                    {
	                        "value": "莲都区",
	                        "code": "331102"
	                    },
	                    {
	                        "value": "青田县",
	                        "code": "331121"
	                    },
	                    {
	                        "value": "缙云县",
	                        "code": "331122"
	                    },
	                    {
	                        "value": "遂昌县",
	                        "code": "331123"
	                    },
	                    {
	                        "value": "松阳县",
	                        "code": "331124"
	                    },
	                    {
	                        "value": "云和县",
	                        "code": "331125"
	                    },
	                    {
	                        "value": "庆元县",
	                        "code": "331126"
	                    },
	                    {
	                        "value": "景宁畲族自治县",
	                        "code": "331127"
	                    },
	                    {
	                        "value": "龙泉市",
	                        "code": "331181"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "安徽省",
	        "code": "340000",
	        "children": [
	            {
	                "value": "合肥市",
	                "code": "340100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "340101"
	                    },
	                    {
	                        "value": "瑶海区",
	                        "code": "340102"
	                    },
	                    {
	                        "value": "庐阳区",
	                        "code": "340103"
	                    },
	                    {
	                        "value": "蜀山区",
	                        "code": "340104"
	                    },
	                    {
	                        "value": "包河区",
	                        "code": "340111"
	                    },
	                    {
	                        "value": "长丰县",
	                        "code": "340121"
	                    },
	                    {
	                        "value": "肥东县",
	                        "code": "340122"
	                    },
	                    {
	                        "value": "肥西县",
	                        "code": "340123"
	                    },
	                    {
	                        "value": "庐江县",
	                        "code": "340124"
	                    },
	                    {
	                        "value": "巢湖市",
	                        "code": "340181"
	                    }
	                ]
	            },
	            {
	                "value": "芜湖市",
	                "code": "340200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "340201"
	                    },
	                    {
	                        "value": "镜湖区",
	                        "code": "340202"
	                    },
	                    {
	                        "value": "弋江区",
	                        "code": "340203"
	                    },
	                    {
	                        "value": "鸠江区",
	                        "code": "340207"
	                    },
	                    {
	                        "value": "三山区",
	                        "code": "340208"
	                    },
	                    {
	                        "value": "芜湖县",
	                        "code": "340221"
	                    },
	                    {
	                        "value": "繁昌县",
	                        "code": "340222"
	                    },
	                    {
	                        "value": "南陵县",
	                        "code": "340223"
	                    },
	                    {
	                        "value": "无为县",
	                        "code": "340225"
	                    }
	                ]
	            },
	            {
	                "value": "蚌埠市",
	                "code": "340300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "340301"
	                    },
	                    {
	                        "value": "龙子湖区",
	                        "code": "340302"
	                    },
	                    {
	                        "value": "蚌山区",
	                        "code": "340303"
	                    },
	                    {
	                        "value": "禹会区",
	                        "code": "340304"
	                    },
	                    {
	                        "value": "淮上区",
	                        "code": "340311"
	                    },
	                    {
	                        "value": "怀远县",
	                        "code": "340321"
	                    },
	                    {
	                        "value": "五河县",
	                        "code": "340322"
	                    },
	                    {
	                        "value": "固镇县",
	                        "code": "340323"
	                    }
	                ]
	            },
	            {
	                "value": "淮南市",
	                "code": "340400",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "340401"
	                    },
	                    {
	                        "value": "大通区",
	                        "code": "340402"
	                    },
	                    {
	                        "value": "田家庵区",
	                        "code": "340403"
	                    },
	                    {
	                        "value": "谢家集区",
	                        "code": "340404"
	                    },
	                    {
	                        "value": "八公山区",
	                        "code": "340405"
	                    },
	                    {
	                        "value": "潘集区",
	                        "code": "340406"
	                    },
	                    {
	                        "value": "凤台县",
	                        "code": "340421"
	                    },
	                    {
	                        "value": "寿县",
	                        "code": "340422"
	                    }
	                ]
	            },
	            {
	                "value": "马鞍山市",
	                "code": "340500",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "340501"
	                    },
	                    {
	                        "value": "花山区",
	                        "code": "340503"
	                    },
	                    {
	                        "value": "雨山区",
	                        "code": "340504"
	                    },
	                    {
	                        "value": "博望区",
	                        "code": "340506"
	                    },
	                    {
	                        "value": "当涂县",
	                        "code": "340521"
	                    },
	                    {
	                        "value": "含山县",
	                        "code": "340522"
	                    },
	                    {
	                        "value": "和县",
	                        "code": "340523"
	                    }
	                ]
	            },
	            {
	                "value": "淮北市",
	                "code": "340600",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "340601"
	                    },
	                    {
	                        "value": "杜集区",
	                        "code": "340602"
	                    },
	                    {
	                        "value": "相山区",
	                        "code": "340603"
	                    },
	                    {
	                        "value": "烈山区",
	                        "code": "340604"
	                    },
	                    {
	                        "value": "濉溪县",
	                        "code": "340621"
	                    }
	                ]
	            },
	            {
	                "value": "铜陵市",
	                "code": "340700",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "340701"
	                    },
	                    {
	                        "value": "铜官区",
	                        "code": "340705"
	                    },
	                    {
	                        "value": "义安区",
	                        "code": "340706"
	                    },
	                    {
	                        "value": "郊区",
	                        "code": "340711"
	                    },
	                    {
	                        "value": "枞阳县",
	                        "code": "340722"
	                    }
	                ]
	            },
	            {
	                "value": "安庆市",
	                "code": "340800",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "340801"
	                    },
	                    {
	                        "value": "迎江区",
	                        "code": "340802"
	                    },
	                    {
	                        "value": "大观区",
	                        "code": "340803"
	                    },
	                    {
	                        "value": "宜秀区",
	                        "code": "340811"
	                    },
	                    {
	                        "value": "怀宁县",
	                        "code": "340822"
	                    },
	                    {
	                        "value": "潜山县",
	                        "code": "340824"
	                    },
	                    {
	                        "value": "太湖县",
	                        "code": "340825"
	                    },
	                    {
	                        "value": "宿松县",
	                        "code": "340826"
	                    },
	                    {
	                        "value": "望江县",
	                        "code": "340827"
	                    },
	                    {
	                        "value": "岳西县",
	                        "code": "340828"
	                    },
	                    {
	                        "value": "桐城市",
	                        "code": "340881"
	                    }
	                ]
	            },
	            {
	                "value": "黄山市",
	                "code": "341000",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "341001"
	                    },
	                    {
	                        "value": "屯溪区",
	                        "code": "341002"
	                    },
	                    {
	                        "value": "黄山区",
	                        "code": "341003"
	                    },
	                    {
	                        "value": "徽州区",
	                        "code": "341004"
	                    },
	                    {
	                        "value": "歙县",
	                        "code": "341021"
	                    },
	                    {
	                        "value": "休宁县",
	                        "code": "341022"
	                    },
	                    {
	                        "value": "黟县",
	                        "code": "341023"
	                    },
	                    {
	                        "value": "祁门县",
	                        "code": "341024"
	                    }
	                ]
	            },
	            {
	                "value": "滁州市",
	                "code": "341100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "341101"
	                    },
	                    {
	                        "value": "琅琊区",
	                        "code": "341102"
	                    },
	                    {
	                        "value": "南谯区",
	                        "code": "341103"
	                    },
	                    {
	                        "value": "来安县",
	                        "code": "341122"
	                    },
	                    {
	                        "value": "全椒县",
	                        "code": "341124"
	                    },
	                    {
	                        "value": "定远县",
	                        "code": "341125"
	                    },
	                    {
	                        "value": "凤阳县",
	                        "code": "341126"
	                    },
	                    {
	                        "value": "天长市",
	                        "code": "341181"
	                    },
	                    {
	                        "value": "明光市",
	                        "code": "341182"
	                    }
	                ]
	            },
	            {
	                "value": "阜阳市",
	                "code": "341200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "341201"
	                    },
	                    {
	                        "value": "颍州区",
	                        "code": "341202"
	                    },
	                    {
	                        "value": "颍东区",
	                        "code": "341203"
	                    },
	                    {
	                        "value": "颍泉区",
	                        "code": "341204"
	                    },
	                    {
	                        "value": "临泉县",
	                        "code": "341221"
	                    },
	                    {
	                        "value": "太和县",
	                        "code": "341222"
	                    },
	                    {
	                        "value": "阜南县",
	                        "code": "341225"
	                    },
	                    {
	                        "value": "颍上县",
	                        "code": "341226"
	                    },
	                    {
	                        "value": "界首市",
	                        "code": "341282"
	                    }
	                ]
	            },
	            {
	                "value": "宿州市",
	                "code": "341300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "341301"
	                    },
	                    {
	                        "value": "埇桥区",
	                        "code": "341302"
	                    },
	                    {
	                        "value": "砀山县",
	                        "code": "341321"
	                    },
	                    {
	                        "value": "萧县",
	                        "code": "341322"
	                    },
	                    {
	                        "value": "灵璧县",
	                        "code": "341323"
	                    },
	                    {
	                        "value": "泗县",
	                        "code": "341324"
	                    }
	                ]
	            },
	            {
	                "value": "六安市",
	                "code": "341500",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "341501"
	                    },
	                    {
	                        "value": "金安区",
	                        "code": "341502"
	                    },
	                    {
	                        "value": "裕安区",
	                        "code": "341503"
	                    },
	                    {
	                        "value": "叶集区",
	                        "code": "341504"
	                    },
	                    {
	                        "value": "霍邱县",
	                        "code": "341522"
	                    },
	                    {
	                        "value": "舒城县",
	                        "code": "341523"
	                    },
	                    {
	                        "value": "金寨县",
	                        "code": "341524"
	                    },
	                    {
	                        "value": "霍山县",
	                        "code": "341525"
	                    }
	                ]
	            },
	            {
	                "value": "亳州市",
	                "code": "341600",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "341601"
	                    },
	                    {
	                        "value": "谯城区",
	                        "code": "341602"
	                    },
	                    {
	                        "value": "涡阳县",
	                        "code": "341621"
	                    },
	                    {
	                        "value": "蒙城县",
	                        "code": "341622"
	                    },
	                    {
	                        "value": "利辛县",
	                        "code": "341623"
	                    }
	                ]
	            },
	            {
	                "value": "池州市",
	                "code": "341700",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "341701"
	                    },
	                    {
	                        "value": "贵池区",
	                        "code": "341702"
	                    },
	                    {
	                        "value": "东至县",
	                        "code": "341721"
	                    },
	                    {
	                        "value": "石台县",
	                        "code": "341722"
	                    },
	                    {
	                        "value": "青阳县",
	                        "code": "341723"
	                    }
	                ]
	            },
	            {
	                "value": "宣城市",
	                "code": "341800",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "341801"
	                    },
	                    {
	                        "value": "宣州区",
	                        "code": "341802"
	                    },
	                    {
	                        "value": "郎溪县",
	                        "code": "341821"
	                    },
	                    {
	                        "value": "广德县",
	                        "code": "341822"
	                    },
	                    {
	                        "value": "泾县",
	                        "code": "341823"
	                    },
	                    {
	                        "value": "绩溪县",
	                        "code": "341824"
	                    },
	                    {
	                        "value": "旌德县",
	                        "code": "341825"
	                    },
	                    {
	                        "value": "宁国市",
	                        "code": "341881"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "福建省",
	        "code": "350000",
	        "children": [
	            {
	                "value": "福州市",
	                "code": "350100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "350101"
	                    },
	                    {
	                        "value": "鼓楼区",
	                        "code": "350102"
	                    },
	                    {
	                        "value": "台江区",
	                        "code": "350103"
	                    },
	                    {
	                        "value": "仓山区",
	                        "code": "350104"
	                    },
	                    {
	                        "value": "马尾区",
	                        "code": "350105"
	                    },
	                    {
	                        "value": "晋安区",
	                        "code": "350111"
	                    },
	                    {
	                        "value": "闽侯县",
	                        "code": "350121"
	                    },
	                    {
	                        "value": "连江县",
	                        "code": "350122"
	                    },
	                    {
	                        "value": "罗源县",
	                        "code": "350123"
	                    },
	                    {
	                        "value": "闽清县",
	                        "code": "350124"
	                    },
	                    {
	                        "value": "永泰县",
	                        "code": "350125"
	                    },
	                    {
	                        "value": "平潭县",
	                        "code": "350128"
	                    },
	                    {
	                        "value": "福清市",
	                        "code": "350181"
	                    },
	                    {
	                        "value": "长乐市",
	                        "code": "350182"
	                    }
	                ]
	            },
	            {
	                "value": "厦门市",
	                "code": "350200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "350201"
	                    },
	                    {
	                        "value": "思明区",
	                        "code": "350203"
	                    },
	                    {
	                        "value": "海沧区",
	                        "code": "350205"
	                    },
	                    {
	                        "value": "湖里区",
	                        "code": "350206"
	                    },
	                    {
	                        "value": "集美区",
	                        "code": "350211"
	                    },
	                    {
	                        "value": "同安区",
	                        "code": "350212"
	                    },
	                    {
	                        "value": "翔安区",
	                        "code": "350213"
	                    }
	                ]
	            },
	            {
	                "value": "莆田市",
	                "code": "350300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "350301"
	                    },
	                    {
	                        "value": "城厢区",
	                        "code": "350302"
	                    },
	                    {
	                        "value": "涵江区",
	                        "code": "350303"
	                    },
	                    {
	                        "value": "荔城区",
	                        "code": "350304"
	                    },
	                    {
	                        "value": "秀屿区",
	                        "code": "350305"
	                    },
	                    {
	                        "value": "仙游县",
	                        "code": "350322"
	                    }
	                ]
	            },
	            {
	                "value": "三明市",
	                "code": "350400",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "350401"
	                    },
	                    {
	                        "value": "梅列区",
	                        "code": "350402"
	                    },
	                    {
	                        "value": "三元区",
	                        "code": "350403"
	                    },
	                    {
	                        "value": "明溪县",
	                        "code": "350421"
	                    },
	                    {
	                        "value": "清流县",
	                        "code": "350423"
	                    },
	                    {
	                        "value": "宁化县",
	                        "code": "350424"
	                    },
	                    {
	                        "value": "大田县",
	                        "code": "350425"
	                    },
	                    {
	                        "value": "尤溪县",
	                        "code": "350426"
	                    },
	                    {
	                        "value": "沙县",
	                        "code": "350427"
	                    },
	                    {
	                        "value": "将乐县",
	                        "code": "350428"
	                    },
	                    {
	                        "value": "泰宁县",
	                        "code": "350429"
	                    },
	                    {
	                        "value": "建宁县",
	                        "code": "350430"
	                    },
	                    {
	                        "value": "永安市",
	                        "code": "350481"
	                    }
	                ]
	            },
	            {
	                "value": "泉州市",
	                "code": "350500",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "350501"
	                    },
	                    {
	                        "value": "鲤城区",
	                        "code": "350502"
	                    },
	                    {
	                        "value": "丰泽区",
	                        "code": "350503"
	                    },
	                    {
	                        "value": "洛江区",
	                        "code": "350504"
	                    },
	                    {
	                        "value": "泉港区",
	                        "code": "350505"
	                    },
	                    {
	                        "value": "惠安县",
	                        "code": "350521"
	                    },
	                    {
	                        "value": "安溪县",
	                        "code": "350524"
	                    },
	                    {
	                        "value": "永春县",
	                        "code": "350525"
	                    },
	                    {
	                        "value": "德化县",
	                        "code": "350526"
	                    },
	                    {
	                        "value": "金门县",
	                        "code": "350527"
	                    },
	                    {
	                        "value": "石狮市",
	                        "code": "350581"
	                    },
	                    {
	                        "value": "晋江市",
	                        "code": "350582"
	                    },
	                    {
	                        "value": "南安市",
	                        "code": "350583"
	                    }
	                ]
	            },
	            {
	                "value": "漳州市",
	                "code": "350600",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "350601"
	                    },
	                    {
	                        "value": "芗城区",
	                        "code": "350602"
	                    },
	                    {
	                        "value": "龙文区",
	                        "code": "350603"
	                    },
	                    {
	                        "value": "云霄县",
	                        "code": "350622"
	                    },
	                    {
	                        "value": "漳浦县",
	                        "code": "350623"
	                    },
	                    {
	                        "value": "诏安县",
	                        "code": "350624"
	                    },
	                    {
	                        "value": "长泰县",
	                        "code": "350625"
	                    },
	                    {
	                        "value": "东山县",
	                        "code": "350626"
	                    },
	                    {
	                        "value": "南靖县",
	                        "code": "350627"
	                    },
	                    {
	                        "value": "平和县",
	                        "code": "350628"
	                    },
	                    {
	                        "value": "华安县",
	                        "code": "350629"
	                    },
	                    {
	                        "value": "龙海市",
	                        "code": "350681"
	                    }
	                ]
	            },
	            {
	                "value": "南平市",
	                "code": "350700",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "350701"
	                    },
	                    {
	                        "value": "延平区",
	                        "code": "350702"
	                    },
	                    {
	                        "value": "建阳区",
	                        "code": "350703"
	                    },
	                    {
	                        "value": "顺昌县",
	                        "code": "350721"
	                    },
	                    {
	                        "value": "浦城县",
	                        "code": "350722"
	                    },
	                    {
	                        "value": "光泽县",
	                        "code": "350723"
	                    },
	                    {
	                        "value": "松溪县",
	                        "code": "350724"
	                    },
	                    {
	                        "value": "政和县",
	                        "code": "350725"
	                    },
	                    {
	                        "value": "邵武市",
	                        "code": "350781"
	                    },
	                    {
	                        "value": "武夷山市",
	                        "code": "350782"
	                    },
	                    {
	                        "value": "建瓯市",
	                        "code": "350783"
	                    }
	                ]
	            },
	            {
	                "value": "龙岩市",
	                "code": "350800",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "350801"
	                    },
	                    {
	                        "value": "新罗区",
	                        "code": "350802"
	                    },
	                    {
	                        "value": "永定区",
	                        "code": "350803"
	                    },
	                    {
	                        "value": "长汀县",
	                        "code": "350821"
	                    },
	                    {
	                        "value": "上杭县",
	                        "code": "350823"
	                    },
	                    {
	                        "value": "武平县",
	                        "code": "350824"
	                    },
	                    {
	                        "value": "连城县",
	                        "code": "350825"
	                    },
	                    {
	                        "value": "漳平市",
	                        "code": "350881"
	                    }
	                ]
	            },
	            {
	                "value": "宁德市",
	                "code": "350900",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "350901"
	                    },
	                    {
	                        "value": "蕉城区",
	                        "code": "350902"
	                    },
	                    {
	                        "value": "霞浦县",
	                        "code": "350921"
	                    },
	                    {
	                        "value": "古田县",
	                        "code": "350922"
	                    },
	                    {
	                        "value": "屏南县",
	                        "code": "350923"
	                    },
	                    {
	                        "value": "寿宁县",
	                        "code": "350924"
	                    },
	                    {
	                        "value": "周宁县",
	                        "code": "350925"
	                    },
	                    {
	                        "value": "柘荣县",
	                        "code": "350926"
	                    },
	                    {
	                        "value": "福安市",
	                        "code": "350981"
	                    },
	                    {
	                        "value": "福鼎市",
	                        "code": "350982"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "江西省",
	        "code": "360000",
	        "children": [
	            {
	                "value": "南昌市",
	                "code": "360100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "360101"
	                    },
	                    {
	                        "value": "东湖区",
	                        "code": "360102"
	                    },
	                    {
	                        "value": "西湖区",
	                        "code": "360103"
	                    },
	                    {
	                        "value": "青云谱区",
	                        "code": "360104"
	                    },
	                    {
	                        "value": "湾里区",
	                        "code": "360105"
	                    },
	                    {
	                        "value": "青山湖区",
	                        "code": "360111"
	                    },
	                    {
	                        "value": "新建区",
	                        "code": "360112"
	                    },
	                    {
	                        "value": "南昌县",
	                        "code": "360121"
	                    },
	                    {
	                        "value": "安义县",
	                        "code": "360123"
	                    },
	                    {
	                        "value": "进贤县",
	                        "code": "360124"
	                    }
	                ]
	            },
	            {
	                "value": "景德镇市",
	                "code": "360200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "360201"
	                    },
	                    {
	                        "value": "昌江区",
	                        "code": "360202"
	                    },
	                    {
	                        "value": "珠山区",
	                        "code": "360203"
	                    },
	                    {
	                        "value": "浮梁县",
	                        "code": "360222"
	                    },
	                    {
	                        "value": "乐平市",
	                        "code": "360281"
	                    }
	                ]
	            },
	            {
	                "value": "萍乡市",
	                "code": "360300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "360301"
	                    },
	                    {
	                        "value": "安源区",
	                        "code": "360302"
	                    },
	                    {
	                        "value": "湘东区",
	                        "code": "360313"
	                    },
	                    {
	                        "value": "莲花县",
	                        "code": "360321"
	                    },
	                    {
	                        "value": "上栗县",
	                        "code": "360322"
	                    },
	                    {
	                        "value": "芦溪县",
	                        "code": "360323"
	                    }
	                ]
	            },
	            {
	                "value": "九江市",
	                "code": "360400",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "360401"
	                    },
	                    {
	                        "value": "濂溪区",
	                        "code": "360402"
	                    },
	                    {
	                        "value": "浔阳区",
	                        "code": "360403"
	                    },
	                    {
	                        "value": "九江县",
	                        "code": "360421"
	                    },
	                    {
	                        "value": "武宁县",
	                        "code": "360423"
	                    },
	                    {
	                        "value": "修水县",
	                        "code": "360424"
	                    },
	                    {
	                        "value": "永修县",
	                        "code": "360425"
	                    },
	                    {
	                        "value": "德安县",
	                        "code": "360426"
	                    },
	                    {
	                        "value": "都昌县",
	                        "code": "360428"
	                    },
	                    {
	                        "value": "湖口县",
	                        "code": "360429"
	                    },
	                    {
	                        "value": "彭泽县",
	                        "code": "360430"
	                    },
	                    {
	                        "value": "瑞昌市",
	                        "code": "360481"
	                    },
	                    {
	                        "value": "共青城市",
	                        "code": "360482"
	                    },
	                    {
	                        "value": "庐山市",
	                        "code": "360483"
	                    }
	                ]
	            },
	            {
	                "value": "新余市",
	                "code": "360500",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "360501"
	                    },
	                    {
	                        "value": "渝水区",
	                        "code": "360502"
	                    },
	                    {
	                        "value": "分宜县",
	                        "code": "360521"
	                    }
	                ]
	            },
	            {
	                "value": "鹰潭市",
	                "code": "360600",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "360601"
	                    },
	                    {
	                        "value": "月湖区",
	                        "code": "360602"
	                    },
	                    {
	                        "value": "余江县",
	                        "code": "360622"
	                    },
	                    {
	                        "value": "贵溪市",
	                        "code": "360681"
	                    }
	                ]
	            },
	            {
	                "value": "赣州市",
	                "code": "360700",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "360701"
	                    },
	                    {
	                        "value": "章贡区",
	                        "code": "360702"
	                    },
	                    {
	                        "value": "南康区",
	                        "code": "360703"
	                    },
	                    {
	                        "value": "赣县",
	                        "code": "360721"
	                    },
	                    {
	                        "value": "信丰县",
	                        "code": "360722"
	                    },
	                    {
	                        "value": "大余县",
	                        "code": "360723"
	                    },
	                    {
	                        "value": "上犹县",
	                        "code": "360724"
	                    },
	                    {
	                        "value": "崇义县",
	                        "code": "360725"
	                    },
	                    {
	                        "value": "安远县",
	                        "code": "360726"
	                    },
	                    {
	                        "value": "龙南县",
	                        "code": "360727"
	                    },
	                    {
	                        "value": "定南县",
	                        "code": "360728"
	                    },
	                    {
	                        "value": "全南县",
	                        "code": "360729"
	                    },
	                    {
	                        "value": "宁都县",
	                        "code": "360730"
	                    },
	                    {
	                        "value": "于都县",
	                        "code": "360731"
	                    },
	                    {
	                        "value": "兴国县",
	                        "code": "360732"
	                    },
	                    {
	                        "value": "会昌县",
	                        "code": "360733"
	                    },
	                    {
	                        "value": "寻乌县",
	                        "code": "360734"
	                    },
	                    {
	                        "value": "石城县",
	                        "code": "360735"
	                    },
	                    {
	                        "value": "瑞金市",
	                        "code": "360781"
	                    }
	                ]
	            },
	            {
	                "value": "吉安市",
	                "code": "360800",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "360801"
	                    },
	                    {
	                        "value": "吉州区",
	                        "code": "360802"
	                    },
	                    {
	                        "value": "青原区",
	                        "code": "360803"
	                    },
	                    {
	                        "value": "吉安县",
	                        "code": "360821"
	                    },
	                    {
	                        "value": "吉水县",
	                        "code": "360822"
	                    },
	                    {
	                        "value": "峡江县",
	                        "code": "360823"
	                    },
	                    {
	                        "value": "新干县",
	                        "code": "360824"
	                    },
	                    {
	                        "value": "永丰县",
	                        "code": "360825"
	                    },
	                    {
	                        "value": "泰和县",
	                        "code": "360826"
	                    },
	                    {
	                        "value": "遂川县",
	                        "code": "360827"
	                    },
	                    {
	                        "value": "万安县",
	                        "code": "360828"
	                    },
	                    {
	                        "value": "安福县",
	                        "code": "360829"
	                    },
	                    {
	                        "value": "永新县",
	                        "code": "360830"
	                    },
	                    {
	                        "value": "井冈山市",
	                        "code": "360881"
	                    }
	                ]
	            },
	            {
	                "value": "宜春市",
	                "code": "360900",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "360901"
	                    },
	                    {
	                        "value": "袁州区",
	                        "code": "360902"
	                    },
	                    {
	                        "value": "奉新县",
	                        "code": "360921"
	                    },
	                    {
	                        "value": "万载县",
	                        "code": "360922"
	                    },
	                    {
	                        "value": "上高县",
	                        "code": "360923"
	                    },
	                    {
	                        "value": "宜丰县",
	                        "code": "360924"
	                    },
	                    {
	                        "value": "靖安县",
	                        "code": "360925"
	                    },
	                    {
	                        "value": "铜鼓县",
	                        "code": "360926"
	                    },
	                    {
	                        "value": "丰城市",
	                        "code": "360981"
	                    },
	                    {
	                        "value": "樟树市",
	                        "code": "360982"
	                    },
	                    {
	                        "value": "高安市",
	                        "code": "360983"
	                    }
	                ]
	            },
	            {
	                "value": "抚州市",
	                "code": "361000",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "361001"
	                    },
	                    {
	                        "value": "临川区",
	                        "code": "361002"
	                    },
	                    {
	                        "value": "南城县",
	                        "code": "361021"
	                    },
	                    {
	                        "value": "黎川县",
	                        "code": "361022"
	                    },
	                    {
	                        "value": "南丰县",
	                        "code": "361023"
	                    },
	                    {
	                        "value": "崇仁县",
	                        "code": "361024"
	                    },
	                    {
	                        "value": "乐安县",
	                        "code": "361025"
	                    },
	                    {
	                        "value": "宜黄县",
	                        "code": "361026"
	                    },
	                    {
	                        "value": "金溪县",
	                        "code": "361027"
	                    },
	                    {
	                        "value": "资溪县",
	                        "code": "361028"
	                    },
	                    {
	                        "value": "东乡县",
	                        "code": "361029"
	                    },
	                    {
	                        "value": "广昌县",
	                        "code": "361030"
	                    }
	                ]
	            },
	            {
	                "value": "上饶市",
	                "code": "361100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "361101"
	                    },
	                    {
	                        "value": "信州区",
	                        "code": "361102"
	                    },
	                    {
	                        "value": "广丰区",
	                        "code": "361103"
	                    },
	                    {
	                        "value": "上饶县",
	                        "code": "361121"
	                    },
	                    {
	                        "value": "玉山县",
	                        "code": "361123"
	                    },
	                    {
	                        "value": "铅山县",
	                        "code": "361124"
	                    },
	                    {
	                        "value": "横峰县",
	                        "code": "361125"
	                    },
	                    {
	                        "value": "弋阳县",
	                        "code": "361126"
	                    },
	                    {
	                        "value": "余干县",
	                        "code": "361127"
	                    },
	                    {
	                        "value": "鄱阳县",
	                        "code": "361128"
	                    },
	                    {
	                        "value": "万年县",
	                        "code": "361129"
	                    },
	                    {
	                        "value": "婺源县",
	                        "code": "361130"
	                    },
	                    {
	                        "value": "德兴市",
	                        "code": "361181"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "山东省",
	        "code": "370000",
	        "children": [
	            {
	                "value": "济南市",
	                "code": "370100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "370101"
	                    },
	                    {
	                        "value": "历下区",
	                        "code": "370102"
	                    },
	                    {
	                        "value": "市中区",
	                        "code": "370103"
	                    },
	                    {
	                        "value": "槐荫区",
	                        "code": "370104"
	                    },
	                    {
	                        "value": "天桥区",
	                        "code": "370105"
	                    },
	                    {
	                        "value": "历城区",
	                        "code": "370112"
	                    },
	                    {
	                        "value": "长清区",
	                        "code": "370113"
	                    },
	                    {
	                        "value": "平阴县",
	                        "code": "370124"
	                    },
	                    {
	                        "value": "济阳县",
	                        "code": "370125"
	                    },
	                    {
	                        "value": "商河县",
	                        "code": "370126"
	                    },
	                    {
	                        "value": "章丘市",
	                        "code": "370181"
	                    }
	                ]
	            },
	            {
	                "value": "青岛市",
	                "code": "370200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "370201"
	                    },
	                    {
	                        "value": "市南区",
	                        "code": "370202"
	                    },
	                    {
	                        "value": "市北区",
	                        "code": "370203"
	                    },
	                    {
	                        "value": "黄岛区",
	                        "code": "370211"
	                    },
	                    {
	                        "value": "崂山区",
	                        "code": "370212"
	                    },
	                    {
	                        "value": "李沧区",
	                        "code": "370213"
	                    },
	                    {
	                        "value": "城阳区",
	                        "code": "370214"
	                    },
	                    {
	                        "value": "胶州市",
	                        "code": "370281"
	                    },
	                    {
	                        "value": "即墨市",
	                        "code": "370282"
	                    },
	                    {
	                        "value": "平度市",
	                        "code": "370283"
	                    },
	                    {
	                        "value": "莱西市",
	                        "code": "370285"
	                    }
	                ]
	            },
	            {
	                "value": "淄博市",
	                "code": "370300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "370301"
	                    },
	                    {
	                        "value": "淄川区",
	                        "code": "370302"
	                    },
	                    {
	                        "value": "张店区",
	                        "code": "370303"
	                    },
	                    {
	                        "value": "博山区",
	                        "code": "370304"
	                    },
	                    {
	                        "value": "临淄区",
	                        "code": "370305"
	                    },
	                    {
	                        "value": "周村区",
	                        "code": "370306"
	                    },
	                    {
	                        "value": "桓台县",
	                        "code": "370321"
	                    },
	                    {
	                        "value": "高青县",
	                        "code": "370322"
	                    },
	                    {
	                        "value": "沂源县",
	                        "code": "370323"
	                    }
	                ]
	            },
	            {
	                "value": "枣庄市",
	                "code": "370400",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "370401"
	                    },
	                    {
	                        "value": "市中区",
	                        "code": "370402"
	                    },
	                    {
	                        "value": "薛城区",
	                        "code": "370403"
	                    },
	                    {
	                        "value": "峄城区",
	                        "code": "370404"
	                    },
	                    {
	                        "value": "台儿庄区",
	                        "code": "370405"
	                    },
	                    {
	                        "value": "山亭区",
	                        "code": "370406"
	                    },
	                    {
	                        "value": "滕州市",
	                        "code": "370481"
	                    }
	                ]
	            },
	            {
	                "value": "东营市",
	                "code": "370500",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "370501"
	                    },
	                    {
	                        "value": "东营区",
	                        "code": "370502"
	                    },
	                    {
	                        "value": "河口区",
	                        "code": "370503"
	                    },
	                    {
	                        "value": "垦利区",
	                        "code": "370505"
	                    },
	                    {
	                        "value": "利津县",
	                        "code": "370522"
	                    },
	                    {
	                        "value": "广饶县",
	                        "code": "370523"
	                    }
	                ]
	            },
	            {
	                "value": "烟台市",
	                "code": "370600",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "370601"
	                    },
	                    {
	                        "value": "芝罘区",
	                        "code": "370602"
	                    },
	                    {
	                        "value": "福山区",
	                        "code": "370611"
	                    },
	                    {
	                        "value": "牟平区",
	                        "code": "370612"
	                    },
	                    {
	                        "value": "莱山区",
	                        "code": "370613"
	                    },
	                    {
	                        "value": "长岛县",
	                        "code": "370634"
	                    },
	                    {
	                        "value": "龙口市",
	                        "code": "370681"
	                    },
	                    {
	                        "value": "莱阳市",
	                        "code": "370682"
	                    },
	                    {
	                        "value": "莱州市",
	                        "code": "370683"
	                    },
	                    {
	                        "value": "蓬莱市",
	                        "code": "370684"
	                    },
	                    {
	                        "value": "招远市",
	                        "code": "370685"
	                    },
	                    {
	                        "value": "栖霞市",
	                        "code": "370686"
	                    },
	                    {
	                        "value": "海阳市",
	                        "code": "370687"
	                    }
	                ]
	            },
	            {
	                "value": "潍坊市",
	                "code": "370700",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "370701"
	                    },
	                    {
	                        "value": "潍城区",
	                        "code": "370702"
	                    },
	                    {
	                        "value": "寒亭区",
	                        "code": "370703"
	                    },
	                    {
	                        "value": "坊子区",
	                        "code": "370704"
	                    },
	                    {
	                        "value": "奎文区",
	                        "code": "370705"
	                    },
	                    {
	                        "value": "临朐县",
	                        "code": "370724"
	                    },
	                    {
	                        "value": "昌乐县",
	                        "code": "370725"
	                    },
	                    {
	                        "value": "青州市",
	                        "code": "370781"
	                    },
	                    {
	                        "value": "诸城市",
	                        "code": "370782"
	                    },
	                    {
	                        "value": "寿光市",
	                        "code": "370783"
	                    },
	                    {
	                        "value": "安丘市",
	                        "code": "370784"
	                    },
	                    {
	                        "value": "高密市",
	                        "code": "370785"
	                    },
	                    {
	                        "value": "昌邑市",
	                        "code": "370786"
	                    }
	                ]
	            },
	            {
	                "value": "济宁市",
	                "code": "370800",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "370801"
	                    },
	                    {
	                        "value": "任城区",
	                        "code": "370811"
	                    },
	                    {
	                        "value": "兖州区",
	                        "code": "370812"
	                    },
	                    {
	                        "value": "微山县",
	                        "code": "370826"
	                    },
	                    {
	                        "value": "鱼台县",
	                        "code": "370827"
	                    },
	                    {
	                        "value": "金乡县",
	                        "code": "370828"
	                    },
	                    {
	                        "value": "嘉祥县",
	                        "code": "370829"
	                    },
	                    {
	                        "value": "汶上县",
	                        "code": "370830"
	                    },
	                    {
	                        "value": "泗水县",
	                        "code": "370831"
	                    },
	                    {
	                        "value": "梁山县",
	                        "code": "370832"
	                    },
	                    {
	                        "value": "曲阜市",
	                        "code": "370881"
	                    },
	                    {
	                        "value": "邹城市",
	                        "code": "370883"
	                    }
	                ]
	            },
	            {
	                "value": "泰安市",
	                "code": "370900",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "370901"
	                    },
	                    {
	                        "value": "泰山区",
	                        "code": "370902"
	                    },
	                    {
	                        "value": "岱岳区",
	                        "code": "370911"
	                    },
	                    {
	                        "value": "宁阳县",
	                        "code": "370921"
	                    },
	                    {
	                        "value": "东平县",
	                        "code": "370923"
	                    },
	                    {
	                        "value": "新泰市",
	                        "code": "370982"
	                    },
	                    {
	                        "value": "肥城市",
	                        "code": "370983"
	                    }
	                ]
	            },
	            {
	                "value": "威海市",
	                "code": "371000",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "371001"
	                    },
	                    {
	                        "value": "环翠区",
	                        "code": "371002"
	                    },
	                    {
	                        "value": "文登区",
	                        "code": "371003"
	                    },
	                    {
	                        "value": "荣成市",
	                        "code": "371082"
	                    },
	                    {
	                        "value": "乳山市",
	                        "code": "371083"
	                    }
	                ]
	            },
	            {
	                "value": "日照市",
	                "code": "371100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "371101"
	                    },
	                    {
	                        "value": "东港区",
	                        "code": "371102"
	                    },
	                    {
	                        "value": "岚山区",
	                        "code": "371103"
	                    },
	                    {
	                        "value": "五莲县",
	                        "code": "371121"
	                    },
	                    {
	                        "value": "莒县",
	                        "code": "371122"
	                    }
	                ]
	            },
	            {
	                "value": "莱芜市",
	                "code": "371200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "371201"
	                    },
	                    {
	                        "value": "莱城区",
	                        "code": "371202"
	                    },
	                    {
	                        "value": "钢城区",
	                        "code": "371203"
	                    }
	                ]
	            },
	            {
	                "value": "临沂市",
	                "code": "371300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "371301"
	                    },
	                    {
	                        "value": "兰山区",
	                        "code": "371302"
	                    },
	                    {
	                        "value": "罗庄区",
	                        "code": "371311"
	                    },
	                    {
	                        "value": "河东区",
	                        "code": "371312"
	                    },
	                    {
	                        "value": "沂南县",
	                        "code": "371321"
	                    },
	                    {
	                        "value": "郯城县",
	                        "code": "371322"
	                    },
	                    {
	                        "value": "沂水县",
	                        "code": "371323"
	                    },
	                    {
	                        "value": "兰陵县",
	                        "code": "371324"
	                    },
	                    {
	                        "value": "费县",
	                        "code": "371325"
	                    },
	                    {
	                        "value": "平邑县",
	                        "code": "371326"
	                    },
	                    {
	                        "value": "莒南县",
	                        "code": "371327"
	                    },
	                    {
	                        "value": "蒙阴县",
	                        "code": "371328"
	                    },
	                    {
	                        "value": "临沭县",
	                        "code": "371329"
	                    }
	                ]
	            },
	            {
	                "value": "德州市",
	                "code": "371400",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "371401"
	                    },
	                    {
	                        "value": "德城区",
	                        "code": "371402"
	                    },
	                    {
	                        "value": "陵城区",
	                        "code": "371403"
	                    },
	                    {
	                        "value": "宁津县",
	                        "code": "371422"
	                    },
	                    {
	                        "value": "庆云县",
	                        "code": "371423"
	                    },
	                    {
	                        "value": "临邑县",
	                        "code": "371424"
	                    },
	                    {
	                        "value": "齐河县",
	                        "code": "371425"
	                    },
	                    {
	                        "value": "平原县",
	                        "code": "371426"
	                    },
	                    {
	                        "value": "夏津县",
	                        "code": "371427"
	                    },
	                    {
	                        "value": "武城县",
	                        "code": "371428"
	                    },
	                    {
	                        "value": "乐陵市",
	                        "code": "371481"
	                    },
	                    {
	                        "value": "禹城市",
	                        "code": "371482"
	                    }
	                ]
	            },
	            {
	                "value": "聊城市",
	                "code": "371500",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "371501"
	                    },
	                    {
	                        "value": "东昌府区",
	                        "code": "371502"
	                    },
	                    {
	                        "value": "阳谷县",
	                        "code": "371521"
	                    },
	                    {
	                        "value": "莘县",
	                        "code": "371522"
	                    },
	                    {
	                        "value": "茌平县",
	                        "code": "371523"
	                    },
	                    {
	                        "value": "东阿县",
	                        "code": "371524"
	                    },
	                    {
	                        "value": "冠县",
	                        "code": "371525"
	                    },
	                    {
	                        "value": "高唐县",
	                        "code": "371526"
	                    },
	                    {
	                        "value": "临清市",
	                        "code": "371581"
	                    }
	                ]
	            },
	            {
	                "value": "滨州市",
	                "code": "371600",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "371601"
	                    },
	                    {
	                        "value": "滨城区",
	                        "code": "371602"
	                    },
	                    {
	                        "value": "沾化区",
	                        "code": "371603"
	                    },
	                    {
	                        "value": "惠民县",
	                        "code": "371621"
	                    },
	                    {
	                        "value": "阳信县",
	                        "code": "371622"
	                    },
	                    {
	                        "value": "无棣县",
	                        "code": "371623"
	                    },
	                    {
	                        "value": "博兴县",
	                        "code": "371625"
	                    },
	                    {
	                        "value": "邹平县",
	                        "code": "371626"
	                    }
	                ]
	            },
	            {
	                "value": "菏泽市",
	                "code": "371700",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "371701"
	                    },
	                    {
	                        "value": "牡丹区",
	                        "code": "371702"
	                    },
	                    {
	                        "value": "定陶区",
	                        "code": "371703"
	                    },
	                    {
	                        "value": "曹县",
	                        "code": "371721"
	                    },
	                    {
	                        "value": "单县",
	                        "code": "371722"
	                    },
	                    {
	                        "value": "成武县",
	                        "code": "371723"
	                    },
	                    {
	                        "value": "巨野县",
	                        "code": "371724"
	                    },
	                    {
	                        "value": "郓城县",
	                        "code": "371725"
	                    },
	                    {
	                        "value": "鄄城县",
	                        "code": "371726"
	                    },
	                    {
	                        "value": "东明县",
	                        "code": "371728"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "河南省",
	        "code": "410000",
	        "children": [
	            {
	                "value": "郑州市",
	                "code": "410100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "410101"
	                    },
	                    {
	                        "value": "中原区",
	                        "code": "410102"
	                    },
	                    {
	                        "value": "二七区",
	                        "code": "410103"
	                    },
	                    {
	                        "value": "管城回族区",
	                        "code": "410104"
	                    },
	                    {
	                        "value": "金水区",
	                        "code": "410105"
	                    },
	                    {
	                        "value": "上街区",
	                        "code": "410106"
	                    },
	                    {
	                        "value": "惠济区",
	                        "code": "410108"
	                    },
	                    {
	                        "value": "中牟县",
	                        "code": "410122"
	                    },
	                    {
	                        "value": "巩义市",
	                        "code": "410181"
	                    },
	                    {
	                        "value": "荥阳市",
	                        "code": "410182"
	                    },
	                    {
	                        "value": "新密市",
	                        "code": "410183"
	                    },
	                    {
	                        "value": "新郑市",
	                        "code": "410184"
	                    },
	                    {
	                        "value": "登封市",
	                        "code": "410185"
	                    }
	                ]
	            },
	            {
	                "value": "开封市",
	                "code": "410200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "410201"
	                    },
	                    {
	                        "value": "龙亭区",
	                        "code": "410202"
	                    },
	                    {
	                        "value": "顺河回族区",
	                        "code": "410203"
	                    },
	                    {
	                        "value": "鼓楼区",
	                        "code": "410204"
	                    },
	                    {
	                        "value": "禹王台区",
	                        "code": "410205"
	                    },
	                    {
	                        "value": "金明区",
	                        "code": "410211"
	                    },
	                    {
	                        "value": "祥符区",
	                        "code": "410212"
	                    },
	                    {
	                        "value": "杞县",
	                        "code": "410221"
	                    },
	                    {
	                        "value": "通许县",
	                        "code": "410222"
	                    },
	                    {
	                        "value": "尉氏县",
	                        "code": "410223"
	                    },
	                    {
	                        "value": "兰考县",
	                        "code": "410225"
	                    }
	                ]
	            },
	            {
	                "value": "洛阳市",
	                "code": "410300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "410301"
	                    },
	                    {
	                        "value": "老城区",
	                        "code": "410302"
	                    },
	                    {
	                        "value": "西工区",
	                        "code": "410303"
	                    },
	                    {
	                        "value": "瀍河回族区",
	                        "code": "410304"
	                    },
	                    {
	                        "value": "涧西区",
	                        "code": "410305"
	                    },
	                    {
	                        "value": "吉利区",
	                        "code": "410306"
	                    },
	                    {
	                        "value": "洛龙区",
	                        "code": "410311"
	                    },
	                    {
	                        "value": "孟津县",
	                        "code": "410322"
	                    },
	                    {
	                        "value": "新安县",
	                        "code": "410323"
	                    },
	                    {
	                        "value": "栾川县",
	                        "code": "410324"
	                    },
	                    {
	                        "value": "嵩县",
	                        "code": "410325"
	                    },
	                    {
	                        "value": "汝阳县",
	                        "code": "410326"
	                    },
	                    {
	                        "value": "宜阳县",
	                        "code": "410327"
	                    },
	                    {
	                        "value": "洛宁县",
	                        "code": "410328"
	                    },
	                    {
	                        "value": "伊川县",
	                        "code": "410329"
	                    },
	                    {
	                        "value": "偃师市",
	                        "code": "410381"
	                    }
	                ]
	            },
	            {
	                "value": "平顶山市",
	                "code": "410400",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "410401"
	                    },
	                    {
	                        "value": "新华区",
	                        "code": "410402"
	                    },
	                    {
	                        "value": "卫东区",
	                        "code": "410403"
	                    },
	                    {
	                        "value": "石龙区",
	                        "code": "410404"
	                    },
	                    {
	                        "value": "湛河区",
	                        "code": "410411"
	                    },
	                    {
	                        "value": "宝丰县",
	                        "code": "410421"
	                    },
	                    {
	                        "value": "叶县",
	                        "code": "410422"
	                    },
	                    {
	                        "value": "鲁山县",
	                        "code": "410423"
	                    },
	                    {
	                        "value": "郏县",
	                        "code": "410425"
	                    },
	                    {
	                        "value": "舞钢市",
	                        "code": "410481"
	                    },
	                    {
	                        "value": "汝州市",
	                        "code": "410482"
	                    }
	                ]
	            },
	            {
	                "value": "安阳市",
	                "code": "410500",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "410501"
	                    },
	                    {
	                        "value": "文峰区",
	                        "code": "410502"
	                    },
	                    {
	                        "value": "北关区",
	                        "code": "410503"
	                    },
	                    {
	                        "value": "殷都区",
	                        "code": "410505"
	                    },
	                    {
	                        "value": "龙安区",
	                        "code": "410506"
	                    },
	                    {
	                        "value": "安阳县",
	                        "code": "410522"
	                    },
	                    {
	                        "value": "汤阴县",
	                        "code": "410523"
	                    },
	                    {
	                        "value": "滑县",
	                        "code": "410526"
	                    },
	                    {
	                        "value": "内黄县",
	                        "code": "410527"
	                    },
	                    {
	                        "value": "林州市",
	                        "code": "410581"
	                    }
	                ]
	            },
	            {
	                "value": "鹤壁市",
	                "code": "410600",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "410601"
	                    },
	                    {
	                        "value": "鹤山区",
	                        "code": "410602"
	                    },
	                    {
	                        "value": "山城区",
	                        "code": "410603"
	                    },
	                    {
	                        "value": "淇滨区",
	                        "code": "410611"
	                    },
	                    {
	                        "value": "浚县",
	                        "code": "410621"
	                    },
	                    {
	                        "value": "淇县",
	                        "code": "410622"
	                    }
	                ]
	            },
	            {
	                "value": "新乡市",
	                "code": "410700",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "410701"
	                    },
	                    {
	                        "value": "红旗区",
	                        "code": "410702"
	                    },
	                    {
	                        "value": "卫滨区",
	                        "code": "410703"
	                    },
	                    {
	                        "value": "凤泉区",
	                        "code": "410704"
	                    },
	                    {
	                        "value": "牧野区",
	                        "code": "410711"
	                    },
	                    {
	                        "value": "新乡县",
	                        "code": "410721"
	                    },
	                    {
	                        "value": "获嘉县",
	                        "code": "410724"
	                    },
	                    {
	                        "value": "原阳县",
	                        "code": "410725"
	                    },
	                    {
	                        "value": "延津县",
	                        "code": "410726"
	                    },
	                    {
	                        "value": "封丘县",
	                        "code": "410727"
	                    },
	                    {
	                        "value": "长垣县",
	                        "code": "410728"
	                    },
	                    {
	                        "value": "卫辉市",
	                        "code": "410781"
	                    },
	                    {
	                        "value": "辉县市",
	                        "code": "410782"
	                    }
	                ]
	            },
	            {
	                "value": "焦作市",
	                "code": "410800",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "410801"
	                    },
	                    {
	                        "value": "解放区",
	                        "code": "410802"
	                    },
	                    {
	                        "value": "中站区",
	                        "code": "410803"
	                    },
	                    {
	                        "value": "马村区",
	                        "code": "410804"
	                    },
	                    {
	                        "value": "山阳区",
	                        "code": "410811"
	                    },
	                    {
	                        "value": "修武县",
	                        "code": "410821"
	                    },
	                    {
	                        "value": "博爱县",
	                        "code": "410822"
	                    },
	                    {
	                        "value": "武陟县",
	                        "code": "410823"
	                    },
	                    {
	                        "value": "温县",
	                        "code": "410825"
	                    },
	                    {
	                        "value": "沁阳市",
	                        "code": "410882"
	                    },
	                    {
	                        "value": "孟州市",
	                        "code": "410883"
	                    }
	                ]
	            },
	            {
	                "value": "濮阳市",
	                "code": "410900",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "410901"
	                    },
	                    {
	                        "value": "华龙区",
	                        "code": "410902"
	                    },
	                    {
	                        "value": "清丰县",
	                        "code": "410922"
	                    },
	                    {
	                        "value": "南乐县",
	                        "code": "410923"
	                    },
	                    {
	                        "value": "范县",
	                        "code": "410926"
	                    },
	                    {
	                        "value": "台前县",
	                        "code": "410927"
	                    },
	                    {
	                        "value": "濮阳县",
	                        "code": "410928"
	                    }
	                ]
	            },
	            {
	                "value": "许昌市",
	                "code": "411000",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "411001"
	                    },
	                    {
	                        "value": "魏都区",
	                        "code": "411002"
	                    },
	                    {
	                        "value": "许昌县",
	                        "code": "411023"
	                    },
	                    {
	                        "value": "鄢陵县",
	                        "code": "411024"
	                    },
	                    {
	                        "value": "襄城县",
	                        "code": "411025"
	                    },
	                    {
	                        "value": "禹州市",
	                        "code": "411081"
	                    },
	                    {
	                        "value": "长葛市",
	                        "code": "411082"
	                    }
	                ]
	            },
	            {
	                "value": "漯河市",
	                "code": "411100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "411101"
	                    },
	                    {
	                        "value": "源汇区",
	                        "code": "411102"
	                    },
	                    {
	                        "value": "郾城区",
	                        "code": "411103"
	                    },
	                    {
	                        "value": "召陵区",
	                        "code": "411104"
	                    },
	                    {
	                        "value": "舞阳县",
	                        "code": "411121"
	                    },
	                    {
	                        "value": "临颍县",
	                        "code": "411122"
	                    }
	                ]
	            },
	            {
	                "value": "三门峡市",
	                "code": "411200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "411201"
	                    },
	                    {
	                        "value": "湖滨区",
	                        "code": "411202"
	                    },
	                    {
	                        "value": "陕州区",
	                        "code": "411203"
	                    },
	                    {
	                        "value": "渑池县",
	                        "code": "411221"
	                    },
	                    {
	                        "value": "卢氏县",
	                        "code": "411224"
	                    },
	                    {
	                        "value": "义马市",
	                        "code": "411281"
	                    },
	                    {
	                        "value": "灵宝市",
	                        "code": "411282"
	                    }
	                ]
	            },
	            {
	                "value": "南阳市",
	                "code": "411300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "411301"
	                    },
	                    {
	                        "value": "宛城区",
	                        "code": "411302"
	                    },
	                    {
	                        "value": "卧龙区",
	                        "code": "411303"
	                    },
	                    {
	                        "value": "南召县",
	                        "code": "411321"
	                    },
	                    {
	                        "value": "方城县",
	                        "code": "411322"
	                    },
	                    {
	                        "value": "西峡县",
	                        "code": "411323"
	                    },
	                    {
	                        "value": "镇平县",
	                        "code": "411324"
	                    },
	                    {
	                        "value": "内乡县",
	                        "code": "411325"
	                    },
	                    {
	                        "value": "淅川县",
	                        "code": "411326"
	                    },
	                    {
	                        "value": "社旗县",
	                        "code": "411327"
	                    },
	                    {
	                        "value": "唐河县",
	                        "code": "411328"
	                    },
	                    {
	                        "value": "新野县",
	                        "code": "411329"
	                    },
	                    {
	                        "value": "桐柏县",
	                        "code": "411330"
	                    },
	                    {
	                        "value": "邓州市",
	                        "code": "411381"
	                    }
	                ]
	            },
	            {
	                "value": "商丘市",
	                "code": "411400",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "411401"
	                    },
	                    {
	                        "value": "梁园区",
	                        "code": "411402"
	                    },
	                    {
	                        "value": "睢阳区",
	                        "code": "411403"
	                    },
	                    {
	                        "value": "民权县",
	                        "code": "411421"
	                    },
	                    {
	                        "value": "睢县",
	                        "code": "411422"
	                    },
	                    {
	                        "value": "宁陵县",
	                        "code": "411423"
	                    },
	                    {
	                        "value": "柘城县",
	                        "code": "411424"
	                    },
	                    {
	                        "value": "虞城县",
	                        "code": "411425"
	                    },
	                    {
	                        "value": "夏邑县",
	                        "code": "411426"
	                    },
	                    {
	                        "value": "永城市",
	                        "code": "411481"
	                    }
	                ]
	            },
	            {
	                "value": "信阳市",
	                "code": "411500",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "411501"
	                    },
	                    {
	                        "value": "浉河区",
	                        "code": "411502"
	                    },
	                    {
	                        "value": "平桥区",
	                        "code": "411503"
	                    },
	                    {
	                        "value": "罗山县",
	                        "code": "411521"
	                    },
	                    {
	                        "value": "光山县",
	                        "code": "411522"
	                    },
	                    {
	                        "value": "新县",
	                        "code": "411523"
	                    },
	                    {
	                        "value": "商城县",
	                        "code": "411524"
	                    },
	                    {
	                        "value": "固始县",
	                        "code": "411525"
	                    },
	                    {
	                        "value": "潢川县",
	                        "code": "411526"
	                    },
	                    {
	                        "value": "淮滨县",
	                        "code": "411527"
	                    },
	                    {
	                        "value": "息县",
	                        "code": "411528"
	                    }
	                ]
	            },
	            {
	                "value": "周口市",
	                "code": "411600",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "411601"
	                    },
	                    {
	                        "value": "川汇区",
	                        "code": "411602"
	                    },
	                    {
	                        "value": "扶沟县",
	                        "code": "411621"
	                    },
	                    {
	                        "value": "西华县",
	                        "code": "411622"
	                    },
	                    {
	                        "value": "商水县",
	                        "code": "411623"
	                    },
	                    {
	                        "value": "沈丘县",
	                        "code": "411624"
	                    },
	                    {
	                        "value": "郸城县",
	                        "code": "411625"
	                    },
	                    {
	                        "value": "淮阳县",
	                        "code": "411626"
	                    },
	                    {
	                        "value": "太康县",
	                        "code": "411627"
	                    },
	                    {
	                        "value": "鹿邑县",
	                        "code": "411628"
	                    },
	                    {
	                        "value": "项城市",
	                        "code": "411681"
	                    }
	                ]
	            },
	            {
	                "value": "驻马店市",
	                "code": "411700",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "411701"
	                    },
	                    {
	                        "value": "驿城区",
	                        "code": "411702"
	                    },
	                    {
	                        "value": "西平县",
	                        "code": "411721"
	                    },
	                    {
	                        "value": "上蔡县",
	                        "code": "411722"
	                    },
	                    {
	                        "value": "平舆县",
	                        "code": "411723"
	                    },
	                    {
	                        "value": "正阳县",
	                        "code": "411724"
	                    },
	                    {
	                        "value": "确山县",
	                        "code": "411725"
	                    },
	                    {
	                        "value": "泌阳县",
	                        "code": "411726"
	                    },
	                    {
	                        "value": "汝南县",
	                        "code": "411727"
	                    },
	                    {
	                        "value": "遂平县",
	                        "code": "411728"
	                    },
	                    {
	                        "value": "新蔡县",
	                        "code": "411729"
	                    }
	                ]
	            },
	            {
	                "value": "省直辖县级行政区划",
	                "code": "419000",
	                "children": [
	                    {
	                        "value": "济源市",
	                        "code": "419001"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "湖北省",
	        "code": "420000",
	        "children": [
	            {
	                "value": "武汉市",
	                "code": "420100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "420101"
	                    },
	                    {
	                        "value": "江岸区",
	                        "code": "420102"
	                    },
	                    {
	                        "value": "江汉区",
	                        "code": "420103"
	                    },
	                    {
	                        "value": "硚口区",
	                        "code": "420104"
	                    },
	                    {
	                        "value": "汉阳区",
	                        "code": "420105"
	                    },
	                    {
	                        "value": "武昌区",
	                        "code": "420106"
	                    },
	                    {
	                        "value": "青山区",
	                        "code": "420107"
	                    },
	                    {
	                        "value": "洪山区",
	                        "code": "420111"
	                    },
	                    {
	                        "value": "东西湖区",
	                        "code": "420112"
	                    },
	                    {
	                        "value": "汉南区",
	                        "code": "420113"
	                    },
	                    {
	                        "value": "蔡甸区",
	                        "code": "420114"
	                    },
	                    {
	                        "value": "江夏区",
	                        "code": "420115"
	                    },
	                    {
	                        "value": "黄陂区",
	                        "code": "420116"
	                    },
	                    {
	                        "value": "新洲区",
	                        "code": "420117"
	                    }
	                ]
	            },
	            {
	                "value": "黄石市",
	                "code": "420200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "420201"
	                    },
	                    {
	                        "value": "黄石港区",
	                        "code": "420202"
	                    },
	                    {
	                        "value": "西塞山区",
	                        "code": "420203"
	                    },
	                    {
	                        "value": "下陆区",
	                        "code": "420204"
	                    },
	                    {
	                        "value": "铁山区",
	                        "code": "420205"
	                    },
	                    {
	                        "value": "阳新县",
	                        "code": "420222"
	                    },
	                    {
	                        "value": "大冶市",
	                        "code": "420281"
	                    }
	                ]
	            },
	            {
	                "value": "十堰市",
	                "code": "420300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "420301"
	                    },
	                    {
	                        "value": "茅箭区",
	                        "code": "420302"
	                    },
	                    {
	                        "value": "张湾区",
	                        "code": "420303"
	                    },
	                    {
	                        "value": "郧阳区",
	                        "code": "420304"
	                    },
	                    {
	                        "value": "郧西县",
	                        "code": "420322"
	                    },
	                    {
	                        "value": "竹山县",
	                        "code": "420323"
	                    },
	                    {
	                        "value": "竹溪县",
	                        "code": "420324"
	                    },
	                    {
	                        "value": "房县",
	                        "code": "420325"
	                    },
	                    {
	                        "value": "丹江口市",
	                        "code": "420381"
	                    }
	                ]
	            },
	            {
	                "value": "宜昌市",
	                "code": "420500",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "420501"
	                    },
	                    {
	                        "value": "西陵区",
	                        "code": "420502"
	                    },
	                    {
	                        "value": "伍家岗区",
	                        "code": "420503"
	                    },
	                    {
	                        "value": "点军区",
	                        "code": "420504"
	                    },
	                    {
	                        "value": "猇亭区",
	                        "code": "420505"
	                    },
	                    {
	                        "value": "夷陵区",
	                        "code": "420506"
	                    },
	                    {
	                        "value": "远安县",
	                        "code": "420525"
	                    },
	                    {
	                        "value": "兴山县",
	                        "code": "420526"
	                    },
	                    {
	                        "value": "秭归县",
	                        "code": "420527"
	                    },
	                    {
	                        "value": "长阳土家族自治县",
	                        "code": "420528"
	                    },
	                    {
	                        "value": "五峰土家族自治县",
	                        "code": "420529"
	                    },
	                    {
	                        "value": "宜都市",
	                        "code": "420581"
	                    },
	                    {
	                        "value": "当阳市",
	                        "code": "420582"
	                    },
	                    {
	                        "value": "枝江市",
	                        "code": "420583"
	                    }
	                ]
	            },
	            {
	                "value": "襄阳市",
	                "code": "420600",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "420601"
	                    },
	                    {
	                        "value": "襄城区",
	                        "code": "420602"
	                    },
	                    {
	                        "value": "樊城区",
	                        "code": "420606"
	                    },
	                    {
	                        "value": "襄州区",
	                        "code": "420607"
	                    },
	                    {
	                        "value": "南漳县",
	                        "code": "420624"
	                    },
	                    {
	                        "value": "谷城县",
	                        "code": "420625"
	                    },
	                    {
	                        "value": "保康县",
	                        "code": "420626"
	                    },
	                    {
	                        "value": "老河口市",
	                        "code": "420682"
	                    },
	                    {
	                        "value": "枣阳市",
	                        "code": "420683"
	                    },
	                    {
	                        "value": "宜城市",
	                        "code": "420684"
	                    }
	                ]
	            },
	            {
	                "value": "鄂州市",
	                "code": "420700",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "420701"
	                    },
	                    {
	                        "value": "梁子湖区",
	                        "code": "420702"
	                    },
	                    {
	                        "value": "华容区",
	                        "code": "420703"
	                    },
	                    {
	                        "value": "鄂城区",
	                        "code": "420704"
	                    }
	                ]
	            },
	            {
	                "value": "荆门市",
	                "code": "420800",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "420801"
	                    },
	                    {
	                        "value": "东宝区",
	                        "code": "420802"
	                    },
	                    {
	                        "value": "掇刀区",
	                        "code": "420804"
	                    },
	                    {
	                        "value": "京山县",
	                        "code": "420821"
	                    },
	                    {
	                        "value": "沙洋县",
	                        "code": "420822"
	                    },
	                    {
	                        "value": "钟祥市",
	                        "code": "420881"
	                    }
	                ]
	            },
	            {
	                "value": "孝感市",
	                "code": "420900",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "420901"
	                    },
	                    {
	                        "value": "孝南区",
	                        "code": "420902"
	                    },
	                    {
	                        "value": "孝昌县",
	                        "code": "420921"
	                    },
	                    {
	                        "value": "大悟县",
	                        "code": "420922"
	                    },
	                    {
	                        "value": "云梦县",
	                        "code": "420923"
	                    },
	                    {
	                        "value": "应城市",
	                        "code": "420981"
	                    },
	                    {
	                        "value": "安陆市",
	                        "code": "420982"
	                    },
	                    {
	                        "value": "汉川市",
	                        "code": "420984"
	                    }
	                ]
	            },
	            {
	                "value": "荆州市",
	                "code": "421000",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "421001"
	                    },
	                    {
	                        "value": "沙市区",
	                        "code": "421002"
	                    },
	                    {
	                        "value": "荆州区",
	                        "code": "421003"
	                    },
	                    {
	                        "value": "公安县",
	                        "code": "421022"
	                    },
	                    {
	                        "value": "监利县",
	                        "code": "421023"
	                    },
	                    {
	                        "value": "江陵县",
	                        "code": "421024"
	                    },
	                    {
	                        "value": "石首市",
	                        "code": "421081"
	                    },
	                    {
	                        "value": "洪湖市",
	                        "code": "421083"
	                    },
	                    {
	                        "value": "松滋市",
	                        "code": "421087"
	                    }
	                ]
	            },
	            {
	                "value": "黄冈市",
	                "code": "421100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "421101"
	                    },
	                    {
	                        "value": "黄州区",
	                        "code": "421102"
	                    },
	                    {
	                        "value": "团风县",
	                        "code": "421121"
	                    },
	                    {
	                        "value": "红安县",
	                        "code": "421122"
	                    },
	                    {
	                        "value": "罗田县",
	                        "code": "421123"
	                    },
	                    {
	                        "value": "英山县",
	                        "code": "421124"
	                    },
	                    {
	                        "value": "浠水县",
	                        "code": "421125"
	                    },
	                    {
	                        "value": "蕲春县",
	                        "code": "421126"
	                    },
	                    {
	                        "value": "黄梅县",
	                        "code": "421127"
	                    },
	                    {
	                        "value": "麻城市",
	                        "code": "421181"
	                    },
	                    {
	                        "value": "武穴市",
	                        "code": "421182"
	                    }
	                ]
	            },
	            {
	                "value": "咸宁市",
	                "code": "421200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "421201"
	                    },
	                    {
	                        "value": "咸安区",
	                        "code": "421202"
	                    },
	                    {
	                        "value": "嘉鱼县",
	                        "code": "421221"
	                    },
	                    {
	                        "value": "通城县",
	                        "code": "421222"
	                    },
	                    {
	                        "value": "崇阳县",
	                        "code": "421223"
	                    },
	                    {
	                        "value": "通山县",
	                        "code": "421224"
	                    },
	                    {
	                        "value": "赤壁市",
	                        "code": "421281"
	                    }
	                ]
	            },
	            {
	                "value": "随州市",
	                "code": "421300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "421301"
	                    },
	                    {
	                        "value": "曾都区",
	                        "code": "421303"
	                    },
	                    {
	                        "value": "随县",
	                        "code": "421321"
	                    },
	                    {
	                        "value": "广水市",
	                        "code": "421381"
	                    }
	                ]
	            },
	            {
	                "value": "恩施土家族苗族自治州",
	                "code": "422800",
	                "children": [
	                    {
	                        "value": "恩施市",
	                        "code": "422801"
	                    },
	                    {
	                        "value": "利川市",
	                        "code": "422802"
	                    },
	                    {
	                        "value": "建始县",
	                        "code": "422822"
	                    },
	                    {
	                        "value": "巴东县",
	                        "code": "422823"
	                    },
	                    {
	                        "value": "宣恩县",
	                        "code": "422825"
	                    },
	                    {
	                        "value": "咸丰县",
	                        "code": "422826"
	                    },
	                    {
	                        "value": "来凤县",
	                        "code": "422827"
	                    },
	                    {
	                        "value": "鹤峰县",
	                        "code": "422828"
	                    }
	                ]
	            },
	            {
	                "value": "省直辖县级行政区划",
	                "code": "429000",
	                "children": [
	                    {
	                        "value": "仙桃市",
	                        "code": "429004"
	                    },
	                    {
	                        "value": "潜江市",
	                        "code": "429005"
	                    },
	                    {
	                        "value": "天门市",
	                        "code": "429006"
	                    },
	                    {
	                        "value": "神农架林区",
	                        "code": "429021"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "湖南省",
	        "code": "430000",
	        "children": [
	            {
	                "value": "长沙市",
	                "code": "430100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "430101"
	                    },
	                    {
	                        "value": "芙蓉区",
	                        "code": "430102"
	                    },
	                    {
	                        "value": "天心区",
	                        "code": "430103"
	                    },
	                    {
	                        "value": "岳麓区",
	                        "code": "430104"
	                    },
	                    {
	                        "value": "开福区",
	                        "code": "430105"
	                    },
	                    {
	                        "value": "雨花区",
	                        "code": "430111"
	                    },
	                    {
	                        "value": "望城区",
	                        "code": "430112"
	                    },
	                    {
	                        "value": "长沙县",
	                        "code": "430121"
	                    },
	                    {
	                        "value": "宁乡县",
	                        "code": "430124"
	                    },
	                    {
	                        "value": "浏阳市",
	                        "code": "430181"
	                    }
	                ]
	            },
	            {
	                "value": "株洲市",
	                "code": "430200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "430201"
	                    },
	                    {
	                        "value": "荷塘区",
	                        "code": "430202"
	                    },
	                    {
	                        "value": "芦淞区",
	                        "code": "430203"
	                    },
	                    {
	                        "value": "石峰区",
	                        "code": "430204"
	                    },
	                    {
	                        "value": "天元区",
	                        "code": "430211"
	                    },
	                    {
	                        "value": "株洲县",
	                        "code": "430221"
	                    },
	                    {
	                        "value": "攸县",
	                        "code": "430223"
	                    },
	                    {
	                        "value": "茶陵县",
	                        "code": "430224"
	                    },
	                    {
	                        "value": "炎陵县",
	                        "code": "430225"
	                    },
	                    {
	                        "value": "醴陵市",
	                        "code": "430281"
	                    }
	                ]
	            },
	            {
	                "value": "湘潭市",
	                "code": "430300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "430301"
	                    },
	                    {
	                        "value": "雨湖区",
	                        "code": "430302"
	                    },
	                    {
	                        "value": "岳塘区",
	                        "code": "430304"
	                    },
	                    {
	                        "value": "湘潭县",
	                        "code": "430321"
	                    },
	                    {
	                        "value": "湘乡市",
	                        "code": "430381"
	                    },
	                    {
	                        "value": "韶山市",
	                        "code": "430382"
	                    }
	                ]
	            },
	            {
	                "value": "衡阳市",
	                "code": "430400",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "430401"
	                    },
	                    {
	                        "value": "珠晖区",
	                        "code": "430405"
	                    },
	                    {
	                        "value": "雁峰区",
	                        "code": "430406"
	                    },
	                    {
	                        "value": "石鼓区",
	                        "code": "430407"
	                    },
	                    {
	                        "value": "蒸湘区",
	                        "code": "430408"
	                    },
	                    {
	                        "value": "南岳区",
	                        "code": "430412"
	                    },
	                    {
	                        "value": "衡阳县",
	                        "code": "430421"
	                    },
	                    {
	                        "value": "衡南县",
	                        "code": "430422"
	                    },
	                    {
	                        "value": "衡山县",
	                        "code": "430423"
	                    },
	                    {
	                        "value": "衡东县",
	                        "code": "430424"
	                    },
	                    {
	                        "value": "祁东县",
	                        "code": "430426"
	                    },
	                    {
	                        "value": "耒阳市",
	                        "code": "430481"
	                    },
	                    {
	                        "value": "常宁市",
	                        "code": "430482"
	                    }
	                ]
	            },
	            {
	                "value": "邵阳市",
	                "code": "430500",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "430501"
	                    },
	                    {
	                        "value": "双清区",
	                        "code": "430502"
	                    },
	                    {
	                        "value": "大祥区",
	                        "code": "430503"
	                    },
	                    {
	                        "value": "北塔区",
	                        "code": "430511"
	                    },
	                    {
	                        "value": "邵东县",
	                        "code": "430521"
	                    },
	                    {
	                        "value": "新邵县",
	                        "code": "430522"
	                    },
	                    {
	                        "value": "邵阳县",
	                        "code": "430523"
	                    },
	                    {
	                        "value": "隆回县",
	                        "code": "430524"
	                    },
	                    {
	                        "value": "洞口县",
	                        "code": "430525"
	                    },
	                    {
	                        "value": "绥宁县",
	                        "code": "430527"
	                    },
	                    {
	                        "value": "新宁县",
	                        "code": "430528"
	                    },
	                    {
	                        "value": "城步苗族自治县",
	                        "code": "430529"
	                    },
	                    {
	                        "value": "武冈市",
	                        "code": "430581"
	                    }
	                ]
	            },
	            {
	                "value": "岳阳市",
	                "code": "430600",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "430601"
	                    },
	                    {
	                        "value": "岳阳楼区",
	                        "code": "430602"
	                    },
	                    {
	                        "value": "云溪区",
	                        "code": "430603"
	                    },
	                    {
	                        "value": "君山区",
	                        "code": "430611"
	                    },
	                    {
	                        "value": "岳阳县",
	                        "code": "430621"
	                    },
	                    {
	                        "value": "华容县",
	                        "code": "430623"
	                    },
	                    {
	                        "value": "湘阴县",
	                        "code": "430624"
	                    },
	                    {
	                        "value": "平江县",
	                        "code": "430626"
	                    },
	                    {
	                        "value": "汨罗市",
	                        "code": "430681"
	                    },
	                    {
	                        "value": "临湘市",
	                        "code": "430682"
	                    }
	                ]
	            },
	            {
	                "value": "常德市",
	                "code": "430700",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "430701"
	                    },
	                    {
	                        "value": "武陵区",
	                        "code": "430702"
	                    },
	                    {
	                        "value": "鼎城区",
	                        "code": "430703"
	                    },
	                    {
	                        "value": "安乡县",
	                        "code": "430721"
	                    },
	                    {
	                        "value": "汉寿县",
	                        "code": "430722"
	                    },
	                    {
	                        "value": "澧县",
	                        "code": "430723"
	                    },
	                    {
	                        "value": "临澧县",
	                        "code": "430724"
	                    },
	                    {
	                        "value": "桃源县",
	                        "code": "430725"
	                    },
	                    {
	                        "value": "石门县",
	                        "code": "430726"
	                    },
	                    {
	                        "value": "津市市",
	                        "code": "430781"
	                    }
	                ]
	            },
	            {
	                "value": "张家界市",
	                "code": "430800",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "430801"
	                    },
	                    {
	                        "value": "永定区",
	                        "code": "430802"
	                    },
	                    {
	                        "value": "武陵源区",
	                        "code": "430811"
	                    },
	                    {
	                        "value": "慈利县",
	                        "code": "430821"
	                    },
	                    {
	                        "value": "桑植县",
	                        "code": "430822"
	                    }
	                ]
	            },
	            {
	                "value": "益阳市",
	                "code": "430900",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "430901"
	                    },
	                    {
	                        "value": "资阳区",
	                        "code": "430902"
	                    },
	                    {
	                        "value": "赫山区",
	                        "code": "430903"
	                    },
	                    {
	                        "value": "南县",
	                        "code": "430921"
	                    },
	                    {
	                        "value": "桃江县",
	                        "code": "430922"
	                    },
	                    {
	                        "value": "安化县",
	                        "code": "430923"
	                    },
	                    {
	                        "value": "沅江市",
	                        "code": "430981"
	                    }
	                ]
	            },
	            {
	                "value": "郴州市",
	                "code": "431000",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "431001"
	                    },
	                    {
	                        "value": "北湖区",
	                        "code": "431002"
	                    },
	                    {
	                        "value": "苏仙区",
	                        "code": "431003"
	                    },
	                    {
	                        "value": "桂阳县",
	                        "code": "431021"
	                    },
	                    {
	                        "value": "宜章县",
	                        "code": "431022"
	                    },
	                    {
	                        "value": "永兴县",
	                        "code": "431023"
	                    },
	                    {
	                        "value": "嘉禾县",
	                        "code": "431024"
	                    },
	                    {
	                        "value": "临武县",
	                        "code": "431025"
	                    },
	                    {
	                        "value": "汝城县",
	                        "code": "431026"
	                    },
	                    {
	                        "value": "桂东县",
	                        "code": "431027"
	                    },
	                    {
	                        "value": "安仁县",
	                        "code": "431028"
	                    },
	                    {
	                        "value": "资兴市",
	                        "code": "431081"
	                    }
	                ]
	            },
	            {
	                "value": "永州市",
	                "code": "431100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "431101"
	                    },
	                    {
	                        "value": "零陵区",
	                        "code": "431102"
	                    },
	                    {
	                        "value": "冷水滩区",
	                        "code": "431103"
	                    },
	                    {
	                        "value": "祁阳县",
	                        "code": "431121"
	                    },
	                    {
	                        "value": "东安县",
	                        "code": "431122"
	                    },
	                    {
	                        "value": "双牌县",
	                        "code": "431123"
	                    },
	                    {
	                        "value": "道县",
	                        "code": "431124"
	                    },
	                    {
	                        "value": "江永县",
	                        "code": "431125"
	                    },
	                    {
	                        "value": "宁远县",
	                        "code": "431126"
	                    },
	                    {
	                        "value": "蓝山县",
	                        "code": "431127"
	                    },
	                    {
	                        "value": "新田县",
	                        "code": "431128"
	                    },
	                    {
	                        "value": "江华瑶族自治县",
	                        "code": "431129"
	                    }
	                ]
	            },
	            {
	                "value": "怀化市",
	                "code": "431200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "431201"
	                    },
	                    {
	                        "value": "鹤城区",
	                        "code": "431202"
	                    },
	                    {
	                        "value": "中方县",
	                        "code": "431221"
	                    },
	                    {
	                        "value": "沅陵县",
	                        "code": "431222"
	                    },
	                    {
	                        "value": "辰溪县",
	                        "code": "431223"
	                    },
	                    {
	                        "value": "溆浦县",
	                        "code": "431224"
	                    },
	                    {
	                        "value": "会同县",
	                        "code": "431225"
	                    },
	                    {
	                        "value": "麻阳苗族自治县",
	                        "code": "431226"
	                    },
	                    {
	                        "value": "新晃侗族自治县",
	                        "code": "431227"
	                    },
	                    {
	                        "value": "芷江侗族自治县",
	                        "code": "431228"
	                    },
	                    {
	                        "value": "靖州苗族侗族自治县",
	                        "code": "431229"
	                    },
	                    {
	                        "value": "通道侗族自治县",
	                        "code": "431230"
	                    },
	                    {
	                        "value": "洪江市",
	                        "code": "431281"
	                    }
	                ]
	            },
	            {
	                "value": "娄底市",
	                "code": "431300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "431301"
	                    },
	                    {
	                        "value": "娄星区",
	                        "code": "431302"
	                    },
	                    {
	                        "value": "双峰县",
	                        "code": "431321"
	                    },
	                    {
	                        "value": "新化县",
	                        "code": "431322"
	                    },
	                    {
	                        "value": "冷水江市",
	                        "code": "431381"
	                    },
	                    {
	                        "value": "涟源市",
	                        "code": "431382"
	                    }
	                ]
	            },
	            {
	                "value": "湘西土家族苗族自治州",
	                "code": "433100",
	                "children": [
	                    {
	                        "value": "吉首市",
	                        "code": "433101"
	                    },
	                    {
	                        "value": "泸溪县",
	                        "code": "433122"
	                    },
	                    {
	                        "value": "凤凰县",
	                        "code": "433123"
	                    },
	                    {
	                        "value": "花垣县",
	                        "code": "433124"
	                    },
	                    {
	                        "value": "保靖县",
	                        "code": "433125"
	                    },
	                    {
	                        "value": "古丈县",
	                        "code": "433126"
	                    },
	                    {
	                        "value": "永顺县",
	                        "code": "433127"
	                    },
	                    {
	                        "value": "龙山县",
	                        "code": "433130"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "广东省",
	        "code": "440000",
	        "children": [
	            {
	                "value": "广州市",
	                "code": "440100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "440101"
	                    },
	                    {
	                        "value": "荔湾区",
	                        "code": "440103"
	                    },
	                    {
	                        "value": "越秀区",
	                        "code": "440104"
	                    },
	                    {
	                        "value": "海珠区",
	                        "code": "440105"
	                    },
	                    {
	                        "value": "天河区",
	                        "code": "440106"
	                    },
	                    {
	                        "value": "白云区",
	                        "code": "440111"
	                    },
	                    {
	                        "value": "黄埔区",
	                        "code": "440112"
	                    },
	                    {
	                        "value": "番禺区",
	                        "code": "440113"
	                    },
	                    {
	                        "value": "花都区",
	                        "code": "440114"
	                    },
	                    {
	                        "value": "南沙区",
	                        "code": "440115"
	                    },
	                    {
	                        "value": "从化区",
	                        "code": "440117"
	                    },
	                    {
	                        "value": "增城区",
	                        "code": "440118"
	                    }
	                ]
	            },
	            {
	                "value": "韶关市",
	                "code": "440200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "440201"
	                    },
	                    {
	                        "value": "武江区",
	                        "code": "440203"
	                    },
	                    {
	                        "value": "浈江区",
	                        "code": "440204"
	                    },
	                    {
	                        "value": "曲江区",
	                        "code": "440205"
	                    },
	                    {
	                        "value": "始兴县",
	                        "code": "440222"
	                    },
	                    {
	                        "value": "仁化县",
	                        "code": "440224"
	                    },
	                    {
	                        "value": "翁源县",
	                        "code": "440229"
	                    },
	                    {
	                        "value": "乳源瑶族自治县",
	                        "code": "440232"
	                    },
	                    {
	                        "value": "新丰县",
	                        "code": "440233"
	                    },
	                    {
	                        "value": "乐昌市",
	                        "code": "440281"
	                    },
	                    {
	                        "value": "南雄市",
	                        "code": "440282"
	                    }
	                ]
	            },
	            {
	                "value": "深圳市",
	                "code": "440300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "440301"
	                    },
	                    {
	                        "value": "罗湖区",
	                        "code": "440303"
	                    },
	                    {
	                        "value": "福田区",
	                        "code": "440304"
	                    },
	                    {
	                        "value": "南山区",
	                        "code": "440305"
	                    },
	                    {
	                        "value": "宝安区",
	                        "code": "440306"
	                    },
	                    {
	                        "value": "龙岗区",
	                        "code": "440307"
	                    },
	                    {
	                        "value": "盐田区",
	                        "code": "440308"
	                    }
	                ]
	            },
	            {
	                "value": "珠海市",
	                "code": "440400",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "440401"
	                    },
	                    {
	                        "value": "香洲区",
	                        "code": "440402"
	                    },
	                    {
	                        "value": "斗门区",
	                        "code": "440403"
	                    },
	                    {
	                        "value": "金湾区",
	                        "code": "440404"
	                    }
	                ]
	            },
	            {
	                "value": "汕头市",
	                "code": "440500",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "440501"
	                    },
	                    {
	                        "value": "龙湖区",
	                        "code": "440507"
	                    },
	                    {
	                        "value": "金平区",
	                        "code": "440511"
	                    },
	                    {
	                        "value": "濠江区",
	                        "code": "440512"
	                    },
	                    {
	                        "value": "潮阳区",
	                        "code": "440513"
	                    },
	                    {
	                        "value": "潮南区",
	                        "code": "440514"
	                    },
	                    {
	                        "value": "澄海区",
	                        "code": "440515"
	                    },
	                    {
	                        "value": "南澳县",
	                        "code": "440523"
	                    }
	                ]
	            },
	            {
	                "value": "佛山市",
	                "code": "440600",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "440601"
	                    },
	                    {
	                        "value": "禅城区",
	                        "code": "440604"
	                    },
	                    {
	                        "value": "南海区",
	                        "code": "440605"
	                    },
	                    {
	                        "value": "顺德区",
	                        "code": "440606"
	                    },
	                    {
	                        "value": "三水区",
	                        "code": "440607"
	                    },
	                    {
	                        "value": "高明区",
	                        "code": "440608"
	                    }
	                ]
	            },
	            {
	                "value": "江门市",
	                "code": "440700",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "440701"
	                    },
	                    {
	                        "value": "蓬江区",
	                        "code": "440703"
	                    },
	                    {
	                        "value": "江海区",
	                        "code": "440704"
	                    },
	                    {
	                        "value": "新会区",
	                        "code": "440705"
	                    },
	                    {
	                        "value": "台山市",
	                        "code": "440781"
	                    },
	                    {
	                        "value": "开平市",
	                        "code": "440783"
	                    },
	                    {
	                        "value": "鹤山市",
	                        "code": "440784"
	                    },
	                    {
	                        "value": "恩平市",
	                        "code": "440785"
	                    }
	                ]
	            },
	            {
	                "value": "湛江市",
	                "code": "440800",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "440801"
	                    },
	                    {
	                        "value": "赤坎区",
	                        "code": "440802"
	                    },
	                    {
	                        "value": "霞山区",
	                        "code": "440803"
	                    },
	                    {
	                        "value": "坡头区",
	                        "code": "440804"
	                    },
	                    {
	                        "value": "麻章区",
	                        "code": "440811"
	                    },
	                    {
	                        "value": "遂溪县",
	                        "code": "440823"
	                    },
	                    {
	                        "value": "徐闻县",
	                        "code": "440825"
	                    },
	                    {
	                        "value": "廉江市",
	                        "code": "440881"
	                    },
	                    {
	                        "value": "雷州市",
	                        "code": "440882"
	                    },
	                    {
	                        "value": "吴川市",
	                        "code": "440883"
	                    }
	                ]
	            },
	            {
	                "value": "茂名市",
	                "code": "440900",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "440901"
	                    },
	                    {
	                        "value": "茂南区",
	                        "code": "440902"
	                    },
	                    {
	                        "value": "电白区",
	                        "code": "440904"
	                    },
	                    {
	                        "value": "高州市",
	                        "code": "440981"
	                    },
	                    {
	                        "value": "化州市",
	                        "code": "440982"
	                    },
	                    {
	                        "value": "信宜市",
	                        "code": "440983"
	                    }
	                ]
	            },
	            {
	                "value": "肇庆市",
	                "code": "441200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "441201"
	                    },
	                    {
	                        "value": "端州区",
	                        "code": "441202"
	                    },
	                    {
	                        "value": "鼎湖区",
	                        "code": "441203"
	                    },
	                    {
	                        "value": "高要区",
	                        "code": "441204"
	                    },
	                    {
	                        "value": "广宁县",
	                        "code": "441223"
	                    },
	                    {
	                        "value": "怀集县",
	                        "code": "441224"
	                    },
	                    {
	                        "value": "封开县",
	                        "code": "441225"
	                    },
	                    {
	                        "value": "德庆县",
	                        "code": "441226"
	                    },
	                    {
	                        "value": "四会市",
	                        "code": "441284"
	                    }
	                ]
	            },
	            {
	                "value": "惠州市",
	                "code": "441300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "441301"
	                    },
	                    {
	                        "value": "惠城区",
	                        "code": "441302"
	                    },
	                    {
	                        "value": "惠阳区",
	                        "code": "441303"
	                    },
	                    {
	                        "value": "博罗县",
	                        "code": "441322"
	                    },
	                    {
	                        "value": "惠东县",
	                        "code": "441323"
	                    },
	                    {
	                        "value": "龙门县",
	                        "code": "441324"
	                    }
	                ]
	            },
	            {
	                "value": "梅州市",
	                "code": "441400",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "441401"
	                    },
	                    {
	                        "value": "梅江区",
	                        "code": "441402"
	                    },
	                    {
	                        "value": "梅县区",
	                        "code": "441403"
	                    },
	                    {
	                        "value": "大埔县",
	                        "code": "441422"
	                    },
	                    {
	                        "value": "丰顺县",
	                        "code": "441423"
	                    },
	                    {
	                        "value": "五华县",
	                        "code": "441424"
	                    },
	                    {
	                        "value": "平远县",
	                        "code": "441426"
	                    },
	                    {
	                        "value": "蕉岭县",
	                        "code": "441427"
	                    },
	                    {
	                        "value": "兴宁市",
	                        "code": "441481"
	                    }
	                ]
	            },
	            {
	                "value": "汕尾市",
	                "code": "441500",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "441501"
	                    },
	                    {
	                        "value": "城区",
	                        "code": "441502"
	                    },
	                    {
	                        "value": "海丰县",
	                        "code": "441521"
	                    },
	                    {
	                        "value": "陆河县",
	                        "code": "441523"
	                    },
	                    {
	                        "value": "陆丰市",
	                        "code": "441581"
	                    }
	                ]
	            },
	            {
	                "value": "河源市",
	                "code": "441600",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "441601"
	                    },
	                    {
	                        "value": "源城区",
	                        "code": "441602"
	                    },
	                    {
	                        "value": "紫金县",
	                        "code": "441621"
	                    },
	                    {
	                        "value": "龙川县",
	                        "code": "441622"
	                    },
	                    {
	                        "value": "连平县",
	                        "code": "441623"
	                    },
	                    {
	                        "value": "和平县",
	                        "code": "441624"
	                    },
	                    {
	                        "value": "东源县",
	                        "code": "441625"
	                    }
	                ]
	            },
	            {
	                "value": "阳江市",
	                "code": "441700",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "441701"
	                    },
	                    {
	                        "value": "江城区",
	                        "code": "441702"
	                    },
	                    {
	                        "value": "阳东区",
	                        "code": "441704"
	                    },
	                    {
	                        "value": "阳西县",
	                        "code": "441721"
	                    },
	                    {
	                        "value": "阳春市",
	                        "code": "441781"
	                    }
	                ]
	            },
	            {
	                "value": "清远市",
	                "code": "441800",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "441801"
	                    },
	                    {
	                        "value": "清城区",
	                        "code": "441802"
	                    },
	                    {
	                        "value": "清新区",
	                        "code": "441803"
	                    },
	                    {
	                        "value": "佛冈县",
	                        "code": "441821"
	                    },
	                    {
	                        "value": "阳山县",
	                        "code": "441823"
	                    },
	                    {
	                        "value": "连山壮族瑶族自治县",
	                        "code": "441825"
	                    },
	                    {
	                        "value": "连南瑶族自治县",
	                        "code": "441826"
	                    },
	                    {
	                        "value": "英德市",
	                        "code": "441881"
	                    },
	                    {
	                        "value": "连州市",
	                        "code": "441882"
	                    }
	                ]
	            },
	            {
	                "value": "东莞市",
	                "code": "441900",
	                "children": []
	            },
	            {
	                "value": "中山市",
	                "code": "442000",
	                "children": []
	            },
	            {
	                "value": "潮州市",
	                "code": "445100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "445101"
	                    },
	                    {
	                        "value": "湘桥区",
	                        "code": "445102"
	                    },
	                    {
	                        "value": "潮安区",
	                        "code": "445103"
	                    },
	                    {
	                        "value": "饶平县",
	                        "code": "445122"
	                    }
	                ]
	            },
	            {
	                "value": "揭阳市",
	                "code": "445200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "445201"
	                    },
	                    {
	                        "value": "榕城区",
	                        "code": "445202"
	                    },
	                    {
	                        "value": "揭东区",
	                        "code": "445203"
	                    },
	                    {
	                        "value": "揭西县",
	                        "code": "445222"
	                    },
	                    {
	                        "value": "惠来县",
	                        "code": "445224"
	                    },
	                    {
	                        "value": "普宁市",
	                        "code": "445281"
	                    }
	                ]
	            },
	            {
	                "value": "云浮市",
	                "code": "445300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "445301"
	                    },
	                    {
	                        "value": "云城区",
	                        "code": "445302"
	                    },
	                    {
	                        "value": "云安区",
	                        "code": "445303"
	                    },
	                    {
	                        "value": "新兴县",
	                        "code": "445321"
	                    },
	                    {
	                        "value": "郁南县",
	                        "code": "445322"
	                    },
	                    {
	                        "value": "罗定市",
	                        "code": "445381"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "广西壮族自治区",
	        "code": "450000",
	        "children": [
	            {
	                "value": "南宁市",
	                "code": "450100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "450101"
	                    },
	                    {
	                        "value": "兴宁区",
	                        "code": "450102"
	                    },
	                    {
	                        "value": "青秀区",
	                        "code": "450103"
	                    },
	                    {
	                        "value": "江南区",
	                        "code": "450105"
	                    },
	                    {
	                        "value": "西乡塘区",
	                        "code": "450107"
	                    },
	                    {
	                        "value": "良庆区",
	                        "code": "450108"
	                    },
	                    {
	                        "value": "邕宁区",
	                        "code": "450109"
	                    },
	                    {
	                        "value": "武鸣区",
	                        "code": "450110"
	                    },
	                    {
	                        "value": "隆安县",
	                        "code": "450123"
	                    },
	                    {
	                        "value": "马山县",
	                        "code": "450124"
	                    },
	                    {
	                        "value": "上林县",
	                        "code": "450125"
	                    },
	                    {
	                        "value": "宾阳县",
	                        "code": "450126"
	                    },
	                    {
	                        "value": "横县",
	                        "code": "450127"
	                    }
	                ]
	            },
	            {
	                "value": "柳州市",
	                "code": "450200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "450201"
	                    },
	                    {
	                        "value": "城中区",
	                        "code": "450202"
	                    },
	                    {
	                        "value": "鱼峰区",
	                        "code": "450203"
	                    },
	                    {
	                        "value": "柳南区",
	                        "code": "450204"
	                    },
	                    {
	                        "value": "柳北区",
	                        "code": "450205"
	                    },
	                    {
	                        "value": "柳江区",
	                        "code": "450206"
	                    },
	                    {
	                        "value": "柳城县",
	                        "code": "450222"
	                    },
	                    {
	                        "value": "鹿寨县",
	                        "code": "450223"
	                    },
	                    {
	                        "value": "融安县",
	                        "code": "450224"
	                    },
	                    {
	                        "value": "融水苗族自治县",
	                        "code": "450225"
	                    },
	                    {
	                        "value": "三江侗族自治县",
	                        "code": "450226"
	                    }
	                ]
	            },
	            {
	                "value": "桂林市",
	                "code": "450300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "450301"
	                    },
	                    {
	                        "value": "秀峰区",
	                        "code": "450302"
	                    },
	                    {
	                        "value": "叠彩区",
	                        "code": "450303"
	                    },
	                    {
	                        "value": "象山区",
	                        "code": "450304"
	                    },
	                    {
	                        "value": "七星区",
	                        "code": "450305"
	                    },
	                    {
	                        "value": "雁山区",
	                        "code": "450311"
	                    },
	                    {
	                        "value": "临桂区",
	                        "code": "450312"
	                    },
	                    {
	                        "value": "阳朔县",
	                        "code": "450321"
	                    },
	                    {
	                        "value": "灵川县",
	                        "code": "450323"
	                    },
	                    {
	                        "value": "全州县",
	                        "code": "450324"
	                    },
	                    {
	                        "value": "兴安县",
	                        "code": "450325"
	                    },
	                    {
	                        "value": "永福县",
	                        "code": "450326"
	                    },
	                    {
	                        "value": "灌阳县",
	                        "code": "450327"
	                    },
	                    {
	                        "value": "龙胜各族自治县",
	                        "code": "450328"
	                    },
	                    {
	                        "value": "资源县",
	                        "code": "450329"
	                    },
	                    {
	                        "value": "平乐县",
	                        "code": "450330"
	                    },
	                    {
	                        "value": "荔浦县",
	                        "code": "450331"
	                    },
	                    {
	                        "value": "恭城瑶族自治县",
	                        "code": "450332"
	                    }
	                ]
	            },
	            {
	                "value": "梧州市",
	                "code": "450400",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "450401"
	                    },
	                    {
	                        "value": "万秀区",
	                        "code": "450403"
	                    },
	                    {
	                        "value": "长洲区",
	                        "code": "450405"
	                    },
	                    {
	                        "value": "龙圩区",
	                        "code": "450406"
	                    },
	                    {
	                        "value": "苍梧县",
	                        "code": "450421"
	                    },
	                    {
	                        "value": "藤县",
	                        "code": "450422"
	                    },
	                    {
	                        "value": "蒙山县",
	                        "code": "450423"
	                    },
	                    {
	                        "value": "岑溪市",
	                        "code": "450481"
	                    }
	                ]
	            },
	            {
	                "value": "北海市",
	                "code": "450500",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "450501"
	                    },
	                    {
	                        "value": "海城区",
	                        "code": "450502"
	                    },
	                    {
	                        "value": "银海区",
	                        "code": "450503"
	                    },
	                    {
	                        "value": "铁山港区",
	                        "code": "450512"
	                    },
	                    {
	                        "value": "合浦县",
	                        "code": "450521"
	                    }
	                ]
	            },
	            {
	                "value": "防城港市",
	                "code": "450600",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "450601"
	                    },
	                    {
	                        "value": "港口区",
	                        "code": "450602"
	                    },
	                    {
	                        "value": "防城区",
	                        "code": "450603"
	                    },
	                    {
	                        "value": "上思县",
	                        "code": "450621"
	                    },
	                    {
	                        "value": "东兴市",
	                        "code": "450681"
	                    }
	                ]
	            },
	            {
	                "value": "钦州市",
	                "code": "450700",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "450701"
	                    },
	                    {
	                        "value": "钦南区",
	                        "code": "450702"
	                    },
	                    {
	                        "value": "钦北区",
	                        "code": "450703"
	                    },
	                    {
	                        "value": "灵山县",
	                        "code": "450721"
	                    },
	                    {
	                        "value": "浦北县",
	                        "code": "450722"
	                    }
	                ]
	            },
	            {
	                "value": "贵港市",
	                "code": "450800",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "450801"
	                    },
	                    {
	                        "value": "港北区",
	                        "code": "450802"
	                    },
	                    {
	                        "value": "港南区",
	                        "code": "450803"
	                    },
	                    {
	                        "value": "覃塘区",
	                        "code": "450804"
	                    },
	                    {
	                        "value": "平南县",
	                        "code": "450821"
	                    },
	                    {
	                        "value": "桂平市",
	                        "code": "450881"
	                    }
	                ]
	            },
	            {
	                "value": "玉林市",
	                "code": "450900",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "450901"
	                    },
	                    {
	                        "value": "玉州区",
	                        "code": "450902"
	                    },
	                    {
	                        "value": "福绵区",
	                        "code": "450903"
	                    },
	                    {
	                        "value": "容县",
	                        "code": "450921"
	                    },
	                    {
	                        "value": "陆川县",
	                        "code": "450922"
	                    },
	                    {
	                        "value": "博白县",
	                        "code": "450923"
	                    },
	                    {
	                        "value": "兴业县",
	                        "code": "450924"
	                    },
	                    {
	                        "value": "北流市",
	                        "code": "450981"
	                    }
	                ]
	            },
	            {
	                "value": "百色市",
	                "code": "451000",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "451001"
	                    },
	                    {
	                        "value": "右江区",
	                        "code": "451002"
	                    },
	                    {
	                        "value": "田阳县",
	                        "code": "451021"
	                    },
	                    {
	                        "value": "田东县",
	                        "code": "451022"
	                    },
	                    {
	                        "value": "平果县",
	                        "code": "451023"
	                    },
	                    {
	                        "value": "德保县",
	                        "code": "451024"
	                    },
	                    {
	                        "value": "那坡县",
	                        "code": "451026"
	                    },
	                    {
	                        "value": "凌云县",
	                        "code": "451027"
	                    },
	                    {
	                        "value": "乐业县",
	                        "code": "451028"
	                    },
	                    {
	                        "value": "田林县",
	                        "code": "451029"
	                    },
	                    {
	                        "value": "西林县",
	                        "code": "451030"
	                    },
	                    {
	                        "value": "隆林各族自治县",
	                        "code": "451031"
	                    },
	                    {
	                        "value": "靖西市",
	                        "code": "451081"
	                    }
	                ]
	            },
	            {
	                "value": "贺州市",
	                "code": "451100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "451101"
	                    },
	                    {
	                        "value": "八步区",
	                        "code": "451102"
	                    },
	                    {
	                        "value": "平桂区",
	                        "code": "451103"
	                    },
	                    {
	                        "value": "昭平县",
	                        "code": "451121"
	                    },
	                    {
	                        "value": "钟山县",
	                        "code": "451122"
	                    },
	                    {
	                        "value": "富川瑶族自治县",
	                        "code": "451123"
	                    }
	                ]
	            },
	            {
	                "value": "河池市",
	                "code": "451200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "451201"
	                    },
	                    {
	                        "value": "金城江区",
	                        "code": "451202"
	                    },
	                    {
	                        "value": "南丹县",
	                        "code": "451221"
	                    },
	                    {
	                        "value": "天峨县",
	                        "code": "451222"
	                    },
	                    {
	                        "value": "凤山县",
	                        "code": "451223"
	                    },
	                    {
	                        "value": "东兰县",
	                        "code": "451224"
	                    },
	                    {
	                        "value": "罗城仫佬族自治县",
	                        "code": "451225"
	                    },
	                    {
	                        "value": "环江毛南族自治县",
	                        "code": "451226"
	                    },
	                    {
	                        "value": "巴马瑶族自治县",
	                        "code": "451227"
	                    },
	                    {
	                        "value": "都安瑶族自治县",
	                        "code": "451228"
	                    },
	                    {
	                        "value": "大化瑶族自治县",
	                        "code": "451229"
	                    },
	                    {
	                        "value": "宜州市",
	                        "code": "451281"
	                    }
	                ]
	            },
	            {
	                "value": "来宾市",
	                "code": "451300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "451301"
	                    },
	                    {
	                        "value": "兴宾区",
	                        "code": "451302"
	                    },
	                    {
	                        "value": "忻城县",
	                        "code": "451321"
	                    },
	                    {
	                        "value": "象州县",
	                        "code": "451322"
	                    },
	                    {
	                        "value": "武宣县",
	                        "code": "451323"
	                    },
	                    {
	                        "value": "金秀瑶族自治县",
	                        "code": "451324"
	                    },
	                    {
	                        "value": "合山市",
	                        "code": "451381"
	                    }
	                ]
	            },
	            {
	                "value": "崇左市",
	                "code": "451400",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "451401"
	                    },
	                    {
	                        "value": "江州区",
	                        "code": "451402"
	                    },
	                    {
	                        "value": "扶绥县",
	                        "code": "451421"
	                    },
	                    {
	                        "value": "宁明县",
	                        "code": "451422"
	                    },
	                    {
	                        "value": "龙州县",
	                        "code": "451423"
	                    },
	                    {
	                        "value": "大新县",
	                        "code": "451424"
	                    },
	                    {
	                        "value": "天等县",
	                        "code": "451425"
	                    },
	                    {
	                        "value": "凭祥市",
	                        "code": "451481"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "海南省",
	        "code": "460000",
	        "children": [
	            {
	                "value": "海口市",
	                "code": "460100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "460101"
	                    },
	                    {
	                        "value": "秀英区",
	                        "code": "460105"
	                    },
	                    {
	                        "value": "龙华区",
	                        "code": "460106"
	                    },
	                    {
	                        "value": "琼山区",
	                        "code": "460107"
	                    },
	                    {
	                        "value": "美兰区",
	                        "code": "460108"
	                    }
	                ]
	            },
	            {
	                "value": "三亚市",
	                "code": "460200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "460201"
	                    },
	                    {
	                        "value": "海棠区",
	                        "code": "460202"
	                    },
	                    {
	                        "value": "吉阳区",
	                        "code": "460203"
	                    },
	                    {
	                        "value": "天涯区",
	                        "code": "460204"
	                    },
	                    {
	                        "value": "崖州区",
	                        "code": "460205"
	                    }
	                ]
	            },
	            {
	                "value": "三沙市",
	                "code": "460300",
	                "children": []
	            },
	            {
	                "value": "儋州市",
	                "code": "460400",
	                "children": []
	            },
	            {
	                "value": "省直辖县级行政区划",
	                "code": "469000",
	                "children": [
	                    {
	                        "value": "五指山市",
	                        "code": "469001"
	                    },
	                    {
	                        "value": "琼海市",
	                        "code": "469002"
	                    },
	                    {
	                        "value": "文昌市",
	                        "code": "469005"
	                    },
	                    {
	                        "value": "万宁市",
	                        "code": "469006"
	                    },
	                    {
	                        "value": "东方市",
	                        "code": "469007"
	                    },
	                    {
	                        "value": "定安县",
	                        "code": "469021"
	                    },
	                    {
	                        "value": "屯昌县",
	                        "code": "469022"
	                    },
	                    {
	                        "value": "澄迈县",
	                        "code": "469023"
	                    },
	                    {
	                        "value": "临高县",
	                        "code": "469024"
	                    },
	                    {
	                        "value": "白沙黎族自治县",
	                        "code": "469025"
	                    },
	                    {
	                        "value": "昌江黎族自治县",
	                        "code": "469026"
	                    },
	                    {
	                        "value": "乐东黎族自治县",
	                        "code": "469027"
	                    },
	                    {
	                        "value": "陵水黎族自治县",
	                        "code": "469028"
	                    },
	                    {
	                        "value": "保亭黎族苗族自治县",
	                        "code": "469029"
	                    },
	                    {
	                        "value": "琼中黎族苗族自治县",
	                        "code": "469030"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "重庆市",
	        "code": "500000",
	        "children": [
	            {
	                "value": "市辖区",
	                "code": "500100",
	                "children": [
	                    {
	                        "value": "万州区",
	                        "code": "500101"
	                    },
	                    {
	                        "value": "涪陵区",
	                        "code": "500102"
	                    },
	                    {
	                        "value": "渝中区",
	                        "code": "500103"
	                    },
	                    {
	                        "value": "大渡口区",
	                        "code": "500104"
	                    },
	                    {
	                        "value": "江北区",
	                        "code": "500105"
	                    },
	                    {
	                        "value": "沙坪坝区",
	                        "code": "500106"
	                    },
	                    {
	                        "value": "九龙坡区",
	                        "code": "500107"
	                    },
	                    {
	                        "value": "南岸区",
	                        "code": "500108"
	                    },
	                    {
	                        "value": "北碚区",
	                        "code": "500109"
	                    },
	                    {
	                        "value": "綦江区",
	                        "code": "500110"
	                    },
	                    {
	                        "value": "大足区",
	                        "code": "500111"
	                    },
	                    {
	                        "value": "渝北区",
	                        "code": "500112"
	                    },
	                    {
	                        "value": "巴南区",
	                        "code": "500113"
	                    },
	                    {
	                        "value": "黔江区",
	                        "code": "500114"
	                    },
	                    {
	                        "value": "长寿区",
	                        "code": "500115"
	                    },
	                    {
	                        "value": "江津区",
	                        "code": "500116"
	                    },
	                    {
	                        "value": "合川区",
	                        "code": "500117"
	                    },
	                    {
	                        "value": "永川区",
	                        "code": "500118"
	                    },
	                    {
	                        "value": "南川区",
	                        "code": "500119"
	                    },
	                    {
	                        "value": "璧山区",
	                        "code": "500120"
	                    },
	                    {
	                        "value": "铜梁区",
	                        "code": "500151"
	                    },
	                    {
	                        "value": "潼南区",
	                        "code": "500152"
	                    },
	                    {
	                        "value": "荣昌区",
	                        "code": "500153"
	                    },
	                    {
	                        "value": "开州区",
	                        "code": "500154"
	                    }
	                ]
	            },
	            {
	                "value": "县",
	                "code": "500200",
	                "children": [
	                    {
	                        "value": "梁平县",
	                        "code": "500228"
	                    },
	                    {
	                        "value": "城口县",
	                        "code": "500229"
	                    },
	                    {
	                        "value": "丰都县",
	                        "code": "500230"
	                    },
	                    {
	                        "value": "垫江县",
	                        "code": "500231"
	                    },
	                    {
	                        "value": "武隆县",
	                        "code": "500232"
	                    },
	                    {
	                        "value": "忠县",
	                        "code": "500233"
	                    },
	                    {
	                        "value": "云阳县",
	                        "code": "500235"
	                    },
	                    {
	                        "value": "奉节县",
	                        "code": "500236"
	                    },
	                    {
	                        "value": "巫山县",
	                        "code": "500237"
	                    },
	                    {
	                        "value": "巫溪县",
	                        "code": "500238"
	                    },
	                    {
	                        "value": "石柱土家族自治县",
	                        "code": "500240"
	                    },
	                    {
	                        "value": "秀山土家族苗族自治县",
	                        "code": "500241"
	                    },
	                    {
	                        "value": "酉阳土家族苗族自治县",
	                        "code": "500242"
	                    },
	                    {
	                        "value": "彭水苗族土家族自治县",
	                        "code": "500243"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "四川省",
	        "code": "510000",
	        "children": [
	            {
	                "value": "成都市",
	                "code": "510100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "510101"
	                    },
	                    {
	                        "value": "锦江区",
	                        "code": "510104"
	                    },
	                    {
	                        "value": "青羊区",
	                        "code": "510105"
	                    },
	                    {
	                        "value": "金牛区",
	                        "code": "510106"
	                    },
	                    {
	                        "value": "武侯区",
	                        "code": "510107"
	                    },
	                    {
	                        "value": "成华区",
	                        "code": "510108"
	                    },
	                    {
	                        "value": "龙泉驿区",
	                        "code": "510112"
	                    },
	                    {
	                        "value": "青白江区",
	                        "code": "510113"
	                    },
	                    {
	                        "value": "新都区",
	                        "code": "510114"
	                    },
	                    {
	                        "value": "温江区",
	                        "code": "510115"
	                    },
	                    {
	                        "value": "双流区",
	                        "code": "510116"
	                    },
	                    {
	                        "value": "金堂县",
	                        "code": "510121"
	                    },
	                    {
	                        "value": "郫县",
	                        "code": "510124"
	                    },
	                    {
	                        "value": "大邑县",
	                        "code": "510129"
	                    },
	                    {
	                        "value": "蒲江县",
	                        "code": "510131"
	                    },
	                    {
	                        "value": "新津县",
	                        "code": "510132"
	                    },
	                    {
	                        "value": "都江堰市",
	                        "code": "510181"
	                    },
	                    {
	                        "value": "彭州市",
	                        "code": "510182"
	                    },
	                    {
	                        "value": "邛崃市",
	                        "code": "510183"
	                    },
	                    {
	                        "value": "崇州市",
	                        "code": "510184"
	                    },
	                    {
	                        "value": "简阳市",
	                        "code": "510185"
	                    }
	                ]
	            },
	            {
	                "value": "自贡市",
	                "code": "510300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "510301"
	                    },
	                    {
	                        "value": "自流井区",
	                        "code": "510302"
	                    },
	                    {
	                        "value": "贡井区",
	                        "code": "510303"
	                    },
	                    {
	                        "value": "大安区",
	                        "code": "510304"
	                    },
	                    {
	                        "value": "沿滩区",
	                        "code": "510311"
	                    },
	                    {
	                        "value": "荣县",
	                        "code": "510321"
	                    },
	                    {
	                        "value": "富顺县",
	                        "code": "510322"
	                    }
	                ]
	            },
	            {
	                "value": "攀枝花市",
	                "code": "510400",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "510401"
	                    },
	                    {
	                        "value": "东区",
	                        "code": "510402"
	                    },
	                    {
	                        "value": "西区",
	                        "code": "510403"
	                    },
	                    {
	                        "value": "仁和区",
	                        "code": "510411"
	                    },
	                    {
	                        "value": "米易县",
	                        "code": "510421"
	                    },
	                    {
	                        "value": "盐边县",
	                        "code": "510422"
	                    }
	                ]
	            },
	            {
	                "value": "泸州市",
	                "code": "510500",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "510501"
	                    },
	                    {
	                        "value": "江阳区",
	                        "code": "510502"
	                    },
	                    {
	                        "value": "纳溪区",
	                        "code": "510503"
	                    },
	                    {
	                        "value": "龙马潭区",
	                        "code": "510504"
	                    },
	                    {
	                        "value": "泸县",
	                        "code": "510521"
	                    },
	                    {
	                        "value": "合江县",
	                        "code": "510522"
	                    },
	                    {
	                        "value": "叙永县",
	                        "code": "510524"
	                    },
	                    {
	                        "value": "古蔺县",
	                        "code": "510525"
	                    }
	                ]
	            },
	            {
	                "value": "德阳市",
	                "code": "510600",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "510601"
	                    },
	                    {
	                        "value": "旌阳区",
	                        "code": "510603"
	                    },
	                    {
	                        "value": "中江县",
	                        "code": "510623"
	                    },
	                    {
	                        "value": "罗江县",
	                        "code": "510626"
	                    },
	                    {
	                        "value": "广汉市",
	                        "code": "510681"
	                    },
	                    {
	                        "value": "什邡市",
	                        "code": "510682"
	                    },
	                    {
	                        "value": "绵竹市",
	                        "code": "510683"
	                    }
	                ]
	            },
	            {
	                "value": "绵阳市",
	                "code": "510700",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "510701"
	                    },
	                    {
	                        "value": "涪城区",
	                        "code": "510703"
	                    },
	                    {
	                        "value": "游仙区",
	                        "code": "510704"
	                    },
	                    {
	                        "value": "安州区",
	                        "code": "510705"
	                    },
	                    {
	                        "value": "三台县",
	                        "code": "510722"
	                    },
	                    {
	                        "value": "盐亭县",
	                        "code": "510723"
	                    },
	                    {
	                        "value": "梓潼县",
	                        "code": "510725"
	                    },
	                    {
	                        "value": "北川羌族自治县",
	                        "code": "510726"
	                    },
	                    {
	                        "value": "平武县",
	                        "code": "510727"
	                    },
	                    {
	                        "value": "江油市",
	                        "code": "510781"
	                    }
	                ]
	            },
	            {
	                "value": "广元市",
	                "code": "510800",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "510801"
	                    },
	                    {
	                        "value": "利州区",
	                        "code": "510802"
	                    },
	                    {
	                        "value": "昭化区",
	                        "code": "510811"
	                    },
	                    {
	                        "value": "朝天区",
	                        "code": "510812"
	                    },
	                    {
	                        "value": "旺苍县",
	                        "code": "510821"
	                    },
	                    {
	                        "value": "青川县",
	                        "code": "510822"
	                    },
	                    {
	                        "value": "剑阁县",
	                        "code": "510823"
	                    },
	                    {
	                        "value": "苍溪县",
	                        "code": "510824"
	                    }
	                ]
	            },
	            {
	                "value": "遂宁市",
	                "code": "510900",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "510901"
	                    },
	                    {
	                        "value": "船山区",
	                        "code": "510903"
	                    },
	                    {
	                        "value": "安居区",
	                        "code": "510904"
	                    },
	                    {
	                        "value": "蓬溪县",
	                        "code": "510921"
	                    },
	                    {
	                        "value": "射洪县",
	                        "code": "510922"
	                    },
	                    {
	                        "value": "大英县",
	                        "code": "510923"
	                    }
	                ]
	            },
	            {
	                "value": "内江市",
	                "code": "511000",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "511001"
	                    },
	                    {
	                        "value": "市中区",
	                        "code": "511002"
	                    },
	                    {
	                        "value": "东兴区",
	                        "code": "511011"
	                    },
	                    {
	                        "value": "威远县",
	                        "code": "511024"
	                    },
	                    {
	                        "value": "资中县",
	                        "code": "511025"
	                    },
	                    {
	                        "value": "隆昌县",
	                        "code": "511028"
	                    }
	                ]
	            },
	            {
	                "value": "乐山市",
	                "code": "511100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "511101"
	                    },
	                    {
	                        "value": "市中区",
	                        "code": "511102"
	                    },
	                    {
	                        "value": "沙湾区",
	                        "code": "511111"
	                    },
	                    {
	                        "value": "五通桥区",
	                        "code": "511112"
	                    },
	                    {
	                        "value": "金口河区",
	                        "code": "511113"
	                    },
	                    {
	                        "value": "犍为县",
	                        "code": "511123"
	                    },
	                    {
	                        "value": "井研县",
	                        "code": "511124"
	                    },
	                    {
	                        "value": "夹江县",
	                        "code": "511126"
	                    },
	                    {
	                        "value": "沐川县",
	                        "code": "511129"
	                    },
	                    {
	                        "value": "峨边彝族自治县",
	                        "code": "511132"
	                    },
	                    {
	                        "value": "马边彝族自治县",
	                        "code": "511133"
	                    },
	                    {
	                        "value": "峨眉山市",
	                        "code": "511181"
	                    }
	                ]
	            },
	            {
	                "value": "南充市",
	                "code": "511300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "511301"
	                    },
	                    {
	                        "value": "顺庆区",
	                        "code": "511302"
	                    },
	                    {
	                        "value": "高坪区",
	                        "code": "511303"
	                    },
	                    {
	                        "value": "嘉陵区",
	                        "code": "511304"
	                    },
	                    {
	                        "value": "南部县",
	                        "code": "511321"
	                    },
	                    {
	                        "value": "营山县",
	                        "code": "511322"
	                    },
	                    {
	                        "value": "蓬安县",
	                        "code": "511323"
	                    },
	                    {
	                        "value": "仪陇县",
	                        "code": "511324"
	                    },
	                    {
	                        "value": "西充县",
	                        "code": "511325"
	                    },
	                    {
	                        "value": "阆中市",
	                        "code": "511381"
	                    }
	                ]
	            },
	            {
	                "value": "眉山市",
	                "code": "511400",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "511401"
	                    },
	                    {
	                        "value": "东坡区",
	                        "code": "511402"
	                    },
	                    {
	                        "value": "彭山区",
	                        "code": "511403"
	                    },
	                    {
	                        "value": "仁寿县",
	                        "code": "511421"
	                    },
	                    {
	                        "value": "洪雅县",
	                        "code": "511423"
	                    },
	                    {
	                        "value": "丹棱县",
	                        "code": "511424"
	                    },
	                    {
	                        "value": "青神县",
	                        "code": "511425"
	                    }
	                ]
	            },
	            {
	                "value": "宜宾市",
	                "code": "511500",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "511501"
	                    },
	                    {
	                        "value": "翠屏区",
	                        "code": "511502"
	                    },
	                    {
	                        "value": "南溪区",
	                        "code": "511503"
	                    },
	                    {
	                        "value": "宜宾县",
	                        "code": "511521"
	                    },
	                    {
	                        "value": "江安县",
	                        "code": "511523"
	                    },
	                    {
	                        "value": "长宁县",
	                        "code": "511524"
	                    },
	                    {
	                        "value": "高县",
	                        "code": "511525"
	                    },
	                    {
	                        "value": "珙县",
	                        "code": "511526"
	                    },
	                    {
	                        "value": "筠连县",
	                        "code": "511527"
	                    },
	                    {
	                        "value": "兴文县",
	                        "code": "511528"
	                    },
	                    {
	                        "value": "屏山县",
	                        "code": "511529"
	                    }
	                ]
	            },
	            {
	                "value": "广安市",
	                "code": "511600",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "511601"
	                    },
	                    {
	                        "value": "广安区",
	                        "code": "511602"
	                    },
	                    {
	                        "value": "前锋区",
	                        "code": "511603"
	                    },
	                    {
	                        "value": "岳池县",
	                        "code": "511621"
	                    },
	                    {
	                        "value": "武胜县",
	                        "code": "511622"
	                    },
	                    {
	                        "value": "邻水县",
	                        "code": "511623"
	                    },
	                    {
	                        "value": "华蓥市",
	                        "code": "511681"
	                    }
	                ]
	            },
	            {
	                "value": "达州市",
	                "code": "511700",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "511701"
	                    },
	                    {
	                        "value": "通川区",
	                        "code": "511702"
	                    },
	                    {
	                        "value": "达川区",
	                        "code": "511703"
	                    },
	                    {
	                        "value": "宣汉县",
	                        "code": "511722"
	                    },
	                    {
	                        "value": "开江县",
	                        "code": "511723"
	                    },
	                    {
	                        "value": "大竹县",
	                        "code": "511724"
	                    },
	                    {
	                        "value": "渠县",
	                        "code": "511725"
	                    },
	                    {
	                        "value": "万源市",
	                        "code": "511781"
	                    }
	                ]
	            },
	            {
	                "value": "雅安市",
	                "code": "511800",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "511801"
	                    },
	                    {
	                        "value": "雨城区",
	                        "code": "511802"
	                    },
	                    {
	                        "value": "名山区",
	                        "code": "511803"
	                    },
	                    {
	                        "value": "荥经县",
	                        "code": "511822"
	                    },
	                    {
	                        "value": "汉源县",
	                        "code": "511823"
	                    },
	                    {
	                        "value": "石棉县",
	                        "code": "511824"
	                    },
	                    {
	                        "value": "天全县",
	                        "code": "511825"
	                    },
	                    {
	                        "value": "芦山县",
	                        "code": "511826"
	                    },
	                    {
	                        "value": "宝兴县",
	                        "code": "511827"
	                    }
	                ]
	            },
	            {
	                "value": "巴中市",
	                "code": "511900",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "511901"
	                    },
	                    {
	                        "value": "巴州区",
	                        "code": "511902"
	                    },
	                    {
	                        "value": "恩阳区",
	                        "code": "511903"
	                    },
	                    {
	                        "value": "通江县",
	                        "code": "511921"
	                    },
	                    {
	                        "value": "南江县",
	                        "code": "511922"
	                    },
	                    {
	                        "value": "平昌县",
	                        "code": "511923"
	                    }
	                ]
	            },
	            {
	                "value": "资阳市",
	                "code": "512000",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "512001"
	                    },
	                    {
	                        "value": "雁江区",
	                        "code": "512002"
	                    },
	                    {
	                        "value": "安岳县",
	                        "code": "512021"
	                    },
	                    {
	                        "value": "乐至县",
	                        "code": "512022"
	                    }
	                ]
	            },
	            {
	                "value": "阿坝藏族羌族自治州",
	                "code": "513200",
	                "children": [
	                    {
	                        "value": "马尔康市",
	                        "code": "513201"
	                    },
	                    {
	                        "value": "汶川县",
	                        "code": "513221"
	                    },
	                    {
	                        "value": "理县",
	                        "code": "513222"
	                    },
	                    {
	                        "value": "茂县",
	                        "code": "513223"
	                    },
	                    {
	                        "value": "松潘县",
	                        "code": "513224"
	                    },
	                    {
	                        "value": "九寨沟县",
	                        "code": "513225"
	                    },
	                    {
	                        "value": "金川县",
	                        "code": "513226"
	                    },
	                    {
	                        "value": "小金县",
	                        "code": "513227"
	                    },
	                    {
	                        "value": "黑水县",
	                        "code": "513228"
	                    },
	                    {
	                        "value": "壤塘县",
	                        "code": "513230"
	                    },
	                    {
	                        "value": "阿坝县",
	                        "code": "513231"
	                    },
	                    {
	                        "value": "若尔盖县",
	                        "code": "513232"
	                    },
	                    {
	                        "value": "红原县",
	                        "code": "513233"
	                    }
	                ]
	            },
	            {
	                "value": "甘孜藏族自治州",
	                "code": "513300",
	                "children": [
	                    {
	                        "value": "康定市",
	                        "code": "513301"
	                    },
	                    {
	                        "value": "泸定县",
	                        "code": "513322"
	                    },
	                    {
	                        "value": "丹巴县",
	                        "code": "513323"
	                    },
	                    {
	                        "value": "九龙县",
	                        "code": "513324"
	                    },
	                    {
	                        "value": "雅江县",
	                        "code": "513325"
	                    },
	                    {
	                        "value": "道孚县",
	                        "code": "513326"
	                    },
	                    {
	                        "value": "炉霍县",
	                        "code": "513327"
	                    },
	                    {
	                        "value": "甘孜县",
	                        "code": "513328"
	                    },
	                    {
	                        "value": "新龙县",
	                        "code": "513329"
	                    },
	                    {
	                        "value": "德格县",
	                        "code": "513330"
	                    },
	                    {
	                        "value": "白玉县",
	                        "code": "513331"
	                    },
	                    {
	                        "value": "石渠县",
	                        "code": "513332"
	                    },
	                    {
	                        "value": "色达县",
	                        "code": "513333"
	                    },
	                    {
	                        "value": "理塘县",
	                        "code": "513334"
	                    },
	                    {
	                        "value": "巴塘县",
	                        "code": "513335"
	                    },
	                    {
	                        "value": "乡城县",
	                        "code": "513336"
	                    },
	                    {
	                        "value": "稻城县",
	                        "code": "513337"
	                    },
	                    {
	                        "value": "得荣县",
	                        "code": "513338"
	                    }
	                ]
	            },
	            {
	                "value": "凉山彝族自治州",
	                "code": "513400",
	                "children": [
	                    {
	                        "value": "西昌市",
	                        "code": "513401"
	                    },
	                    {
	                        "value": "木里藏族自治县",
	                        "code": "513422"
	                    },
	                    {
	                        "value": "盐源县",
	                        "code": "513423"
	                    },
	                    {
	                        "value": "德昌县",
	                        "code": "513424"
	                    },
	                    {
	                        "value": "会理县",
	                        "code": "513425"
	                    },
	                    {
	                        "value": "会东县",
	                        "code": "513426"
	                    },
	                    {
	                        "value": "宁南县",
	                        "code": "513427"
	                    },
	                    {
	                        "value": "普格县",
	                        "code": "513428"
	                    },
	                    {
	                        "value": "布拖县",
	                        "code": "513429"
	                    },
	                    {
	                        "value": "金阳县",
	                        "code": "513430"
	                    },
	                    {
	                        "value": "昭觉县",
	                        "code": "513431"
	                    },
	                    {
	                        "value": "喜德县",
	                        "code": "513432"
	                    },
	                    {
	                        "value": "冕宁县",
	                        "code": "513433"
	                    },
	                    {
	                        "value": "越西县",
	                        "code": "513434"
	                    },
	                    {
	                        "value": "甘洛县",
	                        "code": "513435"
	                    },
	                    {
	                        "value": "美姑县",
	                        "code": "513436"
	                    },
	                    {
	                        "value": "雷波县",
	                        "code": "513437"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "贵州省",
	        "code": "520000",
	        "children": [
	            {
	                "value": "贵阳市",
	                "code": "520100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "520101"
	                    },
	                    {
	                        "value": "南明区",
	                        "code": "520102"
	                    },
	                    {
	                        "value": "云岩区",
	                        "code": "520103"
	                    },
	                    {
	                        "value": "花溪区",
	                        "code": "520111"
	                    },
	                    {
	                        "value": "乌当区",
	                        "code": "520112"
	                    },
	                    {
	                        "value": "白云区",
	                        "code": "520113"
	                    },
	                    {
	                        "value": "观山湖区",
	                        "code": "520115"
	                    },
	                    {
	                        "value": "开阳县",
	                        "code": "520121"
	                    },
	                    {
	                        "value": "息烽县",
	                        "code": "520122"
	                    },
	                    {
	                        "value": "修文县",
	                        "code": "520123"
	                    },
	                    {
	                        "value": "清镇市",
	                        "code": "520181"
	                    }
	                ]
	            },
	            {
	                "value": "六盘水市",
	                "code": "520200",
	                "children": [
	                    {
	                        "value": "钟山区",
	                        "code": "520201"
	                    },
	                    {
	                        "value": "六枝特区",
	                        "code": "520203"
	                    },
	                    {
	                        "value": "水城县",
	                        "code": "520221"
	                    },
	                    {
	                        "value": "盘县",
	                        "code": "520222"
	                    }
	                ]
	            },
	            {
	                "value": "遵义市",
	                "code": "520300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "520301"
	                    },
	                    {
	                        "value": "红花岗区",
	                        "code": "520302"
	                    },
	                    {
	                        "value": "汇川区",
	                        "code": "520303"
	                    },
	                    {
	                        "value": "播州区",
	                        "code": "520304"
	                    },
	                    {
	                        "value": "桐梓县",
	                        "code": "520322"
	                    },
	                    {
	                        "value": "绥阳县",
	                        "code": "520323"
	                    },
	                    {
	                        "value": "正安县",
	                        "code": "520324"
	                    },
	                    {
	                        "value": "道真仡佬族苗族自治县",
	                        "code": "520325"
	                    },
	                    {
	                        "value": "务川仡佬族苗族自治县",
	                        "code": "520326"
	                    },
	                    {
	                        "value": "凤冈县",
	                        "code": "520327"
	                    },
	                    {
	                        "value": "湄潭县",
	                        "code": "520328"
	                    },
	                    {
	                        "value": "余庆县",
	                        "code": "520329"
	                    },
	                    {
	                        "value": "习水县",
	                        "code": "520330"
	                    },
	                    {
	                        "value": "赤水市",
	                        "code": "520381"
	                    },
	                    {
	                        "value": "仁怀市",
	                        "code": "520382"
	                    }
	                ]
	            },
	            {
	                "value": "安顺市",
	                "code": "520400",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "520401"
	                    },
	                    {
	                        "value": "西秀区",
	                        "code": "520402"
	                    },
	                    {
	                        "value": "平坝区",
	                        "code": "520403"
	                    },
	                    {
	                        "value": "普定县",
	                        "code": "520422"
	                    },
	                    {
	                        "value": "镇宁布依族苗族自治县",
	                        "code": "520423"
	                    },
	                    {
	                        "value": "关岭布依族苗族自治县",
	                        "code": "520424"
	                    },
	                    {
	                        "value": "紫云苗族布依族自治县",
	                        "code": "520425"
	                    }
	                ]
	            },
	            {
	                "value": "毕节市",
	                "code": "520500",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "520501"
	                    },
	                    {
	                        "value": "七星关区",
	                        "code": "520502"
	                    },
	                    {
	                        "value": "大方县",
	                        "code": "520521"
	                    },
	                    {
	                        "value": "黔西县",
	                        "code": "520522"
	                    },
	                    {
	                        "value": "金沙县",
	                        "code": "520523"
	                    },
	                    {
	                        "value": "织金县",
	                        "code": "520524"
	                    },
	                    {
	                        "value": "纳雍县",
	                        "code": "520525"
	                    },
	                    {
	                        "value": "威宁彝族回族苗族自治县",
	                        "code": "520526"
	                    },
	                    {
	                        "value": "赫章县",
	                        "code": "520527"
	                    }
	                ]
	            },
	            {
	                "value": "铜仁市",
	                "code": "520600",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "520601"
	                    },
	                    {
	                        "value": "碧江区",
	                        "code": "520602"
	                    },
	                    {
	                        "value": "万山区",
	                        "code": "520603"
	                    },
	                    {
	                        "value": "江口县",
	                        "code": "520621"
	                    },
	                    {
	                        "value": "玉屏侗族自治县",
	                        "code": "520622"
	                    },
	                    {
	                        "value": "石阡县",
	                        "code": "520623"
	                    },
	                    {
	                        "value": "思南县",
	                        "code": "520624"
	                    },
	                    {
	                        "value": "印江土家族苗族自治县",
	                        "code": "520625"
	                    },
	                    {
	                        "value": "德江县",
	                        "code": "520626"
	                    },
	                    {
	                        "value": "沿河土家族自治县",
	                        "code": "520627"
	                    },
	                    {
	                        "value": "松桃苗族自治县",
	                        "code": "520628"
	                    }
	                ]
	            },
	            {
	                "value": "黔西南布依族苗族自治州",
	                "code": "522300",
	                "children": [
	                    {
	                        "value": "兴义市",
	                        "code": "522301"
	                    },
	                    {
	                        "value": "兴仁县",
	                        "code": "522322"
	                    },
	                    {
	                        "value": "普安县",
	                        "code": "522323"
	                    },
	                    {
	                        "value": "晴隆县",
	                        "code": "522324"
	                    },
	                    {
	                        "value": "贞丰县",
	                        "code": "522325"
	                    },
	                    {
	                        "value": "望谟县",
	                        "code": "522326"
	                    },
	                    {
	                        "value": "册亨县",
	                        "code": "522327"
	                    },
	                    {
	                        "value": "安龙县",
	                        "code": "522328"
	                    }
	                ]
	            },
	            {
	                "value": "黔东南苗族侗族自治州",
	                "code": "522600",
	                "children": [
	                    {
	                        "value": "凯里市",
	                        "code": "522601"
	                    },
	                    {
	                        "value": "黄平县",
	                        "code": "522622"
	                    },
	                    {
	                        "value": "施秉县",
	                        "code": "522623"
	                    },
	                    {
	                        "value": "三穗县",
	                        "code": "522624"
	                    },
	                    {
	                        "value": "镇远县",
	                        "code": "522625"
	                    },
	                    {
	                        "value": "岑巩县",
	                        "code": "522626"
	                    },
	                    {
	                        "value": "天柱县",
	                        "code": "522627"
	                    },
	                    {
	                        "value": "锦屏县",
	                        "code": "522628"
	                    },
	                    {
	                        "value": "剑河县",
	                        "code": "522629"
	                    },
	                    {
	                        "value": "台江县",
	                        "code": "522630"
	                    },
	                    {
	                        "value": "黎平县",
	                        "code": "522631"
	                    },
	                    {
	                        "value": "榕江县",
	                        "code": "522632"
	                    },
	                    {
	                        "value": "从江县",
	                        "code": "522633"
	                    },
	                    {
	                        "value": "雷山县",
	                        "code": "522634"
	                    },
	                    {
	                        "value": "麻江县",
	                        "code": "522635"
	                    },
	                    {
	                        "value": "丹寨县",
	                        "code": "522636"
	                    }
	                ]
	            },
	            {
	                "value": "黔南布依族苗族自治州",
	                "code": "522700",
	                "children": [
	                    {
	                        "value": "都匀市",
	                        "code": "522701"
	                    },
	                    {
	                        "value": "福泉市",
	                        "code": "522702"
	                    },
	                    {
	                        "value": "荔波县",
	                        "code": "522722"
	                    },
	                    {
	                        "value": "贵定县",
	                        "code": "522723"
	                    },
	                    {
	                        "value": "瓮安县",
	                        "code": "522725"
	                    },
	                    {
	                        "value": "独山县",
	                        "code": "522726"
	                    },
	                    {
	                        "value": "平塘县",
	                        "code": "522727"
	                    },
	                    {
	                        "value": "罗甸县",
	                        "code": "522728"
	                    },
	                    {
	                        "value": "长顺县",
	                        "code": "522729"
	                    },
	                    {
	                        "value": "龙里县",
	                        "code": "522730"
	                    },
	                    {
	                        "value": "惠水县",
	                        "code": "522731"
	                    },
	                    {
	                        "value": "三都水族自治县",
	                        "code": "522732"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "云南省",
	        "code": "530000",
	        "children": [
	            {
	                "value": "昆明市",
	                "code": "530100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "530101"
	                    },
	                    {
	                        "value": "五华区",
	                        "code": "530102"
	                    },
	                    {
	                        "value": "盘龙区",
	                        "code": "530103"
	                    },
	                    {
	                        "value": "官渡区",
	                        "code": "530111"
	                    },
	                    {
	                        "value": "西山区",
	                        "code": "530112"
	                    },
	                    {
	                        "value": "东川区",
	                        "code": "530113"
	                    },
	                    {
	                        "value": "呈贡区",
	                        "code": "530114"
	                    },
	                    {
	                        "value": "晋宁县",
	                        "code": "530122"
	                    },
	                    {
	                        "value": "富民县",
	                        "code": "530124"
	                    },
	                    {
	                        "value": "宜良县",
	                        "code": "530125"
	                    },
	                    {
	                        "value": "石林彝族自治县",
	                        "code": "530126"
	                    },
	                    {
	                        "value": "嵩明县",
	                        "code": "530127"
	                    },
	                    {
	                        "value": "禄劝彝族苗族自治县",
	                        "code": "530128"
	                    },
	                    {
	                        "value": "寻甸回族彝族自治县",
	                        "code": "530129"
	                    },
	                    {
	                        "value": "安宁市",
	                        "code": "530181"
	                    }
	                ]
	            },
	            {
	                "value": "曲靖市",
	                "code": "530300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "530301"
	                    },
	                    {
	                        "value": "麒麟区",
	                        "code": "530302"
	                    },
	                    {
	                        "value": "沾益区",
	                        "code": "530303"
	                    },
	                    {
	                        "value": "马龙县",
	                        "code": "530321"
	                    },
	                    {
	                        "value": "陆良县",
	                        "code": "530322"
	                    },
	                    {
	                        "value": "师宗县",
	                        "code": "530323"
	                    },
	                    {
	                        "value": "罗平县",
	                        "code": "530324"
	                    },
	                    {
	                        "value": "富源县",
	                        "code": "530325"
	                    },
	                    {
	                        "value": "会泽县",
	                        "code": "530326"
	                    },
	                    {
	                        "value": "宣威市",
	                        "code": "530381"
	                    }
	                ]
	            },
	            {
	                "value": "玉溪市",
	                "code": "530400",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "530401"
	                    },
	                    {
	                        "value": "红塔区",
	                        "code": "530402"
	                    },
	                    {
	                        "value": "江川区",
	                        "code": "530403"
	                    },
	                    {
	                        "value": "澄江县",
	                        "code": "530422"
	                    },
	                    {
	                        "value": "通海县",
	                        "code": "530423"
	                    },
	                    {
	                        "value": "华宁县",
	                        "code": "530424"
	                    },
	                    {
	                        "value": "易门县",
	                        "code": "530425"
	                    },
	                    {
	                        "value": "峨山彝族自治县",
	                        "code": "530426"
	                    },
	                    {
	                        "value": "新平彝族傣族自治县",
	                        "code": "530427"
	                    },
	                    {
	                        "value": "元江哈尼族彝族傣族自治县",
	                        "code": "530428"
	                    }
	                ]
	            },
	            {
	                "value": "保山市",
	                "code": "530500",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "530501"
	                    },
	                    {
	                        "value": "隆阳区",
	                        "code": "530502"
	                    },
	                    {
	                        "value": "施甸县",
	                        "code": "530521"
	                    },
	                    {
	                        "value": "龙陵县",
	                        "code": "530523"
	                    },
	                    {
	                        "value": "昌宁县",
	                        "code": "530524"
	                    },
	                    {
	                        "value": "腾冲市",
	                        "code": "530581"
	                    }
	                ]
	            },
	            {
	                "value": "昭通市",
	                "code": "530600",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "530601"
	                    },
	                    {
	                        "value": "昭阳区",
	                        "code": "530602"
	                    },
	                    {
	                        "value": "鲁甸县",
	                        "code": "530621"
	                    },
	                    {
	                        "value": "巧家县",
	                        "code": "530622"
	                    },
	                    {
	                        "value": "盐津县",
	                        "code": "530623"
	                    },
	                    {
	                        "value": "大关县",
	                        "code": "530624"
	                    },
	                    {
	                        "value": "永善县",
	                        "code": "530625"
	                    },
	                    {
	                        "value": "绥江县",
	                        "code": "530626"
	                    },
	                    {
	                        "value": "镇雄县",
	                        "code": "530627"
	                    },
	                    {
	                        "value": "彝良县",
	                        "code": "530628"
	                    },
	                    {
	                        "value": "威信县",
	                        "code": "530629"
	                    },
	                    {
	                        "value": "水富县",
	                        "code": "530630"
	                    }
	                ]
	            },
	            {
	                "value": "丽江市",
	                "code": "530700",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "530701"
	                    },
	                    {
	                        "value": "古城区",
	                        "code": "530702"
	                    },
	                    {
	                        "value": "玉龙纳西族自治县",
	                        "code": "530721"
	                    },
	                    {
	                        "value": "永胜县",
	                        "code": "530722"
	                    },
	                    {
	                        "value": "华坪县",
	                        "code": "530723"
	                    },
	                    {
	                        "value": "宁蒗彝族自治县",
	                        "code": "530724"
	                    }
	                ]
	            },
	            {
	                "value": "普洱市",
	                "code": "530800",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "530801"
	                    },
	                    {
	                        "value": "思茅区",
	                        "code": "530802"
	                    },
	                    {
	                        "value": "宁洱哈尼族彝族自治县",
	                        "code": "530821"
	                    },
	                    {
	                        "value": "墨江哈尼族自治县",
	                        "code": "530822"
	                    },
	                    {
	                        "value": "景东彝族自治县",
	                        "code": "530823"
	                    },
	                    {
	                        "value": "景谷傣族彝族自治县",
	                        "code": "530824"
	                    },
	                    {
	                        "value": "镇沅彝族哈尼族拉祜族自治县",
	                        "code": "530825"
	                    },
	                    {
	                        "value": "江城哈尼族彝族自治县",
	                        "code": "530826"
	                    },
	                    {
	                        "value": "孟连傣族拉祜族佤族自治县",
	                        "code": "530827"
	                    },
	                    {
	                        "value": "澜沧拉祜族自治县",
	                        "code": "530828"
	                    },
	                    {
	                        "value": "西盟佤族自治县",
	                        "code": "530829"
	                    }
	                ]
	            },
	            {
	                "value": "临沧市",
	                "code": "530900",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "530901"
	                    },
	                    {
	                        "value": "临翔区",
	                        "code": "530902"
	                    },
	                    {
	                        "value": "凤庆县",
	                        "code": "530921"
	                    },
	                    {
	                        "value": "云县",
	                        "code": "530922"
	                    },
	                    {
	                        "value": "永德县",
	                        "code": "530923"
	                    },
	                    {
	                        "value": "镇康县",
	                        "code": "530924"
	                    },
	                    {
	                        "value": "双江拉祜族佤族布朗族傣族自治县",
	                        "code": "530925"
	                    },
	                    {
	                        "value": "耿马傣族佤族自治县",
	                        "code": "530926"
	                    },
	                    {
	                        "value": "沧源佤族自治县",
	                        "code": "530927"
	                    }
	                ]
	            },
	            {
	                "value": "楚雄彝族自治州",
	                "code": "532300",
	                "children": [
	                    {
	                        "value": "楚雄市",
	                        "code": "532301"
	                    },
	                    {
	                        "value": "双柏县",
	                        "code": "532322"
	                    },
	                    {
	                        "value": "牟定县",
	                        "code": "532323"
	                    },
	                    {
	                        "value": "南华县",
	                        "code": "532324"
	                    },
	                    {
	                        "value": "姚安县",
	                        "code": "532325"
	                    },
	                    {
	                        "value": "大姚县",
	                        "code": "532326"
	                    },
	                    {
	                        "value": "永仁县",
	                        "code": "532327"
	                    },
	                    {
	                        "value": "元谋县",
	                        "code": "532328"
	                    },
	                    {
	                        "value": "武定县",
	                        "code": "532329"
	                    },
	                    {
	                        "value": "禄丰县",
	                        "code": "532331"
	                    }
	                ]
	            },
	            {
	                "value": "红河哈尼族彝族自治州",
	                "code": "532500",
	                "children": [
	                    {
	                        "value": "个旧市",
	                        "code": "532501"
	                    },
	                    {
	                        "value": "开远市",
	                        "code": "532502"
	                    },
	                    {
	                        "value": "蒙自市",
	                        "code": "532503"
	                    },
	                    {
	                        "value": "弥勒市",
	                        "code": "532504"
	                    },
	                    {
	                        "value": "屏边苗族自治县",
	                        "code": "532523"
	                    },
	                    {
	                        "value": "建水县",
	                        "code": "532524"
	                    },
	                    {
	                        "value": "石屏县",
	                        "code": "532525"
	                    },
	                    {
	                        "value": "泸西县",
	                        "code": "532527"
	                    },
	                    {
	                        "value": "元阳县",
	                        "code": "532528"
	                    },
	                    {
	                        "value": "红河县",
	                        "code": "532529"
	                    },
	                    {
	                        "value": "金平苗族瑶族傣族自治县",
	                        "code": "532530"
	                    },
	                    {
	                        "value": "绿春县",
	                        "code": "532531"
	                    },
	                    {
	                        "value": "河口瑶族自治县",
	                        "code": "532532"
	                    }
	                ]
	            },
	            {
	                "value": "文山壮族苗族自治州",
	                "code": "532600",
	                "children": [
	                    {
	                        "value": "文山市",
	                        "code": "532601"
	                    },
	                    {
	                        "value": "砚山县",
	                        "code": "532622"
	                    },
	                    {
	                        "value": "西畴县",
	                        "code": "532623"
	                    },
	                    {
	                        "value": "麻栗坡县",
	                        "code": "532624"
	                    },
	                    {
	                        "value": "马关县",
	                        "code": "532625"
	                    },
	                    {
	                        "value": "丘北县",
	                        "code": "532626"
	                    },
	                    {
	                        "value": "广南县",
	                        "code": "532627"
	                    },
	                    {
	                        "value": "富宁县",
	                        "code": "532628"
	                    }
	                ]
	            },
	            {
	                "value": "西双版纳傣族自治州",
	                "code": "532800",
	                "children": [
	                    {
	                        "value": "景洪市",
	                        "code": "532801"
	                    },
	                    {
	                        "value": "勐海县",
	                        "code": "532822"
	                    },
	                    {
	                        "value": "勐腊县",
	                        "code": "532823"
	                    }
	                ]
	            },
	            {
	                "value": "大理白族自治州",
	                "code": "532900",
	                "children": [
	                    {
	                        "value": "大理市",
	                        "code": "532901"
	                    },
	                    {
	                        "value": "漾濞彝族自治县",
	                        "code": "532922"
	                    },
	                    {
	                        "value": "祥云县",
	                        "code": "532923"
	                    },
	                    {
	                        "value": "宾川县",
	                        "code": "532924"
	                    },
	                    {
	                        "value": "弥渡县",
	                        "code": "532925"
	                    },
	                    {
	                        "value": "南涧彝族自治县",
	                        "code": "532926"
	                    },
	                    {
	                        "value": "巍山彝族回族自治县",
	                        "code": "532927"
	                    },
	                    {
	                        "value": "永平县",
	                        "code": "532928"
	                    },
	                    {
	                        "value": "云龙县",
	                        "code": "532929"
	                    },
	                    {
	                        "value": "洱源县",
	                        "code": "532930"
	                    },
	                    {
	                        "value": "剑川县",
	                        "code": "532931"
	                    },
	                    {
	                        "value": "鹤庆县",
	                        "code": "532932"
	                    }
	                ]
	            },
	            {
	                "value": "德宏傣族景颇族自治州",
	                "code": "533100",
	                "children": [
	                    {
	                        "value": "瑞丽市",
	                        "code": "533102"
	                    },
	                    {
	                        "value": "芒市",
	                        "code": "533103"
	                    },
	                    {
	                        "value": "梁河县",
	                        "code": "533122"
	                    },
	                    {
	                        "value": "盈江县",
	                        "code": "533123"
	                    },
	                    {
	                        "value": "陇川县",
	                        "code": "533124"
	                    }
	                ]
	            },
	            {
	                "value": "怒江傈僳族自治州",
	                "code": "533300",
	                "children": [
	                    {
	                        "value": "泸水市",
	                        "code": "533301"
	                    },
	                    {
	                        "value": "福贡县",
	                        "code": "533323"
	                    },
	                    {
	                        "value": "贡山独龙族怒族自治县",
	                        "code": "533324"
	                    },
	                    {
	                        "value": "兰坪白族普米族自治县",
	                        "code": "533325"
	                    }
	                ]
	            },
	            {
	                "value": "迪庆藏族自治州",
	                "code": "533400",
	                "children": [
	                    {
	                        "value": "香格里拉市",
	                        "code": "533401"
	                    },
	                    {
	                        "value": "德钦县",
	                        "code": "533422"
	                    },
	                    {
	                        "value": "维西傈僳族自治县",
	                        "code": "533423"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "西藏自治区",
	        "code": "540000",
	        "children": [
	            {
	                "value": "拉萨市",
	                "code": "540100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "540101"
	                    },
	                    {
	                        "value": "城关区",
	                        "code": "540102"
	                    },
	                    {
	                        "value": "堆龙德庆区",
	                        "code": "540103"
	                    },
	                    {
	                        "value": "林周县",
	                        "code": "540121"
	                    },
	                    {
	                        "value": "当雄县",
	                        "code": "540122"
	                    },
	                    {
	                        "value": "尼木县",
	                        "code": "540123"
	                    },
	                    {
	                        "value": "曲水县",
	                        "code": "540124"
	                    },
	                    {
	                        "value": "达孜县",
	                        "code": "540126"
	                    },
	                    {
	                        "value": "墨竹工卡县",
	                        "code": "540127"
	                    }
	                ]
	            },
	            {
	                "value": "日喀则市",
	                "code": "540200",
	                "children": [
	                    {
	                        "value": "桑珠孜区",
	                        "code": "540202"
	                    },
	                    {
	                        "value": "南木林县",
	                        "code": "540221"
	                    },
	                    {
	                        "value": "江孜县",
	                        "code": "540222"
	                    },
	                    {
	                        "value": "定日县",
	                        "code": "540223"
	                    },
	                    {
	                        "value": "萨迦县",
	                        "code": "540224"
	                    },
	                    {
	                        "value": "拉孜县",
	                        "code": "540225"
	                    },
	                    {
	                        "value": "昂仁县",
	                        "code": "540226"
	                    },
	                    {
	                        "value": "谢通门县",
	                        "code": "540227"
	                    },
	                    {
	                        "value": "白朗县",
	                        "code": "540228"
	                    },
	                    {
	                        "value": "仁布县",
	                        "code": "540229"
	                    },
	                    {
	                        "value": "康马县",
	                        "code": "540230"
	                    },
	                    {
	                        "value": "定结县",
	                        "code": "540231"
	                    },
	                    {
	                        "value": "仲巴县",
	                        "code": "540232"
	                    },
	                    {
	                        "value": "亚东县",
	                        "code": "540233"
	                    },
	                    {
	                        "value": "吉隆县",
	                        "code": "540234"
	                    },
	                    {
	                        "value": "聂拉木县",
	                        "code": "540235"
	                    },
	                    {
	                        "value": "萨嘎县",
	                        "code": "540236"
	                    },
	                    {
	                        "value": "岗巴县",
	                        "code": "540237"
	                    }
	                ]
	            },
	            {
	                "value": "昌都市",
	                "code": "540300",
	                "children": [
	                    {
	                        "value": "卡若区",
	                        "code": "540302"
	                    },
	                    {
	                        "value": "江达县",
	                        "code": "540321"
	                    },
	                    {
	                        "value": "贡觉县",
	                        "code": "540322"
	                    },
	                    {
	                        "value": "类乌齐县",
	                        "code": "540323"
	                    },
	                    {
	                        "value": "丁青县",
	                        "code": "540324"
	                    },
	                    {
	                        "value": "察雅县",
	                        "code": "540325"
	                    },
	                    {
	                        "value": "八宿县",
	                        "code": "540326"
	                    },
	                    {
	                        "value": "左贡县",
	                        "code": "540327"
	                    },
	                    {
	                        "value": "芒康县",
	                        "code": "540328"
	                    },
	                    {
	                        "value": "洛隆县",
	                        "code": "540329"
	                    },
	                    {
	                        "value": "边坝县",
	                        "code": "540330"
	                    }
	                ]
	            },
	            {
	                "value": "林芝市",
	                "code": "540400",
	                "children": [
	                    {
	                        "value": "巴宜区",
	                        "code": "540402"
	                    },
	                    {
	                        "value": "工布江达县",
	                        "code": "540421"
	                    },
	                    {
	                        "value": "米林县",
	                        "code": "540422"
	                    },
	                    {
	                        "value": "墨脱县",
	                        "code": "540423"
	                    },
	                    {
	                        "value": "波密县",
	                        "code": "540424"
	                    },
	                    {
	                        "value": "察隅县",
	                        "code": "540425"
	                    },
	                    {
	                        "value": "朗县",
	                        "code": "540426"
	                    }
	                ]
	            },
	            {
	                "value": "山南市",
	                "code": "540500",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "540501"
	                    },
	                    {
	                        "value": "乃东区",
	                        "code": "540502"
	                    },
	                    {
	                        "value": "扎囊县",
	                        "code": "540521"
	                    },
	                    {
	                        "value": "贡嘎县",
	                        "code": "540522"
	                    },
	                    {
	                        "value": "桑日县",
	                        "code": "540523"
	                    },
	                    {
	                        "value": "琼结县",
	                        "code": "540524"
	                    },
	                    {
	                        "value": "曲松县",
	                        "code": "540525"
	                    },
	                    {
	                        "value": "措美县",
	                        "code": "540526"
	                    },
	                    {
	                        "value": "洛扎县",
	                        "code": "540527"
	                    },
	                    {
	                        "value": "加查县",
	                        "code": "540528"
	                    },
	                    {
	                        "value": "隆子县",
	                        "code": "540529"
	                    },
	                    {
	                        "value": "错那县",
	                        "code": "540530"
	                    },
	                    {
	                        "value": "浪卡子县",
	                        "code": "540531"
	                    }
	                ]
	            },
	            {
	                "value": "那曲地区",
	                "code": "542400",
	                "children": [
	                    {
	                        "value": "那曲县",
	                        "code": "542421"
	                    },
	                    {
	                        "value": "嘉黎县",
	                        "code": "542422"
	                    },
	                    {
	                        "value": "比如县",
	                        "code": "542423"
	                    },
	                    {
	                        "value": "聂荣县",
	                        "code": "542424"
	                    },
	                    {
	                        "value": "安多县",
	                        "code": "542425"
	                    },
	                    {
	                        "value": "申扎县",
	                        "code": "542426"
	                    },
	                    {
	                        "value": "索县",
	                        "code": "542427"
	                    },
	                    {
	                        "value": "班戈县",
	                        "code": "542428"
	                    },
	                    {
	                        "value": "巴青县",
	                        "code": "542429"
	                    },
	                    {
	                        "value": "尼玛县",
	                        "code": "542430"
	                    },
	                    {
	                        "value": "双湖县",
	                        "code": "542431"
	                    }
	                ]
	            },
	            {
	                "value": "阿里地区",
	                "code": "542500",
	                "children": [
	                    {
	                        "value": "普兰县",
	                        "code": "542521"
	                    },
	                    {
	                        "value": "札达县",
	                        "code": "542522"
	                    },
	                    {
	                        "value": "噶尔县",
	                        "code": "542523"
	                    },
	                    {
	                        "value": "日土县",
	                        "code": "542524"
	                    },
	                    {
	                        "value": "革吉县",
	                        "code": "542525"
	                    },
	                    {
	                        "value": "改则县",
	                        "code": "542526"
	                    },
	                    {
	                        "value": "措勤县",
	                        "code": "542527"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "陕西省",
	        "code": "610000",
	        "children": [
	            {
	                "value": "西安市",
	                "code": "610100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "610101"
	                    },
	                    {
	                        "value": "新城区",
	                        "code": "610102"
	                    },
	                    {
	                        "value": "碑林区",
	                        "code": "610103"
	                    },
	                    {
	                        "value": "莲湖区",
	                        "code": "610104"
	                    },
	                    {
	                        "value": "灞桥区",
	                        "code": "610111"
	                    },
	                    {
	                        "value": "未央区",
	                        "code": "610112"
	                    },
	                    {
	                        "value": "雁塔区",
	                        "code": "610113"
	                    },
	                    {
	                        "value": "阎良区",
	                        "code": "610114"
	                    },
	                    {
	                        "value": "临潼区",
	                        "code": "610115"
	                    },
	                    {
	                        "value": "长安区",
	                        "code": "610116"
	                    },
	                    {
	                        "value": "高陵区",
	                        "code": "610117"
	                    },
	                    {
	                        "value": "蓝田县",
	                        "code": "610122"
	                    },
	                    {
	                        "value": "周至县",
	                        "code": "610124"
	                    },
	                    {
	                        "value": "户县",
	                        "code": "610125"
	                    }
	                ]
	            },
	            {
	                "value": "铜川市",
	                "code": "610200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "610201"
	                    },
	                    {
	                        "value": "王益区",
	                        "code": "610202"
	                    },
	                    {
	                        "value": "印台区",
	                        "code": "610203"
	                    },
	                    {
	                        "value": "耀州区",
	                        "code": "610204"
	                    },
	                    {
	                        "value": "宜君县",
	                        "code": "610222"
	                    }
	                ]
	            },
	            {
	                "value": "宝鸡市",
	                "code": "610300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "610301"
	                    },
	                    {
	                        "value": "渭滨区",
	                        "code": "610302"
	                    },
	                    {
	                        "value": "金台区",
	                        "code": "610303"
	                    },
	                    {
	                        "value": "陈仓区",
	                        "code": "610304"
	                    },
	                    {
	                        "value": "凤翔县",
	                        "code": "610322"
	                    },
	                    {
	                        "value": "岐山县",
	                        "code": "610323"
	                    },
	                    {
	                        "value": "扶风县",
	                        "code": "610324"
	                    },
	                    {
	                        "value": "眉县",
	                        "code": "610326"
	                    },
	                    {
	                        "value": "陇县",
	                        "code": "610327"
	                    },
	                    {
	                        "value": "千阳县",
	                        "code": "610328"
	                    },
	                    {
	                        "value": "麟游县",
	                        "code": "610329"
	                    },
	                    {
	                        "value": "凤县",
	                        "code": "610330"
	                    },
	                    {
	                        "value": "太白县",
	                        "code": "610331"
	                    }
	                ]
	            },
	            {
	                "value": "咸阳市",
	                "code": "610400",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "610401"
	                    },
	                    {
	                        "value": "秦都区",
	                        "code": "610402"
	                    },
	                    {
	                        "value": "杨陵区",
	                        "code": "610403"
	                    },
	                    {
	                        "value": "渭城区",
	                        "code": "610404"
	                    },
	                    {
	                        "value": "三原县",
	                        "code": "610422"
	                    },
	                    {
	                        "value": "泾阳县",
	                        "code": "610423"
	                    },
	                    {
	                        "value": "乾县",
	                        "code": "610424"
	                    },
	                    {
	                        "value": "礼泉县",
	                        "code": "610425"
	                    },
	                    {
	                        "value": "永寿县",
	                        "code": "610426"
	                    },
	                    {
	                        "value": "彬县",
	                        "code": "610427"
	                    },
	                    {
	                        "value": "长武县",
	                        "code": "610428"
	                    },
	                    {
	                        "value": "旬邑县",
	                        "code": "610429"
	                    },
	                    {
	                        "value": "淳化县",
	                        "code": "610430"
	                    },
	                    {
	                        "value": "武功县",
	                        "code": "610431"
	                    },
	                    {
	                        "value": "兴平市",
	                        "code": "610481"
	                    }
	                ]
	            },
	            {
	                "value": "渭南市",
	                "code": "610500",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "610501"
	                    },
	                    {
	                        "value": "临渭区",
	                        "code": "610502"
	                    },
	                    {
	                        "value": "华州区",
	                        "code": "610503"
	                    },
	                    {
	                        "value": "潼关县",
	                        "code": "610522"
	                    },
	                    {
	                        "value": "大荔县",
	                        "code": "610523"
	                    },
	                    {
	                        "value": "合阳县",
	                        "code": "610524"
	                    },
	                    {
	                        "value": "澄城县",
	                        "code": "610525"
	                    },
	                    {
	                        "value": "蒲城县",
	                        "code": "610526"
	                    },
	                    {
	                        "value": "白水县",
	                        "code": "610527"
	                    },
	                    {
	                        "value": "富平县",
	                        "code": "610528"
	                    },
	                    {
	                        "value": "韩城市",
	                        "code": "610581"
	                    },
	                    {
	                        "value": "华阴市",
	                        "code": "610582"
	                    }
	                ]
	            },
	            {
	                "value": "延安市",
	                "code": "610600",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "610601"
	                    },
	                    {
	                        "value": "宝塔区",
	                        "code": "610602"
	                    },
	                    {
	                        "value": "安塞区",
	                        "code": "610603"
	                    },
	                    {
	                        "value": "延长县",
	                        "code": "610621"
	                    },
	                    {
	                        "value": "延川县",
	                        "code": "610622"
	                    },
	                    {
	                        "value": "子长县",
	                        "code": "610623"
	                    },
	                    {
	                        "value": "志丹县",
	                        "code": "610625"
	                    },
	                    {
	                        "value": "吴起县",
	                        "code": "610626"
	                    },
	                    {
	                        "value": "甘泉县",
	                        "code": "610627"
	                    },
	                    {
	                        "value": "富县",
	                        "code": "610628"
	                    },
	                    {
	                        "value": "洛川县",
	                        "code": "610629"
	                    },
	                    {
	                        "value": "宜川县",
	                        "code": "610630"
	                    },
	                    {
	                        "value": "黄龙县",
	                        "code": "610631"
	                    },
	                    {
	                        "value": "黄陵县",
	                        "code": "610632"
	                    }
	                ]
	            },
	            {
	                "value": "汉中市",
	                "code": "610700",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "610701"
	                    },
	                    {
	                        "value": "汉台区",
	                        "code": "610702"
	                    },
	                    {
	                        "value": "南郑县",
	                        "code": "610721"
	                    },
	                    {
	                        "value": "城固县",
	                        "code": "610722"
	                    },
	                    {
	                        "value": "洋县",
	                        "code": "610723"
	                    },
	                    {
	                        "value": "西乡县",
	                        "code": "610724"
	                    },
	                    {
	                        "value": "勉县",
	                        "code": "610725"
	                    },
	                    {
	                        "value": "宁强县",
	                        "code": "610726"
	                    },
	                    {
	                        "value": "略阳县",
	                        "code": "610727"
	                    },
	                    {
	                        "value": "镇巴县",
	                        "code": "610728"
	                    },
	                    {
	                        "value": "留坝县",
	                        "code": "610729"
	                    },
	                    {
	                        "value": "佛坪县",
	                        "code": "610730"
	                    }
	                ]
	            },
	            {
	                "value": "榆林市",
	                "code": "610800",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "610801"
	                    },
	                    {
	                        "value": "榆阳区",
	                        "code": "610802"
	                    },
	                    {
	                        "value": "横山区",
	                        "code": "610803"
	                    },
	                    {
	                        "value": "神木县",
	                        "code": "610821"
	                    },
	                    {
	                        "value": "府谷县",
	                        "code": "610822"
	                    },
	                    {
	                        "value": "靖边县",
	                        "code": "610824"
	                    },
	                    {
	                        "value": "定边县",
	                        "code": "610825"
	                    },
	                    {
	                        "value": "绥德县",
	                        "code": "610826"
	                    },
	                    {
	                        "value": "米脂县",
	                        "code": "610827"
	                    },
	                    {
	                        "value": "佳县",
	                        "code": "610828"
	                    },
	                    {
	                        "value": "吴堡县",
	                        "code": "610829"
	                    },
	                    {
	                        "value": "清涧县",
	                        "code": "610830"
	                    },
	                    {
	                        "value": "子洲县",
	                        "code": "610831"
	                    }
	                ]
	            },
	            {
	                "value": "安康市",
	                "code": "610900",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "610901"
	                    },
	                    {
	                        "value": "汉滨区",
	                        "code": "610902"
	                    },
	                    {
	                        "value": "汉阴县",
	                        "code": "610921"
	                    },
	                    {
	                        "value": "石泉县",
	                        "code": "610922"
	                    },
	                    {
	                        "value": "宁陕县",
	                        "code": "610923"
	                    },
	                    {
	                        "value": "紫阳县",
	                        "code": "610924"
	                    },
	                    {
	                        "value": "岚皋县",
	                        "code": "610925"
	                    },
	                    {
	                        "value": "平利县",
	                        "code": "610926"
	                    },
	                    {
	                        "value": "镇坪县",
	                        "code": "610927"
	                    },
	                    {
	                        "value": "旬阳县",
	                        "code": "610928"
	                    },
	                    {
	                        "value": "白河县",
	                        "code": "610929"
	                    }
	                ]
	            },
	            {
	                "value": "商洛市",
	                "code": "611000",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "611001"
	                    },
	                    {
	                        "value": "商州区",
	                        "code": "611002"
	                    },
	                    {
	                        "value": "洛南县",
	                        "code": "611021"
	                    },
	                    {
	                        "value": "丹凤县",
	                        "code": "611022"
	                    },
	                    {
	                        "value": "商南县",
	                        "code": "611023"
	                    },
	                    {
	                        "value": "山阳县",
	                        "code": "611024"
	                    },
	                    {
	                        "value": "镇安县",
	                        "code": "611025"
	                    },
	                    {
	                        "value": "柞水县",
	                        "code": "611026"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "甘肃省",
	        "code": "620000",
	        "children": [
	            {
	                "value": "兰州市",
	                "code": "620100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "620101"
	                    },
	                    {
	                        "value": "城关区",
	                        "code": "620102"
	                    },
	                    {
	                        "value": "七里河区",
	                        "code": "620103"
	                    },
	                    {
	                        "value": "西固区",
	                        "code": "620104"
	                    },
	                    {
	                        "value": "安宁区",
	                        "code": "620105"
	                    },
	                    {
	                        "value": "红古区",
	                        "code": "620111"
	                    },
	                    {
	                        "value": "永登县",
	                        "code": "620121"
	                    },
	                    {
	                        "value": "皋兰县",
	                        "code": "620122"
	                    },
	                    {
	                        "value": "榆中县",
	                        "code": "620123"
	                    }
	                ]
	            },
	            {
	                "value": "嘉峪关市",
	                "code": "620200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "620201"
	                    }
	                ]
	            },
	            {
	                "value": "金昌市",
	                "code": "620300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "620301"
	                    },
	                    {
	                        "value": "金川区",
	                        "code": "620302"
	                    },
	                    {
	                        "value": "永昌县",
	                        "code": "620321"
	                    }
	                ]
	            },
	            {
	                "value": "白银市",
	                "code": "620400",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "620401"
	                    },
	                    {
	                        "value": "白银区",
	                        "code": "620402"
	                    },
	                    {
	                        "value": "平川区",
	                        "code": "620403"
	                    },
	                    {
	                        "value": "靖远县",
	                        "code": "620421"
	                    },
	                    {
	                        "value": "会宁县",
	                        "code": "620422"
	                    },
	                    {
	                        "value": "景泰县",
	                        "code": "620423"
	                    }
	                ]
	            },
	            {
	                "value": "天水市",
	                "code": "620500",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "620501"
	                    },
	                    {
	                        "value": "秦州区",
	                        "code": "620502"
	                    },
	                    {
	                        "value": "麦积区",
	                        "code": "620503"
	                    },
	                    {
	                        "value": "清水县",
	                        "code": "620521"
	                    },
	                    {
	                        "value": "秦安县",
	                        "code": "620522"
	                    },
	                    {
	                        "value": "甘谷县",
	                        "code": "620523"
	                    },
	                    {
	                        "value": "武山县",
	                        "code": "620524"
	                    },
	                    {
	                        "value": "张家川回族自治县",
	                        "code": "620525"
	                    }
	                ]
	            },
	            {
	                "value": "武威市",
	                "code": "620600",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "620601"
	                    },
	                    {
	                        "value": "凉州区",
	                        "code": "620602"
	                    },
	                    {
	                        "value": "民勤县",
	                        "code": "620621"
	                    },
	                    {
	                        "value": "古浪县",
	                        "code": "620622"
	                    },
	                    {
	                        "value": "天祝藏族自治县",
	                        "code": "620623"
	                    }
	                ]
	            },
	            {
	                "value": "张掖市",
	                "code": "620700",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "620701"
	                    },
	                    {
	                        "value": "甘州区",
	                        "code": "620702"
	                    },
	                    {
	                        "value": "肃南裕固族自治县",
	                        "code": "620721"
	                    },
	                    {
	                        "value": "民乐县",
	                        "code": "620722"
	                    },
	                    {
	                        "value": "临泽县",
	                        "code": "620723"
	                    },
	                    {
	                        "value": "高台县",
	                        "code": "620724"
	                    },
	                    {
	                        "value": "山丹县",
	                        "code": "620725"
	                    }
	                ]
	            },
	            {
	                "value": "平凉市",
	                "code": "620800",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "620801"
	                    },
	                    {
	                        "value": "崆峒区",
	                        "code": "620802"
	                    },
	                    {
	                        "value": "泾川县",
	                        "code": "620821"
	                    },
	                    {
	                        "value": "灵台县",
	                        "code": "620822"
	                    },
	                    {
	                        "value": "崇信县",
	                        "code": "620823"
	                    },
	                    {
	                        "value": "华亭县",
	                        "code": "620824"
	                    },
	                    {
	                        "value": "庄浪县",
	                        "code": "620825"
	                    },
	                    {
	                        "value": "静宁县",
	                        "code": "620826"
	                    }
	                ]
	            },
	            {
	                "value": "酒泉市",
	                "code": "620900",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "620901"
	                    },
	                    {
	                        "value": "肃州区",
	                        "code": "620902"
	                    },
	                    {
	                        "value": "金塔县",
	                        "code": "620921"
	                    },
	                    {
	                        "value": "瓜州县",
	                        "code": "620922"
	                    },
	                    {
	                        "value": "肃北蒙古族自治县",
	                        "code": "620923"
	                    },
	                    {
	                        "value": "阿克塞哈萨克族自治县",
	                        "code": "620924"
	                    },
	                    {
	                        "value": "玉门市",
	                        "code": "620981"
	                    },
	                    {
	                        "value": "敦煌市",
	                        "code": "620982"
	                    }
	                ]
	            },
	            {
	                "value": "庆阳市",
	                "code": "621000",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "621001"
	                    },
	                    {
	                        "value": "西峰区",
	                        "code": "621002"
	                    },
	                    {
	                        "value": "庆城县",
	                        "code": "621021"
	                    },
	                    {
	                        "value": "环县",
	                        "code": "621022"
	                    },
	                    {
	                        "value": "华池县",
	                        "code": "621023"
	                    },
	                    {
	                        "value": "合水县",
	                        "code": "621024"
	                    },
	                    {
	                        "value": "正宁县",
	                        "code": "621025"
	                    },
	                    {
	                        "value": "宁县",
	                        "code": "621026"
	                    },
	                    {
	                        "value": "镇原县",
	                        "code": "621027"
	                    }
	                ]
	            },
	            {
	                "value": "定西市",
	                "code": "621100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "621101"
	                    },
	                    {
	                        "value": "安定区",
	                        "code": "621102"
	                    },
	                    {
	                        "value": "通渭县",
	                        "code": "621121"
	                    },
	                    {
	                        "value": "陇西县",
	                        "code": "621122"
	                    },
	                    {
	                        "value": "渭源县",
	                        "code": "621123"
	                    },
	                    {
	                        "value": "临洮县",
	                        "code": "621124"
	                    },
	                    {
	                        "value": "漳县",
	                        "code": "621125"
	                    },
	                    {
	                        "value": "岷县",
	                        "code": "621126"
	                    }
	                ]
	            },
	            {
	                "value": "陇南市",
	                "code": "621200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "621201"
	                    },
	                    {
	                        "value": "武都区",
	                        "code": "621202"
	                    },
	                    {
	                        "value": "成县",
	                        "code": "621221"
	                    },
	                    {
	                        "value": "文县",
	                        "code": "621222"
	                    },
	                    {
	                        "value": "宕昌县",
	                        "code": "621223"
	                    },
	                    {
	                        "value": "康县",
	                        "code": "621224"
	                    },
	                    {
	                        "value": "西和县",
	                        "code": "621225"
	                    },
	                    {
	                        "value": "礼县",
	                        "code": "621226"
	                    },
	                    {
	                        "value": "徽县",
	                        "code": "621227"
	                    },
	                    {
	                        "value": "两当县",
	                        "code": "621228"
	                    }
	                ]
	            },
	            {
	                "value": "临夏回族自治州",
	                "code": "622900",
	                "children": [
	                    {
	                        "value": "临夏市",
	                        "code": "622901"
	                    },
	                    {
	                        "value": "临夏县",
	                        "code": "622921"
	                    },
	                    {
	                        "value": "康乐县",
	                        "code": "622922"
	                    },
	                    {
	                        "value": "永靖县",
	                        "code": "622923"
	                    },
	                    {
	                        "value": "广河县",
	                        "code": "622924"
	                    },
	                    {
	                        "value": "和政县",
	                        "code": "622925"
	                    },
	                    {
	                        "value": "东乡族自治县",
	                        "code": "622926"
	                    },
	                    {
	                        "value": "积石山保安族东乡族撒拉族自治县",
	                        "code": "622927"
	                    }
	                ]
	            },
	            {
	                "value": "甘南藏族自治州",
	                "code": "623000",
	                "children": [
	                    {
	                        "value": "合作市",
	                        "code": "623001"
	                    },
	                    {
	                        "value": "临潭县",
	                        "code": "623021"
	                    },
	                    {
	                        "value": "卓尼县",
	                        "code": "623022"
	                    },
	                    {
	                        "value": "舟曲县",
	                        "code": "623023"
	                    },
	                    {
	                        "value": "迭部县",
	                        "code": "623024"
	                    },
	                    {
	                        "value": "玛曲县",
	                        "code": "623025"
	                    },
	                    {
	                        "value": "碌曲县",
	                        "code": "623026"
	                    },
	                    {
	                        "value": "夏河县",
	                        "code": "623027"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "青海省",
	        "code": "630000",
	        "children": [
	            {
	                "value": "西宁市",
	                "code": "630100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "630101"
	                    },
	                    {
	                        "value": "城东区",
	                        "code": "630102"
	                    },
	                    {
	                        "value": "城中区",
	                        "code": "630103"
	                    },
	                    {
	                        "value": "城西区",
	                        "code": "630104"
	                    },
	                    {
	                        "value": "城北区",
	                        "code": "630105"
	                    },
	                    {
	                        "value": "大通回族土族自治县",
	                        "code": "630121"
	                    },
	                    {
	                        "value": "湟中县",
	                        "code": "630122"
	                    },
	                    {
	                        "value": "湟源县",
	                        "code": "630123"
	                    }
	                ]
	            },
	            {
	                "value": "海东市",
	                "code": "630200",
	                "children": [
	                    {
	                        "value": "乐都区",
	                        "code": "630202"
	                    },
	                    {
	                        "value": "平安区",
	                        "code": "630203"
	                    },
	                    {
	                        "value": "民和回族土族自治县",
	                        "code": "630222"
	                    },
	                    {
	                        "value": "互助土族自治县",
	                        "code": "630223"
	                    },
	                    {
	                        "value": "化隆回族自治县",
	                        "code": "630224"
	                    },
	                    {
	                        "value": "循化撒拉族自治县",
	                        "code": "630225"
	                    }
	                ]
	            },
	            {
	                "value": "海北藏族自治州",
	                "code": "632200",
	                "children": [
	                    {
	                        "value": "门源回族自治县",
	                        "code": "632221"
	                    },
	                    {
	                        "value": "祁连县",
	                        "code": "632222"
	                    },
	                    {
	                        "value": "海晏县",
	                        "code": "632223"
	                    },
	                    {
	                        "value": "刚察县",
	                        "code": "632224"
	                    }
	                ]
	            },
	            {
	                "value": "黄南藏族自治州",
	                "code": "632300",
	                "children": [
	                    {
	                        "value": "同仁县",
	                        "code": "632321"
	                    },
	                    {
	                        "value": "尖扎县",
	                        "code": "632322"
	                    },
	                    {
	                        "value": "泽库县",
	                        "code": "632323"
	                    },
	                    {
	                        "value": "河南蒙古族自治县",
	                        "code": "632324"
	                    }
	                ]
	            },
	            {
	                "value": "海南藏族自治州",
	                "code": "632500",
	                "children": [
	                    {
	                        "value": "共和县",
	                        "code": "632521"
	                    },
	                    {
	                        "value": "同德县",
	                        "code": "632522"
	                    },
	                    {
	                        "value": "贵德县",
	                        "code": "632523"
	                    },
	                    {
	                        "value": "兴海县",
	                        "code": "632524"
	                    },
	                    {
	                        "value": "贵南县",
	                        "code": "632525"
	                    }
	                ]
	            },
	            {
	                "value": "果洛藏族自治州",
	                "code": "632600",
	                "children": [
	                    {
	                        "value": "玛沁县",
	                        "code": "632621"
	                    },
	                    {
	                        "value": "班玛县",
	                        "code": "632622"
	                    },
	                    {
	                        "value": "甘德县",
	                        "code": "632623"
	                    },
	                    {
	                        "value": "达日县",
	                        "code": "632624"
	                    },
	                    {
	                        "value": "久治县",
	                        "code": "632625"
	                    },
	                    {
	                        "value": "玛多县",
	                        "code": "632626"
	                    }
	                ]
	            },
	            {
	                "value": "玉树藏族自治州",
	                "code": "632700",
	                "children": [
	                    {
	                        "value": "玉树市",
	                        "code": "632701"
	                    },
	                    {
	                        "value": "杂多县",
	                        "code": "632722"
	                    },
	                    {
	                        "value": "称多县",
	                        "code": "632723"
	                    },
	                    {
	                        "value": "治多县",
	                        "code": "632724"
	                    },
	                    {
	                        "value": "囊谦县",
	                        "code": "632725"
	                    },
	                    {
	                        "value": "曲麻莱县",
	                        "code": "632726"
	                    }
	                ]
	            },
	            {
	                "value": "海西蒙古族藏族自治州",
	                "code": "632800",
	                "children": [
	                    {
	                        "value": "格尔木市",
	                        "code": "632801"
	                    },
	                    {
	                        "value": "德令哈市",
	                        "code": "632802"
	                    },
	                    {
	                        "value": "乌兰县",
	                        "code": "632821"
	                    },
	                    {
	                        "value": "都兰县",
	                        "code": "632822"
	                    },
	                    {
	                        "value": "天峻县",
	                        "code": "632823"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "宁夏回族自治区",
	        "code": "640000",
	        "children": [
	            {
	                "value": "银川市",
	                "code": "640100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "640101"
	                    },
	                    {
	                        "value": "兴庆区",
	                        "code": "640104"
	                    },
	                    {
	                        "value": "西夏区",
	                        "code": "640105"
	                    },
	                    {
	                        "value": "金凤区",
	                        "code": "640106"
	                    },
	                    {
	                        "value": "永宁县",
	                        "code": "640121"
	                    },
	                    {
	                        "value": "贺兰县",
	                        "code": "640122"
	                    },
	                    {
	                        "value": "灵武市",
	                        "code": "640181"
	                    }
	                ]
	            },
	            {
	                "value": "石嘴山市",
	                "code": "640200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "640201"
	                    },
	                    {
	                        "value": "大武口区",
	                        "code": "640202"
	                    },
	                    {
	                        "value": "惠农区",
	                        "code": "640205"
	                    },
	                    {
	                        "value": "平罗县",
	                        "code": "640221"
	                    }
	                ]
	            },
	            {
	                "value": "吴忠市",
	                "code": "640300",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "640301"
	                    },
	                    {
	                        "value": "利通区",
	                        "code": "640302"
	                    },
	                    {
	                        "value": "红寺堡区",
	                        "code": "640303"
	                    },
	                    {
	                        "value": "盐池县",
	                        "code": "640323"
	                    },
	                    {
	                        "value": "同心县",
	                        "code": "640324"
	                    },
	                    {
	                        "value": "青铜峡市",
	                        "code": "640381"
	                    }
	                ]
	            },
	            {
	                "value": "固原市",
	                "code": "640400",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "640401"
	                    },
	                    {
	                        "value": "原州区",
	                        "code": "640402"
	                    },
	                    {
	                        "value": "西吉县",
	                        "code": "640422"
	                    },
	                    {
	                        "value": "隆德县",
	                        "code": "640423"
	                    },
	                    {
	                        "value": "泾源县",
	                        "code": "640424"
	                    },
	                    {
	                        "value": "彭阳县",
	                        "code": "640425"
	                    }
	                ]
	            },
	            {
	                "value": "中卫市",
	                "code": "640500",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "640501"
	                    },
	                    {
	                        "value": "沙坡头区",
	                        "code": "640502"
	                    },
	                    {
	                        "value": "中宁县",
	                        "code": "640521"
	                    },
	                    {
	                        "value": "海原县",
	                        "code": "640522"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "新疆维吾尔自治区",
	        "code": "650000",
	        "children": [
	            {
	                "value": "乌鲁木齐市",
	                "code": "650100",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "650101"
	                    },
	                    {
	                        "value": "天山区",
	                        "code": "650102"
	                    },
	                    {
	                        "value": "沙依巴克区",
	                        "code": "650103"
	                    },
	                    {
	                        "value": "新市区",
	                        "code": "650104"
	                    },
	                    {
	                        "value": "水磨沟区",
	                        "code": "650105"
	                    },
	                    {
	                        "value": "头屯河区",
	                        "code": "650106"
	                    },
	                    {
	                        "value": "达坂城区",
	                        "code": "650107"
	                    },
	                    {
	                        "value": "米东区",
	                        "code": "650109"
	                    },
	                    {
	                        "value": "乌鲁木齐县",
	                        "code": "650121"
	                    }
	                ]
	            },
	            {
	                "value": "克拉玛依市",
	                "code": "650200",
	                "children": [
	                    {
	                        "value": "市辖区",
	                        "code": "650201"
	                    },
	                    {
	                        "value": "独山子区",
	                        "code": "650202"
	                    },
	                    {
	                        "value": "克拉玛依区",
	                        "code": "650203"
	                    },
	                    {
	                        "value": "白碱滩区",
	                        "code": "650204"
	                    },
	                    {
	                        "value": "乌尔禾区",
	                        "code": "650205"
	                    }
	                ]
	            },
	            {
	                "value": "吐鲁番市",
	                "code": "650400",
	                "children": [
	                    {
	                        "value": "高昌区",
	                        "code": "650402"
	                    },
	                    {
	                        "value": "鄯善县",
	                        "code": "650421"
	                    },
	                    {
	                        "value": "托克逊县",
	                        "code": "650422"
	                    }
	                ]
	            },
	            {
	                "value": "哈密市",
	                "code": "650500",
	                "children": [
	                    {
	                        "value": "伊州区",
	                        "code": "650502"
	                    },
	                    {
	                        "value": "巴里坤哈萨克自治县",
	                        "code": "650521"
	                    },
	                    {
	                        "value": "伊吾县",
	                        "code": "650522"
	                    }
	                ]
	            },
	            {
	                "value": "昌吉回族自治州",
	                "code": "652300",
	                "children": [
	                    {
	                        "value": "昌吉市",
	                        "code": "652301"
	                    },
	                    {
	                        "value": "阜康市",
	                        "code": "652302"
	                    },
	                    {
	                        "value": "呼图壁县",
	                        "code": "652323"
	                    },
	                    {
	                        "value": "玛纳斯县",
	                        "code": "652324"
	                    },
	                    {
	                        "value": "奇台县",
	                        "code": "652325"
	                    },
	                    {
	                        "value": "吉木萨尔县",
	                        "code": "652327"
	                    },
	                    {
	                        "value": "木垒哈萨克自治县",
	                        "code": "652328"
	                    }
	                ]
	            },
	            {
	                "value": "博尔塔拉蒙古自治州",
	                "code": "652700",
	                "children": [
	                    {
	                        "value": "博乐市",
	                        "code": "652701"
	                    },
	                    {
	                        "value": "阿拉山口市",
	                        "code": "652702"
	                    },
	                    {
	                        "value": "精河县",
	                        "code": "652722"
	                    },
	                    {
	                        "value": "温泉县",
	                        "code": "652723"
	                    }
	                ]
	            },
	            {
	                "value": "巴音郭楞蒙古自治州",
	                "code": "652800",
	                "children": [
	                    {
	                        "value": "库尔勒市",
	                        "code": "652801"
	                    },
	                    {
	                        "value": "轮台县",
	                        "code": "652822"
	                    },
	                    {
	                        "value": "尉犁县",
	                        "code": "652823"
	                    },
	                    {
	                        "value": "若羌县",
	                        "code": "652824"
	                    },
	                    {
	                        "value": "且末县",
	                        "code": "652825"
	                    },
	                    {
	                        "value": "焉耆回族自治县",
	                        "code": "652826"
	                    },
	                    {
	                        "value": "和静县",
	                        "code": "652827"
	                    },
	                    {
	                        "value": "和硕县",
	                        "code": "652828"
	                    },
	                    {
	                        "value": "博湖县",
	                        "code": "652829"
	                    }
	                ]
	            },
	            {
	                "value": "阿克苏地区",
	                "code": "652900",
	                "children": [
	                    {
	                        "value": "阿克苏市",
	                        "code": "652901"
	                    },
	                    {
	                        "value": "温宿县",
	                        "code": "652922"
	                    },
	                    {
	                        "value": "库车县",
	                        "code": "652923"
	                    },
	                    {
	                        "value": "沙雅县",
	                        "code": "652924"
	                    },
	                    {
	                        "value": "新和县",
	                        "code": "652925"
	                    },
	                    {
	                        "value": "拜城县",
	                        "code": "652926"
	                    },
	                    {
	                        "value": "乌什县",
	                        "code": "652927"
	                    },
	                    {
	                        "value": "阿瓦提县",
	                        "code": "652928"
	                    },
	                    {
	                        "value": "柯坪县",
	                        "code": "652929"
	                    }
	                ]
	            },
	            {
	                "value": "克孜勒苏柯尔克孜自治州",
	                "code": "653000",
	                "children": [
	                    {
	                        "value": "阿图什市",
	                        "code": "653001"
	                    },
	                    {
	                        "value": "阿克陶县",
	                        "code": "653022"
	                    },
	                    {
	                        "value": "阿合奇县",
	                        "code": "653023"
	                    },
	                    {
	                        "value": "乌恰县",
	                        "code": "653024"
	                    }
	                ]
	            },
	            {
	                "value": "喀什地区",
	                "code": "653100",
	                "children": [
	                    {
	                        "value": "喀什市",
	                        "code": "653101"
	                    },
	                    {
	                        "value": "疏附县",
	                        "code": "653121"
	                    },
	                    {
	                        "value": "疏勒县",
	                        "code": "653122"
	                    },
	                    {
	                        "value": "英吉沙县",
	                        "code": "653123"
	                    },
	                    {
	                        "value": "泽普县",
	                        "code": "653124"
	                    },
	                    {
	                        "value": "莎车县",
	                        "code": "653125"
	                    },
	                    {
	                        "value": "叶城县",
	                        "code": "653126"
	                    },
	                    {
	                        "value": "麦盖提县",
	                        "code": "653127"
	                    },
	                    {
	                        "value": "岳普湖县",
	                        "code": "653128"
	                    },
	                    {
	                        "value": "伽师县",
	                        "code": "653129"
	                    },
	                    {
	                        "value": "巴楚县",
	                        "code": "653130"
	                    },
	                    {
	                        "value": "塔什库尔干塔吉克自治县",
	                        "code": "653131"
	                    }
	                ]
	            },
	            {
	                "value": "和田地区",
	                "code": "653200",
	                "children": [
	                    {
	                        "value": "和田市",
	                        "code": "653201"
	                    },
	                    {
	                        "value": "和田县",
	                        "code": "653221"
	                    },
	                    {
	                        "value": "墨玉县",
	                        "code": "653222"
	                    },
	                    {
	                        "value": "皮山县",
	                        "code": "653223"
	                    },
	                    {
	                        "value": "洛浦县",
	                        "code": "653224"
	                    },
	                    {
	                        "value": "策勒县",
	                        "code": "653225"
	                    },
	                    {
	                        "value": "于田县",
	                        "code": "653226"
	                    },
	                    {
	                        "value": "民丰县",
	                        "code": "653227"
	                    }
	                ]
	            },
	            {
	                "value": "伊犁哈萨克自治州",
	                "code": "654000",
	                "children": [
	                    {
	                        "value": "伊宁市",
	                        "code": "654002"
	                    },
	                    {
	                        "value": "奎屯市",
	                        "code": "654003"
	                    },
	                    {
	                        "value": "霍尔果斯市",
	                        "code": "654004"
	                    },
	                    {
	                        "value": "伊宁县",
	                        "code": "654021"
	                    },
	                    {
	                        "value": "察布查尔锡伯自治县",
	                        "code": "654022"
	                    },
	                    {
	                        "value": "霍城县",
	                        "code": "654023"
	                    },
	                    {
	                        "value": "巩留县",
	                        "code": "654024"
	                    },
	                    {
	                        "value": "新源县",
	                        "code": "654025"
	                    },
	                    {
	                        "value": "昭苏县",
	                        "code": "654026"
	                    },
	                    {
	                        "value": "特克斯县",
	                        "code": "654027"
	                    },
	                    {
	                        "value": "尼勒克县",
	                        "code": "654028"
	                    }
	                ]
	            },
	            {
	                "value": "塔城地区",
	                "code": "654200",
	                "children": [
	                    {
	                        "value": "塔城市",
	                        "code": "654201"
	                    },
	                    {
	                        "value": "乌苏市",
	                        "code": "654202"
	                    },
	                    {
	                        "value": "额敏县",
	                        "code": "654221"
	                    },
	                    {
	                        "value": "沙湾县",
	                        "code": "654223"
	                    },
	                    {
	                        "value": "托里县",
	                        "code": "654224"
	                    },
	                    {
	                        "value": "裕民县",
	                        "code": "654225"
	                    },
	                    {
	                        "value": "和布克赛尔蒙古自治县",
	                        "code": "654226"
	                    }
	                ]
	            },
	            {
	                "value": "阿勒泰地区",
	                "code": "654300",
	                "children": [
	                    {
	                        "value": "阿勒泰市",
	                        "code": "654301"
	                    },
	                    {
	                        "value": "布尔津县",
	                        "code": "654321"
	                    },
	                    {
	                        "value": "富蕴县",
	                        "code": "654322"
	                    },
	                    {
	                        "value": "福海县",
	                        "code": "654323"
	                    },
	                    {
	                        "value": "哈巴河县",
	                        "code": "654324"
	                    },
	                    {
	                        "value": "青河县",
	                        "code": "654325"
	                    },
	                    {
	                        "value": "吉木乃县",
	                        "code": "654326"
	                    }
	                ]
	            },
	            {
	                "value": "自治区直辖县级行政区划",
	                "code": "659000",
	                "children": [
	                    {
	                        "value": "石河子市",
	                        "code": "659001"
	                    },
	                    {
	                        "value": "阿拉尔市",
	                        "code": "659002"
	                    },
	                    {
	                        "value": "图木舒克市",
	                        "code": "659003"
	                    },
	                    {
	                        "value": "五家渠市",
	                        "code": "659004"
	                    },
	                    {
	                        "value": "铁门关市",
	                        "code": "659006"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "台湾省",
	        "code": "710000",
	        "children": [
	            {
	                "value": "台湾",
	                "code": "710100",
	                "children": [
	                    {
	                        "value": "台北市",
	                        "code": "710101"
	                    },
	                    {
	                        "value": "高雄市",
	                        "code": "710102"
	                    },
	                    {
	                        "value": "台北县",
	                        "code": "710103"
	                    },
	                    {
	                        "value": "桃园县",
	                        "code": "710104"
	                    },
	                    {
	                        "value": "新竹县",
	                        "code": "710105"
	                    },
	                    {
	                        "value": "苗栗县",
	                        "code": "710106"
	                    },
	                    {
	                        "value": "台中县",
	                        "code": "710107"
	                    },
	                    {
	                        "value": "彰化县",
	                        "code": "710108"
	                    },
	                    {
	                        "value": "南投县",
	                        "code": "710109"
	                    },
	                    {
	                        "value": "云林县",
	                        "code": "710110"
	                    },
	                    {
	                        "value": "嘉义县",
	                        "code": "710111"
	                    },
	                    {
	                        "value": "台南县",
	                        "code": "710112"
	                    },
	                    {
	                        "value": "高雄县",
	                        "code": "710113"
	                    },
	                    {
	                        "value": "屏东县",
	                        "code": "710114"
	                    },
	                    {
	                        "value": "宜兰县",
	                        "code": "710115"
	                    },
	                    {
	                        "value": "花莲县",
	                        "code": "710116"
	                    },
	                    {
	                        "value": "台东县",
	                        "code": "710117"
	                    },
	                    {
	                        "value": "澎湖县",
	                        "code": "710118"
	                    },
	                    {
	                        "value": "基隆市",
	                        "code": "710119"
	                    },
	                    {
	                        "value": "新竹市",
	                        "code": "710120"
	                    },
	                    {
	                        "value": "台中市",
	                        "code": "710121"
	                    },
	                    {
	                        "value": "嘉义市",
	                        "code": "710122"
	                    },
	                    {
	                        "value": "台南市",
	                        "code": "710123"
	                    },
	                    {
	                        "value": "其他",
	                        "code": "710124"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "香港特别行政区",
	        "code": "810000",
	        "children": [
	            {
	                "value": "香港",
	                "code": "810100",
	                "children": [
	                    {
	                        "value": "中西区",
	                        "code": "810101"
	                    },
	                    {
	                        "value": "湾仔区",
	                        "code": "810102"
	                    },
	                    {
	                        "value": "东区",
	                        "code": "810103"
	                    },
	                    {
	                        "value": "南区",
	                        "code": "810104"
	                    },
	                    {
	                        "value": "深水埗区",
	                        "code": "810105"
	                    },
	                    {
	                        "value": "油尖旺区",
	                        "code": "810106"
	                    },
	                    {
	                        "value": "九龙城区",
	                        "code": "810107"
	                    },
	                    {
	                        "value": "黄大仙区",
	                        "code": "810108"
	                    },
	                    {
	                        "value": "观塘区",
	                        "code": "810109"
	                    },
	                    {
	                        "value": "北区",
	                        "code": "810110"
	                    },
	                    {
	                        "value": "大埔区",
	                        "code": "810111"
	                    },
	                    {
	                        "value": "沙田区",
	                        "code": "810112"
	                    },
	                    {
	                        "value": "西贡区",
	                        "code": "810113"
	                    },
	                    {
	                        "value": "元朗区",
	                        "code": "810114"
	                    },
	                    {
	                        "value": "屯门区",
	                        "code": "810115"
	                    },
	                    {
	                        "value": "荃湾区",
	                        "code": "810116"
	                    },
	                    {
	                        "value": "葵青区",
	                        "code": "810117"
	                    },
	                    {
	                        "value": "离岛区",
	                        "code": "810118"
	                    },
	                    {
	                        "value": "其他",
	                        "code": "810119"
	                    }
	                ]
	            }
	        ]
	    },
	    {
	        "value": "澳门特别行政区",
	        "code":"820000",
	        "children": [
	            {
	                "value": "澳门",
	                "code":"820100",
	                "children": [
	                    {
	                        "value": "花地玛堂区",
	                        "code":"820101"
	                    },
	                    {
	                        "value": "圣安多尼堂区",
	                        "code":"820102"
	                    },
	                    {
	                        "value": "大堂区",
	                        "code":"820103"
	                    },
	                    {
	                        "value": "望德堂区",
	                        "code":"820104"
	                    },
	                    {
	                        "value": "风顺堂区",
	                        "code":"820105"
	                    },
	                    {
	                        "value": "嘉模堂区",
	                        "code":"820106"
	                    },
	                    {
	                        "value": "圣方济各堂区",
	                        "code":"820107"
	                    },
	                    {
	                        "value": "路凼",
	                        "code":"820108"
	                    },
	                    {
	                        "value": "其他",
	                        "code":"820109"
	                    }
	                ]
	            }
	        ]
	    }
	];
	var title = {"province":"省","city":"市","county":"区/县"};
	var defaultCode = {"allowSelect":"true","provinceCode":"","cityCode":"","countyCode":""};
	var name = {"provinceName":"select1","cityName":"select2","countyName":"select3"};
	var oldId,curId = "";
	var same = false; //判断是否同一个组件对象
	/**
	     * Cascader组件
	     *
	     * @param data 级联json数据
	     * @param title 级联title
	     * @param defaultCode 默认项
	     * @param disabledCode 禁选项
	     *
	     * 示例:
	     *
	     *     @example
	     *     <Cascader id="cascader" className="cascader" defaultCode={默认项} disabledCode={禁选项} data={data} title={title} ></Cascader>
	     */
	var Cascader = React.createClass({displayName: "Cascader",
	    display: "inline-block",
	    cursorVal:"auto",
	    getDefaultProps:function (){
	        return {
	            id:"",   //自定义id
	            className:"",    //自定义class
	            data:Address,             //默认数据
	            title:title,              //默认单位
	            defaultCode:defaultCode,  //默认选中项
	            name:name                //默认select表单name
	        }   
	    },
	    getInitialState: function(){
	        return {
	            province: [],   //省的下拉项
	            city: [],    //市的下拉项
	            county: [],  //区的下拉项
	            provinceSelect: "请选择",  //下拉框初始值
	            citySelect: "请选择",      //下拉框初始值
	            countySelect: "请选择",    //下拉框初始值
	            provinceIndex:-1,    //当前省的索引
	            cityIndex:-1,       //当前市的索引
	            jsonValue:{},       //选中的json数据  
	            index:0,            //是否显示下拉框样式
	            didSelect1:false,   //当前选中样式
	            didSelect2:false,
	            didSelect3:false
	        };
	    },
	    provinceOption: function(provinceCode,cityCode,countyCode){
	        var that = this;
	        var strHtml = [];
	        this.props.data && this.props.data.map(function(array, index){
	            if(provinceCode && provinceCode == array.code){
	                that.refs.selectValue1.className = index;
	                that.state.jsonValue.provinceCode = provinceCode;
	                that.setState({
	                    city: that.cityOption(cityCode,countyCode),
	                    provinceSelect:array.value,
	                    provinceIndex:index,
	                    didSelect1:true,
	                    jsonValue:that.state.jsonValue
	                });
	            }
	            var on = true;
	            if(that.props.disabledCode){
	                for( i= 0;  i < that.props.disabledCode.length; i++){  
	                    if(that.props.disabledCode[i] == array.code){
	                        on = false;
	                        break;
	                    }
	                }
	            }
	            if (on) {
	                strHtml.push(React.createElement("li", {key: index, "data-index": index, "data-code": array.code, onClick: that.provinceChange}, array.value));
	            }else{
	                strHtml.push(React.createElement("li", {key: index, "data-index": index, "data-code": array.code, "data-disabled": true, style: {"cursor":"not-allowed"}, onClick: that.provinceChange}, array.value));
	            } 
	        });
	        return strHtml;
	    },
	    cityOption: function(cityCode,countyCode){
	        var that = this;
	        var strHtml = [];
	        var provinceIndex;
	        if(this.refs.selectValue1){
	            provinceIndex = this.refs.selectValue1.className;
	        }else{
	            return false;
	        }
	        if(provinceIndex == -1){
	            return false;
	        }else{
	            this.props.data[provinceIndex].children && this.props.data[provinceIndex].children.map(function(array, index){
	               if(cityCode && cityCode == array.code){
	                    that.refs.selectValue2.className = index;
	                    that.state.jsonValue.cityCode = cityCode;
	                    that.setState({
	                        county: that.countyOption(countyCode),
	                        citySelect:array.value,
	                        provinceIndex:that.refs.selectValue1.className,
	                        cityIndex:index,
	                        didSelect2:true,
	                        jsonValue:that.state.jsonValue
	                    });
	                }
	                var on = true;
	                if(that.props.disabledCode){
	                    for( i= 0;  i < that.props.disabledCode.length; i++){  
	                        if(that.props.disabledCode[i] == array.code){
	                            on = false;
	                            break;
	                        }
	                    }
	                }
	                if (on) {
	                    strHtml.push(React.createElement("li", {key: index, "data-index": index, "data-code": array.code, onClick: that.cityChange}, array.value));
	                }else{
	                    strHtml.push(React.createElement("li", {key: index, "data-index": index, "data-code": array.code, "data-disabled": true, style: {"cursor":"not-allowed"}, onClick: that.cityChange}, array.value));
	                } 
	            });
	            return strHtml;
	        }
	    },
	    countyOption: function(countyCode){
	        var that = this;
	        var strHtml = [];
	        var provinceIndex,cityIndex;
	        if(this.refs.selectValue1 && this.refs.selectValue2){
	            provinceIndex = this.refs.selectValue1.className;
	            cityIndex = this.refs.selectValue2.className;
	        }else{
	            return false;
	        }
	        if(cityIndex == -1){    
	            return false;
	        }else{
	            this.props.data[provinceIndex].children[cityIndex].children && this.props.data[provinceIndex].children[cityIndex].children.map(function(array, index){
	                if(countyCode && countyCode == array.code){
	                    that.state.jsonValue.countyCode = countyCode;
	                    that.setState({
	                        countySelect:array.value,
	                        provinceIndex:that.refs.selectValue1.className,
	                        cityIndex:that.refs.selectValue2.className,
	                        didSelect3:true,
	                        jsonValue:that.state.jsonValue
	                    });
	                }
	                var on = true;
	                if(that.props.disabledCode){
	                    for( i= 0;  i < that.props.disabledCode.length; i++){
	                        if(that.props.disabledCode[i] == array.code){
	                            on = false;
	                            break;
	                        }
	                    }
	                }
	                if (on) {
	                    strHtml.push(React.createElement("li", {key: index, "data-index": index, "data-code": array.code, onClick: that.countyChange}, array.value));
	                }else{
	                    strHtml.push(React.createElement("li", {key: index, "data-index": index, "data-code": array.code, "data-disabled": true, style: {"cursor":"not-allowed"}, onClick: that.countyChange}, array.value));
	                } 
	            });
	            return strHtml;
	        }
	    },
	    provinceChange: function(e){
	        if(e.target.getAttribute("data-disabled")){
	            return false;
	        }
	        if( oldId == curId && this.refs.selectValue1.className == e.target.getAttribute("data-index")){
	            return false;
	        }else{
	            oldId = curId;
	        }
	        this.refs.selectValue1.className = e.target.getAttribute("data-index");
	        this.refs.selectValue2.className = -1;
	        this.state.jsonValue.provinceCode = e.target.getAttribute("data-code");
	        delete this.state.jsonValue["cityCode"];
	        delete this.state.jsonValue["countyCode"];
	        this.setState({
	            city: this.cityOption(),      //根据省的索引provinceIndex遍历对应的地级市
	            county: this.countyOption(),   //由于index.cityIndex = -1，不遍历县级市
	            provinceSelect:e.target.innerHTML,
	            citySelect: "请选择",
	            countySelect: "请选择",
	            provinceIndex:e.target.getAttribute("data-index"),
	            cityIndex:-1,
	            jsonValue:this.state.jsonValue,
	            index:0,
	            didSelect1:true,
	            didSelect2:false,
	            didSelect3:false 
	        });
	    },
	    cityChange: function(e){
	        if(e.target.getAttribute("data-disabled")){
	            return false;
	        }
	        if( oldId == curId && this.refs.selectValue2.className == e.target.getAttribute("data-index")){
	            return false;
	        }else{
	            oldId = curId;
	        }
	        this.refs.selectValue2.className = e.target.getAttribute("data-index");
	        this.state.jsonValue.cityCode = e.target.getAttribute("data-code");
	        delete this.state.jsonValue["countyCode"];
	        this.setState({
	            county: this.countyOption(),
	            citySelect:e.target.innerHTML,
	            countySelect: "请选择",
	            cityIndex:e.target.getAttribute("data-index"),
	            jsonValue:this.state.jsonValue,
	            index:0,
	            didSelect2:true,
	            didSelect3:false 
	        });
	    },
	    countyChange: function(e){
	        if(e.target.getAttribute("data-disabled")){
	            return false;
	        }
	        this.state.jsonValue.countyCode = e.target.getAttribute("data-code");
	        this.setState({
	            countySelect:e.target.innerHTML,
	            jsonValue:this.state.jsonValue,
	            index:0,
	            didSelect3:true 
	        });   
	    },
	    componentDidMount: function(){
	        var that = this;
	        if (document.addEventListener) {
	            document.addEventListener('click', function(){
	                that.setState({index:0});
	            });
	        } else {
	            document.attachEvent('click', function(){
	                that.setState({index:0});
	            });
	        }
	        var provinceCode = this.props.defaultCode.provinceCode;
	        var cityCode = this.props.defaultCode.cityCode;
	        var countyCode = this.props.defaultCode.countyCode;
	        this.setState({
	            province:this.provinceOption(provinceCode,cityCode,countyCode)
	        });
	    },
	    componentWillReceiveProps:function (newProps) { 
	        var provinceCode = newProps.defaultCode.provinceCode;
	        var cityCode = newProps.defaultCode.cityCode;
	        var countyCode = newProps.defaultCode.countyCode;
	        this.setState({
	            province:this.provinceOption(provinceCode,cityCode,countyCode)
	        });
	    },
	    open:function(e){
	        if(this.props.defaultCode.allowSelect == "false"){
	            return false;
	        }
	        curId = e.target.parentNode.parentNode.parentNode.getAttribute("id");
	        if(oldId != curId ){
	            same = false;
	            var selectBox = document.querySelectorAll(".ucs-cascader-select");
	            var dropdownBox = document.querySelectorAll(".ucs-cascader-dropdown");
	            for(var i=0; i<selectBox.length; i++){
	                selectBox[i].className = selectBox[i].className.replace(/ open/,'');
	                dropdownBox[i].className = dropdownBox[i].className.replace(/show/,'');
	            }
	             oldId = curId;
	        }else{
	            same = true;
	        }

	        var dropdown = e.target.parentNode.nextSibling;
	        if(dropdown.querySelector("ul li")){
	            if(this.state.index == Number(e.target.getAttribute("data-index")) && same){
	                this.setState({index:0});
	            }else{
	                e.target.parentNode.className = e.target.parentNode.className+" "+classnames( {"open":this.state.index == Number(e.target.getAttribute("data-index"))});
	                dropdown.className = classnames("ucs-cascader-dropdown",{"show":this.state.index == Number(e.target.getAttribute("data-index"))});
	                this.setState(
	                    {index:e.target.getAttribute("data-index")},
	                    function(){
	                        //给下拉框设置高
	                        var liHeight = 30;
	                        var dropdownDefaultHeight = 150;
	                        var liNum = dropdown.getElementsByTagName("li").length;
	                        if (parseInt(liNum*liHeight-2) < dropdown.offsetHeight) {
	                            dropdown.style.height = parseInt(liNum*liHeight-2) + "px";
	                        }else{
	                            dropdown.style.height = dropdownDefaultHeight + "px";
	                        }
	                    }
	                );

	            }
	        }else{
	            this.setState({index:0});
	        }
	        e.nativeEvent.stopImmediatePropagation();
	    },
	   /**
	    * 获取被选的值
	    * @return {json}
	    * */
	    getValue:function(){
	        return this.state.jsonValue;
	    },
	    render: function(){
	        if(this.props.defaultCode.allowSelect == "false"){
	            this.cursorVal="not-allowed";
	        }
	        return (
	                React.createElement("div", {id: this.props.id, 
	                    className: 
	                        classnames(
	                            "ucs-cascader "+this.props.className
	                        ), 
	                    
	                    ref: "cascader"}, 
	                    React.createElement("div", {className: "ucs-cascader-wrap"}, 
	                        React.createElement("div", {
	                            className: 
	                                classnames( 
	                                        "ucs-cascader-select",
	                                        {"open":this.state.index == 1},
	                                        {"select":this.state.didSelect1}
	                                    )
	                            }, 
	                            React.createElement("div", {className: "ucs-cascader-input", 
	                                "data-index": "1", 
	                                ref: "province", 
	                                "data-code": this.props.defaultCode.provinceCode, 
	                                style: {cursor:this.cursorVal}, onClick: this.open}, 
	                                this.state.provinceSelect
	                            )
	                        ), 
	                        React.createElement("div", {className: 
	                                classnames( 
	                                    "ucs-cascader-dropdown",
	                                    {"show":this.state.index == 1}
	                                ), 
	                            
	                            ref: "provinceOpen"}, 
	                            React.createElement("ul", null, 
	                                this.state.province
	                            )
	                        ), 
	                        React.createElement("input", {type: "hidden", className: this.state.provinceIndex, name: this.props.name.provinceName, value: this.state.jsonValue.provinceCode, ref: "selectValue1"})
	                    ), 
	                    React.createElement("div", {className: "title"}, this.props.title.province), 
	                    
	                    React.createElement("div", {className: "ucs-cascader-wrap"}, 
	                        React.createElement("div", {
	                            className: 
	                                    classnames( 
	                                            "ucs-cascader-select",
	                                            {"open":this.state.index == 2},
	                                            {"select":this.state.didSelect2}
	                                        )
	                                }, 
	                            React.createElement("div", {className: "ucs-cascader-input", 
	                                "data-index": "2", 
	                                ref: "city", 
	                                "data-code": this.props.defaultCode.cityCode, 
	                                style: {cursor:this.cursorVal}, onClick: this.open}, 
	                                this.state.citySelect
	                            )
	                        ), 
	                        React.createElement("div", {className: 
	                                classnames( 
	                                    "ucs-cascader-dropdown",
	                                    {"show":this.state.index == 2}
	                                )
	                            }, 
	                            React.createElement("ul", null, 
	                                this.state.city
	                            )
	                        ), 
	                        React.createElement("input", {type: "hidden", className: this.state.cityIndex, name: this.props.name.cityName, value: this.state.jsonValue.cityCode, ref: "selectValue2"})
	                    ), 
	                    React.createElement("div", {className: "title"}, this.props.title.city), 

	                    React.createElement("div", {className: "ucs-cascader-wrap", style: {display:this.display}}, 
	                        React.createElement("div", {
	                            className: 
	                                        classnames( 
	                                            "ucs-cascader-select",
	                                            {"open":this.state.index == 3},
	                                            {"select":this.state.didSelect3}
	                                        )
	                                    }, 
	                            React.createElement("div", {className: "ucs-cascader-input", 
	                                "data-index": "3", 
	                                ref: "county", 
	                                "data-code": this.props.defaultCode.countyCode, 
	                                style: {cursor:this.cursorVal}, onClick: this.open}, 
	                                this.state.countySelect
	                            )
	                        ), 
	                        React.createElement("div", {className: 
	                                classnames( 
	                                    "ucs-cascader-dropdown",
	                                    {"show":this.state.index == 3}
	                                )
	                            }, 
	                            React.createElement("ul", null, 
	                                this.state.county
	                            )
	                        ), 
	                        React.createElement("input", {type: "hidden", name: this.props.name.countyName, value: this.state.jsonValue.countyCode, ref: "selectValue3"})
	                    ), 
	                    React.createElement("div", {className: "title", style: {display:this.display}}, this.props.title.county)
	                )
	        );
	    }
	});

	var CascaderBox = {
	    Cascader:Cascader,
	    Address:Address
	};

	module.exports = CascaderBox;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	
	var classnames = __webpack_require__(2);
	var Table = __webpack_require__(17);
	var Pagination = __webpack_require__(26);
	var SelectDropDown = __webpack_require__(14);
	var Input = __webpack_require__(1);
	var Button = __webpack_require__(3);
	/*
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

	/**
	 * 高级表格，包含筛选、排序、分页
	 *
	 * @param [data] 数据源
	 *
	 * @param [className] 组件的div的class
	 *
	 * @param [itemsPerPage]  表格每页显示多少条
	 *
	 * @param [currentPage]  初始化时显示第几页
	 *
	 * @param [isSetItemsPerPageDisplay]  是否显示每页显示数据条数下拉框
	 *
	 * @param [isFilterDisplay]  是否显示 过滤
	 *
	 * @param [isSortDisplay]  是否显示 排序
	 *
	 * @param [getData]  方法。获取新数据
	 *
	 * @constructs
	 * @author huangdebin
	 * GridTable
	 *
	 * 示例:
	 *
	 *     @example
	 *     <GridTable id="idGridTable" ref="refGridTable" classNames={classNames} itemsPerPage={itemsPerPage} currentPage={currentPage} totalPage={totalPage} isSetItemsPerPageDisplay={true} isFilterDisplay={true} isSortDisplay={true} sortHandle={this.sortHandle} gridData={gridData} getData={this.getData} isTextOverflowHidden={true} columns={columns} />
	 *
	 */
	var GridTable = React.createClass({displayName: "GridTable",
	    getDefaultProps:function() {
	        return {
	            id:'',
	            data: [],
	            className: '',
	            itemsPerPage: 10,
	            currentPage: 1,
	            isSetItemsPerPageDisplay: false,
	            isFilterDisplay: false,
	            isSortDisplay: false,
	            isTextOverflowHidden: false
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

	    /**
	     * 设置GridTable的数据
	     * @param {object} obj
	     * GridTable的数据源
	     *
	     * */
	    setValue: function (obj) {
	        var _obj = {};
	        obj.gridData && (_obj.gridData = obj.gridData);
	        obj.currentPage ? (_obj.currentPage = obj.currentPage) : (_obj.currentPage = 0);
	        obj.totalPage ? (_obj.totalPage = obj.totalPage) : (_obj.totalPage = 0);
	        obj.itemsPerPage && (_obj.itemsPerPage = obj.itemsPerPage);
	        obj.filterInputValue && (_obj.filterInputValue = obj.filterInputValue);
	        obj.sortColumn && (_obj.sortColumn = obj.sortColumn);
	        obj.sortStatus && (_obj.sortStatus = obj.sortStatus);
	        this.setState(_obj);
	    },
	    /**
	     * 获取GridTable的值
	     * @return {string}
	     * */
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
	    /**
	     * 排序当前点击列
	     * @param {string} column
	     * 要排序的列名
	     * @param {string} status
	     * 排序方向，升序或降序
	     * */
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
	    /**
	     * 获取GridTable里的组件的ref值
	     * @return {object}
	     * */
	    getChildrenRefs:function(){
	        return this.refs;
	    },
	    render:function() {
	        return (
	            React.createElement("div", {id: this.props.id, className: classnames("ucs-gridTable", this.props.classNames.rootDiv)}, 
	                 this.props.isSetItemsPerPageDisplay &&
	                React.createElement("div", {ref: "itemsPerPage", 
	                     className: classnames("ucs-gridTable-setItemsPerPage", this.props.classNames.itemsPerPage)}, 
	                    "每页显示", 
	                    React.createElement(SelectDropDown, {
	                        ref: "refItemsPerPageSelectDropDown", 
	                        option: selectDropDownOptions1, 
	                        defaultText: this.state.itemsPerPage, 
	                        value: this.state.itemsPerPage, 
	                        onChange: this.setItemsPerPageOnChange
	                    }), 
	                    "条"
	                ), 
	                
	                 this.props.isFilterDisplay &&
	                React.createElement("div", {ref: "filter", 
	                     className: classnames("ucs-gridTable-filter", this.props.classNames.filter)}, 
	                    "搜索文字：", 
	                    React.createElement(Input, {
	                        ref: "refFilterInput", 
	                        placeholder: "请输入搜索文字", 
	                        onChange: this.filterOnChange, 
	                        value: this.state.filterInputValue
	                    }), 
	                    React.createElement(Button, {buttonType: "confirm", onClick: this.searchHandle}, "搜索")
	                ), 
	                
	                React.createElement(Table, {
	                    ref: "refTable", 
	                    className: classnames("ucs-gridTable-table", this.props.classNames.table), 
	                    columns: this.props.columns, 
	                    data: this.state.gridData, 
	                    bordered: true, 
	                    isSortDisplay: this.props.isSortDisplay, 
	                    sortHandle: this.sortHandle, 
	                    isTextOverflowHidden: this.props.isTextOverflowHidden
	                }
	                ), 
	                React.createElement(Pagination, {
	                    ref: "refPagination", 
	                    className: classnames("ucs-gridTable-pagination", this.props.classNames.pagination), 
	                    total: this.state.totalPage, 
	                    currentPage: this.state.currentPage, 
	                    goNext: this.goCur, 
	                    goPrev: this.goCur, 
	                    goCur: this.goCur}
	                )
	            )
	        )
	    }
	});


	module.exports = GridTable;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var AjaxUpload = __webpack_require__(42);
	var IframeUpload= __webpack_require__(45);

	function empty() {
	}
	/**
	 * 上传组件
	 * @author phy <yao.qianfeng@ucsmy.com>
	 * 示例
	 *
	 *      @example
	 *      var options= {
	 *          action: '/upload.do',
	 *          data: { a: 1, b: 2 },
	 *          headers: {
	 *              Authorization: 'xxxxxxx',
	 *           },
	 *          multiple: true,
	 *          beforeUpload:function(file) {
	 *              console.log('beforeUpload', file.name);
	 *          },
	 *          onStart:function(file) {
	 *              console.log('onStart', file.name);
	 *          },
	 *          onSuccess:function(file) {
	 *              console.log('onSuccess', file);
	 *          },
	 *          onProgress:function(step, file) {
	 *              console.log('onProgress', Math.round(step.percent), file.name);
	 *          },
	 *          onError:function(err) {
	 *              console.log('onError', err);
	 *          },
	 *      };
	 *      <Upload {...options} ref="inner"><a>开始上传</a></Upload>
	 *
	 */
	var Upload = React.createClass({displayName: "Upload",
	    propTypes: {
	        component: React.PropTypes.string,
	        style: React.PropTypes.object,
	        prefixCls: React.PropTypes.string,
	        action: React.PropTypes.string,
	        name: React.PropTypes.string,
	        multipart: React.PropTypes.bool,
	        onError: React.PropTypes.func,
	        onSuccess: React.PropTypes.func,
	        onProgress: React.PropTypes.func,
	        onStart: React.PropTypes.func,
	        data: React.PropTypes.oneOfType([
	            React.PropTypes.object,
	            React.PropTypes.func,
	        ]),
	        headers: React.PropTypes.object,
	        accept: React.PropTypes.string,
	        multiple: React.PropTypes.bool,
	        disabled: React.PropTypes.bool,
	        beforeUpload: React.PropTypes.func,
	        customRequest: React.PropTypes.func,
	        onReady: React.PropTypes.func,
	        withCredentials: React.PropTypes.bool,
	        supportServerRender: React.PropTypes.bool,
	    },

	    getDefaultProps:function() {
	        return {
	            component: 'span',
	            prefixCls: 'ucs-upload',
	            data: {},
	            headers: {},
	            name: 'file',
	            multipart: false,
	            onReady: empty,
	            onStart: empty,
	            onError: empty,
	            onSuccess: empty,
	            supportServerRender: false,
	            multiple: false,
	            beforeUpload: null,
	            customRequest: null,
	            withCredentials: false,
	        };
	    },

	    getInitialState:function() {
	        return {
	            Component: null,
	        };
	    },

	    componentDidMount:function() {
	        if (this.props.supportServerRender) {
	            /* eslint react/no-did-mount-set-state:0 */
	            this.setState({
	                Component: this.getComponent(),
	            }, this.props.onReady);
	        }
	    },
	    getComponent:function() {
	        return typeof FormData !== 'undefined' ? AjaxUpload : IframeUpload;
	    },
	    /**
	     * 终止当前任务处理进度
	     * @param file 上传的文件
	     */
	    abort:function(file) {
	        this.refs.inner.abort(file);
	    },

	    render:function() {
	        if (this.props.supportServerRender) {
	            var Component  = this.state.Component;
	            if (Component) {
	                return React.createElement(Component, React.__spread({},  this.props, {ref: "inner"}));
	            }
	            return null;
	        }
	        var Component = this.getComponent();
	        return React.createElement(Component, React.__spread({},  this.props, {ref: "inner"}));
	    },
	});

	module.exports =Upload;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var classNames = __webpack_require__(2);
	var defaultRequest = __webpack_require__(43);
	var getUid = __webpack_require__(44);

	var AjaxUploader = React.createClass({displayName: "AjaxUploader",
	    propTypes: {
	        component: React.PropTypes.string,
	        style: React.PropTypes.object,
	        prefixCls: React.PropTypes.string,
	        className: React.PropTypes.string,
	        multiple: React.PropTypes.bool,
	        disabled: React.PropTypes.bool,
	        accept: React.PropTypes.string,
	        children: React.PropTypes.any,
	        onStart: React.PropTypes.func,
	        data: React.PropTypes.oneOfType([
	            React.PropTypes.object,
	            React.PropTypes.func,
	        ]),
	        headers: React.PropTypes.object,
	        beforeUpload: React.PropTypes.func,
	        customRequest: React.PropTypes.func,
	        onProgress: React.PropTypes.func,
	        withCredentials: React.PropTypes.bool,
	    },

	    getInitialState: function () {
	        this.reqs = {};
	        return {
	            uid: getUid(),
	        };
	    },

	    componentWillUnmount: function () {
	        this.abort();
	    },

	    /**
	     * 事件改变处理函数
	     * @param e
	     */
	    onChange: function (e) {
	        var files = e.target.files;
	        this.uploadFiles(files);
	        this.reset();
	    },

	    /**
	     * 点击事件处理函数
	     */
	    onClick: function () {
	        var el = this.refs.file;
	        if (!el) {
	            return;
	        }
	        el.click();
	    },

	    /**
	     * 按下按键事件处理程序
	     * @param e
	     */
	    onKeyDown: function (e) {
	        if (e.key === 'Enter') {
	            this.onClick();
	        }
	    },

	    /**
	     * 拖动文件事件处理程序
	     * @param e
	     */
	    onFileDrop: function (e) {
	        if (e.type === 'dragover') {
	            e.preventDefault();
	            return;
	        }

	        var files = e.dataTransfer.files;
	        this.uploadFiles(files);

	        e.preventDefault();
	    },

	    /**
	     * 上传文件
	     * @param files
	     */
	    uploadFiles: function (files) {
	        var postFiles = Array.prototype.slice.call(files);
	        var len = postFiles.length;
	        for (var i = 0; i < len; i++) {
	            var file = postFiles[i];
	            file.uid = getUid();
	            this.upload(file, postFiles);
	        }
	    },

	    /**
	     * 上传数据处理方法
	     */
	    upload: function (file, fileList) {
	        var _this_=this;
	        var props = this.props;
	        if (!props.beforeUpload) {
	            // always async in case use react state to keep fileList
	            return setTimeout(function () {
	                _this_.post(file);
	            }, 0);
	        }

	        var before = props.beforeUpload(file, fileList);
	        if (before && before.then) {
	            try{
	                before.then(function (processedFile) {
	                    var processedFileType = Object.prototype.toString.call(processedFile);
	                    if (processedFileType === '[object File]' || processedFileType === '[object Blob]') {
	                        _this_.post(processedFile);
	                    } else {
	                        _this_.post(file);
	                    }
	                });
	            }
	            catch(e){
	                console && console.log(e); // eslint-disable-line
	            }
	        } else if (before !== false) {
	            setTimeout(function () {
	                _this_.post(file);
	            }, 0);
	        }
	    },

	    /**
	     * post方式提交处理数据
	     * @param file
	     */
	    post: function (file) {
	        if (!this.isMounted()) {
	            return;
	        }
	        var props = this.props;
	        var data = props.data;
	        var onStart = props.onStart;
	        var onProgress = props.onProgress;
	        if (typeof data === 'function') {
	            data = data(file);
	        }
	        var uid = file.uid;
	        var request = props.customRequest || defaultRequest;
	        this.reqs[uid] = request({
	            action: props.action,
	            filename: props.name,
	            file: file,
	            data: data,
	            headers: props.headers,
	            withCredentials: props.withCredentials,
	            onProgress: onProgress ? function (e) {
	                onProgress(e, file);
	            } : null,
	            onSuccess: function (ret) {
	                delete this.reqs[uid];
	                props.onSuccess(ret, file);
	            }.bind(this),
	            onError: function (err, ret) {
	                delete this.reqs[uid];
	                props.onError(err, ret, file);
	            }.bind(this),
	        });
	        onStart(file);
	    },
	    /**
	     * 重置提交状态
	     */
	    reset: function () {
	        this.setState({
	            uid: getUid(),
	        });
	    },

	    /**
	     * 终止当前任务状态
	     * @param file
	     */
	    abort: function (file) {
	        var reqs = this.reqs;
	        if (file) {
	            var uid = file;
	            if (file && file.uid) {
	                uid = file.uid;
	            }
	            if (reqs[uid]) {
	                reqs[uid].abort();
	                delete reqs[uid];
	            }
	        } else {
	            Object.keys(reqs).forEach(function (uid) {
	                if (reqs[uid]) {
	                    reqs[uid].abort();
	                }

	                delete reqs[uid];
	            });
	        }
	    },

	    render: function () {
	        var Tag = this.props.component;
	        var prefixCls = this.props.prefixCls;
	        var className = this.props.className;
	        var disabled = this.props.disabled;
	        var style = this.props.style;
	        var multiple = this.props.multiple;
	        var accept = this.props.accept;
	        var children = this.props.children;

	        var config = {};
	        config[prefixCls] = true;
	        config[prefixCls + '-disabled']=disabled;
	        config[className]=className;

	        var cls = classNames(config);
	        var events = disabled ? {} : {
	            onClick: this.onClick,
	            onKeyDown: this.onKeyDown,
	            onDrop: this.onFileDrop,
	            onDragOver: this.onFileDrop,
	            tabIndex: '0'
	        };
	        return (
	            React.createElement(Tag, React.__spread({}, 
	                events, 
	                {className: cls, 
	                role: "button", 
	                style: style
	            }), 
	                React.createElement("input", {
	                    type: "file", 
	                    ref: "file", 
	                    key: this.state.uid, 
	                    style: {display: 'none'}, 
	                    accept: accept, 
	                    multiple: multiple, 
	                    onChange: this.onChange}
	                ), 
	                children
	            )
	        );
	    },
	});

	module.exports = AjaxUploader;


/***/ },
/* 43 */
/***/ function(module, exports) {

	function getError(option, xhr) {
	  var msg = 'cannot post '+option.action+xhr.status;
	  var err = new Error(msg);
	  err.status = xhr.status;
	  err.method = 'post';
	  err.url = option.action;
	  return err;
	}

	function getBody(xhr) {
	  var text = xhr.responseText || xhr.response;
	  if (!text) {
	    return text;
	  }

	  try {
	    return JSON.parse(text);
	  } catch (e) {
	    return text;
	  }
	}

	var upload=function upload(option) {
	    var xhr = new XMLHttpRequest();

	    if (option.onProgress && xhr.upload) {
	        xhr.upload.onprogress = function progress(e) {
	            if (e.total > 0) {
	                e.percent = e.loaded / e.total * 100;
	            }
	            option.onProgress(e);
	        };
	    }

	    var formData = new FormData();

	    if (option.data) {
	        Object.keys(option.data).map(function(key) {
	            formData.append(key, option.data[key]);
	        });
	    }

	    formData.append(option.filename, option.file);

	    xhr.onerror = function error(e) {
	        option.onError(e);
	    };

	    xhr.onload = function onload() {
	        // allow success when 2xx status
	        // see https://github.com/react-component/upload/issues/34
	        if (xhr.status < 200 || xhr.status >= 300) {
	            return option.onError(getError(option, xhr), getBody(xhr));
	        }

	        option.onSuccess(getBody(xhr));
	    };


	    xhr.open('post', option.action, true);

	    // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
	    if (option.withCredentials && 'withCredentials' in xhr) {
	        xhr.withCredentials = true;
	    }

	    var headers = option.headers || {};

	    // when set headers['X-Requested-With'] = null , can close default XHR header
	    // see https://github.com/react-component/upload/issues/33
	    if (headers['X-Requested-With'] !== null) {
	        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	    }

	    for (var h in headers) {
	        if (headers.hasOwnProperty(h) && headers[h] !== null) {
	            xhr.setRequestHeader(h, headers[h]);
	        }
	    }
	    xhr.send(formData);

	    return {
	        // abort() {
	        //   xhr.abort();
	        // }
	        abort: function abort() {
	            xhr.abort();
	        }
	    };
	};

	module.exports =upload;

/***/ },
/* 44 */
/***/ function(module, exports) {

	var now = +(new Date());
	var index = 0;
	var uid=function() {
	    return "ucs-upload-" + now + "-" + (++index);
	};
	module.exports =uid;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var classNames = __webpack_require__(2);
	var getUid = __webpack_require__(44);

	var IFRAME_STYLE = {
	    position: 'absolute',
	    top: 0,
	    opacity: 0,
	    filter: 'alpha(opacity=0)',
	    left: 0,
	    zIndex: 9999,
	};
	// diferent from AjaxUpload, can only upload on at one time, serial seriously
	var IframeUploader = React.createClass({displayName: "IframeUploader",
	    propTypes: {
	        component: React.PropTypes.string,
	        style: React.PropTypes.object,
	        disabled: React.PropTypes.bool,
	        prefixCls: React.PropTypes.string,
	        className: React.PropTypes.string,
	        accept: React.PropTypes.string,
	        onStart: React.PropTypes.func,
	        multiple: React.PropTypes.bool,
	        children: React.PropTypes.any,
	        data: React.PropTypes.oneOfType([
	            React.PropTypes.object,
	            React.PropTypes.func,
	        ]),
	        action: React.PropTypes.string,
	        name: React.PropTypes.string,
	    },

	    getInitialState: function () {
	        this.file = {};
	        return {
	            uploading: false,
	        };
	    },

	    componentDidMount: function () {
	        this.updateIframeWH();
	        this.initIframe();
	    },

	    componentDidUpdate: function () {
	        this.updateIframeWH();
	    },

	    onLoad: function () {
	        if (!this.state.uploading) {
	            return;
	        }
	        var file = this.file;
	        var props = this.props;
	        var response;
	        try {
	            var doc = this.getIframeDocument();
	            var script = doc.getElementsByTagName('script')[0];
	            if (script && script.parentNode === doc.body) {
	                doc.body.removeChild(script);
	            }
	            response = doc.body.innerHTML;
	            props.onSuccess(response, file);
	        } catch (err) {
	            console.error('cross domain error for Upload. Maybe server should return document.domain script. see Note from https://github.com/react-component/upload');
	            response = 'cross-domain';
	            props.onError(err, null, file);
	        }
	        this.endUpload();
	    },
	    /**
	     * 事件改变处理函数
	     * @returns {object}
	     */
	    onChange: function () {
	        var target = this.getFormInputNode();
	        // ie8/9 don't support FileList Object
	        // http://stackoverflow.com/questions/12830058/ie8-input-type-file-get-files
	        var file = this.file = {
	            uid: getUid(),
	            name: target.value,
	        };
	        this.startUpload();
	        var props = this.props;
	        if (!props.beforeUpload) {
	            return this.post(file);
	        }
	        var before = props.beforeUpload(file);
	        if (before && before.then) {
	            before.then(function() {
	                this.post(file);
	            }, function() {
	                this.endUpload();
	            });
	        } else if (before !== false) {
	            this.post(file);
	        } else {
	            this.endUpload();
	        }
	    },
	    /**
	     * 获取iframe节点
	     * @returns {string|string|null|*}
	     */
	    getIframeNode: function () {
	        return this.refs.iframe;
	    },

	    /**
	     * 获取iframe节点的DOM
	     * @returns {Document}
	     */
	    getIframeDocument: function () {
	        return this.getIframeNode().contentDocument;
	    },

	    /**
	     * 获取form节点
	     * @returns {Element}
	     */
	    getFormNode: function () {
	        return this.getIframeDocument().getElementById('form');
	    },

	    /**
	     * 获取form表单节点的input元素
	     * @returns {Element}
	     */
	    getFormInputNode: function () {
	        return this.getIframeDocument().getElementById('input');
	    },

	    /**
	     * 获取form表单的数据节点
	     * @returns {Element}
	     */
	    getFormDataNode: function () {
	        return this.getIframeDocument().getElementById('data');
	    },

	    /**
	     * 获取多文件
	     * @param file 文件
	     * @returns {[file]|file}
	     */
	    getFileForMultiple:function(file) {
	        return this.props.multiple ? [file] : file;
	    },

	    /**
	     * 获取iframe的html
	     * @param domain 域名
	     * @returns {string}
	     */
	    getIframeHTML: function (domain) {
	        var domainScript = '';
	        var domainInput = '';
	        if (domain) {
	            var script = 'script';
	            domainScript = '<' + script + '>document.domain="' + domain + '";</' + script + '>';
	            domainInput = '<input name="_documentDomain" value="' + domain + '" />';
	        }
	        return '<!DOCTYPE html>' +
	            '<html>' +
	            '<head>' +
	            '<meta http-equiv="X-UA-Compatible" content="IE=edge" />' +
	            '<style>body,html {padding:0;margin:0;border:0;overflow:hidden;}</style>\"' + domainScript + '\"</head>' +
	            '<body>' +
	            '<form method="post" encType="multipart/form-data" action="' + this.props.action + '" id="form" style="display:block;height:9999px;position:relative;overflow:hidden;">' +
	            '<input id="input" type="file" name="' + this.props.name + '" style="position:absolute;top:0;right:0;height:9999px;font-size:9999px;cursor:pointer;"/>' + domainInput + '<span id="data"></span>' +
	            '</form>' +
	            '</body>' +
	            '</html>';
	    },

	    /**
	     * 初始化iframe的src源
	     */
	    initIframeSrc: function () {
	        if (this.domain) {
	            this.getIframeNode().src = "javascript:void((function(){ var d = document;d.open();d.domain='" + this.domain + "';d.write('');d.close();})())";
	        }
	    },

	    /**
	     * 初始化iframe
	     */
	    initIframe: function () {
	        var iframeNode = this.getIframeNode();
	        var win = iframeNode.contentWindow;
	        var doc;
	        this.domain = this.domain || '';
	        this.initIframeSrc();
	        try {
	            doc = win.document;
	        } catch (e) {
	            this.domain = document.domain;
	            this.initIframeSrc();
	            win = iframeNode.contentWindow;
	            doc = win.document;
	        }
	        doc.open('text/html', 'replace');
	        doc.write(this.getIframeHTML(this.domain));
	        doc.close();
	        this.getFormInputNode().onchange = this.onChange;
	    },

	    /**
	     * 停止上传
	     */
	    endUpload: function () {
	        if (this.state.uploading) {
	            this.file = {};
	            // hack avoid batch
	            this.state.uploading = false;
	            this.setState({
	                uploading: false,
	            });
	            this.initIframe();
	        }
	    },

	    /**
	     * 开始上传
	     */
	    startUpload: function () {
	        if (!this.state.uploading) {
	            this.state.uploading = true;
	            this.setState({
	                uploading: true,
	            });
	        }
	    },

	    /**
	     * 更新iframe的宽高度
	     */
	    updateIframeWH: function () {
	        var rootNode = ReactDOM.findDOMNode(this);
	        var iframeNode = this.getIframeNode();
	        iframeNode.style.height = rootNode.offsetHeight+'px';
	        iframeNode.style.width = rootNode.offsetWidth+'px';
	    },

	    /**
	     * 终止当前任务
	     * @param file
	     */
	    abort: function (file) {
	        if (file) {
	            var uid = file;
	            if (file && file.uid) {
	                uid = file.uid;
	            }
	            if (uid === this.file.uid) {
	                this.endUpload();
	            }
	        } else {
	            this.endUpload();
	        }
	    },

	    /**
	     * post方式提交数据
	     * @param file
	     */
	    post: function (file) {
	        var formNode = this.getFormNode();
	        var dataSpan = this.getFormDataNode();
	        var data = this.props.data;
	        var onStart = this.props.onStart;
	        if (typeof data === 'function') {
	            data = data(file);
	        }
	        var inputs = [];
	        for (var key in data) {
	            if (data.hasOwnProperty(key)) {
	                inputs.push('<input name="' + key + '" value="' + data[key] + '"/>');
	            }
	        }
	        dataSpan.innerHTML = inputs.join('');
	        formNode.submit();
	        dataSpan.innerHTML = '';
	        onStart(file);
	    },

	    render: function () {
	        var Tag = this.props.component;
	        var disabled = this.props.disabled;
	        var className = this.props.className;
	        var prefixCls = this.props.prefixCls;
	        var children = this.props.children;
	        var style = this.props.style;

	        var iframeStyle = {
	            IFRAME_STYLE:IFRAME_STYLE,
	            display: this.state.uploading || disabled ? 'none' : '',
	        };

	        var config = {};
	        config[prefixCls] = true;
	        config[prefixCls + '-disabled'] = disabled;
	        config[className] = className;
	        var cls = classNames(config);

	        return (
	            React.createElement(Tag, {
	                className: cls, 
	                style: {position: 'relative', zIndex: 0, style:style}
	            }, 
	                React.createElement("iframe", {
	                    ref: "iframe", 
	                    onLoad: this.onLoad, 
	                    style: iframeStyle}
	                ), 
	                children
	            )
	        );
	    },
	});

	module.exports = IframeUploader;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	
	module.exports = __webpack_require__(47);

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Form组件
	 *
	 * @param [name] 表单名，一般不需要填写
	 * @param [form] 默认输出form,填写时输出div
	 * @param [formData] 验证数据
	 * @param [validateType] 验证类型　1失去焦点和改变时触发（默认）　2失去焦点时触发　3不验证 （输入事件不是按钮点击事件）
	 *
	 * 示例:
	 *
	 *     @example
	 *     <Form ref="form1" className="form" formData={}/>
	 */
	var Form = React.createClass({displayName: "Form",
	    getInitialState: function () {
	        return {
	            formName: this.props.name ? this.props.name : 'form' + Math.random().toString(36).substr(2, 5)//随机给取个表单名
	        }
	    },
	    getDefaultProps: function () {
	        return {
	            formData: "",
	            validateType: 1
	        }
	    },
	    childContextTypes: {
	        formData: React.PropTypes.any,
	        formName: React.PropTypes.any,
	        validateType: React.PropTypes.any
	        // formItemChange: React.PropTypes.any
	    },
	    getChildContext: function () {
	        //定义三个参数给子组件获取
	        return {
	            formData: this.props.formData,
	            formName: this.state.formName,
	            validateType: this.props.validateType
	            // formItemChange: this._itemChange
	        }
	    },
	    validate: function (fn, filed) {
	        var len = 0;
	        var boolarry = [];
	        var bool = true;
	        if (filed) {
	            len = filed.length;
	        }
	        else {
	            for (var i in this.props.formData) {
	                len++;
	            }
	        }
	        UEventHub.emit('FORMSETVALIDATE' + this.state.formName, filed, function (b) {
	            boolarry.push(b);
	            if (!b) {
	                bool = false
	            }
	            if (len === boolarry.length) {
	                fn(bool);
	            }
	        });
	    },
	    componentDidMount: function () {

	    },

	    render: function () {
	        var type = "";
	        if (!this.props.form) {
	            type = (React.createElement("form", React.__spread({},  this.props), 
	                this.props.children
	            ))
	        } else {
	            type = (React.createElement("div", React.__spread({},  this.props), 
	                this.props.children
	            ))
	        }
	        return type
	    }
	});
	Form.FormItem = __webpack_require__(48);

	module.exports = Form;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	
	var classnames = __webpack_require__(2);
	var Input = __webpack_require__(1);
	var ValidateRules = __webpack_require__(49);

	/**
	 * FormItem组件,负责输出label、Item固定div标签和数据验证
	 *
	 * @param [label] 表单名，一般不需要填写
	 * @param [className] 默认输出form,填写时输出div
	 *
	 *
	 * 示例:
	 *
	 *     @example
	 *     var Form = UcsmyUI.Form;
	 *     var FormItem = Form.FormItem;
	 *     <FormItem ref="formItem" className="test" label="字段名"/></FormItem>
	 */
	var FormItem = React.createClass({displayName: "FormItem",
	    contextTypes: {
	        formData: React.PropTypes.any,
	        //formItemChange: React.PropTypes.any
	        formName: React.PropTypes.any,
	        validateType: React.PropTypes.any
	    },
	    getInitialState: function () {
	        return {
	            explainResult: "", //验证提示结果
	            explainType: ""//验证类型，true正确或false错误
	        }
	    },
	    getDefaultProps: function () {
	        return {
	            className: '',//formitem className
	            label: ''//formitem label
	        }
	    },
	    _formValidate: function (name, value) {
	        value = value == undefined ? "" : value;
	        //验证数据，根据name去提取验证规则，验证通过返回true
	        if (this.context.formData[name] != undefined) {
	            var rules = this.context.formData[name];
	            if (rules) {
	                var results = ValidateRules(value, rules);
	                if (results) {
	                    this.setState({
	                        explainResult: results,
	                        explainType: false
	                    });
	                    //添加错误样式
	                    this._addErrorClass(name, 'add');
	                    return false
	                } else {
	                    this.setState({
	                        explainResult: '',
	                        explainType: true
	                    });
	                    //删除样式
	                    this._addErrorClass(name, 'remove');
	                    return true
	                }
	            }
	            else {
	                return true;
	            }
	        } else {
	            return true
	        }
	    },
	    _addErrorClass: function (name, type) {
	        var el = ReactDOM.findDOMNode(this);
	        var input = el.querySelectorAll('[name="' + name + '"]');
	        if (input[0].type === 'text' || input[0].type === 'password' || input[0].type === 'textarea') {
	            if (type == 'add' && input[0].className.indexOf('error') == -1) {
	                input[0].className += " error";
	            } else if (type == 'remove') {
	                input[0].className=input[0].className.replace(' error','');
	            }
	        }
	    },
	    /**
	     * 设置FormItem验证错误解释，适用于特殊情况下
	     * @param {string} v
	     * */
	    setExplain: function (v) {
	        //设置错误提示，API
	        this.setState({
	            explainResult: v,
	            explainType: false
	        })
	    },
	    componentDidMount: function () {
	        //表单按钮提交时 接收表单验证指令，返回有验证规则的
	        var el = ReactDOM.findDOMNode(this);
	        if (!Array.indexOf) {
	            Array.prototype.indexOf = function (obj) {
	                for (var i = 0; i < this.length; i++) {
	                    if (this[i] == obj) {
	                        return i;
	                    }
	                }
	                return -1;
	            }
	        }
	        if (this.context.formName) {
	            UEventHub.on('FORMSETVALIDATE' + this.context.formName, function (filed, fn) {
	                React.Children.map(this.props.children, function (child) {
	                    var childName = child.props.name;
	                    if (typeof (child.type) === 'function' && this.context.formData[childName] != undefined) {
	                        var input = el.querySelectorAll('[name="' + childName + '"]');
	                        var value = '';
	                        if (filed) {
	                            if (filed.indexOf(childName) != -1) {
	                                value = getValue(input);
	                                fn(this._formValidate(childName, value));
	                            }
	                        } else {
	                            value = getValue(input);
	                            fn(this._formValidate(childName, value));
	                        }
	                    }
	                }.bind(this));
	            }.bind(this));
	            var getValue = function (input) {
	                var value = '';
	                if (input.length > 1) {
	                    for (var i in input) {
	                        if ((input[i].type === 'radio' || input[i].type === 'checkbox') && input[i].checked) {
	                            value = input[i].value;
	                        }
	                    }
	                } else {
	                    value = input[0].value;
	                }
	                return value;
	            };
	        }
	    },
	    componentWillMount: function () {
	    },
	    _handleChildChange: function (name, value) {
	        if (this.context.formData) {
	            if (typeof (value) === 'object') {
	                //input,radio传回的value
	                this._handChangeComm(name, value.target.value)
	            } else {
	                this._handChangeComm(name, value);
	            }
	        }
	    },
	    _handChangeComm: function (name, value) {
	        this._formValidate(name, value);
	    },
	    render: function () {
	        var tips = "";
	        if (this.state.explainType !== '') {
	            if (this.state.explainType) {
	                tips = (
	                    React.createElement("div", {className: "ucs-form-explain success"}, 
	                        React.createElement("i", {className: "iconfont icon-success"})
	                    )
	                );
	            } else {
	                tips = (
	                    React.createElement("div", {className: "ucs-form-explain"}, 
	                        React.createElement("i", {className: "iconfont icon-failure", title: this.state.explainResult}), 
	                        React.createElement("span", null, this.state.explainResult)
	                    )
	                );
	            }
	        }
	        var lable = "";
	        if (this.props.label) {
	            lable = (React.createElement("label", {className: "label"}, this.props.label));
	        }
	        var type = parseInt(this.context.validateType);
	        return (
	            React.createElement("div", {className: classnames('ucs-form-group',this.props.className), ref: "formItem"}, 
	                lable, 
	                React.createElement("div", {className: "form-box"}, 
	                    
	                        React.Children.map(this.props.children, function (child) {
	                            if (typeof (child.type) === 'function' && child.props.name) {
	                                return React.cloneElement(child, {
	                                    onChange: type == 1 ? this._handleChildChange.bind(this, child.props.name) : "",
	                                    onBlur: (child.type === Input && type < 3)
	                                        ? this._handleChildChange.bind(this, child.props.name) : ""
	                                })
	                            } else {
	                                return child;
	                            }
	                        }.bind(this))
	                    
	                ), 
	                tips
	            )
	        )
	    }
	});
	module.exports = FormItem;

/***/ },
/* 49 */
/***/ function(module, exports) {

	//太多if了，得优化，
	//只定义几个规则作测试

	/*
	 * 验证不通过时返回错误提示信息，成功时返回空
	 * */
	var ValidateRules = function (v, rules) {
	        var results = [];
	        for (var i = 0; i < rules.length; i++) {
	            var r = rules[i];
	            var type = r.type;
	            if (type === "required" && v === "") {
	                results = rules[i].msg;
	                break;
	            }
	            else if (type === "maxlength" && v !== "" && parseInt(v.length) > parseInt(r.maxlength)) {
	                results = r.msg;
	                break;
	            }
	            else if (type === "digits" && v !== "") {
	                //整数
	                var m = /^[0-9]*[1-9][0-9]*$/;
	                if (!m.test(v)) {
	                    results = r.msg;
	                    break;
	                } else {
	                    results = "";
	                }
	            }
	            else if (type === "number" && v !== "") {
	                var m = /^\d+(\.\d+)?$/;
	                if (!m.test(v)) {
	                    results = r.msg;
	                    break;
	                } else {
	                    results = "";
	                }
	            }
	            else if (type === "mobile" && v !== "") {
	                var m = /^1[3|4|5|7|8]\d{9}$/;
	                if (!m.test(v)) {
	                    results = r.msg;
	                    break;
	                } else {
	                    results = "";
	                }
	            }
	            else if (type === "mail" && v !== "") {
	                var m = /^[a-z0-9._%-]+@([a-z0-9-]+\.)+[a-z]{2,4}$|^1[3|4|5|7|8]\d{9}$/;
	                if (!m.test(v)) {
	                    results = r.msg;
	                    break;
	                } else {
	                    results = "";
	                }
	            }
	            else if (type === "rule" && v !== "") {
	                var m = eval(r.rule);
	                if (!m.test(v)) {
	                    results = r.msg;
	                    break;
	                } else {
	                    results = "";
	                }
	            }
	            else if (type === "fn") {
	                // console.log(!rules[i].validator(v));
	                if (!rules[i].validator(v)) {
	                    results = r.msg;
	                    break;
	                } else {
	                    results = "";
	                }
	            }

	            else {
	                results = "";
	            }
	        }
	        return results;
	    }
	    ;
	module.exports = ValidateRules;

/***/ },
/* 50 */
/***/ function(module, exports) {

	/*
	 * Created by Administrator on 2017/3/17.
	 */

	/*
	 * 查询样式是否存在
	 * @param {object，string} args
	 * @return {boolean}
	 * */
	function hasClass(elem, cls) {
	    elem = elem || {};
	    return new RegExp("\\b" + cls + "\\b").test(elem.className);
	};
	/*
	 * 添加样式
	 * @param {object，string} args
	 * @return {object}
	 * */
	function addClass(elem, cls) {
	    elem = elem || {};
	    hasClass(elem, cls) || (elem.className += " " + cls);
	    elem.className = elem.className.replace(/^\s|\s$/g, "").replace(/\s+/g, " ");
	    return this;
	};
	/*
	 * 删除样式
	 * @param {object，string} args
	 * @return {object}
	 * */
	function removeClass(elem, cls) {
	    elem = elem || {};
	    if (hasClass(elem, cls)) {
	        elem.className = elem.className.replace(new RegExp("(\\s|^)" + cls + "(\\s|$)"), "");
	    }
	    return this;
	};
	/**
	 * Slider组件
	 *
	 * @param [dots] 是否有焦点
	 * @param arrows 是否有箭头
	 * @param [autoPlay] 是否自动播放
	 * @param [autoPlaySpeed] 自动播放速度
	 *
	 * 示例:
	 *
	 *     @example
	 *
	 *     var config = {
	 *			dots: true,
	 *			arrows: true,
	 *			autoPlay: true,
	 *			autoPlaySpeed: 2000
	 *		}
	 *
	 *     <Slider config={config}>
	 *        <div className="ucs-slider-item active-item" style={{background: "url(../images/b0.jpg)  center 0 no-repeat"}}>
	 *          <div className="inner"></div>
	 *        </div>
	 *        <div className="ucs-slider-item" style={{background: "url(../images/b1.jpg)  center 0 no-repeat"}}>
	 *          <div className="inner"></div>
	 *        </div>
	 *        <div className="ucs-slider-item" style={{background: "url(../images/banner.jpg)  center 0 no-repeat"}}>
	 *          <div className="inner"></div>
	 *        </div>
	 *     </Slider>
	 */
	var Slider = React.createClass({displayName: "Slider",
	    getDefaultProps:function(){
	        return{
	            config: {
	                dots: true,
	                arrows: true,
	                autoPlay: true,
	                autoPlaySpeed: 2000
	            }
	        }
	    },
	    componentDidMount: function(){
	        this.count = 0;
	        if(this.props.config.autoPlay){
	            this.slideHandler();
	        }
	    },
	    /*
	     * 自动播放方法
	     * */
	    slideHandler: function(){
	        var _this = this;
	        var items = _this.refs['ucs-slider-list'].childNodes;
	        var dots;
	        if(_this.props.config.dots){
	            dots = _this.refs['dots'].childNodes;
	        }
	        _this.timer = setInterval(function(){
	            for(var i = 0; i < items.length; i ++){
	                removeClass(items[i],"active-item");
	                if(_this.props.config.dots){
	                    removeClass(dots[i],"current");
	                }
	                items[i].style.opacity = 0;
	            }
	            if(_this.count == items.length-1){
	                _this.count = 0;
	            }else{
	                _this.count++;
	            }
	            addClass(items[_this.count],"active-item");
	            if(_this.props.config.dots){
	                addClass(dots[_this.count],"current");
	            }
	            _this.fadeInHandler();
	        },_this.props.config.autoPlaySpeed);
	    },
	    /*
	     * 鼠标移入事件
	     * */
	    mouseOverHandler: function(){
	        if(this.timer){
	            clearInterval(this.timer);
	            this.timer = null;
	        }
	    },
	    /*
	     * 鼠标移出事件
	     * */
	    mouseOutHandler: function(){
	        if(this.props.config.autoPlay){
	            this.slideHandler();
	        }
	    },
	    /*
	     * 焦点点击事件
	     * */
	    dotClickHandler: function(e){
	        var _this = this;

	        var items = _this.refs['ucs-slider-list'].childNodes;
	        var dots = _this.refs['dots'].childNodes;
	        for(var i = 0; i < items.length; i ++){
	            removeClass(items[i],"active-item");
	            removeClass(dots[i],"current");
	        }
	        addClass(items[e.target.parentNode.value],"active-item");
	        addClass(dots[e.target.parentNode.value],"current");
	        _this.count = e.target.parentNode.value;
	        _this.fadeInHandler();
	    },
	    /*
	     * 左箭头点击事件
	     * */
	    prevHandler: function(){
	        var _this = this;

	        var items = _this.refs['ucs-slider-list'].childNodes;
	        var dots;
	        if(_this.props.config.dots){
	            dots = _this.refs['dots'].childNodes;
	        }
	        for(var i = 0; i < items.length; i ++){
	            removeClass(items[i],"active-item");
	            if(_this.props.config.dots){
	                removeClass(dots[i],"current");
	            }
	        }
	        if(_this.count == 0){
	            _this.count = items.length-1;
	        }else{
	            _this.count--;
	        }
	        addClass(items[_this.count],"active-item");
	        if(_this.props.config.dots){
	            addClass(dots[_this.count],"current");
	        }
	        if(_this.props.config.dots){
	            removeClass(dots[i],"current");
	        }
	        this.fadeInHandler();
	    },
	    /*
	     * 右箭头点击事件
	     * */
	    nextHandler: function(){
	        var _this = this;

	        var items = _this.refs['ucs-slider-list'].childNodes;
	        var dots;
	        if(_this.props.config.dots){
	            dots = _this.refs['dots'].childNodes;
	        }
	        for(var i = 0; i < items.length; i ++){
	            removeClass(items[i],"active-item");
	            if(_this.props.config.dots){
	                removeClass(dots[i],"current");
	            }
	        }
	        if(_this.count == items.length-1){
	            _this.count = 0;
	        }else{
	            _this.count++;
	        }
	        addClass(items[_this.count],"active-item");
	        if(_this.props.config.dots){
	            addClass(dots[_this.count],"current");
	        }
	        this.fadeInHandler();
	    },
	    /*
	     * 渐变效果方法
	     * */
	    fadeInHandler: function(){
	        var _this = this;
	        var items = _this.refs['ucs-slider-list'].childNodes;
	        var opt = 0;
	        var tm = setInterval(function(){
	            if(opt>1){
	                clearInterval(tm);
	            }else{
	                opt += 0.1;
	            }
	            items[_this.count].style.opacity = opt;
	        },50);
	    },
	    render:function(){
	        var _this = this;
	        return(
	            React.createElement("div", {className: "ucs-slider", onMouseOver: _this.mouseOverHandler.bind(_this), onMouseOut: _this.mouseOutHandler}, 
	                React.createElement("div", {className: "ucs-slider-list", ref: "ucs-slider-list"}, 
	                    _this.props.children
	                ), 
	                
	                    _this.props.config.dots?(
	                        React.createElement("div", {className: "dots"}, 
	                            React.createElement("ul", {ref: "dots"}, 
	                                
	                                    _this.props.children.map(function(item,index){
	                                        if(index == 0){
	                                            return (React.createElement("li", {value: index, className: "current"}, React.createElement("a", {href: "javascript:void(0)", onClick: _this.dotClickHandler})));
	                                        }else{
	                                            return (React.createElement("li", {value: index}, React.createElement("a", {href: "javascript:void(0)", onClick: _this.dotClickHandler})));
	                                        }
	                                    })
	                                
	                            )
	                        )
	                    ):"", 
	                
	                
	                    _this.props.config.arrows?(
	                        React.createElement("div", {className: "arrows"}, 
	                            React.createElement("a", {href: "javascript:void(0)", className: "prev", onClick: _this.prevHandler}), 
	                            React.createElement("a", {href: "javascript:void(0)", className: "next", onClick: _this.nextHandler})
	                        )
	                    ):""
	                
	            )
	        )
	    }
	});

	module.exports = Slider;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * 参数，带child开头的参数必须是要有子菜单才生效
	 * （所有子导航的隐藏与显示都是通过添加和删除样式来控制）
	 * className
	 * data:[
	 *    name:标题,
	 *    href:链接地址,
	 *    active:当前选中状态
	 *    target：打开方式
	 *    icon:默认不显示
	 *    children：[子菜单，同样包括name,href,active,target
	 *       //以下有子菜单才有效
	 *       childShow:true/false 默认子菜单是否展开，默认为false
	 *    ]
	 *]
	 * */
	//obj为要绑定事件的元素，ev为要绑定的事件，fn为绑定事件的函数
	function myAddEvent(obj, ev, fn) {
	    if (obj.attachEvent) {
	        obj.attachEvent("on" + ev, fn);
	    }
	    else {
	        obj.addEventListener(ev, fn, false);
	    }
	}
	function myRemoveEvent(obj, ev, fn) {
	    if (obj.attachEvent) {
	        obj.detachEvent("on" + ev, fn);
	    }
	    else {
	        obj.removeEventListener(ev, fn, false);
	    }
	}
	function findParentNode(elem, cls) {
	    if (elem.nodeName.toUpperCase() === "BODY") {
	        return false;
	    } else if (elem.className.search(cls) > -1) {
	        return elem;
	    } else {
	        return findParentNode(elem.parentNode, cls);
	    }
	}
	var classnames = __webpack_require__(2);
	/**
	 *
	 * 导航
	 *
	 * @param [childShowType] click,mouseover,鼠标点击或经过显示
	 *
	 * @param [bodyClick] 点击空白处允许菜单收起来，一般不设置
	 *
	 * @param [className] class名
	 *
	 * @constructs
	 * @author huangdebin
	 * Navigation
	 *
	 * 示例:
	 *
	 *     @example
	 *     <Navigation data={data} className="ucs-nav-top" onClick={this.onClick}></Navigation>
	 */
	var Navigation = React.createClass({displayName: "Navigation",
	    getInitialState: function () {
	        return {}
	    },
	    getDefaultProps: function () {
	        return {childShowType: 'click', bodyClick: false}
	    },
	    _handleClick: function (key) {
	        var ref = this.refs['keyul' + key];
	        if (ref.className == 'children') {
	            ref.className = 'children show'
	        } else {
	            ref.className = 'children'
	        }
	        this.props.bodyClick ?
	            myAddEvent(document, 'click', this._handleBodyClick.bind(this, key)) : ""
	    },
	    _handleBodyClick: function (key, e) {
	        var a = findParentNode(e.srcElement, 'ucs-menu-li-' + key);
	        if (a === false) {
	            this.refs['keyul' + key].className = 'children'
	        }
	    },
	    _handleMouseOver: function (key) {
	        this.refs['keyul' + key].className = 'children show';
	        this.refs['key' + key].className = 'hover has-child ucs-menu-li-' + key;
	    },
	    _handleMouseLeave: function (key) {
	        this.refs['keyul' + key].className = 'children';
	        this.refs['key' + key].className = 'has-child ucs-menu-li-' + key;
	    },
	    componentWillUnmount: function () {
	        this.state.bodyClick ?
	            myRemoveEvent(document, 'click', this._handleBodyClick) : "";
	    },
	    componentWillMount: function () {
	        this.index = 0;
	    },
	    MenuMap: function (props) {
	        return (
	            props && props.map(function (child, index) {
	                var event = '';
	                this.index++;

	                if (child.children && this.props.childShowType === 'click') {
	                    event = 'click';
	                } else if (child.children && this.props.childShowType === 'mouseover') {
	                    event = 'mouseover';
	                }
	                var rli = '';
	                if(child.children){rli='ucs-menu-li-' + this.index}
	                var li = {
	                        className: classnames({'active': child.active}, {'has-child': child.children}, rli),
	                    }
	                var div = {
	                    onClick: event === 'click' ? this._handleClick.bind(this, this.index, child.name) : "",
	                    onMouseOver: event === 'mouseover' ? this._handleMouseOver.bind(this, this.index) : "",
	                    onMouseLeave: event === 'mouseover' ? this._handleMouseLeave.bind(this, this.index) : "",
	                    ref: 'key' + this.index
	                }
	                //图标处理
	                var icons = child.icon;
	                if(icons){
	                    var leftIconReturn = ( React.createElement("i", {className: icons.left}) );
	                    var rightIconReturn = ( React.createElement("i", {className: icons.right}) );
	                }else{
	                    var leftIconReturn = rightIconReturn = '';
	                }
	                return (
	                    React.createElement("li", React.__spread({},  li), 
	                        React.createElement("div", React.__spread({className: "menu-title"},  div), 
	                            leftIconReturn, 
	                            child.href ?
	                                React.createElement("a", {
	                                    id: child.id, 
	                                    href: child.href, 
	                                    onClick: this.onClick.bind(this, child), 
	                                    target: child.target, 
	                                    className: classnames({'active': child.active})}, 
	                                    child.name
	                                ) :
	                                React.createElement("span", {className: classnames({'active': child.active})}, child.name), 
	                            
	                            rightIconReturn
	                        ), 
	                        child.children ?
	                            React.createElement("ul", {className: classnames('children',{'show':child.childShow}), 
	                                ref: "keyul"+this.index}, 
	                                this.MenuMap(child.children)
	                            )
	                            : ""
	                    )
	                );
	            }.bind(this))
	        )
	    },
	    /**
	     * 点击事件
	     * @param {child} 当前点击dom对象
	     *
	     * */
	    onClick:function(child){
	        this.props.onClick ? this.props.onClick(child) : '';
	    },
	    render: function () {
	        return (
	            React.createElement("div", {className: classnames('ucs-nav clearfix',this.props.className)}, 
	                React.createElement("ul", null, 
	                    this.MenuMap(this.props.data)
	                )
	            )
	        )
	    }
	});
	module.exports = Navigation;

/***/ },
/* 52 */
/***/ function(module, exports) {

	 /**
	     *  weishuxian
	     * 旋转组件
	     *
	     * @param [size] 旋转 大小
	     *
	     * 示例:
	     *
	     *     @example
	     *     <Spin size="small"></Spin>
	     *
	     *     <Spin size="large"></Spin>
	     *
	     */
	var Spin = React.createClass({displayName: "Spin",
	    render:function(){
	        var addClass;
	        if(this.props.size == "small" ){
	            addClass = "ucs-spin-sm";
	        }else if(this.props.size == "large"){
	            addClass = "ucs-spin-lg";
	        }else{
	            addClass = " ";
	        }
	        var spinClass = "ucs-spin" + " " + addClass + " " + "ucs-spin-spinning";
	        var spinDotClass = "ucs-spin-dot";
	        return(
	            React.createElement("div", {className: spinClass}, 
	              React.createElement("span", {className: spinDotClass}, 
	                React.createElement("i", null), 
	                React.createElement("i", null), 
	                React.createElement("i", null), 
	                React.createElement("i", null)
	              )
	            )
	        )
	    }
	})

	module.exports = Spin;






/***/ },
/* 53 */
/***/ function(module, exports) {

	   /**
	    * 开关组件
	    *
	    * @param [size] 按钮 大小
	    *
	    * @param [defaultChecked] 按钮开关状态 默认为false 表示关闭状态
	    *
	    * @param [checkedChildren] 按钮文本 例如 “开”
	    *
	    * @param [unCheckedChildren] 按钮文本 例如 “关”
	    *
	    * @param [disabled] 按钮滑动 默认为false
	    *
	    *
	    * @author weishuxian
	    *
	    * 示例：
	    *
	    *     @example
	    *     <Switch size="small" checkedChildren={'开'} unCheckedChildren={'关'} defaultChecked={true}></Switch>
	    *
	    *
	    *     <Switch size="small" checkedChildren={'开'} unCheckedChildren={'关'} defaultChecked={true} disabled={true}></Switch>
	    *
	    */
	var Switch = React.createClass({displayName: "Switch",
	    getInitialState: function() {
	        return {checked: false,
	            className:''};
	    },
	    handleClick: function() {
	        if(this.props.disabled){
	            return;
	        }else{
	            if(this.state.checked){
	                if(this.props.size == "small"){
	                    this.state.className = 'ucs-switch-small ucs-switch';
	                }else{
	                    this.state.className = 'ucs-switch';
	                }
	                this.setState({checked: !this.state.checked});
	            }else{
	                if(this.props.size == "small"){
	                    this.state.className = 'ucs-switch-small ucs-switch ucs-switch-checked';
	                }else{
	                    this.state.className = 'ucs-switch ucs-switch-checked';
	                }
	                this.setState({checked: !this.state.checked});
	            }
	        }
	        this.forceUpdate();
	    },
	    componentDidMount: function(){
	        if(this.props.disabled){
	            if(this.state.checked){
	                if(this.props.size == "small"){
	                    this.state.className = 'ucs-switch-small ucs-switch ucs-switch-checked ucs-switch-disabled ';
	                }else {
	                    this.state.className = 'ucs-switch ucs-switch-checked ucs-switch-disabled ';
	                }
	            }else{
	                if(this.props.size == "small"){
	                    this.state.className = 'ucs-switch-small ucs-switch ucs-switch-disabled ';
	                }else {
	                    this.state.className = 'ucs-switch ucs-switch-disabled ';
	                }
	            }

	            if(this.props.defaultChecked){
	                if(this.props.size == "small"){
	                    this.state.className = 'ucs-switch-small ucs-switch ucs-switch-checked ucs-switch-disabled';
	                }else{
	                    this.state.className = 'ucs-switch ucs-switch-checked ucs-switch-disabled';
	                }
	                this.setState({checked: !this.state.checked});
	            }else{
	                if(this.props.size == "small"){
	                    this.state.className = 'ucs-switch-small ucs-switch ucs-switch-disabled';
	                }
	                else{
	                    this.state.className = 'ucs-switch ucs-switch-disabled';
	                }
	            }
	        }else{
	            if(this.props.defaultChecked){
	                if(this.props.size == "small"){
	                    this.state.className = 'ucs-switch-small ucs-switch ucs-switch-checked';
	                }else{
	                    this.state.className = 'ucs-switch ucs-switch-checked';
	                }
	                this.setState({checked: !this.state.checked});
	            }else{
	                if(this.props.size == "small"){
	                    this.state.className = 'ucs-switch-small ucs-switch';
	                }
	                else{
	                    this.state.className = 'ucs-switch';
	                }
	            }
	        }
	        this.forceUpdate();
	    },
	    render:function(){
	        return(
	            React.createElement("span", {className: this.state.className, onClick: this.handleClick}, 
	                React.createElement("span", {className: "ucs-switch-inner"}, this.state.checked?this.props.checkedChildren:this.props.unCheckedChildren)
	            )
	        )
	    }
	})

	module.exports = Switch;






/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * @constructs
	 * Created by Administrator on 2017/2/9.
	 */
	module.exports = {
	    Collapse:__webpack_require__(55),
	    Panel:__webpack_require__(56)
	}

/***/ },
/* 55 */
/***/ function(module, exports) {

	/*
	 * Created by Administrator on 2016/12/9.
	 */
	/**
	 * Collapse组件
	 *
	 * @param [afterCallBack] 回调函数
	 * @param [arrow] 箭头
	 * @param [headerCanClick] 头部是否可点击
	 * @param [arrowCanClick] 箭头是否可点击
	 * @param [accordion] 是否是手风琴效果
	 *
	 * 示例:
	 *
	 *     @example
	 *     var collapseSettings = {
	 *           afterCallBack : function(){
	 *               console.log("回调");
	 *           }
	 *       };
	 *       var panelOneSettings = {
	 *           arrow : {
	 *               style : {
	 *                   top: "0",
	 *                   right: "50px"
	 *               },
	 *               openContent : "修改↓",
	 *               closeContent : "修改↑"
	 *           },
	 *           headerCanClick: false,
	 *           arrowCanClick: true
	 *       };
	 *       var panelTwoSettings = {
	 *           arrow : {
	 *               style : {
	 *                   top: "0",
	 *                   left: "16px"
	 *               },
	 *               openContent : "v",
	 *               closeContent : ">"
	 *           },
	 *           headerCanClick: true,
	 *           arrowCanClick: true
	 *       };
	 *        <Collapse {...collapseSettings}>
	 *            <Panel title={<h4 style={{color: "#000"}}>This is panel header 1</h4>} key="1" {...panelOneSettings}>
	 *                <div>
	 *                    姓名：<input type="text" className="name" /><br /><br />
	 *                    电话：<input type="text" className="phone" />
	 *                </div>
	 *            </Panel>
	 *            <Panel title={'This is panel header 2'} key="2" {...panelOneSettings}>
	 *               <p>内容1</p>
	 *            </Panel>
	 *            <Panel title={'This is panel header 3'} key="3" {...panelOneSettings}>
	 *               <p>内容2</p>
	 *            </Panel>
	 *        </Collapse>
	 *        <Collapse accordion>
	 *            <Panel title={'This is panel header 1'} key="1" {...panelTwoSettings}>
	 *               <p>内容1</p>
	 *            </Panel>
	 *            <Panel title={'This is panel header 2'} key="2" {...panelTwoSettings}>
	 *               <p>内容2</p>
	 *            </Panel>
	 *            <Panel title={'This is panel header 3'} key="3" {...panelTwoSettings}>
	 *               <p>内容3</p>
	 *            </Panel>
	 *        </Collapse>
	 */
	var Collapse = React.createClass({displayName: "Collapse",
	    getDefaultProps: function(){
	        return {
	            afterCallBack: function(){

	            }
	        }
	    },
	    getInitialState: function () {
	        var _this = this;
	        return {
	            panelChildren: React.Children.map(_this.props.children,function(o,i){
	                return React.cloneElement(o, {
	                    key: i ,
	                    panelKey:i,
	                    active : i==0?true:false,
	                    animClassName : "",
	                    arrowContent : i==0?o.props.arrow.openContent:o.props.arrow.closeContent,
	                    height: i==0?46:0,
	                    callback: _this.callback
	                });
	            })
	        }
	    },
	    componentWillMount: function(){
	    },
	    componentDidMount: function(){
	    },
	    componentDidUpdate: function(){
	        this.props.afterCallBack();
	    },
	    callback: function(key){
	        var _this = this;
	        _this.setState({
	            panelChildren: React.Children.map(_this.props.children,function(o,i){
	                if(_this.props.accordion){//判断是否是手风琴
	                    return i == key ? React.cloneElement(o, {
	                        key: i ,
	                        panelKey:i,
	                        active : !_this.state.panelChildren[i].props.active,
	                        animClassName : "ucs-collapse-anim-active",
	                        arrowContent : _this.state.panelChildren[i].props.active?o.props.arrow.closeContent:o.props.arrow.openContent,
	                        //height: _this.state.panelChildren[i].props.active?0:46,
	                        callback: _this.callback
	                    }):React.cloneElement(o, {
	                        key: i ,
	                        panelKey:i,
	                        active : false,
	                        animClassName : "ucs-collapse-anim-active",
	                        arrowContent : o.props.arrow.closeContent,
	                        //height:0,
	                        callback: _this.callback
	                    });
	                }else{
	                    return i == key ? React.cloneElement(o, {
	                        key: i ,
	                        panelKey:i,
	                        active : !_this.state.panelChildren[i].props.active,
	                        animClassName : "ucs-collapse-anim-active",
	                        arrowContent : _this.state.panelChildren[i].props.active?o.props.arrow.closeContent:o.props.arrow.openContent,
	                        //height: _this.state.panelChildren[i].props.active?0:46,
	                        callback: _this.callback
	                    }):React.cloneElement(o, {
	                        key: i ,
	                        panelKey:i,
	                        active : _this.state.panelChildren[i].props.active,
	                        animClassName : "",
	                        arrowContent : _this.state.panelChildren[i].props.active?o.props.arrow.openContent:o.props.arrow.closeContent,
	                        //height: _this.state.panelChildren[i].props.height,
	                        callback: _this.callback
	                    });
	                }

	            })
	        });
	        /*setTimeout(function(){
	            _this.setState({
	                panelChildren: React.Children.map(_this.props.children,function(o,i){
	                    return React.cloneElement(o, {
	                        key: i ,
	                        panelKey:i,
	                        active : _this.state.panelChildren[i].props.active,
	                        animClassName : "",
	                        callback: _this.callback
	                    });
	                })
	            });
	        },200);*/
	    },
	    render: function(){
	        var _this = this;
	        var children = _this.state.panelChildren;
	        return (
	            React.createElement("div", {className: "ucs-collapse"}, children)
	        );
	    }
	});

	module.exports = Collapse;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	
	var classnames = __webpack_require__(2);

	var Panel = React.createClass({displayName: "Panel",
	    getDefaultProps: function(){
	        console.log("Panel getDefaultProps");
	        return {
	            arrow : {
	                style : {
	                    top: "0",
	                    left: "16px"
	                }
	            },
	            headerCanClick: true,
	            arrowCanClick: true
	        };
	    },
	    getInitialState: function () {
	        console.log("Panel getInitialState");
	        return {

	        }
	    },
	    componentWillMount: function(){
	        console.log("Panel componentWillMount");
	    },
	    componentDidMount: function(){
	        console.log("Panel componentDidMount");
	    },
	    handlerShow: function(canClick,e){
	        var evt = e ? e : window.event;
	        if (evt.stopPropagation) {
	            //W3C
	            evt.stopPropagation();
	        } else {
	            //IE
	            evt.cancelBubble = true;
	        }
	        var _this = this;
	        if(canClick){
	            _this.props.callback(_this.props.panelKey);
	        }else{
	            return;
	        }
	    },
	    componentDidUpdate: function(){

	    },
	    render: function(){
	        console.log("Panel render");
	        var _this = this;
	        var panelClassName = classnames('ucs-collapse-item',{
	            'ucs-collapse-item-active': _this.props.active
	        });
	        var conClassName = classnames('ucs-collapse-content',{
	            'ucs-collapse-content-inactive': !_this.props.active
	        },{
	            'ucs-collapse-content-active': _this.props.active
	        },_this.props.animClassName);
	        return (
	            React.createElement("div", {className: panelClassName}, 
	                React.createElement("div", {className: "ucs-collapse-header", role: "tab", "aria-expanded": _this.props.active, onClick: _this.handlerShow.bind(_this,_this.props.headerCanClick)}, 
	                    React.createElement("i", {className: "arrow", style: _this.props.arrow.style, onClick: _this.handlerShow.bind(_this,_this.props.arrowCanClick)}, _this.props.arrowContent), 
	                    _this.props.title
	                ), 
	                React.createElement("div", {className: conClassName, role: "tabpanel"}, 
	                    React.createElement("div", {className: "ucs-collapse-content-box"}, 
	                        _this.props.children
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = Panel;

/***/ }
/******/ ])
});
;