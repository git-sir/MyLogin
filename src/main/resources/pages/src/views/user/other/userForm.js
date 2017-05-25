var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var FormItem = UcsmyUI.Form.FormItem;
var SelectDropDown = UcsmyUI.SelectDropDown;
var Radio = UcsmyUI.Radio;
var RadioGroup = Radio.RadioGroup;
var Form = require('../../widget/other/form');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            url: '',
            title: 'title',
            successFn: function(){},
            isUpdate: false,
            role: []
        }
    },
    componentDidMount: function() {
        var me = this;
        $.post("role/queryAllRoleList", {}, function(data) {
            if(data.success != true) {
                return;
            }
            var array = [];
            data.roleList.map(function(data) {
                array.push({
                    option: data.name,
                    value: data.roleId
                });
            });
            me.setState({
                role: array
            });
        }, "json").error(function(xhr, errorText, errorType){
        });
    },
    init: function(title, url, data, successFn, isUpdate) {
        this.setState({
            title: title,
            url: url,
            successFn: successFn,
            isUpdate: isUpdate == true
        });
        data.username = data.name;
        this.refs.saveForm.setValues(data);
    },
    _return: function(event) {
        UcsmyIndex.closeChildrenPage();
    },
    _save: function(event) {

        var me = this;
        _addButtonDisabled('save');
        this.refs.saveForm.submit({
            url: this.state.url,
            isValid: true,
            success: function(data) {
                _removeButtonDisabled('save');
                if(data.retcode == 0) {
                    UcsmyIndex.alert("成功","保存成功");
                    me.state.successFn();
                    me._return();
                } else {
                    UcsmyIndex.alert("失败", data.retmsg);
                }
            },
            error: function(type, xhr, errorText, errorType) {
                _removeButtonDisabled('save');
                if(type != "0") {
                    UcsmyIndex.alert("失败", "网络异常");
                }
            }
        });
    },
    render: function() {
        return (
            <div>
                <div className="panel">
                    <div className="panel-title fc-red">{this.state.title}</div>
                    <div className="panel-content">
                        <Form config={[{
                            panelType: Input,
                            hidden: true,
                            name: "userId"
                        }, {
                            itemText: "登录名",
                            itemClassName: "col-xs-5",
                            panelType: Input,
                            name: "account",
                            valueMap: "userAccount.account",
                            v_required: true,
                            v_minlength: 2,
                            v_maxlength: 10,
                            disabled: this.state.isUpdate
                        }, {
                            itemText: "用户姓名",
                            itemClassName: "col-xs-5",
                            panelType: Input,
                            name: "username",
                            v_required: true,
                            v_minlength: 2,
                            v_maxlength: 4
                        }, {
                            itemText: "固定电话",
                            itemClassName: "col-xs-5",
                            panelType: Input,
                            name: "telephone",
                            v_telephone: true
                        }, {
                            itemText: "手机",
                            itemClassName: "col-xs-5",
                            panelType: Input,
                            name: "mobilephone",
                            v_required: true,
                            v_mobile: true
                        }, {
                            itemText: "邮箱",
                            itemClassName: "col-xs-5",
                            panelType: Input,
                            name: "email",
                            v_required: true,
                            v_mail: true
                        }, {
                            itemText: "性别",
                            itemClassName: "col-xs-5",
                            panelType: RadioGroup,
                            name: "gender",
                            v_required: true,
                            childrenPanel: [<Radio value="1"><span style={{"padding-left": "10px"}}></span>男<span style={{"padding-left": "40px"}}></span></Radio>,
                                <Radio value="2"><span style={{"padding-left": "10px"}}></span>女</Radio>]
                        }, {
                            itemText: "角色",
                            itemClassName: "col-xs-5",
                            panelType: SelectDropDown,
                            name: "role.roleId",
                            option: this.state.role && this.state.role.length > 0 ? this.state.role : undefined,
                            defaultText: "请选择",
                            defaultValue: "",
                            className: "setwidth",
                            v_required: true
                        }]} ref="saveForm" />
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