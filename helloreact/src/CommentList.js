import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Comment from './Comment'
import PropTypes from'prop-types'

class CommmentList extends Component {
    static defaultProps = {
        comments: []
    }
    static propTypes={
        comments:PropTypes.object,
        ddelComm:PropTypes.func
    }
    handleDel(index) {
        console.log(this);
        this.props.ddelComm(index)
    }
    render() {
        console.log(this.props.comments);
        
        return (
            <div>
                {this.props.comments.map(
                     (item,i)=> {
                        //运行时的指向
                        //箭头函数时定义时的指向
                        //console.log(item);
                        return <Comment index={i} key={i} comment={item} delCom={this.handleDel.bind(this)} />
                    }
                )}
            </div>
        )
    }
}
export default CommmentList