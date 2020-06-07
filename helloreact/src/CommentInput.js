import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from'prop-types'
// class CommmentInput extends Component{
//         constructor(){
//             super()
//             this.state={
//                 newcomment:{
//                     name:'',
//                     content:''
//                 }
//                         }
//         }
//         handleChangeName(event){
//
//  *** ...只能解构一层，深层拷贝可以用JSON
// let newstate=JSON.parse(JSON.stringify(this.state));
//  newstate.newcomment.name=event.target.value;
//  this.setState(newstate)
//*** 
//             this.setState({newcomment:{name:event.target.value,content:this.state.newcomment.content}})
//         }
//         handleChangeContent(event){
//             console.log(event.target.value);
//             this.setState({newcomment:{content:event.target.value}})
//         }
//         handleClick(event){
//             console.log(1);
//             this.props.onSubmit(this.state.newcomment);
//                 }
class CommmentInput extends Component {
    static propTypes={
        comments:PropTypes.object,
        onSubmit:PropTypes.func
    }
    constructor() {
        super()
        this.state = {
            name: '',
            content: '',
            date: ''
        }
    }
    componentWillMount() {
        this.loadName();
    }
    componentDidMount() {
        this.input.focus()
    }
    loadName() {
        const username = localStorage.getItem('username');
        this.setState(
            {
            name: username
        }
        )
    }

    saveName(username) {
        localStorage.setItem('username', username)
    }
    handleSaveName(event) {
        this.saveName(event.target.value)
    }
    handleChangeName(event) {
        let newState = { ...this.state }
        newState.name = event.target.value
        this.setState(newState)
    }
    handleChangeContent(event) {
        let newState = { ...this.state }
        newState.content = event.target.value
        this.setState(newState)
    }
    handleClick(event) {
        console.log(this.state);

        if (!this.state) return alert('啥也没有')
        if (!this.state.name) return alert('没有用户名')
        if (!this.state.content) return alert('输入文字内容')


        //方法1：
        // this.setState({
        //     date:+ new Date()
        // },()=>{            
        //     this.props.onSubmit(this.state);
        //     this.setState({content:''})
        // })
        //方法2：
        // var newState = { ...this.state };
        // newState["date"] = + new Date();
        //方法3：
        //官方把this.state解构成name和content传过去，因为不然传过去的this.state是个引用变量。APP中可能会对其修改。我们不想
        this.props.onSubmit({...this.state,date:+ new Date()});
        this.setState({ content: '' })
    }

    render() {
        return (
            <div>
                <span>姓名：</span><input type='text' value={this.state.name} onBlur={this.handleSaveName.bind(this)} onChange={this.handleChangeName.bind(this)}></input>
                <span>发言内容：</span><textarea type='textarea' ref={(input) => { this.input = input }} value={this.state.content} onChange={this.handleChangeContent.bind(this)}></textarea>
                <button onClick={this.handleClick.bind(this)}>提交</button>
            </div>
        )
    }
}
export default CommmentInput
