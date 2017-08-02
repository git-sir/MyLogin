var Input = UcsmyUI.Input;

function outputObj(msg,obj) {
    var description = "";
    for (var i in obj) {
        description += i + " = " + obj[i] + "\n";
    }
    console.log(msg+": "+description);
}

module.exports = React.createClass({
    /*---------------最先执行且不带入参的方法------------------*/
    getDefaultProps : function () {
        console.log('call LifeCycle\'s getDefaultProps')
        return {
            title:'测试React组件的生命周期'
        };
    },
    getInitialState: function() {
        console.log('call LifeCycle\'s getInitialState')
        return {
            value: 1
        };
    },
    componentWillMount:function() {
        console.log('call LifeCycle\'s componentWillMount')
    },
    componentDidMount:function() {
        console.log('call LifeCycle\'s componentDidMount')
    },
    /*-------只有被更新props或state属性时才会被执行且带入参的方法-------*/
    componentWillReceiveProps:function(newProps) {
        console.log('call LifeCycle\'s componentWillReceiveProps')
        outputObj("LifeCycle组件的更新后的props属性",newProps);
    },
    shouldComponentUpdate:function(newProps, newState) {
        //此方法返回false则不会执行componentWillUpdate、render、componentDidUpdate方法
        console.log('call LifeCycle\'s shouldComponentUpdate');
        outputObj("LifeCycle组件的更新后的props属性",newProps);
        outputObj("LifeCycle组件的更新后的Stat属性",newState);
        var bool = newState.value != 3;
        console.log('是否允许更新组件: '+bool);
        return bool;    //return false 则不更新组件
    },
    componentWillUpdate:function(nextProps, nextState) {
        //注意不要在此方面里再去更新 props 或者 state
        console.log('call LifeCycle\'s componentWillUpdate');
    },
    componentDidUpdate:function(prevProps, prevState) {
        console.log('call LifeCycle\'s componentDidUpdate')
        outputObj("LifeCycle组件的更新前的props属性",prevProps);
        outputObj("LifeCycle组件的更新前的State属性",prevState);
    },
    /*-----------销毁组件时会被执行的方法------------*/
    componentWillUnmount:function() {
        console.log('call LifeCycle\'s componentWillUnmount')
    },
    init: function(title) {
        console.log("call LifeCycle\'s init "+title);
    },
    onclick : function(){
        var count = this.state.value + 1;
        console.log('call LifeCycle\'s setState')
        this.setState({value : count});
    },
    /*-----------每次渲染组件都会被执行的方法------------*/
    render: function () {
        console.log('call LifeCycle\'s render')
        return (
            <div>
                <span>{this.props.title}</span>
                <input value={this.state.value}/>
                <button onClick={this.onclick}>更新组件</button>
            </div>
        );
    }
});