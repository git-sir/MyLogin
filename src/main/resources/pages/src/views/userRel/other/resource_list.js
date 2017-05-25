/**
 * Created by chenqilin on 2017/4/25.
 */
var Grid = require('../../widget/other/grid');
var Layer = UcsmyUI.Layer;

module.exports = React.createClass({

    getInitialState: function () {
        return {
            url: '',
            pageSize: 4
        }
    },

    _open: function(url, data) {
        var queryData = {
            openId: data.openId
        };
        this.refs.layer.layerOpen();
        this.setState({
            url: url,
        }, () => {
            this.refs.grid.load(queryData);
        });
    },

    render: function () {
        var rootThis = this;
        return (
            <div>
                <Layer ref="layer" title="授权接口" width="770" height="550">
                    <div className="table-panel">
                        <Grid url={rootThis.state.url} ref="grid"
                              pageSize={rootThis.state.pageSize}
                              columns={[
                                  {name: 'no', header: '编号', width: 50},
                                  {name: 'resUri', header: '资源URI', width: 200},
                                  {name: 'descRibe', header: '资源描述', width: 150},
                                  {name: 'status', header: '资源状态', width: 50, content: function (item) {
                                  var statusText = '正常';
                                  if (item.status == '1') {
                                      statusText = '失效';
                                  }
                                  return (
                                      <span>
                                          {statusText}
                                      </span>
                                  )
                                  }}
                              ]}>
                        </Grid>
                        <div className="clearfix"></div>
                    </div>
                </Layer>
            </div>
        )
    }
});