import React, { Component } from 'react'

export class Commit extends Component {
    render() {
        return (
            <div>
                <h5>v{this.props.ver} <span style={{fontSize: "60%"}}>{this.props.date==""?"Current Version":`Commited on ${this.props.date};`} <a style={{display:this.props.id==""?"none":"inline"}} href={`https://github.com/legendword/arcade/commit/${this.props.id}`}>{this.props.id}</a></span></h5>
                {this.props.children}
            </div>
        )
    }
}

export default Commit
