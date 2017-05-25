/**
 * Created by huangdebin on 2016/11/28.
 *
 * config: {
 *      dataType : 数据类型：1：文本；2：图片；3：文字+图片
 *      direction：滚动方向：up, down, left, right
 *      speed: 滚动速度：1-100：数字越大，滚动越快；负数：同0；
 *      scrollType: 滚动类型：1：无缝滚动；2：间歇滚动
 *      stopTime: 间歇滚动停顿时间
 * }    json形式。配置滚动的主要参数
 *
 * dataSource : 数据源：数组格式
 *
 */
var SeamlessScroll = React.createClass({
    getDefaultProps: function(){
        return {
            config:{
                dataType: '1',
                direction: 'up',
                speed:'5',        //滚动速度
                scrollType: '2',  //1：无缝滚动，2：间歇滚动
                stopTime:'1500'    //间歇滚动停顿时间
            }
        }
    },
    getInitialState: function(){
        return null;
    },
    //获取一个特定元素(elem)的样式属性(name)
    getStyle: function( elem, name ) {
        //如果该属性存在于 style[]中，则它最近被设置过(且就是当前的)
        if (elem.style[name])
            return elem.style[name];
        //否则，尝试 IE 的方式
        else if (elem.currentStyle)
            return elem.currentStyle[name];
        //或者 W3C 的方法，如果存在的话
        else if (document.defaultView && document.defaultView.getComputedStyle) {
            //它使用传统的"text-Align"风格的规则书写方式，而不是"textAlign"
            name = name.replace(/([A-Z])/g,"-$1");
            name = name.toLowerCase();
            //获取 style 对象并取得属性的值(如果存在的话)
            var s = document.defaultView.getComputedStyle(elem,"");
            return s && s.getPropertyValue(name);
            //否则，就是在使用其它的浏览器
        } else
            return null;
    },
    componentDidMount: function(){
        var reactThis = this;
        var _wrap = this.refs.ucsSeamlessScroll;
        var _wrapIn = this.refs.ucsSeamlessScrollIn;
        var _block1 = this.refs.seamlessScrollList1;
        var _block2 = this.refs.seamlessScrollList2;
        var _ul = _block1.querySelector('ul');
        var _speed = this.props.config.speed;
        var _stopTime = this.props.config.stopTime;
        var _direction = this.props.config.direction;
        var _scrollType = this.props.config.scrollType;
        if(_direction == 'up' || _direction == 'down'){
            if(_block1.offsetHeight < _wrap.offsetHeight){
                return;
            }else{
                _block2.innerHTML = _block1.innerHTML;
            }
        }
        if(_direction == 'left' || _direction == 'right'){
            //设置ul的宽度
            var _ulWidth = 0;
            for(var i = 0, len = _ul.children.length; i < len; i++){
                var w = parseFloat(_ul.children[i].offsetWidth) +
                    parseFloat(this.getStyle(_ul.children[i], 'marginLeft')) +
                    parseFloat(this.getStyle(_ul.children[i], 'marginRight'));
                _ulWidth += w;
            }
            if(_ulWidth < _wrap.offsetWidth){
                return;
            }else{
                _block2.innerHTML = _block1.innerHTML;
                _block2.querySelector('ul').style.width = _ul.style.width = _ulWidth + 'px';
                _wrapIn.style.width = _ulWidth * 2 + 'px';
            }
        }
        //无缝滚动
        if(_scrollType == '1'){
            //启动定时器
            var timer = setInterval(marquee, _speed);
            //滚动函数
            function marquee(){
                if(_direction == 'up'){
                    if(_block2.offsetTop - _wrapIn.scrollTop <= 0){
                        _wrapIn.scrollTop -= _block2.offsetHeight;
                    }else{
                        _wrapIn.scrollTop++;
                    }
                }else if(_direction == 'down'){
                    if(_block1.offsetTop >= _wrapIn.scrollTop){
                        _wrapIn.scrollTop = _block1.offsetHeight;
                    }else{
                        _wrapIn.scrollTop--;
                    }
                }else if(_direction == 'left'){
                    if(_block2.offsetWidth <= _wrap.scrollLeft){
                        _wrap.scrollLeft -= _block1.offsetWidth;
                    }else{
                        _wrap.scrollLeft++;
                    }
                }else if(_direction == 'right'){
                    if(_block1.offsetLeft > _wrap.scrollLeft){
                        _wrap.scrollLeft = _block2.offsetWidth;
                    }else{
                        _wrap.scrollLeft--;
                    }
                }
            }
        }
        //间歇滚动
        if(_scrollType == '2'){
            var timer2 = setTimeout(startScroll,_stopTime);
            var timer2_1;
            function startScroll(){
                timer2_1=setInterval(function(){scrollUp()}, _speed);
                _wrapIn.scrollTop++;
            }
            function scrollUp(){
                var unitHeight = parseInt(reactThis.getStyle(_ul.children[0], 'height')) +
                    parseInt(reactThis.getStyle(_ul.children[0], 'borderTop')) +
                    parseInt(reactThis.getStyle(_ul.children[0], 'borderBottom')) +
                    parseInt(reactThis.getStyle(_ul.children[0], 'paddingTop')) +
                    parseInt(reactThis.getStyle(_ul.children[0], 'paddingBottom')) +
                    parseInt(reactThis.getStyle(_ul.children[0], 'marginTop')) +
                    parseInt(reactThis.getStyle(_ul.children[0], 'marginBottom'));
                if(_wrapIn.scrollTop % unitHeight==0){
                    clearInterval(timer2_1);
                    setTimeout(startScroll, _stopTime);
                }else{
                    _wrapIn.scrollTop++;
                    if(_wrapIn.scrollTop >= _wrapIn.scrollHeight/2){
                        _wrapIn.scrollTop =0;
                    }
                }
            }
        }
        //滚动 鼠标事件监听
        _wrapIn.addEventListener('mouseenter', handleMouseIn);
        _wrapIn.addEventListener('mouseleave', handleMouseOut);
        //鼠标悬浮
        function handleMouseIn(){
            if(_scrollType == '1'){
                clearInterval(timer);
            }
            if(_scrollType == '2'){
            }
        }
        //鼠标离开
        function handleMouseOut(){
            if(_scrollType == '1') {
                timer = setInterval(marquee, _speed);
            }
            if(_scrollType == '2'){
            }
        }
    },
    render:function(){
        var _config = this.props.config;
        var _direction = _config.direction;
        if(_direction == 'up' || _direction == "down"){
            var _wrapClassName = 'ucs-seamless-scroll ucs-seamless-scroll-vertical';
        }
        if(_direction == 'left' || _direction == 'right'){
            var _wrapClassName = 'ucs-seamless-scroll ucs-seamless-scroll-horizontal';
        }
        return (
            <div id={this.props.id} className={_wrapClassName} ref="ucsSeamlessScroll">
                <div className="ucs-seamless-scroll-in" ref="ucsSeamlessScrollIn">
                    <div className="ucs-seamless-scroll-list1" ref="seamlessScrollList1">
                        <ul>
                            {
                                this.props.dataSource.map(function(item, index){
                                    return <SeamlessScrollItem config={_config} item={item} index={index} key={index} />
                                })
                            }
                        </ul>
                    </div>
                    <div className="ucs-seamless-scroll-list2" ref="seamlessScrollList2">

                    </div>
                </div>
            </div>
        );
    }
});
var SeamlessScrollItem = React.createClass({
    render: function(){
        var _anchor = this.props.item.anchor;
        var _title = this.props.item.title;
        var _image = this.props.item.image;
        var _index = this.props.index;
        var _dataType = this.props.config.dataType;
        if(_dataType == 1){
            if(_anchor.trim() !== ''){
                return (
                    <li className="type-text" key={_index}><a href={_anchor}><span dangerouslySetInnerHTML={{__html: _title}}></span></a></li>
                );
            }else{
                return (
                    <li className="type-text" key={_index}><span dangerouslySetInnerHTML={{__html: _title}}></span></li>
                );
            }
        }else if(_dataType == 2){
            if(_anchor.trim() !== ''){
                return (
                    <li className="type-image" key={_index}><a href={_anchor}><img src={_image} /></a></li>
                );
            }else{
                return (
                    <li className="type-image" key={_index}><img src={_image} /></li>
                );
            }
        }else if(_dataType == 3){
            if(_anchor.trim() !== ''){
                return (
                    <li className="type-text-image" key={_index}><a href={_anchor}><img src={_image} /><span dangerouslySetInnerHTML={{__html: _title}}></span></a></li>
                );
            }else{
                return (
                    <li className="type-text-image" key={_index}><img src={_image} /><span dangerouslySetInnerHTML={{__html: _title}}></span></li>
                );
            }
        }else{
            console.log('请检查参数dataType是否正确！参考值：1：文本；2：图片；3：图文');
        }
    }
});
module.exports = SeamlessScroll;