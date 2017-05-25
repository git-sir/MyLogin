var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var Form = UcsmyUI.Form;
var FormItem = Form.FormItem;
var SelectDropDown = UcsmyUI.SelectDropDown;
var Checkbox =UcsmyUI.Checkbox;
var Radio = UcsmyUI.Radio;
var RadioGroup = Radio.RadioGroup;

var clientFormData = {

    "clientName": [
        {type: "required", msg: "应用简称不能为空"},
        {type : "maxlength", maxlength : 100, msg : "参数名称长度不能超过100"}
    ],
    "descRibe": [
        {type: "required", msg: "应用描述不能为空"},
        {type : "maxlength", maxlength : 200, msg : "参数值长度不能超过200"}
    ],
    "clientUrl": [
        {type : "maxlength", maxlength : 200, msg : "参数值长度不能超过200"}
    ],
    "maxTimes": [
        {type: "digits", msg: "最大使用次数只能为数字"},
        {type : "maxlength", maxlength : 9, msg : "参数值长度不能超过9"}
    ],
    "expiryDate": [
        {type: "digits", msg: "Token时效只能为数字"},
        {type: "required", msg: "Token时效不能为空"},
        {type : "maxlength", maxlength : 9, msg : "参数值长度不能超过9"}
    ],
    "refreshExpiryDate": [
        {type: "digits", msg: "刷新Token时效只能为数字"},
        {type: "required", msg: "刷新Token时效不能为空"},
        {type : "maxlength", maxlength : 9, msg : "参数值长度不能超过9"}
    ]

};

