/**
 * Created by Administrator on 2016/12/7.
 */
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
var BankCard = React.createClass({
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
            <div className="ucs-bank-card">
                <div className="ucs-card-list" ref="ucs-card-list">
                    {
                        _this.state.cardArr.map(function(card,index){
                            return (
                                <div className="ucs-card-item" ref={"card-item-"+index} onMouseEnter={_this.onMouseEnterHandler.bind(_this,"del-bank-card"+index)} onMouseLeave={_this.onMouseLeaveHandler.bind(_this,"del-bank-card"+index)}>
                                    <span className={"bank-logo "+card.cardLogoClassName}></span>
                                    <div className="card-num">{card.cardNumber}</div>
                                    <p className="del-bank-card" ref={"del-bank-card"+index} style={{display: "none"}}>
                                        <a href="javascript:;" className="icon-del icon-delete" onClick={_this.delBankCardHandler.bind(_this,index)}>X</a>
                                    </p>
                                </div>
                            );
                        })
                    }
                    <div className="ucs-card-item add-bank-card">
                        <a href="javascript:void(0);" className="fc-link" onClick={_this.showHandler.bind(_this,"ucs-addbank-layer")}>
                            <i className="icon-add icon-addbank">+</i>
                            添加银行卡
                        </a>
                    </div>
                </div>
                <div ref="ucs-addbank-layer" className="ucs-addbank-layer ucs-alert-layer" style={{width:"700px",display:"none",height:"620px", left:"50%", top:"50%",marginLeft:"-350px",marginTop:"-310px", position:"absolute"}}>
                    <a className="close ucs-layer-close icon-close" href="javascript:void(0)" onClick={_this.hideHandler.bind(_this,"ucs-addbank-layer")}>X</a>
                    <h3 className="ucs-layer-title"><b></b>添加账户</h3>
                    <div className="ucs-layer-content">
                        <div className="ucs-card-note add-bank-note"><i className="icon-note icon-bids"></i>您所添加的银行账户将用于收取投资本金及收益，请认真填写以下内容，确保其真实性。</div>
                        <div className="ucs-add-bank">
                            <div className="ui-input" style={{margin:0}}> <span className="name"><b className="fcred">*&nbsp;</b>开户姓名：</span>
                                刘**
                            </div>
                            <div className="ui-input" style={{margin:0}}> <span className="name"><b className="fcred">*&nbsp;</b>身份证：</span>
                                440*************19
                            </div>
                            <div className="ui-input"> <span className="name"><b className="fcred">*&nbsp;</b>账号：</span>
                                <input type="text" className="cell-input formatnum" onselect="return false" ref="f-card-num" onFocus={_this.onFocusHandler} onBlur={_this.onBlurHandler}/>
                                <div className="ui-tips">
                                    <div className="note"><i className="icon-note icon-bids"></i>输入提示</div>
                                    <div className="error"><i className="icon-error icon-cuowu"></i>输入错误提示</div>
                                    <div className="correct"><i className="icon-correct icon-zhengque"></i></div>
                                </div>
                            </div>
                            <div className="ui-input"><span className="name"><b className="fcred">*&nbsp;</b>确认账号：</span>
                                <input type="text" className="cell-input formatnum on-error" onFocus={_this.onFocusHandler} onBlur={_this.onBlurHandler}/>
                                <div className="ui-tips">
                                    <div className="note"><i className="icon-note icon-bids"></i>输入提示</div>
                                    <div className="error"><i className="icon-error icon-cuowu"></i>输入错误提示</div>
                                    <div className="correct"><i className="icon-correct icon-zhengque"></i></div>
                                </div>
                            </div>
                            <div className="ui-input" style={{zIndex: 12}}> <span className="name"><b className="fcred">*&nbsp;</b>开户行：</span>
                                <div className="selectdrapdown selectdrapdowndemo">
                                    <div className="cell-input" ref="oneDropDownBox" onClick={_this.dropDownHandler.bind(_this,"oneDropDown","oneDropDownBox")}>{_this.state.bankName}<i className="icon-adown"></i></div>
                                    <div className="drapdown" ref="oneDropDown" onClick={_this.dropDownHandler.bind(_this,"oneDropDown","oneDropDownBox")}>
                                        <ul>
                                            <li onClick={_this.changeHandler.bind(_this,"bankName","银行1")}>银行1</li>
                                            <li onClick={_this.changeHandler.bind(_this,"bankName","银行2")}>银行2</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="ui-tips">
                                    <div className="note"><i className="icon-note icon-bids"></i>输入提示</div>
                                    <div className="error"><i className="icon-error icon-cuowu"></i>输入错误提示</div>
                                    <div className="correct"><i className="icon-correct icon-zhengque"></i></div>
                                </div>
                            </div>
                            <div className="ui-input" style={{zIndex: 11}}> <span className="name"><b className="fcred">*&nbsp;</b>开户省市：</span>
                                <div className="selectdrapdown selectdrapdowndemo">
                                    <div className="cell-input" ref="twoDropDownBox" style={{width:"115px"}} onClick={_this.dropDownHandler.bind(_this,"twoDropDown","twoDropDownBox")}>{_this.state.province}<i className="icon-adown"></i></div>
                                    <div className="drapdown" ref="twoDropDown" onClick={_this.dropDownHandler.bind(_this,"twoDropDown","twoDropDownBox")}>
                                        <ul>
                                            <li onClick={_this.changeHandler.bind(_this,"province","省份1")}>省份1</li>
                                            <li onClick={_this.changeHandler.bind(_this,"province","省份2")}>省份2</li>
                                            <li onClick={_this.changeHandler.bind(_this,"province","省份3")}>省份3</li>
                                            <li onClick={_this.changeHandler.bind(_this,"province","省份4")}>省份4</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="selectdrapdown selectdrapdowndemo">
                                    <div className="cell-input" ref="threeDropDownBox" style={{width:"115px"}} onClick={_this.dropDownHandler.bind(_this,"threeDropDown","threeDropDownBox")}>{_this.state.city}<i className="icon-adown"></i></div>
                                    <div className="drapdown" ref="threeDropDown" onClick={_this.dropDownHandler.bind(_this,"threeDropDown","threeDropDownBox")}>
                                        <ul>
                                            <li onClick={_this.changeHandler.bind(_this,"city","城市1")}>城市1</li>
                                            <li onClick={_this.changeHandler.bind(_this,"city","城市2")}>城市2</li>
                                            <li onClick={_this.changeHandler.bind(_this,"city","城市3")}>城市3</li>
                                            <li onClick={_this.changeHandler.bind(_this,"city","城市4")}>城市4</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="ui-tips">
                                    <div className="note"><i className="icon-note icon-bids"></i>输入提示</div>
                                    <div className="error"><i className="icon-error icon-cuowu"></i>输入错误提示</div>
                                    <div className="correct"><i className="icon-correct icon-zhengque"></i></div>
                                </div>
                            </div>
                            <div className="ui-input" style={{zIndex: 10}}> <span className="name"><b className="fcred">*&nbsp;</b>支行名称：</span>
                                <div className="selectdrapdown branchselect">
                                    <div className="cell-input" ref="fourDropDownBox" onClick={_this.dropDownHandler.bind(_this,"fourDropDown","fourDropDownBox")}>{_this.state.branch}<i className="icon-adown"></i></div>
                                    <div className="drapdown" ref="fourDropDown" onClick={_this.dropDownHandler.bind(_this,"fourDropDown","fourDropDownBox")}>
                                        <ul ref="f-bank-name"></ul>
                                        <p className="search">
                                            <input type="text" className="input" />
                                            <input type="button" className="btn-ok" value="" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="ui-input ui-button-2">
                                <button className="cell-btn-orange" onClick={_this.submitHandler}>确&#12288;认</button>
                                <button className="cell-btn-gray" onClick={_this.resetHandler}>取&#12288;消</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ucs-delbank-layer ucs-alert-layer" ref="ucs-delbank-layer" style={{width: "622px",display: "none", minHeight:"360px", left:"50%", top:"50%",marginLeft:"-311px",marginTop:"-180px"}}>
                    <a className="close ucs-layer-close icon-close" href="javascript:void(0)" onClick={_this.hideHandler.bind(_this,"ucs-delbank-layer")}>X</a>
                    <h3 className="ucs-layer-title"><b></b>删除卡</h3>
                    <div className="ucs-layer-content">
                        <div className="sck">
                            <p>
                                <span className="span-1"><i className="icon-note icon-bids"></i>是否确定删除该回款账户？</span>
                                <span className="span-2">删除银行卡后不会影响已有的投资回款</span>
                                <a href="javascript:void(0);" onClick={_this.removeCardItem.bind(_this,_this.state.delIndex)}>确定</a>
                                <a className="a-1" href="javascript:void(0);">取消</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="ucs-addbank-greybackground"></div>
            </div>
        );
    }
});

module.exports = BankCard;