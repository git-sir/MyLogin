var Input = UcsmyUI.Input;
var Checkbox = UcsmyUI.Checkbox;
var Button = UcsmyUI.Button;
var FormItem = UcsmyUI.Form.FormItem;
var SelectDropDown = UcsmyUI.SelectDropDown;
var AppCondition = React.createClass({
    getInitialState:function () {
        return{
            applySta : [{
                            option: "初审退回，进入录入柜员任务队列",
                            value: "1"
                        },
                        {
                            option: "复审退回，进入录入柜员任务队列",
                            value: "2"
                        },
                        {
                            option: "录入未完成",
                            value: "3"
                        }],
            urgentSta : [{
                           option: "紧急",
                           value: "1"
                       },
                       {
                           option: "一般",
                           value: "2"
                       }],
            idType : [{
                          option: "居民身份证",
                          value: "1"
                      },
                      {
                          option: "军官证/武警警官证/士兵证",
                          value: "2"
                      },
                      {
                          option: "港澳居民往来内地通行证",
                          value: "3"
                      },
                      {
                          option: "台湾居民往来内地通行证",
                          value: "4"
                      }]
        }
    },
    render:function(){
    	return(
			<div>
                <form id="formQueryApp">
	                <div className="panel">
	                    <div className="panel-title">查询条件</div>
	                    <div className="panel-content">
		                    <FormItem label="地区号" ref="zoneNo"><Input name="zoneNo" /></FormItem>
		                    <FormItem label="申请编号" ref="appNo"><Input name="appNo" /></FormItem>
		                    <FormItem label="申请书状态">
	                        <SelectDropDown name="flowStatus" option={this.state.applySta} defaultText="请选择" className="setwidth" ref="flowStatus" />

		                    </FormItem>
		                    <FormItem label="客户编号" ref="applicantNo"><Input  name="applicantNo" /></FormItem>
		                    <FormItem label="客户姓名" ref="applicantName"><Input  name="applicantName" /></FormItem>
		                    <FormItem label="证件类型">
		                        <SelectDropDown name="idType" option={this.state.idType} defaultText="请选择" className="setwidth"  ref="idType" />
		                    </FormItem>
		                    <FormItem label="证件号码" ref="idNo"><Input  name="idNo" /></FormItem>
		                    <FormItem label="加急标准">
	                        	<SelectDropDown name="urgentFlag" option={this.state.urgentSta} defaultText="请选择" className="setwidth" ref="urgentFlag" />
		                    </FormItem>
	                    </div>
	                </div>
	            </form>
                <div className="panel">
                    <div className="panel-title fc-red">查询结果</div>
                    <div className="panel-content">
	                    <FormItem label="地区号"><Input disabled className="disabled" /></FormItem>
	                    <FormItem label="申请编号"><Input disabled className="disabled" /></FormItem>
	                    <FormItem label="申请书状态"><Input disabled className="disabled" value=".." /></FormItem>
	                    <FormItem label="客户编号"><Input disabled className="disabled"  /></FormItem>
	                    <FormItem label="客户姓名"><Input disabled className="disabled" value="张三" /></FormItem>
	                    <FormItem label="证件类型"><Input disabled className="disabled"  /></FormItem>
	                    <FormItem label="证件号码"><Input disabled className="disabled"  /></FormItem>
	                    <FormItem label="加急标准"><Input disabled className="disabled"  /></FormItem>
                    </div>
                </div>
			</div>
		)
    }
});
module.exports = AppCondition;