module.exports = React.createClass({
    getDefaultProps: function(){
        return {
            //GRANT_TYPE: ['authorization_code','password','client_credentials','proxy_authorization_code']
        }
    },
    getInitialState: function(){
        return {
            url: '',
            title: 'title',
            successFn: function() {},
            client: {},
            clientGroup: [],
            cligUuid: '',
            grantType: '',
            tokenStrategy: {},
            hasTokenStrategy: "0",
            GRANT_TYPE:[]
        }
    },
    componentDidMount: function() {
        var me = this;
        $.post("client_info/queryAllClientGroup", {}, function(data) {
            if(data.retcode != 0) {
                return;
            }
            var array = [];
            data.data.map(function(data) {
                array.push({
                    option: data.groupName,
                    value: data.cligUuid
                });
            });
            me.setState({
                clientGroup: array
            });
        }, "json").error(function(xhr, errorText, errorType){
        });
        $.post("client_info/queryAllGrantType", {}, function(data) {
            if(data.retcode != 0) {
                return;
            }
            console.log("加载到所有授权类型");
            console.log(data.data);
            //页面加载授权类型对应的CheckBox组件
            me.setState({
                GRANT_TYPE: data.data
            });
            //更新CheckBox组件,必须通过调用组件setChecked方法才有效
            if(me.state.client.grantType !== undefined && me.state.client.grantType !== null){
                me.state.client.grantType.split(",").map(function (grantTypeName) {
                    if(me.refs[grantTypeName] !== undefined){
                        me.refs[grantTypeName].setChecked(true);
                    }
                })
            }
        }, "json").error(function(xhr, errorText, errorType){
        });
    },
    _validate: function (callback) {
        var status = false;
        var validateField = [
            "clientName", "descRibe", "clientUrl"
        ];
        if (this.refs.hasTokenStrategy.getValue() == "1") {
            validateField = [
                "clientName", "descRibe", "clientUrl", "maxTimes", "expiryDate", "refreshExpiryDate"
            ];
        }
        var fn = function (result) {
            console.log(result);
            if(result) {
                callback();
            }
        };

        this.refs.saveForm.validate(fn, validateField);

        return status;
    },
    init: function(title, url, data, successFn) {
        this.setState({
            title: title,
            url: url,
            successFn: successFn,
            client: data,
            cligUuid: data.cligUuid
        }, () => {
            this._loadTokenStrategy(data.clientId);
        });
    },
    _return: function(event) {
        UcsmyIndex.closeChildrenPage();
    },
    _save: function(event) {
        var me = this;
        this._validate(function(){
            _addButtonDisabled('save');
            var selectedGroupId = me.refs.clientGroupDropDown.getValue();
            me.state.cligUuid = selectedGroupId;
            var array = [];
            var authorization_code_selected = false;
            //me.props.GRANT_TYPE.map(function(data,index){
            me.state.GRANT_TYPE.map(function(data,index){
                if(me.refs[data].getChecked()){
                    array.push(data);
                    if(data == 'authorization_code'){   //判断授权类型是否有选择'authorization_code'
                        authorization_code_selected = true;
                    }
                }
            });
            if(array.length == 0){
                UcsmyIndex.alert("提示", "请选择授权类型");
                _removeButtonDisabled('save');
                return;
            }
            if(authorization_code_selected){
                var clientUrlValue = me.refs.clientUrl.getValue();
                if(clientUrlValue == undefined || clientUrlValue == ''){
                    UcsmyIndex.alert("提示", "选择authorization_code授权类型必须填写重定向URL");
                    _removeButtonDisabled('save');
                    return;
                }
            }
            //每次都先清空一下me.state.grantType,以免操作失败时保留着旧数据,造成数据重复添加
            me.state.grantType = '';
            array.map(function(data,index){
                me.state.grantType += data;
                if(index < array.length-1){
                    me.state.grantType += ',';
                }
            });

            me.setState({
                grantType: me.state.grantType
            });
            $.post(me.state.url,
                $('#form').serialize(),
                function(data) {
                    _removeButtonDisabled('save');
                    if(data.retcode == 0) {
                        UcsmyIndex.alert("成功", data.retmsg);
                        me.state.successFn();
                        me._return();
                    } else {
                        UcsmyIndex.alert("失败", data.retmsg);
                    }
                }, "json").error(function(xhr, errorText, errorType){
                    _removeButtonDisabled('save');
                    UcsmyIndex.alert("失败", "网络异常");
            });
        });
    },
    _customTokenStrategy: function (item) {
        if (item == '1') {
            $('#customTokenStrategy').attr('style', 'display');
        } else {
            $('#customTokenStrategy').attr('style', 'display:none');
        }
    },
    _loadTokenStrategy: function (clientId) {
        if (clientId == null || clientId == '') {
            return;
        }
        var me = this;
        $.post("tokenStrategy/queryTokenStrategyByClientId", {clientId: clientId}, function(data) {
            if(data.retcode != 0) {
                return;
            }
            var tokenStrategy = {};
            var hasTokenStrategy = "0";
            if (data.data != null && data.data.length > 0) {
                tokenStrategy = data.data[0];
                hasTokenStrategy = "1";
            }
            me._customTokenStrategy(hasTokenStrategy);
            me.setState({
                tokenStrategy: tokenStrategy,
                hasTokenStrategy: hasTokenStrategy
            });
        }, "json").error(function(xhr, errorText, errorType){
        });
    },
    render: function() {
        return (
            <div>
                <div className="panel">
                    <div className="panel-title fc-red">{this.state.title}</div>
                    <div className="panel-content">
                        <Form id="form" ref="saveForm" formData={clientFormData}>
                            <input type="hidden" name="clientId" value={this.state.client.clientId} />
                            <input type="hidden" name="cligUuid" value={this.state.cligUuid} />
                            <input type="hidden" name="grantType" value={this.state.grantType} />
                            <FormItem label="应用简称">
                                <Input name="clientName" value={this.state.client.clientName}/>
                            </FormItem>
                            <FormItem label="应用描述">
                                <Input name="descRibe" value={this.state.client.descRibe} />
                            </FormItem>
                            <FormItem label="重定向URL">
                                <Input name="clientUrl" value={this.state.client.clientUrl} ref="clientUrl"/>
                            </FormItem>
                            <FormItem label="应用组">
                                <SelectDropDown
                                    option={this.state.clientGroup}
                                    //defaultText="请选择"
                                    ref="clientGroupDropDown"
                                    value={this.state.client.cligUuid}
                                />
                            </FormItem>
                            {this.state.client.clientSecret?(<FormItem label="应用密钥">
                                <Input name="clientSecret" value={this.state.client.clientSecret} />
                            </FormItem>):''}
                            <FormItem label="授权类型" className="shouquan-type">
                                {
                                    this.state.GRANT_TYPE ?
                                    this.state.GRANT_TYPE.map(function(data,index){
                                        return <Checkbox text={data} value={data} ref={data}/>
                                    }):''
                                }
                            </FormItem>
                            <div className="ucs-form-group">
                                <span>自定义Token策略：</span>
                                <span style={{'margin-left': '10px'}}>
                                <RadioGroup name="hasTokenStrategy" ref="hasTokenStrategy" value={this.state.hasTokenStrategy == null ? "0" : this.state.hasTokenStrategy} onChange={this._customTokenStrategy}>
                                    <Radio value="1"><span style={{"padding-left": "5px"}}>是</span></Radio>
                                    <Radio value="0"><span style={{"padding-left": "5px"}}>否</span></Radio>
                                </RadioGroup>
                                </span>
                            </div>
                            <div id="customTokenStrategy" style={{'display': 'none'}}>
                                <input type="hidden" name="uuid" value={this.state.tokenStrategy.uuid} />
                                <FormItem label="最大使用次数">
                                    <Input name="maxTimes" value={this.state.tokenStrategy.maxTimes} />
                                </FormItem>
                                <FormItem label="Token时效">
                                    <Input name="expiryDate" value={this.state.tokenStrategy.expiryDate == null ? '7200' : this.state.tokenStrategy.expiryDate} placeholder="单位秒，默认7200秒"/>
                                </FormItem>
                                <FormItem label="刷新Token时效">
                                    <Input name="refreshExpiryDate" value={this.state.tokenStrategy.refreshExpiryDate == null ? '2592000' : this.state.tokenStrategy.refreshExpiryDate} placeholder="单位秒，默认2592000秒"/>
                                </FormItem>
                            </div>
                        </Form>
                    </div>
                </div>
                <div className="btn-panel">
                    <Button id="save" buttonType="bidnow" onClick={this._save}>保存</Button>
                    <Button buttonType="cancel" onClick={this._return}>取消</Button>
                </div>
            </div>
        );
    }
});