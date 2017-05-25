module.exports = React.createClass({
	getInitialState: function(){
        return {
			fileName: '',
			fileData: '',
			action: '',
			loadBar: 'none'
		}
    },
	onChange: function(event){
		event.preventDefault()
		var file = event.target.files[0]
		var fileName = event.target.files[0].name
		var fileSize = event.target.files[0].size
		if(fileSize>1024*1024){
			alert('请上传不大于1M的图片')
			return false
		}
		var reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload=function(e){
			this.setState({
				fileName : fileName,
				fileData : e.target.result,
				loadBar: 'block'
			})
			//上传文件的回调事件
		}.bind(this)
	},
	onRemove: function(){
		this.setState({
			fileName : '',
			fileData : '',
			loadBar: 'none'
		})
		this.refs.fileId.value=''
		//可自定义点击关闭后的回调事件
	},
	render:function(){
		return (
			<div>

				<a href="javascript:;" className={this.props.className}>
					<span>{this.props.btnValue}</span>
					<input ref="fileId" type="file" onChange={this.onChange} />
				</a>


				<div style={{'display': this.state.loadBar}}>
					<img src={this.state.fileData}/>
					<div className="ucs-load-bar">
						<div className="ucs-load-bar-in" style={{'width': this.props.percent + '%'}}></div>
						<span>{this.state.fileName}</span>
						<a href="javascript:;" onClick={this.onRemove}>×</a>
					</div>
				</div>

			</div>
		)
	}
})