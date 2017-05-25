/**
 * Created by DuHuiling on 2017/2/6.
 */

var setClass = require('classnames');
var Progress = React.createClass({
    getDefaultProps: function() {
        return {
            type: 'line',
            showInfo: true,
            percent: 0
        };
    },
    render: function(){
        var showInfo = this.props.showInfo;
        var info;
        var infoPos = this.props.infoPosition;
        var textProps = {};

        if(showInfo){
            if(infoPos){
                typeof (infoPos) == 'object'? (
                    textProps.style = infoPos
                ):(
                    textProps.style = {'left':this.props.percent + '%'}
                )
            }
            textProps.className = 'ucs-progress-text';
            if("format" in this.props){
                info = <span className = {textProps.className} style = {textProps.style}>{this.props.format}</span>;
            }else{
                info = <span className = {textProps.className} style = {textProps.style}>{this.props.percent}%</span>;
            }
        }
        var pClass = setClass('ucs-progress',this.props.className);
        return (
            <div className = {pClass} id = {this.props.id}>
                <div className="ucs-progress-inner">
                    <span className="ucs-progress-bg" style={{'width': this.props.percent + '%'}}></span>
                </div>
                {info}
            </div>
        )
    }
});

module.exports = Progress;