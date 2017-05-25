/*var Raphael=require('./raphael');*/
var RingProgress = React.createClass({
    getDefaultProps: function () {
        return {
            radius: 100, //半径
            border: 10, //边框
            color: ["#ccc", "#000", "#f00"], //颜色，背影色，过渡色，最终色
            speed: 1000,//速度
            value: 0
        }
    },
    componentDidMount: function () {
        this._drawCircle();
    },
    _drawCircle: function () {
        var id = ReactDOM.findDOMNode(this);
        var opt = {
            r: this.props.radius, //半径
            b: this.props.border, //边框
            color: this.props.color, //颜色，背影色，过渡色，最终色
            speed: this.props.speed,//速度
            perentvalue: this.props.value
        };
        if (!isNaN(opt.perentvalue)) {
            var r = Raphael(id, 2 * opt.r, 2 * opt.r), R = opt.r - (opt.b / 2);
        }
        r.customAttributes.arc = function (value, R) {
            if (value == 100) {
                value = 99.999
            }
            var alpha = 3.6 * value, a = (90 - alpha) * Math.PI / 180, x = opt.r + R * Math.cos(a), y = opt.r - R * Math.sin(a), path;
            path = [["M", opt.r, opt.r - R], ["A", R, R, 0, +(alpha > 180), 1, x, y]];
            return {path: path}
        };
        r.path().attr({stroke: opt.color[0], "stroke-width": opt.b}).attr({arc: [100, R]});
        if (opt.perentvalue > 0) {
            var c = r.path().attr({
                stroke: opt.color[1],
                "stroke-width": opt.b,
                "stroke-linecap": "round"
            }).attr({arc: [0.01, R]});
            setTimeout(function () {
                c.animate({stroke: opt.color[2], arc: [opt.perentvalue, R]}, opt.speed)
            })
        }
    },
    render: function () {
        return (
            <div className="ucs-ring-progress"></div>
        )
    }
});
module.exports = RingProgress;