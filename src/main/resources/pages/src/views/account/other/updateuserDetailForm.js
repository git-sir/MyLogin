var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var Form = UcsmyUI.Form;
var FormItem = Form.FormItem;
var SelectDropDown = UcsmyUI.SelectDropDown;
var Radio = UcsmyUI.Radio;
var RadioGroup = Radio.RadioGroup;
var configFormData = {

    "realName": [
        {type: "required", msg: "用户名称不能为空"},
        {type : "minlength", maxlength : 2, msg : "用户名称长度不能小于2"},
        {type : "maxlength", maxlength : 50, msg : "用户名称长度不能超过50"}
    ],
    "mobilePhone": [
        {type: "mobile", msg: "手机格式不对"}
    ],
    "email": [
        {type: "mail", msg: "邮箱格式不对"}
    ],
    "ucasAccount": [
        {type: "fn", validator: function(value){
            if(""!==value) {
                var m =/^\d{8}$/;

                return m.test(value);
            }else return true;
        }, msg: '网金帐号为8位数字'
        }
    ],
    "accgUuid": [
        {type: "required", msg: "用户组必须选择"},
        {type: "fn", validator: function(value){
            if("-1"===value) {
                return false;
            }else return true;
        }, msg: '用户组必须选择'
        }
    ],
    "orgName": [
        {type: "required", msg: "组织名称必须填写"},
        {type : "maxlength", maxlength : 100, msg : "组织名称长度为100"}
    ],
    "headImgUrl":[
        {type:"maxlength", maxlength:100, msg : "头像地址长度不能超过100"}
    ]
};

module.exports = React.createClass({
    getInitialState: function () {
        return {
            url: '',
            title: '',
            callback: function(){},
            ucasAccountGroup: {},
            sta: '',
            urgentFlag:'',
            data:{},
            clientGroup: {}
        }
    },
    componentDidMount: function() {
        var me = this;
        $.post("accountGroup/getAll", {}, function(data) {
            if(data.retmsg !== 'success') {
                return;
            }

            me.setState({
                data: data.data,
                urgentFlag:data.data
            });
        }, "json").error(function(){
            UcsmyIndex.alert("失败", "网络异常");
        });
    },
    _validate: function (callback) {
        var status = false;
        var validateField = [
            "realName",
            "mobilePhone","email","accgUuid","ucasAccount","orgName",
            "headImgUrl"
        ];
        var fn = function (result) {
            if(result) {
                callback();
            }
        };

        this.refs.saveForm.validate(fn, validateField);

        return status;
    },
    _saveOrUpdate: function () {

        var me = this;
        this._validate(function(){
            _addButtonDisabled('save');
            $.post(me.state.url,
                $('#saveForm').serialize(),
                function (result) {
                    if (result && result.retcode==='0') {
                        UcsmyIndex.alert("提示", result.retmsg);
                        UcsmyIndex.closeChildrenPage();
                        me.state.callback();
                    } else {
                        UcsmyIndex.alert("提示", result.retmsg);
                    }
                    _removeButtonDisabled('save');
                }).error(function(){
                UcsmyIndex.alert("失败", "网络异常");
                _removeButtonDisabled('save');
            });
        });
    },
    init: function (url, title, data, callback) {
        var me = this;

        $.post("account/getUser",
            {'ucasAccount':data.ucasAccount},
            function (result) {
                if (result && result.retcode && result.retcode === "0") {
                  var sta;
                    if(result.data.status===null || result.data.status==='' || result.data.status==='0')
                        sta='正常';
                    else if(result.data.status==='1')
                        sta='冻结';
                    else
                        sta='删除';
                    me.setState({
                        title: title,
                        url: url,
                        ucasAccountGroup: result.data,
                        sta: sta,
                        callback: callback
                    });

                } else {
                    UcsmyIndex.alert("提示", result.retmsg);
                }
            }).error(function(){
            UcsmyIndex.alert("失败", "网络异常");
        });
    },
    _return: function (event) {
        UcsmyIndex.closeChildrenPage();
    },
    render: function () {
        var that = this;
        return (
            <div>
            <div className="panel">
            <div className="panel-title fc-red">帐号管理</div>
        <div className="panel-content">
            <Form ref="saveForm" formData={configFormData} id="saveForm">
            <input type="hidden" name="ucasAccount" value={this.state.ucasAccountGroup.ucasAccount}/>
        <FormItem label="网金帐号"><Input disabled="false" name="ucasAccount"  value={this.state.ucasAccountGroup.ucasAccount}/></FormItem>
        <FormItem label="用户名称"><Input name="realName"  value={this.state.ucasAccountGroup.realName}/></FormItem>
        <FormItem label="邮箱帐号"><Input disabled="false" name="emailAccount"  value={this.state.ucasAccountGroup.emailAccount}/></FormItem>
        <FormItem label="手机帐号"><Input disabled="false" name="mobileAccount"  value={this.state.ucasAccountGroup.mobileAccount}/></FormItem>
        <FormItem label="联系手机"><Input name="mobilePhone"  value={this.state.ucasAccountGroup.mobilePhone}/></FormItem>
        <FormItem label="联系邮箱"><Input name="email"  value={this.state.ucasAccountGroup.email}/></FormItem>
        <FormItem label="头像地址"><Input name="headImgUrl"  value={this.state.ucasAccountGroup.headImgUrl}/></FormItem>
        <FormItem label="组织名称"><Input name="orgName"  value={this.state.ucasAccountGroup.orgName}/></FormItem>
        <FormItem label="状态"><Input name="sta" disabled="false" value={this.state.sta} /></FormItem>
        <FormItem label="性别" className="col-xs-5">
            <RadioGroup name="sex" value={this.state.ucasAccountGroup.sex == null ? "1" : this.state.ucasAccountGroup.sex}>
        <Radio value="1"><span style={{"padding-left": "20px"}}>男</span></Radio>
        <Radio value="2"><span style={{"padding-left": "20px"}}>女</span></Radio>
        </RadioGroup>
        </FormItem>
        <FormItem label="用户组" >
            <SelectDropDown name="accgUuid"  option={that.state.urgentFlag}  value ={that.state.ucasAccountGroup.userAccg}  className="setwidth" ref="urgentFlag" />
         </FormItem>
        </Form>
        </div>
        </div>
        <div className="btn-panel">
            <Button buttonType="bidnow" id="save" onClick={this._saveOrUpdate}>保存</Button>
        <Button buttonType="cancel" onClick={this._return}>取消</Button>
        </div>
        </div>
        )
    }
});