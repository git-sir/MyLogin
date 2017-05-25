/**
 * Created by chenqilin on 2017/4/25.
 */
var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var Grid = require('../widget/other/grid');
var FormItem = UcsmyUI.Form.FormItem;
var UserClient = require('./other/user_client');
var PermissionLink = require('../widget/other/permissionLink');
var SelectDropDown = UcsmyUI.SelectDropDown;
var UserDetailForm = require('../account/other/userDetailForm');

var option = [
    {option: '正常', value: '0'},
    {option: '冻结', value: '1'}
];
myPanel = React.createClass({

    getInitialState:function () {
        return{
            urgentFlag:''
        }
    },

    componentDidMount: function() {
        var me = this;
        $.post("accountGroup/getAll", {}, function(data) {
            if(data.retmsg != 'success') {
                return;
            }
            me.setState({
                urgentFlag: data.data
            });
        }, "json").error(function(xhr, errorText, errorType){
        });
    },

    _search: function () {
        this.refs.grid.load({
            ucasAccount: this.refs.ucasAccount.getValue(),
            emailAccount: this.refs.emailAccount.getValue(),
            mobileAccount: this.refs.mobileAccount.getValue(),
            realName: this.refs.realName.getValue(),
            status: this.refs.sta.getValue(),
            accgUuid: this.refs.accgUuid.getValue()
        });
    },

    _manageClient: function (column) {
        var me = this;
        UcsmyIndex.openChildrenPage(UserClient, function(refPanel) {
            refPanel.init(
                function () {
                    me._refreshData();
                }, column);
        });
    },

    _refreshData: function () {
        console.log('refresh');
        this.refs.grid.load({
            ucasAccount: this.refs.ucasAccount.getValue()
        });
    },

    _detail:function(column) //基本信息
    {
        var me = this;
        UcsmyIndex.openChildrenPage(UserDetailForm, function(refPanel) {
            refPanel.init('account/upInfo','修改基本信息',  column, function(){
                //me.refs.grid.load();
                me.refs.grid.reload();
            });
        });
    },

    render: function () {
        var rootThis = this;
        return (
            <div>
                <h2 className="content-title">账号授权管理</h2>
                <div className="panel">
                    <div className="panel-title">查询条件</div>
                    <div className="panel-content">
                        <FormItem label="网金帐号"><Input ref="ucasAccount"/></FormItem>
                        <FormItem label="邮箱帐号"><Input ref="emailAccount"/></FormItem>
                        <FormItem label="手机帐号"><Input ref="mobileAccount"/></FormItem>
                        <FormItem label="用户名称"><Input ref="realName"/></FormItem>
                        <FormItem label="状态">
                            <SelectDropDown ref="sta" defaultText="请选择" defaultValue="" option={option} searchPlaceholder="请选择" />
                        </FormItem>
                        <FormItem label="用户组">
                            <SelectDropDown ref="accgUuid" defaultText="请选择" defaultValue="" option={rootThis.state.urgentFlag} />
                        </FormItem>
                    </div>
                </div>
                <div className="btn-panel">
                    <Button buttonType="bidnow" onClick={this._search}>查询</Button>
                </div>

                <div className="table-panel">
                    <Grid url="account/queryUsers" ref="grid"
                          isTextOverflowHidden={true}
                          columns={[
                              {
                                  name: 'realName', header: '用户名称',width: 80
                              },
                              {
                                  name: 'ucasAccount', header: '网金帐号',width: 80
                              },
                              {
                                  name: 'emailAccount', header: '邮箱帐号',width: 100
                              },
                              {
                                  name: 'mobileAccount', header: '手机帐号',width: 120
                              },
                              {
                                  name: 'orgName', header: '组织名称',width: 60
                              },
                              {
                                  name: 'groupName', header: '用户组',width: 100
                              },
                              {
                                  name: 'modifyDate', header: '最近修改时间',width: 150
                              },
                              {
                                  name: 'status', header: '状态',width: 30, content:function(column){
                                      return (<span>
        				    		 	{column.status == '0' ? '正常' : '冻结'}
        				    		 </span>)
                                  }
                              },
                              {
                                  name: 'accUuid', header: '操作', content: function (item) {
                                  return (
                                      <div>
                                          <PermissionLink permissionName="account_detail" href="Javascript:void(0);" onClick={rootThis._detail.bind(this, item)}>&nbsp;&nbsp;账号详情&nbsp;&nbsp;</PermissionLink>
                                          <PermissionLink permissionName="user_rel_client" href="Javascript:void(0);" onClick={rootThis._manageClient.bind(this, item)}>&nbsp;&nbsp;查看授权应用&nbsp;&nbsp;</PermissionLink>
                                      </div>
                                  )
                              }
                              }
                          ]}>
                    </Grid>
                    <div className="clearfix"></div>
                </div>
            </div>
        )
    }
});