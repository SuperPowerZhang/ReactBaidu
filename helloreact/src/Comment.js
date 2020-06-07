import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class Comment extends Component{
    static propTypes={
        comment: PropTypes.object.isRequired,
        delCom:PropTypes.func,
        index:PropTypes.number
        //key不会被传递到组件，所以加上验证会warning。ref也不会
        //key:PropTypes.number
    }
    state={
        dateDisplay:''
    }
    //必须得在WillMount里面调用一次函数，否则第一次显示不出来时间，相当于渲染的时候直接在state取值而不会去执行函数。
    componentWillMount(){
        this.upadateDate()
        //因为setInterval是windows的一个属性，所以里面的this指向windows。需要bind一下或者箭头函数可以解决
        this.timer=setInterval(() => {
            this.upadateDate()
        }, 5000);
        //达到一定条件后执行的函数叫做callback
    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }
    upadateDate(){
        let dateNow=+new Date()
        let ddate=(dateNow-this.props.comment.date)/1000
        let Display=''
        if(ddate>3600){
            //字符串模板
            Display=`${Math.round(ddate/3600)} 小时前`
        }else if(ddate>60){
            Display=`${Math.round(ddate/60)} 分钟前`
        }else{
            //console.log('miao')
            Display=`${Math.round(ddate)} 秒前`
        }
        this.setState({dateDisplay:Display})
    }
    handleCom(){
        //console.log(this.props.index)
        this.props.delCom(this.props.index);
    }
    getProcessedHtml(content){
        return content
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
    }
    render(){
        //console.log(this.dateDisplay);
        return(  
            <div>
                <span>{this.props.comment.name}</span>---
                <span dangerouslySetInnerHTML={{__html: this.getProcessedHtml(this.props.comment.content)}}></span>---
                <span>{this.state.dateDisplay}</span>---
                <button onClick={this.handleCom.bind(this)}>删除按钮</button>
            </div>
        )
    }
}

export default Comment;