/*
 * select模拟下拉
 * 参数
 * defaultText　默认下拉文本
 * defaultBankLogo 默认下拉银行logo，仅对type=bank有效
 * value 默认值
 * className 样式名
 * type 下拉类型　默认为空，可选bank search
 * showNum 显示下拉个数，超出显示滚动条
 * option 下拉选项数据　option选项　value选项对应的值(缺省时引用选项值) bankLogo银行名称仅type为bank时有效
 * placeholder 仅对搜索有效，搜索输入框placeholder提示语
 * searchButton 仅对搜索有效，搜索按钮名
 * onChange 下拉选择后回调
 * inputChange　仅对搜索有效，搜索输入回调
 * buttonClick　仅对搜索有效，搜索按钮回调
 * id id
 * */
var Input = require('../Input/index');
var Button = require('../Button/index');
var classnames = require("classnames");
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
var SelectDropDown = React.createClass({
    getInitialState: function () {
        return {
            value: this.props.value ? this.props.value : this.props.defaultText,
            defaultText: this.props.defaultText,
            display: false,//true时展开添加样式open
            bankLogo: this.props.defaultBankLogo,
            defaultPlaceholder: this.props.value ? false : true,//模拟input的defaultPlaceholder，即初始时添加placeholder样式，选择后则去掉。如果有初始值时，则不添加
            option: this.props.option,
            randomId: Math.random().toString(36).substr(2, 10)
        }
    },
    getDefaultProps: function () {
        return {
            value: "",//默认初始值
            className: "",
            type: "", //三种类型，bank,search
            showNum: "",
            option: "",
            defaultBankLogo: "",
            searchButton: "",
            placeholder: "",
            inputChange: "",//搜索时输入框回调
            buttonClick: ""//搜索时按钮回调
        }
    },
    _handleBodyClick: function (evt) {
        if (this.state.display) {
            var a = findParentNode(evt.srcElement, this.state.randomId);
            if (a === false) {
                this.setState({display: false});
            }
        } else {
            myRemoveEvent(document.body, 'click', this._handleBodyClick);
        }
    },
    componentWillUnmount: function () {
        //document.body.removeEventListener("click", this._handleBodyClick, false);
        myRemoveEvent(document.body, 'click', this._handleBodyClick);
    },
    _handleChange: function (e) {
        this.setState({display: !this.state.display}, function () {
            this._setUlHeight();
            myAddEvent(document.body, 'click', this._handleBodyClick);
        });
        e.preventDefault();
        e.stopPropagation();
    },
    _handleInputChange: function (e) {
        //搜索输入框改变时
        this.props.inputChange ? this.props.inputChange(e) : "";
    },
    _handleSearchClick: function () {
        //搜索按钮点击
        this.props.buttonClick ? this.props.buttonClick(e) : "";
    },
    getValue: function () {
        return this.state.value
    },
    setValue: function (option, defaultText, defaultVlaue) {
        this.setState({
            option: option,
            value: defaultVlaue,
            defaultText: defaultText
        });
    },
    _setUlHeight: function () {
        var ul = this.refs.dropdownul;
        if (this.state.display) {
            var liheight = this.refs.dropdownul.getElementsByTagName("li")[0].offsetHeight;
            //如果下拉个数大于要显示的个数
            if (parseInt(this.props.option.length) > parseInt(this.props.showNum) && this.props.showNum) {
                ul.style.height = liheight * this.props.showNum + "px";
            }
        }
    },
    _handleLiClick: function (el) {
        if (!el.disabled) {
            this.setState({
                defaultText: el.option,
                value: el.value ? el.value : el.option,
                bankLogo: el.bankLogo,
                display: false,
                defaultPlaceholder: false
            });
            this.props.onChange ? this.props.onChange(el) : "";
        }
    },
    render: function () {
        var bankdefalut = "";
        if (this.props.type == "bank" && this.state.bankLogo) {
            bankdefalut = <span className={classnames("bank-logo","bank-"+this.state.bankLogo)}></span>;
        }
        var mainClass = classnames(
            "ucs-select-dropdown",
            "ucs-select-" + this.state.randomId,
            this.props.className,
            {"open": this.state.display},
            {"ucs-select-search": this.props.type == "search"},
            {"ucs-select-bank": this.props.type == "bank"}
        );
        return (
            <div
                className={mainClass} id={this.props.id}>
                <div className="ucs-select-control" onClick={this._handleChange}>
                    <div className={classnames("ucs-input",{"placeholder":this.state.defaultPlaceholder})}
                         data-value={this.state.value} ref="ucsInput">
                        {bankdefalut}
                        <span>{this.state.defaultText}</span>
                    </div>
                    <span className="ucs-icon"></span>
                </div>
                <div className="ucs-dropdown">
                    <div className="ucs-dropdown-border">
                        {this.props.type == "search" ?
                            <div className="ucs-search-box">
                                <Input className="select-dropdown-input" onChange={this._handleInputChange}
                                       placeholder={this.props.placeholder}/>
                                <Button buttonType="dropdown-search"
                                        onClick={this._handleSearchClick}>{this.props.searchButton}</Button>
                            </div>
                            : ""}
                        <ul ref="dropdownul">
                            {this.state.option.map(function (el) {
                                return (
                                    <li data-value={el.value?el.value:el.option}
                                        onClick={this._handleLiClick.bind(this,el)}
                                        className={el.disabled?'disabled':""}>
                                        {this.props.type == "bank" ?
                                            <span className={classnames("bank-logo","bank-"+el.bankLogo)}></span> : ""}
                                        <span>{el.option}</span></li>
                                );
                            }.bind(this))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
});
module.exports = SelectDropDown;
