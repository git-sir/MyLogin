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
    "emailAccount": [
        {type: "mail", msg: "邮箱地址不对"}
    ],
    "mobileAccount": [
        {type: "mobile", msg: "手机格式不对"}
    ],
    "password": [
        {type: "required", msg: "密码不能为空"},
        {type : "maxlength", maxlength : 25, msg : "密码长度不能超过25"}
    ],
    "mobilePhone": [
        {type: "mobile", msg: "手机格式不对"}
    ],
    "email": [
        {type: "mail", msg: "手机格式不对"}
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
            "realName", "emailAccount","mobileAccount","password",
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
        this.setState({
            title: title,
            url: url,
            ucasAccountGroup: data,
            callback: callback,
        });
    },
    _return: function () {
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
            <input type="hidden" name="accUuid" value={this.state.ucasAccountGroup.accUuid}/>
        <FormItem label="用户名称"><Input name="realName"  value={this.state.ucasAccountGroup.realName}/></FormItem>
        <FormItem label="邮箱帐号"><Input name="emailAccount"  value={this.state.ucasAccountGroup.emailAccount}/></FormItem>
        <FormItem label="手机帐号"><Input name="mobileAccount"  value={this.state.ucasAccountGroup.mobilephone}/></FormItem>
        <FormItem label="用户密码"><Input name="password"  value={this.state.ucasAccountGroup.password}/></FormItem>
        <FormItem label="联系手机"><Input name="mobilePhone"  value={this.state.ucasAccountGroup.mobilephone}/></FormItem>
        <FormItem label="联系邮箱"><Input name="email"  value={this.state.ucasAccountGroup.emailAccount}/></FormItem>
        <FormItem label="网金帐号"><Input name="ucasAccount"  value={this.state.ucasAccountGroup.ucasAccount}/></FormItem>
        <FormItem label="头像地址"><Input name="headImgUrl"  value={this.state.ucasAccountGroup.headImgUrl}/></FormItem>
        <FormItem label="组织名称"><Input name="orgName"  value={this.state.ucasAccountGroup.orgName}/></FormItem>
        <FormItem label="性别" className="col-xs-5">
            <RadioGroup name="sex" value={this.state.clientGroup.isSso == null ? "1" : this.state.clientGroup.isSso}>
        <Radio value="1"><span style={{"padding-left": "20px"}}>男</span></Radio>
        <Radio value="2"><span style={{"padding-left": "20px"}}>女</span></Radio>
        </RadioGroup>
        </FormItem>
        <FormItem label="用户组" >
            <SelectDropDown name="accgUuid" option={that.state.urgentFlag} value ={that.state.data}  className="setwidth" ref="urgentFlag" />
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