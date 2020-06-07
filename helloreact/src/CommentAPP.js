import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import CommmentInput from './CommentInput'
import CommentList from './CommentList'

class CommentApp extends Component {
    constructor() {
        super()
        this.state = { comments: [] }
    }
    componentWillMount() {
        this.loadComments()
    }
    handleAdd(newcomment) {
        console.log(newcomment)
        //     //JSON.parse(JSON.stringify是不是对于包含数组的对象不太行来着？？？
        //    let stateNew = JSON.parse(JSON.stringify(this.state));
        //    let {comments}={...stateNew}
        //    //这是打印出来的值{name: "1122", content: "22", date: 1590304547099}
        //    console.log(comments);
         let { comments } = this.state 
         comments.push(newcomment);
         console.log(comments);
         
         this.setState(comments)
         this.saveComments(comments)
         console.log(this.state.comments);
         
      
        //   let newcomments = this.state.comments.concat([]);
        //   newcomments.push(newcomment);
        //   this.setState({...this.state,comments:newcomments})
        //   this.saveComments(newcomments)


    }
    handelDelCom(index) {
        let comments = [...this.state.comments]
        comments.splice(index, 1)
        this.setState(comments )
        this.saveComments(comments)
    }
    saveComments(comments) {
        localStorage.setItem('comments', JSON.stringify(comments))
    }

    //Loaclstroage里面的值要存字符串格式，相当于调用了toString方法，所以如果直接把对象存进去，在parse转换时会报错
    //const声明的引用类型变量不可以修改，但可以改它的属性。const声明的基本类型变量不可以修改。
    loadComments() {
        let comments = localStorage.getItem('comments')
        if (comments) {
            comments = JSON.parse(comments)
            this.setState({ comments })
        }
    }
    render() {
        console.log(this.state);
            
        return (
       
            <div>
                <CommmentInput comments={this.state.comments} onSubmit={this.handleAdd.bind(this)} />
                <CommentList comments={this.state.comments} ddelComm={this.handelDelCom.bind(this)} />
            </div>
        )
    }
}
export default CommentApp
