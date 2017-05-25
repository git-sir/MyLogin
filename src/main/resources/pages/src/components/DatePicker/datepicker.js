/**
 * Created by Administrator on 2017/2/9.
 */
var Calendar = require('./calendar');
var DatePicker = React.createClass({
    getDefaultProps: function(){
        return {
            curDate : ""
        }
    },
    getInitialState: function () {
        return {

        }
    },
    componentWillMount: function(){

    },
    componentDidMount: function(){
        if (document.addEventListener) {
            document.addEventListener('click', this.onDocumentClick);
        } else {
            document.attachEvent('click', this.onDocumentClick);
        }
    },
    componentWillUnmount: function componentWillUnmount() {
        this._unrenderLayer();
        document.body.removeChild(this._layer);

        if (document.addEventListener) {
            document.removeEventListener('click', this.onDocumentClick);
        } else {
            document.detachEvent('click', this.onDocumentClick);
        }
    },
    componentDidUpdate: function(){
        this._renderLayer();
    },
    renderLayer: function(){
        return (
            <div>
                <Calendar curDate={this.refs["ucs-calendar-picker-input"].value} callBack={this.callBack} />
            </div>
        );
    },
    _renderLayer: function() {
        var layerElement = this.renderLayer();

        if (layerElement === null) {
            ReactDOM.render(<noscript />, this._layer);
        } else {
            ReactDOM.render(layerElement, this._layer);
        }
        /*if (this.layerDidMount) {
         this.layerDidMount(this._layer);
         }*/
    },
    _unrenderLayer: function() {
        /*if (this.layerWillUnmount) {
         this.layerWillUnmount(this._layer);
         }*/

        ReactDOM.unmountComponentAtNode(this._layer);
    },
    onDocumentClick: function(e){

    },
    clickHandler: function(){
        this._layer = document.createElement('div');
        document.body.appendChild(this._layer);

        this._renderLayer();
    },
    callBack: function(curDate){
        this.refs["ucs-calendar-picker-input"].value = curDate;
        document.body.removeChild(this._layer);
    },
    render: function(){
        var _this = this;
        return (
            <span className="ucs-calendar-picker">
                <span>
                    <input value={_this.props.curDate} placeholder="Select date" ref="ucs-calendar-picker-input" className="ucs-calendar-picker-input ucs-input" onClick={_this.clickHandler}/>
                    <span className="ucs-calendar-picker-icon"></span>
                </span>
            </span>
        );
    }
});

module.exports = DatePicker;