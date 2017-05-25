var Input = UcsmyUI.Input;
var Button = UcsmyUI.Button;
var FormItem = UcsmyUI.Form.FormItem;
var Grid = require('../widget/other/grid');
var OrganizationTreeTable = require('./other/organizationTreeTable')

myPanel = React.createClass({
    getInitialState: function () {
        return {

        }
    },

    componentDidMount: function () {

    },

    render: function () {

        return (

            <div>
                <h2 className="content-title">组织管理</h2>
                <div className="table-panel">
                    <OrganizationTreeTable />
                </div>
            </div>
        )
    }

});